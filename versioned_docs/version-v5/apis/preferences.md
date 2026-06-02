---
title: Preferences - Capacitor 偏好设置插件 API
description: Preferences API 为轻量级数据提供简单的键/值持久化存储。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/src/definitions.ts
sidebar_label: Preferences 偏好设置
translated: true
---

# @capacitor/preferences

Preferences API 为轻量级数据提供简单的键/值持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此
应改用此 API。当作为渐进式 Web 应用运行时，此 API 将回退到使用 `localStorage`。

此插件将在 iOS 上使用
[`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，
在 Android 上使用
[`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。
如果应用被卸载，存储的数据将被清除。

**注意**：此 API _不_ 旨在用作本地数据库。如果你的应用
存储大量数据、具有高读写负载或需要复杂查询，
我们建议考虑使用基于 SQLite 的解决方案。一个这样的解决方案是 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)，一个具有完整加密支持的基于 SQLite 的引擎。[Capacitor Community](https://github.com/capacitor-community/) 还构建了许多其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences@latest-5
npx cap sync
```

## 示例

```typescript
import { Preferences } from '@capacitor/preferences';

const setName = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Preferences.get({ key: 'name' });

  console.log(`你好 ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## 使用 JSON

Preferences API 只支持字符串值。但是，你可以使用 JSON，方法是在调用 `set()` 之前对对象进行 `JSON.stringify`，然后对 `get()` 返回的值进行 `JSON.parse`。

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
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置偏好设置插件。

值为 `undefined` 的选项将不会被使用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**自从:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从偏好设置中获取指定键的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

在偏好设置中为指定键设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自从:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从偏好设置中移除指定键的值（如果有）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**自从:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除偏好设置中的键和值。

**自从:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回偏好设置中已知键的列表。

**返回:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，并且只会在键尚未设置时
写入新数据。
要在迁移后删除旧数据，请调用 removeOld()。

**返回:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件中删除带有 `_cap_` 前缀的旧数据。

**自从:** 1.1.0

--------------------


### 接口


#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                                                                                                              | 默认值                       | 自从 |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置偏好设置组。偏好设置组用于组织键/值对。使用值 'NativeStorage' 提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 组时，`clear()` 方法可能会删除意外值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| 属性        | 类型                        | 描述                                                                                                                       | 自从 |
| ----------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 与给定键关联的偏好设置值。如果以前未设置值或已移除，则 value 将为 `null`。 | 1.0.0 |


#### GetOptions

| 属性      | 类型                | 描述                                       | 自从 |
| --------- | ------------------- | ------------------------------------------ | ----- |
| **`key`** | <code>string</code> | 要从偏好设置中检索其值的键。 | 1.0.0 |


#### SetOptions

| 属性        | 类型                | 描述                                                   | 自从 |
| ----------- | ------------------- | ------------------------------------------------------ | ----- |
| **`key`**   | <code>string</code> | 要与在偏好设置中设置的值关联的键。 | 1.0.0 |
| **`value`** | <code>string</code> | 要在偏好设置中与关联键一起设置的值。      | 1.0.0 |


#### RemoveOptions

| 属性      | 类型                | 描述                                     | 自从 |
| --------- | ------------------- | ---------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从偏好设置中移除其值的键。 | 1.0.0 |


#### KeysResult

| 属性       | 类型                  | 描述                    | 自从 |
| ---------- | --------------------- | ----------------------- | ----- |
| **`keys`** | <code>string[]</code> | 偏好设置中的已知键。 | 1.0.0 |


#### MigrateResult

| 属性           | 类型                  | 描述                                                                                                                           | 自从 |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键数组。                                                                                                  | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已在 Capacitor 2 Preferences 插件中拥有值，且已经迁移或已存在于偏好设置中的键数组。 | 1.0.0 |

</docgen-api>
