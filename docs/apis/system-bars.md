---
title: System Bars Capacitor 插件 API
description: System Bars API 提供了配置设备系统栏/状态栏样式和可见性的方法。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/system-bars.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: System Bars
---

# SystemBars

SystemBars API 提供了配置设备系统栏/状态栏样式和可见性的方法。此插件与 `@capacitor/core` 捆绑在一起。

此 API 与 [Status Bar](https://capacitorjs.com/docs/apis/status-bar) 插件的不同之处在于，它仅旨在支持未来现代的无边框（edge to edge）使用场景。对于传统功能，请使用 [Status Bar](https://capacitorjs.com/docs/apis/status-bar) 插件。

| 特性 | System Bars | Status Bar |
| ------- | ----------- | ---------- |
| `setOverlaysWebView()` | 不支持 | 在 iOS 和 Android <= 14（或启用了无边框选择退出的 15）上支持 |
| `setBackgroundColor()` | 不支持 | 支持 |
| `setStyle()` | 支持 | 支持 - 仅顶部状态栏 |
| `hide()/show()` | 支持 | 支持 - 仅顶部状态栏 |

## iOS 说明

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 以获取帮助。

状态栏可见性默认为可见，样式默认为 `Style.Default`。你可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

## Android 说明

由于某些旧版本 Android WebView（< 140）中存在一个 [bug](https://issues.chromium.org/issues/40699457)，无法通过 CSS `env` 变量 `safe-area-inset-x` 获得正确的安全区域值。此插件会将正确的插入值注入到一个新的 CSS 变量 `--safe-area-inset-x` 中，你可以在前端样式中将其用作后备方案：

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

// 设置状态栏动画，仅在 iOS 上
const setStatusBarAnimation = async () => {
  await SystemBars.setAnimation({ animation: "NONE" });
}

````

## 配置
| 属性 | 类型 | 描述 | 默认值 |
| ------------- | -------------------- | ------------------------------------------------------------------------- | ------------------ |
| **`insetsHandling`** | <code>string</code> | 指定如何处理 Android 上有问题的插入区域。此选项仅在 Android 上支持。<br>`css` = 将包含正确安全区域插入值的 CSS 变量（`--safe-area-inset-*`）注入到 WebView 中。<br>`disable` = 禁用所有插入区域处理。 | <code>css</code> |
| **`style`** | <code>string</code> | 系统栏文本和图标的样式。 | <code>DEFAULT</code> |
| **`hidden`** | <code>boolean</code> | 启动时隐藏系统栏。 | <code>false</code> |
| **`animation`** | <code>string</code> | 显示或隐藏状态栏时使用的动画类型。此选项仅在 iOS 上支持。 | <code>FADE</code> |


### 配置示例

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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档。-->

### setStyle(...)

```typescript
setStyle(options: SystemBarsStyleOptions) => Promise<void>
```

设置系统栏的当前样式。

| 参数         | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembarsstyleoptions">SystemBarsStyleOptions</a></code> |

**可用版本：** 8.0.0

--------------------


### show(...)

```typescript
show(options?: SystemBarsVisibilityOptions) => Promise<void>
```

显示系统栏。

| 参数         | 类型                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembarsvisibilityoptions">SystemBarsVisibilityOptions</a></code> |

**可用版本：** 8.0.0

--------------------


### hide(...)

```typescript
hide(options?: SystemBarsVisibilityOptions) => Promise<void>
```

隐藏系统栏。

| 参数         | 类型                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembarsvisibilityoptions">SystemBarsVisibilityOptions</a></code> |

**可用版本：** 8.0.0

--------------------


### setAnimation(...)

```typescript
setAnimation(options: SystemBarsAnimationOptions) => Promise<void>
```

设置显示/隐藏状态栏时使用的动画。

仅在 iOS 上可用。

| 参数         | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembarsanimationoptions">SystemBarsAnimationOptions</a></code> |

**可用版本：** 8.0.0

--------------------


### 接口


#### SystemBarsStyleOptions

| 属性        | 类型                                                        | 描述                                     | 默认值                | 可用版本 |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------- | ---------------------- | ----- |
| **`style`** | <code><a href="#systembarsstyle">SystemBarsStyle</a></code> | 系统栏文本和图标的样式。 | <code>'DEFAULT'</code> | 8.0.0 |
| **`bar`**   | <code><a href="#systembartype">SystemBarType</a></code>     | 要应用样式的系统栏。     | <code>null</code>      | 8.0.0 |


#### SystemBarsVisibilityOptions

| 属性            | 类型                                                                | 描述                                                                                         | 默认值             | 可用版本 |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`bar`**       | <code><a href="#systembartype">SystemBarType</a></code>             | 要隐藏或显示的系统栏。                                                                     | <code>null</code>   | 8.0.0 |
| **`animation`** | <code><a href="#systembarsanimation">SystemBarsAnimation</a></code> | 显示或隐藏状态栏时使用的状态栏动画类型。此选项仅在 iOS 上支持。 | <code>'FADE'</code> | 8.0.0 |


#### SystemBarsAnimationOptions

| 属性            | 类型                                                                | 描述                                                                                         | 默认值             | 可用版本 |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`animation`** | <code><a href="#systembarsanimation">SystemBarsAnimation</a></code> | 显示或隐藏状态栏时使用的状态栏动画类型。此选项仅在 iOS 上支持。 | <code>'FADE'</code> | 8.0.0 |


### 类型别名


#### SystemBarsAnimation

可用的状态栏动画。仅 iOS。

<code>'FADE' | 'NONE'</code>


### 枚举


#### SystemBarsStyle

| 成员       | 值                  | 描述                                                                                                                                                                                                              | 可用版本 |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景上的浅色系统栏内容。                                                                                                                                                                           | 8.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 用于浅色背景上的深色系统栏内容。                                                                                                                                                                       | 8.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 样式基于设备外观或底层内容。如果设备使用深色模式，系统栏内容将为浅色。如果设备使用浅色模式，系统栏内容将为深色。 | 8.0.0 |


#### SystemBarType

| 成员             | 值                        | 描述                                                         | 可用版本 |
| ------------------- | ---------------------------- | ------------------------------------------------------------------- | ----- |
| **`StatusBar`**     | <code>'StatusBar'</code>     | Android 和 iOS 上的顶部状态栏。                         | 8.0.0 |
| **`NavigationBar`** | <code>'NavigationBar'</code> | Android 和 iOS 上的导航栏（或 iOS 上的手势栏）。 | 8.0.0 |

</docgen-api>