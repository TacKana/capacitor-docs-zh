---
title: Text Zoom Capacitor 插件 API
description: Text Zoom API 提供了更改 Web View 文字大小以实现视觉无障碍的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts
sidebar_label: Text Zoom
translated: true
---

# @capacitor/text-zoom

Text Zoom API 提供了更改 Web View 文字大小以实现视觉无障碍的能力。

## 安装

```bash
npm install @capacitor/text-zoom
npx cap sync
```

## API

<docgen-index>

* [`get()`](#get)
* [`getPreferred()`](#getpreferred)
* [`set(...)`](#set)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### get()

```typescript
get() => Promise<GetResult>
```

获取当前缩放级别。

缩放级别表示为小数（例如 1.2 表示 120%）。

**Returns:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

获取首选缩放级别。

缩放级别表示为小数（例如 1.2 表示 120%）。

**Returns:** <code>Promise&lt;<a href="#getpreferredresult">GetPreferredResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置当前缩放级别。

缩放级别表示为小数（例如 1.2 表示 120%）。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### GetResult

| Prop        | Type                | Description                                        | Since |
| ----------- | ------------------- | -------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 当前缩放级别（表示为小数）。 | 1.0.0 |


#### GetPreferredResult

| Prop        | Type                | Description                                          | Since |
| ----------- | ------------------- | ---------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 首选缩放级别（表示为小数）。 | 1.0.0 |


#### SetOptions

| Prop        | Type                | Description                                    | Since |
| ----------- | ------------------- | ---------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 新的缩放级别（表示为小数）。 | 1.0.0 |

</docgen-api>
