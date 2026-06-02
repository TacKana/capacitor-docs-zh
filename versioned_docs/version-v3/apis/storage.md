---
title: Storage Capacitor 插件 API
description: Storage API 为轻量级数据提供了一个简单的键值持久化存储。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/src/definitions.ts
sidebar_label: Storage
translated: true
---

# @capacitor/storage

Storage API 为轻量级数据提供了一个简单的键值持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此
应改用此 API。当作为渐进式 Web 应用运行时，此 API 将回退到使用 `localStorage`。

此插件将在 iOS 上使用
[`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)
，在 Android 上使用
[`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)
。如果应用被卸载，存储的数据将被清除。

**注意**：此 API _不_ 旨在用作本地数据库。如果您的应用
存储大量数据、具有高读/写负载或需要复杂查询，
我们建议使用基于 SQLite 的解决方案。其中一个解决方案是 [Ionic Secure Storage](https://ionic.io/docs/v3/secure-storage)，这是一个具有完整加密支持的基于 SQLite 的引擎。[Capacitor Community](https://github.com/capacitor-community/) 还构建了许多其他存储引擎。

## 安装

```bash
npm install @capacitor/storage
npx cap sync
```

## 示例

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

## 使用 JSON

Storage API 只支持字符串值。不过，如果您在调用 `set()` 之前对对象进行 `JSON.stringify`，然后对 `get()` 返回的值进行 `JSON.parse`，则可以使用 JSON。

此方法也可用于存储非字符串值，例如数字和布尔值。

## API

<docgen-index>

* [`configure(...)`](#configure)
* [`get(...)`](#get)
* [`set(...)`](#set)
* [`remove(...)`](#remove)
* [`clear()`](#clear)
* [`keys()`](#keys)
* [`migrate()`](#migrate)
* [`removeOld()`](#removeold)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置存储插件。

值为 `undefined` 的选项将不会被使用。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**Since:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从存储中获取指定键的值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

在存储中为指定键设置值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从存储中移除指定键的值（如果有）。

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**Since:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除存储中的键和值。

**Since:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回存储中的已知键列表。

**Returns:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会移除旧数据，并且只有在
键尚未设置时才会写入新数据。
要在迁移后移除旧数据，请调用 removeOld()。

**Returns:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件移除带有 `_cap_` 前缀的旧数据。

**Since:** 1.1.0

--------------------


### Interfaces


#### ConfigureOptions

| Prop        | Type                | Description                                                                                                                                                                                                                                                                                                                                      | Default                       | Since |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置存储组。存储组用于组织键值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 组时，`clear()` 方法可能会删除意外的值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| Prop        | Type                        | Description                                                                                                                   | Since |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 存储中与给定键关联的值。如果之前未设置或已被移除，值将为 `null`。 | 1.0.0 |


#### GetOptions

| Prop      | Type                | Description                                   | Since |
| --------- | ------------------- | --------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从存储中检索其值的键。 | 1.0.0 |


#### SetOptions

| Prop        | Type                | Description                                               | Since |
| ----------- | ------------------- | --------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | 要与存储在存储中的值关联的键。 | 1.0.0 |
| **`value`** | <code>string</code> | 要在存储中与关联键一起设置的值。      | 1.0.0 |


#### RemoveOptions

| Prop      | Type                | Description                                 | Since |
| --------- | ------------------- | ------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从存储中移除其值的键。 | 1.0.0 |


#### KeysResult

| Prop       | Type                  | Description                | Since |
| ---------- | --------------------- | -------------------------- | ----- |
| **`keys`** | <code>string[]</code> | 存储中的已知键。 | 1.0.0 |


#### MigrateResult

| Prop           | Type                  | Description                                                                                                                   | Since |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键数组。                                                                                          | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已迁移或以其他方式存在于存储中且在 Capacitor 2 Storage 插件中有值的键数组。 | 1.0.0 |

</docgen-api>
