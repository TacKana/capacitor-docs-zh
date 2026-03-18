---
title: Capacitor Android 文档
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/android
---

# Capacitor Android 文档

Capacitor 提供了一个原生的 Android 运行时环境，使开发者能够在 JavaScript 和 Android 原生 Java 代码之间进行通信。

Capacitor Android 应用通常通过 Android Studio 进行配置和管理。请参考以下指南以获取各个主题的更多信息：

## 开始使用

开发 Android 应用需要安装一些 Android SDK 依赖项。请确保安装 Android SDK 工具（要求版本 26.0.1 或更高），以及 API 21 或更高版本的 Android SDK 平台。

你可以通过打开 Android Studio，从顶部菜单栏选择工具 -> Android -> SDK 管理器来轻松安装这些组件：

![SDK 平台](../../../static/img/v3/docs/android/sdk-platforms.png)
![SDK 工具](../../../static/img/v3/docs/android/sdk-tools.png)

### 创建 Android 项目

默认情况下，每个 Capacitor 项目都会创建一个 Android 项目。如果你正在向现有项目添加 Capacitor，可以手动添加 Android 项目：

```bash
npx cap add android
npx cap sync
```

`sync` 命令会更新依赖项，并将所有 Web 资源复制到你的项目中。你也可以运行：

```bash
npx cap copy
```

仅复制 Web 资源，如果你确定不需要更新原生依赖项，这种方式会更快。

### 打开 Android 项目

要在 Android Studio 中打开项目，运行：

```bash
npx cap open android
```

### 运行你的应用

> **注意：** 目前要使用 Android 模拟器，你必须使用 Android 7.0 版本（API 24）或更高的系统镜像。这是因为模拟器上的系统 WebView 版本无法更新。物理设备只要系统 WebView 已更新，可以支持到 Android 5.0（API 21）。

一旦 Android Studio 打开，你应该能够在设备或模拟器上运行你的应用。点击运行或调试：

![运行应用](../../../static/img/v3/docs/android/running.png)

### 故障排除

如果你在上面遇到了任何问题，请通过在代码仓库中提交问题来告知我们，然后参考 [Android 故障排除](/android/troubleshooting.md) 页面以获取常见 Android 问题的解决方案。

### 后续步骤

如果你的应用成功运行，你现在可以继续开发和构建你的应用。使用各种可用的 API、Capacitor 或 Cordova 插件，或者自定义的原生代码来构建应用的其余部分。

## 进一步阅读

请遵循这些 Android 特定的指南，以获取有关为你的应用设置权限、更新依赖项、构建插件等更多信息：

[为 Android 配置和设置权限 &#8250;](/android/configuration.md)

[为 Android 构建原生插件 &#8250;](/plugins.md)