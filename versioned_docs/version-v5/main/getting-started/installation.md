---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

您可以创建一个新的 Capacitor 应用，或将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或使用 [VS Code 扩展](vscode/getting-started)来完成。

请记得确保您已为要构建的平台[设置好了环境](/main/getting-started/environment-setup.md)。

## 创建新的 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用。您可以在空目录中运行以下命令来搭建一个新的 Capacitor 应用。

```bash
npm init @capacitor/app
```

## 将 Capacitor 添加到您的 Web 应用

Capacitor 被设计为可以插入任何现代 JavaScript Web 应用。但是，您的项目需要满足以下三个要求才能与现有应用一起使用 Capacitor：

- 一个 `package.json` 文件
- 一个用于存放构建后的 Web 资产的独立目录，如 `dist` 或 `www`
- 一个位于 Web 资产目录根目录的 `index.html` 文件

:::info
您的 `index.html` 文件必须包含 `<head>` 标签才能正确注入 Capacitor。如果您的 HTML 中没有 `<head>` 标签，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在应用的根目录下，安装 Capacitor 的主要 npm 依赖项：核心 JavaScript 运行时和命令行界面（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后，使用 CLI 问答来初始化 Capacitor：

```bash
npx cap init
```

CLI 会问您几个问题，首先是您的应用名称，以及您想为应用使用的 package ID。

### 创建您的 Android 和 iOS 项目

安装 Capacitor 核心运行时后，您可以安装 Android 和 iOS 平台。

```bash
npm i @capacitor/android @capacitor/ios
```

一旦平台被添加到您的 `package.json` 中，您可以运行以下命令来为您的原生应用创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 将您的 Web 代码同步到原生项目

创建原生项目后，您可以通过运行以下命令将 Web 应用同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将您构建的 Web 应用（默认为 `www`）复制到您的原生项目，并安装原生项目的依赖项。

:::info
您可以通过修改在 `npx cap init` 期间创建的 [Capacitor 配置](/main/reference/config.md)文件中的 `webDir` 变量来自定义复制哪个文件夹。
:::

## 下一步

环境设置完成且项目结构正确配置后，您就可以开始开发了！如果您需要更具体的文档，可以点击下面的任何链接。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)
