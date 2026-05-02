---
title: Share Capacitor 插件 API
description: Share API 提供了在用户已安装的任何支持分享功能的应用程序中分享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: Share
---

# @capacitor/share

Share API 提供了在用户已安装的任何支持分享功能的应用程序中分享内容的方法。

Share API 支持 iOS、Android 和 Web 平台（使用新的 [Web Share API](https://web.dev/web-share/)），不过目前 Web 平台的支持尚不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## Android

默认情况下，Capacitor 应用只允许分享缓存文件夹中的文件。要使其他 Android 文件夹可被分享，必须将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。请查阅 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中的“指定可用文件”部分以了解可用的位置。

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '查看酷炫内容',
  text: '你现在就需要看看这个非常棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给好友',
});
```

每个平台使用不同的字段集合，但建议您提供所有字段。

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

检查当前设备是否支持分享功能。

**返回值：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**自：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示一个分享模态框，用于将内容分享到其他应用程序。

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性          | 类型                  | 描述                           | 自     |
| ------------- | --------------------- | ------------------------------ | ------ |
| **`value`**   | <code>boolean</code>  | 指示当前设备是否支持分享功能。 | 1.1.0  |


#### ShareResult

| 属性                 | 类型                | 描述                                                                                                      | 自     |
| -------------------- | ------------------- | --------------------------------------------------------------------------------------------------------- | ------ |
| **`activityType`**   | <code>string</code> | 接收分享操作的应用标识符。在某些情况下可能为空字符串。在 Web 平台上此值为 undefined。                       | 1.0.0  |


#### ShareOptions

| 属性                 | 类型                  | 描述                                                                                     | 自     |
| -------------------- | --------------------- | ---------------------------------------------------------------------------------------- | ------ |
| **`title`**          | <code>string</code>   | 设置消息的标题。如果是分享到电子邮件，这将作为邮件主题                                     | 1.0.0  |
| **`text`**           | <code>string</code>   | 设置要分享的文本内容                                                                     | 1.0.0  |
| **`url`**            | <code>string</code>   | 设置要分享的 URL，可以是 http、https 或 file:// 协议的 URL                                 | 1.0.0  |
| **`files`**          | <code>string[]</code> | 要分享的文件 URL 数组，仅支持 file:// 协议。目前仅支持 iOS 和 Android 平台。               | 4.1.0  |
| **`dialogTitle`**    | <code>string</code>   | 设置分享模态框的标题。此选项仅在 Android 平台上支持。                                      | 1.0.0  |

</docgen-api>