---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

您可以创建一个新的 Capacitor 应用，或将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或使用社区维护的 [VS Code 扩展](/main/getting-started/vscode-extension.mdx)来完成。

请确保您已为要构建的平台完成了[环境配置](/main/getting-started/environment-setup.md)。

## 创建新 Capacitor 应用

`@capacitor/create-app` 包可用于快速创建 Capacitor 应用程序。在空目录中运行以下命令即可搭建新的 Capacitor 应用脚手架。

```bash
npm init @capacitor/app@latest
```

## 将 Capacitor 添加到现有 Web 应用

Capacitor 设计用于任何现代 JavaScript Web 应用。但要与现有应用结合使用，您的项目需满足以下三个要求：

- 具备 `package.json` 文件
- 有单独的构建资源目录（如 `dist` 或 `www`）
- 在资源目录根路径下有 `index.html` 文件

:::info
您的 `index.html` 文件必须包含 `<head>` 标签才能正确注入 Capacitor。如果 HTML 中没有 `<head>` 标签，Capacitor 插件将无法工作。
:::

### 安装 Capacitor

在应用根目录下，安装 Capacitor 的核心 npm 依赖：JavaScript 运行时和命令行工具（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后通过 CLI 问答方式初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问几个问题，包括应用名称和您想使用的包 ID。它将根据这些配置细节创建 capacitor 配置文件，其中包含构建工具预期的输出目录（例如 Angular 为 `www`，React 为 `build`，Vue 为 `public` 等）。

:::info
您可以通过修改 `npx cap init` 时创建的 [Capacitor 配置](/docs/config) 文件中的 `webDir` 变量来自定义 Capacitor 使用的文件夹。请注意，Capacitor 会通过检测您使用的框架来尝试自动识别默认值。但在首次同步构建遇到问题时，建议仔细检查此配置变量。
:::

### 创建 Android 和 iOS 项目

安装 Capacitor 核心运行时后，您可以安装 Android 和 iOS 平台支持。

```bash
npm i @capacitor/android @capacitor/ios
```

平台依赖添加到 `package.json` 后，可运行以下命令为原生应用创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 同步 Web 代码到原生项目

创建原生项目后，运行以下命令将 Web 应用同步到原生项目：

```bash
npx cap sync
```

`npx cap sync` 会将 [Capacitor 配置](/docs/config) 文件中 `webDir` 指定的构建好的 Web 资源包复制到原生项目，并安装原生项目的依赖。

## 后续步骤

完成环境配置和项目结构搭建后，您就可以开始开发了！如需更具体的文档，请参考以下链接：

[开始 iOS 开发 &#8250;](/main/ios/index.md)

[开始 Android 开发 &#8250;](/main/android/index.md)

[开发者工作流指南 &#8250;](/main/basics/workflow.md)