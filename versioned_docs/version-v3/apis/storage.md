---
title: Storage Capacitor Plugin API
description: Storage API 为轻量级数据提供了一个简单的键值对持久化存储方案。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/src/definitions.ts
sidebar_label: Storage
---

# @capacitor/storage

Storage API 为轻量级数据提供了一个简单的键值对持久化存储方案。

由于移动操作系统可能会定期清除 `window.localStorage` 中存储的数据，因此应改用此 API。当作为渐进式 Web 应用（PWA）运行时，该 API 会自动回退使用 `localStorage`。

在 iOS 上，本插件使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)；
在 Android 上则使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。
存储的数据会在应用卸载时被清除。

**注意**：该 API _不_ 适合用作本地数据库。如果您的应用需要存储大量数据、高频读写或复杂查询，建议考虑基于 SQLite 的解决方案，例如支持全加密的 [Ionic Secure Storage](https://ionic.io/docs/v3/secure-storage)。[Capacitor 社区](https://github.com/capacitor-community/) 也开发了多种其他存储引擎。

## 安装

```bash
npm install @capacitor/storage
npx cap sync
```

## 使用示例

```typescript
import { Storage } from '@capacitor/storage';

const setName = async () => {
  await Storage.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Storage.get({ key: 'name' });

  console.log(`Hello ${value}!`);
};

const removeName = async () => {
  await Storage.remove({ key: 'name' });
};
```

## 处理 JSON 数据

Storage API 仅支持字符串值。但您可以在调用 `set()` 前使用 `JSON.stringify` 处理对象，在 `get()` 后使用 `JSON.parse` 解析返回值，从而实现对 JSON 的支持。

此方法也可用于存储非字符串值，如数字和布尔值。

## API 文档

<docgen-index>

- [`configure(...)`](#configure)
- [`get(...)`](#get)
- [`set(...)`](#set)
- [`remove(...)`](#remove)
- [`clear()`](#clear)
- [`keys()`](#keys)
- [`migrate()`](#migrate)
- [`removeOld()`](#removeold)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

运行时配置存储插件。

值为 `undefined` 的选项将不会被应用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**版本:** 1.0.0

---

### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

根据键名获取存储中的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**版本:** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

为指定键名设置存储值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**版本:** 1.0.0

---

### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

移除存储中指定键名的值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**版本:** 1.0.0

---

### clear()

```typescript
clear() => Promise<void>
```

清空存储中的所有键值对。

**版本:** 1.0.0

---

### keys()

```typescript
keys() => Promise<KeysResult>
```

返回存储中所有已知键名的列表。

**返回值:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**版本:** 1.0.0

---

### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的，不会删除旧数据，仅当键名不存在时才会写入新数据。
迁移完成后如需删除旧数据，请调用 removeOld()。

**返回值:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**版本:** 1.0.0

---

### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中以 `_cap_` 为前缀的旧数据。

**版本:** 1.1.0

---

### Interfaces

#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                         | 默认值                        | 版本  |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置存储分组。存储分组用于组织键值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：当使用 'NativeStorage' 分组时，`clear()` 方法可能会意外删除其他数据。 | <code>CapacitorStorage</code> | 1.0.0 |

#### GetResult

| 属性        | 类型                        | 描述                                                                      | 版本  |
| ----------- | --------------------------- | ------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 存储中与给定键名关联的值。如果该键名从未被设置或已被移除，则返回 `null`。 | 1.0.0 |

#### GetOptions

| 属性      | 类型                | 描述                 | 版本  |
| --------- | ------------------- | -------------------- | ----- |
| **`key`** | <code>string</code> | 要获取存储值的键名。 | 1.0.0 |

#### SetOptions

| 属性        | 类型                | 描述                 | 版本  |
| ----------- | ------------------- | -------------------- | ----- |
| **`key`**   | <code>string</code> | 要关联存储值的键名。 | 1.0.0 |
| **`value`** | <code>string</code> | 要存储的字符串值。   | 1.0.0 |

#### RemoveOptions

| 属性      | 类型                | 描述                   | 版本  |
| --------- | ------------------- | ---------------------- | ----- |
| **`key`** | <code>string</code> | 要从存储中移除的键名。 | 1.0.0 |

#### KeysResult

| 属性       | 类型                  | 描述                 | 版本  |
| ---------- | --------------------- | -------------------- | ----- |
| **`keys`** | <code>string[]</code> | 存储中所有已知键名。 | 1.0.0 |

#### MigrateResult

| 属性           | 类型                  | 描述                                                                        | 版本  |
| -------------- | --------------------- | --------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键名数组。                                                          | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已存在存储中且包含 Capacitor 2 Storage 插件值的键名数组（包括已迁移键名）。 | 1.0.0 |

</docgen-api>
