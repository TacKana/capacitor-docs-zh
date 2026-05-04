---
title: Storage Capacitor Plugin API
description: Storage API 为轻量级数据提供简单的键值对持久化存储。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/storage/src/definitions.ts
sidebar_label: Storage
---

# @capacitor/storage

Storage API 为轻量级数据提供简单的键值对持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此应改用此 API。当应用以渐进式 Web 应用（Progressive Web App）运行时，此 API 将回退到使用 `localStorage`。

该插件在 iOS 上使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**注意**：此 API **不**适合用作本地数据库。如果你的应用需要存储大量数据、具有高读写负载或需要复杂查询，建议考虑基于 SQLite 的解决方案。其中一个方案是 [Ionic Secure Storage](https://ionic.io/docs/v3/secure-storage)，这是一个具有完整加密支持的基于 SQLite 的引擎。[Capacitor 社区](https://github.com/capacitor-community/) 也构建了许多其他存储引擎。

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

## 处理 JSON 数据

Storage API 仅支持字符串值。但是，你可以在调用 `set()` 之前使用 `JSON.stringify` 处理对象，并在从 `get()` 返回值后使用 `JSON.parse`，这样就可以存储 JSON 数据。

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
* [接口](#接口)

</docgen-index>

<docgen-api>


### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置存储插件。

值为 `undefined` 的选项将不会被使用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**自：** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从存储中获取指定键的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

在存储中设置指定键的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自：** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从存储中移除指定键的值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**自：** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除存储中的所有键值对。

**自：** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回存储中已知键的列表。

**返回：** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，并且仅在键尚未设置时写入新数据。
迁移完成后，若要删除旧数据，请调用 removeOld()。

**返回：** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中带有 `_cap_` 前缀的旧数据。

**自：** 1.1.0

--------------------


### 接口


#### ConfigureOptions

| 属性          | 类型                | 描述                                                                                                                                                                                                                                                                                                                                           | 默认值                       | 开始版本 |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置存储组。存储组用于组织键值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 组时，`clear()` 方法可能会删除非预期的值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| 属性          | 类型                        | 描述                                                                                                                               | 开始版本 |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 存储中与给定键关联的值。如果之前未设置值或值已被移除，则 `value` 将为 `null`。 | 1.0.0 |


#### GetOptions

| 属性      | 类型                | 描述                                   | 开始版本 |
| --------- | ------------------- | --------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从存储中检索值的键。 | 1.0.0 |

#### SetOptions

| 属性          | 类型                  | 说明                                           | 始于 |
| ------------- | --------------------- | ---------------------------------------------- | ---- |
| **`key`**     | <code>string</code>   | 与要存储在存储中的值关联的键。                 | 1.0.0 |
| **`value`**   | <code>string</code>   | 要使用关联键存储在存储中的值。                 | 1.0.0 |


#### RemoveOptions

| 属性          | 类型                  | 说明                               | 始于 |
| ------------- | --------------------- | ---------------------------------- | ---- |
| **`key`**     | <code>string</code>   | 要从存储中移除其值的键。           | 1.0.0 |


#### KeysResult

| 属性          | 类型                    | 说明                 | 始于 |
| ------------- | ----------------------- | -------------------- | ---- |
| **`keys`**    | <code>string[]</code>   | 存储中已知的键。     | 1.0.0 |


#### MigrateResult

| 属性            | 类型                    | 说明                                                                                                 | 始于 |
| --------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- | ---- |
| **`migrated`**  | <code>string[]</code>   | 已迁移的键的数组。                                                                                   | 1.0.0 |
| **`existing`**  | <code>string[]</code>   | 已迁移或已在存储中存在且在 Capacitor 2 Storage 插件中拥有值的键的数组。                               | 1.0.0 |

</docgen-api>