---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
translated: true
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 应用和渐进式 Web 应用（PWA）。事实上，使用 Capacitor 可以轻松地将你的 iOS 和 Android 应用商店应用的 PWA 版本以最少的工作量发布。

## 浏览器支持

Capacitor 核心和插件基于 ES2017 构建。这种较新的 JavaScript 语法在所有现代浏览器（包括在 iOS 和 Android 上驱动 PWA 的浏览器）中都得到支持，但如果没有额外的 JavaScript 转换（例如使用 [Babel](https://babeljs.io)），则无法在 IE11 中工作。

支持 Web 的插件将执行特性检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果你已经在为 iOS 或 Android 构建 Capacitor 应用，则无需额外的安装步骤！

否则，请在继续之前查看[安装指南](/main/getting-started/installation.md)。

### 将 Capacitor 作为模块使用

大多数情况下，应用会使用带有构建系统的框架，该框架支持导入 JavaScript 模块。通过从 `@capacitor/core` 导入，或通过导入插件，Capacitor JavaScript 运行时将被加载到你的应用中。

### 将 Capacitor 作为脚本包含使用

此选项不再可用，请使用 JavaScript 模块打包工具。

## 发布上线

当你准备好发布你的渐进式 Web 应用并与世界分享时，只需上传 Web 资源目录的内容即可。

这将包含运行应用所需的一切！
