---
title: Share Capacitor 插件 API
description: Share API 提供了一系列方法，允许用户通过已安装的支持分享功能的应用程序分享内容。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/share/src/definitions.ts
sidebar_label: Share
---

# @capacitor/share

Share API 提供了一系列方法，允许用户通过已安装的支持分享功能的应用程序分享内容。

该 API 支持 iOS、Android 和 Web 平台（使用新的 [Web Share API](https://web.dev/web-share/)），但目前 Web 端的支持尚不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## Android 配置

默认情况下，Capacitor 应用仅允许分享缓存文件夹中的文件。如需分享其他 Android 文件夹中的内容，需在 `android/app/src/main/res/xml/file_paths.xml` 文件中添加相应配置。具体可用位置请参考 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中的 "Specifying Available Files" 部分。

## 使用示例

```typescript
import { Share } from '@capacitor/share';

// 完整分享示例
await Share.share({
  title: '查看精彩内容',
  text: '这个超棒的东西你现在必须看看',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给好友',
});

// 仅分享文本
await Share.share({
  text: '这个超棒的东西你现在必须看看',
});

// 仅分享网址
await Share.share({
  url: 'http://ionicframework.com/',
});

// 分享本地文件（使用url参数）
const photo = await Camera.getPhoto(options);
await Share.share({
  url: photo.path,
});

// 分享多个文件（使用files参数）
const { photos } = await Camera.pickImages(options);
await Share.share({
  files: photos.map((photo) => photo.path!),
});
```

虽然不同平台使用的字段可能不同，但建议您提供所有可选字段以获得最佳兼容性。

## API 文档

<docgen-index>

- [`canShare()`](#canshare)
- [`share(...)`](#share)
- [接口](#interfaces)

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

---

### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

调出分享模态框，用于将内容分享到其他应用

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### CanShareResult

| 属性        | 类型                 | 描述                         | 自版本 |
| ----------- | -------------------- | ---------------------------- | ------ |
| **`value`** | <code>boolean</code> | 表示当前设备是否支持分享功能 | 1.1.0  |

#### ShareResult

| 属性               | 类型                | 描述                                                                           | 自版本 |
| ------------------ | ------------------- | ------------------------------------------------------------------------------ | ------ |
| **`activityType`** | <code>string</code> | 接收分享操作的应用标识符，某些情况下可能为空字符串。Web 端此属性为 undefined。 | 1.0.0  |

#### ShareOptions

| 属性              | 类型                  | 描述                                                 | 自版本 |
| ----------------- | --------------------- | ---------------------------------------------------- | ------ |
| **`title`**       | <code>string</code>   | 设置分享消息的标题（邮件分享时作为主题）             | 1.0.0  |
| **`text`**        | <code>string</code>   | 设置要分享的文本内容                                 | 1.0.0  |
| **`url`**         | <code>string</code>   | 设置要分享的 URL（支持 http、https 或 file:// 协议） | 1.0.0  |
| **`files`**       | <code>string[]</code> | 要分享的文件路径数组（仅支持 iOS 和 Android 平台）   | 4.1.0  |
| **`dialogTitle`** | <code>string</code>   | 设置分享对话框的标题（仅 Android 平台支持）          | 1.0.0  |

</docgen-api>
