---
title: VS Code 扩展
description: 使用 Ionic/Capacitor VS Code 扩展
slug: /getting-started/vscode-extension
---

## 使用 Ionic/Capacitor VS Code 扩展

Ionic Visual Studio Code 扩展同时也可作为官方 Capacitor 扩展，帮助你执行开发 Capacitor 应用时常见的各种功能，所有这些都无需离开你的 VS Code 窗口。你可以从 [Visual Studio Marketplace 安装该扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。安装扩展后，你会在活动栏中看到 Ionic 徽标。

## 集成 Capacitor

你可以通过选择"集成 Capacitor"将 [Capacitor](https://capacitorjs.com/) 添加到现有应用中。

![添加 Capacitor 的视频](../../../../static/img/v4/docs/getting-started/integrate-capacitor.gif)

集成 Capacitor 后，你现在可以通过"在 Web 上运行"、"在 Android 上运行"和"在 iOS 上运行"选项在 Web、Android 和 iOS 上运行你的应用。

## 从 Cordova 迁移

如果你正在[从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展可以加速这一过程。

该扩展：

- 将 Capacitor 的依赖项添加到你的项目中。
- 标记已知不兼容的 Cordova 包。
- 移除不需要的 Cordova 插件。
- 将某些 Cordova 插件替换为等效的 Capacitor 插件
- 以及更多！

该扩展将帮助你比以往更轻松地按照我们的指南从 Cordova 迁移到 Capacitor。

## 配置原生项目设置

Ionic VS Code 扩展还可以帮助你轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图片](../../../../static/img/v4/docs/getting-started/capacitor-vscode-config.gif)

你可以轻松更改应用的显示名称、版本号和构建号，以及项目中其他可配置的值。

## 调试

使用 Ionic 扩展，你可以在 Web、Android 和 iOS 上运行 VS Code 调试器（即将推出）。

![Capacitor 调试示例图片](../../../../static/img/v4/docs/getting-started/ionic-vs-code-debugging.jpg)

使用调试文件夹下的选项，你可以为 Web 和原生代码设置断点。Web 调试将启动一个独立的可调试 Web 浏览器实例（默认为 Google Chrome）。你也可以在设置选项中选择 Microsoft Edge。在 Android 上，WebView 实例将列在"调试"文件夹中，并以类似于 Web 的方式进行调试。

## 更多功能

Ionic VS Code 扩展可以帮助完成很多事情，包括迁移、调试、monorepo 支持等。有关扩展所有功能的完整列表，请查看 [VS Code Marketplace 上的扩展概述](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。
