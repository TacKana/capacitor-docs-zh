---
title: 应用配置
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
slug: /basics/configuring-your-app
---

# 配置您的应用

Capacitor 的大部分配置都是按平台进行的，而非使用类似 Cordova 中 `config.xml` 这样的抽象系统。这意味着您需要通过原生工具在原生项目中进行大部分配置更改。

## 分平台管理

与 Cordova 相比，Capacitor 要求您更深入地参与原生项目配置。我们认为这种方式能让您更轻松地：
- 遵循现有的 iOS/Android 指南
- 在 Stack Overflow 上获取帮助
- 完全掌控您的项目

此外，由于配置 Capacitor 项目与配置普通 iOS/Android 项目并无二致，现有的原生开发团队可以轻松地与 Web 开发人员协作，双方都能使用熟悉的工具和 SDK。当然，我们相信 Web 开发者完全能够独立完成所需的所有原生配置，Capacitor 文档正是为了帮助 Web 开发者实现这一目标而存在。

## Capacitor 核心配置

Capacitor 特有的配置通过 [Capacitor 配置文件](/main/reference/config.md) 进行管理。这些配置通常不会修改原生功能，而是控制 Capacitor 的工具链行为。

## 原生平台配置

我们为 iOS 和 Android 分别提供了配置指南，帮助您进行常见功能调整：

[iOS 配置指南 &#8250;](/main/ios/configuration.md)

[Android 配置指南 &#8250;](/main/android/configuration.md)