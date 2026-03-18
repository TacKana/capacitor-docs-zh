---
title: 配置你的应用
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
slug: /basics/configuring-your-app
---

# 配置你的应用

Capacitor 的大部分配置是基于每个平台进行的，而不是像 Cordova 的 `config.xml` 那样在一个抽象系统中完成。这意味着你将需要使用原生工具在原生项目中完成大多数配置更改。

## 平台独立管理

相比 Cordova，Capacitor 要求你更多地参与到原生项目配置中。我们认为这种方式让你更容易遵循现有的 iOS/Android 指南、在 Stack Overflow 上获取帮助，并对你的项目拥有完全的控制权。

此外，由于配置 Capacitor 项目与配置任何 iOS 或 Android 项目没有区别，现有的原生开发团队可以轻松地与网页开发者协作，各方都可以使用他们熟悉的工具和 SDK。当然，我们相信网页开发者能够独立处理所有必要的原生配置，而 Capacitor 文档的存在正是为了帮助网页开发者做到这一点。

## Capacitor 配置

Capacitor 特定的配置在 [Capacitor 配置文件](/main/reference/config.md) 中处理。这些配置通常不会修改原生功能，而是控制 Capacitor 的工具链。

## 原生配置

iOS 和 Android 都有配置指南，引导你对它们的行为进行常见更改：

[配置 iOS &#8250;](/main/ios/configuration.md)

[配置 Android &#8250;](/main/android/configuration.md)