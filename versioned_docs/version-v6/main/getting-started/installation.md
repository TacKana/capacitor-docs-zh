---
title: Installing Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

你可以创建一个全新的 Capacitor 应用，或者将 Capacitor 集成到现有的网页项目中。这可以通过 CLI 或使用 [VS Code 插件](vscode/getting-started) 来实现。

请确保已为你要构建的平台 [完成环境配置](/main/getting-started/environment-setup.md)。

## 创建新 Capacitor 应用

使用 `@capacitor/create-app` 包可以快速创建 Capacitor 应用。在空目录中执行以下命令即可搭建新项目：

```bash
npm init @capacitor/app
```

## 将 Capacitor 集成到现有网页应用

Capacitor 设计初衷就是能够无缝集成到任何现代 JavaScript 网页应用中。但你的项目需要满足以下三个基本要求：

- 具有 `package.json` 文件
- 有独立的构建目录（如 `dist` 或 `www`）
- 网页资源根目录包含 `index.html` 文件

:::重要提示
你的 `index.html` 文件必须包含 `<head>` 标签，否则 Capacitor 无法正确注入。若缺少 `<head>` 标签，Capacitor 插件将无法正常工作。
:::

### 安装 Capacitor

在项目根目录下安装 Capacitor 核心依赖：JavaScript 运行时和命令行工具（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化配置

通过 CLI 交互式问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问应用名称、包ID等配置信息，随后会生成包含这些配置的 capacitor-config 文件，其中会指定构建输出目录（如 Angular 的 `www`、React 的 `build`、Vue 的 `public` 等）。

:::注意
你可以通过修改 `npx cap init` 生成的 [Capacitor 配置文件](/docs/config) 中的 `webDir` 变量来自定义目录。虽然 Capacitor 会尝试根据你使用的框架自动检测默认值，但建议在首次同步构建时仔细检查该配置。
:::

### 创建原生平台项目

安装核心运行时后，可添加 Android 和 iOS 平台支持：

```bash
npm i @capacitor/android @capacitor/ios
```

添加平台到 `package.json` 后，执行以下命令创建原生项目：

```bash
npx cap add android
npx cap add ios
```

### 同步网页代码到原生项目

创建原生项目后，运行以下命令将网页应用同步到原生项目：

```bash
npx cap sync
```

该命令会将 [Capacitor 配置文件](/docs/config) 中 `webDir` 指定的构建产物复制到原生项目，并安装原生项目依赖。

## 下一步

完成环境配置和项目搭建后，你就可以开始开发了！如需更详细的文档，请参考以下链接：

[开始 iOS 开发 &#8250;](/main/ios/index.md)

[开始 Android 开发 &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)