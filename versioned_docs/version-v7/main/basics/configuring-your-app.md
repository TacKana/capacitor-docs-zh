---
title: 配置你的应用
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 配置你的应用

Capacitor 的大部分配置是按平台进行的；这意味着你将在原生项目中使用原生工具进行大部分配置更改。

## 原生项目管理

配置 Capacitor 项目与配置任何 iOS 或 Android 项目没有区别。现有的原生开发者可以轻松地与 Web 开发者协作，每一方都使用自己最熟悉的工具和 SDK。虽然移动应用与 Web 开发有所不同，但我们相信 Web 开发者可以自行处理所有必要的原生配置，Capacitor 团队提供了诸如如何部署到 [Apple App Store](/main/ios/deploying-to-app-store.md) 或 [Google Play Store](/main/android/deploying-to-google-play.md) 等文档，以帮助填补知识空白。

## Capacitor 配置文件

Capacitor 特定的配置在 [Capacitor 配置文件](/main/reference/config.md) 中处理。这些配置通常不会修改原生功能，而是控制 Capacitor 的工具。此配置文件包括诸如设置 `npx cap sync` 时复制的 Web 目录、指定 Android 或 iOS 项目文件夹、或在原生项目中设置 App ID/名称等内容。

## 原生配置

iOS 和 Android 各有配置指南，引导你完成对其行为的常见更改：

[配置 iOS &#8250;](/main/ios/configuration.md)

[配置 Android &#8250;](/main/android/configuration.md)
