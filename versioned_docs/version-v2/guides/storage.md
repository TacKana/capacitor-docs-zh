---
title: 数据存储
description: 在 Capacitor 中存储从小到大量的数据
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/storage
---

# Capacitor 中的数据存储

大多数应用需要持久化和读取本地数据。根据具体用例，有几种方法可以采用。

## 为什么不能只使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要运行在 Web View 或浏览器中，Capacitor 开发者可以使用 Web API 进行存储。但是，这些 API 有一些重要的注意事项需要牢记。

Local Storage 可用于存储少量临时数据，例如用户 ID，但 _必须被视为临时的_，这意味着您的应用需要预期数据最终会丢失。这是因为如果设备空间不足，操作系统会回收 Web View 中的本地存储。在至少 iOS 上，IndexedDB 也是如此（在 Android 上，[persisted storage API](https://web.dev/persistent-storage/) 可用于将 IndexedDB 标记为持久化）。在浏览器中阅读更多关于 [数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) 的信息。

## Capacitor Storage API

Capacitor 自带了一个原生的 [Storage API](/apis/storage.md)，可以避免上述的驱逐问题，但仅适用于少量数据。

Storage API 提供了一个简单的键/值 API，没有高级查询支持：

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

## 大数据或高性能存储选项

对于存储大量数据并以高性能方式访问，有几种选择。

最广泛支持的选项是 SQLite。有许多社区维护的 SQLite 插件可以在 Capacitor 中使用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供 [企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密并与设备上的 [安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。