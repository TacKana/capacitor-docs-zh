---
title: Preferences Capacitor 插件 API
description: Preferences API 为轻量级数据提供简单的键/值持久化存储。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences API 为轻量级数据提供简单的键/值持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此应改用此 API。当以渐进式网络应用（Progressive Web App）运行时，此 API 将回退到使用 `localStorage`。

此插件在 iOS 上将使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上将使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**注意**：此 API **不**旨在用作本地数据库。如果你的应用存储大量数据、具有高读写负载或需要复杂查询，我们建议考虑基于 SQLite 的解决方案。其中一个解决方案是 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)，这是一个具有完整加密支持的基于 SQLite 的引擎。[Capacitor 社区](https://github.com/capacitor-community/) 也构建了许多其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences
npx cap sync
```

## Apple 隐私清单要求

苹果现在要求应用开发者指定 API 使用的批准原因，以增强用户隐私。到 2024 年 5 月 1 日，在向 App Store Connect 提交应用时，必须包含这些原因。

当在你的应用中使用此特定插件时，你必须在 `/ios/App` 中创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展来生成它，并指定使用原因。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，必需的字典键是 [NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)，推荐的原因是 [CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)。**

### 示例 PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，请将此字典条目添加到数组中 -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## 插件使用示例

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

Preferences API 仅支持字符串值。但是，你可以在调用 `set()` 之前使用 `JSON.stringify` 处理对象，然后在从 `get()` 返回值后使用 `JSON.parse` 来使用 JSON。

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

在运行时配置 preferences 插件。

`undefined` 的选项将不会被使用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**起始版本:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

根据给定的键从 preferences 中获取值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

根据给定的键在 preferences 中设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**起始版本:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

根据给定的键从 preferences 中移除值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**起始版本:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除 preferences 中的所有键和值。

**起始版本:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 preferences 中已知键的列表。

**返回值:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，并且仅在键尚未设置时写入新数据。
要在迁移后删除旧数据，请调用 removeOld()。

**返回值:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件中移除带有 `_cap_` 前缀的旧数据。

**起始版本:** 1.1.0

--------------------


### 接口

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置 preferences 插件。

`undefined` 的选项将不会被使用。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**Since:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

根据给定的键从 preferences 中获取值。

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

根据给定的键在 preferences 中设置值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

根据给定的键从 preferences 中移除值（如果存在）。

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**Since:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除 preferences 中的所有键和值。

**Since:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 preferences 中已知键的列表。

**Returns:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，并且仅在键尚未设置时写入新数据。
要在迁移后删除旧数据，请调用 removeOld()。

**Returns:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件中移除带有 `_cap_` 前缀的旧数据。

**Since:** 1.1.0

--------------------


### 接口

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置 preferences 插件。

`undefined` 的选项将不会被使用。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**Since:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

根据给定的键从 preferences 中获取值。

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

根据给定的键在 preferences 中设置值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

根据给定的键从 preferences 中移除值（如果存在）。

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**Since:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除 preferences 中的所有键和值。

**Since:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 preferences 中已知键的列表。

**Returns:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，并且仅在键尚未设置时写入新数据。
要在迁移后删除旧数据，请调用 removeOld()。

**Returns:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件中移除带有 `_cap_` 前缀的旧数据。

**Since:** 1.1.0

--------------------


### 接口#### ConfigureOptions

| 属性         | 类型                | 描述                                                                                                                                                                                                                                                                                                                                     | 默认值                      | 起始版本 |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| **`group`**  | <code>string</code> | 设置偏好设置的分组。偏好设置分组用于组织键值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：当使用 'NativeStorage' 分组时，`clear()` 方法可能会删除意外值。                                                                          | <code>CapacitorStorage</code> | 1.0.0    |


#### GetResult

| 属性         | 类型                        | 描述                                                                                                                             | 起始版本 |
| ------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`value`**  | <code>string \| null</code> | 与给定键关联的偏好设置值。如果之前未设置值或已被移除，值将为 `null`。                                                               | 1.0.0    |


#### GetOptions

| 属性       | 类型                | 描述                                                   | 起始版本 |
| ---------- | ------------------- | ------------------------------------------------------ | -------- |
| **`key`**  | <code>string</code> | 要从偏好设置中检索值的键。                               | 1.0.0    |


#### SetOptions

| 属性         | 类型                | 描述                                                       | 起始版本 |
| ------------ | ------------------- | ---------------------------------------------------------- | -------- |
| **`key`**    | <code>string</code> | 要与偏好设置中设置的值关联的键。                             | 1.0.0    |
| **`value`**  | <code>string</code> | 要与关联键一起设置在偏好设置中的值。                         | 1.0.0    |


#### RemoveOptions

| 属性       | 类型                | 描述                                               | 起始版本 |
| ---------- | ------------------- | -------------------------------------------------- | -------- |
| **`key`**  | <code>string</code> | 要从偏好设置中移除值的键。                           | 1.0.0    |


#### KeysResult

| 属性        | 类型                  | 描述                               | 起始版本 |
| ----------- | --------------------- | ---------------------------------- | -------- |
| **`keys`**  | <code>string[]</code> | 偏好设置中已知的键列表。             | 1.0.0    |


#### MigrateResult

| 属性            | 类型                  | 描述                                                                                                                           | 起始版本 |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **`migrated`**  | <code>string[]</code> | 已迁移的键的数组。                                                                                                             | 1.0.0    |
| **`existing`**  | <code>string[]</code> | 已经迁移或已在偏好设置中存在且在 Capacitor 2 Preferences 插件中具有值的键的数组。                                                | 1.0.0    |

<span id="configureoptions"></span>
<span id="configureoptions"></span>
<span id="configureoptions"></span>
<span id="configureoptions"></span>
<span id="configureoptions"></span>
</docgen-api>