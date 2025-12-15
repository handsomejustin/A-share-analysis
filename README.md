<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/handsomejustin/A-share-analysis/blob/main/ScreenShot_2025-12-15_232230_620.png" />
</div>

# 哨兵 (Sentinel) | A股市场智能情报系统

**哨兵 (Sentinel)** 是一个现代化的金融市场情报仪表盘，专注于中国A股市场。

该项目结合了专业的暗色调金融终端 UI 设计与 Google 最新的生成式 AI 技术。它不仅展示核心指数（上证指数、沪深300、创业板指、科创50）的行情数据，还利用 **Gemini 2.5 Flash** 模型配合 **Google Search Grounding (搜索增强)** 功能，实时检索互联网财经新闻，生成深度的市场战术分析报告。

## ✨ 核心功能

*   **📊 核心指数追踪**: 覆盖 A 股四大核心指数，展示最新收盘价格、涨跌幅及迷你走势图 (Sparklines)。
*   **🤖 AI 智能研报**: 集成 Google Gemini 2.5 Flash 模型，一键生成类 Bloomberg 风格的市场简报。
*   **🌐 联网搜索增强**: 利用 Google Search Grounding 技术，AI 分析基于最新的互联网实时数据，而非过时训练数据。
*   **🎨 专业金融 UI**: 采用 Tailwind CSS 构建的深色模式界面，专注于数据可视性和阅读体验。
*   **📝 Markdown 渲染**: 支持结构化的研报展示，自动解析来源引用链接。

## 🛠️ 技术栈

*   **前端框架**: [React 19](https://react.dev/)
*   **样式库**: [Tailwind CSS](https://tailwindcss.com/)
*   **图表库**: [Recharts](https://recharts.org/)
*   **AI SDK**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (`@google/genai`)
*   **构建工具**: Vite / ES Modules

## 🚀 快速开始

### 1. 获取 Google Gemini API Key

本项目依赖 Google Gemini API 进行智能分析。
1.  访问 [Google AI Studio](https://aistudio.google.com/)。
2.  创建一个 API Key。
3.  **注意**: 为了使用 Google Search Grounding 功能，建议使用付费层级或确保您的 API Key 具有搜索工具访问权限。

### 2. 环境配置

本项目代码中使用 `process.env.API_KEY` 获取密钥。在本地开发环境中（如使用 Vite），请在根目录创建 `.env` 文件：

```bash
# .env
VITE_API_KEY=your_google_api_key_here
```
*(注：如果使用 Vite，需并在代码中调整为 `import.meta.env.VITE_API_KEY`，或配置构建工具注入 `process.env`)*

### 3. 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📂 项目结构

```text
.
├── index.html              # 入口 HTML (引入 Tailwind)
├── index.tsx               # React 入口文件
├── App.tsx                 # 主应用组件 (布局与逻辑)
├── components/
│   ├── IndexCard.tsx       # 指数卡片组件 (包含迷你图)
│   └── ReportView.tsx      # 研报展示组件 (Markdown 渲染)
├── services/
│   └── geminiService.ts    # Google GenAI API 调用逻辑
├── types.ts                # TypeScript 类型定义
├── constants.ts            # 常量配置 (指数数据、模型配置)
└── metadata.json           # 项目元数据
```

## ⚠️ 免责声明

本项目提供的所有数据（包括指数行情和 AI 分析报告）仅供技术演示和参考，**不构成任何投资建议**。金融市场有风险，投资需谨慎。

---
Built with ❤️ using Google Gemini API
