---
title: Splash Screen & Icon
description: Capacitor 的 Visual Studio Code 插件
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

该插件允许您设置启动画面和图标，并为原生 iOS 和 Android 项目[生成](https://github.com/ionic-team/capacitor-assets)所需资源文件。

### 设置启动画面

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Splash Screen` 选择启动画面文件

启动画面应为 2732 x 2732 像素的 PNG 文件。设置完启动画面和图标后，插件会自动为原生项目生成所有必要的资源文件。

### 设置应用图标

- 点击 `Configuration` > `Splash Screen & Icon`
- 点击 `Icon` 选择图标文件

应用图标应为 1024 x 1024 像素的 PNG 文件。设置完启动画面和图标后，插件会自动为原生项目生成所有必要的资源文件。

### 重新生成资源

将鼠标悬停在 `Splash Screen & Icon` 选项上，点击 `Rebuild` 按钮即可重新为原生项目生成资源文件。

### 自适应图标

[自适应图标](https://github.com/ionic-team/capacitor-assets#adaptive-icons)是 Android 的一个概念，适用于某些使用圆形或圆角图标的 Android 设备。您可以通过点击 `Icon Foreground` 或 `Icon Background` 来设置这些图标。虽然这些设置是可选的，但建议进行配置。