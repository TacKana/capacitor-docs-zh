---
title: 存储
description: 在 Capacitor 中存储少量到大量数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用需要持久化和读取本地数据。根据具体的用例，有几种方法可以选择。

> 需要加密本地数据？Ionic 为 Capacitor 应用提供开箱即用的安全套件，包括身份验证、生物识别和安全存储。[了解更多](https://ionic.io/secure)。

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要运行在 Web View 或浏览器中，因此 Capacitor 开发者可以使用 Web 存储 API。但是，使用这些 API 时需要注意一些重要事项。

Local Storage 可用于少量临时数据，例如用户 ID，但**必须被视为临时数据**，这意味着您的应用需要预期数据最终会丢失。这是因为当设备空间不足时，操作系统会回收 Web View 中的本地存储。至少 iOS 上的 IndexedDB 也是如此（在 Android 上，[持久化存储 API](https://web.dev/persistent-storage/) 可用于将 IndexedDB 标记为持久化）。在浏览器中阅读更多关于[数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/v3/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的信息。

## Capacitor Storage API

Capacitor 自带原生 [Storage API](/apis/storage.md)，可以避免上述驱逐问题，但适用于少量数据。

Storage API 提供了一个简单的键/值 API，没有高级查询支持：

```typescript
import { Storage } from '@capacitor/storage';

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

最广泛支持的选项是 SQLite。有几个社区维护的 SQLite 插件应该可以在 Capacitor 中工作，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。
