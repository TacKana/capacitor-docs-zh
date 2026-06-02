---
title: Capacitor Android 文档
sidebar_label: 开始
slug: /android
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor Android 文档

Capacitor 拥有原生 Android 运行时，使开发者能够在 JavaScript 和原生 Java 或 Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持

支持 API 24+（Android 7 或更高版本），这覆盖了约 99% 的 Android 市场。Capacitor 需要 Chrome 60 或更高版本的 Android WebView。在 Android 7-9 上，[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView。在 Android 10+ 上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。

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

要在 Android Studio 中打开项目，运行：

```bash
npx cap open android
```

或者，你可以打开 Android Studio 并导入 `android/` 目录作为 Android Studio 项目。

## 运行你的应用

你可以通过命令行或 Android Studio 运行你的应用。

> 要使用 Android 模拟器，你必须使用 API 24+ 的系统镜像。模拟器上的 System WebView 不会自动更新。只要 System WebView 已更新，物理设备应能支持低至 API 24 的版本。

### 在命令行上运行

要在设备或模拟器上运行项目，运行：

```bash
npx cap run android
```

该命令将提示你选择一个目标。[了解更多关于 `run` 命令的信息](/cli/commands/run.md)。

> 使用 `run` 命令需要 Android 物理设备或已下载的模拟器系统镜像。请参阅[这里关于在 Android Studio 中创建模拟器设备和下载系统镜像的文档](https://developer.android.com/studio/run/managing-avds)。

### 使用 Android Studio 运行

在 Android Studio 中，首先选择设备或模拟器，然后点击运行或调试按钮来运行你的应用。除非你在调试 Java 或 Kotlin 代码，否则建议使用运行按钮。

![运行应用](../../../static/img/v6/docs/android/running.png)

## 故障排除

如果在开始使用过程中遇到任何问题，你可以查阅 [Android 故障排除指南](/main/android/troubleshooting.md)。如果需要帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 下一步

如果你的应用成功运行，你现在可以继续开发和构建你的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来构建应用的其他部分。

## 延伸阅读

请关注以下 Android 专属指南，了解更多关于为应用设置权限、更新依赖项、构建插件等信息：

[Android 配置与权限设置 &#8250;](/main/android/configuration.md)

[为 Android 构建原生插件 &#8250;](/plugins/creating-plugins/android-guide.md)
