---
title: Preferences Capacitor Plugin API
description: Preferences API 提供了一个简单的键/值持久化存储，用于存储轻量级数据。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences API 提供了一个简单的键/值持久化存储，用于存储轻量级数据。

移动操作系统可能会定期清除在 `window.localStorage` 中设置的数据，因此应改用此 API。当以渐进式 Web 应用（Progressive Web App）运行时，此 API 将回退到使用 `localStorage`。

在 iOS 上，本插件将使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)；在 Android 上，则使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**请注意**：此 API **并非**用作本地数据库。如果你的应用需要存储大量数据、具有高读写负载或需要进行复杂查询，建议考虑基于 SQLite 的解决方案。其中一个方案是 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)，它是一个基于 SQLite 且支持完整加密的引擎。[Capacitor 社区](https://github.com/capacitor-community/) 也构建了许多其他存储引擎。

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

  console.log(`Hello ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## 处理 JSON

Preferences API 仅支持字符串值。但是，你可以在调用 `set()` 之前使用 `JSON.stringify` 处理对象，并在从 `get()` 获取值后使用 `JSON.parse` 解析，从而存储 JSON 数据。

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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置 Preferences 插件。

值为 `undefined` 的选项将不会被使用。

| 参数         | 类型                                                                  |
| ------------ | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**自：** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从 Preferences 中获取指定键的值。

| 参数         | 类型                                                      |
| ------------ | --------------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

在 Preferences 中设置指定键的值。

| 参数         | 类型                                                      |
| ------------ | --------------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自：** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从 Preferences 中移除指定键的值（如果有的话）。

| 参数         | 类型                                                            |
| ------------ | --------------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**自：** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除 Preferences 中的所有键和值。

**自：** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 Preferences 中已知的键列表。

**返回值：** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

迁移来自 Capacitor 2 Storage 插件的数据。

此操作是非破坏性的。它不会删除旧数据，并且仅在键尚未设置时写入新数据。
迁移完成后若要移除旧数据，请调用 removeOld()。

**返回值：** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

移除来自 Capacitor 2 Storage 插件的带有 `_cap_` 前缀的旧数据。

**自：** 1.1.0

--------------------


### 接口


#### ConfigureOptions

| 属性         | 类型                | 描述                                                                                                                                                                                                                                                                                                                                      | 默认值                       | 自 |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置 Preferences 分组。Preferences 分组用于组织键/值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：当使用 'NativeStorage' 分组时，`clear()` 方法可能会删除非预期的值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| 属性         | 类型                        | 描述                                                                                                                       | 自 |
| ------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 与指定键关联的 Preferences 值。如果之前未设置值或已被移除，则值为 `null`。 | 1.0.0 |

#### GetOptions

| 属性       | 类型                  | 说明                                       | 始于 |
| ---------- | --------------------- | ------------------------------------------ | ---- |
| **`key`**  | <code>string</code>   | 要从偏好设置中检索其值的键。               | 1.0.0 |


#### SetOptions

| 属性         | 类型                  | 说明                                              | 始于 |
| ------------ | --------------------- | ------------------------------------------------- | ---- |
| **`key`**    | <code>string</code>   | 在偏好设置中与被设置值相关联的键。                | 1.0.0 |
| **`value`**  | <code>string</code>   | 在偏好设置中与关联键一起设置的值。                | 1.0.0 |


#### RemoveOptions

| 属性       | 类型                  | 说明                                     | 始于 |
| ---------- | --------------------- | ---------------------------------------- | ---- |
| **`key`**  | <code>string</code>   | 要从偏好设置中移除其值的键。             | 1.0.0 |


#### KeysResult

| 属性        | 类型                    | 说明                         | 始于 |
| ----------- | ----------------------- | ---------------------------- | ---- |
| **`keys`**  | <code>string[]</code>   | 偏好设置中已知的键。         | 1.0.0 |


#### MigrateResult

| 属性             | 类型                    | 说明                                                                                                     | 始于 |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------- | ---- |
| **`migrated`**   | <code>string[]</code>   | 已迁移的键数组。                                                                                         | 1.0.0 |
| **`existing`**   | <code>string[]</code>   | 已迁移的键数组，或是在 Capacitor 2 偏好设置插件中已存在值的、位于偏好设置中的键。                        | 1.0.0 |

</docgen-api>