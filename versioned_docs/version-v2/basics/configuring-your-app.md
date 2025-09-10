---
title: 应用配置指南
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/basics/configuring-your-app
---

# 应用配置

Capacitor 秉承"一次编码，随处配置"的理念：配置管理基于各平台独立进行，而非采用类似 Cordova 中 `config.xml` 的抽象化配置系统。

## 平台化配置管理

与 Cordova 相比，Capacitor 要求开发者更深入地参与原生项目配置。我们认为这是正确的设计方向，因为这样能够：
- 轻松遵循现有的 iOS/Android 原生开发指南
- 在 Stack Overflow 等平台高效获取帮助  
- 对项目保持完全控制权

此外，由于 Capacitor 项目的配置方式与常规 iOS/Android 项目完全一致，现有原生开发团队可以与 web 开发者协同工作，各方都能使用熟悉的工具和 SDK。当然，我们相信 web 开发者完全有能力独立完成所有必要的原生配置，Capacitor 文档正是为了帮助 web 开发者实现这一目标而存在。

## 通用配置

Capacitor 提供了一些高层级配置选项，这些选项可在 [Capacitor 配置文件](/config.md) 中进行设置。这些配置通常不会修改原生功能，而是用于控制 Capacitor 工具链的行为。

## 原生配置

iOS 和 Android 平台分别提供了配置指南，详细说明如何对各自平台进行常见行为调整：

[iOS 配置指南 &#8250;](/ios/configuration.md)

[Android 配置指南 &#8250;](/android/configuration.md)