---
title: VS Code 扩展
description: 使用 Ionic/Capacitor 的 VS Code 扩展
slug: /getting-started/vscode-extension
---

## 使用 Ionic/Capacitor VS Code 扩展

Ionic Visual Studio Code 扩展同时也是官方的 Capacitor 扩展，它能帮助你在不离开 VS Code 窗口的情况下，执行开发 Capacitor 应用时的各种常见操作。你可以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 上安装该扩展。安装完成后，你会在活动栏中看到 Ionic 的图标。

## 集成 Capacitor

你可以通过选择「集成 Capacitor」，将 [Capacitor](https://capacitorjs.com/) 添加到现有的应用中。

![添加 Capacitor 的动图](../../../../static/img/v4/docs/getting-started/integrate-capacitor.gif)

集成 Capacitor 后，你现在可以通过「在 Web 上运行」、「在 Android 上运行」和「在 iOS 上运行」选项，将你的应用运行在 Web、Android 和 iOS 平台上。

## 从 Cordova 迁移

如果你正在[从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展可以加速这一过程。该扩展能够：

- 将 Capacitor 的依赖项添加到你的项目
- 标记已知不兼容的 Cordova 包
- 移除不必要的 Cordova 插件
- 用等效的 Capacitor 插件替换某些 Cordova 插件
- 以及更多功能！

这个扩展将帮助你更轻松地按照我们的指南，从 Cordova 迁移到 Capacitor。

## 配置原生项目设置

Ionic VS Code 扩展还能帮助你轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图片](../../../../static/img/v4/docs/getting-started/capacitor-vscode-config.gif)

你可以轻松更改应用的显示名称、版本号和构建号，以及项目中的其他可配置值。

## 调试

使用 Ionic 扩展，你可以在 Web、Android 和 iOS（即将推出）上运行 VS Code 调试器。

![Capacitor 调试示例图片](../../../../static/img/v4/docs/getting-started/ionic-vs-code-debugging.jpg)

通过「调试」文件夹下的选项，你可以为 Web 和原生代码设置断点。Web 调试将启动一个可调试的独立浏览器实例（默认是 Google Chrome）。你也可以从设置选项中选择 Microsoft Edge。在 Android 上，Webview 实例会列在「调试」文件夹中，并以类似于 Web 的方式可调试。

## 更多功能

Ionic VS Code 扩展还能提供更多帮助，包括迁移、调试、monorepo 支持等。要了解扩展的全部功能，请查看 [VS Code Marketplace 上的扩展概览](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。