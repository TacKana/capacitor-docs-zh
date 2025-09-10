---
title: Ionic VS Code 扩展
description: 在 Capacitor 项目中使用 Ionic VS Code 扩展
slug: /getting-started/vscode-extension
---

## 使用 Ionic VS Code 扩展

Ionic Visual Studio Code 扩展能帮助您在不离开 VS Code 窗口的情况下，完成 Capacitor 应用开发的常见操作。您可以从 [Visual Studio Marketplace 安装此扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 。安装完成后，活动栏会显示 Ionic 图标。

## 集成 Capacitor

通过选择"集成 Capacitor"功能，您可以将 [Capacitor](https://capacitorjs.com/) 添加到现有应用中。

![添加 Capacitor 的演示视频](../../../../static/img/v3/docs/getting-started/integrate-capacitor.gif)

集成 Capacitor 后，您可以使用"在 Web 运行"、"在 Android 运行"和"在 iOS 运行"选项，将应用部署到网页、Android 和 iOS 平台。

## 从 Cordova 迁移

如果您正在 [从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/v3/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展能加速这一过程。

该扩展可以：
- 为项目添加 Capacitor 依赖
- 标记已知的不兼容 Cordova 包
- 移除不必要的 Cordova 插件
- 用等效的 Capacitor 插件替换某些 Cordova 插件
- 以及更多功能！

这个扩展将帮助您更轻松地完成从 Cordova 到 Capacitor 的迁移。

## 配置原生项目设置

Ionic VS Code 扩展还能帮助您轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图片](../../../../static/img/v3/docs/getting-started/capacitor-vscode-config.gif)

您可以便捷地修改应用显示名称、版本号和构建号，以及项目中的其他可配置值。

## 调试功能

通过 Ionic 扩展，您可以在 Web、Android 和 iOS（即将支持）平台上使用 VS Code 调试器。

![Capacitor 调试示例图片](../../../../static/img/v3/docs/getting-started/ionic-vs-code-debugging.jpg)

使用"调试"文件夹下的选项，您可以为网页和原生代码设置断点。网页调试会启动一个可调试的独立浏览器实例（默认为 Google Chrome），也可以在设置中选择 Microsoft Edge。在 Android 上，Webview 实例会列在"调试"文件夹中，调试方式与网页类似。

## 更多功能

Ionic VS Code 扩展还支持项目迁移、调试、monorepo 等多种功能。查看 [VS Code Marketplace 上的扩展概述](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 了解完整功能列表。