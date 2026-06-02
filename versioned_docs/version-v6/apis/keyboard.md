---
title: Keyboard Capacitor 插件 API
description: Keyboard API 提供键盘显示和可见性控制，以及键盘显示和隐藏时的事件跟踪。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/keyboard/src/definitions.ts
sidebar_label: Keyboard
translated: true
---

# @capacitor/keyboard

Keyboard API 提供键盘显示和可见性控制，以及键盘显示和隐藏时的事件跟踪。

## 安装

```bash
npm install @capacitor/keyboard@latest-6
npx cap sync
```

## 示例

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', info => {
  console.log('keyboard will show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', info => {
  console.log('keyboard did show with height:', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('keyboard will hide');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('keyboard did hide');
});
```

## 配置

在 iOS 上，可以使用以下选项配置键盘：

| 属性                       | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                         | 默认值               | 始于   |
| -------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------ |
| **`resize`**               | <code><a href="#keyboardresize">KeyboardResize</a></code>   | 配置键盘出现时应用调整大小的方式。仅适用于 iOS。                                                                                                                                                                                                                                                              | <code>native</code> | 1.0.0 |
| **`style`**                | <code><a href="#keyboardstyle">KeyboardStyle</a></code>     | 如果您的应用不支持暗色/亮色主题变化，覆盖键盘样式。如果未设置，键盘样式将取决于设备外观。仅适用于 iOS。                                                                                                                                                                                                       |                     | 1.0.0 |
| **`resizeOnFullScreen`**   | <code>boolean</code>                                        | 存在一个 Android 错误，当应用处于全屏状态时（即如果使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 的大小。如果此设置设为 true，添加一个即使在应用全屏时也能调整 WebView 大小的解决方式。仅适用于 Android。                                                                                              |                     | 1.1.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "Keyboard": {
      "resize": "body",
      "style": "DARK",
      "resizeOnFullScreen": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/keyboard" />

import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
```

## 与 `cordova-plugin-ionic-keyboard` 的兼容性

为了保持与 [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) 的兼容性，
以下事件也可以通过 `window.addEventListener` 使用：

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`

## API

<docgen-index>

* [`show()`](#show)
* [`hide()`](#hide)
* [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
* [`setScroll(...)`](#setscroll)
* [`setStyle(...)`](#setstyle)
* [`setResizeMode(...)`](#setresizemode)
* [`getResizeMode()`](#getresizemode)
* [`addListener('keyboardWillShow', ...)`](#addlistenerkeyboardwillshow-)
* [`addListener('keyboardDidShow', ...)`](#addlistenerkeyboarddidshow-)
* [`addListener('keyboardWillHide', ...)`](#addlistenerkeyboardwillhide-)
* [`addListener('keyboardDidHide', ...)`](#addlistenerkeyboarddidhide-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show()

```typescript
show() => Promise<void>
```

显示键盘。此方法是 alpha 版本，可能存在一些问题。

此方法仅支持 Android。

**始于：** 1.0.0

--------------------


### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

**始于：** 1.0.0

--------------------


### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘上的辅助栏是否可见。我们建议在短表单（登录、注册等）上禁用辅助栏，以提供更简洁的 UI。

此方法仅支持 iPhone 设备。

| 参数              | 类型                                 |
| ----------------- | ------------------------------------ |
| **`options`**     | <code>{ isVisible: boolean; }</code> |

**始于：** 1.0.0

--------------------


### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用或禁用 WebView 滚动。

此方法仅支持 iOS。

| 参数              | 类型                                  |
| ----------------- | ------------------------------------- |
| **`options`**     | <code>{ isDisabled: boolean; }</code> |

**始于：** 1.0.0

--------------------


### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

此方法仅支持 iOS。

| 参数              | 类型                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| **`options`**     | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code>   |

**始于：** 1.0.0

--------------------


### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置调整大小模式。

此方法仅支持 iOS。

| 参数              | 类型                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| **`options`**     | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code>   |

**始于：** 1.0.0

--------------------


### getResizeMode()

```typescript
getResizeMode() => Promise<KeyboardResizeOptions>
```

获取当前设置的调整大小模式。

此方法仅支持 iOS。

**返回：** <code>Promise&lt;<a href="#keyboardresizeoptions">KeyboardResizeOptions</a>&gt;</code>

**始于：** 4.0.0

--------------------


### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘即将显示的事件。

在 Android 上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| 参数                | 类型                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| **`eventName`**     | <code>'keyboardWillShow'</code>                                            |
| **`listenerFunc`**  | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code>   |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘已显示的事件。

在 Android 上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| 参数                | 类型                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| **`eventName`**     | <code>'keyboardDidShow'</code>                                             |
| **`listenerFunc`**  | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code>   |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘即将隐藏的事件。

在 Android 上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| 参数                | 类型                              |
| ------------------- | --------------------------------- |
| **`eventName`**     | <code>'keyboardWillHide'</code>   |
| **`listenerFunc`**  | <code>() =&gt; void</code>        |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘已隐藏的事件。

在 Android 上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| 参数                | 类型                             |
| ------------------- | -------------------------------- |
| **`eventName`**     | <code>'keyboardDidHide'</code>   |
| **`listenerFunc`**  | <code>() =&gt; void</code>       |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**始于：** 1.0.0

--------------------


### Interfaces


#### KeyboardStyleOptions

| 属性          | 类型                                                      | 描述                 | 默认值                              | 始于   |
| ------------- | --------------------------------------------------------- | -------------------- | ---------------------------------- | ------ |
| **`style`**   | <code><a href="#keyboardstyle">KeyboardStyle</a></code>   | 键盘的样式。         | <code>KeyboardStyle.Default</code> | 1.0.0 |


#### KeyboardResizeOptions

| 属性         | 类型                                                        | 描述                                               | 始于   |
| ------------ | ----------------------------------------------------------- | -------------------------------------------------- | ------ |
| **`mode`**   | <code><a href="#keyboardresize">KeyboardResize</a></code>   | 键盘出现时用于调整元素大小的模式。                 | 1.0.0 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### KeyboardInfo

| 属性                   | 类型                | 描述               | 始于   |
| ---------------------- | ------------------- | ------------------ | ------ |
| **`keyboardHeight`**   | <code>number</code> | 键盘的高度。       | 1.0.0 |


### Enums


#### KeyboardStyle

| 成员           | 值                    | 描述                                                                                                                                                                                                                                    | 始于   |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**    | <code>'DARK'</code>    | 暗色键盘。                                                                                                                                                                                                                              | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 亮色键盘。                                                                                                                                                                                                                             | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 在 iOS 13 及更新版本上，键盘样式基于设备外观。如果设备使用暗色模式，键盘将为暗色。如果设备使用亮色模式，键盘将为亮色。在 iOS 12 上，键盘将为亮色。                                                                                     | 1.0.0 |


#### KeyboardResize

| 成员          | 值                   | 描述                                                                                                                | 始于   |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素的大小。相对单位不受影响，因为视口不会改变。                                                  | 1.0.0 |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素的大小。仅用于 Ionic Framework 应用。                                                      | 1.0.0 |
| **`Native`** | <code>'native'</code> | 当键盘显示/隐藏时，整个原生 WebView 将被调整大小。这会影响 `vh` 相对单位。                                           | 1.0.0 |
| **`None`**   | <code>'none'</code>   | 应用和 WebView 都不调整大小。                                                                                        | 1.0.0 |

</docgen-api>
