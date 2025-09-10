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

## Android 兼容性

支持 API 21+（Android 5 及以上版本），覆盖 [全球 99% 以上的 Android 设备](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)。Capacitor 要求 Android WebView 使用 Chrome 60 或更高版本：
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

或者直接通过 Android Studio 导入 `android/` 目录。

## 运行应用

可通过命令行或 Android Studio 运行应用：

> 使用 Android 模拟器时需选择 API 24+ 系统镜像。注意模拟器上的 System WebView 不会自动更新，而物理设备只要保持 System WebView 更新，最低可支持 API 21。

### 命令行运行

在设备或模拟器上运行：

```bash
npx cap run android
```

运行时会提示选择目标设备，[了解 `run` 命令详情](/cli/commands/run.md)。

### 通过 Android Studio 运行

在 Android Studio 中选择设备或模拟器后，点击运行或调试按钮。除非需要调试 Java/Kotlin 代码，否则建议使用运行按钮。

![运行应用](../../../../static/img/v3/docs/android/running.png)

## 问题排查

如遇问题可参考 [Android 问题排查指南](/main/android/troubleshooting.md)，也可 [发起讨论](https://github.com/ionic-team/capacitor/discussions/) 寻求帮助。

## 后续步骤

成功运行应用后，您可以通过以下方式继续开发：
- 使用各类 Capacitor API
- 集成 Capacitor 或 Cordova 插件
- 编写自定义原生代码

## 扩展阅读

以下 Android 专项指南将帮助您：
- 配置应用权限
- 更新依赖项
- 开发原生插件等：

[配置 Android 应用权限 &#8250;](/main/android/configuration.md)

[开发 Android 原生插件 &#8250;](/plugins.mdx)