---
title: Capacitor 插件 API
description: Capacitor 插件 API
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
canonicalUrl: https://capacitorjs.com/docs/apis
translated: true
---

# Capacitor 插件 API

Capacitor 包含许多原生插件 API，适用于所有 Capacitor 应用。这些可以被视为 Capacitor 的"核心插件"，它们使在每个平台上访问常用功能变得简单。

对于从 Cordova 迁移过来的用户，Capacitor 核心插件涵盖了大部分 Cordova 核心插件，同时也包含一些新的插件。

请在左侧菜单的插件列表中查看所有可用插件的完整列表。

## API 使用

要使用 Capacitor 插件，请按照以下步骤操作：

1&rpar; 导入 `Plugins` 对象。它代表了所有 Capacitor 插件的注册表。

```typescript
import { Plugins } from '@capacitor/core';
```

2&rpar; 从插件注册表（`Plugins` 对象）中获取一个插件。

```typescript
const { Browser } = Plugins;
```

3&rpar; 使用插件 API：

```typescript
async openBrowser() {
  // 在 iOS 上，例如，在 SFSafariViewController（应用内浏览器）中打开 URL
  await Browser.open({ url: "https://ionicframework.com" });
}
```

一个常见错误是直接导入插件，然后立即使用插件 API，这会导致使用 Web 实现：

```typescript
import { Browser } from '@capacitor/core';

async openBrowser() {
  // 在 iOS 上，例如，这将在 Safari 中打开 URL，而不是
  // SFSafariViewController（应用内浏览器）
  await Browser.open({ url: "https://ionicframework.com" });
}
```

通过使用插件注册表（`Plugins` 对象）中的插件，会优先使用插件的原生实现（如果可用），并回退到 Web 版本。

### Angular 注意事项

Capacitor 插件事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。请将处理逻辑包裹在 `NgZone.run` 块内，以确保触发 Angular 的变更检测：

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
