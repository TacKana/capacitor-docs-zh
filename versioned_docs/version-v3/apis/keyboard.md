---
title: Keyboard Capacitor Plugin API
description: Keyboard API 提供键盘显示与可见性控制，并能在键盘显示和隐藏时进行事件追踪。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts
sidebar_label: Keyboard
---

# @capacitor/keyboard

Keyboard API 提供键盘显示与可见性控制，并能在键盘显示和隐藏时进行事件追踪。

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

<docgen-config>

在 iOS 上，键盘可以通过以下选项进行配置：

| 属性                       | 类型                                                      | 描述                                                                                                                                                                                                                                                                                                       | 默认值              | 始于版本 |
| -------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| **`resize`**               | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用窗口的调整方式。仅在 iOS 上可用。                                                                                                                                                                                                                            | <code>native</code> | 1.0.0    |
| **`style`**                | <code>'dark' \| 'light'</code>                            | 如果你的应用不支持暗色/亮色主题切换，可以覆盖键盘样式。如果未设置，键盘样式将取决于设备外观。仅在 iOS 上可用。                                                                                                                                     |                     | 1.0.0    |
| **`resizeOnFullScreen`**   | <code>boolean</code>                                      | Android 存在一个 bug，当应用处于全屏模式时（例如使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 的大小。此设置如果设为 true，会添加一个变通方案，即使应用处于全屏模式也能调整 WebView 大小。仅在 Android 上可用。 |                     | 1.1.0    |

### 配置示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "Keyboard": {
      "resize": "body",
      "style": "dark",
      "resizeOnFullScreen": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/keyboard" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
```

</docgen-config>

## 与 `cordova-plugin-ionic-keyboard` 的兼容性

为保持与 [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) 的兼容性，以下事件也可通过 `window.addEventListener` 使用：

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
* [`addListener('keyboardWillShow', ...)`](#addlistenerkeyboardwillshow-)
* [`addListener('keyboardDidShow', ...)`](#addlistenerkeyboarddidshow-)
* [`addListener('keyboardWillHide', ...)`](#addlistenerkeyboardwillhide-)
* [`addListener('keyboardDidHide', ...)`](#addlistenerkeyboarddidhide-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### show()

```typescript
show() => Promise<void>
```

显示键盘。此方法为 alpha 版本，可能存在问题。

此方法仅在 Android 上受支持。

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

设置键盘上的辅助工具栏是否可见。对于短表单（如登录、注册等），我们建议禁用辅助工具栏，以提供更简洁的用户界面。

此方法仅在 iPhone 设备上受支持。

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

此方法仅在 iOS 上受支持。

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

此方法仅在 iOS 上受支持。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**始于版本：** 1.0.0

--------------------


### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置窗口调整模式。

此方法仅在 iOS 上受支持。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**始于版本：** 1.0.0

--------------------### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将显示的事件。

| 参数                | 类型                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| **`eventName`**     | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`**  | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已经显示的事件。

| 参数                | 类型                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| **`eventName`**     | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`**  | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将隐藏的事件。

| 参数                | 类型                            |
| ------------------- | ------------------------------- |
| **`eventName`**     | <code>'keyboardWillHide'</code> |
| **`listenerFunc`**  | <code>() =&gt; void</code>      |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已经隐藏的事件。

| 参数                | 类型                           |
| ------------------- | ------------------------------ |
| **`eventName`**     | <code>'keyboardDidHide'</code> |
| **`listenerFunc`**  | <code>() =&gt; void</code>     |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**起始版本：** 1.0.0

--------------------


### 接口


#### KeyboardStyleOptions

| 属性          | 类型                                                    | 描述           | 默认值                               | 起始版本 |
| ------------- | ------------------------------------------------------- | -------------- | ------------------------------------ | -------- |
| **`style`**   | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘的样式。   | <code>KeyboardStyle.Default</code>   | 1.0.0    |


#### KeyboardResizeOptions

| 属性         | 类型                                                      | 描述                                         | 起始版本 |
| ------------ | --------------------------------------------------------- | -------------------------------------------- | -------- |
| **`mode`**   | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时用于调整元素大小的模式。           | 1.0.0    |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### KeyboardInfo

| 属性                     | 类型                | 描述           | 起始版本 |
| ------------------------ | ------------------- | -------------- | -------- |
| **`keyboardHeight`**     | <code>number</code> | 键盘的高度。   | 1.0.0    |


### 枚举


#### KeyboardStyle

| 成员           | 值                     | 描述                                                                                                                                                                                                                         | 起始版本 |
| -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`Dark`**     | <code>'DARK'</code>    | 深色键盘。                                                                                                                                                                                                                  | 1.0.0    |
| **`Light`**    | <code>'LIGHT'</code>   | 浅色键盘。                                                                                                                                                                                                                  | 1.0.0    |
| **`Default`**  | <code>'DEFAULT'</code> | 在 iOS 13 及更新版本上，键盘样式基于设备外观。如果设备使用深色模式，键盘将为深色。如果设备使用浅色模式，键盘将为浅色。在 iOS 12 上，键盘将为浅色。                                                                           | 1.0.0    |


#### KeyboardResize

| 成员           | 值                    | 描述                                                                                                                          | 起始版本 |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`Body`**     | <code>'body'</code>   | 仅调整 `body` HTML 元素的大小。相对单位不受影响，因为视口不会改变。                                                            | 1.0.0    |
| **`Ionic`**    | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素的大小。仅适用于 Ionic Framework 应用程序。                                                          | 1.0.0    |
| **`Native`**   | <code>'native'</code> | 当键盘显示/隐藏时，整个原生 Web View 将被调整大小。这会影响 `vh` 相对单位。                                                    | 1.0.0    |
| **`None`**     | <code>'none'</code>   | 应用程序和 Web View 都不会被调整大小。                                                                                        | 1.0.0    |

</docgen-api>