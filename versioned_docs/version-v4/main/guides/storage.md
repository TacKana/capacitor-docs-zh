---
title: 存储
description: 在 Capacitor 中存储小量到大量的数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用需要持久化和读取本地数据。根据具体用例，有几种方法可以采用。

> 需要加密你的本地数据？Ionic 为 Capacitor 应用提供了一个开箱即用的安全套件，包括认证、生物识别和安全存储。[了解更多](https://ionic.io/secure)。

## 为什么我不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web View 或浏览器中运行，Capacitor 开发者可以使用 Web API 进行存储。然而，使用这些 API 时需要注意一些重要的问题。

Local Storage 可用于少量临时数据（如用户 ID），但_必须被视为临时的_，这意味着你的应用需要预期数据最终会丢失。这是因为如果设备空间不足，操作系统会从 Web View 回收 local storage。至少在 iOS 上，IndexedDB 也是如此（在 Android 上，[persisted storage API](https://web.dev/persistent-storage/) 可用于将 IndexedDB 标记为持久化）。阅读更多关于浏览器中的[数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的信息。

## Capacitor Preferences API

Capacitor 提供了一个原生 [Preferences API](/apis/preferences.md)，可避免上述驱逐问题，但适用于少量数据。

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

## 大数据或高性能存储选项

对于存储大量数据并以高性能方式访问，有几种选择。

最广泛支持的选项是 SQLite。有几个社区维护的 SQLite 插件可以在 Capacitor 中使用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了一个[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。
