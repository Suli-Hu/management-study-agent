# sususu · Design Documentation

> 这个目录是**设计规范源**。所有视觉决策、规则争议，都从这里找答案。  
> 工程实现细节、产品功能 PRD、运营 SOP **不在此**。

---

## 阅读顺序

1. **`DESIGN-PHILOSOPHY.md`** ← 先读这一份  
   判断规则。"这里该用红色还是灰色？" "这里该是 pill 还是矩形？" "颜色撞了谁让位？" 全在这。  
   *它不告诉你 hex 值，告诉你为什么。*

2. **`tokens-snapshot.css`** ← 数值参考  
   `v2/src/styles/tokens.css` 的镜像：颜色 OKLCH、暗色映射、L1/L2/L3 三层结构。  
   *源文件在 `Suli-Hu/management-study` 的 `v2/src/styles/`，本目录的快照随主仓部署同步。*

3. **`https://study.sususu.org/design-system`** ← 实现镜像  
   组件渲染示例（颜色 / 字体 / 间距 / 圆角 / 阴影 / 组件 / 渲染原子 / 响应式 / 守则 共 10 节）。  
   *实现镜像不是规范源——若与本目录冲突，以 `DESIGN-PHILOSOPHY.md` 为准。*

4. **`screenshots/`** ← 视觉对照库  
   按页面分类的全站截图（v0.11.x 状态）。命名规范：`{页面key}/{viewport}.png`。

---

## 目录结构

```
agent/design/
├── DESIGN-PHILOSOPHY.md     现行规范（铁律 + 决策规则 + 反例图鉴）
├── README.md                 本文档
├── tokens-snapshot.css       tokens.css 镜像
├── screenshots/              全站截图（按页面分类）
├── scripts/                  截图 / 校验等工具
└── archive/                  已归档的历史文档（不再维护）
```

---

## 不在这里的内容

| 你想找 | 应该去 |
|---|---|
| 工程实现 / 部署 / 数据流 | `agent/PROJECT.md` · `agent/PLAYBOOK.md` |
| 产品功能 / 业务逻辑 | `agent/PRODUCT_HANDBOOK.md` |
| 单个 API 的接口定义 | `agent/API.md` |
| 老师内容采编规则 | `agent/TEACHER.md` |
| 编辑器具体流程 / 鉴权 | `agent/PRODUCT_HANDBOOK.md` 编辑器章节 |
| 历史 PRD / 已废弃方案 | `archive/` |

---

## 修订流程

- 修 `DESIGN-PHILOSOPHY.md` → 走 PR，至少 1 位设计师 + 1 位产品 review
- 加新组件规格 / 新页面 pattern → 在本目录开新 .md 文件，引用 PHILOSOPHY 的条款（如 "依 §2 形状语义锁死"），不重复阐述铁律
- `tokens-snapshot.css` → 不在本仓直接编辑，从 `v2/src/styles/tokens.css` 重新 cp（PR 描述里说明从哪个 commit 同步）

---

## archive/ 里有什么

仅供追溯，不再维护：

- `DESIGN-DOC-BRIEF-FOR-PRODUCT.md` — 调研问卷（已被 PHILOSOPHY 取代）
- `STAGE-6-DESIGN-SYSTEM-SWAP-PRD.md` — v1→v2 工程 swap 计划（任务已完成）
- `KP-EDITOR-V0.8-PRD.md` — v0.8 功能 PRD（当前 v0.11.x）
- `SCHOOL-SCHOLAR-THEME-EDITOR-V0.8-PRD.md` — 同上
- `EDITOR-DESIGN.md` — v0.4.1 编辑器技术选型（属工程类，建议进一步移到 `agent/eng/`）

---

*Last updated: 2026-05-09*
