# Design screenshot capture

Batch tool for refreshing `agent/design/screenshots/` from prod (`https://study.sususu.org`) without screenshotting one URL at a time.

## One-time setup

```bash
cd agent/design/scripts
npm install
npm run install:browser    # downloads chromium ~100MB
```

## First run — write cookie file

```bash
npm run login              # prompts for password; writes ~/.claude/projects/.../secrets/preview-cookie.txt (mode 600)
```

The cookie is the prod `session` cookie tied to `husuli0623@gmail.com` (admin). It's saved at:

```
~/.claude/projects/-Users-husuli-Documents-Web-Project/secrets/preview-cookie.txt
```

This file lives **outside any git tree** (`~/.claude/...`), so there's no risk of accidentally committing it. Permissions are `600`. If it leaks, it grants prod admin until session TTL expires — re-run `npm run login` to rotate.

## Subsequent runs

```bash
npm run capture                           # re-shoots all 19 TARGETS into agent/design/screenshots/
npm run capture -- --filter=kp-detail     # only kp-detail/* names
npm run capture -- --base-url=http://localhost:4321   # against local dev server
```

If output says `redirected to /login — cookie expired`, re-run `npm run login`.

## Editing what gets captured

Open `capture-screenshots.mjs` and edit the `TARGETS` array. Each entry:

```js
{
  name: 'category/some-name',          // → agent/design/screenshots/category/some-name.png
  url: '/keiei/kp/k069',               // path under base-url
  preset: 'desktop',                   // 'desktop' (1440×900 @2x) | 'mobile' (322×768 @2x)
  fullPage: true,                      // true = full scroll height; false = viewport only
  requiresLogin: true,                 // false = public page (signin/signup/etc)
}
```

## Conventions

- Desktop preset: `1440×900` viewport, `deviceScaleFactor=2` → `2880×1800` PNG (Retina 2x, matches PM3 batch v0.11.14)
- Mobile preset: `322×768` viewport, `deviceScaleFactor=2` → `644×1536` PNG (matches v2 visual-regression `mobile-322` profile)

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `no cookie at ~/.claude/...` | First run, cookie file doesn't exist | `npm run login` |
| `redirected to /login` | Session expired (~30 days) or cookie corrupted | `npm run login` to rotate |
| `login succeeded but no 'session' cookie returned` | Auth contract changed (cookie name moved off `session`) | Check `v2/src/lib/auth.ts` `COOKIE_NAME` constant |
| Hangs at `networkidle` | Page has long-running fetch (search? telemetry?) | Bump per-target timeout in `goto()` or use `'domcontentloaded'` |
