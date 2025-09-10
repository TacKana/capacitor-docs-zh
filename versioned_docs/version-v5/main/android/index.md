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

Capacitor 提供原生 Android 运行时环境，支持开发者在 JavaScript 与原生 Java/Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持版本

支持 API 22+（Android 5.1 及以上版本），覆盖[99%以上的 Android 市场份额](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)。Capacitor 要求 Android WebView 使用 Chrome 60 或更高版本：
- Android 5-6 和 10+ 系统使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
- Android 7-9 系统使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供 WebView

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

> 使用模拟器时必须选择 API 24+ 系统镜像。注意模拟器中的 System WebView 不会自动更新。物理设备只要 System WebView 保持更新，最低可支持至 API 21。

### 命令行运行

在设备或模拟器上运行：

```bash
npx cap run android
```

命令会提示选择目标设备。[详细了解 run 命令](/cli/commands/run.md)

> 使用 `run` 命令需要连接物理设备或下载模拟器系统镜像。参考 [Android Studio 创建模拟器和下载系统镜像文档](https://developer.android.com/studio/run/managing-avds)

### 使用 Android Studio 运行

在 Android Studio 中选择目标设备后，点击运行或调试按钮。除非需要调试 Java/Kotlin 代码，否则建议使用运行按钮。

![运行应用](../../../../static/img/v5/docs/android/running.png)

## 问题排查

遇到问题时，可查阅 [Android 问题排查指南](/main/android/troubleshooting.md)。如需帮助，欢迎[发起讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 后续步骤

应用成功运行后，您可以使用各种 API、Capacitor/Cordova 插件或自定义原生代码继续开发。

## 延伸阅读

以下 Android 专项指南将帮助您配置应用权限、更新依赖项、构建插件等：

[Android 权限配置指南 &#8250;](/main/android/configuration.md)

[构建 Android 原生插件 &#8250;](/plugins.mdx)