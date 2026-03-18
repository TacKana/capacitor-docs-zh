---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

您可以创建一个新的 Capacitor 应用程序，或将 Capacitor 添加到您现有的 Web 项目中。这可以通过 CLI 或使用 [VS Code 扩展](vscode/getting-started) 来完成。

请记住，确保您已为将要构建的平台[设置好环境](/main/getting-started/environment-setup.md)。

## 创建新的 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用程序。您可以在空目录中运行以下命令来搭建一个新的 Capacitor 应用框架。

```bash
npm init @capacitor/app
```

## 将 Capacitor 添加到您的 Web 应用

Capacitor 被设计为可以轻松集成到任何现代 JavaScript Web 应用中。但是，为了在现有应用中使用 Capacitor，您的项目需要满足以下三个要求：

- 一个 `package.json` 文件
- 一个用于存放构建后的 Web 资源（如 `dist` 或 `www`）的独立目录
- 在您的 Web 资源目录根目录下有一个 `index.html` 文件

:::info
您的 `index.html` 文件必须包含 `<head>` 标签，以便 Capacitor 能正确注入。如果您的 HTML 中没有 `<head>`，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在您的应用根目录下，安装 Capacitor 的主要 npm 依赖：核心 JavaScript 运行时和命令行界面 (CLI)。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后，使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会问您几个问题，从您的应用名称开始，然后是您希望为应用使用的包 ID。

### 创建 Android 和 iOS 项目

安装 Capacitor 核心运行时后，您可以安装 Android 和 iOS 平台。

```bash
npm i @capacitor/android @capacitor/ios
```

将平台添加到您的 `package.json` 后，您可以运行以下命令为您的原生应用程序创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 将 Web 代码同步到原生项目

创建原生项目后，您可以运行以下命令将您的 Web 应用程序同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将您构建的 Web 应用程序（默认为 `www`）复制到您的原生项目，并安装原生项目的依赖项。

:::info
您可以通过修改在 `npx cap init` 期间创建的 [Capacitor 配置文件](/main/reference/config.md) 中的 `webDir` 变量来自定义要复制的文件夹。
:::

## 下一步

在设置好环境并正确配置项目结构后，您就可以开始了！如果您需要更具体的文档，可以点击以下任意链接。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流程指南 &#8250;](/main/basics/workflow.md)