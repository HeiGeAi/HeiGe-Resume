# HeiGe-Resume

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-ff4d12.svg)
![Claude](https://img.shields.io/badge/Claude-Skill-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**简历锻造系统 | 先过机器，再过人眼**

2026 投简历要过两道筛：AI 先按岗位语义打分排序，人再 6 秒扫。同一段经历，升级后两道筛都赢。

[这是什么](#这是什么-what-is-this) • [对比实证](#对比实证-proof) • [方法论](#核心方法论-六道锻造工序) • [样例画廊](#样例画廊-gallery) • [快速开始](#快速开始-quick-start)

<br>

<a href="https://heigeai.github.io/HeiGe-Resume/examples/comparison.html"><img src="assets/previews/comparison.webp" width="86%" alt="HeiGe-Resume · 同一段经历升级后两道筛都赢" /></a>

</div>

---

## 这是什么 What is this

让 AI 把你的简历升级成**既过得了 AI 语义筛、又让人 6 秒记得住**的提案。

2026 年约 83% 的公司用 AI 筛简历。它先读你的简历，按岗位语义打分排序，排不进前列，人根本看不到你。过了机器这关，HR 再花 6 到 8 秒扫。大多数 AI 做出来的简历是一张流水账：通篇负责什么、参与什么，没有一个数字，再套个跟八百份一样的双栏模板。两道筛都过不去。

HeiGe-Resume 换一种做法：**把同一段经历升级成两道筛都赢的提案。** 一句话说清你是谁，每条经历写你做成了什么，对齐目标岗位，排成机器读得顺的单栏。

它不只把版式做漂亮，更升级内容本身：

- ✅ **履历升级引擎**，把「负责 XX」锻造成「做成了 X、量化成 Y、靠 Z」（XYZ 公式 + 担当动词 + 正当量化）
- ✅ **过 AI 筛**，对岗调频 + 镜像 JD 术语 + 资历范围信号，让机器判你高度匹配
- ✅ **诚信红线**，强化措辞可以、编造事实不行，明确拒绝白字注入等作弊
- ✅ **PDF 优先 + 机器可读**：A4 单文件、文字可选中、Cmd+P 导出即投递版
- ✅ **六套跨职业样例 + 一套前后对比实证**，全是虚构人物
- ✅ 零依赖单文件，到处都能用

**适用场景**：求职简历、跳槽简历、应届生简历、技术/产品/设计/运营简历、高管简历、自由职业者一页纸。

**支持平台**：Claude Code、Cursor、Windsurf、Cline、Aider、OpenClaw、Hermes、ChatGPT、Claude.ai 等。

> 别人交一张流水账，你交一份过得了机器、6 秒抓得住人的提案。履历升级，对岗调频，每条都是经得起追问的战功。

---

## 对比实证 Proof

我们拿**同一个人、同一段经历**做了普通版和锻造版，把两版各抽成纯文本、随机匿名，交给 **3 个互不可见的 AI 筛选器盲打分**（测内容不测排版）。结果：

| | AI 筛选器加权均分 | JD 匹配 | 量化结果 |
|---|:---:|:---:|:---:|
| 普通版 | 36.2 | 38.0 | 17.0 |
| 锻造版 | **88.9** | **93.3** | **91.0** |
| 分差 | **+52.7** | +55.3 | +74.0 |

3 个筛选器一致判锻造版更优。没有编造一条新成就，数字都是普通版本就隐含、只是没写出来的真实参数。锻造版赢在合法的框架和结构，不靠白字注入和关键词堆砌（那些会被现代筛选器识别并扣分）。

完整对比 + 逐条拆解见 **[在线 Demo](https://heigeai.github.io/HeiGe-Resume/examples/comparison.html)**，测试方法可复现，见 [`tools/ai-screener-eval.md`](tools/ai-screener-eval.md)。AI 筛选器日间会波动，所以我们报均值和区间、讲方向。

---

## 核心方法论 六道锻造工序

做简历之前先认清 2026 的现实：投简历要过两道筛，机器先按岗位语义打分排序，人再 6 秒扫。锻造的功夫，是让升级后的同一条经历同时赢下这两道筛。

### 🎯 01 一句话定位 The One-Liner
钉死你是谁 + 镜像目标岗位语言。机器靠它判匹配，人靠它决定往下看。

### ⚒️ 02 履历升级引擎 The Upgrade Engine
把「负责什么」锻造成「做成了 X、量化成 Y、靠 Z」。强动词、可验证数字、不编造。两道筛共同的弹药。

### 🎯 03 对岗调频 Tune to the JD
抽 JD 关键词、用它的术语复述、最相关战功重排到最前。AI 语义匹配占约 40% 权重，ROI 最高（约 6 倍回复率）。

### 🤖 04 机器可读 Machine-Readable
单栏真文字、阅读顺序正确、标准小标题、近期靠前，不嵌图不进度条。让 AI 筛选器解析对、判得高。

### ⏱ 05 6 秒扫描 The 6-Second Scan
过了机器进到人眼，让最强信号落在视线第一落点。层级靠字号字重留白，6 秒抓到三个重点。

### 🔍 06 一页纪律 + 反作弊体检 One-Page & Anti-Gaming
一页讲完（资深最多两页）。出货前过反模板 + 反作弊（白字注入 / 夸大无据）+ 诚信（每条经得起追问）。交付门槛。

完整方法论与使用流程见 [`SKILL.md`](SKILL.md)。

---

## 样例画廊 Gallery

同一套方法论，五种职业气质，做出五份完全不同的简历。每份都是现场锻造的零依赖单文件，**A4 排版、文字可选中、Cmd+P 完美导出 PDF**。全部为虚构人物，保护隐私。点开任意预览图即可看在线 Demo。

| 预览 | 气质 | 角色 |
|:--:|:--|:--|
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/comparison.html"><img src="assets/previews/comparison.webp" width="300" alt="comparison" /></a> | **前后对比实证** | 普通版 vs 锻造版 + AI 评分 |
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/heige-resume.html"><img src="assets/previews/heige-resume.webp" width="300" alt="heige-resume" /></a> | **工业 / 硬核** | 资深后端工程师（1 页） |
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/pm-resume.html"><img src="assets/previews/pm-resume.webp" width="300" alt="pm-resume" /></a> | **克制 / 专业** | 产品经理（1 页） |
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/designer-resume.html"><img src="assets/previews/designer-resume.webp" width="300" alt="designer-resume" /></a> | **设计感 / 张扬** | 设计师（1 页） |
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/newgrad-resume.html"><img src="assets/previews/newgrad-resume.webp" width="300" alt="newgrad-resume" /></a> | **温暖 / 简洁** | 应届毕业生（1 页） |
| <a href="https://heigeai.github.io/HeiGe-Resume/examples/executive-resume.html"><img src="assets/previews/executive-resume.webp" width="300" alt="executive-resume" /></a> | **高定 / 极简** | 技术高管（2 页） |

也可以本地预览：
```bash
git clone https://github.com/HeiGeAi/HeiGe-Resume.git
cd HeiGe-Resume && python3 -m http.server 8756
# 浏览器打开 http://localhost:8756/examples/
```

> 导出 PDF：浏览器打开后 `Cmd / Ctrl + P`，目标选「另存为 PDF」，纸张 A4，边距「无」，勾选「背景图形」，导出的就是最终投递版。

---

## 快速开始 Quick Start

### 方法 1：支持 Skill 系统的平台（推荐）

适用于 Claude Code、Cursor、Windsurf、Cline：

```bash
git clone https://github.com/HeiGeAi/HeiGe-Resume.git
cp -r HeiGe-Resume ~/.claude/skills/
```

然后直接说：

```
用 HeiGe-Resume 帮我做份简历，我是五年后端
把我这段经历优化成简历，投产品经理岗
帮我把简历改得有重点、能过机器筛
```

### 方法 2：作为 System Prompt 使用

适用于 ChatGPT、Claude.ai、Aider、OpenClaw、Hermes：

1. 下载本仓库的 `SKILL.md`
2. 将内容粘贴到 AI 助手的 system prompt 或自定义指令中
3. 直接对话使用，无需特殊命令

---

## 使用指南 Usage Guide

HeiGe-Resume 会带你走完整个锻造流程：

1. **定调**：先确认投什么岗位、什么阶段、有没有目标 JD、有哪些料，再挑一个气质方向。
2. **搭骨架 + 升级履历**：先写一句话定位，再把每条经历按 XYZ 公式锻造（做成 X / 量化成 Y / 靠 Z），诚信红线不碰。
3. **对岗调频 + 机器可读**：抽 JD 关键词、用 JD 术语复述、最相关靠前；单栏真文字、标准小标题、近期靠前。
4. **写生产级代码**：A4 单文件、PDF 优先、文字可选中、中文带字体兜底。
5. **双筛体检 + 反作弊**：机器关 + 人眼关都过，没有白字注入、每条经得起追问才交付。

### 场景示例

**升级履历，过 AI 筛**
```
我简历全是"负责 XX"，用 HeiGe-Resume 帮我升级成有结果有数字、能过 AI 筛的
```

**按岗位定制**
```
用 HeiGe-Resume 帮我按这个 JD 优化简历，我是五年后端投支付方向
[贴上 JD]
```

**应届生简历**
```
用 HeiGe-Resume 帮我做份应届生简历，经历不多，做干净点
```

---

## 平台兼容性 Platform Compatibility

HeiGe-Resume 本质是一套让 AI 把简历写出重点、做得能投的方法论，不绑定任何工具。**只要这个 AI 能写代码，它就能用 HeiGe-Resume。** 平台之间的差别只有两点：怎么装，以及输出怎么拿到。

| 平台 | 能不能用 | 安装方式 | 输出怎么拿 |
|------|:---:|---------|-----------|
| **Claude Code / Cursor / Windsurf / Cline** | ✅ | 放进 skill 目录 | 自动写成 .html |
| **Aider / OpenClaw / Hermes** | ✅ | 贴进 system prompt | 自动写成 .html |
| **ChatGPT / Claude.ai / 其他 AI** | ✅ | 把 SKILL.md 贴成自定义指令 | 复制代码块，自己存成 .html |

输出是单文件 HTML 简历，浏览器打开 Cmd+P 即可导出 A4 PDF，不依赖任何运行时。

> 提示：深度打法都在 `references/` 里。支持 skill 的平台会按需自动读取；纯贴 prompt 的平台，把 `SKILL.md` 和 `references/` 一起贴上，方法论最完整。

---

## 项目结构 Project Structure

```
HeiGe-Resume/
├── SKILL.md                          # Skill 主文件：六道工序 + 使用流程
├── references/                       # 设计资产
│   ├── content-upgrade-engine.md     # 履历升级引擎（XYZ / 强动词 / 正当量化 / 诚信红线）
│   ├── ai-screener-optimization.md   # 过 AI 筛（LLM 权重 / 对岗调频 / 反作弊）
│   ├── resume-production-spec.md      # 单文件简历硬规格（PDF + 机器可读 + 字体兜底）
│   ├── content-templates.md          # 内容速查卡（定位 / 结果不写职责 / 各阶段）
│   ├── aesthetic-directions.md       # 五种气质方向库
│   └── anti-template-checklist.md    # 反模板 + 反作弊 + 诚信体检（交付门槛）
├── examples/                         # 六个样例（全虚构人物）
│   ├── comparison.html               # 前后对比实证 + AI 评分
│   ├── heige-resume.html             # 工业/硬核 · 资深后端工程师（1 页）
│   ├── pm-resume.html                # 克制/专业 · 产品经理（1 页）
│   ├── designer-resume.html          # 设计感/张扬 · 设计师（1 页）
│   ├── newgrad-resume.html           # 温暖/简洁 · 应届毕业生（1 页）
│   └── executive-resume.html         # 高定/极简 · 技术高管（2 页）
├── tools/                            # 本地 AI 筛选测试 harness
│   ├── ai-screener-eval.md           # 方法 + JD + 评分 rubric
│   ├── ai-screener-results.md        # 盲测共识结果
│   └── inputs/                       # 盲测纯文本输入（jd / before / after）
├── assets/previews/                  # README 用的样例预览图（WebP）
├── LICENSE · CHANGELOG.md · README.md
```

---

## 版本历史 Version History

完整记录见 [CHANGELOG.md](CHANGELOG.md)。

### v2.0.0 (2026-06-02)
- ⚒️ 双筛升级。招牌从「6 秒决定去留」升级为「先过机器，再过人眼」，五道工序扩成六道，加入履历升级引擎 + 对岗调频 + 机器可读
- 🤖 新增两个引擎：`content-upgrade-engine.md`（XYZ 公式 / 强动词 / 正当量化 / 诚信红线）、`ai-screener-optimization.md`（LLM 语义筛权重 / 对岗调频 / 反作弊）
- 🧪 新增 `examples/comparison.html` 前后对比实证 + `tools/` 本地 AI 筛选测试：3 个互不可见筛选器盲打分，同一段经历升级后 36.2 → 88.9（+52.7），方向一致
- 🛡️ 诚信立场：强化措辞可以、编造事实不行，明确拒绝白字注入 / prompt 注入

### v1.0.0 (2026-06-01)
- 🎉 首次发布。五道锻造工序 + 五种气质方向库 + 五套跨职业样例，A4 可导出 PDF、文字可选中过机器筛

---

## 许可证 License

MIT License，详见 [LICENSE](LICENSE) 文件。

---

## 联系方式 Contact

- **Author**: Blake 黑哥
- **WeChat**: 488137
- **GitHub**: [@HeiGeAi](https://github.com/HeiGeAi)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

Made by Blake 黑哥
交一份提案，而不是一张履历表。

</div>
