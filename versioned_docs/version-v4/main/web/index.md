---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 全面支持传统网页和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松实现 iOS 和 Android 应用商店应用的 PWA 版本，只需极少工作量。

## 浏览器兼容性

Capacitor 核心模块和插件基于 ES2017 构建。所有现代浏览器（包括 iOS 和 Android 上的 PWA 运行环境）都支持这种新版 JavaScript 语法，但在不进行额外转换（如使用 [Babel](https://babeljs.io)）的情况下无法兼容 IE11。

支持网页端的插件会进行特性检测，如果浏览器不支持特定 Web API 则会抛出异常。

## 安装指南

如果您已在为 iOS 或 Android 开发 Capacitor 项目，无需额外安装步骤！

否则，请先阅读[安装指南](/main/getting-started/installation.md)再继续。

### 作为模块使用

大多数应用会采用支持 JavaScript 模块导入的构建系统框架。通过从 `@capacitor/core` 导入或加载插件时，Capacitor JavaScript 运行时将自动随应用加载。

### 作为脚本引用

若要在不使用构建系统或模块加载器的网页应用中调用 Capacitor 运行时：

1. 在 [Capacitor 配置文件](/main/reference/config.md)中设置 `bundledWebRuntime` 为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包 (`capacitor.js`) 复制到网页资源目录

```bash
npx cap sync web
```

3. 在 `index.html` 中优先加载 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 发布准备

当您的渐进式 Web 应用准备就绪时，只需上传网页资源目录的全部内容即可发布。

该目录包含运行应用所需的一切资源！