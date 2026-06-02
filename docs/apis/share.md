---
title: Share - Capacitor 插件 API
description: Share API 提供了在用户已安装的支持分享的应用中分享内容的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: 分享
translated: true
source_hash: 39ddab3e
---

# @capacitor/share

Share API 提供了在用户已安装的支持分享的应用中分享内容的方法。

Share API 可在 iOS、Android 和 Web（使用新的 [Web Share API](https://web.dev/web-share/)）上使用，不过 Web 支持目前尚不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```
## Android

默认情况下，Capacitor 应用只允许从缓存文件夹分享文件。要使其他 Android 文件夹可分享，需要将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。请查看 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中的指定可用文件部分，了解可用的位置。

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看酷炫的东西',
  text: '你现在就必须看到的超棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '和小伙伴们分享',
});

// 仅分享文本
await Share.share({
  text: '你现在就必须看到的超棒的东西',
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

每个平台使用不同的字段集，但你应该提供所有字段。

## API

<docgen-index>

* [`canShare()`](#canshare)
* [`share(...)`](#share)
* [Interfaces](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下方文档-->

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

显示一个分享对话框，用于与其他应用分享内容

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性        | 类型                 | 描述                 | 始于   |
| ----------- | -------------------- | -------------------- | ------ |
| **`value`** | <code>boolean</code> | 是否支持分享。         | 1.1.0 |


#### ShareResult

| 属性                 | 类型                | 描述                                                                                                         | 始于   |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| **`activityType`**   | <code>string</code> | 接收分享操作的应用的标识符。某些情况下可能为空字符串。在 Web 上将为 undefined。                              | 1.0.0 |


#### ShareOptions

| 属性              | 类型                  | 描述                                                                   | 始于   |
| ----------------- | --------------------- | ---------------------------------------------------------------------- | ------ |
| **`title`**       | <code>string</code>   | 为任何消息设置标题。如果是分享到邮件，这将作为邮件主题。                | 1.0.0 |
| **`text`**        | <code>string</code>   | 设置要分享的文本                                                       | 1.0.0 |
| **`url`**         | <code>string</code>   | 设置要分享的 URL，可以是 http、https 或 file:// URL                     | 1.0.0 |
| **`files`**       | <code>string[]</code> | 要分享的文件的 file:// URL 数组。仅在 iOS 和 Android 上受支持。         | 4.1.0 |
| **`dialogTitle`** | <code>string</code>   | 设置分享对话框的标题。此选项仅在 Android 上受支持。                     | 1.0.0 |

</docgen-api>
