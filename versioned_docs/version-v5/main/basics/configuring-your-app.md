---
title: 配置您的应用
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 配置您的应用

Capacitor 的大部分配置是按平台进行的；这意味着您需要使用原生工具在原生项目中进行大部分配置更改。

## 原生项目管理

配置 Capacitor 项目与配置任何 iOS 或 Android 项目并无不同。现有的原生开发者可以轻松地与 Web 开发者协同工作；双方都可以使用各自最熟悉的工具和 SDK。虽然移动应用开发与 Web 开发有所不同，但我们相信 Web 开发者能够独立处理所有必需的原生配置。Capacitor 团队提供了相关文档，例如如何部署到 [苹果应用商店](/main/ios/deploying-to-app-store.md) 或 [Google Play 商店](/main/android/deploying-to-google-play.md)，以帮助填补知识空白。

## Capacitor 配置文件

Capacitor 特有的配置在 [Capacitor 配置文件](/main/reference/config.md) 中进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 的工具链。该配置文件包含诸如设置 `npx cap sync` 时复制的 Web 目录、指定 Android 或 iOS 项目文件夹，或在原生项目中设置应用 ID/名称等选项。

## 原生配置

iOS 和 Android 都有配置指南，详细介绍了对其行为进行常见修改的方法：

[配置 iOS &#8250;](/main/ios/configuration.md)

[配置 Android &#8250;](/main/android/configuration.md)