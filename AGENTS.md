<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ResumeNav：产品与内容约定

## 用途与视觉方向

- 本站是面向招生官／面试官的申请补充信息导航页，入口放在申请的 Additional Information 中；不是另建一个通用个人网站或个人品牌营销页。
- 目标是完整呈现需要补充的信息、展开活动列表被篇幅压缩的内容，并提供研究材料、项目、网站和证书入口。活动表中已经出现不构成排除理由。
- 维持用户原本的 Swiss（瑞士国际主义）排版。实现前检查现有页面和样式，延续其网格、对齐、字体层级和留白，不擅自替换为通用 portfolio 模板。
- 信息完整、清楚、可导航优先；不强迫内容服务于同一个人设、成长故事或主线叙事，不为讲故事删减事实。
- 本文件记录已确认的需求，不代表页面已经实现。

## 素材与事实边界

- `Copy of CA_Activities_Revised_1028CMU.xlsx` 是现有活动／奖项列表；`Bryan Fan Resume.pdf` 是用户已整理的补充素材，应直接复用其表述与链接，不反复要求用户重述。
- 用户在对话中确认的最新状态优先于旧素材。不得编造贡献、结果、链接、奖项级别或未来工作成果。
- 研究介绍以 Resume 的粒度为起点：研究主题、方法、关键词、状态和原文链接。不要擅自要求每项写成包含职责、技术决策和消融结果的长篇研究案例。

## 必须覆盖的内容

### 研究材料与项目

- 只有三项论文／研究文档，不是四篇论文；不能统称为已发表论文。
- **PolyProphet**：通过特征工程、分子表示和集成模型预测聚合物性质；已获 *Scientific Reports* 接收，标注 Accepted，不等同于已正式发表。
- **Popularity Bias in Music Recommendation**：基于 4,800 万条用户—歌曲交互研究长尾音乐曝光；未发表稿件，标注 Unpublished manuscript。
- **Prophet（Lean 决策研究）**：探索证明策略选择的样本效率和决策训练迁移；研究提案，标注 Research proposal。用户计划未来继续，不把计划中的实验写成已完成成果。
- 上述三项原文链接均在 Resume 中；读取其中的真实链接，不猜测或制造链接。
- **Pic-pred**：独立项目，不是第四篇论文；为广东甘蔗研究所开发基于图像的糖晶粒径分析工具，附 Resume 中的代码仓库链接。

### 网站与活动展开

- **Blog**：`https://bfladderbean.me`，自主开发的博客与视觉／交互设计实践。
- **HFI Utility Center（UC）**：`https://hfiuc.org`，校园预约及学生服务；允许展开活动表压缩掉的项目内容，准确区分个人贡献与团队成果。
- **Graduate Texts in Minecraft（GTMC）**：`https://techmc.wiki`，协作编写的技术知识项目，涉及机制、工程和源代码行为。
- Resume 本身作为补充材料入口保留，不将其视为页面内容的上限。

### 补充荣誉

- **HiMCM**：2023、2024 Honorable Mention；2025 Meritorious，依据 Resume。
- **FRC**：2025 上海区域赛 Industrial Design Award、伊斯坦布尔区域赛 Autonomous Award，依据 Resume；活动表另有 Galileo Division Finalist。保留团队归属，不写成个人独获奖项。
- **Hero Legends — Certificate of Honor · 2026**：赛事全称为 2026 Hero Legends Guangdong Division Points Ranking Tournament and Guangzhou Youth Martial Arts Sanda Kickboxing Open（2026 英雄传说广东赛区积分排名赛暨广州市青少年武术散打搏击公开赛），证书签发于 2026-05-02。
- 散打证书只写 Certificate of Honor；用户确认不补具体组别。不要推断名次、冠军或世界级赛事。证书来源文件为 `Fann Shunwen Hero Legends certificate.pdf`，由用户提供；本地文件地址不是可直接公开使用的网页链接。

## 观点与方法内容

- 用户希望有空间讨论活动表难以体现的深层思考，例如“为什么人的认知足以影响 AI 的表现”、设计判断和 AI 协作方法。它们可独立于成果介绍，不必全部改造成故事。
- 用户主张：人负责判断、关键技术决策与验收；通过明确 spec、grill 讨论、稳定工作流及 Figma 排版等方式与 AI 互相促进、迭代改进，而非许愿后期待 AI 一次做对。用户将后者称为 wish coding，以区别于其认可的 vibecoding。
- 不因用户批评措辞简略或激烈，就推断其无法解释问题。用户已提供对子菜单移动容错区域、hover／点击展开及外部点击关闭行为的具体分析。
- 相关观点尚不是已完成的文章；不得擅自代写成用户原话或虚构经历。若引入维特根斯坦，须明确具体论点与关联，不虚构引用。
- 他人网页截图用于理解用户的设计判断，不默认授权公开聊天截图、辱骂、人名或第三方作品。

## 后续执行原则

- 当前阶段无需继续为定位、故事或人设提问；已有信息足以记录需求。后续优先从素材和代码取证，仅对影响准确性且无法从材料取得的事实提问。
- 未指定最终页面语言、详细布局或未写文章的定稿；这些不构成当前记录需求的阻碍，也不得伪装成已确认决定。
- 实现后在真实页面检查信息完整性、材料链接、Swiss 排版延续以及桌面／移动端阅读和导航，不把文档或本地文件存在当作页面已可访问的证明。
