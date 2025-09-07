
---
title: 分享
description: 分享 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/share
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

分享 API 提供了在用户已安装的任何支持分享的应用中分享内容的方法。

该 API 支持 iOS、Android 和 Web 平台（使用新的 [Web 分享 API](https://developers.google.com/web/updates/2016/09/navigator-share)），不过目前 Web 平台的支持尚不完善。

- [`share(...)`](#share)
- [接口](#interfaces)

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

let shareRet = await Share.share({
  title: '看看这个很棒的东西',
  text: '你马上需要看到的真正超赞的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '分享给朋友们',
});
```

每个平台使用不同的字段集，但建议您提供全部字段。

## API

### share(...)

```typescript
share(options: ShareOptions) => Promise<any>
```

显示分享模态框，用于在您的应用与其他应用之间分享内容

| 参数           | 类型                                                      |
| -------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;any&gt;</code>

---

### 接口

#### ShareOptions

| 属性              | 类型                | 描述                                                               |
| ----------------- | ------------------- | ------------------------------------------------------------------------- |
| **`title`**       | <code>string</code> | 设置消息标题。如果是通过邮件分享，这将作为邮件主题 |
| **`text`**        | <code>string</code> | 设置要分享的文本内容                                                    |
| **`url`**         | <code>string</code> | 设置要分享的 URL，可以是 http、https 或文件 URL                        |
| **`dialogTitle`** | <code>string</code> | 设置分享模态框的标题。仅限 Android 平台                             |