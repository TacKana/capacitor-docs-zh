---
title: Keyboard
description: Keyboard API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/keyboard
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

Keyboard API 提供了键盘显示和可见性控制功能，以及键盘显示和隐藏时的事件追踪。

- [`show()`](#show)
- [`hide()`](#hide)
- [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
- [`setScroll(...)`](#setscroll)
- [`setStyle(...)`](#setstyle)
- [`setResizeMode(...)`](#setresizemode)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)
- [枚举](#枚举)

## 用于 cordova-plugin-ionic-keyboard 兼容性的窗口事件

- keyboardWillShow
- keyboardDidShow
- keyboardWillHide
- keyboardDidHide

## 示例

```typescript
import { Plugins, KeyboardInfo } from '@capacitor/core';

const { Keyboard } = Plugins;

// 键盘插件事件

Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
  console.log('键盘即将显示，高度为', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
  console.log('键盘已显示，高度为', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('键盘即将隐藏');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('键盘已隐藏');
});

// 窗口事件

window.addEventListener('keyboardWillShow', (e) => {
  console.log('键盘即将显示，高度为', (<any>e).keyboardHeight);
});

window.addEventListener('keyboardDidShow', (e) => {
  console.log('键盘已显示，高度为', (<any>e).keyboardHeight);
});

window.addEventListener('keyboardWillHide', () => {
  console.log('键盘即将隐藏');
});

window.addEventListener('keyboardDidHide', () => {
  console.log('键盘已隐藏');
});

// API

Keyboard.setAccessoryBarVisible({ isVisible: false });

Keyboard.show();

Keyboard.hide();
```

## 键盘配置（仅限 iOS）

键盘插件允许在 `capacitor.config.json` 文件中为 iOS 平台添加以下配置值：

- `resize`: 配置键盘出现时应用程序的调整方式。
  允许的值包括：

  - `none`: 应用程序和 webview 都不会调整大小
  - `native`: （默认）整个原生 webview 将在键盘显示/隐藏时调整大小，这将影响 `vh` 相对单位。
  - `body`: 仅 HTML `<body>` 元素会被调整大小。相对单位不受影响，因为视口不会改变。
  - `ionic`: 仅 HTML ion-app 元素会被调整大小。仅适用于 Ionic 应用。

- `style`: 如果设置为 `dark`，将使用深色风格的键盘代替常规键盘。

```json
{
  "plugins": {
    "Keyboard": {
      "resize": "body",
      "style": "dark"
    }
  }
}
```

## API

### show()

```typescript
show() => Promise<void>
```

显示键盘。此方法处于 alpha 阶段，可能存在一些问题。

---

### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘。

---

### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘上的辅助栏是否可见。对于较短的表单（登录、注册等），我们建议禁用辅助栏以提供更简洁的 UI。

| 参数          | 类型                               |
| ------------- | ---------------------------------- |
| **`options`** | `{ isVisible: boolean; }` |

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

以编程方式启用或禁用 WebView 滚动。

| 参数          | 类型                                |
| ------------- | ----------------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

以编程方式设置键盘样式。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

以编程方式设置调整大小模式。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => PluginListenerHandle
```

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>"keyboardWillShow"</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => PluginListenerHandle
```

| 参数               | 类型                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>"keyboardDidShow"</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => PluginListenerHandle
```

| 参数               | 类型                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>"keyboardWillHide"</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => PluginListenerHandle
```

| 参数               | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>"keyboardDidHide"</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器。

---

### 接口

#### KeyboardStyleOptions

| 属性        | 类型                                                    |
| ----------- | ------------------------------------------------------- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> |
#### KeyboardResizeOptions

| 属性       | 类型                                                      |
| ---------- | --------------------------------------------------------- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### KeyboardInfo

| 属性                 | 类型                |
| -------------------- | ------------------- |
| **`keyboardHeight`** | <code>number</code> |

### 枚举

#### KeyboardStyle

| 成员     | 值                |
| ----------- | -------------------- |
| **`Dark`**  | <code>"DARK"</code>  |
| **`Light`** | <code>"LIGHT"</code> |

#### KeyboardResize

| 成员      | 值                 |
| ------------ | --------------------- |
| **`Body`**   | <code>"body"</code>   |
| **`Ionic`**  | <code>"ionic"</code>  |
| **`Native`** | <code>"native"</code> |
| **`None`**   | <code>"none"</code>   |