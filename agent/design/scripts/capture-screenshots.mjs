#!/usr/bin/env node
// Batch screenshot capture for design handoff (agent/design/screenshots/)
//
// Usage:
//   node capture-screenshots.mjs --login          # interactive: prompts password, writes cookie file
//   node capture-screenshots.mjs                  # captures all TARGETS using cached cookie
//   node capture-screenshots.mjs --filter=kp-detail
//   node capture-screenshots.mjs --base-url=https://study.sususu.org
//
// Setup: see ./README.md (npx playwright install chromium one-time).

import { chromium } from 'playwright';
import { mkdir, writeFile, readFile, chmod } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = dirname(__filename);
const REPO_ROOT = resolve(SCRIPTS_DIR, '..', '..', '..');
const SCREENSHOTS_DIR = join(REPO_ROOT, 'agent', 'design', 'screenshots');
const COOKIE_FILE = join(
  homedir(),
  '.claude/projects/-Users-husuli-Documents-Web-Project/secrets/preview-cookie.txt',
);

const COOKIE_NAME = 'session';
const DEFAULT_BASE = 'https://study.sususu.org';

const PRESETS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile:  { width: 322,  height: 768, deviceScaleFactor: 2 },
};

// Capture targets — edit freely. Match what's in agent/design/screenshots/.
// requiresLogin=true means cookie is needed; public pages (signin/signup/etc.) leave it false.
const TARGETS = [
  // KP detail — 5 format desktop full
  { name: 'kp-detail/desktop-quad-full',      url: '/keiei/kp/k069', preset: 'desktop', fullPage: true,  requiresLogin: true },
  { name: 'kp-detail/desktop-compare-full',   url: '/keiei/kp/k032', preset: 'desktop', fullPage: true,  requiresLogin: true },
  { name: 'kp-detail/desktop-accordion-full', url: '/keiei/kp/k020', preset: 'desktop', fullPage: true,  requiresLogin: true },
  { name: 'kp-detail/desktop-flat-list-full', url: '/keiei/kp/k001', preset: 'desktop', fullPage: true,  requiresLogin: true },
  { name: 'kp-detail/desktop-narrative-full', url: '/keiei/kp/k002', preset: 'desktop', fullPage: true,  requiresLogin: true },

  // KP detail — mobile (3 of 5 format as representative)
  { name: 'kp-detail/mobile-quad',      url: '/keiei/kp/k069', preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'kp-detail/mobile-compare',   url: '/keiei/kp/k032', preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'kp-detail/mobile-narrative', url: '/keiei/kp/k002', preset: 'mobile', fullPage: true, requiresLogin: true },

  // KP edit — 5 format edit views
  { name: 'kp-edit/desktop-quad-edit',      url: '/keiei/kp/k069/edit', preset: 'desktop', fullPage: true, requiresLogin: true },
  { name: 'kp-edit/desktop-compare-edit',   url: '/keiei/kp/k032/edit', preset: 'desktop', fullPage: true, requiresLogin: true },
  { name: 'kp-edit/desktop-accordion-edit', url: '/keiei/kp/k020/edit', preset: 'desktop', fullPage: true, requiresLogin: true },
  { name: 'kp-edit/desktop-flat-list-edit', url: '/keiei/kp/k001/edit', preset: 'desktop', fullPage: true, requiresLogin: true },
  { name: 'kp-edit/desktop-narrative-edit', url: '/keiei/kp/k002/edit', preset: 'desktop', fullPage: true, requiresLogin: true },

  // Other main flows — mobile
  { name: 'home-disciplines/mobile', url: '/',                   preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'kps-list/mobile',         url: '/keiei/kp',           preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'scholars-list/mobile',    url: '/keiei/scholar',      preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'school-detail/mobile',    url: '/keiei/school/sm',    preset: 'mobile', fullPage: true, requiresLogin: true },
  { name: 'study-log/mobile-daily',  url: '/study-log',          preset: 'mobile', fullPage: true, requiresLogin: true },

  // Theme edit
  { name: 'theme-edit/desktop', url: '/keiei/theme/sm/edit', preset: 'desktop', fullPage: true, requiresLogin: true },
];

const args = process.argv.slice(2);
const flags = {
  login:   args.includes('--login'),
  baseUrl: pick('--base-url=') ?? DEFAULT_BASE,
  filter:  pick('--filter=')   ?? '',
  email:   pick('--email=')    ?? process.env.MS_PREVIEW_EMAIL ?? 'husuli0623@gmail.com',
};

function pick(prefix) {
  const arg = args.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

async function loadCookieValue() {
  if (!existsSync(COOKIE_FILE)) return null;
  const raw = (await readFile(COOKIE_FILE, 'utf8')).trim();
  return raw || null;
}

async function saveCookieValue(value) {
  await mkdir(dirname(COOKIE_FILE), { recursive: true });
  await writeFile(COOKIE_FILE, value + '\n', 'utf8');
  await chmod(COOKIE_FILE, 0o600);
  console.log(`✓ wrote cookie → ${COOKIE_FILE} (mode 600)`);
}

async function loginAndCapture(baseUrl, email) {
  const rl = readline.createInterface({ input, output });
  const password = await rl.question(`password for ${email} on ${baseUrl}: `);
  rl.close();

  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    await page.fill('input[name=email]', email);
    await page.fill('input[name=password]', password);
    await Promise.all([
      page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 15000 }),
      page.click('button[type=submit]'),
    ]);
    const cookies = await ctx.cookies(baseUrl);
    const session = cookies.find((c) => c.name === COOKIE_NAME);
    if (!session) throw new Error(`login succeeded but no '${COOKIE_NAME}' cookie returned`);
    await saveCookieValue(session.value);
  } finally {
    await browser.close();
  }
}

async function captureAll(baseUrl, sessionValue, filter) {
  const targets = filter
    ? TARGETS.filter((t) => t.name.includes(filter))
    : TARGETS;
  if (!targets.length) {
    console.log(`no targets match filter '${filter}'.`);
    return;
  }

  const browser = await chromium.launch();
  try {
    const { hostname } = new URL(baseUrl);
    const baseCookie = sessionValue
      ? [{ name: COOKIE_NAME, value: sessionValue, domain: hostname, path: '/', httpOnly: true, secure: true, sameSite: 'Lax' }]
      : [];

    let ok = 0, fail = 0;
    for (const t of targets) {
      const preset = PRESETS[t.preset];
      if (!preset) { console.warn(`! skip ${t.name}: unknown preset '${t.preset}'`); fail++; continue; }
      if (t.requiresLogin && !sessionValue) {
        console.warn(`! skip ${t.name}: requires login but no cookie (run --login first)`);
        fail++; continue;
      }
      const ctx = await browser.newContext({
        viewport: { width: preset.width, height: preset.height },
        deviceScaleFactor: preset.deviceScaleFactor,
      });
      if (t.requiresLogin) await ctx.addCookies(baseCookie);

      const page = await ctx.newPage();
      const out = join(SCREENSHOTS_DIR, `${t.name}.png`);
      await mkdir(dirname(out), { recursive: true });
      try {
        await page.goto(`${baseUrl}${t.url}`, { waitUntil: 'networkidle', timeout: 30000 });
        if (page.url().includes('/login')) throw new Error('redirected to /login — cookie expired? run --login');
        await page.screenshot({ path: out, fullPage: !!t.fullPage });
        console.log(`✓ ${t.name}  (${preset.width}×${preset.height} @${preset.deviceScaleFactor}x, fullPage=${!!t.fullPage})`);
        ok++;
      } catch (err) {
        console.error(`✗ ${t.name}: ${err.message}`);
        fail++;
      } finally {
        await ctx.close();
      }
    }
    console.log(`\nDone: ${ok} ok, ${fail} fail.`);
    if (fail > 0) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log(`base url: ${flags.baseUrl}`);
  if (flags.login) {
    await loginAndCapture(flags.baseUrl, flags.email);
    if (args.length === 1) return; // only --login → done
  }
  const sessionValue = await loadCookieValue();
  if (!sessionValue) {
    console.error(`no cookie at ${COOKIE_FILE} — run with --login first.`);
    process.exit(1);
  }
  await captureAll(flags.baseUrl, sessionValue, flags.filter);
}

main().catch((e) => { console.error(e); process.exit(1); });
