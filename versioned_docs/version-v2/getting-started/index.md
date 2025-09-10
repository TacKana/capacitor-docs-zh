---
title: 安装 Capacitor
description: Capacitor 安装指南
contributors:
  - dotNetkow
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/getting-started
---

# 安装 Capacitor

有两种方式开始使用 Capacitor：将 Capacitor 添加到现有前端项目（推荐），或创建一个全新项目。Capacitor 主要设计为能够直接集成到现有前端项目中，但也提供了简单的初始项目结构供全新项目使用。

Capacitor 为网页应用提供了原生移动运行时和 API 层。它本身_不包含_任何特定的 UI 控件集，除非您正在开发游戏或类似应用，否则很可能需要额外添加 UI 组件。

我们强烈建议使用您选择的前端框架（如 [Ionic Framework](https://ionicframework.com/)）来启动 Capacitor 项目。

## 开始前的准备

确保已为要构建的平台安装所有必要的[依赖项](/getting-started/dependencies.md)。最重要的是，如果您计划在 Mac 上构建 iOS 应用，请务必在创建新项目前通过 `pod repo update` 更新 CocoaPods。

## 将 Capacitor 添加到现有 Ionic 应用

[参见此处](/getting-started/with-ionic.md)。

## 将 Capacitor 添加到现有网页应用

Capacitor 设计为可以集成到任何现代 JavaScript 网页应用中。开始前需要有效的 `package.json` 文件和一个包含所有网页资源的文件夹。此外，主 `index.html` 文件中需要有 `<head>` 元素，因为 Capacitor 会在应用初始化时注入其中。

要将 Capacitor 添加到您的网页应用，请运行以下命令：

```bash
cd my-app
npm install @capacitor/core @capacitor/cli
```

然后，使用您的应用信息初始化 Capacitor。

_注意：`npx` 是 npm 5 及以上版本提供的新工具，用于执行本地二进制文件/脚本以避免全局安装。_

```bash
npx cap init
```

此命令会提示您输入应用名称和应用的包标识符（Android 的包名和 iOS 的 bundle identifier）。使用 `--web-dir` 标志设置网页资源文件夹（默认为 `www`）。

接下来，安装所需的原生平台：

```bash
npx cap add android
npx cap add ios
```

🎉 Capacitor 现已成功安装到您的项目中。🎉

## 可选：创建全新项目

如果您希望从头开始并计划单独添加 UI/前端框架，Capacitor 提供了标准的初始项目结构。

创建命令如下：

```bash
npx @capacitor/cli create
```

此命令会提示您输入应用名称和应用的包标识符（Android 的包名和 iOS 的 bundle identifier）。

这将创建一个非常简单的初始应用，不含任何 UI 库。

## 下一步

确保已安装[必要的依赖项](/getting-started/dependencies.md)，包括 [PWA Elements](/web/pwa-elements.mdx)，然后继续阅读[开发者工作流指南](/basics/workflow.md)了解如何构建 Capacitor 应用。