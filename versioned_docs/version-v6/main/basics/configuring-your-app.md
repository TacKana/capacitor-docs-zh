---
title: 应用配置
description: 原生项目配置指南
slug: /basics/configuring-your-app
---

# 应用配置

Capacitor 的大部分配置都是基于平台进行的，这意味着您需要通过原生开发工具对原生项目进行配置调整。

## 原生项目管理

配置 Capacitor 项目与配置常规 iOS 或 Android 项目并无二致。原生开发人员可以与网页开发人员协同工作，双方都可以使用各自熟悉的工具和 SDK。虽然移动应用开发与网页开发存在差异，但我们相信网页开发人员完全能够独立完成必要的原生配置。Capacitor 团队提供了详细文档，包括如何发布应用到 [Apple App Store](/main/ios/deploying-to-app-store.md) 或 [Google Play 商店](/main/android/deploying-to-google-play.md)，帮助您填补知识空白。

## Capacitor 配置文件

Capacitor 特有的配置主要通过 [Capacitor 配置文件](/main/reference/config.md) 进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 工具链的行为。该配置文件包含诸多设置，例如：指定 `npx cap sync` 时要拷贝的网页目录、配置 Android 或 iOS 项目文件夹路径、设置原生项目中的应用 ID/名称等。

## 原生平台配置

我们为 iOS 和 Android 平台分别提供了配置指南，帮助您完成常见行为调整：

[iOS 配置指南 &#8250;](/main/ios/configuration.md)

[Android 配置指南 &#8250;](/main/android/configuration.md)