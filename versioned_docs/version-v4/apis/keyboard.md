---
title: Keyboard Capacitor Plugin API
description: Keyboard API 提供键盘显示与可见性控制功能，并支持键盘显示和隐藏时的事件追踪。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts
sidebar_label: Keyboard
---

# @capacitor/keyboard

Keyboard API 提供键盘显示与可见性控制功能，并支持键盘显示和隐藏时的事件追踪。

## 安装

```bash
npm install @capacitor/keyboard
npx cap sync
```

## 示例

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', info => {
  console.log('键盘即将显示，高度为：', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', info => {
  console.log('键盘已显示，高度为：', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('键盘即将隐藏');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('键盘已隐藏');
});
```

## 配置

在 iOS 上，键盘可通过以下选项进行配置：

| 属性                     | 类型                                                      | 说明                                                                                                                                                                                                                                                                                                       | 默认值              | 始于版本 |
| ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`resize`**             | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用的调整方式。仅适用于 iOS。                                                                                                                                                                                                                            | <code>native</code> | 1.0.0 |
| **`style`**              | <code><a href="#keyboardstyle">KeyboardStyle</a></code>   | 如果您的应用不支持深色/浅色主题切换，可覆盖键盘样式。如未设置，键盘样式将取决于设备外观。仅适用于 iOS。                                                                                                                                     |                     | 1.0.0 |
| **`resizeOnFullScreen`** | <code>boolean</code>                                      | Android 存在一个缺陷，当应用处于全屏模式时（例如使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 大小。此设置若设为 true，将应用一个变通方案，即使应用处于全屏模式也能调整 WebView 大小。仅适用于 Android |                     | 1.1.0 |

### 配置示例

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

为保持与
[`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)
的兼容性，以下事件也支持通过 `window.addEventListener` 监听：

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
* [接口](#接口)
* [枚举](#枚举)

</docgen-index>

<docgen-api>


### show()

```typescript
show() => Promise<void>
```

显示键盘。此方法为 Alpha 版本，可能存在一些问题。

仅 Android 支持此方法。

**始于版本：** 1.0.0

--------------------


### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

**始于版本：** 1.0.0

--------------------


### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘上是否应显示辅助工具栏。对于简短的表单（登录、注册等），建议禁用辅助工具栏以提供更简洁的界面。

此方法仅适用于 iPhone 设备。

| 参数          | 类型                                 |
| ------------- | ------------------------------------ |
| **`options`** | `{ isVisible: boolean; }` |

**始于版本：** 1.0.0

--------------------


### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用或禁用 WebView 滚动。

此方法仅适用于 iOS。

| 参数          | 类型                                  |
| ------------- | ------------------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

**始于版本：** 1.0.0

--------------------


### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

此方法仅适用于 iOS。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**始于版本：** 1.0.0

--------------------


### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置调整模式。

此方法仅适用于 iOS。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**始于版本：** 1.0.0

--------------------

### getResizeMode()

```typescript
getResizeMode() => Promise<KeyboardResizeOptions>
```

获取当前设置的调整大小模式。

此方法仅在 iOS 上受支持。

**返回值:** <code>Promise&lt;<a href="#keyboardresizeoptions">KeyboardResizeOptions</a>&gt;</code>

**始于:** 4.0.0

--------------------


### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将显示的事件。

| 参数                 | 类型                                                                     |
| -------------------- | ------------------------------------------------------------------------ |
| **`eventName`**      | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`**   | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于:** 1.0.0

--------------------


### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已显示的事件。

| 参数                 | 类型                                                                     |
| -------------------- | ------------------------------------------------------------------------ |
| **`eventName`**      | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`**   | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于:** 1.0.0

--------------------


### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将隐藏的事件。

| 参数                 | 类型                            |
| -------------------- | ------------------------------- |
| **`eventName`**      | <code>'keyboardWillHide'</code> |
| **`listenerFunc`**   | <code>() =&gt; void</code>      |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于:** 1.0.0

--------------------


### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已隐藏的事件。

| 参数                 | 类型                           |
| -------------------- | ------------------------------ |
| **`eventName`**      | <code>'keyboardDidHide'</code> |
| **`listenerFunc`**   | <code>() =&gt; void</code>     |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**始于:** 1.0.0

--------------------


### 接口


#### KeyboardStyleOptions

| 属性         | 类型                                                    | 描述             | 默认值                            | 始于 |
| ------------ | ------------------------------------------------------- | ---------------- | ---------------------------------- | ----- |
| **`style`**  | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘的样式。     | <code>KeyboardStyle.Default</code> | 1.0.0 |


#### KeyboardResizeOptions

| 属性        | 类型                                                      | 描述                                 | 始于 |
| ----------- | --------------------------------------------------------- | ------------------------------------ | ----- |
| **`mode`**  | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时用于调整元素大小的模式。   | 1.0.0 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### KeyboardInfo

| 属性                     | 类型                | 描述               | 始于 |
| ------------------------ | ------------------- | ------------------ | ----- |
| **`keyboardHeight`**     | <code>number</code> | 键盘的高度。       | 1.0.0 |


### 枚举


#### KeyboardStyle

| 成员           | 值                      | 描述                                                                                                                                                                                                                                 | 始于 |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**     | <code>'DARK'</code>     | 深色键盘。                                                                                                                                                                                                                           | 1.0.0 |
| **`Light`**    | <code>'LIGHT'</code>    | 浅色键盘。                                                                                                                                                                                                                           | 1.0.0 |
| **`Default`**  | <code>'DEFAULT'</code>  | 在 iOS 13 及更高版本上，键盘样式基于设备外观。如果设备使用深色模式，键盘将为深色。如果设备使用浅色模式，键盘将为浅色。在 iOS 12 上，键盘将为浅色。                                                                                    | 1.0.0 |

#### KeyboardResize

| 成员         | 值                     | 描述                                                                                                            | 始于版本 |
| ------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素的大小。相对单位不受影响，因为视口（viewport）不会改变。                                | 1.0.0    |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素的大小。仅适用于 Ionic Framework 应用。                                               | 1.0.0    |
| **`Native`** | <code>'native'</code> | 键盘显示/隐藏时，整个原生 Web View 都会调整大小。这会影响 `vh` 相对单位。                                       | 1.0.0    |
| **`None`**   | <code>'none'</code>   | 应用和 Web View 都不会被调整大小。                                                                              | 1.0.0    |

</docgen-api>