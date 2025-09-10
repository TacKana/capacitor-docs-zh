---
title: Storage
description: Storage API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/storage
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Storage API 提供了一个简单的键值对数据存储方案。

移动操作系统可能会定期清理 `window.localStorage` 中设置的数据，因此应使用此 API 而非 `window.localStorage`。当作为渐进式 Web 应用（PWA）运行时，此 API 会自动回退到使用 `localStorage`。

在 iOS 上，该插件使用 [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上则使用 [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

注意：此 API 不适用于高性能数据存储场景。如果您的应用需要存储大量数据、具有高读写负载或需要复杂查询，请考虑使用 SQLite 或独立的数据引擎。

- [`get(...)`](#get)
- [`set(...)`](#set)
- [`remove(...)`](#remove)
- [`clear()`](#clear)
- [`keys()`](#keys)

## JSON 数据处理

`Storage` 仅支持字符串类型的数据。但存储 JSON 数据也很简单：只需在调用 `set` 前使用 `JSON.stringify` 处理对象，然后在 `get` 返回值后使用 `JSON.parse` 解析。详见以下示例。

此方法也可用于存储非字符串值，例如数字和布尔值。

## 示例

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

async setItem() {
  await Storage.set({
    key: 'name',
    value: 'Max'
  });
}

async getItem() {
  const { value } = await Storage.get({ key: 'name' });
  console.log('获取到数据: ', value);
}

async removeItem() {
  await Storage.remove({ key: 'name' });
}

async keys() {
  const { keys } = await Storage.keys();
  console.log('获取到所有键: ', keys);
}

async clear() {
  await Storage.clear();
}
```

## API

### get(...)

```typescript
get(options: { key: string; }) => Promise<{ value: string | null; }>
```

获取指定键对应的值。

| 参数          | 类型                          |
| ------------- | ----------------------------- |
| **`options`** | `{ key: string; }` |

**返回值:** `Promise<{ value: string; }>`

---

### set(...)

```typescript
set(options: { key: string; value: string; }) => Promise<void>
```

设置指定键对应的值

| 参数          | 类型                                         |
| ------------- | -------------------------------------------- |
| **`options`** | `{ key: string; value: string; }` |

---

### remove(...)

```typescript
remove(options: { key: string; }) => Promise<void>
```

移除指定键对应的值（如果存在）

| 参数          | 类型                          |
| ------------- | ----------------------------- |
| **`options`** | `{ key: string; }` |

---

### clear()

```typescript
clear() => Promise<void>
```

清除所有存储的键和值。

---

### keys()

```typescript
keys() => Promise<{ keys: string[]; }>
```

返回所有已知键的列表

**返回值:** `Promise<{ keys: string[]; }>`

---