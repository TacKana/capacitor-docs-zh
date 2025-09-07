---
title: 应用配置指南
description: 原生项目配置
slug: /basics/configuring-your-app
---

# 配置您的应用

Capacitor 的大部分配置都是按平台进行的，这意味着您需要使用原生工具在对应的原生项目中进行主要配置更改。

## 原生项目管理

配置 Capacitor 项目与配置任何 iOS 或 Android 项目并无二致。原生开发者和 Web 开发者可以顺畅协作——双方都能使用各自熟悉的工具和 SDK。虽然移动应用开发与 Web 开发存在差异，但我们相信 Web 开发者完全可以独立完成所有必要的原生配置。Capacitor 团队提供了详细文档，包括如何发布到 [Apple App Store](/main/ios/deploying-to-app-store.md) 和 [Google Play 商店](/main/android/deploying-to-google-play.md) 等关键流程，帮助填补知识空白。

## Capacitor 配置文件

Capacitor 的特有配置通过 [Capacitor 配置文件](/main/reference/config.md) 进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 工具链的行为。该配置文件包含以下设置：
- 指定执行 `npx cap sync` 时复制的 Web 目录
- 配置 Android 或 iOS 项目文件夹路径
- 设置原生项目中的应用 ID/名称

## 原生平台配置

我们为 iOS 和 Android 分别提供了配置指南，帮助您完成常见行为调整：

[iOS 配置指南 &#8250;](/main/ios/configuration.md)

[Android 配置指南 &#8250;](/main/android/configuration.md)