---
title: Status Bar
description: 状态栏 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/status-bar
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 状态栏

StatusBar API 提供配置状态栏样式以及显示/隐藏状态栏的方法。

- [`setStyle(...)`](#setstyle)
- [`setBackgroundColor(...)`](#setbackgroundcolor)
- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [`getInfo()`](#getinfo)
- [`setOverlaysWebView(...)`](#setoverlayswebview)
- [接口](#interfaces)
- [枚举](#enums)

## iOS 注意事项

本插件要求 `Info.plist` 文件中将 "基于视图控制器的状态栏外观" (`UIViewControllerBasedStatusBarAppearance`) 设为 `YES`。如需帮助请参阅 [iOS 配置](/ios/configuration.md)。

状态栏默认可见且样式默认为 `StatusBarStyle.Light`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来修改默认设置。

目前 iOS 设备不支持 `setBackgroundColor` 和 `setOverlaysWebView` 方法。

## 事件

- statusTap (状态栏点击事件)

## 示例

```typescript
// 事件监听 (仅iOS)
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
});

// API 调用
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { StatusBar } = Plugins;

export class StatusBarExample {
  isStatusBarLight = true;

  changeStatusBar() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light,
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // 让内容显示在透明状态栏下方 (仅Android)
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

设置状态栏当前样式

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarstyleoptions">StatusBarStyleOptions</a></code> |

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: StatusBarBackgroundColorOptions) => Promise<void>
```

设置状态栏背景颜色

| 参数          | 类型                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarbackgroundcoloroptions">StatusBarBackgroundColorOptions</a></code> |

---

### show(...)

```typescript
show(options?: StatusBarAnimationOptions) => Promise<void>
```

显示状态栏

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### hide(...)

```typescript
hide(options?: StatusBarAnimationOptions) => Promise<void>
```

隐藏状态栏

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfoResult>
```

获取状态栏当前状态信息

**返回值:** <code>Promise&lt;<a href="#statusbarinforesult">StatusBarInfoResult</a>&gt;</code>

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: StatusBarOverlaysWebviewOptions) => Promise<void>
```

设置状态栏是否覆盖 WebView，以便利用设备"刘海"周围的空间

| 参数          | 类型                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaroverlayswebviewoptions">StatusBarOverlaysWebviewOptions</a></code> |

---

### 接口

#### StatusBarStyleOptions

| 属性        | 类型                                                      |
| ----------- | --------------------------------------------------------- |
| **`style`** | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |

#### StatusBarBackgroundColorOptions

| 属性        | 类型                |
| ----------- | ------------------- |
| **`color`** | <code>string</code> |

#### StatusBarAnimationOptions

| 属性              | 类型                                                              | 描述                                                                 |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| **`animation`**   | <code><a href="#statusbaranimation">StatusBarAnimation</a></code> | 仅iOS。显示或隐藏状态栏时使用的动画类型。                             |

#### StatusBarInfoResult

| 属性            | 类型                                                      |
| --------------- | --------------------------------------------------------- |
| **`visible`**   | <code>boolean</code>                                      |
| **`style`**     | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |
| **`color`**     | <code>string</code>                                       |
| **`overlays`**  | <code>boolean</code>                                      |

#### StatusBarOverlaysWebviewOptions

| 属性           | 类型                 |
| -------------- | -------------------- |
| **`overlay`**  | <code>boolean</code> |

### 枚举

#### StatusBarStyle

| 枚举值       | 值                   | 描述                        |
| ----------- | -------------------- | --------------------------- |
| **`Dark`**  | <code>"DARK"</code>  | 深色背景使用浅色文字。      |
| **`Light`** | <code>"LIGHT"</code> | 浅色背景使用深色文字。      |

#### StatusBarAnimation

| 枚举值       | 值                   | 描述                        |
| ----------- | -------------------- | --------------------------- |
| **`None`**  | <code>"NONE"</code>  | 显示/隐藏时不使用动画。     |
| **`Slide`** | <code>"SLIDE"</code> | 显示/隐藏时使用滑动动画。   |
| **`Fade`**  | <code>"FADE"</code>  | 显示/隐藏时使用淡入淡出动画。 |