---
title: 安装 Capacitor
description: 安装 Capacitor
contributors:
  - dotNetkow
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/getting-started
---

# 安装 Capacitor

有两种方式开始使用 Capacitor：将 Capacitor 添加到现有的前端项目（推荐），或者创建一个全新的项目。Capacitor 主要是为现有前端项目设计的即插即用方案，但如果你希望从头开始，它也提供了一个简单的项目启动结构。

Capacitor 为 Web 应用提供了原生的移动运行时和 API 层。它**不**包含任何特定的 UI 控件集，除非你正在开发游戏或类似的应用，否则很可能需要这些控件。

我们强烈建议使用你选择的移动前端框架（例如 [Ionic Framework](https://ionicframework.com/)）来启动 Capacitor 项目。

## 开始之前

请确保已安装所有目标平台所需的[依赖项](/getting-started/dependencies.md)。最重要的是，如果你计划在 Mac 上为 iOS 构建，请确保在开始新项目前使用 `pod repo update` 更新 CocoaPods。

## 将 Capacitor 添加到现有的 Ionic 应用

[请参阅此处。](/getting-started/with-ionic.md)

## 将 Capacitor 添加到现有的 Web 应用

Capacitor 设计为可以轻松集成到任何现有的现代 JavaScript Web 应用中。开始之前，需要一个有效的 `package.json` 文件和一个包含所有 Web 资源的文件夹。此外，主 `index.html` 文件中需要包含 `<head>` 元素，因为 Capacitor 在应用初始化时会注入到该位置。

要将 Capacitor 添加到你的 Web 应用，请运行以下命令：

```bash
cd my-app
npm install @capacitor/core @capacitor/cli
```

然后，使用你的应用信息初始化 Capacitor。

_注意：`npx` 是 npm 5 或更高版本中提供的新工具，用于执行本地二进制文件/脚本，以避免全局安装。_

```bash
npx cap init
```

此命令会提示你输入应用的名称和应用 ID（Android 的包名和 iOS 的包标识符）。使用 `--web-dir` 标志设置 Web 资源文件夹（默认为 `www`）。

接下来，安装所需的任何原生平台：

```bash
npx cap add android
npx cap add ios
```

🎉 Capacitor 现已成功安装到你的项目中。🎉

## 可选：创建一个全新项目

如果你希望从头开始，并计划单独添加 UI/前端框架，Capacitor 提供了一个标准的项目结构。

要创建它，请运行：

```bash
npx @capacitor/cli create
```

此命令会提示你输入应用的名称和应用 ID（Android 的包名和 iOS 的包标识符）。

这将创建一个非常简单的启动应用，不包含任何 UI 库。

## 下一步

请确保已安装[所需依赖项](/getting-started/dependencies.md)，包括 [PWA Elements](/web/pwa-elements.mdx)，然后继续阅读[开发者工作流指南](/basics/workflow.md)以了解如何构建 Capacitor 应用。