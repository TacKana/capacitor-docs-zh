---
title: Capacitor Android 文档
sidebar_label: 入门指南
slug: /android
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor Android 文档

Capacitor 提供了一个原生的 Android 运行时，使开发者能够在 JavaScript 和原生的 Java 或 Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持

支持 API 22+（Android 5.1 或更高版本），这覆盖了 [超过 99% 的 Android 市场](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)。Capacitor 要求 Android WebView 的 Chrome 版本在 60 或更高。在 Android 5-6 和 10+ 上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。在 Android 7-9 上，则使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供的 WebView。

## 添加 Android 平台

首先，安装 `@capacitor/android` 包。

```bash
npm install @capacitor/android
```

然后，添加 Android 平台。

```bash
npx cap add android
```

## 打开 Android 项目 {#opening-the-android-project}

要在 Android Studio 中打开项目，请运行：

```bash
npx cap open android
```

或者，你也可以直接打开 Android Studio，然后将 `android/` 目录作为 Android Studio 项目导入。

## 运行你的应用

你可以在命令行中运行你的应用，也可以在 Android Studio 中运行。

> 要使用 Android 模拟器，必须使用 API 24+ 的系统镜像。模拟器上的 System WebView 不会自动更新。物理设备只要其 System WebView 已更新，理论上可以低至 API 21。

### 在命令行中运行

要在设备或模拟器上运行项目，请运行：

```bash
npx cap run android
```

该命令会提示你选择目标设备。[了解更多关于 `run` 命令的信息](/cli/commands/run.md)。

> 要使用 `run` 命令，需要一台物理 Android 设备或一个已下载的模拟器系统镜像。请参阅 [Android Studio 中创建模拟器设备和下载系统镜像的文档](https://developer.android.com/studio/run/managing-avds)。

### 在 Android Studio 中运行 {#running-with-android-studio}

在 Android Studio 中，首先选择设备或模拟器，然后单击运行或调试按钮来启动你的应用。除非你正在调试 Java 或 Kotlin 代码，否则建议使用运行按钮。

![运行应用](../../../../static/img/v4/docs/android/running.png)

## 故障排除

如果在入门过程中遇到任何问题，可以参考 [Android 故障排除指南](/main/android/troubleshooting.md)。如果需要帮助，欢迎 [发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

如果你的应用已经成功运行，那么现在就可以继续开发和构建你的应用了。利用各种可用的 API、Capacitor 或 Cordova 插件，或者自定义原生代码来完成应用的其余部分。

## 延伸阅读

以下这些针对 Android 的指南，提供了更多关于配置应用权限、更新依赖、构建插件等信息：

[为 Android 配置和设置权限 &#8250;](/main/android/configuration.md)

[为 Android 构建原生插件 &#8250;](/plugins.mdx)