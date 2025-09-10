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

Capacitor 提供了原生 Android 运行时环境，支持开发者在 JavaScript 与原生 Java 或 Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持

支持 API 22+（Android 5.1 及以上版本），覆盖 [Android 市场 99% 以上的设备](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)。Capacitor 要求 Android WebView 使用 Chrome 60 或更高版本。在 Android 5-6 和 10+ 系统上，Capacitor 使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)。Android 7-9 系统则使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供的 WebView。

## 添加 Android 平台

首先安装 `@capacitor/android` 包：

```bash
npm install @capacitor/android
```

然后添加 Android 平台：

```bash
npx cap add android
```

## 打开 Android 项目

在 Android Studio 中打开项目：

```bash
npx cap open android
```

也可直接在 Android Studio 中导入 `android/` 目录作为项目。

## 运行应用

可通过命令行或 Android Studio 运行应用。

> 使用 Android 模拟器时必须选择 API 24+ 系统镜像。模拟器上的 System WebView 不会自动更新。物理设备只要 System WebView 保持更新，最低可支持 API 21。

### 通过命令行运行

在设备或模拟器上运行项目：

```bash
npx cap run android
```

命令会提示选择目标设备。[了解更多关于 `run` 命令的信息](/cli/commands/run.md)

> 使用 `run` 命令前需准备好物理设备或已下载模拟器系统镜像。[查看 Android Studio 中创建模拟设备和下载系统镜像的文档](https://developer.android.com/studio/run/managing-avds)

### 通过 Android Studio 运行

在 Android Studio 中先选择目标设备或模拟器，然后点击运行或调试按钮。除非需要调试 Java/Kotlin 代码，否则建议使用运行按钮。

![运行应用](../../../../static/img/v4/docs/android/running.png)

## 问题排查

如遇任何问题，可参考 [Android 问题排查指南](/main/android/troubleshooting.md)。如需帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

成功运行应用后，即可继续开发和构建。可以使用各种 API、Capacitor 或 Cordova 插件，或编写自定义原生代码来实现更多功能。

## 扩展阅读

以下 Android 专项指南将帮助您配置应用权限、更新依赖、构建插件等：

[Android 配置与权限设置 &#8250;](/main/android/configuration.md)

[构建 Android 原生插件 &#8250;](/plugins.mdx)