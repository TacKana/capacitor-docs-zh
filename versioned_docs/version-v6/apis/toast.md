---
title: Toast Capacitor 插件 API
description: Toast API 提供了一个通知弹出窗口，用于向用户显示重要信息。就像真正的吐司一样！
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/toast/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/toast/src/definitions.ts
sidebar_label: Toast
translated: true
---

# @capacitor/toast

Toast API 提供了一个通知弹出窗口，用于向用户显示重要信息。就像真正的吐司一样！

## 安装

```bash
npm install @capacitor/toast@latest-6
npx cap sync
```

## PWA 说明

Toast 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### show(...)

```typescript
show(options: ShowOptions) => Promise<void>
```

在屏幕上显示一个 Toast

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**自从：** 1.0.0

--------------------


### 接口


#### ShowOptions

| 属性           | 类型                                       | 描述                                                                          | 默认值                  | 自从 |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------------------- | ----------------------- | ---- |
| **`text`**     | <code>string</code>                        | 在 Toast 上显示的文本                                                         |                         | 1.0.0 |
| **`duration`** | <code>'short' \| 'long'</code>             | Toast 的持续时间，'short'（2000ms）或 'long'（3500ms）                       | <code>'short'</code>   | 1.0.0 |
| **`position`** | <code>'top' \| 'center' \| 'bottom'</code> | Toast 的位置。在 Android 12 及更新版本上，所有 toast 都显示在底部。          | <code>'bottom'</code>  | 1.0.0 |

</docgen-api>
