---
title: Preferences Capacitor Plugin API
description: Preferences API 为轻量级数据提供了简单的键/值持久化存储方案。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences API 为轻量级数据提供了简单的键/值持久化存储方案。

由于移动操作系统可能会定期清除 `window.localStorage` 中的数据，因此推荐使用本 API。在渐进式 Web 应用（PWA）模式下运行时，本 API 会自动回退到使用 `localStorage`。

该插件在 iOS 上使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)，在 Android 上使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。当应用被卸载时，存储的数据会被清除。

**注意**：本 API _不_ 适合作为本地数据库使用。如果您的应用需要存储大量数据、高频读写或复杂查询，建议考虑基于 SQLite 的解决方案，例如支持全加密的 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)。[Capacitor 社区](https://github.com/capacitor-community/) 也提供了多种其他存储引擎。

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

## 处理 JSON 数据

Preferences API 仅支持字符串值。但您可以通过 `JSON.stringify` 将对象转换为字符串后调用 `set()`，再通过 `JSON.parse` 解析 `get()` 返回值的方式来存储 JSON 数据。

此方法也可用于存储非字符串值，例如数字和布尔值。

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

值为 `undefined` 的选项将不会被使用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**自版本:** 1.0.0

---

### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

获取指定键对应的偏好设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自版本:** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置指定键对应的偏好设置值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自版本:** 1.0.0

---

### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

移除指定键对应的偏好设置值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**自版本:** 1.0.0

---

### clear()

```typescript
clear() => Promise<void>
```

清除所有偏好设置键值对。

**自版本:** 1.0.0

---

### keys()

```typescript
keys() => Promise<KeysResult>
```

返回已知的所有偏好设置键名列表。

**返回值:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**自版本:** 1.0.0

---

### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的，不会删除旧数据，仅当键名未被设置时才写入新数据。
迁移完成后如需删除旧数据，请调用 removeOld()。

**返回值:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**自版本:** 1.0.0

---

### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中以 `_cap_` 为前缀的旧数据。

**自版本:** 1.1.0

---

### Interfaces

#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                   | 默认值                        | 自版本 |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------ |
| **`group`** | <code>string</code> | 设置偏好设置分组。分组用于组织键值对。使用值 'NativeStorage' 可保持与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的兼容性。警告：当使用 'NativeStorage' 分组时，`clear()` 方法可能会意外删除某些值。 | <code>CapacitorStorage</code> | 1.0.0  |

#### GetResult

| 属性        | 类型                        | 描述                                                                    | 自版本 |
| ----------- | --------------------------- | ----------------------------------------------------------------------- | ------ |
| **`value`** | <code>string \| null</code> | 与给定键关联的偏好设置值。如果该键从未被设置或已被移除，则返回 `null`。 | 1.0.0  |

#### GetOptions

| 属性      | 类型                | 描述                   | 自版本 |
| --------- | ------------------- | ---------------------- | ------ |
| **`key`** | <code>string</code> | 要检索的偏好设置键名。 | 1.0.0  |

#### SetOptions

| 属性        | 类型                | 描述                       | 自版本 |
| ----------- | ------------------- | -------------------------- | ------ |
| **`key`**   | <code>string</code> | 要设置的偏好设置键名。     | 1.0.0  |
| **`value`** | <code>string</code> | 要与键名关联的偏好设置值。 | 1.0.0  |

#### RemoveOptions

| 属性      | 类型                | 描述                       | 自版本 |
| --------- | ------------------- | -------------------------- | ------ |
| **`key`** | <code>string</code> | 要从偏好设置中移除的键名。 | 1.0.0  |

#### KeysResult

| 属性       | 类型                  | 描述                     | 自版本 |
| ---------- | --------------------- | ------------------------ | ------ |
| **`keys`** | <code>string[]</code> | 已知的所有偏好设置键名。 | 1.0.0  |

#### MigrateResult

| 属性           | 类型                  | 描述                                                        | 自版本 |
| -------------- | --------------------- | ----------------------------------------------------------- | ------ |
| **`migrated`** | <code>string[]</code> | 已迁移的键名数组。                                          | 1.0.0  |
| **`existing`** | <code>string[]</code> | 已存在或已在 Capacitor 2 Preferences 插件中有值的键名数组。 | 1.0.0  |

</docgen-api>
