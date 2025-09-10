---
title: Splash Screen & Icon
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该扩展可以帮助您设置启动屏和图标，并自动为原生 iOS 和 Android 项目[生成](https://github.com/ionic-team/capacitor-assets)所需资源。

### 设置启动屏

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 选择启动屏文件

启动屏应为 2732 x 2732 像素的 PNG 格式文件。设置完成后，扩展会自动为原生项目生成所有必要资源。

### 设置应用图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 选择图标文件

应用图标应为 1024 x 1024 像素的 PNG 格式文件。设置完成后，扩展会自动为原生项目生成所有必要资源。

### 重新生成资源

将鼠标悬停在 `Splash Screen & Icon` 选项上，点击 `Rebuild` 按钮即可重新为原生项目生成资源。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是 Android 的概念，适用于需要圆形或圆角图标的设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 进行设置。虽然这些是可选项，但建议进行配置。