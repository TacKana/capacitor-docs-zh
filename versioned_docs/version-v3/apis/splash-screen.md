---
title: Splash Screen Capacitor Plugin API
description: Splash Screen API 提供了显示或隐藏启动画面的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts
sidebar_label: Splash Screen
---

# @capacitor/splash-screen

Splash Screen API 提供了显示或隐藏启动画面的方法。

## 安装

```bash
npm install @capacitor/splash-screen
npx cap sync
```

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动画面（应在应用启动时执行此操作）
await SplashScreen.hide();

// 无限期显示启动画面：
await SplashScreen.show({
  autoHide: false
});

// 显示启动画面两秒钟，然后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true
});
```

## 隐藏启动画面

默认情况下，启动画面会在 500 毫秒后自动隐藏。

如果你希望确保应用准备就绪前启动画面不会消失，可以将 `launchAutoHide` 设置为 `false`；这样启动画面将保持可见，直到手动隐藏。为了获得最佳用户体验，你的应用应尽快调用 `hide()` 方法。

如果你想固定显示启动画面一段时间，可以在 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中设置 `launchShowDuration`。

## 背景色

在某些情况下，特别是当启动画面未能完全覆盖设备屏幕时，可能会在边角处看到应用界面（由于透明背景）。为了避免显示透明背景，你可以设置 `backgroundColor` 来覆盖这些区域。

`backgroundColor` 的有效值为 `#RRGGBB` 或 `#RRGGBBAA` 格式。

## 加载指示器

如果你想在启动画面上方显示加载指示器，可以在 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中将 `showSpinner` 设置为 `true`。

你可以通过以下配置来自定义加载指示器的外观。

对于 Android，`androidSpinnerStyle` 有以下选项：
- `horizontal`
- `small`
- `large`（默认值）
- `inverse`
- `smallInverse`
- `largeInverse`

对于 iOS，`iosSpinnerStyle` 有以下选项：
- `large`（默认值）
- `small`

要设置加载指示器的颜色，请使用 `spinnerColor`，其值为 `#RRGGBB` 或 `#RRGGBBAA` 格式。

## 配置

<docgen-config>

以下是可用的配置项：

| 属性名称                         | 类型                                                                                                                          | 描述                                                                                                                                                                                                  | 默认值              | 自版本 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 `launchAutoHide` 启用时，启动画面显示时长（单位：毫秒）                                                                                                                                   | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 `launchShowDuration` 时间后自动隐藏启动画面                                                                                                                                                    | <code>true</code>   | 1.0.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面的背景色，支持十六进制格式：#RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 时无效                                                                                       |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作 Android 启动画面的资源名称（仅 Android 可用）                                                                                                                                 | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | 用于缩放启动画面图片的 [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)。当 `useDialog` 为 true 时无效（仅 Android 可用） | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 是否在启动画面上显示加载指示器（转圈）。当 `useDialog` 为 true 时无效                                                                                                                            |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 平台加载指示器的样式。当 `useDialog` 为 true 时无效                                                                                                                                           | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 平台加载指示器的样式。当 `useDialog` 为 true 时无效（仅 iOS 可用）                                                                                                                        | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器的颜色，支持十六进制格式：#RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 时无效                                                                                                               |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 是否在启动画面上隐藏状态栏（仅 Android 可用）                                                                                                                                         |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 是否在启动画面上隐藏状态栏和软件导航按钮（仅 Android 可用）                                                                                                     |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 当 `useDialog` 设为 true 时，用于配置对话框布局。如果 `useDialog` 未设置或为 false，则使用布局代替 ImageView（仅 Android 可用）                                            |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 是否使用对话框（Dialog）代替 ImageView。如果未配置 `layoutName`，将使用以启动图片为背景的布局（仅 Android 可用）                                           |                     | 1.1.0 |

### 示例

在 `capacitor.config.json` 中配置：

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

在 `capacitor.config.ts` 中配置：

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

### Android 平台

如果要使用非默认名称 `splash.png` 的启动画面图片，可以将 `androidSplashResourceName` 设置为新的资源名称。此外，在 `android/app/src/main/res/values/styles.xml` 文件中，修改以下代码块中的资源名称：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

## 示例指南

[添加自定义图标和启动画面图片 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动画面（Android 版） &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [接口](#接口)

</docgen-index>

<docgen-api>


### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**自：** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**自：** 1.0.0

--------------------


### 接口


#### ShowOptions

| 属性                  | 类型                 | 说明                                                         | 默认值           | 自 |
| --------------------- | -------------------- | ------------------------------------------------------------ | ---------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏启动画面                      |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时长（毫秒）                                             | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时长（毫秒）                                             | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时，启动画面的显示时长（毫秒）               | <code>3000</code> | 1.0.0 |


#### HideOptions

| 属性                  | 类型                | 说明                   | 默认值          | 自 |
| --------------------- | ------------------- | ---------------------- | --------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时长（毫秒）       | <code>200</code> | 1.0.0 |

</docgen-api>