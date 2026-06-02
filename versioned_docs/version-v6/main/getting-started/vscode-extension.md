---
title: VS Code 扩展
description: 使用 Ionic/Capacitor VS Code 扩展
slug: /getting-started/vscode-extension
---

## 使用 Ionic/Capacitor VS Code 扩展

Ionic Visual Studio Code 扩展同时也是官方的 Capacitor 扩展，帮助您执行开发 Capacitor 应用常见的各种功能，而无需离开 VS Code 窗口。您可以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 安装此扩展。安装扩展后，您会在活动栏中看到 Ionic 徽标。

## 集成 Capacitor

您可以通过选择"集成 Capacitor"来将 [Capacitor](https://capacitorjs.com/) 添加到现有应用。

![添加 Capacitor 的视频](/img/v6/docs/getting-started/integrate-capacitor.gif)

集成 Capacitor 后，您现在可以使用"在 Web 上运行"、"在 Android 上运行"和"在 iOS 上运行"选项在 Web、Android 和 iOS 上运行应用。

## 从 Cordova 迁移

如果您正在[从 Cordova 迁移到 Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor)，Ionic VS Code 扩展可以加速这一过程。

该扩展：

- 将 Capacitor 的依赖添加到您的项目。
- 标记已知的不兼容 Cordova 包。
- 移除不需要的 Cordova 插件。
- 用等效的 Capacitor 插件替换某些 Cordova 插件。
- 以及更多！

此扩展将帮助您遵循我们的指南，比以前更轻松地从 Cordova 迁移到 Capacitor。

## 配置原生项目设置

Ionic VS Code 扩展还可以帮助您轻松配置与项目相关的 Android 和 iOS 变量。

![Capacitor 原生配置示例图](/img/v6/docs/getting-started/capacitor-vscode-config.gif)

您可以轻松更改应用的显示名称、版本号和构建号，以及项目中的其他可配置值。

## 调试

使用 Ionic 扩展，您可以在 Web、Android 和 iOS（即将推出）上运行 VS Code 调试器。

![Capacitor 调试示例图](/img/v6/docs/getting-started/ionic-vs-code-debugging.jpg)

使用调试文件夹下的选项，您可以为 Web 和原生代码设置断点。Web 调试将启动一个可调试的单独 Web 浏览器实例（默认为 Google Chrome）。您也可以从设置选项中选择 Microsoft Edge。在 Android 上，WebView 实例将列在"调试"文件夹中，并以类似于 Web 的方式进行调试。

## 更多功能

Ionic VS Code 扩展可以帮助处理很多事情，包括迁移、调试、monorepo 支持等。有关扩展所有功能的完整列表，请查看 [VS Code Marketplace 上的扩展概述](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)。
