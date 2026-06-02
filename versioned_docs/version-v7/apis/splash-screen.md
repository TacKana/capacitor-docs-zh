---
title: Splash Screen - Capacitor 插件 API
description: Splash Screen API 提供了显示或隐藏启动画面图像的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/splash-screen/src/definitions.ts
sidebar_label: Splash Screen
translated: true
---

# @capacitor/splash-screen

Splash Screen API 提供了显示或隐藏启动画面图像的方法。

## 安装

```bash
npm install @capacitor/splash-screen@latest-7
npx cap sync
```

### Android 12 启动画面 API

_**这仅影响启动时的启动画面，在使用编程式 `show()` 方法时不会用到。**_

Capacitor 4 使用 **[Android 12 启动画面 API](https://developer.android.com/guide/topics/ui/splash-screen)** 和 `androidx.core:core-splashscreen` 兼容库，使其在 Android 11 及更低版本上也能正常工作。

可以通过在 `android/app/src/main/res/values/styles.xml` 中将 `AppTheme.NoActionBarLaunch` 的父主题从 `Theme.SplashScreen` 更改为 `AppTheme.NoActionBar` 来禁用兼容库。
Android 12 启动画面 API 在 Android 12+ 上无法禁用，因为它是 Android 操作系统的一部分。

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

**注意**：在 Android 12 和 Android 12L 设备上，从第三方启动器（如 Nova Launcher、MIUI、Realme Launcher、OPPO Launcher 等）、设置应用中的应用信息或 Android Studio 等 IDE 启动时，启动画面图像不会显示。
**[Google Issue Tracker](https://issuetracker.google.com/issues/205021357)**
**[Google Issue Tracker](https://issuetracker.google.com/issues/207386164)**
Google 已在 Android 13 上修复了这些问题，但不会将修复程序回溯到 Android 12 和 Android 12L。
与启动器相关的问题可能会通过启动器更新得到修复。
如果您在 Android 13 上仍发现与启动画面相关的问题，请向 [Google](https://issuetracker.google.com/) 报告。

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动画面（您应该在应用启动时执行此操作）
await SplashScreen.hide();

// 无限期显示启动画面：
await SplashScreen.show({
  autoHide: false,
});

// 显示启动画面两秒后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## 隐藏启动画面

默认情况下，启动画面设置为在 500 毫秒后自动隐藏。

如果您想确保启动画面在应用准备好之前不会消失，请将 `launchAutoHide` 设置为 `false`；启动画面将保持可见直到手动隐藏。为获得最佳用户体验，您的应用应尽快调用 `hide()`。

相反，如果您想固定时间显示启动画面，请在您的 [Capacitor 配置文件](https://capacitorjs.com/docs/config)中设置 `launchShowDuration`。

## 背景颜色

在某些情况下，特别是当启动画面没有完全覆盖设备屏幕时，应用屏幕可能会在角落处可见（由于透明度）。您可以设置 `backgroundColor` 来覆盖这些区域，而不是显示透明颜色。

`backgroundColor` 的可能值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 加载指示器

如果您想在启动画面上显示加载指示器，请在您的 [Capacitor 配置文件](https://capacitorjs.com/docs/config)中将 `showSpinner` 设置为 `true`。

您可以使用以下配置自定义加载指示器的外观。

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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

以下配置值可用：

| 属性                             | 类型                                                                                                                          | 描述                                                                                                                                                                                                                                             | 默认值              | 自从 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 autoHide 启用时，启动时启动画面显示的时间（毫秒）                                                                                                                                                                              | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏启动画面。                                                                                                                                                                                               | <code>true</code>   | 1.0.0 |
| **`launchFadeOutDuration`**     | <code>number</code>                                                                                                           | 启动时启动画面淡出动画的持续时间（毫秒）。仅适用于 Android，使用 Android 12 启动画面 API 时。                                                                                                        | <code>200</code>    | 4.2.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面背景颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。如果 `useDialog` 为 true 或启动时使用 Android 12 API 则无效。                                                                                       |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作启动画面的资源名称。启动时使用 Android 12 API 则无效。仅适用于 Android。                                                                                                                      | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | 用于缩放启动画面图像的 [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)。如果 `useDialog` 为 true 或启动时使用 Android 12 API 则无效。仅适用于 Android。 | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 在启动画面上显示加载指示器。如果 `useDialog` 为 true 或启动时使用 Android 12 API 则无效。                                                                                                                            |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 加载指示器的样式。如果 `useDialog` 为 true 或启动时使用 Android 12 API 则无效。                                                                                                                                           | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 加载指示器的样式。如果 `useDialog` 为 true 则无效。仅适用于 iOS。                                                                                                                                                                   | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器的颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。如果 `useDialog` 为 true 或启动时使用 Android 12 API 则无效。                                                                                                               |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 在启动画面上隐藏状态栏。启动时使用 Android 12 API 则无效。仅适用于 Android。                                                                                                                              |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 在启动画面上隐藏状态栏和软件导航按钮。启动时使用 Android 12 API 则无效。仅适用于 Android。                                                                                          |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 如果 `useDialog` 设置为 true，配置对话框布局。如果 `useDialog` 未设置或为 false，使用布局替代 ImageView。启动时使用 Android 12 API 则无效。仅适用于 Android。                                 |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 使用 Dialog 替代 ImageView。如果未配置 `layoutName`，将使用以启动图像为背景的布局。启动时使用 Android 12 API 则无效。仅适用于 Android。                                |                     | 1.1.0 |

### 示例

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

要使用名称不是 `splash.png` 的启动画面图像，请将 `androidSplashResourceName` 设置为新的资源名称。此外，在 `android/app/src/main/res/values/styles.xml` 中，更改以下块中的资源名称：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

### 变量

此插件将使用以下项目变量（在您的应用的 `variables.gradle` 文件中定义）：

- `coreSplashScreenVersion` 版本 `androidx.core:core-splashscreen`（默认值：`1.0.1`）

## 示例指南

[添加您自己的图标和启动画面图像 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动画面（Android）&#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [Interfaces](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**自从:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**自从:** 1.0.0

--------------------


### 接口


#### ShowOptions

| 属性                   | 类型                 | 描述                                                         | 默认值            | 自从 |
| --------------------- | -------------------- | ------------------------------------------------------------------- | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏启动画面                  |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入持续时间（毫秒）。                                        | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出持续时间（毫秒）。                                       | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时，启动画面显示的时间（毫秒） | <code>3000</code> | 1.0.0 |


#### HideOptions

| 属性                   | 类型                | 描述                                                                                                                                                       | 默认值           | 自从 |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出持续时间（毫秒）。在 Android 上，如果使用 Android 12 启动画面 API，则不使用此值。请改用 launchFadeOutDuration 配置选项。 | <code>200</code> | 1.0.0 |

</docgen-api>
