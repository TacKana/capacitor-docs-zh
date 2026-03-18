---
title: Capacitor 插件
description: Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
canonicalUrl: https://capacitorjs.com/docs/apis
---

# Capacitor 插件 API

Capacitor 包含一系列可供所有 Capacitor 应用使用的原生插件 API。这些可以看作是 Capacitor 的“核心插件”，它们让开发者能够轻松地在各个平台上访问常用的功能。

对于从 Cordova 迁移过来的开发者，Capacitor 核心插件覆盖了大部分 Cordova 核心插件的功能，同时还新增了一些插件。

完整可用插件列表请查看左侧菜单中的插件列表。

## API 使用方法

要使用 Capacitor 插件，请遵循以下步骤：

1&rpar; 导入 `Plugins` 对象。它代表了所有 Capacitor 插件的注册表。

```typescript
import { Plugins } from '@capacitor/core';
```

2&rpar; 从插件注册表（`Plugins` 对象）中获取插件。

```typescript
const { Browser } = Plugins;
```

3&rpar; 使用插件 API：

```typescript
async openBrowser() {
  // 例如在 iOS 上，会在 SFSafariViewController（应用内浏览器）中打开 URL
  await Browser.open({ url: "https://ionicframework.com" });
}
```

一个常见的错误是直接导入插件，然后立即使用插件 API，这会导致使用 Web 实现：

```typescript
import { Browser } from '@capacitor/core';

async openBrowser() {
  // 例如在 iOS 上，这将在 Safari 中打开 URL，而不是
  // SFSafariViewController（应用内浏览器）
  await Browser.open({ url: "https://ionicframework.com" });
}
```

通过使用插件注册表（`Plugins` 对象）中的插件，会优先使用插件的原生实现（如果可用），并回退到 Web 版本。

### Angular 注意事项

Capacitor 插件的事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。将处理逻辑包含在 `NgZone.run` 块中，以确保触发 Angular 的变更检测：

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