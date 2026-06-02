---
title: 启动屏与图标
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该扩展允许你设置启动屏和图标图像，并[生成](https://github.com/ionic-team/capacitor-assets) iOS 和 Android 原生项目所需的资源文件。

### 设置启动屏

- 点击 `Configuration`（配置） > `Splash Screen & Icon`（启动屏与图标）
- 点击 `Splash Screen`（启动屏）选择启动屏文件

你的启动屏应为 2732 x 2732 像素的 png 文件。设置好启动屏和图标文件后，扩展将自动生成原生项目所需的所有资源文件。

### 设置图标

- 点击 `Configuration`（配置） > `Splash Screen & Icon`（启动屏与图标）
- 点击 `Icon`（图标）选择图标文件

你的图标应为 1024 x 1024 像素的 png 文件。设置好启动屏和图标文件后，扩展将自动生成原生项目所需的所有资源文件。

### 重建资源

将鼠标悬停在 `Splash Screen & Icon`（启动屏与图标）项上，点击 `Rebuild`（重建）按钮即可重新生成原生项目的资源文件。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是 Android 的一个概念，用于某些使用圆形或圆角图标的 Android 设备。你可以通过点击 `Icon Foreground`（图标前景）或 `Icon Background`（图标背景）来定义这些图标。虽然这些是可选的，但建议进行设置。
