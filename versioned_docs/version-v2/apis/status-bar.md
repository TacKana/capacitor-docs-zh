---
title: 状态栏
description: 状态栏 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/status-bar
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 状态栏

状态栏 API 提供了配置状态栏样式以及显示或隐藏状态栏的方法。

- [`setStyle(...)`](#setstyle)
- [`setBackgroundColor(...)`](#setbackgroundcolor)
- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [`getInfo()`](#getinfo)
- [`setOverlaysWebView(...)`](#setoverlayswebview)
- [接口](#接口)
- [枚举](#枚举)

## iOS 注意事项

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance"（`UIViewControllerBasedStatusBarAppearance`）设置为 `YES`。请阅读[配置 iOS](/ios/configuration.md) 获取帮助。

状态栏可见性默认为可见，样式默认为 `StatusBarStyle.Light`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

`setBackgroundColor` 和 `setOverlaysWebView` 目前不支持 iOS 设备。

## 事件

- statusTap

## 示例

```typescript
// 事件（仅 iOS）
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
});

// API
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { StatusBar } = Plugins;

export class StatusBarExample {
  isStatusBarLight = true;

  changeStatusBar() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light,
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // 在透明状态栏下显示内容（仅 Android）
    StatusBar.setOverlaysWebView({
      overlay: true,
    });
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }
}
```

## API

### setStyle(...)

```typescript
setStyle(options: StatusBarStyleOptions) => Promise<void>
```

设置状态栏的当前样式

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarstyleoptions">StatusBarStyleOptions</a></code> |

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: StatusBarBackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarbackgroundcoloroptions">StatusBarBackgroundColorOptions</a></code> |

---

### show(...)

```typescript
show(options?: StatusBarAnimationOptions) => Promise<void>
```

显示状态栏

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### hide(...)

```typescript
hide(options?: StatusBarAnimationOptions) => Promise<void>
```

隐藏状态栏

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfoResult>
```

获取状态栏当前状态的信息

**返回：** <code>Promise&lt;<a href="#statusbarinforesult">StatusBarInfoResult</a>&gt;</code>

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: StatusBarOverlaysWebviewOptions) => Promise<void>
```

设置状态栏是否应覆盖 webview，以允许使用设备"刘海"周围的空间。

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaroverlayswebviewoptions">StatusBarOverlaysWebviewOptions</a></code> |

---

### 接口

#### StatusBarStyleOptions

| 属性 | 类型 |
| ----------- | ------------------------------------------------------- |
| **`style`** | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |

#### StatusBarBackgroundColorOptions

| 属性 | 类型 |
| ----------- | ------------------- |
| **`color`** | <code>string</code> |

#### StatusBarAnimationOptions

| 属性 | 类型 | 描述 |
| --------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`animation`** | <code><a href="#statusbaranimation">StatusBarAnimation</a></code> | 仅 iOS。显示或隐藏时使用的状态栏动画类型。 |

#### StatusBarInfoResult

| 属性 | 类型 |
| ------------ | ------------------------------------------------------- |
| **`visible`**  | <code>boolean</code>                                      |
| **`style`**    | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |
| **`color`**    | <code>string</code>                                       |
| **`overlays`** | <code>boolean</code>                                      |

#### StatusBarOverlaysWebviewOptions

| 属性 | 类型 |
| ------------- | -------------------- |
| **`overlay`** | <code>boolean</code> |

### 枚举

#### StatusBarStyle

| 成员 | 值 | 描述 |
| ----------- | -------------------- | -------------------------------- |
| **`Dark`**  | <code>"DARK"</code>  | 深色背景上的浅色文字。 |
| **`Light`** | <code>"LIGHT"</code> | 浅色背景上的深色文字。 |

#### StatusBarAnimation

| 成员 | 值 | 描述 |
| ----------- | -------------------- | --------------------------------- |
| **`None`**  | <code>"NONE"</code>  | 显示/隐藏时无动画。 |
| **`Slide`** | <code>"SLIDE"</code> | 显示/隐藏时滑动动画。 |
| **`Fade`**  | <code>"FADE"</code>  | 显示/隐藏时淡入淡出动画。 |
