---
title: 配置您的应用
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
slug: /basics/configuring-your-app
---

# 配置您的应用

Capacitor 的大部分配置是在每个平台上独立完成的，而不是像 Cordova 的 `config.xml` 那样的抽象系统。这意味着您需要使用原生工具在原生项目中进行大部分配置更改。

## 按平台管理

Capacitor 要求您比 Cordova 更深入地参与原生项目配置。我们认为这种方法使您可以轻松遵循现有的 iOS/Android 指南，在 Stack Overflow 上获得帮助，并对项目拥有完全的控制权。

此外，由于配置 Capacitor 项目与配置任何 iOS 或 Android 项目没有区别，现有的原生开发团队可以轻松地与 Web 开发者并肩工作，每一方都可以使用他们熟悉的工具和 SDK。当然，我们相信 Web 开发者自己也能处理所有必要的原生配置，Capacitor 文档的存在正是为了帮助 Web 开发者做到这一点。

## Capacitor 配置

Capacitor 特定的配置在 [Capacitor 配置文件](/main/reference/config.md) 中处理。这些通常不会修改原生功能，而是控制 Capacitor 的工具链。

## 原生配置

iOS 和 Android 各有配置指南，介绍了对其行为进行常见更改的方法：

[配置 iOS &#8250;](/main/ios/configuration.md)

[配置 Android &#8250;](/main/android/configuration.md)
