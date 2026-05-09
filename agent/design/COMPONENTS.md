# Components · sususu

> 通用组件的全状态规格。  
> **本文不立规则，只应用规则**——所有决策依 [`DESIGN-PHILOSOPHY.md`](./DESIGN-PHILOSOPHY.md) 条款。  
> 数值（颜色 / 字号 / 间距）依 [`tokens-snapshot.css`](./tokens-snapshot.css)。

---

## §0 怎么读这份文档

- **每个组件 4 件套**：定位 / 状态表（5 态）/ 形状决策溯源 / 反例
- **每条决策标注溯源**：`[依 PHIL §X]` = `DESIGN-PHILOSOPHY.md` 第 X 节；`[依 HIG]` = Apple Human Interface Guidelines
- **覆盖范围（v1）**：lang-toggle / school-chip / tag-chip / link / button 共 5 个；本次 KP 详情头部重设计需要的全部
- **后续补**：modal / toast / tab / accordion / form-input 入 v2

---

## §1 共通规则（所有组件必须满足）

### 1.1 触控目标
- **最小 44×44pt** [依 HIG · Touch Targets]
- 视觉 chip 高度 < 44 时，用透明 padding 撑开 hit area，**视觉边界 ≠ 点击边界**
- 桌面 hover 区可与视觉边界一致；触屏必须撑到 44

### 1.2 焦点可见
- 所有可交互元素：键盘 `:focus-visible` → `box-shadow: 0 0 0 3px var(--focus)`
- 不可交互元素：无 focus 环 [依 PHIL §2 · 不可交互不超过 1 个交互信号]

### 1.3 对比度
- 正文 ≥ 4.5:1，大字（≥18px / 14px bold）≥ 3:1 [依 HIG · Color and Contrast]
- 暗色模式重新校验（不假设"反转就行"）[依 PHIL §6 自查问 7]

### 1.4 动效
- hover/active 过渡 `120ms ease-out`（来源 components.css 现状）
- 禁用 transform 大位移；focus 环不参与过渡（瞬时显示）
- `prefers-reduced-motion` → 时长归零，仅保留色彩/边框变化 [依 HIG · Motion]

---

## §2 lang-toggle（语言切换）

### 定位
- **类型**：可交互 · 即时切换控件
- **语义**：4 种颜色用途中的"装饰 / 焦点"（L1 墨黑），不是分类色 [依 PHIL §3 · 4 用途]
- **形状**：分段式 pill（segmented control）[依 HIG · Segmented Controls]

### 形状决策溯源
- 是 pill：因为它**真交互**（必须 ≥3 个交互信号）[依 PHIL §2 · 形状词典]
- 是 segmented 不是两个独立按钮：HIG 明确"互斥的 2-5 选项用 segmented"，且当前态视觉强对比能让用户**一眼看到自己在哪种语言**——这是切换控件的核心诉求 [依 HIG · Segmented Controls]
- 横向「中 / あ」**不是** 「中文 / 日本語」：缩写减少长度，pill 紧凑

### 状态表

| 状态 | 视觉 | 备注 |
|---|---|---|
| **default · 未选中段** | 文字 `--text-2`，无背景 | |
| **default · 已选中段** | 文字 `--primary-fg`，背景 `--primary`（墨黑） | 焦点用墨黑承担 [依 PHIL §4 · 颜色是焦点最弱手段，但此处 segmented 必须强对比] |
| **hover**（仅未选中段） | 背景 `--primary-soft` | 暗示可点 |
| **pressed** | `transform: scale(.98)` 80ms | 触感反馈 [依 HIG · Feedback] |
| **focused（键盘）** | 整组 segmented 外加 focus 环 | 不分段加 |
| **disabled** | 不展示组件 | 无日文正文时整组件不渲染（已是 brief §3.3 Q6 现状） |

### 反例
- ❌ 用 `--s-success` 绿色作为已选中态背景 → 把"焦点"误用 semantic 色 [依 PHIL §3 · 颜色禁区]
- ❌ 两个独立 outline 按钮并排 → 用户分不清当前是哪个 [依 HIG · 互斥 2-5 选项用 segmented]

---

## §3 school-chip（学派 chip · 可点跳转）

### 定位
- **类型**：可交互 · 跳转链接（指向 `/{discipline}/{school.key}`）
- **语义**："分类 (Category)" 信息——这条 KP 属于哪些学派 [依 PHIL §3]
- **形状**：圆角矩形 (8px) + 链接化处理 — 注意：**不是** pill，pill 锁定给 lang-toggle / tab / 主按钮 [依 PHIL §2 · 形状词典]

### 形状决策溯源（关键）

这是本次重设计最核心的决策点。看似 "学派 chip 是链接，应该 pill"——错。规则如下：

- **chip 表达的是分类**（学派 = "营销学派" 这种归属），不是焦点 [依 PHIL §3 · 一元一用]
- 但它**也确实可点**（跳转）——所以必须满足"≥3 个交互信号" [依 PHIL §2]
- **解法**：用 8px 圆角矩形（标签形）作为基底，加 **箭头 → + cursor:pointer + hover 字色加深** 三个信号
- **学派色仅以 4-6px 圆点出现在文字左侧**——分类信息靠"圆点 + 文字"，不靠填充 [依 PHIL §3 · "tag 色仅作圆点 / 角标 / sparkline"]

### 状态表

| 状态 | 视觉 | 备注 |
|---|---|---|
| **default** | 8px 圆角矩形<br>背景 `--bg-soft`<br>边框 `1px solid --border-soft`<br>文字 `--text`（学派名 zh）<br>左侧 6px 圆点 = 学派 hex<br>右侧 → 箭头 0.4 透明度 | 3 个交互信号：箭头 + cursor:pointer + 矩形（弱）|
| **hover** | 边框升 `--border`<br>文字升 `--primary`<br>箭头透明度 1.0<br>背景不变 | 不抬升 / 不强阴影——避免误判为按钮 [依 PHIL §5 反例 4] |
| **pressed** | `transform: scale(.99)` 80ms | 触感反馈 |
| **focused** | focus 环 | |
| **disabled** | 不渲染（学派为空时整 chip 不出现） | KP schema 要求至少 1 个学派，理论无 disabled 态 |

### 多 chip 的排版
- 一行 `display: flex; gap: 8px; flex-wrap: wrap`（≥3 个时折行）[依 PHIL §6 · 322px 必须 wrap]
- 322px 窄屏：单 chip 最大宽度 = 容器宽 - 16px（避免独占两行）
- 学派色圆点撞色容忍：同一行多个 chip 圆点颜色相近时不强制分隔——文字本身已分隔 [依 PHIL §3 · 撞色仲裁规则 2]

### 反例
- ❌ 实心填充学派色（chip 1-18 反例 1）
- ❌ pill 形 → 误判为 lang-toggle 同级元素 [依 PHIL §2 · pill 锁定]
- ❌ hover 抬升 + 强阴影 → 误判为按钮 [依 PHIL §5 反例 4]

---

## §4 tag-chip（分类标签 chip · 不可点）

### 定位
- **类型**：**不可交互** · 静态标签
- **语义**：分类 (Category) — 这条 KP 属于哪个 tag 子类（OB / SM / OT 等）
- **形状**：圆角矩形 (8px)，**所有交互信号清零** [依 PHIL §2 · 不可交互不超过 1 个信号]

### 形状决策溯源
- **关键差异**：与 school-chip 同形（8px 矩形），但**减去所有交互信号**——无箭头、无 hover、`cursor: default`
- 这正是 PHIL §2 决策树的运用："骑墙不行"——要么交互全配齐，要么全清零
- 当未来 tag 接上 filter 跳转，**重新走一轮 §3 流程**升格为可交互（加箭头、加 hover）

### 状态表

| 状态 | 视觉 | 备注 |
|---|---|---|
| **default** | 8px 圆角矩形<br>背景 `--bg-soft`<br>**无边框**（与 school-chip 区隔）<br>文字 `--text-2` (灰)<br>左侧 4px 圆点 = tag hex | 文字色比 school-chip 浅一档——这是"不可点"的**第二层提示**（除形状外）[依 PHIL §1 · 形状 > 颜色，但同形时层级辅助区分] |
| **hover** | **无变化** | cursor 必须保持 default [依 PHIL §2 · 严禁 hover 变色但点了无反应] |
| **pressed / focused** | 无（不可点元素无键盘焦点） | tabindex 必须为 -1 |
| **disabled** | 不渲染（tag 为空时 chip 行不显示该位置） | |

### 与 school-chip 的视觉区分（必须 4 层冗余）
1. **无边框**（school 有 1px border）
2. **文字色 `--text-2`**（school 用 `--text`）
3. **无 → 箭头**（school 有）
4. **无 hover**（school 有）

任何一层失守，用户都会再次混淆。

### 反例
- ❌ tag-chip 用与 school-chip 完全相同的视觉 → 用户必须"试点"才知道哪个能点 [依 PHIL §5 反例 4]
- ❌ 给 tag-chip 加 cursor:pointer "为以后留接口" → 现在的用户不为以后买单 [依 PHIL §1 · 不确定就选最少]
- ❌ tag 色实心填充（chip 1-18 反例的另一面）

---

## §5 link（行内 / 块级链接）

### 定位
- **类型**：可交互 · 跳转
- **形状**：纯文字 + 下划线 / 箭头 [依 PHIL §2 · 形状词典]
- **典型场景**：KP meta 行的学者名、面包屑、"查看更多"

### 状态表

| 状态 | 视觉 |
|---|---|
| **default** | 文字 `--link`，无下划线 |
| **hover** | `text-decoration: underline`，文字升 `--text` |
| **pressed** | 文字 `--primary` |
| **focused** | focus 环（包文字盒子）|
| **visited** | 不区分（站内浅层导航不需要）|

### 反例
- ❌ hover 变红色 [依 PHIL §5 反例 3]
- ❌ default 就有下划线 + hover 加粗 → 信号过多

---

## §6 button（primary / secondary）

### 定位
- **类型**：可交互 · 触发动作（不是跳转）
- **形状**：pill (999px) 或圆角矩形 (8px)；本系统 KP / 学派编辑器 button 多用 8px [依 tokens.css 现状]
- **语义**：装饰用途（仅 `--primary` 墨黑）[依 PHIL §3 · 4 用途]

### 状态表（primary）

| 状态 | 视觉 |
|---|---|
| **default** | 背景 `--primary` / 文字 `--primary-fg` / 8px 圆角 |
| **hover** | `filter: brightness(.95)` 或 `--primary-soft` 边框暗示 |
| **pressed** | `transform: scale(.98)` 80ms |
| **focused** | focus 环 |
| **disabled** | `opacity: .5` + `cursor: not-allowed` |

### 状态表（secondary）

| 状态 | 视觉 |
|---|---|
| **default** | 透明底 + `1px solid --border` + 文字 `--text` |
| **hover** | 背景 `--bg-soft` |
| 其他 | 同 primary 各态 |

### 危险动作（删除）
- **不**用红色实心 [依 PHIL §5 反例 5]
- 用 `1px solid --s-danger` 边框 + 文字 `--s-danger` + 透明底
- 二次确认对话框承担"防误删"的核心职责，按钮颜色不该承担

---

## §7 组件之间的关系（KP 详情头部应用例）

```
┌─────────────────────────────────────────────────────┐
│ 主标题 (大字 / --text)              [中 │ あ ]      │  ← lang-toggle 右上角，pill segmented
├─────────────────────────────────────────────────────┤
│ 学者名 · '77             ← link (text + underline-on-hover)
│                                                       │
│ ●营销管理总论 →   ●战略选择 →     ← school-chip
│ ·OB    ·SM                        ← tag-chip
│ (8px 圆角矩形 / 大圆点 / 箭头)    (8px 矩形 / 小圆点 / 无箭头)
└─────────────────────────────────────────────────────┘
```

**4 层视觉区分一目了然**：
- lang-toggle = pill（独占形状）
- school-chip = 圆角矩形 + 边框 + 大圆点 + 箭头
- tag-chip = 圆角矩形 + 无边框 + 小圆点 + 灰字 + 无箭头
- link = 纯文字 + 下划线悬停

颜色不承担区分——**形状已经把它们分开了**。这是 PHIL §1 铁律 1 的现场验证。

---

## §8 修订流程

- 改本文 → 必须同时引用 PHIL 条款；不能在本文新立规则（铁律不在这）
- 加新组件 → 走 PHIL §6 决策清单 10 问，过完再写本文新章节
- 暗色模式 → 每个组件都需要补一组暗色态（v1 暂以 tokens.css 暗色变量自动映射，复杂组件 v2 单独列）

---

*Last updated: 2026-05-09 · Version 1.0 · 引用 DESIGN-PHILOSOPHY v1.0 + Apple HIG*
