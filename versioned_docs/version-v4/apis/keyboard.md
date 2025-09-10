---
title: Keyboard Capacitor Plugin API
description: Keyboard API 提供键盘显示与可见性控制功能，并支持追踪键盘显示/隐藏事件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts
sidebar_label: Keyboard
---

# @capacitor/keyboard

Keyboard API 提供键盘显示与可见性控制功能，并支持追踪键盘显示/隐藏事件。

## 安装

```bash
npm install @capacitor/keyboard
npx cap sync
```

## 示例

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', (info) => {
  console.log('键盘即将显示，高度为:', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', (info) => {
  console.log('键盘已显示，高度为:', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('键盘即将隐藏');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('键盘已隐藏');
});
```

## 配置

在 iOS 平台上，键盘可通过以下选项进行配置：

| 属性                     | 类型                                                      | 描述                                                                                                                                                                                | 默认值              | 版本  |
| ------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`resize`**             | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用界面调整方式（仅限 iOS）                                                                                                                                          | <code>native</code> | 1.0.0 |
| **`style`**              | <code><a href="#keyboardstyle">KeyboardStyle</a></code>   | 当应用不支持深色/浅色主题切换时覆盖键盘样式。若不设置，键盘样式将跟随设备外观（仅限 iOS）                                                                                           |                     | 1.0.0 |
| **`resizeOnFullScreen`** | <code>boolean</code>                                      | Android 存在一个 bug：当应用处于全屏模式时（例如使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 尺寸。此选项设为 true 可强制 WebView 在全屏状态下也能调整尺寸（仅限 Android） |                     | 1.1.0 |

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

为保持与 [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) 的兼容性，以下事件也支持通过 `window.addEventListener` 监听：

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`

## API 文档

<docgen-index>

- [`show()`](#show)
- [`hide()`](#hide)
- [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
- [`setScroll(...)`](#setscroll)
- [`setStyle(...)`](#setstyle)
- [`setResizeMode(...)`](#setresizemode)
- [`getResizeMode()`](#getresizemode)
- [`addListener('keyboardWillShow', ...)`](#addlistenerkeyboardwillshow-)
- [`addListener('keyboardDidShow', ...)`](#addlistenerkeyboarddidshow-)
- [`addListener('keyboardWillHide', ...)`](#addlistenerkeyboardwillhide-)
- [`addListener('keyboardDidHide', ...)`](#addlistenerkeyboarddidhide-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)
- [枚举](#enums)

</docgen-index>

<docgen-api>

### show()

```typescript
show() => Promise<void>
```

显示键盘（此方法处于 alpha 阶段，可能存在问题）。

仅支持 Android 平台。

**版本：** 1.0.0

---

### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

**版本：** 1.0.0

---

### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘上方辅助工具栏的可见性。对于短表单（登录、注册等），建议禁用辅助工具栏以获得更简洁的 UI。

仅支持 iPhone 设备。

| 参数          | 类型                      |
| ------------- | ------------------------- |
| **`options`** | `{ isVisible: boolean; }` |

**版本：** 1.0.0

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用/禁用 WebView 滚动功能。

仅支持 iOS 平台。

| 参数          | 类型                       |
| ------------- | -------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

**版本：** 1.0.0

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

仅支持 iOS 平台。

| 参数          | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**版本：** 1.0.0

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置界面调整模式。

仅支持 iOS 平台。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**版本：** 1.0.0

---

### getResizeMode()

```typescript
getResizeMode() => Promise<KeyboardResizeOptions>
```

获取当前设置的界面调整模式。

仅支持 iOS 平台。

**返回值：** <code>Promise&lt;<a href="#keyboardresizeoptions">KeyboardResizeOptions</a>&gt;</code>

**版本：** 4.0.0

---

### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将显示的事件。

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已显示的事件。

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将隐藏的事件。

| 参数               | 类型                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>'keyboardWillHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已隐藏的事件。

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'keyboardDidHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件所有的原生事件监听器。

**版本：** 1.0.0

---

### Interfaces

#### KeyboardStyleOptions

| 属性        | 类型                                                    | 描述     | 默认值                             | 版本  |
| ----------- | ------------------------------------------------------- | -------- | ---------------------------------- | ----- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘样式 | <code>KeyboardStyle.Default</code> | 1.0.0 |

#### KeyboardResizeOptions

| 属性       | 类型                                                      | 描述                         | 版本  |
| ---------- | --------------------------------------------------------- | ---------------------------- | ----- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时的界面元素调整模式 | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### KeyboardInfo

| 属性                 | 类型                | 描述     | 版本  |
| -------------------- | ------------------- | -------- | ----- |
| **`keyboardHeight`** | <code>number</code> | 键盘高度 | 1.0.0 |

### Enums

#### KeyboardStyle

| 枚举值        | 值                     | 描述                                                                                                        | 版本  |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色键盘                                                                                                    | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色键盘                                                                                                    | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | iOS 13+ 设备根据系统外观自动适配（深色模式显示深色键盘，浅色模式显示浅色键盘），iOS 12 设备固定显示浅色键盘 | 1.0.0 |

#### KeyboardResize

| 枚举值       | 值                    | 描述                                                        | 版本  |
| ------------ | --------------------- | ----------------------------------------------------------- | ----- |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素（不改变视口尺寸，相对单位不受影响） | 1.0.0 |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素（专为 Ionic 框架应用设计）       | 1.0.0 |
| **`Native`** | <code>'native'</code> | 调整整个原生 WebView 尺寸（会影响 `vh` 相对单位）           | 1.0.0 |
| **`None`**   | <code>'none'</code>   | 不调整应用和 WebView 尺寸                                   | 1.0.0 |

</docgen-api>
