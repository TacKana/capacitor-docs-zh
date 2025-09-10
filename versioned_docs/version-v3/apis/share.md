---
title: 分享插件 API
description: 分享插件提供了调用用户设备上支持分享功能的应用进行内容共享的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts
sidebar_label: 分享
---

# @capacitor/share

该分享插件提供了调用用户设备上支持分享功能的应用进行内容共享的方法。

支持 iOS、Android 和 Web 平台（使用新的 [Web 分享 API](https://web.dev/web-share/)），但目前在 Web 平台的支持尚不完善。

## 安装

```bash
npm install @capacitor/share
npx cap sync
```

## 示例

```typescript
import { Share } from '@capacitor/share';

await Share.share({
  title: '查看精彩内容',
  text: '这里有你现在一定要看的超棒内容',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给好友',
});
```

不同平台会使用不同的字段，但建议您提供所有字段。

## API 文档

<docgen-index>

- [`canShare()`](#canshare)
- [`share(...)`](#share)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

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

调起分享模态框，将内容分享至其他应用

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#shareresult">ShareResult</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### CanShareResult

| 属性        | 类型                 | 描述                           | 自版本 |
| ----------- | -------------------- | ------------------------------ | ------ |
| **`value`** | <code>boolean</code> | 表示当前设备是否支持分享功能。 | 1.1.0  |

#### ShareResult

| 属性               | 类型                | 描述                                                                                  | 自版本 |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------- | ------ |
| **`activityType`** | <code>string</code> | 接收分享操作的应用标识符。在某些情况下可能为空字符串。在 Web 平台上该值为 undefined。 | 1.0.0  |

#### ShareOptions

| 属性              | 类型                | 描述                                                 | 自版本 |
| ----------------- | ------------------- | ---------------------------------------------------- | ------ |
| **`title`**       | <code>string</code> | 设置消息标题（分享至邮件时将作为邮件主题）           | 1.0.0  |
| **`text`**        | <code>string</code> | 设置要分享的文本内容                                 | 1.0.0  |
| **`url`**         | <code>string</code> | 设置要分享的 URL（支持 http、https 或 file:// 协议） | 1.0.0  |
| **`dialogTitle`** | <code>string</code> | 设置分享对话框的标题（仅 Android 平台支持此选项）。  | 1.0.0  |

</docgen-api>
