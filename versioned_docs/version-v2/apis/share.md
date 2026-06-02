---
title: 分享
description: 分享 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/share
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Share API 提供了在任何用户已安装的支持分享的应用中分享内容的方法。

Share API 可在 iOS、Android 和 Web 上运行（使用新的 [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share)），尽管 Web 支持目前还不完善。

- [`share(...)`](#share)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

let shareRet = await Share.share({
  title: '看看好东西',
  text: '你现在必须看看这个非常棒的东西',
  url: 'http://ionicframework.com/',
  dialogTitle: '与朋友分享',
});
```

每个平台使用不同的字段集，但您应该提供所有字段。

## API

### share(...)

```typescript
share(options: ShareOptions) => Promise<any>
```

显示分享模态框，用于在您的应用中与其他应用分享内容

| 参数 | 类型 |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#shareoptions">ShareOptions</a></code> |

**返回：** <code>Promise&lt;any&gt;</code>

---

### 接口

#### ShareOptions

| 属性 | 类型 | 描述 |
| ----------------- | ------------------- | ------------------------------------------------------------------------- |
| **`title`**       | <code>string</code> | 为任何消息设置标题。如果是分享到邮件，这将是主题。 |
| **`text`**        | <code>string</code> | 设置要分享的文本 |
| **`url`**         | <code>string</code> | 设置要分享的 URL，可以是 http、https 或 file URL |
| **`dialogTitle`** | <code>string</code> | 设置分享模态框的标题。仅 Android。 |
