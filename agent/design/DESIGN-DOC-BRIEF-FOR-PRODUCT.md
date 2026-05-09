# Brief for Product · 设计系统文档调研

> **状态**：Brief — **§2 部分 / §3.3 / §5 / §6 局部** 已由 **研发据代码与 `PRODUCT_HANDBOOK` 代填**；**§1 截图、§3 组件全量规格、§4、§7 细节、§8 扩充** 仍待 **产品** 补全。  
> **目的**：为 sususu 起一份**真正可作为设计源头**的文档（取代/补足现有 `STAGE-6-DESIGN-SYSTEM-SWAP-PRD.md` 的「工程 PRD」角色）。  
> **交付**：设计侧据此产出 `design-system.md` 完整版 + 各 page-level pattern 文档。

### 填写进度（一眼）

| 章节 | 状态 |
|------|------|
| §1 截图 | ⏳ 待产品（路径已约定） |
| §2 Token | ✅ 颜色见 `tokens-snapshot.css`；字体/间距摘抄 tailwind；动效见 components.css 片段 |
| §2.2 L3 表 | ✅ 经营学/市场营销已填；**「学派」不在此表**（学派 = `school` 表，非 tag 库行） |
| §3 组件 | ⏳ 待产品/设计逐组件填；§3.3 八问已答 |
| §4 Page pattern | ⏳ 待产品 |
| §5 内容/语言 | ✅ 与 `TEACHER.md` 对齐已填 |
| §6 IA | ✅ 骨架 + 权限矩阵模板（待产品勾满） |
| §7 设计债 | ⏳ 「chip 1-18」无工程文档 — 填 **TBD** 或产品复盘结论 |
| §8 不要做的事 | ✅ 先给 5 条；可再补 |
| §9–§11 | 维持原模板 |

---

## 0. 怎么填这份 brief（先读这一段，3 分钟）

（以下 **§0.1–§0.4** 维持设计师原稿，不改动。）

### 0.1 三条铁律

1. **复制模板，填空格——不要重写题干**。每节都有 fill-in 表或代码块，按格式填即可。
2. **能贴源码就别复述**。例如颜色 token 直接 `cat tokens.css >> 这里`；不要用人话解释"主色是绿色"。
3. **不知道就写"不知道 / TBD"**。空着比瞎填好。设计师看到 TBD 知道这是开放项；看到一句模糊话会以为是定论，做错方向。

### 0.2 你应该花的时间

| 段 | 预计 | 备注 |
|---|---|---|
| §1 截图 | 30-60 min | 主要是开浏览器截图存盘 |
| §2 token | 10 min | 已导出 `tokens-snapshot.css`；产品仅需核对 + 补 dark 对照说明若需 |
| §3 component | 60-90 min | 这块最费时；按模板每个组件 5-10 分钟 |
| §4-§8 | 60 min | 多数可从 `PRODUCT_HANDBOOK.md` / 本节已填段落摘抄 |
| **合计** | **约 3-4 小时** | 不要堆一天写满，分两三次写 |

### 0.3 文件放在哪

- 截图：`design/screenshots/{页面key}/{viewport}.png`，文件名规范见 §1.2
- 你的回答：**直接编辑本文件**，每节"填写区"内补内容。不要新开文件。
- token 长内容：**已放** `design/tokens-snapshot.css`（从 `v2/src/styles/tokens.css` 复制）；本文 §2.1 写引用即可。
- 不确定的开放问题：放在文末 §12 "Open Questions" 列出来

### 0.4 常见跑偏（**请避免**）

（维持设计师原稿对照表。）

---

## 1. 当前页面截图（最优先）

### 【研发 / 产品】说明 — 2026-05-07 更新

- **23 张已归档** 到 `agent/design/screenshots/{页面key}/{文件名}.png`（v0.11.x 状态，prod 部署版本 v0.11.14·773aada）
- **设计规范页**线上可截：`https://study.sususu.org/design-system`（**公开**，无需登录）
- 命名规范：`{页面key}/{viewport}.png`（默认 desktop ~2900×1500）；同页多状态用 `{viewport}-{状态}.png`
- 缺失截图清单见 §1.3，补全方式见 §1.4

### 1.1 已归档清单（26 张，按页面分类）

#### A. 公开页（无需登录）

| # | 页面 | 文件 | 关键元素 |
|---|---|---|---|
| 1.1.1 | 登录页 | [signin/desktop.png](screenshots/signin/desktop.png) | 邮箱+密码 form / 记住 30 天 / 注册/忘记密码 link / 演示访问入口 |
| 1.1.2 | 演示登录页 | [signin-demo/desktop.png](screenshots/signin-demo/desktop.png) | 仅密码 form（演示账号通道，无邮箱） |
| 1.1.3 | 注册页 | [signup/desktop.png](screenshots/signup/desktop.png) | 邮箱 / 密码（≥ 8 位含字母+数字）/ 显示名（可选）/ 发送验证码 button |
| 1.1.4 | 密码重置入口 | [password-reset/desktop.png](screenshots/password-reset/desktop.png) | 输入注册邮箱 → 发送重置链接 |
| 1.1.5 | 设计规范页（full-page）| [design-system/desktop.png](screenshots/design-system/desktop.png) | sususu 设计规范 — 10 section 全长（设计哲学/颜色/字体/间距/圆角/阴影/组件/渲染原子/响应式/守则）|

#### B. 学科首页（登录后）

| # | 页面 | 文件 | 关键元素 |
|---|---|---|---|
| 1.2.1 | 学科首页 / 学科卡片列表 | [home-disciplines/desktop.png](screenshots/home-disciplines/desktop.png) | 4 个学科卡片：经营学（58 学派/713 KP）、市场营销学（21/215）、风险管理论（即将上线）、统计学（即将上线）；每卡右侧"编辑"按钮 |

#### C. Nav 顶部菜单/弹窗

| # | 元素 | 文件 | 触发 |
|---|---|---|---|
| 1.3.1 | 设置弹窗 - admin 菜单 | [nav/settings-menu-admin.png](screenshots/nav/settings-menu-admin.png) | 齿轮按钮（admin 视角）：学科管理 🔥 / 用户权限管理 🔥 / API Tokens 🔥 / 切换夜间模式 |
| 1.3.2 | 头像弹窗 | [nav/avatar-menu.png](screenshots/nav/avatar-menu.png) | 头像按钮：学科选择 / 退出登录 |

#### D. 学派详情页（KP 列表 + 详情区分栏布局）

| # | 状态 | 文件 | 说明 |
|---|---|---|---|
| 1.4.1 | Hero 区 + 视图切换 chip | [school-detail/desktop-hero.png](screenshots/school-detail/desktop-hero.png) | 学派标题"经营学笔记 / Management" + 视图 chip（全集 / 组织论的脉络 / 斯科特三角 / 斯科特四象限 / + 新建视图）+ 说明 / 编辑视图 button |
| 1.4.2 | 视图说明展开（组织论的脉络） | [school-detail/desktop-with-view-description.png](screenshots/school-detail/desktop-with-view-description.png) | 选中视图后，显示视图描述 + 学派分组（古典组织论 / 新古典组织论 ...） |
| 1.4.3 | KP accordion format 详情 | [school-detail/desktop-with-kp-accordion.png](screenshots/school-detail/desktop-with-kp-accordion.png) | 左：学派 sidebar (科学管理学派) / 中：KP 列表 / 右：选中 KP 的 accordion format（5 步骤折叠展开） |
| 1.4.4 | KP narrative format 详情 | [school-detail/desktop-with-kp-narrative.png](screenshots/school-detail/desktop-with-kp-narrative.png) | KP "情绪劳动" body 是一段 prose 散文 |
| 1.4.5 | 窄栏 split 视图 | [school-detail/desktop-narrow-split.png](screenshots/school-detail/desktop-narrow-split.png) | 窄屏下 KP 列表 + 详情区上下分布；每行展示 中文/日文/英文/学者/年份 |

#### E. 视图编辑器 Drawer

| # | 元素 | 文件 | 说明 |
|---|---|---|---|
| 1.5.1 | 编辑视图 drawer | [view-editor/desktop-drawer.png](screenshots/view-editor/desktop-drawer.png) | 视图名称 / 描述 + 左侧候选学派列表 + 右侧已加入分组（个体层面/群体层面/古典组织论...）|

#### F. KP 详情页（5 种 body format + 学派 sidebar tabs）

| # | format | 文件 | KP 例 |
|---|---|---|---|
| 1.6.1 | compare 3 列卡片 | [kp-detail/desktop-compare-3col.png](screenshots/kp-detail/desktop-compare-3col.png) | "冲突观的三阶段演进" — 传统/行为科学/相互作用 三列对比 |
| 1.6.2 | accordion 折叠分组 | [kp-detail/desktop-accordion.png](screenshots/kp-detail/desktop-accordion.png) | "冲突的源泉" — 个人要因 + 状况要因 折叠 ol |
| 1.6.3 | compare 2 列卡片 | [kp-detail/desktop-compare-2col.png](screenshots/kp-detail/desktop-compare-2col.png) | "显性冲突 vs 潜在冲突" 二列对比 + 评价模块 |
| 1.6.4 | 学派 sidebar - 概述 tab | [kp-detail/desktop-overview-tab.png](screenshots/kp-detail/desktop-overview-tab.png) | "冲突管理论" 概述 - 9 行学派叙事 |
| 1.6.5 | 学派 sidebar - 代表学者 tab | [kp-detail/desktop-scholars-tab.png](screenshots/kp-detail/desktop-scholars-tab.png) | 9 位学者列表（中/日双语 + 头衔） |

#### G. 学者列表

| # | 文件 | 说明 |
|---|---|---|
| 1.7.1 | [scholars-list/desktop.png](screenshots/scholars-list/desktop.png) | 经营学笔记·共 202 位 / 字母索引 A-Z / 卡片显示生卒+任职+KP 数（如 1 KP / 2 KP） |

#### H. 知识点列表

| # | 文件 | 说明 |
|---|---|---|
| 1.8.1 | [kps-list/desktop.png](screenshots/kps-list/desktop.png) | 经营学笔记·共 721 条 / tag 横向筛选（个体的世界 / 人与人之间 / ...） / 个体的世界分组列表 |

#### I. 学习记录页（3 视图切换 chip）

| # | 视图 | 文件 |
|---|---|---|
| 1.9.1 | 日志流（30 天累计 + 4 个月热力图 + 时间轴） | [study-log/desktop-daily.png](screenshots/study-log/desktop-daily.png) |
| 1.9.2 | 知识点排行（按累计时长降序）| [study-log/desktop-rank.png](screenshots/study-log/desktop-rank.png) |
| 1.9.3 | 学派段位（C/B/A 段位规则 + 学派进度条 + 练习入口）| [study-log/desktop-tier.png](screenshots/study-log/desktop-tier.png) |

#### J. 编辑器（admin only）

| # | 编辑器 | 文件 | 说明 |
|---|---|---|---|
| 1.10.1 | 学派编辑 | [school-edit/desktop.png](screenshots/school-edit/desktop.png) | 顶部「← 返回学派 / 删除（disabled）/ 保存」+ 基本信息（中/日/英标题、时代）+ 内容（概述）|
| 1.10.2 | KP 编辑 | [kp-edit/desktop.png](screenshots/kp-edit/desktop.png) | 顶部 + 基本信息（标题、年份）+ 关联（所属学派 / 关联学者 / 标签）+ 主体（body format 切换：narrative/条目/折叠/对比/quad） |

---

### 1.2 文件命名规范

- `screenshots/{页面key}/{viewport}.png` — 默认 desktop ~2900×1500
- 同页多状态：`{viewport}-{状态描述}.png`（如 `desktop-hero.png`、`desktop-with-kp-accordion.png`）
- 弹窗 / dropdown：直接用功能命名（如 `settings-menu-admin.png`、`avatar-menu.png`）
- 移动端：`mobile.png` ~390×844；平板：`tablet.png` ~768×1024
- 暗色模式：在 viewport 后加 `-dark`（如 `desktop-dark.png`）

### 1.3 缺失截图清单（待补全）

按系统功能盘点；编号占位，补图时按命名规范放到对应路径，文档自动 link 即可。

#### 公开页（无需登录）
- [x] ~~**1.A.1 注册页** `signup/desktop.png`~~ → 已归档为 §1.1.3
- [ ] **1.A.2 注册成功（待邮件确认）** `signup/desktop-sent.png` — 需触发提交流程（playwright fill+click 可补）
- [x] ~~**1.A.3 密码重置入口** `password-reset/desktop.png`~~ → 已归档为 §1.1.4
- [ ] **1.A.4 密码重置成功** `password-reset/desktop-sent.png` — 需触发提交流程
- [ ] **1.A.5 密码重置确认页（点邮件来）** `password-reset/desktop-confirm.png` — 需邮件 token，难度高
- [x] ~~**1.A.6 设计规范页** `design-system/desktop.png`~~ → 已归档为 §1.1.5
- [ ] **1.A.7 个人记录链接（24h 有效）页** `private/desktop.png` — 通过分享链接打开（你登录后生成 link 给我）

#### 学科级页面（登录后）
- [ ] **1.B.1 KP 详情 - flat-list format** `kp-detail/desktop-flat-list.png`
- [ ] **1.B.2 KP 详情 - quad（2x2 矩阵）format** `kp-detail/desktop-quad.png`
- [ ] **1.B.3 KP 详情 - quad cell 翻面（详情背面）** `kp-detail/desktop-quad-cell-back.png`
- [ ] **1.B.4 KP 详情 - compare 卡片翻面** `kp-detail/desktop-compare-flipped.png`
- [ ] **1.B.5 学者详情页（个人 + 代表 KP 列表）** `scholar-detail/desktop.png`
- [ ] **1.B.6 全局搜索 spotlight（命中 KP/学派/学者）** `search/desktop.png`
- [ ] **1.B.7 新建学习记录 modal** `study-log/desktop-new-record.png`
- [ ] **1.B.8 学习记录 - 空状态（首次访问）** `study-log/desktop-empty.png`
- [ ] **1.B.9 全科笔记入口（多学科切换页）** `home-overview/desktop.png`

#### 编辑器 admin 状态（功能性）
- [ ] **1.C.1 学者编辑** `scholar-edit/desktop.png`
- [ ] **1.C.2 学派组（theme）编辑** `theme-edit/desktop.png`
- [ ] **1.C.3 视图编辑（spotlight UI 全屏）** `view-edit/desktop-full.png`
- [ ] **1.C.4 KP 编辑 - 5 种 body format 切换面板** `kp-edit/desktop-format-{narrative,flat-list,accordion,compare,quad}.png` × 5
- [ ] **1.C.5 编辑器删除按钮 disabled + tooltip（v0.11.5 新加）** `school-edit/desktop-delete-disabled.png`
- [ ] **1.C.6 chipPicker 第一项高亮（v0.11.3 新加）** `kp-edit/desktop-chippicker-first-match.png`
- [ ] **1.C.7 KP 编辑 textarea 输入回车预览（v0.11.7 
 换行）** `kp-edit/desktop-newline.png`
- [ ] **1.C.8 KP 删除二次确认（confirm()）** `_dialog/kp-delete-confirm.png`

#### Admin only 系统页
- [ ] **1.D.1 学科管理（list / 新建 / 编辑）** `admin/disciplines.png`
- [ ] **1.D.2 用户权限管理** `admin/users.png`
- [ ] **1.D.3 API Tokens** `admin/tokens.png`

#### 移动端（mobile viewport ~390×844 / iPad Mini ~768×1024）
- [ ] **1.E.1 学科首页 mobile** `home-disciplines/mobile.png`
- [ ] **1.E.2 学派详情页 mobile（split 上下布局）** `school-detail/mobile.png`
- [ ] **1.E.3 KP 详情 mobile × 5 format** `kp-detail/mobile-{format}.png`
- [ ] **1.E.4 学习记录 mobile（3 视图）** `study-log/mobile-{daily,rank,tier}.png`
- [ ] **1.E.5 nav 折叠菜单 mobile** `nav/mobile-collapsed.png`
- [ ] **1.E.6 KP 编辑器 mobile** `kp-edit/mobile.png`

#### 暗色模式（dark mode）
- [ ] **1.F.1 主要 5 页面 × dark mode** — 公开 + 学科 + 详情 + 学习 + 编辑器
- [ ] **1.F.2 验证 L3 tag 色（OB/SM/OT 等）在 dark mode 仍可识别** `_token/tags-dark.png`

#### 重要状态/边界
- [ ] **1.G.1 toast - success / error** `_toast/{success,error}.png`
- [ ] **1.G.2 confirm() 删除二次确认 dialog** `_dialog/delete-confirm.png`
- [ ] **1.G.3 学派 0 KP 空状态** `school-detail/desktop-empty.png`
- [ ] **1.G.4 学派 sidebar 0 学者 / 0 视图** `school-detail/desktop-empty-aside.png`
- [ ] **1.G.5 网络错误页** `_error/network.png`
- [ ] **1.G.6 404 页** `_error/404.png`
- [ ] **1.G.7 403 forbidden（非 admin 试图编辑）** `_error/403.png`

### 1.4 怎么补这些缺失截图

| 选项 | 怎么做 | 适用场景 |
|---|---|---|
| **A. 自截 PR**（默认）| 你开浏览器截图，按 §1.2 命名规范放到 `agent/design/screenshots/{key}/{viewport}.png`，PR | 大部分页面 — 你登录态最方便 |
| **B. Chrome MCP 代截** | 你 Chrome 装 Claude in Chrome 扩展 → PM 远程操作 navigate + screenshot → 你监督 | 公开页（不需要登录态切换）批量补 |
| **C. TBD 留空** | 在 §1.3 勾选项保留 `[ ]`，先专注其他 section（§3 组件规格、§4 page pattern） | 边界情况（toast / 404 / dark mode），不阻塞设计师启动 |

PM 推荐 **A + C 组合**：你截 §1.B（KP 5 format / 学者详情 / search），其他次要状态留 TBD，先让设计师拿到主页面去做 §3 §4。


---

## 2. 设计 Token 实际值

### 2.1 颜色（OKLCH 完整数值）

**【已填】** 完整 L1/L2（亮/暗）及 L3 固定 tag 色见：

> **`agent/design/tokens-snapshot.css`**  
> 源文件：`v2/src/styles/tokens.css`（随部署与主仓同步；更新时请重新 `cp` 到本路径并在 PR 说明）。

要点摘要（**不等于**替代源文件）：

- **L1**：`--primary` / `--bg` / `--text` 等在 `:root` 与 `[data-mode="dark"]` 各一套；**L3 `--tag-*` 注释写明暗色不重写**（保持识别一致）。
- **L2 语义**：`--s-success` 等仅 **light 段**定义数值；dark 段主要重写 **`-soft` 底**与部分 tier/i 阶梯（见 `tokens-snapshot.css`）。

**`--link` / `--focus`**：源文件变量名为 `--link`、`--focus`（非 `--focus-ring`）；focus 环在组件里常 `box-shadow: 0 0 0 3px …` 引用 `--focus`。

### 2.2 L3 学派/分类 Tag 表（每个 discipline 一份）

**【重要澄清 · 研发】**  
`discipline.tags[]`（标签库）里的行全部是 **「知识点可挂载的分类 tag」**，**不是**学派（School）。**学派** 是独立资源：`school.key` + `title_zh`，与 KP 多对多（`kp_school`）。  
因此下表 **只列标签库**；「是否学派」列统一为 **否（分类 tag）**。学派名称请到 D1 / `data/<discipline>/schools/*.json` 查。

#### discipline: `keiei`（经营学笔记）

| key | label.zh | label.ja | label.en | hex（库内配置） | dark 专用？ | 是否学派 |
|-----|----------|------------|----------|-----------------|-------------|----------|
| t_ejbdv3 | OB | — | — | #10B981 | 否（与用户 hex） | **否** · 分类 tag |
| t_jg440q | SM | — | — | #3B82F6 | 否 | **否** |
| t_93nqjd | OT | — | — | #F59E0B | 否 | **否** |

> 注：`tokens.css` 里 L3 **OKLCH 八色**（`--tag-mgmt` 等）用于 **另一套「哈希到 token」的编辑器路径**；**页面学派卡片 accent** 优先 **用户 hex**（`resolveAccentForSchool`）。设计时需同时接受 **hex 与 OKLCH token** 两套来源 — 见 `PRODUCT_HANDBOOK` / 代码。

#### discipline: `marketing`（市场营销学）

| key | label.zh | hex | 是否学派 |
|-----|----------|-----|----------|
| t_11e78a7e | 市场洞察 | #3B82F6 | 否 |
| t_544964bf | 战略选择 | #EF4444 | 否 |
| t_5a84d584 | 价值创造 | #10B981 | 否 |
| t_5a0f53e1 | 价值传播 | #F59E0B | 否 |
| t_2b5c0fbd | 长期关系 | #8A7A6A | 否 |

#### discipline: `sociology` / 其他

- 当前 git 快照 `sociology` **tags 为空**；线上 D1 若有，请产品 **导出一份贴附录**。

### 2.3 字体

**【摘抄 `tailwind.config.ts`】**

```
font-family / 中文优先栈：
  -apple-system, BlinkMacSystemFont,
  "SF Pro Text", "SF Pro Display",
  "PingFang SC", "Hiragino Sans", "Noto Sans CJK SC",
  "Microsoft YaHei", sans-serif

font-family / 日文优先栈：
  （代码未单独设 `fontFamily.ja`；与 sans 共用 CJK fallback。若产品要「日文主字体」需另立决策。）

font-family / 英文/数字 mono：
  TBD（KP 正文代码块若有用 mono，另查 global.css / 组件）
```

**字号 scale（Tailwind extend）**：

| token | px | line-height | 用途（config 注释） |
|-------|-----|-------------|---------------------|
| xs | 11 | 1.5 | — |
| sm | 12 | 1.5 | — |
| body | 13.5 | 1.7 | 默认正文（偏小、信息密度优先） |
| base | 14 | 1.7 | — |
| lg | 16 | 1.6 | — |
| xl | 20 | 1.4 | — |
| 2xl | 24 | 1.3 | — |
| 3xl | 28 | 1.25 | — |

**字重**：`regular: 400`，`semibold: 600`（config 明示）。

### 2.4 间距

**【Tailwind 4px 网格】** `0.5→2px, 1→4px, 1.5→6px, 2→8px, 3→12px, 4→16px, 5→20px, 6→24px, 8→32px, 10→40px, 12→48px`。  
与设计师模板 `--sp-*` **命名不完全一致** — 以 **Tailwind 数字键** 为现实现状；若设计文档要统一 token 名，属 **后续重构**。

### 2.5 圆角 / 阴影 / 边框

**【tailwind.config】**  
`borderRadius`: sm 4px, DEFAULT 6px, md 8px, lg 10px, xl 12px, 2xl 16px。  
`boxShadow`: `card`, `card-hover`, `kp`（见 config 内完整 rgba 串）。

**边框默认粗细**：多组件 `1px solid var(--border)`；**hover 是否加粗** — **未全局统一**，TBD 逐组件补。

### 2.6 动效

**【摘自 `components.css` 常见值，非 exhaustive】**

- 大量 **`.12s`**（background / color / border-color）。
- **`.15s`**：部分 transform / opacity。
- **`.2s`**：shadow + transform（卡片）。
- **`max-height .35s cubic-bezier(.4,0,.2,1)`**：accordion / quad 展开。
- **`lang-toggle` pulse**：`transform .08s ease-out`。

**不允许 transition 的属性**：TBD（建议产品与研发补充：如 split-pane 拖动时禁用哪些）。

---

## 3. Component 清单 + 每个组件的状态规格

### 3.1–3.2（维持设计师模板）

⏳ 请设计/产品按模板逐组件补全。

### 3.3 关于 chip / tag / lang-toggle（本次重设计核心）— **【已填 · 研发】**

```
Q1. 学派 chip 一条 KP 最多挂几个？目前最大值是几？
    答：schema **无上限**（`kp_school` 多对多）；创建 KP 要求 **至少 1** 个学派。当前 git **未统计** max；产品可跑 D1 SQL 或填 TBD。建议产品口径：**常规 ≤3–5**，极端情况允许更多 → 设计需 **wrap**。

Q2. tag chip 一条 KP 最多挂几个？目前最大值是几？
    答：schema **无硬性上限**（`tags_json` 数组）。同上，**未统计** max；设计按 **多枚 wrap** 处理。

Q3. tag chip 真的不能点击吗？还是"暂时不能"？
    [x] **当前实现不可点**（`<span class="kp-tag-chip">`）；代码注释：**未来可链到 tag-filter 视图**，**无版本承诺**。
    [ ] 永远不点击 — **需产品最终定调**（与工程注释可冲突，以产品为准）。

Q4. 学派 chip 跳转的目标页是？
    URL 模板：`/{discipline}/{school.key}`（学派页）。
    跳转后用户最常做什么：**浏览该学派下 KP 列表 / 分栏阅读**（产品可细化）。

Q5. lang-toggle 切换会影响哪些区域？
    [x] 主标题（`title` 随 lang）
    [ ] 副标题 — **title_en 行仍展示；title_ja 在 zh 模式会显示**（见 `kp/[id].astro`）
    [x] 正文
    [x] 评价区（evaluations zh/ja）
    [x] meta 行（学者链、年份逻辑不变）
    [ ] 其他：**chip 行文案**（学派名暂 `title_zh` 不随 lang 变；**若 bug 或 feature，产品定**）

Q6. 没有日文正文时，lang-toggle 是否完全不显示？
    **Y**。无 `body_ja_json` 则不渲染 `lang-toggle` 与 **LangFab**。

Q7. KP 详情页 chip 行未来 6 个月内可能加哪些元素？
    **TBD · 产品勾选**（模板原 list 保留）。

Q8. 322px 窄屏下，chip 行如果 wrap 到 3 行还能接受吗？还是必须截断？
    **TBD · 产品**（研发建议：**wrap 优于横向滚动**，与 `FRONTEND_WORKFLOW` / 触控友好一致）。
```

---

## 4. Page-level Pattern（页面级模式）

⏳ **待产品**按模板填写（KP 详情 header、split-pane、学者 tabs 等）。

**【研发提示】** `max-width`：`tailwind` 有 `max-w-reading` 720px、`max-w-panel` 900px；KP 详情实际以页面 CSS 为准（请产品截屏 + 抄 computed）。

---

## 5. 内容/语言规则

**【已与 `agent/TEACHER.md` · Multilingual content rules 对齐】**

```
Q1. 中日双语字段在同一组件里的优先级
    主标题：**跟随用户语言**（`?lang=ja` 且存在 `title_ja` 时用日文，否则中文）。
    副标题：**title_en / title_ja` 额外行展示规则见 KP 页实现**（非简单「日主中副」）。
    元数据：**学者名链接 + year 字符串**（无 lang 切换）。

Q2. 英文术语括注的统一格式
    [x] **中文（English）** — 全角括号 `（…）`；例：观察学习（Observational Learning）

Q3. 标题截断规则
    TBD · 产品（CSS / 设计）

Q4. 数字 / 年份 / 缩写格式
    年份：**`shortYear`** — 19xx → **'77** 形式；其它格式原样或规则见 `format-year.ts`。
    人名：KP meta 用 **`lastName(name_en ?? name_zh)`** — 与「Bandura」展示一致。
    缩写（OB/SM/OT）：**标签库 label** 展示；**大写**为数据录入结果；**tooltip 展开** TBD。

Q5. 标签库 label.zh / label.ja / label.en，当前语言为日时的 fallback？
    **KP chip 展示**：代码用 **`label.zh ?? key`**（若 `label.ja` 未接 UI，属 **已知缺口**）。  
    建议产品填优先级链：**ja → zh → key → en**（需 **小开发** 才落地）。

Q6. 数字本地化
    TBD · 产品 / 现状 mostly **原样字符串**。
```

---

## 6. 信息架构总览图

**【骨架 · 产品可换手绘图】**

- **顶层**：`/login` 等公开入口 → 登录后 `/` 或 `/{discipline}`。
- **学科内**：`/{discipline}` 首页（视图 + 学派）→ `/{discipline}/{school}` → `/{discipline}/kp/{id}`；`/{discipline}/scholars`、`study-log` 等并列。
- **Layout**：多数页面共用 **Layout.astro**（顶栏 + tab）；编辑器 / admin 可能不同壳 — **产品补「共用 shell 列表」**。

**权限矩阵（示例行 · 请产品填满）**

| 控件/页面 | learner | editor | owner | super-admin |
|-----------|---------|--------|-------|-------------|
| KP 详情阅读 | ✓ | ✓ | ✓ | ✓ |
| KP 编辑按钮 | ✗ | ✓（tenant） | ✓ | ✓ |
| 学派拖拽排序 | ✗ | ✓ | ✓ | ✓ |
| Admin 用户/学科 | ✗ | ✗ | ✗ | ✓（以配置为准） |
| … |  |  |  |  |

---

## 7. 已知设计债 / 历史遗留

**【待产品 / 研发共填】**

```
A. 旧 Tailwind / 旧 CSS 残留页面：
   - TBD（可 grep `accent-ob` 等 legacy）

B. 同一 component 两套实现：
   - TBD

C. 用户/老师反馈过的视觉问题：
   1. 知识点 tab：**lang-toggle / 学派 chip / KP tag chip** 同为实心 pill，**可点性混淆**（当前在 brief 中）
   2. …

D. chip 1-18 bug 复盘「最终结论」：
   - **TBD**（仓库内无对应文档；若指 **opacity / mix** 规范，请产品从旧 PR 摘结论贴此）
```

---

## 8. 不要做的事

**【产品 / 研发初稿 · 可增删】**

```
❌ 不要给 **不可点的 tag chip** 做与 **学派链接 chip** 完全相同的 hover「抬升 + 强阴影」—— 用户会以为可导航（当前 tag 无链接）。
❌ 不要把 **lang-toggle** 的语义色降级成 **学派绿**—— lang 属于 **L1 焦点/主色链**（见 tokens 注释）；学派色来自 **标签库 hex**。
❌ 不要在 **322px** 上对 chip 行 **仅依赖横向滚动** 作为唯一方案—— **wrap + 触控目标** 优先。
❌ 不要把 **discipline.tags** 与 **school** 混称「学派」—— IA 与配色溯源会乱（见 §2.2）。
❌ 不要新增 **第 4 种无文档的 pill** 而不更新 design-system 单页 —— 先补 token / 组件规格再开发。
```

---

## 9. 提交方式

（维持设计师原稿：PR 标题 `docs(design): foundation brief for design system v1` 等。）

---

## 10. 时间预估 + 最低优先级

（维持设计师原稿：**§1 截图 + §2.1 token + §3.3 八问** 最优先；其中 §2.1 与 §3.3 **大部已填**，产品可压缩为 **§1 + 校对 §2 + 补 §3.3 Q7/Q8**。）

---

## 11. 好答案 vs 坏答案对照

（维持设计师原表。）

---

## 12. Open Questions（集中 TBD）

```
[ ] Q1. 学派 chip 在「当前语言 = ja」时，是否应显示 `title_ja`？（现实现多为 `title_zh`）
[ ] Q2. tag 的 label.ja / label.en 何时接上 UI？
[ ] Q3. chip 1-18 最终数值规范是否成文？文档链接？
[ ] Q4. 各 discipline 线上 tag 库与 git `data/*/discipline.json` 是否一致？谁 export？
```
