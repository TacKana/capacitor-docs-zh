---
title: Storage
description: 在 Capacitor 中存储小规模至大规模数据的解决方案
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 数据存储方案

大多数应用都需要持久化存储和读取本地数据。根据具体使用场景，开发者可采用以下几种方案。

> 需要加密存储本地数据？Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包含身份验证、生物识别和安全存储功能。[了解更多](https://ionic.io/secure)

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要运行在 WebView 或浏览器环境中，开发者可以使用 Web 存储 API。但使用这些 API 时需要注意几个关键限制。

LocalStorage 适合存储少量临时数据（如用户 ID），但必须将其视为临时存储，即应用需要预期数据最终可能会丢失。这是因为当设备存储空间不足时，操作系统会回收 WebView 占用的本地存储空间。IndexedDB 在 iOS 上也有类似限制（而在 Android 上可通过 [持久化存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久化）。更多关于浏览器[数据存储回收策略](https://developer.mozilla.org/en-US/docs/v3/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的内容可查阅相关文档。

## Capacitor 存储 API

Capacitor 提供了原生 [Storage API](/apis/storage.md)，可以避免上述数据回收问题，但该 API 仅适用于少量数据的存储。

Storage API 提供简单的键值对存储功能，不支持高级查询：

```typescript
import { Storage } from '@capacitor/storage';

// JSON 存储示例
async setObject() {
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON 读取示例
async getObject() {
  const ret = await Storage.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据量或高性能存储方案

对于需要存储大量数据并要求高性能访问的场景，有以下几种选择：

目前最广泛支持的方案是 SQLite。社区维护了多个适用于 Capacitor 的 SQLite 插件，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持数据加密，并能与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。