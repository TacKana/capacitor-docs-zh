---
title: Preferences Capacitor Plugin API
description: Preferences API 为轻量级数据提供了简单的键值对持久化存储方案。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts
sidebar_label: Preferences
---

# @capacitor/preferences

Preferences API 为轻量级数据提供了简单的键值对持久化存储方案。

由于移动操作系统可能会定期清除 `window.localStorage` 中存储的数据，因此应该使用本 API 替代。当作为渐进式 Web 应用运行时，本 API 会自动回退到使用 `localStorage`。

在 iOS 平台上，本插件使用 [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)；
在 Android 平台上则使用 [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。如果应用被卸载，存储的数据将被清除。

**注意**：该 API _不_ 适合作为本地数据库使用。如果你的应用需要存储大量数据、有高频读写需求或需要复杂查询功能，我们建议考虑基于 SQLite 的解决方案，例如支持全加密的 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)。[Capacitor 社区](https://github.com/capacitor-community/) 也开发了多种其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences
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

Preferences API 仅支持字符串类型的值。不过你可以先将对象通过 `JSON.stringify` 处理后再调用 `set()` 方法存储，获取时使用 `JSON.parse` 解析返回值。

这种方法也可以用来存储非字符串类型的值，比如数字和布尔值。

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

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

运行时配置 preferences 插件。

值为 `undefined` 的选项不会被使用。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**起始版本：** 1.0.0

---

### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

根据指定键获取 preferences 中的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**起始版本：** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

为指定键设置 preferences 中的值。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**起始版本：** 1.0.0

---

### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

移除指定键在 preferences 中的值（如果存在）。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**起始版本：** 1.0.0

---

### clear()

```typescript
clear() => Promise<void>
```

清空 preferences 中的所有键值。

**起始版本：** 1.0.0

---

### keys()

```typescript
keys() => Promise<KeysResult>
```

返回 preferences 中所有已知键的列表。

**返回值：** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**起始版本：** 1.0.0

---

### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。不会删除旧数据，并且只有当键尚未设置时才会写入新数据。
如需在迁移后移除旧数据，请调用 removeOld()。

**返回值：** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**起始版本：** 1.0.0

---

### removeOld()

```typescript
removeOld() => Promise<void>
```

移除 Capacitor 2 Storage 插件中带有 `_cap_` 前缀的旧数据。

**起始版本：** 1.1.0

---

### Interfaces

#### ConfigureOptions

| 属性        | 类型                | 描述                                                                                                                                                                                                                                                        | 默认值                        | 起始版本 |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| **`group`** | <code>string</code> | 设置 preferences 分组。分组用于组织键值对。使用 'NativeStorage' 值可提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 分组时，`clear()` 方法可能会意外删除数据。 | <code>CapacitorStorage</code> | 1.0.0    |

#### GetResult

| 属性        | 类型                        | 描述                                                                        | 起始版本 |
| ----------- | --------------------------- | --------------------------------------------------------------------------- | -------- |
| **`value`** | <code>string \| null</code> | preferences 中与给定键关联的值。如果该键未被设置或已被移除，则返回 `null`。 | 1.0.0    |

#### GetOptions

| 属性      | 类型                | 描述                 | 起始版本 |
| --------- | ------------------- | -------------------- | -------- |
| **`key`** | <code>string</code> | 要从中检索值的键名。 | 1.0.0    |

#### SetOptions

| 属性        | 类型                | 描述                           | 起始版本 |
| ----------- | ------------------- | ------------------------------ | -------- |
| **`key`**   | <code>string</code> | preferences 中要关联值的键名。 | 1.0.0    |
| **`value`** | <code>string</code> | 要存储的字符串值。             | 1.0.0    |

#### RemoveOptions

| 属性      | 类型                | 描述                            | 起始版本 |
| --------- | ------------------- | ------------------------------- | -------- |
| **`key`** | <code>string</code> | 要从 preferences 中移除的键名。 | 1.0.0    |

#### KeysResult

| 属性       | 类型                  | 描述                         | 起始版本 |
| ---------- | --------------------- | ---------------------------- | -------- |
| **`keys`** | <code>string[]</code> | preferences 中所有已知键名。 | 1.0.0    |

#### MigrateResult

| 属性           | 类型                  | 描述                                                        | 起始版本 |
| -------------- | --------------------- | ----------------------------------------------------------- | -------- |
| **`migrated`** | <code>string[]</code> | 已迁移的键名数组。                                          | 1.0.0    |
| **`existing`** | <code>string[]</code> | 已存在或已在 Capacitor 2 Preferences 插件中有值的键名数组。 | 1.0.0    |

</docgen-api>
