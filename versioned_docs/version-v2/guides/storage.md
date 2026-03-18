---
title: Storage
description: 在 Capacitor 中存储少量到大量数据
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/storage
---

# Capacitor 中的数据存储

大多数应用都需要持久化和读取本地数据。根据具体的使用场景，有几种方法可供选择。

## 为什么不直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web 视图或浏览器中运行，因此 Capacitor 开发者可以使用 Web 存储 API。但需要注意这些 API 存在一些重要限制。

Local Storage 可用于存储少量临时数据，比如用户 ID，但 _必须视为临时存储_，这意味着你的应用需要预期数据最终可能会丢失。这是因为当设备存储空间不足时，操作系统会回收 Web 视图中的本地存储空间。IndexedDB 至少在 iOS 上也有同样的问题（在 Android 上，可以使用 [持久存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久存储）。详细了解浏览器中的 [数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)。

## Capacitor 存储 API

Capacitor 内置了原生的 [存储 API](/apis/storage.md)，可以避免上述的驱逐问题，但该 API 仅适用于少量数据。

存储 API 提供了简单的键值对操作，不支持高级查询功能：

```typescript
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
// JSON "set" 示例
async setObject() {
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" 示例
async getObject() {
  const ret = await Storage.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据量或高性能存储方案

对于存储大量数据并需要高性能访问的场景，有以下几种选择。

最广泛支持的选项是 SQLite。在 Capacitor 中有多个社区维护的 SQLite 插件可用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了 [企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持数据加密，并集成了设备上的 [安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault)。