---
title: Capacitor 网页版文档
description: 网页版入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在网页项目中使用 Capacitor

Capacitor 完全支持传统网页和渐进式网页应用 (Progressive Web Apps)。事实上，使用 Capacitor 可以轻松地在 iOS 和 Android 应用商店应用的基础上，以最小的工作量发布 PWA 版本。

## 浏览器支持

Capacitor 核心及插件均针对 ES2017 标准构建。这种较新的 JavaScript 语法在所有现代浏览器中（包括 iOS 和 Android 上支持 PWAs 的浏览器）都得到支持，但在 IE11 中如果不进行额外的 JavaScript 转换（例如使用 [Babel](https://babeljs.io)）将无法运行。

提供网页支持的插件会进行功能检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果你已经在为 iOS 或 Android 构建 Capacitor 应用，无需进行额外的安装步骤！

否则，请先查看 [安装指南](/main/getting-started/installation.md) 再继续。

### 将 Capacitor 作为模块使用

大多数情况下，应用会使用支持导入 JavaScript 模块的构建系统框架。通过从 `@capacitor/core` 导入，或导入插件，Capacitor JavaScript 运行时将随你的应用一同加载。

### 将 Capacitor 作为脚本引入使用

要在未使用构建系统或打包器/模块加载器的网页应用中使用 Capacitor 运行时，请执行以下操作：

1. 在 [Capacitor 配置文件](/main/reference/config.md) 中将 `bundledWebRuntime` 设置为 `true`

```json
"bundledWebRuntime": true
```

2. 将 Capacitor 运行时包 (`capacitor.js`) 复制到你的网页资源目录中

```bash
npx cap sync web
```

3. 在 `index.html` 中的其他 JavaScript 之前引入 `capacitor.js`

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 正式上线

当你准备好发布渐进式网页应用并与世界分享时，只需上传你的网页资源目录中的内容即可。

这将包含运行你的应用所需的一切！