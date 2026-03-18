---
title: Splash Screen & Icon
description: Visual Studio Code 扩展插件 for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

通过此扩展，您可以设置启动画面 (Splash Screen) 和应用图标 (Icon)，并为您的原生 iOS 和 Android 项目[生成](https://github.com/ionic-team/capacitor-assets)所有必需的素材资源。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 来选择启动画面文件

您的启动画面应是一个 2732 x 2732 像素的 PNG 文件。当您同时设置了启动画面和图标文件后，扩展将为原生项目生成所有必需的素材资源。

### 设置应用图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 来选择图标文件

您的图标应是一个 1024 x 1024 像素的 PNG 文件。当您同时设置了启动画面和图标文件后，扩展将为原生项目生成所有必需的素材资源。

### 重新构建素材资源

将鼠标悬停在 `Splash Screen & Icon` 选项上，并点击 `Rebuild` 按钮，即可为原生项目重新生成素材资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons) 是一个 Android 概念，用于某些具有圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义这些图标。虽然这些是可选的，但建议您进行设置。