---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

你可以创建一个新的 Capacitor 应用，或将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或使用社区维护的 [VS Code 扩展](/main/getting-started/vscode-extension.mdx) 来完成。

记得确保你的[环境已设置好](/main/getting-started/environment-setup.md)，适用于你要构建的平台。

## 创建新的 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用。你可以在空目录中运行以下命令来搭建一个新的 Capacitor 应用。

```bash
npm init @capacitor/app@latest
```

## 将 Capacitor 添加到你的 Web 应用

Capacitor 被设计为可以接入任何现代 JavaScript Web 应用。但是，你的项目需要满足以下三个要求才能将 Capacitor 与你的现有应用一起使用：

- 一个 `package.json` 文件
- 一个用于存放构建后 Web 资源的独立目录，如 `dist` 或 `www`
- 一个位于 Web 资源目录根目录的 `index.html` 文件

:::info
你的 `index.html` 文件必须包含 `<head>` 标签，以便正确注入 Capacitor。如果你的 HTML 中没有 `<head>` 标签，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在你应用的根目录下，安装 Capacitor 的主要 npm 依赖项：核心 JavaScript 运行时和命令行界面（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后，使用 CLI 问答向导初始化 Capacitor：

```bash
npx cap init
```

CLI 会问你几个问题，首先是你的应用名称，以及你想为应用使用的 Package ID。它将使用这些配置细节创建 Capacitor 配置文件，包括你的打包工具的构建输出目录（例如，Angular 的 `www`，React 的 `build`，Vue 的 `public` 等）。

:::info
你可以通过修改 `npx cap init` 期间创建的 [Capacitor 配置文件](/config) 中的 `webDir` 变量来自定义 Capacitor 使用的文件夹。请注意，Capacitor 会尝试通过检查你使用的框架来检测 Web 项目的默认值。不过，在同步第一个构建时遇到问题时，交叉检查这个配置变量是一个好主意。
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

创建原生项目后，你可以通过运行以下命令将你的 Web 应用同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将你的已构建 Web 资源包（预期在 [Capacitor 配置文件](/config) 的 `webDir` 中找到）复制到你的原生项目中，并安装原生项目的依赖项。

## 下一步去哪里

完成环境设置和项目结构正确配置后，你就可以开始了！如果你需要更具体的文档，可以点击以下任何链接。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)
