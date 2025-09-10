---
title: Toast
description: Toast API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/toast
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Toast API 提供了一种通知弹出窗口，用于向用户显示重要信息。就像真正的吐司一样！

- [`show(...)`](#show)
- [接口](#interfaces)

## PWA 注意事项

Toast 插件需要 [PWA Elements](/web/pwa-elements.mdx) 才能正常工作。

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

async show() {
  await Toast.show({
    text: 'Hello!'
  });
}
```

## API

### show(...)

```typescript
show(options: ToastShowOptions) => Promise<void>
```

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#toastshowoptions">ToastShowOptions</a></code> |

---

### Interfaces

#### ToastShowOptions

| 属性           | 类型                                       | 描述                                                     |
| -------------- | ------------------------------------------ | -------------------------------------------------------- |
| **`text`**     | <code>string</code>                        | 显示的文本内容                                           |
| **`duration`** | <code>"short" \| "long"</code>             | 显示时长，'short'（2000毫秒，默认）或 'long'（3500毫秒） |
| **`position`** | <code>"center" \| "bottom" \| "top"</code> | 显示位置                                                 |
