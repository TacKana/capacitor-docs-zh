---
title: Toast Capacitor 插件 API
description: Toast API 提供了一个通知弹窗，用于向用户显示重要信息。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts
sidebar_label: Toast
translated: true
---

# @capacitor/toast

Toast API 提供了一个通知弹窗，用于向用户显示重要信息。

## 安装

```bash
npm install @capacitor/toast
npx cap sync
```

## PWA 说明

Toast 插件需要 [PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) 才能工作。

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
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### show(...)

```typescript
show(options: ShowOptions) => Promise<void>
```

在屏幕上显示 Toast

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowOptions

| Prop           | Type                                       | Description                                                       | Default               | Since |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------- | --------------------- | ----- |
| **`text`**     | <code>string</code>                        | Toast 上显示的文字                                      |                       | 1.0.0 |
| **`duration`** | <code>'short' \| 'long'</code>             | Toast 的持续时间，'short'（2000ms）或 'long'（3500ms） | <code>'short'</code>  | 1.0.0 |
| **`position`** | <code>'top' \| 'center' \| 'bottom'</code> | Toast 的位置                                             | <code>'bottom'</code> | 1.0.0 |

</docgen-api>
