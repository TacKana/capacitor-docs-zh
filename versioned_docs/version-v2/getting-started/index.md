---
title: 安装 Capacitor
description: 安装 Capacitor
contributors:
  - dotNetkow
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/getting-started
---

# 安装 Capacitor

开始使用 Capacitor 有两种方式：将 Capacitor 添加到现有前端项目（推荐），或启动一个新项目。Capacitor 主要设计为嵌入到现有的前端项目中，但如果您想从零开始，它也附带了一个简单的起始项目结构。

Capacitor 为 web 应用提供原生移动运行时和 API 层。它 _不_ 附带任何特定的 UI 控件集，除非您正在构建游戏或类似项目，否则您很可能需要这些控件。

我们强烈建议使用您选择的移动前端框架（如 [Ionic Framework](https://ionicframework.com/)）来启动 Capacitor 项目。

## 开始之前

确保您已为目标平台安装了所有必需的 [依赖项](/getting-started/dependencies.md)。最重要的是，如果您计划在 Mac 上为 iOS 构建，请确保在启动新项目之前使用 `pod repo update` 更新 CocoaPods。

## 将 Capacitor 添加到现有 Ionic 应用

[请参见此处。](/getting-started/with-ionic.md)

## 将 Capacitor 添加到现有 Web 应用

Capacitor 被设计为嵌入到任何现有的现代 JavaScript Web 应用中。需要有效的 `package.json` 文件和包含所有 web 资源的文件夹才能开始。此外，主 `index.html` 文件中需要 `<head>` 元素，因为 Capacitor 在应用初始化时会被注入到该元素中。

要将 Capacitor 添加到您的 web 应用，请运行以下命令：

```bash
cd my-app
npm install @capacitor/core @capacitor/cli
```

然后，使用您的应用信息初始化 Capacitor。

_注意：`npx` 是 npm 5 或更高版本中提供的一个新实用程序，它执行本地二进制文件/脚本以避免全局安装。_

```bash
npx cap init
```

此命令将提示您输入应用名称和应用 id（Android 的包名和 iOS 的 bundle identifier）。使用 `--web-dir` 标志设置 web 资源文件夹（默认为 `www`）。

接下来，安装任何所需的原生平台：

```bash
npx cap add android
npx cap add ios
```

🎉 Capacitor 现已安装在您的项目中。🎉

## 可选：启动新项目

如果您想重新开始并计划单独添加 UI/前端框架，Capacitor 附带了一个标准项目结构。

要创建它，请运行：

```bash
npx @capacitor/cli create
```

此命令将提示您输入应用名称和应用 id（Android 的包名和 iOS 的 bundle identifier）。

这将创建一个非常简单的起始应用，没有 UI 库。

## 下一步

确保您已安装 [所需依赖项](/getting-started/dependencies.md)，包括 [PWA Elements](/web/pwa-elements.mdx)，然后继续阅读 [开发者工作流指南](/basics/workflow.md) 以了解如何构建 Capacitor 应用。