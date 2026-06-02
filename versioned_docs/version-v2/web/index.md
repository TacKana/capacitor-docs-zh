---
title: Capacitor Web 文档
description: Web 入门
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/web
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 和渐进式 Web 应用。事实上，使用 Capacitor 可以轻松地以最少的工作量发布您的 iOS 和 Android 应用商店应用的 PWA 版本。

### 安装

如果您正在使用 Capacitor 构建 iOS 或 Android 应用，那么您很可能已经在应用中安装了 Capacitor。在 Capacitor 中，`web` 平台就是为您的应用提供动力的 Web 项目！

如果您还没有安装 Capacitor，请先查阅 [安装](/getting-started/index.md) 指南。

#### 将 Capacitor 作为模块使用

通常，应用会使用带有支持导入 JavaScript 模块的构建系统的框架。在这种情况下，
只需在应用的顶部导入 Capacitor，一切就绪：

```typescript
import { Capacitor } from '@capacitor/core';
```

要使用插件，请导入 `Plugins` 并进行调用，请注意只有
具有 Web 支持的插件才会提供有用的功能：

```typescript
import { Plugins } from '@capacitor/core';

const position = await Plugins.Geolocation.getCurrentPosition();
```

### 将 Capacitor 作为脚本包含使用

要在不使用构建系统或打包器/模块加载器的 Web 应用中使用 Capacitor core，
您必须将 `capacitor.config.json` 中的 `bundledWebRuntime` 设置为 `true`，告诉 Capacitor
将指定版本的 Capacitor Core 复制到您的项目中，
然后将 `capacitor.js` 导入到您的 `index.html` 中：

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

您很可能正在使用像 [Ionic](http://ionicframework.com/) 这样的框架来进行 UI 组件和构建。要开发
您的 Capacitor Web 应用，只需使用您的框架！

如果您没有使用框架，Capacitor 附带了一个带有 HTML5 路由支持的小型开发服务。要使用它，
请运行：

```bash
npx cap serve
```

## 上线

当您准备好发布您的渐进式 Web 应用并与世界分享时，
只需上传您的 Web 目录的内容（例如 `www/` 或 `build/` 文件夹）。

这将包含运行您的应用所需的一切！