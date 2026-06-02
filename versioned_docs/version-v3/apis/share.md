---
title: Share Capacitor 插件 API
description: Share API 提供了在用户可能已安装的任何支持分享的应用中分享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: Share
translated: true
---

# @capacitor/share

Share API 提供了在用户可能已安装的任何支持分享的应用中分享内容的方法。

Share API 适用于 iOS、Android 和 Web（使用新的 [Web Share
API](https://web.dev/web-share/)），不过 Web 支持目前尚不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: 'See cool stuff',
  text: 'Really awesome thing you need to see right meow',
  url: 'http://ionicframework.com/',
  dialogTitle: 'Share with buddies',
});
```

每个平台使用不同的字段集，但您应该提供所有字段。

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

检查是否支持分享。

**返回：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**始于：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示分享模态框，与其他应用分享内容

| 参数 | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性 | Type                 | 描述 | 始于 |
| ----------- | -------------------- | ------------------------------------ | ----- |
| **`value`** | <code>boolean</code> | 是否支持分享。 | 1.1.0 |


#### ShareResult

| 属性 | Type                | 描述 | 始于 |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`activityType`** | <code>string</code> | 接收分享操作的应用的标识符。某些情况下可能为空字符串。在 Web 上将是 undefined。 | 1.0.0 |


#### ShareOptions

| 属性 | Type                | 描述 | 始于 |
| ----------------- | ------------------- | -------------------------------------------------------------------------- | ----- |
| **`title`**       | <code>string</code> | 为任何消息设置标题。如果是分享到邮件，这将是主题。 | 1.0.0 |
| **`text`**        | <code>string</code> | 设置要分享的文本                                                     | 1.0.0 |
| **`url`**         | <code>string</code> | 设置要分享的 URL，可以是 http、https 或 file:// URL                      | 1.0.0 |
| **`dialogTitle`** | <code>string</code> | 设置分享模态框的标题。此选项仅在 Android 上受支持。 | 1.0.0 |

</docgen-api>
