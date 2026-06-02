---
title: 文字缩放 Capacitor 插件 API
description: Text Zoom API 提供了更改 Web View 文字大小以实现视觉辅助功能的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/text-zoom/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/text-zoom/src/definitions.ts
sidebar_label: 文字缩放
translated: true
---

# @capacitor/text-zoom

Text Zoom API 提供了更改 Web View 文字大小以实现视觉辅助功能的能力。

**注意：** 除非在您的 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中将 `preferredContentMode` 配置设置为 `mobile`，否则 text-zoom 插件在 iPad 上无法工作。

```json
{
  "ios": {
    "preferredContentMode": "mobile"
  }
}
```

## 安装

```bash
npm install @capacitor/text-zoom@latest-5
npx cap sync
```

## API

<docgen-index>

* [`get()`](#get)
* [`getPreferred()`](#getpreferred)
* [`set(...)`](#set)
* [Interfaces](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### get()

```typescript
get() => Promise<GetResult>
```

获取当前的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**从版本:** 1.0.0

--------------------


### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

获取首选的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回:** <code>Promise&lt;<a href="#getpreferredresult">GetPreferredResult</a>&gt;</code>

**从版本:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置当前的缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

| 参数            | 类型                                              |
| --------------- | ------------------------------------------------- |
| **`options`**   | <code><a href="#setoptions">SetOptions</a></code> |

**从版本:** 1.0.0

--------------------


### 接口


#### GetResult

| 属性        | 类型                | 描述                            | 从版本 |
| ----------- | ------------------- | ------------------------------- | ------ |
| **`value`** | <code>number</code> | 当前的缩放级别（以小数表示）。  | 1.0.0  |


#### GetPreferredResult

| 属性        | 类型                | 描述                              | 从版本 |
| ----------- | ------------------- | --------------------------------- | ------ |
| **`value`** | <code>number</code> | 首选的缩放级别（以小数表示）。    | 1.0.0  |


#### SetOptions

| 属性        | 类型                | 描述                        | 从版本 |
| ----------- | ------------------- | --------------------------- | ------ |
| **`value`** | <code>number</code> | 新的缩放级别（以小数表示）。| 1.0.0  |

</docgen-api>
