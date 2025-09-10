---
title: Text Zoom Capacitor Plugin API
description: Text Zoom API 提供了改变 Web 视图文本大小的功能，以增强视觉可访问性。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts
sidebar_label: Text Zoom
---

# @capacitor/text-zoom

Text Zoom API 提供了改变 Web 视图文本大小的功能，以增强视觉可访问性。

## 安装

```bash
npm install @capacitor/text-zoom
npx cap sync
```

## API

<docgen-index>

- [`get()`](#get)
- [`getPreferred()`](#getpreferred)
- [`set(...)`](#set)
- [接口](#interfaces)

</docgen-index>

<docgen-api>

### get()

```typescript
get() => Promise<GetResult>
```

获取当前的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回值：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自版本：** 1.0.0

---

### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

获取首选的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回值：** <code>Promise&lt;<a href="#getpreferredresult">GetPreferredResult</a>&gt;</code>

**自版本：** 1.0.0

---

### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置当前的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

| 参数          | 类型                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自版本：** 1.0.0

---

### Interfaces

#### GetResult

| 属性        | 类型                | 描述                           | 自版本 |
| ----------- | ------------------- | ------------------------------ | ------ |
| **`value`** | <code>number</code> | 当前的缩放级别（以小数表示）。 | 1.0.0  |

#### GetPreferredResult

| 属性        | 类型                | 描述                           | 自版本 |
| ----------- | ------------------- | ------------------------------ | ------ |
| **`value`** | <code>number</code> | 首选的缩放级别（以小数表示）。 | 1.0.0  |

#### SetOptions

| 属性        | 类型                | 描述                         | 自版本 |
| ----------- | ------------------- | ---------------------------- | ------ |
| **`value`** | <code>number</code> | 新的缩放级别（以小数表示）。 | 1.0.0  |

</docgen-api>
