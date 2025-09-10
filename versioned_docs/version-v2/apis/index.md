---
title: Capacitor Plugins
description: Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
canonicalUrl: https://capacitorjs.com/docs/apis
---

# Capacitor 插件 API

Capacitor 提供了一系列原生插件 API，这些 API 可供所有 Capacitor 应用使用。它们可以被视作 Capacitor 的"核心插件"，能帮助开发者便捷地访问各平台常用的功能特性。

对于从 Cordova 迁移而来的开发者，Capacitor 的核心插件涵盖了 Cordova 大部分核心插件功能，同时还新增了一些特性。

完整的可用插件列表请查看左侧菜单中的插件目录。

## API 使用方法

使用 Capacitor 插件需要遵循以下步骤：

1&rpar; 导入 `Plugins` 对象。它代表所有 Capacitor 插件的注册中心。

```typescript
import { Plugins } from '@capacitor/core';
```

2&rpar; 从插件注册中心（`Plugins` 对象）获取所需插件。

```typescript
const { Browser } = Plugins;
```

3&rpar; 使用插件 API：

```typescript
async openBrowser() {
  // 在 iOS 平台上，这将在 SFSafariViewController（应用内浏览器）中打开 URL
  await Browser.open({ url: "https://ionicframework.com" });
}
```

常见的错误做法是直接导入插件后立即使用 API，这样会导致始终调用网页版实现：

```typescript
import { Browser } from '@capacitor/core';

async openBrowser() {
  // 在 iOS 平台上，这将在 Safari 浏览器中打开 URL
  // 而非使用 SFSafariViewController（应用内浏览器）
  await Browser.open({ url: "https://ionicframework.com" });
}
```

通过插件注册中心（`Plugins` 对象）获取插件，可以确保优先使用原生实现（若可用），否则自动回退到网页版实现。

### Angular 使用说明

Capacitor 插件的事件监听器运行在 Angular 的 `NgZone` 执行上下文之外。若需要触发 Angular 的变更检测，请将处理逻辑包裹在 `NgZone.run` 代码块中：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 此代码将在 Angular 的执行上下文中运行
      this.networkStatus = status.connected ? "在线" : "离线";
    });
  });
}
```