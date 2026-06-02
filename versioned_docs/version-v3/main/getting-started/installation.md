---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

本指南将帮助您将 Capacitor 安装到现有的前端 Web 应用中。

> 如果是从新应用开始，我们建议先使用您选择的 JavaScript 框架的文档，然后按照本指南集成 Capacitor。
>
> 您也可以使用 `npm init @capacitor/app` 创建一个新的基础应用。

Capacitor 为 Web 应用提供原生移动运行时和 API 层。它不附带任何特定的 UI 控件集。我们建议您使用移动组件框架（例如 [Ionic Framework](https://ionicframework.com/)）。

## 开始之前

确保您的[开发环境](/main/getting-started/environment-setup.md)已为要构建的平台设置好。

## 项目要求

Capacitor 设计为可嵌入任何现代 JavaScript Web 应用。项目必须满足以下要求：

- 必须有 `package.json` 文件。
- 必须有一个单独的 Web 资源目录。
- 必须在 Web 资源目录的根目录下有一个包含 `<head>` 标签的 `index.html` 文件。

## 将 Capacitor 添加到您的应用

在应用的根目录下，安装 Capacitor：

```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
```

然后，使用 CLI 问卷调查初始化 Capacitor：

```bash
npx cap init
```

CLI 会问您几个问题，首先是您的应用名称以及您想要为应用使用的包 ID。

> `npx cap` 命令是 Capacitor 在项目中本地命令行上执行的方式。[了解更多关于 Capacitor CLI 的信息](/cli/index.md)。

## 下一步

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)
