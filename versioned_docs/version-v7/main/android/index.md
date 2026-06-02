---
title: Capacitor Android 文档
sidebar_label: 开始使用
slug: /android
description: Capacitor Android 文档
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor Android 文档

Capacitor 具有原生 Android 运行时，使开发者能够在 JavaScript 和原生 Java 或 Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持

支持 API 23+（Android 6 或更高版本），这约占 Android 市场的 99%。Capacitor 需要 Chrome 60 或更高版本的 Android WebView。在 Android 6 和 10+ 上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。在 Android 7-9 上，[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView。

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

或者，你也可以打开 Android Studio 并直接导入 `android/` 目录作为 Android Studio 项目。

## 运行你的应用

你可以通过命令行或 Android Studio 运行你的应用。

> 要使用 Android 模拟器，你必须使用 API 24+ 的系统镜像。系统 WebView 在模拟器上不会自动更新。只要系统 WebView 已更新，物理设备最低可支持 API 23。

### 在命令行中运行

要在设备或模拟器上运行项目，请执行：

```bash
npx cap run android
```

该命令将提示你选择一个目标。[了解更多关于 `run` 命令的信息](/cli/commands/run.md)。

> 使用 `run` 命令需要连接物理 Android 设备或已下载的模拟器系统镜像。请参见[此处关于在 Android Studio 中创建模拟器设备和下载系统镜像的文档](https://developer.android.com/studio/run/managing-avds)。

### 使用 Android Studio 运行

在 Android Studio 中，首先选择设备或模拟器，然后点击运行或调试按钮来启动应用。除非你在调试 Java 或 Kotlin 代码，否则建议使用运行按钮。

![运行应用](/img/v6/docs/android/running.png)

## 故障排除

如果在开始使用时遇到任何问题，可以查阅 [Android 故障排除指南](/main/android/troubleshooting.md)。如果需要帮助，请随时[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 下一步

如果你的应用已成功运行，现在可以继续开发和构建你的应用了。使用各种可用的 API、Capacitor 或 Cordova 插件，或自定义原生代码来构建应用的其余部分。

## 延伸阅读

关注以下 Android 特定指南，以获取有关为应用设置权限、更新依赖项、构建插件等的更多信息：

[配置和设置 Android 权限 &#8250;](/main/android/configuration.md)

[为 Android 构建原生插件 &#8250;](/plugins/creating-plugins/android-guide.md)
