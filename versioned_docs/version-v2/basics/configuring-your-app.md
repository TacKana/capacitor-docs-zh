---
title: 配置您的应用
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/basics/configuring-your-app
---

# 配置您的应用

Capacitor 秉承"一次编码，随处配置"的理念：配置是按平台管理的，而不是像 Cordova 中的 `config.xml` 那样在抽象系统中管理。

## 按平台管理

Capacitor 要求您比在 Cordova 中更深入地参与原生项目配置。我们认为这是正确的方法，因为它使您能够轻松遵循现有的原生 iOS/Android 指南，在 Stack Overflow 上获得帮助，并完全控制您的项目。

此外，由于配置 Capacitor 项目与配置任何 iOS 或 Android 项目没有区别，现有原生开发团队可以轻松地与 Web 开发者协作，各方使用他们熟悉的工具和 SDK。当然，我们相信 Web 开发者可以自行处理所有必要的原生配置，Capacitor 文档的存在就是为了帮助 Web 开发者做到这一点。

## 通用配置

Capacitor 有一些高级配置选项，可以在 [Capacitor 配置文件](/config.md) 中设置。这些通常不会修改原生功能，而是控制 Capacitor 的工具链。

## 原生配置

iOS 和 Android 各有配置指南，介绍如何进行常见的行为更改：

[配置 iOS &#8250;](/ios/configuration.md)

[配置 Android &#8250;](/android/configuration.md)