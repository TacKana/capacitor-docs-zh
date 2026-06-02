---
title: Capacitor Web 文档
description: Web 入门
sidebar_label: 入门
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 应用和渐进式 Web 应用。事实上，使用 Capacitor 可以轻松地将您的 iOS 和 Android 应用商店应用发布为 PWA 版本，只需极少的工作量。

## 浏览器支持

Capacitor 核心和插件构建目标为 ES2017。这种较新的 JavaScript 语法在所有现代浏览器（包括为 iOS 和 Android 上的 PWA 提供支持的浏览器）中都受支持，但在 IE11 中无法工作，除非进行额外的 JavaScript 转换，例如使用 [Babel](https://babeljs.io)。

具有 Web 支持的插件将执行特性检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果您已经在为 iOS 或 Android 构建 Capacitor 应用，则无需额外的安装步骤！

否则，请先参阅[安装指南](/main/getting-started/installation.md)。

### 将 Capacitor 作为模块使用

大多数情况下，应用会使用具有支持导入 JavaScript 模块的构建系统的框架。通过从 `@capacitor/core` 导入，或导入插件，Capacitor JavaScript 运行时将与您的应用一起加载。

### 将 Capacitor 作为脚本包含使用

要在未使用构建系统或打包器/模块加载器的 Web 应用中使用 Capacitor 运行时，请执行以下操作：

1. 在 [Capacitor 配置文件](/main/reference/config.md) 中将 `bundledWebRuntime` 设置为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包（`capacitor.js`）复制到您的 Web 资源目录中

```bash
npx cap sync web
```

3. 在 `index.html` 中，在其他 JavaScript 之前导入 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 上线

当您准备好发布您的渐进式 Web 应用并与全世界分享时，只需上传您的 Web 资源目录的内容即可。

其中包含运行您的应用所需的一切！
