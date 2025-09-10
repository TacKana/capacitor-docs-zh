---
title: Preferences Capacitor 插件 API
description: Preferences API 为轻量级数据提供了简单的键值对持久化存储方案。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences API 为轻量级数据提供了简单的键值对持久化存储方案。

由于移动操作系统可能会定期清除 `window.localStorage` 中存储的数据，因此应改用此 API。当以渐进式 Web 应用（PWA）形式运行时，该 API 会自动回退到使用 `localStorage`。

本插件在 iOS 上使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**注意**：此 API _不_ 适合用作本地数据库。如果您的应用需要存储大量数据、高频读写或复杂查询，建议考虑基于 SQLite 的解决方案，例如支持全加密的 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)。[Capacitor Community](https://github.com/capacitor-community/) 也提供了多种其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences
npx cap sync
```

## 苹果隐私清单要求

苹果现在要求开发者声明 API 的使用理由以增强用户隐私保护。从 2024 年 5 月 1 日起，提交应用到 App Store Connect 时必须包含这些声明。

使用本插件时，您需要在 `/ios/App` 目录下创建 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展自动生成，并指定使用理由。

详细操作步骤请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**本插件需要使用 [NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401) 字典键，推荐声明理由为 [CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)。**

### 隐私清单示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果隐私清单文件已存在，请将此字典项添加到数组中 -->
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

  console.log(`你好 ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## 处理 JSON 数据

Preferences API 仅支持字符串值。但您可以通过 `JSON.stringify` 将对象转换为字符串后再调用 `set()` 方法存储，获取时使用 `JSON.parse` 解析返回值。

此方法也可用于存储非字符串值（如数字和布尔值）。

## API

<docgen-index>

- [`configure(...)`](#configure)
- [`get(...)`](#get)
- [`set(...)`](#set)
- [`remove(...)`](#remove)
- [`clear()`](#clear)
- [`keys()`](#keys)
- [`migrate()`](#migrate)
- [`removeOld()`](#removeold)
- [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

运行时配置 Preferences 插件。

值为 `undefined` 的选项将被忽略。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**自版本：** 1.0.0

---

### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

获取指定键对应的偏好设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自版本：** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置指定键对应的偏好设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自版本：** 1.0.0

---

### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

移除指定键对应的偏好设置值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**自版本：** 1.0.0

---

### clear()

```typescript
clear() => Promise<void>
```

清除所有偏好设置键值。

**自版本：** 1.0.0

---

### keys()

```typescript
keys() => Promise<KeysResult>
```

返回已知的偏好设置键名列表。

**返回值：** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**自版本：** 1.0.0

---

### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作不会破坏原有数据，只有当键名未被设置时才会写入新数据。
迁移完成后可调用 removeOld() 清除旧数据。

**返回值：** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**自版本：** 1.0.0

---

### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中带有 `_cap_` 前缀的旧数据。

**自版本：** 1.1.0

---

### Interfaces

#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                 | 默认值                        | 版本  |
| ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置偏好设置分组。分组用于组织键值对。使用 'NativeStorage' 可保持与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的兼容性。警告：使用 'NativeStorage' 分组时，`clear()` 方法可能会意外删除其他数据。 | <code>CapacitorStorage</code> | 1.0.0 |

#### GetResult

| 属性        | 类型                        | 描述                                                                | 版本  |
| ----------- | --------------------------- | ------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 获取到的偏好设置值。如果该键之前未被设置或已被移除，则返回 `null`。 | 1.0.0 |

#### GetOptions

| 属性      | 类型                | 描述                   | 版本  |
| --------- | ------------------- | ---------------------- | ----- |
| **`key`** | <code>string</code> | 要获取的偏好设置键名。 | 1.0.0 |

#### SetOptions

| 属性        | 类型                | 描述                   | 版本  |
| ----------- | ------------------- | ---------------------- | ----- |
| **`key`**   | <code>string</code> | 要设置的偏好设置键名。 | 1.0.0 |
| **`value`** | <code>string</code> | 要设置的偏好设置值。   | 1.0.0 |

#### RemoveOptions

| 属性      | 类型                | 描述                   | 版本  |
| --------- | ------------------- | ---------------------- | ----- |
| **`key`** | <code>string</code> | 要移除的偏好设置键名。 | 1.0.0 |

#### KeysResult

| 属性       | 类型                  | 描述                     | 版本  |
| ---------- | --------------------- | ------------------------ | ----- |
| **`keys`** | <code>string[]</code> | 已知的偏好设置键名列表。 | 1.0.0 |

#### MigrateResult

| 属性           | 类型                  | 描述                                                                        | 版本  |
| -------------- | --------------------- | --------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键名数组。                                                          | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已存在迁移数据的键名数组（这些键在 Capacitor 2 Preferences 插件中已有值）。 | 1.0.0 |

</docgen-api>
