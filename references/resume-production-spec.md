# 单文件 HTML 简历 生产硬规格（Resume Production Spec）

简历的主输出是 PDF，不是网页。照着这份规格做，导出的 PDF 干净、过得了机器筛、中文不崩。
这些是交付门槛，不是建议。

---

## 一、PDF 优先（这是第一优先级）

简历最终是要投出去的 PDF，网页只是编辑态。一切为「Cmd+P 导出的 PDF 就是最终投递版」服务。

- **A4 尺寸**：纸张按 A4（210mm × 297mm）排。用 `@page { size: A4; margin: 0; }`，页面容器宽度对齐 A4 可打印区。
- 也可同时友好支持 Letter（8.5in × 11in），用 `mm` 做主单位即可大体通用。
- **一页就是一页**：内容控制在一页（资深最多两页）。用真实的 A4 容器高度约束，做的时候就能看到会不会溢出第二页。
- **`@media print` 必做**：去掉屏幕态的背景灰、阴影、圆角投影等不该进 PDF 的东西；`-webkit-print-color-adjust: exact; print-color-adjust: exact;` 保留需要的底色 / 强调色。
- 避免在一条经历中间被分页：关键块用 `break-inside: avoid;`。
- 屏幕预览时，把 A4 容器居中显示在浅灰背景上，像一张纸，所见即所得。

## 二、机器可读（ATS + LLM 语义筛，过不了等于没投）

机器筛简历这关。2026 起它从老 ATS 的关键词匹配升级成 LLM 语义筛：先把简历解析成结构化文本，再对 JD 语义打分排序。结构要求没变，反而更严，因为解析错一步后面全错。机器读不出 / 解析错的内容 = 不存在。**这里是结构规则的唯一权威家；机器怎么打分、怎么赢语义匹配的策略，见 `ai-screener-optimization.md`。**

- **所有文字都是真文字**：可选中、可复制。绝不把姓名、联系方式、经历做成图片、SVG 文字或 icon font 里的字形。
- **关键信息不靠图标承载**：电话、邮箱、链接旁可以放图标点缀，但信息本身必须是文字。
- **阅读顺序逻辑正确**：DOM 顺序 = 人类阅读顺序（姓名 → 定位 → 经历…）。优先单栏。要做视觉双栏，用 CSS 排布、DOM 仍按整段顺序写，别让机器把左右栏读串。
- **不用进度条 / 五角星评分表达技能**：信息量为零，机器也读不出「精通」。技能用文字分级或直接列。
- **标准小标题**：用「工作经历 / 项目经历 / 教育背景 / 技能」这类机器认得的标题词，别用「我的旅程」这种花名。
- **近期经历往前放**：LLM 对近 2 到 3 年的经历加权更高。
- 字体可以好看，但正文用可嵌入 / 通用字体，导出 PDF 里文字仍可被提取。

## 三、中文字体兜底

- 中文字体栈**必须**带系统兜底，Google Fonts 加载失败或被墙也正常显示：
  `"<中文 webfont>", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif`
- 中文**不要**用日文字体（Mochiy / Zen Maru / M PLUS 等）渲染，会缺字 / 异体字。中文用思源黑体 Noto Sans SC、思源宋体 Noto Serif SC、霞鹜文楷 LXGW WenKai 等简体中文字体。
- 拉丁字体（名字英文、技能名）带系统兜底。
- 正文字号别太小：A4 上正文 10–11pt 是下限，太小打印出来糊。

## 四、排版纪律

- **字号阶梯严格**：姓名 > 定位句 > 小标题 > 公司/职位 > 正文 > 标注，层级清楚且统一。
- **对齐到网格**：左边界统一，时间 / 地点等右对齐对齐到同一条线。
- **留白克制有节奏**：模块之间留白 > 模块内行间距，让眼睛分得清块。
- **强调克制**：加粗只给最该被看到的（公司名、关键数字、最强一条）。什么都加粗等于没加粗。
- 大标题 / 姓名折行不许把单字甩到独立一行（孤字）。中文限宽别用 `ch`（对中文算错），用 `em` 或固定值。

## 五、性能与可用性

- 单文件 HTML，零依赖（除 Google Fonts）。无外部图片，需要的图形用 CSS / SVG。
- 不要花哨动画（简历是静态文档）；若有屏幕态微交互，`@media print` 里必须关掉。
- 屏幕态加一个不打印的小提示：「Cmd / Ctrl + P 导出 PDF」，放在 `@media print { display:none }` 里。
- 头像照片可选：如果放，用 `<img>` 但确保它旁边的姓名等关键信息是文字（ATS）；很多岗位（尤其海外、技术）建议不放照片。

---

## 最小骨架参考（结构示意，不是成品）

```html
<div class="page">                 <!-- A4 纸：210mm 宽，居中显示在灰底上 -->
  <header>
    <h1>张三</h1>                  <!-- 姓名，真文字 -->
    <p class="oneliner">五年后端 · 扛过日活千万支付系统 · 在做 AI 工程化</p>
    <p class="contact">城市 · 电话 · 邮箱 · GitHub</p>  <!-- 全是可选中文字 -->
  </header>
  <section>
    <h2>工作经历</h2>             <!-- 机器认得的标准标题 -->
    <article class="job">         <!-- break-inside: avoid -->
      <div class="row"><b>公司 · 职位</b><span>2022 — 至今</span></div>
      <ul>
        <li>把支付成功率从 98.1% 提到 99.6%，一年少赔约 200 万</li>  <!-- 结果+数字 -->
      </ul>
    </article>
  </section>
  …
</div>
<style>
  @page { size: A4; margin: 0; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; background:#fff; }
  @media screen { body{ background:#e9e9ec; } .page{ box-shadow:0 2px 20px rgba(0,0,0,.18); margin:24px auto; } }
  @media print {
    body{ background:#fff; } .page{ box-shadow:none; margin:0; }
    .job{ break-inside: avoid; } .no-print{ display:none; }
    *{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
</style>
```
A4 容器、字号阶梯、强调色、气质按各简历在此之上发挥。
