---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

你可以创建一个新的 Capacitor 应用，或将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 完成，也可以使用社区维护的 [VS Code 扩展插件](/main/getting-started/vscode-extension.mdx)。

请记住，确保你已经为将要构建的平台[设置好环境](/main/getting-started/environment-setup.md)。

## 创建新的 Capacitor 应用

可以使用 `@capacitor/create-app` 包来快速创建一个 Capacitor 应用。你可以在一个空目录中运行以下命令，以搭建一个新的 Capacitor 应用程序骨架。

```bash
npm init @capacitor/app@latest
```

## 将 Capacitor 添加到你的 Web 应用 {#add-capacitor-to-your-web-app}

Capacitor 的设计初衷是可以轻松集成到任何现代 JavaScript Web 应用中。然而，要让你现有的应用程序使用 Capacitor，你的项目需要满足以下三个要求：

- 一个 `package.json` 文件
- 一个单独的目录用于存放构建好的 Web 资源，例如 `dist` 或 `www`
- 一个位于 Web 资源目录根目录下的 `index.html` 文件

:::info
你的 `index.html` 文件必须包含一个 `<head>` 标签，以便 Capacitor 能正确注入。如果你的 HTML 中没有 `<head>`，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在你的应用根目录中，安装 Capacitor 的主要 npm 依赖：核心 JavaScript 运行时和命令行接口 (CLI)。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化你的 Capacitor 配置

然后，使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问你几个问题，从你的应用名称开始，以及你希望为应用使用的包ID。它将使用这些配置详细信息创建 capacitor 配置文件，包括你的打包器构建过程预期的输出目录（例如，Angular 的 `www`，React 的 `build`，Vue 的 `public` 等）。

:::info
你可以通过修改在 `npx cap init` 期间创建的 [Capacitor 配置](/config) 文件中的 `webDir` 变量来自定义 Capacitor 使用的文件夹。请注意，Capacitor 会尝试通过检查你使用的框架来检测你的 Web 项目的默认值。尽管如此，在首次同步构建遇到问题时，交叉检查这个配置变量是一个好主意。
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

### 将你的 Web 代码同步到原生项目

创建原生项目后，你可以通过运行以下命令将你的 Web 应用程序同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将你的构建好的 Web 包（预期在 [Capacitor 配置](/config) 文件的 `webDir` 中找到）复制到你的原生项目，并安装原生项目的依赖项。

## 下一步

环境已设置好，项目结构也已正确配置，一切就绪！如果你需要更具体的文档，可以点击下面的任何链接继续。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流程指南 &#8250;](/main/basics/workflow.md)
