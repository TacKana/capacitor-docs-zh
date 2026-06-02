---
title: 数据存储
description: 在 Capacitor 中存储小量到大量数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用需要持久化和读取本地数据。根据具体的使用场景，有几种方法可供选择。

> 需要对本地数据进行加密？Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包括认证、生物识别和安全存储。[了解更多](https://ionic.io/secure)。

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web View 或浏览器中运行，Capacitor 开发者可以使用 Web API 进行存储。然而，使用这些 API 需要注意一些重要的限制。

Local Storage 可用于存储少量临时数据，例如用户 ID，但**必须被视为临时存储**，这意味着你的应用需要预期数据最终会丢失。这是因为当设备存储空间不足时，操作系统会回收 Web View 中的 local storage。IndexedDB 在 iOS 上也是如此（在 Android 上，可以使用[持久化存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久化）。更多信息请阅读浏览器中的[数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)。

## Capacitor Preferences API

Capacitor 提供了一个原生 [Preferences API](/apis/preferences.md)，可以避免上述数据驱逐问题，但仅适用于少量数据。

Preferences API 提供了一个简单的键/值 API，没有高级查询支持：

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

Capacitor 团队还提供了一个[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密功能并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。
