---
title: 启动屏
description: 启动屏 API
contributors:
  - mlynch
  - jcesarmobile
  - trancee
canonicalUrl: https://capacitorjs.com/docs/apis/splash-screen
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 启动屏

启动屏 API 提供了显示或隐藏启动图片的方法。

- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

// 隐藏启动屏（您应在应用启动时执行此操作）
SplashScreen.hide();

// 显示启动屏，不限定时间：
SplashScreen.show({
  autoHide: false,
});

// 显示启动屏两秒后自动隐藏：
SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## 隐藏启动屏

默认情况下，启动屏设置为在一定时间（3 秒）后自动隐藏。但是，您的应用应该比这启动得快得多！

为了确保为用户提供最快的应用加载体验，您必须在应用准备好使用时自动隐藏启动屏。只需在应用 JS 的顶部附近添加 `SplashScreen.hide()` 调用即可，例如使用 Angular 时在 `app.component.ts` 中。

如果您的应用加载时间超过 3 秒，通过在 `capacitor.config.json` 中设置 `launchShowDuration` 来配置默认持续时间：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 5000
    }
  }
}
```

如果您想确保在应用完全加载之前启动屏永远不会隐藏，请在 `capacitor.config.json` 中将 `launchAutoHide` 设置为 `false`：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false
    }
  }
}
```

然后运行 `npx cap copy` 以应用这些更改。

## 背景颜色

在某些情况下，特别是当启动屏未完全覆盖设备屏幕时，可能会在角落看到应用屏幕（由于透明）。您可以在 `capacitor.config.json` 中设置 `backgroundColor` 来覆盖这些区域，而不是显示透明颜色。

`backgroundColor` 的允许值为 `#RGB` 或 `#ARGB`。

## 旋转指示器

如果您想在启动屏上显示旋转指示器，请在 `capacitor.config.json` 中将 `showSpinner` 设置为 `true`：

```json
{
  "plugins": {
    "SplashScreen": {
      "showSpinner": true
    }
  }
}
```

您可以通过以下配置自定义旋转指示器的外观。

对于 Android，`androidSpinnerStyle` 有以下选项：

- horizontal
- small
- large（默认）
- inverse
- smallInverse
- largeInverse

对于 iOS，`iosSpinnerStyle` 有以下选项：

- large（默认）
- small

要设置旋转指示器的颜色，请使用 `spinnerColor`，值为 `#RGB` 或 `#ARGB`。

然后运行 `npx cap copy` 以应用这些更改。

## 全屏和沉浸模式（仅 Android）

您可以启用 `splashFullScreen` 来隐藏状态栏，或启用 `splashImmersive` 来同时隐藏状态栏和软件导航按钮。如果两个选项都启用，`splashImmersive` 优先，因为它也实现了 `splashFullScreen` 的功能。

## 配置

以下配置参数可在 `capacitor.config.json` 中使用：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "showSpinner": true,
      "splashFullScreen": true,
      "splashImmersive": true
    }
  }
}
```

### Android

要使用非 `splash.png` 命名的启动屏图片，在 `capacitor.config.json` 中将 `androidSplashResourceName` 设置为新的资源名称。此外，在 `android/app/src/main/res/values/styles.xml` 中，更改以下块中的资源名称：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

## 示例指南

[添加您自己的图标和启动屏图片 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动屏（Android）&#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

### show(...)

```typescript
show(options?: SplashScreenShowOptions, callback?: Function) => Promise<void>
```

显示启动屏

| 参数 | 类型 |
| -------------- | --------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#splashscreenshowoptions">SplashScreenShowOptions</a></code> |
| **`callback`** | <code><a href="#function">Function</a></code>                               |

---

### hide(...)

```typescript
hide(options?: SplashScreenHideOptions, callback?: Function) => Promise<void>
```

隐藏启动屏

| 参数 | 类型 |
| -------------- | --------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#splashscreenhideoptions">SplashScreenHideOptions</a></code> |
| **`callback`** | <code><a href="#function">Function</a></code>                               |

---

### 接口

#### SplashScreenShowOptions

| 属性 | 类型 | 描述 |
| --------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏启动屏 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入持续时间（毫秒）。默认为 200ms |
| **`fadeOutDuration`** | <code>number</code>  | 淡出持续时间（毫秒）。默认为 200ms |
| **`showDuration`**    | <code>number</code>  | 启用 autoHide 时显示启动屏的持续时间（毫秒）。默认为 3000ms |

#### Function

创建一个新函数。

| 属性 | 类型 |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| 方法 | 签名 | 描述 |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | 调用函数，并用指定对象替换函数的 this 值，用指定数组替换函数的参数。 |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 调用一个对象的方法，用另一个对象替换当前对象。 |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 对于给定的函数，创建一个与原函数具有相同函数体的绑定函数。绑定函数的 this 对象与指定对象关联，并具有指定的初始参数。 |
| **toString** | () =&gt; string | 返回函数的字符串表示形式。 |

#### SplashScreenHideOptions

| 属性 | 类型 | 描述 |
| --------------------- | ------------------- | ---------------------------------------------- |
| **`fadeOutDuration`** | <code>number</code> | 淡出持续时间（毫秒）。默认为 200ms |
