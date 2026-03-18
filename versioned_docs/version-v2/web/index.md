---
title: Capacitor Web 文档
description: Web 快速入门
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/web
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统网页和渐进式 Web 应用。事实上，使用 Capacitor 可以轻松地将您的 iOS 和 Android 应用商店应用以最小的改动发布为 PWA 版本。

### 安装

如果您正在使用 Capacitor 构建 iOS 或 Android 应用，那么您的应用中很可能已经安装了 Capacitor。在 Capacitor 中，`web` 平台正是驱动您应用的网页项目！

如果您尚未安装 Capacitor，请在继续之前参考 [安装指南](/getting-started/index.md)。

#### 将 Capacitor 作为模块使用

通常情况下，应用会使用支持导入 JavaScript 模块的构建系统的框架。在这种情况下，只需在应用的顶部导入 Capacitor 即可：

```typescript
import { Capacitor } from '@capacitor/core';
```

要使用插件，导入 `Plugins` 并调用它，请注意只有支持 Web 的插件才能提供实际功能：

```typescript
import { Plugins } from '@capacitor/core';

const position = await Plugins.Geolocation.getCurrentPosition();
```

### 将 Capacitor 作为脚本引入使用

要在未使用构建系统或打包工具/模块加载器的 Web 应用中使用 Capacitor 核心功能，您必须在 `capacitor.config.json` 中将 `bundledWebRuntime` 设置为 `true`，并告诉 Capacitor 将指定版本的 Capacitor Core 复制到您的项目中，然后在 `index.html` 中导入 `capacitor.js`：

```json
{
  "bundledWebRuntime": true
}
```

复制到您的项目：

```bash
npx cap copy web
```

在 `index.html` 中，在您的应用 JS 之前导入 `capacitor.js`：

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 开发您的应用

您很可能正在使用像 [Ionic](http://ionicframework.com/) 这样的框架来处理 UI 组件和构建。要开发您的 Capacitor Web 应用，直接使用您的框架即可！

如果您没有使用框架，Capacitor 附带了一个小型开发服务器，支持 HTML5 路由。要使用它，请运行：

```bash
npx cap serve
```

## 发布上线

当您准备好发布您的渐进式 Web 应用并与世界分享时，只需上传您的 Web 目录内容即可（例如 `www/` 或 `build/` 文件夹）。

其中将包含运行您的应用所需的一切！