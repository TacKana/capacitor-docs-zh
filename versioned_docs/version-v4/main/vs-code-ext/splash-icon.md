---
title: Splash Screen & Icon
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

本扩展允许您设置单一的启动画面和图标图像，并为您的原生 iOS 和 Android 项目生成必要的资源。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 选择启动画面文件

您的启动画面应为 2732 x 2732 像素的 PNG 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源。

### 设置图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 选择图标文件

您的图标应为 1024 x 1024 像素的 PNG 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源。

### 重新构建资源

将鼠标悬停在 `Splash Screen & Icon` 项上，点击 `Rebuild` 按钮即可为原生项目重新生成资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons) 是 Android 的一个概念，用于某些具有圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义这些图标。虽然这些是可选的，但建议进行设置。

:::note
使用此功能时，[`cordova-res`](https://capacitorjs.com/docs/guides/splash-screens-and-icons) 包将作为开发依赖项安装。在未来的扩展版本中，这将被 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 取代。
:::