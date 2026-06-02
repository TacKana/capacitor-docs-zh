---
title: 配置您的应用
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 配置您的应用

Capacitor 的大部分配置是按平台进行的；这意味着您将使用原生工具在原生项目中进行大部分配置更改。

## 原生项目管理

配置 Capacitor 项目与配置任何 iOS 或 Android 项目没有什么不同。现有的原生开发者可以轻松地与 Web 开发者协作；每方使用他们最熟悉的工具和 SDK。虽然移动应用与 Web 开发有所不同，但我们相信 Web 开发者可以自行处理所有必要的原生配置，Capacitor 团队提供了关于如何部署到 [Apple App Store](/main/ios/deploying-to-app-store.md) 或 [Google Play Store](/main/android/deploying-to-google-play.md) 等文档，以帮助填补知识空白。

## Capacitor 配置文件

Capacitor 特定的配置在 [Capacitor 配置文件](/main/reference/config.md) 中处理。这些通常不修改原生功能，而是控制 Capacitor 的工具。此配置文件包括诸如设置要在 `npx cap sync` 时复制的 Web 目录、指定 Android 或 iOS 项目文件夹，或在原生项目中设置 App ID/名称等内容。

## 原生配置

iOS 和 Android 都有配置指南，介绍如何对其行为进行常见更改：

[配置 iOS &#8250;](/main/ios/configuration.md)

[配置 Android &#8250;](/main/android/configuration.md)
