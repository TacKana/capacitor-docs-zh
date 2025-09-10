---
title: Keyboard Capacitor Plugin API
description: Keyboard API 提供键盘显示与可见性控制功能，并能追踪键盘显示和隐藏事件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts
sidebar_label: Keyboard
---

# @capacitor/keyboard

Keyboard API 提供键盘显示与可见性控制功能，并能追踪键盘显示和隐藏事件。

## 安装

```bash
npm install @capacitor/keyboard
npx cap sync
```

## 使用示例

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

## 配置项

<docgen-config>

在 iOS 平台上，键盘可通过以下选项进行配置：

| 属性                     | 类型                                                      | 描述                                                                                                                                                                                                         | 默认值              | 版本  |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----- |
| **`resize`**             | <code><a href="#keyboardresize">KeyboardResize</a></code> | 配置键盘出现时应用窗口的调整方式。仅限 iOS 平台                                                                                                                                                              | <code>native</code> | 1.0.0 |
| **`style`**              | <code>'dark' \| 'light'</code>                            | 如果应用不支持深色/浅色主题切换，可强制设置键盘样式。未设置时，键盘样式将跟随设备外观。仅限 iOS 平台                                                                                                         |                     | 1.0.0 |
| **`resizeOnFullScreen`** | <code>boolean</code>                                      | Android 存在一个系统缺陷：当应用处于全屏模式时（如使用 StatusBar 插件覆盖状态栏），键盘无法调整 WebView 尺寸。将此设置设为 true 可启用一个解决方案，即使在全屏模式下也能调整 WebView 尺寸。仅限 Android 平台 |                     | 1.1.0 |

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
      resize: 'body',
      decorates: 'dark',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
```

</docgen-config>

## 与 `cordova-plugin-ionic-keyboard` 的兼容性

为保持与 [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) 的兼容性，
以下事件也可通过 `window.addEventListener` 监听：

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`

## API 参考

<docgen-index>

- [`show()`](#show)
- [`hide()`](#hide)
- [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
- [`setScroll(...)`](#setscroll)
- [`setStyle(...)`](#setstyle)
- [`setResizeMode(...)`](#setresizemode)
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

显示键盘。此方法为 alpha 版本，可能存在缺陷。

仅在 Android 平台支持。

**版本:** 1.0.0

---

### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

**版本:** 1.0.0

---

### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘附属工具栏是否可见。对于短表单（登录、注册等），我们建议禁用附属工具栏以获得更简洁的 UI。

仅在 iPhone 设备支持。

| 参数          | 类型                      |
| ------------- | ------------------------- |
| **`options`** | `{ isVisible: boolean; }` |

**版本:** 1.0.0

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用或禁用 WebView 滚动。

仅在 iOS 平台支持。

| 参数          | 类型                       |
| ------------- | -------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

**版本:** 1.0.0

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

仅在 iOS 平台支持。

| 参数          | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

**版本:** 1.0.0

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置调整模式。

仅在 iOS 平台支持。

| 参数          | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

**版本:** 1.0.0

---

### addListener('keyboardWillShow', ...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将显示事件。

| 参数               | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardWillShow'</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('keyboardDidShow', ...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已显示事件。

| 参数               | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>'keyboardDidShow'</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('keyboardWillHide', ...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘即将隐藏事件。

| 参数               | Type                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>'keyboardWillHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('keyboardDidHide', ...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听键盘已隐藏事件。

| 参数               | Type                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'keyboardDidHide'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件的所有原生监听器。

**版本:** 1.0.0

---

### Interfaces

#### KeyboardStyleOptions

| 属性        | 类型                                                    | 描述     | 默认值                             | 版本  |
| ----------- | ------------------------------------------------------- | -------- | ---------------------------------- | ----- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> | 键盘样式 | <code>KeyboardStyle.Default</code> | 1.0.0 |

#### KeyboardResizeOptions

| 属性       | 类型                                                      | 描述                     | 版本  |
| ---------- | --------------------------------------------------------- | ------------------------ | ----- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> | 键盘出现时调整元素的模式 | 1.0.0 |

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

| 枚举值        | 值                     | 描述                                                                                                                                       | 版本  |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色键盘                                                                                                                                   | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色键盘                                                                                                                                   | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 在 iOS 13 及以上版本中，键盘样式基于设备外观。如设备使用深色模式，键盘则为深色；如使用浅色模式，键盘则为浅色。在 iOS 12 中键盘始终为浅色。 | 1.0.0 |

#### KeyboardResize

| 枚举值       | 值                    | 描述                                                                 | 版本  |
| ------------ | --------------------- | -------------------------------------------------------------------- | ----- |
| **`Body`**   | <code>'body'</code>   | 仅调整 `body` HTML 元素尺寸。相对单位不受影响，因为视口未改变。      | 1.0.0 |
| **`Ionic`**  | <code>'ionic'</code>  | 仅调整 `ion-app` HTML 元素尺寸。仅适用于 Ionic Framework 应用。      | 1.0.0 |
| **`Native`** | <code>'native'</code> | 键盘显示/隐藏时将调整整个原生 WebView 尺寸。这会影响 `vh` 相对单位。 | 1.0.0 |
| **`None`**   | <code>'none'</code>   | 应用和 WebView 都不调整尺寸                                          | 1.0.0 |

</docgen-api>
