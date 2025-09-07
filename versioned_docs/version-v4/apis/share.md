---
title: Share Capacitor 插件 API
description: Share API 提供了通过用户设备上支持分享的应用来共享内容的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: 分享
---

# @capacitor/share

Share API 提供了通过用户设备上支持分享的应用来共享内容的方法。

该 API 支持 iOS、Android 和 Web 平台（使用新的 [Web Share API](https://web.dev/web-share/)），不过在 Web 上的支持目前还不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## Android 配置

默认情况下，Capacitor 应用只允许共享缓存文件夹中的文件。要共享其他 Android 文件夹中的内容，需要在 `android/app/src/main/res/xml/file_paths.xml` 文件中添加这些文件夹。请参考 [FileProvider 文档](https://developer.android.com/reference/androidx/core/content/FileProvider) 中 "Specifying Available Files" 部分了解可添加的位置。

## 使用示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '看看这个好东西',
  text: '你真的需要马上看看这个超棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给朋友们',
});
```

不同平台会使用不同的字段集，但建议您提供所有字段。

## API 文档

<docgen-index>

* [`canShare()`](#canshare)
* [`share(...)`](#share)
* [接口定义](#interfaces)

</docgen-index>

<docgen-api>

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

显示分享模态框，用于与其他应用共享内容

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### 接口定义


#### CanShareResult

| 属性         | 类型                  | 描述                          | 自版本 |
| ----------- | -------------------- | ---------------------------- | ----- |
| **`value`** | <code>boolean</code> | 表示设备是否支持分享功能       | 1.1.0 |


#### ShareResult

| 属性                | 类型                | 描述                                                                                                              | 自版本 |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------- | ----- |
| **`activityType`** | <code>string</code> | 接收分享操作的应用标识符。在某些情况下可能为空字符串。在 Web 平台上该值为 undefined。                             | 1.0.0 |


#### ShareOptions

| 属性               | 类型                  | 描述                                                                         | 自版本 |
| ----------------- | --------------------- | --------------------------------------------------------------------------- | ----- |
| **`title`**       | <code>string</code>   | 设置分享内容的标题。如果是通过邮件分享，这将作为邮件主题                     | 1.0.0 |
| **`text`**        | <code>string</code>   | 设置要分享的文本内容                                                        | 1.0.0 |
| **`url`**         | <code>string</code>   | 设置要分享的 URL，可以是 http、https 或 file:// 协议的 URL                  | 1.0.0 |
| **`files`**       | <code>string[]</code> | 要分享的文件 URL 数组。仅在 iOS 和 Android 平台上支持。                     | 4.1.0 |
| **`dialogTitle`** | <code>string</code>   | 设置分享对话框的标题。该选项仅在 Android 平台上支持。                       | 1.0.0 |

</docgen-api>