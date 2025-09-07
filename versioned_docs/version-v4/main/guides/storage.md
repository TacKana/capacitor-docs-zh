---
title: Storage
description: 在Capacitor中存储从少量到大量数据的方法
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor数据存储指南

大多数应用都需要持久化存储和读取本地数据。根据具体使用场景，开发者可采取以下几种方案。

> 需要加密本地数据？Ionic为Capacitor应用提供了一套开箱即用的安全套件，包含身份认证、生物识别和安全存储功能。[了解更多](https://ionic.io/secure)

## 为什么不能直接使用LocalStorage或IndexedDB？

由于Capacitor应用主要运行在WebView或浏览器环境中，开发者确实可以使用这些Web存储API。但需要特别注意以下几个关键限制：

LocalStorage适合存储少量临时数据（如用户ID），但必须将其视为临时存储——这意味着应用需要做好数据随时丢失的准备。这是因为当设备存储空间不足时，操作系统会回收WebView占用的LocalStorage空间。IndexedDB同样存在这个问题（至少在iOS上如此，Android可通过[持久化存储API](https://web.dev/persistent-storage/)标记IndexedDB为持久化存储）。更多关于浏览器[数据存储回收策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的说明。

## Capacitor偏好设置API

Capacitor内置了原生[Preferences API](/apis/preferences.md)，可以避免上述回收问题，但仅适用于少量数据存储。

该API提供简单的键值对存储，不支持高级查询：

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON存储示例
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON读取示例
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据量或高性能存储方案

针对大量数据存储和高性能访问需求，有以下几种选择：

目前最普遍支持的方案是SQLite。社区维护了多个适用于Capacitor的SQLite插件，包括[capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite)和[cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor团队还提供[企业级SQLite存储方案](https://ionicframework.com/enterprise/offline-storage)，支持数据加密并与设备上的[安全密钥管理API](https://ionicframework.com/enterprise/identity-vault)深度集成。