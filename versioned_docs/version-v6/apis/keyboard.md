---
title: Keyboard Capacitor Plugin API
description: Keyboard API 提供键盘显示与可见性控制功能，可追踪键盘显示和隐藏事件。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/keyboard/src/definitions.ts
sidebar_label: Keyboard
---

# @capacitor/keyboard

Keyboard API 提供键盘显示与可见性控制功能，可追踪键盘显示和隐藏事件。

## 安装

```bash
npm install @capacitor/keyboard
npx cap sync
```

## 示例

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', (info) => {
  console.log('键盘即将显示，高度为：', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', (info) => {
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

在 iOS 平台，键盘可以通过以下选项进行配置：

| 属性                     | 类型                                                      | 说明                                                                                                                                               | 默认值              | 版本  |
| ------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`resize`**             | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用的调整方式。仅 iOS 平台可用                                                                                                      | <code>native</code> | 1.0.0 |
| **`style`**              | <code><a href="#keyboardstyle">KeyboardStyle</a></code>   | 当应用不支持暗黑/明亮主题切换时，可强制设置键盘样式。未设置时，键盘样式将跟随设备外观。仅 iOS 平台可用                                             |                     | 1.0.0 |
| **`resizeOnFullScreen`** | <code>boolean</code>                                      | 修复 Android 系统在应用全屏模式下（如使用 StatusBar 插件覆盖状态栏时）无法调整 WebView 尺寸的 bug。设为 true 可启用该修复方案。仅 Android 平台可用 |                     | 1.1.0 |

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

为保持与 [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) 的兼容性，
以下事件也可以通过 `window.addEventListener` 监听：

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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show()

```typescript
show() => Promise<void>
```

显示键盘（此方法为 alpha 版本，可能存在缺陷）。

仅 Android 平台支持。

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

设置键盘辅助工具栏的可见性。对于短表单（登录、注册等），建议禁用辅助工具栏以获得更简洁的 UI。

仅 iPhone 设备支持。

| 参数          | 类型                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ isVisible: boolean; }</code> |

**版本：** 1.0.0

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

通过编程方式启用或禁用 WebView 滚动。

仅 iOS 平台支持。

| 参数          | 类型                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ isDisabled: boolean; }</code> |

**版本：** 1.0.0

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

通过编程方式设置键盘样式。

仅 iOS 平台支持。

| 参数          | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**版本：** 1.0.0

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

通过编程方式设置调整模式。

仅 iOS 平台支持。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**版本：** 1.0.0

---

### getResizeMode()

```typescript
getResizeMode() => Promise<KeyboardResizeOptions>
```

获取当前设置的调整模式。

仅 iOS 平台支持。

**返回值：** <code>Promise&lt;<a href="#keyboardresizeoptions">KeyboardResizeOptions</a>&gt;</code>

**版本：** 4.0.0

---

### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘即将显示事件。

在 Android 平台上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

---

### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

监听键盘已显示事件。

在 Android 平台上，keyboardWillShow 和 keyboardDidShow 几乎同时触发。

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

---

### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘即将隐藏事件。

在 Android 平台上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| 参数               | 类型                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>'keyboardWillHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

---

### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听键盘已隐藏事件。

在 Android 平台上，keyboardWillHide 和 keyboardDidHide 几乎同时触发。

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'keyboardDidHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件所有原生事件监听器。

**版本：** 1.0.0

---

### Interfaces

#### KeyboardStyleOptions

| 属性        | 类型                                                    | 说明     | 默认值                             | 版本  |
| ----------- | ------------------------------------------------------- | -------- | ---------------------------------- | ----- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘样式 | <code>KeyboardStyle.Default</code> | 1.0.0 |

#### KeyboardResizeOptions

| 属性       | 类型                                                      | 说明                   | 版本  |
| ---------- | --------------------------------------------------------- | ---------------------- | ----- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时元素调整方式 | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### KeyboardInfo

| 属性                 | 类型                | 说明     | 版本  |
| -------------------- | ------------------- | -------- | ----- |
| **`keyboardHeight`** | <code>number</code> | 键盘高度 | 1.0.0 |

### Enums

#### KeyboardStyle

| 枚举值        | 值                     | 说明                                                                                                        | 版本  |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 暗黑风格键盘                                                                                                | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 明亮风格键盘                                                                                                | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | iOS 13+ 设备根据系统外观自动切换（暗黑模式显示暗黑键盘，明亮模式显示明亮键盘），iOS 12 设备固定显示明亮键盘 | 1.0.0 |

#### KeyboardResize

| 枚举值       | 值                    | 说明                                                    | 版本  |
| ------------ | --------------------- | ------------------------------------------------------- | ----- |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素（因视口不变，相对单位不受影响） | 1.0.0 |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素（仅适用于 Ionic 框架应用）   | 1.0.0 |
| **`Native`** | <code>'native'</code> | 调整整个原生 Web View（会影响 `vh` 相对单位）           | 1.0.0 |
| **`None`**   | <code>'none'</code>   | 不调整应用和 Web View                                   | 1.0.0 |

</docgen-api>
