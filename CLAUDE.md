# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是 Capacitor 官方文档的中文翻译版本，基于 [Docusaurus](https://docusaurus.io/) 构建，使用 `@ionic-docs/preset-classic` 预设。

- **origin**: `TacKana/capacitor-docs-zh`（中文翻译分支）
- **upstream**: `ionic-team/capacitor-docs`（英文官方文档）
- 翻译工作主要在 `docs/` 目录下的 Markdown 文件中进行

## 常用命令

```bash
npm install          # 安装依赖
npm start            # 启动开发服务器（会自动生成 API 文档）
npm run build        # 构建生产版本
npm run serve        # 本地预览构建产物
```

## 项目架构

```
docs/               # 所有文档内容（Markdown），路径与路由对应
  apis/             # API 插件文档（由 scripts/api.mjs 自动生成，勿手动编辑）
  cli/              # CLI 文档
    commands/       # CLI 命令参考
  main/             # 主要文档内容
    android/        # Android 相关指南
    ios/            # iOS 相关指南
    guides/         # 概念指南（安全、存储、深层链接等）
    getting-started/# 入门指南
    cordova/        # Cordova 迁移指南
    updating/       # 版本升级指南
scripts/            # 文档生成脚本
  api.mjs           # 从 npm 包 README 生成 API 文档页面
  api-v6.mjs        # v6 版本的 API 文档生成
  api-v7.mjs        # v7 版本的 API 文档生成
src/                # Docusaurus 源码（组件、样式、主题）
  components/       # React 组件（API 列表、主题颜色生成器等）
  styles/           # 全局样式
  theme/            # 主题定制（如 TOC 目录组件）
  utils/            # 工具函数和 hooks
sidebars.js         # 侧边栏配置（docs / api / cli 三套侧边栏）
docusaurus.config.js# Docusaurus 配置（导航栏、搜索、Prism 语法高亮等）
vercel.json         # Vercel 部署配置（重定向和重写规则）
versions.json       # 文档版本列表：v2 到 v7，current 是 v8
```

## 关键架构说明

- **侧边栏系统**: `sidebars.js` 导出三套独立的侧边栏：`docs`（主文档）、`api`（插件 API）、`cli`（命令行参考）。主文档侧边栏中的 `apis` 和 `cli` 条目使用 `type: 'link'` 指向对应子侧边栏的顶级路径
- **API 文档自动生成与翻译保护**: `docs/apis/*.md` 文件由 `scripts/api.mjs` 从 npm CDN 自动生成。`npm start` 会通过 prestart 钩子自动触发。**翻译保护机制**：脚本在生成前检查文件的 frontmatter 中是否有 `translated: true` 标记和 `source_hash`。哈希匹配时跳过（无变更），哈希不匹配时输出 ⚠️ 警告提示翻译需要同步。翻译 API 文档时必须在 frontmatter 中添加 `translated: true` 标记
- **版本化**: 使用 Docusaurus 的版本化功能，`current` 版本标签为 v8，历史版本 v2–v7 存放在 `versioned_docs/` 和 `versioned_sidebars/` 中
- **预设**: 使用 Ionic 自定义的 Docusaurus 预设 `@ionic-docs/preset-classic`，而非标准 Docusaurus 预设
- **部署**: 通过 Vercel 自动部署，`vercel.json` 配置了重定向规则，将 `/docs/:match*` 重写为 `/:match*`
- **搜索**: 使用 Algolia DocSearch

## Windows 开发注意事项

- 文件换行符必须使用 **LF**（`\n`），不可使用 CRLF（`\r\n`）
- VS Code 设置：`Files: Eol` → `\n`
- Git 设置：`git config --global core.autocrlf false`
- 如果仓库已克隆且有 CRLF 缓存问题：`git rm --cached -r .` 然后 `git reset --hard`
- Prettier 配置继承自 `@ionic/prettier-config`，Markdown 文件使用 `mdx` 解析器
