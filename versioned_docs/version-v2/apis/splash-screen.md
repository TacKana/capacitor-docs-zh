---
title: Splash Screen
description: 启动屏 API
contributors:
  - mlynch
  - jcesarmobile
  - trancee
canonicalUrl: https://capacitorjs.com/docs/apis/splash-screen
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 启动屏

启动屏 API 提供了显示或隐藏启动图片的方法。

- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [接口](#interfaces)

## 示例代码

```typescript
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

// 隐藏启动屏（应在应用启动时调用）
SplashScreen.hide();

// 无限期显示启动屏：
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

默认情况下，启动屏会在显示一定时间（3秒）后自动隐藏。但您的应用启动速度应该比这快得多！

为了确保为用户提供最快的应用加载体验，您必须在应用准备就绪时自动隐藏启动屏。只需在应用JS代码的顶部（如使用Angular时在`app.component.ts`中）添加`SplashScreen.hide()`调用。

如果您的应用加载时间超过3秒，可以通过在`capacitor.config.json`中设置`launchShowDuration`来调整默认显示时长：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 5000
    }
  }
}
```

如果希望确保启动屏在应用完全加载前不会隐藏，可在`capacitor.config.json`中将`launchAutoHide`设为`false`：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false
    }
  }
}
```

然后运行`npx cap copy`应用这些变更。

## 背景色

在某些情况下，特别是当启动屏未完全覆盖设备屏幕时，可能会看到应用界面从边角透出（由于透明背景）。您可以设置`backgroundColor`来填充这些区域，而不是显示透明色。

在`capacitor.config.json`中，`backgroundColor`的值可以是`#RGB`或`#ARGB`格式。

## 加载指示器

如需在启动屏上显示加载动画，在`capacitor.config.json`中将`showSpinner`设为`true`：

```json
{
  "plugins": {
    "SplashScreen": {
      "showSpinner": true
    }
  }
}
```

您可以通过以下配置自定义加载指示器的外观。

Android平台的`androidSpinnerStyle`可选值：

- horizontal
- small
- large（默认）
- inverse
- smallInverse
- largeInverse

iOS平台的`iosSpinnerStyle`可选值：

- large（默认）
- small

使用`spinnerColor`设置指示器颜色，值为`#RGB`或`#ARGB`格式。

然后运行`npx cap copy`应用这些变更。

## 全屏与沉浸式模式（仅Android）

启用`splashFullScreen`可隐藏状态栏，或启用`splashImmersive`同时隐藏状态栏和虚拟导航键。如果同时启用，`splashImmersive`优先级更高，因为它已包含`splashFullScreen`的功能。

## 配置参数

以下配置参数可在`capacitor.config.json`中使用：

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

### Android配置

如需使用非`splash.png`命名的启动图片，在`capacitor.config.json`中设置`androidSplashResourceName`为新资源名。此外，在`android/app/src/main/res/values/styles.xml`中修改以下代码块的资源名：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

## 示例指南

[为Capacitor项目添加自定义图标和启动屏图片 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[创建动态适配的Capacitor启动屏（Android版） &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API参考

### show(...)

```typescript
show(options?: SplashScreenShowOptions, callback?: Function) => Promise<void>
```

显示启动屏

| 参数           | 类型                                                                        |
| -------------- | --------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#splashscreenshowoptions">SplashScreenShowOptions</a></code> |
| **`callback`** | <code><a href="#function">Function</a></code>                               |

---

### hide(...)

```typescript
hide(options?: SplashScreenHideOptions, callback?: Function) => Promise<void>
```

隐藏启动屏

| 参数           | 类型                                                                        |
| -------------- | --------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#splashscreenhideoptions">SplashScreenHideOptions</a></code> |
| **`callback`** | <code><a href="#function">Function</a></code>                               |

---

### Interfaces

#### SplashScreenShowOptions

| 属性                  | 类型                 | 描述                                                 |
| --------------------- | -------------------- | ---------------------------------------------------- |
| **`autoHide`**        | <code>boolean</code> | 是否在showDuration后自动隐藏启动屏                   |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时长（毫秒），默认200ms                          |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时长（毫秒），默认200ms                          |
| **`showDuration`**    | <code>number</code>  | 当autoHide启用时显示启动屏的时长（毫秒），默认3000ms |

#### Function

创建一个新函数。

| 属性            | 类型                                          |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| 方法         | 签名                                                                                 | 描述                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | 调用函数，用指定对象替换函数的this值，用指定数组替换函数的参数                                                           |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 调用对象的方法，用另一个对象替换当前对象                                                                                 |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | 为给定函数创建一个绑定函数，该绑定函数与原始函数具有相同的函数体。绑定函数的this对象与指定对象关联，并具有指定的初始参数 |
| **toString** | () =&gt; string                                                                      | 返回函数的字符串表示形式                                                                                                 |

#### SplashScreenHideOptions

| 属性                  | 类型                | 描述                        |
| --------------------- | ------------------- | --------------------------- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时长（毫秒），默认200ms |
