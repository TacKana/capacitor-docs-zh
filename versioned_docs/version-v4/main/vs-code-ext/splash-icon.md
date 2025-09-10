---
title: Splash Screen & Icon
description: Visual Studio Code 的 Capacitor 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

本扩展允许您设置单一的启动画面和图标图片，并为您的原生 iOS 和 Android 项目生成所需资源。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 选择启动画面文件

建议使用 2732 x 2732 像素的 PNG 文件作为启动画面。设置好启动画面和图标后，扩展将自动为原生项目生成所有必要资源。

### 设置应用图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 选择图标文件

建议使用 1024 x 1024 像素的 PNG 文件作为应用图标。设置好启动画面和图标后，扩展将自动为原生项目生成所有必要资源。

### 重新生成资源

将鼠标悬停在 `Splash Screen & Icon` 选项上，点击 `Rebuild` 按钮即可重新为原生项目生成相关资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是 Android 的特有概念，用于支持圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义这些图标。虽然这些设置是可选的，但我们建议进行配置。

:::note
使用此功能时，系统会自动安装 [`cordova-res`](https://capacitorjs.com/docs/guides/splash-screens-and-icons) 作为开发依赖项。在未来的扩展版本中，这将由 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 替代。
:::