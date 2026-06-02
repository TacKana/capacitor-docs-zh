---
title: 提示框
description: 提示框 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/toast
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Toast API 提供了一个通知弹出框，用于向用户显示重要信息。就像真正的吐司一样！

- [`show(...)`](#show)
- [接口](#接口)

## PWA 注意事项

Toast 插件需要 [PWA Elements](/web/pwa-elements.mdx) 才能工作。

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

async show() {
  await Toast.show({
    text: '你好！'
  });
}
```

## API

### show(...)

```typescript
show(options: ToastShowOptions) => Promise<void>
```

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#toastshowoptions">ToastShowOptions</a></code> |

---

### 接口

#### ToastShowOptions

| 属性 | 类型 | 描述 |
| ------------ | ------------------------------------------ | -------------------------------------------------------------------------- |
| **`text`**     | <code>string</code>                        | |
| **`duration`** | <code>"short" \| "long"</code>             | Toast 的持续时间，'short'（2000ms，默认）或 'long'（3500ms） |
| **`position`** | <code>"center" \| "bottom" \| "top"</code> | |
