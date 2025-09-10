---
title: VS Code Extension
description: 使用 Ionic/Capacitor VS Code 扩展
slug: /getting-started/vscode-extension
---

## 使用 Ionic/Capacitor VS Code 扩展

Ionic Visual Studio Code 扩展同样作为官方 Capacitor 扩展，能帮助您在不离开 VS Code 窗口的情况下完成 Capacitor 应用开发的各项常见操作。您可以从 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 安装此扩展。安装完成后，您将在活动栏中看到 Ionic 的标识。

## 集成 Capacitor

您可以通过选择"集成 Capacitor"将 [Capacitor](https://capacitorjs.com/) 添加到现有应用中。

![添加 Capacitor 的演示视频](/img/v6/docs/getting-started/integrate-capacitor.gif)

完成 Capacitor 集成后，您现在可以使用"在 Web 上运行"、"在 Android 上运行"和"在 iOS 上运行"选项，分别在 Web、Android 和 iOS 平台上运行您的应用。

## 从 Cordova 迁移

如果您正在[从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展可以加速这一过程。

该扩展能够：

- 为项目添加 Capacitor 依赖
- 标记已知不兼容的 Cordova 包
- 移除不必要的 Cordova 插件
- 用等效的 Capacitor 插件替换某些 Cordova 插件
- 以及其他功能！

通过此扩展，您可以更轻松地按照我们的指南从 Cordova 迁移到 Capacitor。

## 配置原生项目设置

Ionic VS Code 扩展还能帮助您轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图片](/img/v6/docs/getting-started/capacitor-vscode-config.gif)

您可以轻松修改应用的显示名称、版本号和构建号，以及项目中的其他可配置值。

## 调试功能

使用 Ionic 扩展，您可以在 Web、Android 和 iOS（即将推出）平台上运行 VS Code 调试器。

![Capacitor 调试示例图片](/img/v6/docs/getting-started/ionic-vs-code-debugging.jpg)

通过"调试"文件夹下的选项，您可以为 Web 和原生代码设置断点。Web 调试将启动一个可调试的独立浏览器实例（默认使用 Google Chrome）。您也可以在设置中选择 Microsoft Edge。在 Android 上，Webview 实例将列在"调试"文件夹中，并以类似于 Web 的方式进行调试。

## 更多功能

Ionic VS Code 扩展还能协助完成迁移、调试、monorepo 支持等众多任务。如需了解扩展的全部功能，请查看 [VS Code Marketplace 上的扩展概述](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。