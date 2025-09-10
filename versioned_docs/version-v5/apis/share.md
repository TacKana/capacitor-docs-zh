---
title: Share Capacitor 插件 API
description: Share API 提供了与用户设备上支持分享功能的应用程序共享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/share/src/definitions.ts
sidebar_label: 内容分享
---

# @capacitor/share

Share API 提供了与用户设备上支持分享功能的应用程序共享内容的方法。

该 API 支持 iOS、Android 和 Web 平台（使用最新的 [Web Share API](https://web.dev/web-share/)），不过目前 Web 平台的支持还不够完善。

## 安装

```bash
npm install @capacitor/share@latest-5
npx cap sync
```

## Android 配置

默认情况下，Capacitor 应用仅允许分享缓存文件夹中的文件。如需分享其他 Android 文件夹中的内容，需要将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。具体可用的存储位置请参考 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中的 Specifying Available Files 章节。

## 示例代码

```typescript
import { Share } from '@capacitor/share';

// 分享多种内容
await Share.share({
  title: '看看这个好东西',
  text: '你绝对不想错过的超棒内容',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给好友',
});

// 仅分享文本
await Share.share({
  text: '你绝对不想错过的超棒内容',
});

// 仅分享网址
await Share.share({
  url: 'http://ionicframework.com/',
});

// 分享本地文件（通过url参数）
const photo = await Camera.getPhoto(options);
await Share.share({
  url: photo.path,
});

// 分享多个文件（通过files参数）
const { photos } = await Camera.pickImages(options);
await Share.share({
  files: photos.map(photo => photo.path!),
});
```

不同平台支持的分享字段可能有所不同，但建议提供所有可选字段以获得最佳兼容性。

## API 文档

<docgen-index>

* [`canShare()`](#canshare)
* [`share(...)`](#share)
* [接口定义](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canShare()

```typescript
canShare() => Promise<CanShareResult>
```

检查当前设备是否支持分享功能。

**返回值:** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**自版本:** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示分享模态框，与其他应用共享内容

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### 接口定义


#### CanShareResult

| 属性         | 类型                 | 描述                       | 自版本 |
| ----------- | -------------------- | ------------------------- | ----- |
| **`value`** | <code>boolean</code> | 表示当前设备是否支持分享功能 | 1.1.0 |


#### ShareResult

| 属性                | 类型                | 描述                                                                                             | 自版本 |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------- | ----- |
| **`activityType`**  | <code>string</code> | 接收分享操作的应用标识符，某些情况下可能为空字符串。在Web平台上该值为undefined。                  | 1.0.0 |


#### ShareOptions

| 属性               | 类型                  | 描述                                                                                | 自版本 |
| ----------------- | --------------------- | ---------------------------------------------------------------------------------- | ----- |
| **`title`**       | <code>string</code>   | 设置消息标题（在邮件分享中作为主题）                                                | 1.0.0 |
| **`text`**        | <code>string</code>   | 设置要分享的文本内容                                                               | 1.0.0 |
| **`url`**         | <code>string</code>   | 设置要分享的URL（支持http、https或file://协议）                                    | 1.0.0 |
| **`files`**       | <code>string[]</code> | 要分享的文件URL数组（file://协议），仅iOS和Android平台支持                         | 4.1.0 |
| **`dialogTitle`** | <code>string</code>   | 设置分享对话框的标题（仅Android平台支持）                                           | 1.0.0 |

</docgen-api>