---
title: Splash Screen Capacitor Plugin API
description: Splash Screen API 提供了显示或隐藏启动画面的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/splash-screen/src/definitions.ts
sidebar_label: 启动画面
---

# @capacitor/splash-screen

Splash Screen API 提供了显示或隐藏启动画面的方法。

## 安装

```bash
npm install @capacitor/splash-screen@latest-5
npx cap sync
```

### Android 12 启动画面 API

_**此功能仅影响启动时的初始画面，在使用编程式 `show()` 方法时不会生效。**_

Capacitor 4 使用 **[Android 12 启动画面 API](https://developer.android.com/guide/topics/ui/splash-screen)** 和 `androidx.core:core-splashscreen` 兼容库来确保在 Android 11 及以下版本正常工作。

可以通过修改 `android/app/src/main/res/values/styles.xml` 文件中 `AppTheme.NoActionBarLaunch` 的父主题从 `Theme.SplashScreen` 改为 `AppTheme.NoActionBar` 来禁用兼容库。在 Android 12+ 设备上无法禁用该 API，因为它是 Android 系统的一部分。

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

**注意**：在 Android 12 和 12L 设备上，当通过第三方启动器（如 Nova Launcher、MIUI、Realme Launcher、OPPO Launcher 等）、设置应用中的应用信息或 Android Studio 等 IDE 启动时，启动画面可能不会显示。  
**[Google 问题追踪](https://issuetracker.google.com/issues/205021357)**  
**[Google 问题追踪](https://issuetracker.google.com/issues/207386164)**  
Google 已在 Android 13 修复这些问题，但不会向后移植到 Android 12 和 12L。启动器相关问题可能会通过启动器更新解决。如果在 Android 13 上仍然遇到启动画面问题，请向 [Google](https://issuetracker.google.com/) 报告。

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动画面（应在应用启动时执行）
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

默认情况下，启动画面会在 500 毫秒后自动隐藏。

如果希望确保在应用准备就绪前不消失，可将 `launchAutoHide` 设为 `false`；这样启动画面将保持显示直到手动隐藏。为了最佳用户体验，应用应尽快调用 `hide()`。

如果想固定显示时长，可在 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中设置 `launchShowDuration`。

## 背景颜色

在某些情况下，特别是当启动画面未能完全覆盖设备屏幕时，应用界面可能会从边缘透出（由于透明）。可以设置 `backgroundColor` 来填充这些区域，而非显示透明背景。

`backgroundColor` 的值可以是 `#RRGGBB` 或 `#RRGGBBAA` 格式。

## 加载指示器

如需在启动画面上显示加载指示器，可在 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中将 `showSpinner` 设为 `true`。

可通过以下配置自定义指示器外观：

Android 的 `androidSpinnerStyle` 选项：

- `horizontal`
- `small`
- `large` (默认)
- `inverse`
- `smallInverse`
- `largeInverse`

iOS 的 `iosSpinnerStyle` 选项：

- `large` (默认)
- `small`

使用 `spinnerColor` 设置指示器颜色，值为 `#RRGGBB` 或 `#RRGGBBAA` 格式。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

可用配置项：

| 属性                            | 类型                                                                                                                          | 描述                                                                                                                                                                                          | 默认值              | 版本  |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 autoHide 启用时显示启动画面的时长（毫秒）                                                                                                                                                  | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏                                                                                                                                                          | <code>true</code>   | 1.0.0 |
| **`launchFadeOutDuration`**     | <code>number</code>                                                                                                           | 启动画面淡出动画时长（毫秒），仅在使用 Android 12 启动画面 API 时适用于 Android                                                                                                               | <code>200</code>    | 4.2.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面背景色，十六进制格式 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 或使用 Android 12 API 启动时无效                                                                                    |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作启动画面的资源名称。使用 Android 12 API 启动时无效，仅适用于 Android                                                                                                                      | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType) 用于缩放启动画面。当 `useDialog` 为 true 或使用 Android 12 API 启动时无效，仅适用于 Android | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 是否在启动画面上显示加载指示器。当 `useDialog` 为 true 或使用 Android 12 API 启动时无效                                                                                                       |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 指示器样式。当 `useDialog` 为 true 或使用 Android 12 API 启动时无效                                                                                                                   | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 指示器样式。当 `useDialog` 为 true 时无效，仅适用于 iOS                                                                                                                                   | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 指示器颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 或使用 Android 12 API 启动时无效                                                                                        |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 是否在启动画面隐藏状态栏。使用 Android 12 API 启动时无效，仅适用于 Android                                                                                                                    |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 是否在启动画面隐藏状态栏和虚拟导航键。使用 Android 12 API 启动时无效，仅适用于 Android                                                                                                        |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 当 `useDialog` 为 true 时配置对话框布局。当未设置或为 false 时，使用布局而非 ImageView。使用 Android 12 API 启动时无效，仅适用于 Android                                                      |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 使用对话框替代 ImageView。如未配置 `layoutName`，将使用以启动画面为背景的布局。使用 Android 12 API 启动时无效，仅适用于 Android                                                               |                     | 1.1.0 |

### 示例

`capacitor.config.json` 配置：

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

`capacitor.config.ts` 配置：

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

如需使用非 `splash.png` 的启动画面图片，需设置 `androidSplashResourceName`。同时在 `android/app/src/main/res/values/styles.xml` 中修改资源名：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

### 变量

本插件使用以下项目变量（定义于应用的 `variables.gradle` 文件）：

- `coreSplashScreenVersion`：`androidx.core:core-splashscreen` 版本（默认：`1.0.0`）

## 示例指南

[添加自定义图标和启动画面图片 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动画面（Android） &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

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

显示启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**版本：** 1.0.0

---

### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**版本：** 1.0.0

---

### Interfaces

#### ShowOptions

| 属性                  | 类型                 | 描述                               | 默认              | 版本  |
| --------------------- | -------------------- | ---------------------------------- | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏     |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时长（毫秒）                   | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时长（毫秒）                   | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时显示时长（毫秒） | <code>3000</code> | 1.0.0 |

#### HideOptions

| 属性                  | 类型                | 描述                                                                                                        | 默认             | 版本  |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时长（毫秒）。在 Android 上，如使用 Android 12 启动画面 API 则无效，请改用 launchFadeOutDuration 配置项 | <code>200</code> | 1.0.0 |

</docgen-api>
