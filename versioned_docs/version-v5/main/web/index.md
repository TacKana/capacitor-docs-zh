---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 应用和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地以最少的工作量发布您的 iOS 和 Android 应用商店应用的 PWA 版本。

## 浏览器支持

Capacitor 核心和插件针对 ES2017 构建。这种较新的 JavaScript 语法在所有现代浏览器（包括为 iOS 和 Android 上的 PWA 提供支持的浏览器）中都受支持，但在 IE11 中需要额外的 JavaScript 转换才能工作，例如使用 [Babel](https://babeljs.io)。

具有 Web 支持的插件将执行特性检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果您已经在为 iOS 或 Android 构建 Capacitor 应用，则无需额外安装步骤！

否则，请先参阅[安装](/main/getting-started/installation.md)指南。

### 将 Capacitor 作为模块使用

大多数情况下，应用将使用带有支持导入 JavaScript 模块的构建系统的框架。通过从 `@capacitor/core` 导入或导入插件，Capacitor JavaScript 运行时将随您的应用一起加载。

### 将 Capacitor 作为 Script 标签使用

要在一个未使用构建系统或打包器/模块加载器的 Web 应用中使用 Capacitor 运行时，请执行以下操作：

1. 在 [Capacitor 配置文件](/main/reference/config.md)中将 `bundledWebRuntime` 设置为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包（`capacitor.js`）复制到您的 Web 资产目录

```bash
npx cap sync web
```

3. 在 `index.html` 中其他 JavaScript 之前导入 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 发布上线

当您准备好发布渐进式 Web 应用并与全世界分享时，只需上传 Web 资产目录的内容即可。

这将包含运行应用所需的一切！
