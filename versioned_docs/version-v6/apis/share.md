---
title: Share（分享）Capacitor 插件 API
description: 分享 API 提供了在用户已安装的任何支持分享的应用中共享内容的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/share/src/definitions.ts
sidebar_label: 分享
translated: true
---

# @capacitor/share

分享 API 提供了在用户已安装的任何支持分享的应用中共享内容的方法。

分享 API 适用于 iOS、Android 和 Web（使用新的 [Web Share API](https://web.dev/web-share/)），但 Web 的支持目前还不完善。

## 安装

```bash
npm install @capacitor/share@latest-6
npx cap sync
```
## Android

默认情况下，Capacitor 应用只允许从缓存文件夹分享文件。要使其他 Android 文件夹也可分享，需要将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。请查阅 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider)中的"指定可用文件"部分了解可用的位置。

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看有趣的东西',
  text: '你现在必须看的非常棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '与朋友分享',
});

// 仅分享文本
await Share.share({
  text: '你现在必须看的非常棒的东西',
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
* [接口](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### canShare()

```typescript
canShare() => Promise<CanShareResult>
```

检查是否支持分享。

**返回：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**自：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示分享模态框以与其他应用共享内容。

| 参数        | 类型                                                  |
| ----------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性     | 类型                 | 描述                     | 自     |
| -------- | -------------------- | ------------------------ | ------ |
| **`value`** | <code>boolean</code> | 是否支持分享。           | 1.1.0 |


#### ShareResult

| 属性                | 类型                | 描述                                                                                               | 自     |
| ------------------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| **`activityType`**    | <code>string</code> | 接收分享操作的应用的标识符。某些情况下可能为空字符串。在 Web 上将为 undefined。                     | 1.0.0 |


#### ShareOptions

| 属性             | 类型                  | 描述                                                        | 自     |
| ---------------- | --------------------- | ----------------------------------------------------------- | ------ |
| **`title`**        | <code>string</code>   | 设置任何消息的标题。如果分享到邮件，这将作为主题。          | 1.0.0 |
| **`text`**         | <code>string</code>   | 设置要分享的文本。                                          | 1.0.0 |
| **`url`**          | <code>string</code>   | 设置要分享的 URL，可以是 http、https 或 file:// URL。       | 1.0.0 |
| **`files`**        | <code>string[]</code> | 要分享的文件的 file:// URL 数组。仅在 iOS 和 Android 上受支持。 | 4.1.0 |
| **`dialogTitle`**  | <code>string</code>   | 设置分享模态框的标题。此选项仅在 Android 上受支持。         | 1.0.0 |

</docgen-api>
