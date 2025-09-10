---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 全面支持传统网页和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地将 iOS 和 Android 应用商店的应用程序打包为 PWA 版本，所需工作量极少。

## 浏览器兼容性

Capacitor 核心和插件基于 ES2017 构建。这种较新的 JavaScript 语法在所有现代浏览器中都能获得支持（包括 iOS 和 Android 上运行 PWA 的浏览器），但未经额外转换（如使用 [Babel](https://babeljs.io)）则无法在 IE11 中运行。

支持 Web 平台的插件会执行特性检测，如果浏览器不支持特定 Web API，将抛出异常。

## 安装指南

如果您已在为 iOS 或 Android 项目使用 Capacitor，则无需额外安装步骤！

否则，请先阅读 [安装指南](/main/getting-started/installation.md) 再继续。

### 作为模块使用

大多数情况下，应用会采用支持 JavaScript 模块导入的框架构建系统。通过从 `@capacitor/core` 或插件中导入，Capacitor JavaScript 运行时将与您的应用一同加载。

### 作为脚本引入

若要在未使用构建系统或打包工具/模块加载器的网页应用中使用 Capacitor 运行时，请按以下步骤操作：

1. 在 [Capacitor 配置文件](/main/reference/config.md) 中将 `bundledWebRuntime` 设为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包 (`capacitor.js`) 复制到您的网页资源目录

```bash
npx cap sync web
```

3. 在 `index.html` 中优先引入 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 发布上线

当您的渐进式 Web 应用准备就绪并要公开发布时，只需上传网页资源目录的内容即可。

该目录包含运行应用所需的所有资源！