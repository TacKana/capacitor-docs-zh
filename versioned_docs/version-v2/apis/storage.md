---
title: 存储
description: 存储 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/storage
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Storage API 为简单数据提供了一个键值存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此应使用此 API 替代 `window.localStorage`。当作为渐进式 Web 应用运行时，此 API 将回退到使用 `localStorage`。

在 iOS 上，此插件将使用 [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上使用 [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

注意：此 API 不适用于高性能数据存储应用。如果您的应用需要存储大量项目、具有高读取/写入负载或需要复杂查询，请考虑使用 SQLite 或单独的数据引擎。

- [`get(...)`](#get)
- [`set(...)`](#set)
- [`remove(...)`](#remove)
- [`clear()`](#clear)
- [`keys()`](#keys)

## 使用 JSON

`Storage` 仅支持字符串。但存储 JSON 数据很简单：只需在调用 `set` 之前使用 `JSON.stringify` 序列化对象，然后使用 `JSON.parse` 解析从 `get` 返回的值。更多细节请参见下面的示例。

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
  console.log('获取到项目: ', value);
}

async removeItem() {
  await Storage.remove({ key: 'name' });
}

async keys() {
  const { keys } = await Storage.keys();
  console.log('获取到键: ', keys);
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

获取给定键的值。

| 参数 | 类型 |
| ------------- | ----------------------------- |
| **`options`** | `{ key: string; }` |

**返回：** `Promise<{ value: string; }>`

---

### set(...)

```typescript
set(options: { key: string; value: string; }) => Promise<void>
```

为给定键设置值

| 参数 | 类型 |
| ------------- | -------------------------------------------- |
| **`options`** | `{ key: string; value: string; }` |

---

### remove(...)

```typescript
remove(options: { key: string; }) => Promise<void>
```

移除该键的值（如果有）

| 参数 | 类型 |
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

**返回：** `Promise<{ keys: string[]; }>`
