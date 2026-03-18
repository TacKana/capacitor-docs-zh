---
title: Share
description: Share API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/share
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Share API 提供了分享内容到用户已安装且支持分享功能的应用的方法。

Share API 支持 iOS、Android 和 Web 平台（使用新的 [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share)），但目前 Web 平台的支持尚不完善。

- [`share(...)`](#share)
- [Interfaces](#interfaces)

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

let shareRet = await Share.share({
  title: 'See cool stuff',
  text: 'Really awesome thing you need to see right meow',
  url: 'http://ionicframework.com/',
  dialogTitle: 'Share with buddies',
});
```

不同平台使用的字段集有所不同，但建议您提供所有字段。

## API

### share(...)

```typescript
share(options: ShareOptions) => Promise<any>
```

显示分享模态框，用于将应用中的内容分享到其他应用

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回值:** <code>Promise&lt;any&gt;</code>

---

### Interfaces

#### ShareOptions

| 属性              | 类型                | 描述                                                               |
| ----------------- | ------------------- | ------------------------------------------------------------------------- |
| **`title`**       | <code>string</code> | 设置消息标题。如果分享到电子邮件，该字段将作为邮件主题 |
| **`text`**        | <code>string</code> | 设置要分享的文本内容                                                    |
| **`url`**         | <code>string</code> | 设置要分享的 URL，可以是 http、https 或文件 URL                        |
| **`dialogTitle`** | <code>string</code> | 设置分享模态框的标题（仅限 Android 平台）                             |