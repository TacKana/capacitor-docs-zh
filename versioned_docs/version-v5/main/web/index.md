---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 快速开始
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 全面支持传统网页和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松为您的 iOS 和 Android 应用商店应用发布 PWA 版本，只需极少量工作。

## 浏览器支持

Capacitor 核心库和插件基于 ES2017 构建。所有现代浏览器（包括 iOS 和 Android 上的 PWA 运行环境）都支持这种较新的 JavaScript 语法，但在 IE11 中需要额外使用 [Babel](https://babeljs.io) 等工具进行 JavaScript 转换才能运行。

支持 Web 的插件会进行特性检测，如果浏览器不支持特定 Web API，则会抛出异常。

## 安装

如果您已经在为 iOS 或 Android 构建 Capacitor 应用，无需额外安装步骤！

否则，请先查看 [安装指南](/main/getting-started/installation.md) 再继续。

### 作为模块使用

大多数情况下，应用会使用支持导入 JavaScript 模块的构建系统框架。通过从 `@capacitor/core` 导入或导入插件，Capacitor JavaScript 运行时将与您的应用一起加载。

### 作为脚本引入

在不使用构建系统或打包器/模块加载器的 Web 应用中，可按以下方式使用 Capacitor 运行时：

1. 在 [Capacitor 配置文件](/main/reference/config.md) 中将 `bundledWebRuntime` 设为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包 (`capacitor.js`) 复制到您的 web 资源目录

```bash
npx cap sync web
```

3. 在 `index.html` 中先于其他 JavaScript 导入 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 发布上线

当您的渐进式 Web 应用准备就绪要向全世界发布时，只需上传 web 资源目录的全部内容即可。

这些文件包含了运行应用所需的一切！