---
title: VS Code 扩展
description: 使用 Ionic/Capacitor VS Code 扩展插件
slug: /getting-started/vscode-extension
---

## 使用 Ionic/Capacitor VS Code 扩展

Ionic Visual Studio Code 扩展同时也是 Capacitor 的官方扩展，它可以帮助您在 VS Code 窗口内完成 Capacitor 应用开发的各项常见操作。您可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 安装该扩展。安装完成后，您将在活动栏中看到 Ionic 的徽标。

## 集成 Capacitor

您可以通过选择 "Integrate Capacitor" 选项，将 [Capacitor](https://capacitorjs.com/) 添加到现有应用中。

![添加 Capacitor 的动图](../../../../static/img/v5/docs/getting-started/integrate-capacitor.gif)

集成 Capacitor 后，您现在可以使用 "Run On Web"、"Run On Android" 和 "Run On iOS" 选项在网页端、Android 和 iOS 上运行您的应用。

## 从 Cordova 迁移

如果您正在 [从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展可以加速这一过程。

该扩展能够：
- 将 Capacitor 依赖项添加到您的项目
- 标记已知不兼容的 Cordova 包
- 移除非必需的 Cordova 插件
- 用等效的 Capacitor 插件替换某些 Cordova 插件
- 以及更多功能！

这个扩展将帮助您更轻松地按照我们的指南，从 Cordova 迁移到 Capacitor。

## 配置原生项目设置

Ionic VS Code 扩展还能帮助您轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图片](../../../../static/img/v5/docs/getting-started/capacitor-vscode-config.gif)

您可以轻松更改应用的显示名称、版本号和构建号，以及项目中的其他可配置值。

## 调试功能

使用 Ionic 扩展，您可以在网页端、Android 和 iOS（即将推出）上运行 VS Code 调试器。

![Capacitor 调试示例图片](../../../../static/img/v5/docs/getting-started/ionic-vs-code-debugging.jpg)

通过使用 Debug 文件夹下的选项，您可以为网页和原生代码设置断点。网页调试将启动一个可调试的独立浏览器实例（默认使用 Google Chrome）。您也可以从设置选项中选择 Microsoft Edge。在 Android 上，Webview 实例将列在 "Debug" 文件夹中，并以类似于网页调试的方式进行调试。

## 更多功能

Ionic VS Code 扩展还能在迁移、调试、monorepo 支持等方面提供帮助。要查看扩展的全部功能列表，请参阅 [VS Code Marketplace 上的扩展概述](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。