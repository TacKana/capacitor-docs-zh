---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

你可以创建一个新的 Capacitor 应用，或将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或使用 [VS Code 扩展](vscode/getting-started) 来完成。

记得确保你的[环境已设置好](/main/getting-started/environment-setup.md)用于你要构建的平台。

## 创建一个新的 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用。你可以在空目录中运行以下命令来生成一个新的 Capacitor 应用。

```bash
npm init @capacitor/app
```

## 将 Capacitor 添加到你的 Web 应用

Capacitor 被设计为可以嵌入到任何现代 JavaScript Web 应用中。但是，你的项目需要满足以下三个要求才能将 Capacitor 与你现有的应用一起使用：

- 一个 `package.json` 文件
- 一个独立的目录用于存放构建后的 Web 资源，如 `dist` 或 `www`
- 在你的 Web 资源目录的根目录下有一个 `index.html` 文件

:::info
你的 `index.html` 文件必须有一个 `<head>` 标签，以便正确注入 Capacitor。如果你的 HTML 中没有 `<head>` 标签，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在你的应用根目录中，安装 Capacitor 的主要 npm 依赖：核心 JavaScript 运行时和命令行界面（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化你的 Capacitor 配置

然后，使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会问你几个问题，首先是你的应用名称，以及你希望为应用使用的包 ID。

### 创建你的 Android 和 iOS 项目

安装 Capacitor 核心运行时后，你可以安装 Android 和 iOS 平台。

```bash
npm i @capacitor/android @capacitor/ios
```

将平台添加到 `package.json` 后，你可以运行以下命令为你的原生应用创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 将你的 Web 代码同步到原生项目

创建原生项目后，你可以通过运行以下命令将你的 Web 应用同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将你构建的 Web 应用（默认是 `www`）复制到原生项目并安装原生项目的依赖。

:::info
你可以通过修改 `npx cap init` 期间创建的 [Capacitor 配置](/main/reference/config.md)文件中的 `webDir` 变量来自定义要复制的文件夹。
:::

## 下一步去哪里

完成环境设置和项目结构正确配置后，你就可以开始了！如果你需要更具体的文档，可以点击以下任何链接。

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)
