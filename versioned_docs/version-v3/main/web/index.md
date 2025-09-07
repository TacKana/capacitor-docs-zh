---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 开始使用
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 全面支持传统网页和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地将 iOS 和 Android 应用商店的应用打包为 PWA 版本，工作量极小。

## 浏览器兼容性

Capacitor 核心库和插件基于 ES2017 标准构建。所有现代浏览器（包括 iOS 和 Android 上的 PWA 运行环境）都支持这一较新的 JavaScript 语法，但在 IE11 等旧版浏览器中需要额外使用 [Babel](https://babeljs.io) 等工具进行转译才能正常运行。

支持 Web 的插件会进行特性检测，如果浏览器不支持特定 Web API 则会抛出异常。

## 安装指南

如果您已在为 iOS 或 Android 开发 Capacitor 应用，无需额外安装步骤！

否则，请先参阅 [安装指南](/main/getting-started/installation.md) 再继续。

### 作为模块使用 Capacitor

大多数情况下，应用会采用支持 JavaScript 模块导入的构建系统框架。通过从 `@capacitor/core` 导入或导入插件，Capacitor JavaScript 运行时将与您的应用一同加载。

### 作为脚本引入 Capacitor

若要在不使用构建系统或模块加载器的 Web 应用中使用 Capacitor 运行时，请执行以下操作：

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

当您准备好发布渐进式 Web 应用并与全世界分享时，只需上传网页资源目录中的内容即可。

该目录包含运行应用所需的一切！