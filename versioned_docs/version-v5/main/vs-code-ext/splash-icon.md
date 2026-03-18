---
title: Splash Screen & Icon
description: Visual Studio Code 扩展 for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该扩展允许你设置启动画面和图标图像，并为你的原生 iOS 和 Android 项目[生成](https://github.com/ionic-team/capacitor-assets)必要的资源。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 以选择启动画面文件

你的启动画面应该是 2732 x 2732 像素的 png 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源。

### 设置图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 以选择图标文件

你的图标应该是 1024 x 1024 像素的 png 文件。设置好启动画面和图标文件后，扩展将为原生项目生成所有必要的资源。

### 重新构建资源

将鼠标悬停在 `Splash Screen & Icon` 项上，然后点击 `Rebuild` 按钮，即可为原生项目重新生成资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是一个 Android 概念，用于一些具有圆形或圆角图标的 Android 设备。你可以通过点击 `Icon Foreground` 或 `Icon Background` 来定义它们。虽然这些是可选的，但建议进行设置。