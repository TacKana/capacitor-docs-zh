---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

本指南将帮助您将 Capacitor 安装到现有的前端 Web 应用程序中。

> 如果要创建新应用，我们建议先使用您选择的 JavaScript 框架文档创建应用，然后按照本指南集成 Capacitor。
>
> 您也可以使用 `npm init @capacitor/app` 创建一个新的基础应用。

Capacitor 为 Web 应用提供了原生移动运行时和 API 层。它不附带任何特定的 UI 控件集。我们建议您使用移动组件框架（例如 [Ionic Framework](https://ionicframework.com/)）。

## 开始之前

请确保您已为要构建的平台[设置好环境](/main/getting-started/environment-setup.md)。

## 项目要求

Capacitor 设计用于任何现代 JavaScript Web 应用。项目必须满足以下要求：

- 必须具有 `package.json` 文件。
- 必须有一个单独的 Web 资源目录。
- 必须在 Web 资源目录的根目录下有一个包含 `<head>` 标签的 `index.html` 文件。

## 将 Capacitor 添加到您的应用

在应用的根目录中，安装 Capacitor：

```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
```

然后，使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问您几个问题，从应用名称开始，然后是您想要为应用使用的包 ID。

> `npx cap` 命令是在项目中本地执行 Capacitor 的方式。[了解更多关于 Capacitor CLI 的信息](/cli/index.md)。

## 下一步

[开始使用 iOS &#8250;](/main/ios/index.md)

[开始使用 Android &#8250;](/main/android/index.md)

[开发者工作流程指南 &#8250;](/main/basics/workflow.md)