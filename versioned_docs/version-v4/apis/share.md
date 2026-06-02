---
title: 分享 - Capacitor 插件 API
description: 分享 API 提供了在用户已安装的支持分享的应用中分享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: 分享
translated: true
---

# @capacitor/share

分享 API 提供了在用户已安装的支持分享的应用中分享内容的方法。

分享 API 适用于 iOS、Android 和 Web（使用新的 [Web Share
API](https://web.dev/web-share/)），不过 Web 支持目前还不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## Android

默认情况下，Capacitor 应用只允许从 caches 文件夹分享文件。要使其他 Android 文件夹可分享，必须将它们添加到 `android/app/src/main/res/xml/file_paths.xml` 文件中。请查阅 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider)中的指定可用文件部分，了解可用的位置。

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看酷炫的东西',
  text: '你现在就需要看到这个非常棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '与朋友分享',
});
```

每个平台使用不同的字段集，但您应该全部提供。

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

检查是否支持分享功能。

**返回：** <code>Promise&lt;<a href="#canshareresult">CanShareResult</a>&gt;</code>

**起始版本：** 1.1.0

--------------------


### share(...)

```typescript
share(options: ShareOptions) => Promise<ShareResult>
```

显示分享模态框以与其他应用分享内容。

| 参数            | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### 接口


#### CanShareResult

| 属性        | 类型                 | 描述                          | 起始版本 |
| ----------- | -------------------- | ------------------------------------ | ----- |
| **`value`** | <code>boolean</code> | 是否支持分享功能。 | 1.1.0 |


#### ShareResult

| 属性                 | 类型                | 描述                                                                                                              | 起始版本 |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`activityType`** | <code>string</code> | 接收分享操作的应用的标识符。某些情况下可能为空字符串。在 web 上将为 undefined。 | 1.0.0 |


#### ShareOptions

| 属性                | 类型                  | 描述                                                                         | 起始版本 |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------- | ----- |
| **`title`**       | <code>string</code>   | 为任何消息设置标题。如果分享到电子邮件，这将是主题。           | 1.0.0 |
| **`text`**        | <code>string</code>   | 设置要分享的一些文本。                                                              | 1.0.0 |
| **`url`**         | <code>string</code>   | 设置要分享的 URL，可以是 http、https 或 file:// URL。                               | 1.0.0 |
| **`files`**       | <code>string[]</code> | 要分享的文件的 file:// URL 数组。仅支持 iOS 和 Android。 | 4.1.0 |
| **`dialogTitle`** | <code>string</code>   | 设置分享模态框的标题。此选项仅在 Android 上受支持。          | 1.0.0 |

</docgen-api>
