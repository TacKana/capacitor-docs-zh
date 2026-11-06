---
title: System Bars - Capacitor 插件 API
description: System Bars API 提供了配置设备系统栏/状态栏样式和可见性的方法。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/next/core/system-bars.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/next/core/src/core-plugins.ts
sidebar_label: 系统栏
translated: true
source_hash: 41e7ec12
---

# SystemBars

SystemBars API 提供了配置设备系统栏/状态栏样式和可见性的方法。此插件随 `@capacitor/core` 捆绑提供。

此 API 与 [Status Bar](https://capacitorjs.com/docs/apis/status-bar) 插件的不同之处在于，它仅旨在支持未来的现代全屏（edge to edge）使用场景。对于旧版功能，请使用 [Status Bar](https://capacitorjs.com/docs/apis/status-bar) 插件。

| 特性 | System Bars | Status Bar |
| ------- | ----------- | ---------- |
| `setOverlaysWebView()` | 不支持 | 在 iOS 和 Android <= 14（或在启用了全屏选择退出的情况下为 15）上受支持 |
| `setBackgroundColor()` | 不支持 | 支持 |
| `setStyle()` | 支持 | 支持 - 仅顶部状态栏 |
| `hide()/show()` | 支持 | 支持 - 仅顶部状态栏 |

## iOS 注意

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance"（`UIViewControllerBasedStatusBarAppearance`）设置为 `YES`。请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 以获取帮助。

状态栏的可见性默认为可见，样式默认为 `Style.Default`。你可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

## Android 注意

由于某些低于 140 的旧版 Android WebView 存在一个 [bug](https://issues.chromium.org/issues/40699457)，CSS `env` 变量 `safe-area-inset-x` 无法提供正确的安全区域值。此插件提供两种解决方法。若 `insetsHandling` 设为 `css`，插件会将正确的内边距值注入名为 `--safe-area-inset-x` 的 CSS 变量；你可以在前端样式中将其作为后备方案使用：

```css
html {
  padding-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));
  padding-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));
  padding-left: var(--safe-area-inset-left, env(safe-area-inset-left, 0px));
  padding-right: var(--safe-area-inset-right, env(safe-area-inset-right, 0px));
}
```
要控制此行为，请使用 `insetsHandling` 配置设置。

## 示例

```typescript
import { SystemBars, SystemBarsStyle, SystemBarType } from '@capacitor/core';

const setSystemBarStyleDark = async () => {
  await SystemBars.setStyle({ style: SystemBarsStyle.Dark });
};

const setSystemBarStyleLight = async () => {
  await SystemBars.setStyle({ style: SystemBarsStyle.Light });
};

const hideSystemBars = async () => {
  await SystemBars.hide();
};

const showSystemBars = async () => {
  await SystemBars.show();
};

const hideNavigationBar = async () => {
  await SystemBars.hide({
    bar: SystemBarType.NavigationBar
  })
}

// 设置状态栏动画，仅限 iOS
const setStatusBarAnimation = async () => {
  await SystemBars.setAnimation({ animation: "NONE" });
}

````

## 配置
| 属性          | 类型                 | 描述                                                                                                                                                              | 默认值            |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`insetsHandling`** | <code>string</code> | 指定如何处理 Android 上有问题的安全区域内边距。<br>仅在 Android 上支持此选项。<br><br>`native` =（推荐）对于较旧的 Chromium 版本（`< v140`），为 webview 添加内边距，并将 `env(safe-area-inset-*)` 变量设为 `0px`。对于较新的 Chromium 版本（`>= v140`），确保 webview 遵循 `viewport-fit` meta 标签。如果设置为 `viewport-fit="cover"`，webview 将采用 edge-to-edge 布局，且 `env(safe-area-inset-*)` 变量会包含正确的值。你可以使用这些值设置内边距，从而确保 webview 正常显示。<br><br>`css` = 与 `native` 相同，但还会向 webview 注入包含正确安全区域内边距值的 CSS 变量（`--safe-area-inset-*`）。<br><br>`disable` =（不推荐）完全禁用安全区域内边距处理。此时由你自己的代码负责处理这些内边距。请注意，如果原生应用代码和 webview 中加载的内容未能正确处理安全区域内边距，界面可能会显示异常。 | <code>native</code> |
| **`initialViewportFitValueHint`** | <code>string</code> | 为待检测的 `viewport-fit=` meta 标签值设置初始值。<br>对于大多数支持 edge-to-edge 的应用，此值最终会是 `cover`。<br>因此，你可能希望将其设为 `cover`，以避免布局跳动和显示瑕疵。<br>如果你知道初始值为 `cover`，可以在此设置。<br>只要 `insetsHandling` 设为 `native` 或 `css`，无论此处设置什么值，最终都会得到正确值。<br>此选项仅用于避免布局跳动和显示瑕疵。<br><br>仅在 Android 上支持此选项。 | <code>undefined</code> |
| **`style`** | <code>string</code> | 系统栏文本和图标的样式。 | <code>DEFAULT</code> |
| **`hidden`** | <code>boolean</code> | 启动时隐藏系统栏。 | <code>false</code> |
| **`animation`** | <code>string</code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。 | <code>FADE</code> |


### 示例配置

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "SystemBars": {
      "insetsHandling": "css",
      "style": "DARK",
      "hidden": false,
      "animation": "NONE"
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SystemBars: {
      insetsHandling: "css",
      style: "DARK",
      hidden: false,
      animation: "NONE"
    },
  },
};

export default config;
```

## API

<docgen-index>

* [`setStyle(...)`](#setstyle)
* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [`setAnimation(...)`](#setanimation)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)
* [Enums](#枚举)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下方文档-->

### setStyle(...)

```typescript
setStyle(options: SystemBarsStyleOptions) => Promise<void>
```

设置系统栏当前样式。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#systembarsstyleoptions">SystemBarsStyleOptions</a></code> |

**始于：** 8.0.0

--------------------


### show(...)

```typescript
show(options?: SystemBarsVisibilityOptions) => Promise<void>
```

显示系统栏。

| 参数            | 类型                                                                                |
| --------------- | ----------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#systembarsvisibilityoptions">SystemBarsVisibilityOptions</a></code> |

**始于：** 8.0.0

--------------------


### hide(...)

```typescript
hide(options?: SystemBarsVisibilityOptions) => Promise<void>
```

隐藏系统栏。

| 参数            | 类型                                                                                |
| --------------- | ----------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#systembarsvisibilityoptions">SystemBarsVisibilityOptions</a></code> |

**始于：** 8.0.0

--------------------


### setAnimation(...)

```typescript
setAnimation(options: SystemBarsAnimationOptions) => Promise<void>
```

设置显示/隐藏状态栏时使用的动画。

仅适用于 iOS。

| 参数            | 类型                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#systembarsanimationoptions">SystemBarsAnimationOptions</a></code> |

**始于：** 8.0.0

--------------------


### 接口


#### SystemBarsStyleOptions

| 属性        | 类型                                                        | 描述                     | 默认值                 | 始于   |
| ----------- | ----------------------------------------------------------- | ------------------------ | ---------------------- | ------ |
| **`style`** | <code><a href="#systembarsstyle">SystemBarsStyle</a></code> | 系统栏文本和图标的样式。 | <code>'DEFAULT'</code> | 8.0.0 |
| **`bar`**   | <code><a href="#systembartype">SystemBarType</a></code>     | 要应用样式的系统栏。     | <code>null</code>      | 8.0.0 |


#### SystemBarsVisibilityOptions

| 属性            | 类型                                                                | 描述                                                                                 | 默认值             | 始于   |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------- | ------ |
| **`bar`**       | <code><a href="#systembartype">SystemBarType</a></code>             | 要隐藏或显示的系统栏。                                                               | <code>null</code>   | 8.0.0 |
| **`animation`** | <code><a href="#systembarsanimation">SystemBarsAnimation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。                          | <code>'FADE'</code> | 8.0.0 |


#### SystemBarsAnimationOptions

| 属性            | 类型                                                                | 描述                                                                                 | 默认值             | 始于   |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------- | ------ |
| **`animation`** | <code><a href="#systembarsanimation">SystemBarsAnimation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。                          | <code>'FADE'</code> | 8.0.0 |


### 类型别名


#### SystemBarsAnimation

可用的状态栏动画。仅 iOS。

<code>'FADE' | 'NONE'</code>


### 枚举


#### SystemBarsStyle

| 成员          | 值                     | 描述                                                                                                                               | 始于   |
| ------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景上的浅色系统栏内容。                                                                                                       | 8.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景上的深色系统栏内容。                                                                                                       | 8.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 样式基于设备外观或底层内容。如果设备使用深色模式，系统栏内容将为浅色。如果设备使用浅色模式，系统栏内容将为深色。                   | 8.0.0 |


#### SystemBarType

| 成员               | 值                          | 描述                                       | 始于   |
| ------------------ | --------------------------- | ------------------------------------------ | ------ |
| **`StatusBar`**    | <code>'StatusBar'</code>    | Android 和 iOS 上的顶部状态栏。             | 8.0.0 |
| **`NavigationBar`**| <code>'NavigationBar'</code>| Android 和 iOS 上的导航栏（或 iOS 上的手势栏）。 | 8.0.0 |

</docgen-api>
