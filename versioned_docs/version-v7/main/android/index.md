---
title: Capacitor Android 文档
sidebar_label: 快速开始
slug: /android
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor Android 文档

Capacitor 提供了原生的 Android 运行时环境，使开发者能够在 JavaScript 与原生 Java 或 Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持情况

支持 API 23+（Android 6 或更高版本），覆盖约 99% 的 Android 市场。Capacitor 要求 Android WebView 使用 Chrome 60 或更高版本。在 Android 6 和 10+ 系统上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)；在 Android 7-9 系统上，则使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView 支持。

## 添加 Android 平台

首先，安装 `@capacitor/android` 包。

```bash
npm install @capacitor/android
```

然后，添加 Android 平台。

```bash
npx cap add android
```

## 打开 Android 项目

要在 Android Studio 中打开项目，请运行：

```bash
npx cap open android
```

或者，您也可以直接打开 Android Studio 并导入 `android/` 目录作为 Android Studio 项目。

## 运行您的应用

您可以通过命令行或 Android Studio 运行应用。

> 使用 Android 模拟器时，必须选择 API 24+ 的系统映像。模拟器上的系统 WebView 不会自动更新。物理设备只要系统 WebView 保持更新，最低可支持到 API 23。

### 通过命令行运行

要在设备或模拟器上运行项目，请执行：

```bash
npx cap run android
```

该命令会提示您选择目标设备。[详细了解 `run` 命令](/cli/commands/run.md)。

> 使用 `run` 命令需要连接物理 Android 设备或已下载模拟器系统映像。请参阅 [Android Studio 中创建模拟器设备和下载系统映像的文档](https://developer.android.com/studio/run/managing-avds)。

### 通过 Android Studio 运行

在 Android Studio 中，首先选择设备或模拟器，然后点击运行或调试按钮来启动应用。除非您需要调试 Java 或 Kotlin 代码，否则建议使用运行按钮。

![运行应用](/img/v6/docs/android/running.png)

## 故障排除

如果在入门过程中遇到任何问题，可以参考 [Android 故障排除指南](/main/android/troubleshooting.md)。如需帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

如果应用成功运行，您现在可以继续开发和构建应用了。利用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来完成应用的其余部分。

## 延伸阅读

请参阅以下 Android 专项指南，了解更多关于设置应用权限、更新依赖项、构建插件等内容：

[配置和设置 Android 权限 &#8250;](/main/android/configuration.md)

[为 Android 构建原生插件 &#8250;](/plugins/creating-plugins/android-guide.md)
