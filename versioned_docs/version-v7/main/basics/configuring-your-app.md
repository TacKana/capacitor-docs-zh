---
title: 配置应用
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 配置应用

Capacitor 的大部分配置都是按平台进行的；这意味着您需要使用原生工具在原生项目中进行大多数配置更改。

## 原生项目管理

配置 Capacitor 项目与配置任何 iOS 或 Android 项目并无不同。现有的原生开发人员可以轻松地与 Web 开发人员协同工作；双方都可以使用各自最熟悉的工具和 SDK。虽然移动应用开发与 Web 开发有些不同，但我们相信 Web 开发人员完全可以自行处理所有必要的原生配置。Capacitor 团队还提供了相关文档，例如如何部署到 [Apple App Store](/main/ios/deploying-to-app-store.md) 或 [Google Play Store](/main/android/deploying-to-google-play.md)，以帮助填补知识空白。

## Capacitor 配置文件

Capacitor 的特定配置通过 [Capacitor 配置文件](/main/reference/config.md) 进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 的工具链。该配置文件包括设置 `npx cap sync` 时要复制的 Web 目录、指定 Android 或 iOS 项目文件夹，或在原生项目中设置应用 ID/名称等。

## 原生配置

iOS 和 Android 各自都有配置指南，详细介绍如何对其行为进行常见修改：

[iOS 配置指南 &#8250;](/main/ios/configuration.md)

[Android 配置指南 &#8250;](/main/android/configuration.md)