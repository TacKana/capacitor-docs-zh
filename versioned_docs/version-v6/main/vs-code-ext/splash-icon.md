---
title: 启动屏和图标
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该扩展允许您设置启动屏和图标图像，并为您的原生 iOS 和 Android 项目[生成](https://github.com/ionic-team/capacitor-assets)必要的资源。

### 设置启动屏

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 以选择启动屏文件

您的启动屏应该是 2732 x 2732 像素的 png 文件。设置好启动屏和图标文件后，扩展将为原生项目生成所有必要的资源。

### 设置图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 以选择图标文件

您的图标应该是 1024 x 1024 像素的 png 文件。设置好启动屏和图标文件后，扩展将为原生项目生成所有必要的资源。

### 重建资源

悬停在 `Splash Screen & Icon` 项目上，点击 `Rebuild` 按钮以重新生成原生项目的资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是 Android 的概念，用于某些具有圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义它们。虽然这些是可选的，但建议进行设置。
