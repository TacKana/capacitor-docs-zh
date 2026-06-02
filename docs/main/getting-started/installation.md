---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

你可以创建一个新的 Capacitor 应用，或者将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或社区维护的 [VS Code 扩展](/main/getting-started/vscode-extension.mdx) 来完成。

请记得确保你的[环境已搭建](/main/getting-started/environment-setup.md)好，以适配你要构建的目标平台。

## 创建新的 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用。你可以在一个空目录中运行以下命令来搭建一个新的 Capacitor 应用。

```bash
npm init @capacitor/app@latest
```

## 将 Capacitor 添加到你的 Web 应用

Capacitor 被设计为可以接入任何现代的 JavaScript Web 应用。不过，你的项目需要满足以下三个要求才能在现有应用中使用 Capacitor：

- 一个 `package.json` 文件
- 一个独立的构建后的 Web 资源目录，例如 `dist` 或 `www`
- 在 Web 资源目录的根目录下有一个 `index.html` 文件

:::info
你的 `index.html` 文件必须包含 `<head>` 标签，以便正确注入 Capacitor。如果你的 HTML 中没有 `<head>`，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在你的应用根目录下，安装 Capacitor 的主要 npm 依赖：核心 JavaScript 运行时和命令行界面（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后，使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会问你几个问题，首先是你的应用名称，以及你希望为应用使用的包 ID。它会根据这些配置信息创建 Capacitor 配置文件，包括你的打包工具构建过程的预期输出目录（例如 Angular 为 `www`，React 为 `build`，Vue 为 `public` 等）。

:::info
你可以通过修改在 `npx cap init` 期间创建的 [Capacitor Config](/docs/config) 文件中的 `webDir` 变量，来自定义 Capacitor 使用的文件夹。请注意，Capacitor 会通过检测你使用的框架来尝试自动检测 Web 项目的默认目录。不过，在首次构建同步遇到问题时，最好还是交叉检查这个配置变量。
:::

### 创建你的 Android 和 iOS 项目

安装 Capacitor 核心运行时后，你可以安装 Android 和 iOS 平台。

```bash
npm i @capacitor/android @capacitor/ios
```

将平台添加到你的 `package.json` 后，你可以运行以下命令来为你的原生应用创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 将 Web 代码同步到原生项目

创建好原生项目后，你可以通过运行以下命令将你的 Web 应用同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将预期在 [Capacitor Config](/docs/config) 文件的 `webDir` 中找到的已构建的 Web 包复制到你的原生项目，并安装原生项目的依赖。

## 下一步

完成环境搭建和项目结构配置后，你就可以开始了！如果你需要更具体的文档，可以点击以下任意链接。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)
