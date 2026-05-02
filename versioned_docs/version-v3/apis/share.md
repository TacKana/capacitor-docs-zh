---
title: 分享 Capacitor 插件 API
description: 分享 API 提供了在用户已安装的支持分享功能的应用中分享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: 分享
---

# @capacitor/share

分享 API 提供了在用户已安装的支持分享功能的应用中分享内容的方法。

该 API 支持 iOS、Android 和 Web 平台（使用新的 [Web 分享
API](https://web.dev/web-share/)），不过目前 Web 平台的支持尚不全面。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看看这个很酷的东西',
  text: '你真的需要立刻看看这个超赞的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给朋友们',
});
```

每个平台使用的字段集略有不同，但建议您提供所有字段。

## API

<docgen-index>

* [`canShare()`](#canshare)
* [`share(...)`](#share)
* [接口](#接口)

</docgen-index>

<docgen-api>


### canShare()

```typescript
canShare() => Promise<CanShareResult>
```

检查当前是否支持分享功能。

**返回值：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**自版本：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示一个分享模态框，用于与其他应用分享内容。

| 参数            | 类型                                                      |
| --------------- | --------------------------------------------------------- |
| **`options`**   | <code><a href="#shareoptions">ShareOptions</a></code>     |

**返回值：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性           | 类型                  | 描述                       | 自版本 |
| -------------- | --------------------- | -------------------------- | ------ |
| **`value`**    | <code>boolean</code>  | 指示是否支持分享功能。     | 1.1.0  |


#### ShareResult

| 属性                  | 类型                | 描述                                                                                               | 自版本 |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| **`activityType`**    | <code>string</code> | 接收分享操作的应用标识符。在某些情况下可能为空字符串。在 Web 平台上此属性为 undefined。            | 1.0.0  |


#### ShareOptions

| 属性                | 类型                | 描述                                                                | 自版本 |
| ------------------- | ------------------- | ------------------------------------------------------------------- | ------ |
| **`title`**         | <code>string</code> | 设置消息的标题。如果分享到电子邮件，此标题将作为邮件主题。          | 1.0.0  |
| **`text`**          | <code>string</code> | 设置要分享的文本内容。                                              | 1.0.0  |
| **`url`**           | <code>string</code> | 设置要分享的 URL，可以是 http、https 或 file:// 协议的 URL。        | 1.0.0  |
| **`dialogTitle`**   | <code>string</code> | 设置分享模态框的标题。此选项仅在 Android 平台上支持。               | 1.0.0  |

</docgen-api>