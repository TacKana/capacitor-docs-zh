---
title: Splash Screen Capacitor 插件 API
description: Splash Screen API 提供显示或隐藏启动画面的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts
sidebar_label: Splash Screen
translated: true
---

# @capacitor/splash-screen

Splash Screen API 提供显示或隐藏启动画面的方法。

## 安装

```bash
npm install @capacitor/splash-screen
npx cap sync
```

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动画面（应在应用启动时执行）
await SplashScreen.hide();

// 无限期显示启动画面：
await SplashScreen.show({
  autoHide: false
});

// 显示启动画面两秒后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true
});
```

## 隐藏启动画面

默认情况下，启动画面设置为在 500 毫秒后自动隐藏。

如果您想确保启动画面在应用准备好之前不会消失，请将 `launchAutoHide` 设置为 `false`；启动画面将保持可见直到手动隐藏。为获得最佳用户体验，您的应用应尽快调用 `hide()`。

如果您希望启动画面显示固定时间，请在您的 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中设置 `launchShowDuration`。

## 背景颜色

在某些情况下，特别是当启动画面未完全覆盖设备屏幕时，可能会在角落周围看到应用屏幕（由于透明）。您可以设置一个 `backgroundColor` 来覆盖这些区域，而不是显示透明颜色。

`backgroundColor` 的可能值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 加载指示器

如果您想在启动画面上方显示加载指示器，请在您的 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中将 `showSpinner` 设置为 `true`。

您可以通过以下配置自定义加载指示器的外观。

对于 Android，`androidSpinnerStyle` 有以下选项：
- `horizontal`
- `small`
- `large`（默认）
- `inverse`
- `smallInverse`
- `largeInverse`

对于 iOS，`iosSpinnerStyle` 有以下选项：
- `large`（默认）
- `small`

要设置加载指示器的颜色，请使用 `spinnerColor`，值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 配置

<docgen-config>


这些配置值可用：

| Prop                            | Type                                                                                                                          | Description                                                                                                                                                                                                  | Default             | Since |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 autoHide 启用时，启动画面显示的时间（毫秒）                                                                                                                                                   | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏启动画面。                                                                                                                                                    | <code>true</code>   | 1.0.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面背景颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。如果使用 `useDialog` 则不生效。                                                                                       |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作启动画面的资源名称。仅适用于 Android。                                                                                                                                 | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | 用于缩放启动画面图像的 [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)。如果使用 `useDialog` 则不生效。仅适用于 Android。 | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 在启动画面上显示加载指示器。如果使用 `useDialog` 则不生效。                                                                                                                            |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 加载指示器的样式。如果使用 `useDialog` 则不生效。                                                                                                                                           | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 加载指示器的样式。如果使用 `useDialog` 则不生效。仅适用于 iOS。                                                                                                                        | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器的颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。如果使用 `useDialog` 则不生效。                                                                                                               |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 在启动画面上隐藏状态栏。仅适用于 Android。                                                                                                                                         |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 在启动画面上隐藏状态栏和软件导航按钮。仅适用于 Android。                                                                                                                                                                     |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 如果 `useDialog` 设为 true，则配置 Dialog 布局。如果 `useDialog` 未设置或为 false，则使用布局替代 ImageView。仅适用于 Android。                                            |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 使用 Dialog 替代 ImageView。如果未配置 `layoutName`，将使用以启动图片为背景的布局。仅适用于 Android。                                           |                     | 1.1.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
```

</docgen-config>

### Android

要使用非 `splash.png` 命名的启动画面图像，请将 `androidSplashResourceName` 设置为新的资源名称。此外，在 `android/app/src/main/res/values/styles.xml` 中，更改以下块中的资源名称：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

## 示例指南

[添加您自己的图标和启动画面图像 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动画面（Android）&#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示启动画面

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**Since:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏启动画面

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowOptions

| Prop                  | Type                 | Description                                                         | Default           | Since |
| --------------------- | -------------------- | ------------------------------------------------------------------- | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏启动画面。                  |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时间（毫秒）。                                        | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时间（毫秒）。                                       | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时，启动画面显示的时间（毫秒）。 | <code>3000</code> | 1.0.0 |


#### HideOptions

| Prop                  | Type                | Description                   | Default          | Since |
| --------------------- | ------------------- | ----------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时间（毫秒）。 | <code>200</code> | 1.0.0 |

</docgen-api>
