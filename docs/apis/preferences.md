---
title: Preferences - Capacitor 插件 API
description: Preferences API 为轻量级数据提供简单的键值持久化存储。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts
sidebar_label: 首选项
translated: true
source_hash: 5f5b5cdb
---

# @capacitor/preferences

Preferences API 为轻量级数据提供简单的键值持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此应改用此 API。当作为渐进式 Web App (PWA) 运行时，此 API 将回退到使用 `localStorage`。

此插件在 iOS 上将使用
[`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上将使用
[`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**注意：** 此 API _不_ 旨在用作本地数据库。如果您的应用存储大量数据、具有高读写负载或需要复杂查询，我们建议考虑使用基于 SQLite 的解决方案。其中一个解决方案是 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)，它是一个具有完整加密支持的基于 SQLite 的引擎。[Capacitor 社区](https://github.com/capacitor-community/) 也构建了许多其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences
npx cap sync
```

## Apple 隐私清单要求

Apple 强制要求应用开发者指定经批准的 API 使用理由，以增强用户隐私。到 2024 年 5 月 1 日，在向 App Store Connect 提交应用时，必须包含这些理由。

在您的应用中使用此特定插件时，您必须在 `/ios/App` 中创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展来生成它，并指定使用理由。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)，推荐的理由是 [CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)。**

### 示例 PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，将此 dict 条目添加到数组中 -->
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

  console.log(`你好 ${value}！`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## 使用 JSON

Preferences API 只支持字符串值。不过，您可以在调用 `set()` 之前对对象进行 `JSON.stringify`，然后对 `get()` 返回的值进行 `JSON.parse`，从而使用 JSON。

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
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置 preferences 插件。

值为 `undefined` 的选项将不会被使用。

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**始于：** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从 preferences 中获取指定键的值。

| 参数         | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

在 preferences 中为指定键设置值。

| 参数         | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**始于：** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从 preferences 中移除指定键的值（如果有）。

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**始于：** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

清除 preferences 中的所有键和值。

**始于：** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 preferences 中已知键的列表。

**返回：** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会移除旧数据，并且仅在键尚未设置时写入新数据。
要在迁移后移除旧数据，请调用 removeOld()。

**返回：** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中以 `_cap_` 前缀的旧数据。

**始于：** 1.1.0

--------------------


### 接口


#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                                                                                                              | 默认值                         | 始于 |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置 preferences 分组。preferences 分组用于组织键值对。使用值 'NativeStorage' 可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 分组时，`clear()` 方法可能会删除意外的值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| 属性        | 类型                        | 描述                                                                                                                       | 始于 |
| ----------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 与指定键关联的 preferences 值。如果之前未设置值或已移除，则 value 为 `null`。 | 1.0.0 |


#### GetOptions

| 属性      | 类型                | 描述                                       | 始于 |
| --------- | ------------------- | ------------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从 preferences 中检索其值的键。 | 1.0.0 |


#### SetOptions

| 属性        | 类型                | 描述                                                   | 始于 |
| ----------- | ------------------- | ------------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | 要与在 preferences 中设置的值关联的键。 | 1.0.0 |
| **`value`** | <code>string</code> | 要在 preferences 中与关联键一起设置的值。      | 1.0.0 |


#### RemoveOptions

| 属性      | 类型                | 描述                                     | 始于 |
| --------- | ------------------- | ----------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从 preferences 中移除其值的键。 | 1.0.0 |


#### KeysResult

| 属性       | 类型                  | 描述                    | 始于 |
| ---------- | --------------------- | ------------------------------ | ----- |
| **`keys`** | <code>string[]</code> | preferences 中的已知键。 | 1.0.0 |


#### MigrateResult

| 属性           | 类型                  | 描述                                                                                                                           | 始于 |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键数组。                                                                                                  | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已在 Capacitor 2 Preferences 插件中有值且已迁移或已存在于 preferences 中的键数组。 | 1.0.0 |

</docgen-api>
