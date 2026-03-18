---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地将 iOS 和 Android 应用商店应用的 PWA 版本部署上线，工作量极小。

## 浏览器支持

Capacitor 核心库和插件针对 ES2017 标准构建。所有现代浏览器（包括 iOS 和 Android 上支持 PWA 的浏览器）都支持这种较新的 JavaScript 语法，但在 IE11 中无法直接运行，除非进行额外的 JavaScript 转换，例如使用 [Babel](https://babeljs.io)。

支持 Web 的插件会执行特性检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果你已经在为 iOS 或 Android 使用 Capacitor 进行构建，则无需任何额外的安装步骤！

否则，请先查看 [安装指南](/main/getting-started/installation.md)，然后再继续。

### 将 Capacitor 作为模块使用

大多数情况下，应用会使用带有构建系统的框架，该系统支持导入 JavaScript 模块。通过从 `@capacitor/core` 导入，或者导入一个插件，Capacitor JavaScript 运行时将与你的应用一起加载。

### 将 Capacitor 作为脚本包含使用

此选项已不再可用，请使用 JavaScript 模块打包工具。

## 发布上线

当你准备好发布渐进式 Web 应用并与全世界分享时，只需上传你的 Web 资源目录内容即可。

该目录包含了运行你的应用所需的所有内容！