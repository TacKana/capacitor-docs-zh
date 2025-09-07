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

Capacitor 提供了原生 Android 运行时环境，使开发者能够在 JavaScript 与原生 Java/Kotlin 代码之间进行通信。

Capacitor Android 应用通过 Android Studio 进行配置和管理。

## Android 支持

支持 API 22+（Android 5.1 及以上），覆盖 [超过 99% 的 Android 市场份额](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)。Capacitor 要求 Android WebView 使用 Chrome 60 或更高版本：
- Android 5-6 和 10+ 系统使用 [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
- Android 7-9 系统使用 [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) 提供的 WebView

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

或直接在 Android Studio 中导入 `android/` 目录作为项目。

## 运行应用

可通过命令行或 Android Studio 运行应用：

> 使用 Android 模拟器时需选择 API 24+ 系统镜像。模拟器上的 System WebView 不会自动更新。物理设备只要 System WebView 保持更新，最低可支持至 API 21。

### 命令行运行

在设备或模拟器上运行：

```bash
npx cap run android
```

命令会提示选择目标设备。[详细了解 run 命令](/cli/commands/run.md)

> 使用 `run` 命令需准备物理设备或下载模拟器系统镜像。[查看 Android Studio 创建模拟器和下载系统镜像的文档](https://developer.android.com/studio/run/managing-avds)

### Android Studio 运行

在 Android Studio 中选择设备/模拟器后，点击运行或调试按钮。除非调试 Java/Kotlin 代码，否则建议使用运行按钮。

![运行应用](/img/v6/docs/android/running.png)

## 问题排查

遇到问题可参考 [Android 问题排查指南](/main/android/troubleshooting.md)，也欢迎在 [讨论区提问](https://github.com/ionic-team/capacitor/discussions/)

## 后续步骤

应用成功运行后，您可以使用以下方式继续开发：
- Capacitor 或 Cordova 插件
- 各种可用 API
- 自定义原生代码

## 延伸阅读

以下 Android 专项指南将帮助您配置应用权限、更新依赖项、构建插件等：

[Android 权限配置 &#8250;](/main/android/configuration.md)

[开发 Android 原生插件 &#8250;](/plugins/creating-plugins/android-guide.md)