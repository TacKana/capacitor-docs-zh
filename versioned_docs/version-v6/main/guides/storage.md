---
title: Storage
description: 在 Capacitor 中存储小到大量数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用都需要持久化存储和读取本地数据。根据具体使用场景，开发者可以采用以下几种方法。

> 需要本地数据加密？Ionic 为 Capacitor 应用提供了一套开箱即用的安全解决方案，包含身份验证、生物识别和安全存储功能。[了解更多](https://ionic.io/secure)。

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要运行在 WebView 或浏览器中，因此 Capacitor 开发者可以使用 Web 存储 API。但需要注意这些 API 存在一些重要限制。

LocalStorage 可用于存储少量临时数据（例如用户 ID），但_必须视为瞬态存储_，这意味着应用需要预期数据最终可能会丢失。这是因为当设备存储空间不足时，操作系统会回收 WebView 的本地存储空间。IndexedDB 至少在 iOS 上也是如此（在 Android 上可以使用[持久存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久存储）。更多关于浏览器[数据存储回收策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的信息。

## Capacitor Preferences API

Capacitor 内置了原生的 [Preferences API](/apis/preferences.md)，可避免上述数据回收问题，但该 API 仅适用于少量数据存储。

Preferences API 提供简单的键/值存储功能，不支持高级查询：

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON "set" 示例
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" 示例
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据量或高性能存储方案

对于需要存储大量数据并实现高性能访问的场景，有以下几种选择。

最广泛支持的方案是 SQLite。社区维护了多个适用于 Capacitor 的 SQLite 插件，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持数据加密并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。