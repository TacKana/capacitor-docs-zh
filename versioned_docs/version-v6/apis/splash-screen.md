---
title: Splash Screen Capacitor 插件 API
description: Splash Screen API 提供了显示或隐藏启动画面的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/splash-screen/src/definitions.ts
sidebar_label: Splash Screen
---

# @capacitor/splash-screen

Splash Screen API 提供了显示或隐藏启动画面的方法。

## 安装

```bash
npm install @capacitor/splash-screen
npx cap sync
```

### Android 12 Splash Screen API

_**这仅影响启动时的闪屏画面，使用程序化 `show()` 方法时不会生效。**_

Capacitor 4 使用 **[Android 12 Splash Screen API](https://developer.android.com/guide/topics/ui/splash-screen)** 和 `androidx.core:core-splashscreen` 兼容库，使其在 Android 11 及以下版本中正常工作。

可以通过修改 `android/app/src/main/res/values/styles.xml` 文件中 `AppTheme.NoActionBarLaunch` 的父主题从 `Theme.SplashScreen` 改为 `AppTheme.NoActionBar` 来禁用兼容库。
在 Android 12+ 上无法禁用 Android 12 Splash Screen API，因为它是 Android 操作系统的一部分。

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

**注意**：在 Android 12 和 Android 12L 设备上，当从第三方启动器（如 Nova Launcher、MIUI、Realme Launcher、OPPO Launcher 等）、设置应用中的应用信息页面或 Android Studio 等 IDE 启动时，闪屏画面可能不会显示。
**[Google Issue Tracker](https://issuetracker.google.com/issues/205021357)**
**[Google Issue Tracker](https://issuetracker.google.com/issues/207386164)**
Google 已在 Android 13 上修复这些问题，但不会将这些修复向后移植到 Android 12 和 Android 12L。
与启动器相关的问题可能会通过启动器更新得到修复。
如果您在 Android 13 上仍发现与闪屏相关的问题，请向 [Google](https://issuetracker.google.com/) 报告。

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏闪屏（应在应用启动时执行）
await SplashScreen.hide();

// 无限期显示闪屏：
await SplashScreen.show({
  autoHide: false,
});

// 显示闪屏两秒后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## 隐藏闪屏画面

默认情况下，闪屏画面会在 500 毫秒后自动隐藏。

如果希望确保闪屏不会在应用准备就绪前消失，可将 `launchAutoHide` 设为 `false`；这样闪屏将一直显示，直到手动隐藏。为了最佳用户体验，应用应尽快调用 `hide()`。

如果希望闪屏固定显示一段时间，可在 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中设置 `launchShowDuration`。

## 背景颜色

在某些情况下，特别是当闪屏未能完全覆盖设备屏幕时，可能会看到应用屏幕透过边角显示（由于透明效果）。您可以设置 `backgroundColor` 来覆盖这些区域，而不是显示透明色。

`backgroundColor` 的有效值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 加载指示器

如果希望在闪屏上方显示加载指示器，可在 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中将 `showSpinner` 设为 `true`。

可以通过以下配置自定义加载指示器的外观。

Android 的 `androidSpinnerStyle` 有以下选项：

- `horizontal`
- `small`
- `large` （默认）
- `inverse`
- `smallInverse`
- `largeInverse`

iOS 的 `iosSpinnerStyle` 有以下选项：

- `large` （默认）
- `small`

使用 `spinnerColor` 设置加载指示器颜色，值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

可用配置项：

| 属性                            | 类型                                                                                                                          | 描述                                                                                                                                                                                          | 默认值              | 版本      |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 autoHide 启用时，启动闪屏显示的时长（毫秒）                                                                                                                                                | <code>500</code>    | 1.0.0     |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏闪屏。                                                                                                                                                    | <code>true</code>   | 1.0.0     |
| **`launchFadeOutDuration`**     | <code>number</code>                                                                                                           | 启动闪屏淡出动画的持续时间（毫秒）仅在使用 Android 12 Splash Screen API 时适用于 Android。                                                                                                    | <code>200</code>    | 4.2.0     |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 闪屏背景颜色，格式为 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 或在 Android 12 API 启动时无效。                                                                                            |                     | 1.0.0     |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作闪屏的资源名称。在 Android 12 API 启动时无效。仅适用于 Android。                                                                                                                          | <code>splash</code> | 1.points0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType) 用于缩放闪屏图像。当 `useDialog` 为 true 或在 Android 12 API 启动时无效。仅适用于 Android。 | <code>FIT_XY</code> | 1.0.0     |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 是否在闪屏上显示加载指示器。当 `useDialog` 为 true 或在 Android 12 API 启动时无效。                                                                                                           |                     | 1.0.0     |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 加载指示器样式。当 `useDialog` 为 true 或在 Android 12 API 启动时无效。                                                                                                               | <code>large</code>  | 1.0.0     |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 加载指示器样式。当 `useDialog` 为 true 时无效。仅适用于 iOS。                                                                                                                             | <code>large</code>  | 1.0.0     |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器颜色，格式为 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 或在 Android 12 API 启动时无效。                                                                                          |                     | 1.0.0     |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 是否在闪屏上隐藏状态栏。在 Android 12 API 启动时无效。仅适用于 Android。                                                                                                                      |                     | 1.0.0     |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 是否在闪屏上隐藏状态栏和软件导航按钮。在 Android 12 API 启动时无效。仅适用于 Android。                                                                                                        |                     | 1.0.0     |
| **`layoutName`**                | <code>string</code>                                                                                                           | 当 `useDialog` 设为 true 时，配置对话框布局。若 `useDialog` 未设置或为 false，则使用布局替代 ImageView。在 Android 12 API 启动时无效。仅适用于 Android。                                      |                     | 1.1.0     |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 使用对话框替代 ImageView。若未配置 `layoutName`，将使用以闪屏图像为背景的布局。在 Android 12 API 启动时无效。仅适用于 Android。                                                               |                     | 1.1.0     |

### 配置示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "launchFadeOutDuration": 3000,
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
      launchFadeOutDuration: 3000,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

export default config;
```

</docgen-config>

### Android

要使用非默认名称 `splash.png` 的闪屏图像，可将 `androidSplashResourceName` 设为新资源名。此外，在 `android/app/src/main/res/values/styles.xml` 中修改以下代码块的资源名：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

### 变量

本插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `coreSplashScreenVersion`：`androidx.core:core-splashscreen` 的版本（默认：`1.0.1`）

## 示例指南

[为 Capacitor 项目添加自定义图标和闪屏图像 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor (Android) 创建动态/自适应闪屏 &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示闪屏画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**版本：** 1.0.0

---

### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏闪屏画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**版本：** 1.0.0

---

### Interfaces

#### ShowOptions

| 属性                  | 类型                 | 描述                                       | 默认值            | 版本  |
| --------------------- | -------------------- | ------------------------------------------ | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏闪屏         |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时间（毫秒）                           | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时间（毫秒）                           | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时，闪屏显示的时长（毫秒） | <code>3000</code> | 1.0.0 |

#### HideOptions

| 属性                  | 类型                | 描述                                                                                                                        | 默认值           | 版本  |
| --------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时间（毫秒）。在 Android 上，如果使用 Android 12 Splash Screen API，此参数无效，请改用 launchFadeOutDuration 配置选项。 | <code>200</code> | 1.0.0 |

</docgen-api>
