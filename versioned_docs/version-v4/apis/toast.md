---
title: Toast - Capacitor 插件 API
description: Toast API 提供了一个通知弹出窗口，用于向用户显示重要信息。就像真正的吐司面包一样！
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts
sidebar_label: Toast
translated: true
---

# @capacitor/toast

Toast API 提供了一个通知弹出窗口，用于向用户显示重要信息。就像真正的吐司面包一样！

## 安装

```bash
npm install @capacitor/toast
npx cap sync
```

## PWA 说明

Toast 插件正常工作需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements)。

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

* [`show(...)`](#show)
* [接口](#接口)

</docgen-index>

<docgen-api>


### show(...)

```typescript
show(options: ShowOptions) => Promise<void>
```

在屏幕上显示一个 Toast。

| 参数            | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### 接口


#### ShowOptions

| 属性             | 类型                                       | 描述                                                                        | 默认值                 | 起始版本 |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------- | ----- |
| **`text`**     | <code>string</code>                        | 要在 Toast 上显示的文本                                                       |                       | 1.0.0 |
| **`duration`** | <code>'short' \| 'long'</code>             | Toast 的持续时间，'short'（2000毫秒）或 'long'（3500毫秒）                  | <code>'short'</code>  | 1.0.0 |
| **`position`** | <code>'top' \| 'center' \| 'bottom'</code> | Toast 的位置。在 Android 12 及更新版本上，所有 toast 都显示在底部。 | <code>'bottom'</code> | 1.0.0 |

</docgen-api>
