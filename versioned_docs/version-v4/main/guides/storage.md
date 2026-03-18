---
title: 数据存储
description: 在 Capacitor 中存储小到大量数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用都需要持久化和读取本地数据。根据具体使用场景，有几种方法可供选择。

> 需要本地数据加密？Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包含身份验证、生物识别和安全存储功能。[了解更多](https://ionic.io/secure)

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 WebView 或浏览器中运行，因此 Web 存储 API 对 Capacitor 开发者是可用的。但在使用这些 API 时，需要注意一些重要限制。

LocalStorage 可用于存储少量临时数据，比如用户 ID，但**必须考虑其易失性**，这意味着你的应用需要预期数据最终会丢失。这是因为当设备存储空间不足时，操作系统会回收 WebView 的本地存储空间。IndexedDB 至少在 iOS 上也有类似情况（在 Android 上可以使用[持久存储 API](https://web.dev/persistent-storage/)将 IndexedDB 标记为持久存储）。详细了解浏览器中的[数据存储淘汰策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)。

## Capacitor Preferences API

Capacitor 自带原生 [Preferences API](/apis/preferences.md)，可以避免上述的淘汰问题，但仅适用于存储少量数据。

Preferences API 提供简单的键/值 API，不支持高级查询：

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON "设置" 示例
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "获取" 示例
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据量或高性能存储方案

对于存储大量数据并以高性能方式访问，有几种选择。

最广泛支持的选择是 SQLite。有许多社区维护的 SQLite 插件可在 Capacitor 中使用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密功能，并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。