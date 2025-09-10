---
title: Capacitor Web 文档
description: Web 开发入门指南
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/web
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统网页和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地将你的 iOS 和 Android 应用商店应用以 PWA 形式发布，只需极少量工作。

### 安装

如果你正在使用 Capacitor 构建 iOS 或 Android 应用，很可能已经安装了 Capacitor。在 Capacitor 中，`web` 平台就是驱动你应用的网页项目！

如果尚未安装 Capacitor，请先参阅 [安装指南](/getting-started/index.md) 再继续。

#### 作为模块使用 Capacitor

通常，使用支持 JavaScript 模块导入的构建系统的框架应用，只需在应用顶部导入 Capacitor 即可：

```typescript
import { Capacitor } from '@capacitor/core';
```

要使用插件，导入 `Plugins` 并调用它，注意只有支持网页平台的插件才能提供有效功能：

```typescript
import { Plugins } from '@capacitor/core';

const position = await Plugins.Geolocation.getCurrentPosition();
```

### 作为脚本引入使用 Capacitor

对于不使用构建系统或打包工具/模块加载器的网页应用，需要在 `capacitor.config.json` 中将 `bundledWebRuntime` 设为 `true`，让 Capacitor 将指定版本的 Core 拷贝到项目中，然后在 `index.html` 中引入 `capacitor.js`：

```json
{
  "bundledWebRuntime": true
}
```

拷贝到项目：

```bash
npx cap copy web
```

在 `index.html` 中，于应用 JS 前引入 `capacitor.js`：

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## 应用开发

你可能正在使用像 [Ionic](http://ionicframework.com/) 这样的框架来构建 UI 组件。要开发 Capacitor 网页应用，直接使用你的框架即可！

如果不使用框架，Capacitor 提供了一个支持 HTML5 路由的小型开发服务器。运行以下命令启动：

```bash
npx cap serve
```

## 发布上线

当准备发布渐进式 Web 应用并与世界分享时，只需上传 web 目录（例如 `www/` 或 `build/` 文件夹）的内容。

那里包含了运行应用所需的一切！