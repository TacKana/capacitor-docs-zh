---
title: 配置你的应用
description: 原生项目配置
contributors:
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/basics/configuring-your-app
---

# 配置你的应用

Capacitor 秉持"一次编码，处处配置"的理念：配置管理是基于每个平台进行的，而非采用像 Cordova 中 `config.xml` 那样的抽象化系统。

## 基于平台的管理

相比于 Cordova，Capacitor 需要你更多地参与到原生项目的配置中。我们认为这是正确的方法，因为它便于你遵循现有的原生 iOS/Android 指南，在 Stack Overflow 上寻求帮助，并完全掌控你的项目。

此外，由于配置 Capacitor 项目与配置任何 iOS 或 Android 项目并无不同，现有的原生开发团队可以轻松地与 Web 开发人员协同工作，双方都能使用各自熟悉的工具和 SDK。当然，我们相信 Web 开发人员完全可以自行处理所有必需的原生配置，而 Capacitor 文档的存在正是为了帮助 Web 开发人员做到这一点。

## 通用配置

Capacitor 有一些高级配置选项，可以在 [Capacitor 配置文件](/config.md) 中设置。这些选项通常不修改原生功能，而是控制 Capacitor 的工具链。

## 原生配置

iOS 和 Android 各有配置指南，引导你对其行为进行常见修改：

[配置 iOS &#8250;](/ios/configuration.md)

[配置 Android &#8250;](/android/configuration.md)