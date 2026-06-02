---
title: Keyboard Capacitor 插件 API
description: Keyboard API 提供键盘显示和可见性控制，以及在键盘显示和隐藏时的事件跟踪。
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor-keyboard/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-keyboard/blob/main/src/definitions.ts
sidebar_label: 键盘
source_hash: 7a6e5179
---

# @capacitor/keyboard

Keyboard API 提供键盘显示和可见性控制，以及在键盘显示和隐藏时的事件跟踪。

## 安装

```bash
npm install @capacitor/keyboard
npx cap sync
```

## 示例

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', info => {
  console.log('键盘将显示，高度：', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', info => {
  console.log('键盘已显示，高度：', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('键盘将隐藏');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('键盘已隐藏');
});
```

## 配置

键盘可以通过以下选项进行配置：

| Prop                     | Type                                                      | Description                                                                                                                                                                                                                                                                                                       | Default             | Since |
| ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`resize`**             | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用调整大小的方式。仅适用于 iOS。                                                                                                                                                                                                                            | <code>native</code> | 1.0.0 |
| **`style`**              | <code><a href="#keyboardstyle">KeyboardStyle</a></code>   | 如果你的应用不支持暗/亮主题切换，则覆盖键盘样式。如果未设置，键盘样式将取决于设备外观。仅适用于 iOS。                                                                                                                                     |                     | 1.0.0 |
| **`resizeOnFullScreen`** | <code>boolean</code>                                      | 存在一个 Android 错误，当应用处于全屏模式时（例如使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 大小。如果此设置设为 true，则会添加一个解决方案，即使应用处于全屏模式也能调整 WebView 大小。仅适用于 Android。 |                     | 1.1.0 |

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

为保持与
[`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard)
的兼容性，以下事件也支持使用 `window.addEventListener`：

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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### show()

```typescript
show() => Promise<void>
```

显示键盘。

此方法仅支持 Android。

**Since:** 1.0.0

--------------------


### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

**Since:** 1.0.0

--------------------


### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘上的辅助工具栏是否可见。我们建议对短表单（登录、注册等）禁用辅助工具栏，以提供更简洁的 UI。

此方法仅支持 iPhone 设备。

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ isVisible: boolean; }</code> |

**Since:** 1.0.0

--------------------


### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用或禁用 WebView 滚动。

此方法仅支持 iOS。

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ isDisabled: boolean; }</code> |

**Since:** 1.0.0

--------------------


### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

此方法仅支持 iOS。

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**Since:** 1.0.0

--------------------


### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置调整大小模式。

此方法仅支持 iOS。

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**Since:** 1.0.0

--------------------


### getResizeMode()

```typescript
getResizeMode() => Promise<KeyboardResizeOptions>
```

获取当前设置的调整大小模式。

此方法仅支持 iOS。

**返回：** <code>Promise&lt;<a href="#keyboardresizeoptions">KeyboardResizeOptions</a>&gt;</code>

**Since:** 4.0.0

--------------------


### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘即将显示的事件。

在 Android 上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| Param              | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘已显示的事件。

在 Android 上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| Param              | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘即将隐藏的事件。

在 Android 上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| Param              | Type                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>'keyboardWillHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘已隐藏的事件。

在 Android 上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| Param              | Type                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'keyboardDidHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**Since:** 1.0.0

--------------------


### Interfaces


#### KeyboardStyleOptions

| Prop        | Type                                                    | Description            | Default                            | Since |
| ----------- | ------------------------------------------------------- | ---------------------- | ---------------------------------- | ----- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘的样式。 | <code>KeyboardStyle.Default</code> | 1.0.0 |


#### KeyboardResizeOptions

| Prop       | Type                                                      | Description                                             | Since |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时用于调整元素大小的模式。 | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### KeyboardInfo

| Prop                 | Type                | Description             | Since |
| -------------------- | ------------------- | ----------------------- | ----- |
| **`keyboardHeight`** | <code>number</code> | 键盘的高度。 | 1.0.0 |


### Enums


#### KeyboardStyle

| Members       | Value                  | Description                                                                                                                                                                       | Since |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色键盘。                                                                                                                                                                    | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色键盘。                                                                                                                                                                   | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 键盘样式基于设备外观。如果设备使用深色模式，键盘将为深色。如果设备使用浅色模式，键盘将为浅色。 | 1.0.0 |


#### KeyboardResize

| Members      | Value                 | Description                                                                                                          | Since |
| ------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素的大小。由于视口不改变，相对单位不受影响。 | 1.0.0 |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素的大小。仅用于 Ionic Framework 应用。                               | 1.0.0 |
| **`Native`** | <code>'native'</code> | 键盘显示/隐藏时调整整个原生 Web View 的大小。这会影响 `vh` 相对单位。        | 1.0.0 |
| **`None`**   | <code>'none'</code>   | 应用和 Web View 都不调整大小。                                                                        | 1.0.0 |

</docgen-api>
