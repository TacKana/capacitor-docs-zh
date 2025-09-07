---
title: Keyboard
description: 键盘API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/keyboard
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

键盘API提供键盘显示与可见性控制功能，并能追踪键盘显示/隐藏事件。

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
- [接口](#interfaces)
- [枚举](#enums)

## 兼容cordova-plugin-ionic-keyboard的窗口事件

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

// API调用

Keyboard.setAccessoryBarVisible({ isVisible: false });

Keyboard.show(); // 显示键盘

Keyboard.hide(); // 隐藏键盘
```

## 键盘配置（仅iOS）

在`capacitor.config.json`中可为iOS平台配置以下键盘参数：

- `resize`: 控制键盘出现时应用的调整方式
  可选值包括：
  - `none`: 不调整应用和WebView
  - `native`: （默认）键盘显示/隐藏时调整整个原生WebView，会影响`vh`相对单位
  - `body`: 仅调整HTML的`<body>`元素，视口不变因此不影响相对单位
  - `ionic`: 仅调整ionic应用的ion-app元素

- `style`: 设为`dark`将使用深色风格键盘

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

显示键盘（此方法为Alpha版本，可能存在问题）

---

### hide()

```typescript
hide() => Promise<void>
```

隐藏键盘

---

### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

设置键盘辅助栏的可见性。建议在登录/注册等简短表单中禁用辅助栏以获得更简洁的UI

| 参数          | 类型                                 |
| ------------- | ------------------------------------ |
| **`options`** | `{ isVisible: boolean; }` |

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

通过编程方式启用/禁用WebView滚动

| 参数          | 类型                                  |
| ------------- | ------------------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

通过编程设置键盘样式

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

通过编程设置调整模式

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

移除该插件的所有原生监听器

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

| 枚举值     | 值                |
| ----------- | -------------------- |
| **`Dark`**  | <code>"DARK"</code>  |
| **`Light`** | <code>"LIGHT"</code> |

#### KeyboardResize

| 枚举值      | 值                 |
| ------------ | --------------------- |
| **`Body`**   | <code>"body"</code>   |
| **`Ionic`**  | <code>"ionic"</code>  |
| **`Native`** | <code>"native"</code> |
| **`None`**   | <code>"none"</code>   |