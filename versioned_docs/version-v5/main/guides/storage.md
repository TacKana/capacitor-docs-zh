---
title: Storage
description: 在 Capacitor 中存储小到大量的数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用都需要持久化并读取本地数据。根据具体的使用场景，有几种不同的方法可供选择。

> 需要加密本地数据吗？Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包含身份验证、生物识别和安全存储功能。[了解更多](https://ionic.io/secure)。

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web 视图或浏览器中运行，因此 Capacitor 开发者可以使用 Web 存储 API。然而，在使用这些 API 时，需要注意一些重要的限制。

Local Storage 可用于存储少量临时数据，例如用户 ID，但必须将其视为临时存储，这意味着你的应用需要预期数据最终可能会丢失。这是因为如果设备存储空间不足，操作系统会回收 Web 视图中的本地存储。至少对于 iOS 上的 IndexedDB 也是如此（在 Android 上，可以使用[持久存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久存储）。有关浏览器中[数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的更多信息，请阅读相关文档。

## Capacitor Preferences API

Capacitor 内置了原生的 [Preferences API](/apis/preferences.md)，可以避免上述的驱逐问题，但该 API 设计用于存储少量数据。

Preferences API 提供了一个简单的键/值 API，不支持高级查询功能：

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

## 大数据量或高性能存储选项

对于存储大量数据并以高性能方式访问，有几种选择。

最广泛支持的选项是 SQLite。有许多社区维护的 SQLite 插件可以在 Capacitor 中使用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了一个[企业版 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密功能，并能与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。