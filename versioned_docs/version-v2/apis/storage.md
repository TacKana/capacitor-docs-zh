---
title: Storage
description: Storage API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/storage
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Storage API 为简单数据提供了键值对存储功能。

移动操作系统可能会定期清除存储在 `window.localStorage` 中的数据，因此应使用此 API 替代 `window.localStorage`。当作为渐进式 Web 应用运行时，此 API 将回退到使用 `localStorage`。

在 iOS 上，此插件将使用 [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults)，而在 Android 上则使用 [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

注意：此 API 不适用于高性能数据存储应用。如果你的应用需要存储大量数据、具有高读写负载或需要进行复杂查询，请考虑使用 SQLite 或其他独立的数据引擎。

- [`get(...)`](#get)
- [`set(...)`](#set)
- [`remove(...)`](#remove)
- [`clear()`](#clear)
- [`keys()`](#keys)

## 处理 JSON 数据

`Storage` 仅处理字符串。但是，存储 JSON 对象也很简单：只需在调用 `set` 之前使用 `JSON.stringify` 将对象转换为字符串，然后在从 `get` 获取值后使用 `JSON.parse` 进行解析。更多细节请参考下面的示例。

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
  console.log('Got item: ', value);
}

async removeItem() {
  await Storage.remove({ key: 'name' });
}

async keys() {
  const { keys } = await Storage.keys();
  console.log('Got keys: ', keys);
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

根据指定的键获取对应的值。

| 参数          | 类型                          |
| ------------- | ----------------------------- |
| **`options`** | `{ key: string; }` |

**返回值：** `Promise<{ value: string; }>`

---

### set(...)

```typescript
set(options: { key: string; value: string; }) => Promise<void>
```

为指定的键设置对应的值。

| 参数          | 类型                                         |
| ------------- | -------------------------------------------- |
| **`options`** | `{ key: string; value: string; }` |

---

### remove(...)

```typescript
remove(options: { key: string; }) => Promise<void>
```

移除指定键对应的值（如果有的话）。

| 参数          | 类型                          |
| ------------- | ----------------------------- |
| **`options`** | `{ key: string; }` |

---

### clear()

```typescript
clear() => Promise<void>
```

清除所有已存储的键和值。

---

### keys()

```typescript
keys() => Promise<{ keys: string[]; }>
```

返回所有已知键的列表。

**返回值：** `Promise<{ keys: string[]; }>`

---