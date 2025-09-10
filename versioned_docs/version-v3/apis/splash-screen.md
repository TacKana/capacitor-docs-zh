---
title: Splash Screen Capacitor Plugin API
description: Splash Screen API 提供显示或隐藏启动画面的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts
sidebar_label: 启动画面
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

// 隐藏启动画面（应在应用启动时调用）
await SplashScreen.hide();

// 无限期显示启动画面：
await SplashScreen.show({
  autoHide: false,
});

// 显示启动画面2秒后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## 隐藏启动画面

默认情况下，启动画面会在500毫秒后自动隐藏。

如果希望确保启动画面在应用准备就绪前不消失，可将 `launchAutoHide` 设为 `false`，这样启动画面会一直显示直到手动隐藏。为了最佳用户体验，应用应尽快调用 `hide()` 方法。

如果想固定显示启动画面一段时间，可以在 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中设置 `launchShowDuration`。

## 背景颜色

在某些情况下，特别是当启动画面未能完全覆盖设备屏幕时，应用界面可能会从边角透出（由于透明效果）。可以通过设置 `backgroundColor` 来填充这些区域，而不是显示透明色。

`backgroundColor` 的有效值为 `#RRGGBB` 或 `#RRGGBBAA` 格式。

## 加载指示器

如需在启动画面上显示加载旋转图标，请在 [Capacitor 配置文件](https://capacitorjs.com/docs/v3/config) 中将 `showSpinner` 设为 `true`。

可通过以下配置自定义加载指示器的外观：

对于 Android，`androidSpinnerStyle` 可选值：

- `horizontal`
- `small`
- `large`（默认）
- `inverse`
- `smallInverse`
- `largeInverse`

对于 iOS，`iosSpinnerStyle` 可选值：

- `large`（默认）
- `small`

使用 `spinnerColor` 设置旋转图标颜色，值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 配置

<docgen-config>

可用配置值：

| 属性                            | 类型                                                                                                                          | 描述                                                                                                                                                              | 默认值              | 版本  |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当 autoHide 启用时，启动画面显示时长（毫秒）                                                                                                                      | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏启动画面                                                                                                                      | <code>true</code>   | 1.0.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面背景色，十六进制格式 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 时无效                                                                                  |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作启动画面的资源名称。仅限 Android                                                                                                                              | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | 用于缩放启动画面的 [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)。当 `useDialog` 为 true 时无效。仅限 Android | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 是否在启动画面上显示加载指示器。当 `useDialog` 为 true 时无效                                                                                                     |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 加载指示器样式。当 `useDialog` 为 true 时无效                                                                                                             | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 加载指示器样式。当 `useDialog` 为 true 时无效。仅限 iOS                                                                                                       | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器颜色，十六进制格式 #RRGGBB 或 #RRGGBBAA。当 `useDialog` 为 true 时无效                                                                                  |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 是否全屏显示启动画面（隐藏状态栏）。仅限 Android                                                                                                                  |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 是否沉浸式显示启动画面（隐藏状态栏和虚拟导航键）。仅限 Android                                                                                                    |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 当 `useDialog` 为 true 时配置对话框布局。当 `useDialog` 为 false 或未设置时，使用布局而非 ImageView。仅限 Android                                                 |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 是否使用对话框替代 ImageView。如果未配置 `layoutName`，则使用以启动图片为背景的布局。仅限 Android                                                                 |                     | 1.1.0 |

### 配置示例

`capacitor.config.json` 配置：

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

`capacitor.config.ts` 配置：

```ts
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
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

### Android 特定配置

如需使用非 `splash.png` 命名的启动画面图片，请设置 `androidSplashResourceName` 为新资源名。同时，在 `android/app/src/main/res/values/styles.xml` 中修改以下代码块的资源名：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

## 教程指南

[添加自定义图标和启动画面图片指南 &#8250;](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[创建动态适配的启动画面（Android版） &#8250;](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API 参考

<docgen-index>

- [`show(...)`](#显示启动画面)
- [`hide(...)`](#隐藏启动画面)
- [接口定义](#interfaces)

</docgen-index>

<docgen-api>

### 显示启动画面

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示启动画面

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**版本：** 1.0.0

---

### 隐藏启动画面

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

#### ShowOptions 显示选项

| 属性                  | 类型                 | 描述                                       | 默认值            | 版本  |
| --------------------- | -------------------- | ------------------------------------------ | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏             |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入时长（毫秒）                           | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出时长（毫秒）                           | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当 autoHide 启用时启动画面显示时长（毫秒） | <code>3000</code> | 1.0.0 |

#### HideOptions 隐藏选项

| 属性                  | 类型                | 描述             | 默认值           | 版本  |
| --------------------- | ------------------- | ---------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出时长（毫秒） | <code>200</code> | 1.0.0 |

</docgen-api>
