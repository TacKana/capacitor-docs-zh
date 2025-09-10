---
title: 安装 Capacitor
description: Capacitor 安装指南
slug: /getting-started
---

# 安装 Capacitor

您既可以创建一个全新的 Capacitor 应用，也可以将 Capacitor 集成到现有的 Web 项目中。这可以通过 CLI 或使用 [VS Code 扩展](vscode/getting-started) 来完成。

请确保您已根据目标平台完成 [环境配置](/main/getting-started/environment-setup.md)。

## 创建新 Capacitor 应用

使用 `@capacitor/create-app` 包可以快速搭建 Capacitor 应用。在空目录中执行以下命令即可创建新项目骨架：

```bash
npm init @capacitor/app
```

## 为现有 Web 应用添加 Capacitor

Capacitor 设计用于与任何现代 JavaScript Web 应用无缝集成。要使现有项目支持 Capacitor，需满足以下三个条件：

- 存在 `package.json` 文件
- 有独立的静态资源目录（如 `dist` 或 `www`）
- 静态资源目录根路径存在 `index.html` 文件

:::info
为保证 Capacitor 正确注入，您的 `index.html` 必须包含 `<head>` 标签。若无此标签，Capacitor 插件将无法正常工作。
:::

### 安装 Capacitor

在项目根目录安装 Capacitor 的核心 npm 依赖：JavaScript 运行时和命令行工具（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化配置

通过 CLI 问答向导初始化 Capacitor 配置：

```bash
npx cap init
```

CLI 将询问应用名称和包 ID 等基本信息。

### 创建 Android/iOS 项目

安装核心运行时后，可添加 Android 和 iOS 平台支持：

```bash
npm i @capacitor/android @capacitor/ios
```

平台依赖添加到 `package.json` 后，运行以下命令创建原生项目：

```bash
npx cap add android
npx cap add ios
```

### 同步 Web 代码到原生项目

创建原生项目后，执行同步命令将 Web 应用代码部署到原生工程：

```bash
npx cap sync
```

该命令默认会将 `www` 目录下的构建产物复制到原生项目，并安装原生依赖。

:::info
如需修改默认的同步目录，可在 `npx cap init` 生成的 [Capacitor 配置文件](/main/reference/config.md) 中调整 `webDir` 参数。
:::

## 后续步骤

完成环境配置和项目初始化后，您可以继续深入探索：

[iOS 开发指南 &#8250;](/main/ios/index.md)

[Android 开发指南 &#8250;](/main/android/index.md)

[开发工作流详解 &#8250;](/main/basics/workflow.md)