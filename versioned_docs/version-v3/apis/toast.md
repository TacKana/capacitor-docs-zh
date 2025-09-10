---
title: Toast Capacitor 插件 API
description: Toast API 提供了一种通知弹出框，用于向用户显示重要信息。就像真实的吐司面包一样醒目！
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts
sidebar_label: Toast
---

# @capacitor/toast

Toast API 提供了一种通知弹出框，用于向用户显示重要信息。就像真实的吐司面包一样醒目！

## 安装

```bash
npm install @capacitor/toast
npx cap sync
```

## PWA 注意事项

Toast 插件需要 [PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { Toast } from '@capacitor/toast';

const showHelloToast = async () => {
  await Toast.show({
    text: 'Hello!',
  });
};
```

## API

<docgen-index>

- [`show(...)`](#show)
- [接口](#interfaces)

</docgen-index>

<docgen-api>

### show(...)

```typescript
show(options: ShowOptions) => Promise<void>
```

在屏幕上显示 Toast 提示

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**版本：** 1.0.0

---

### Interfaces

#### ShowOptions

| 属性           | 类型                                       | 说明                                                         | 默认值                | 版本  |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ | --------------------- | ----- |
| **`text`**     | <code>string</code>                        | 要在 Toast 上显示的文本                                      |                       | 1.0.0 |
| **`duration`** | <code>'short' \| 'long'</code>             | Toast 显示时长，可选 'short' (2000毫秒) 或 'long' (3500毫秒) | <code>'short'</code>  | 1.0.0 |
| **`position`** | <code>'top' \| 'center' \| 'bottom'</code> | Toast 显示位置                                               | <code>'bottom'</code> | 1.0.0 |

</docgen-api>
