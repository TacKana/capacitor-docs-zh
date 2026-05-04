---
title: Installing Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

本指南将帮助你如何将 Capacitor 集成到现有的前端 Web 应用程序中。

> 如果是创建新应用，我们建议先参考你选择的 JavaScript 框架的官方文档创建项目，然后再按照本指南集成 Capacitor。
>
> 你也可以使用 `npm init @capacitor/app` 创建一个新的基础应用。

Capacitor 为 Web 应用提供了原生的移动端运行时和 API 层。它本身不包含任何特定的 UI 控件集。我们建议你使用一个移动端组件框架（例如 [Ionic Framework](https://ionicframework.com/)）。

## 开始之前

请确保你已经为将要构建的平台[设置好了开发环境](/main/getting-started/environment-setup.md)。

## 项目要求

Capacitor 被设计为可以轻松集成到任何现代 JavaScript Web 应用中。项目必须满足以下要求：

- 必须有一个 `package.json` 文件。
- 必须有一个单独的目录用于存放 Web 静态资源。
- 必须在 Web 静态资源目录的根目录下有一个包含 `<head>` 标签的 `index.html` 文件。

## 将 Capacitor 添加到你的应用 {#adding-capacitor-to-your-app}

在你的应用根目录下，安装 Capacitor：

```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
```

然后，使用 CLI 的交互式问卷来初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问你几个问题，首先是你的应用名称，以及你想为应用使用的包标识符。

> `npx cap` 命令是在你项目的本地命令行中执行 Capacitor 操作的方式。[了解更多关于 Capacitor CLI 的信息](/cli/index.md)。

## 下一步

[开始 iOS 开发 &#8250;](/main/ios/index.md)

[开始 Android 开发 &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)