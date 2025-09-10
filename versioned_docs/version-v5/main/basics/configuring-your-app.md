---
title: Configuring Your App
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 应用配置指南

Capacitor 的大部分配置都是基于平台进行的，这意味着您需要使用各平台的原生工具在对应项目中完成配置修改。

## 原生项目管理

配置 Capacitor 项目与配置普通 iOS 或 Android 项目并无二致。原生开发者和网页开发者可以顺畅协作，各自使用熟悉的工具和 SDK 进行开发。虽然移动应用开发与网页开发存在差异，但我们相信网页开发者完全能够独立完成必要的原生配置。Capacitor 团队还提供了详细文档，例如如何发布应用到 [Apple App Store](/main/ios/deploying-to-app-store.md) 或 [Google Play 商店](/main/android/deploying-to-google-play.md)，帮助开发者填补知识空白。

## Capacitor 配置文件

Capacitor 专属配置通过 [Capacitor 配置文件](/main/reference/config.md)进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 工具链的行为。该配置文件包含以下内容：设置执行 `npx cap sync` 时复制的 web 目录、指定 Android 或 iOS 项目文件夹路径，或配置原生项目中的应用 ID/名称等。

## 平台专属配置

我们为 iOS 和 Android 平台分别提供了配置指南，帮助您完成常见的行为修改：

[iOS 配置指南 &#8250;](/main/ios/configuration.md)

[Android 配置指南 &#8250;](/main/android/configuration.md)