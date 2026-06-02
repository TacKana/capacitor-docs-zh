---
title: 启动画面与图标
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该扩展允许您设置单个启动画面和图标图像，并为您的原生 iOS 和 Android 项目生成必要的资源文件。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 选择启动画面文件

您的启动画面应为 2732 x 2732 像素的 png 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源文件。

### 设置图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 选择图标文件

您的图标应为 1024 x 1024 像素的 png 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源文件。

### 重建资源

悬停在 `Splash Screen & Icon` 项目上并点击 `Rebuild` 按钮，为原生项目重新生成资源文件。

### Adaptive Icons

[Adaptive Icons](https://github.com/ionic-team/capacitor-assets#adaptive-icons) 是一个 Android 概念，用于某些具有圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义它们。虽然这些是可选的，但建议进行设置。

:::note
使用此功能时，包 [`cordova-res`](https://capacitorjs.com/docs/guides/splash-screens-and-icons) 将作为 dev 依赖安装。在扩展的未来版本中，这将被替换为 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets)。
:::
