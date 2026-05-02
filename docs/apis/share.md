---
title: Share Capacitor Plugin API
description: Share API 提供了在用户可能已安装的任何支持分享功能的应用程序中分享内容的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: Share
---

# @capacitor/share

Share API 提供了在用户可能已安装的任何支持分享功能的应用程序中分享内容的方法。

Share API 支持 iOS、Android 和 Web（使用新的 [Web Share API](https://web.dev/web-share/)），不过目前 Web 端的支持情况参差不齐。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## Android

默认情况下，Capacitor 应用只允许分享来自缓存文件夹的文件。要使其他 Android 文件夹可分享，必须将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。关于可用位置，请查阅 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中的 "指定可用文件" 部分。

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看看这个酷东西',
  text: '你现在绝对需要看看这个超棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给好友',
});

// 仅分享文本
await Share.share({
  text: '你现在绝对需要看看这个超棒的东西',
});

// 仅分享 URL
await Share.share({
  url: 'http://ionicframework.com/',
});

// 使用 url 参数分享本地文件
const photo = await Camera.getPhoto(options);
await Share.share({
  url: photo.path,
});

// 使用 files 参数分享多个文件
const { photos } = await Camera.pickImages(options);
await Share.share({
  files: photos.map(photo => photo.path!),
});
```

每个平台使用不同的字段集，但建议您提供所有字段。

## API

<docgen-index>

* [`canShare()`](#canshare)
* [`share(...)`](#share)
* [接口](#接口)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canShare()

```typescript
canShare() => Promise<CanShareResult>
```

检查分享功能是否受支持。

**返回值：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**始于：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示分享模态框，用于与其他应用分享内容。

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性          | 类型                  | 描述                           | 始于 |
| ------------- | --------------------- | ------------------------------ | ---- |
| **`value`**   | <code>boolean</code>  | 分享功能是否受支持。           | 1.1.0 |


#### ShareResult

| 属性                 | 类型                  | 描述                                                                                                             | 始于 |
| -------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | ---- |
| **`activityType`**   | <code>string</code>   | 接收分享操作的应用标识符。在某些情况下可能为空字符串。在 Web 端将是 undefined。                                   | 1.0.0 |


#### ShareOptions

| 属性                | 类型                    | 描述                                                                          | 始于 |
| ------------------- | ----------------------- | ----------------------------------------------------------------------------- | ---- |
| **`title`**         | <code>string</code>     | 设置消息的标题。如果分享到邮件，这将作为邮件主题                               | 1.0.0 |
| **`text`**          | <code>string</code>     | 设置要分享的文本                                                              | 1.0.0 |
| **`url`**           | <code>string</code>     | 设置要分享的 URL，可以是 http、https 或 file:// 协议的 URL                     | 1.0.0 |
| **`files`**         | <code>string[]</code>   | 要分享的文件 file:// URL 数组。仅支持 iOS 和 Android。                         | 4.1.0 |
| **`dialogTitle`**   | <code>string</code>     | 设置分享模态框的标题。此选项仅在 Android 上受支持。                            | 1.0.0 |

</docgen-api>