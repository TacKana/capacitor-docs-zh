---
title: Status Bar Capacitor 插件 API
description: StatusBar API 提供了配置状态栏样式以及显示或隐藏它的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts
sidebar_label: Status Bar
translated: true
---

# @capacitor/status-bar

StatusBar API 提供了配置状态栏样式以及显示或隐藏它的方法。

## 安装

```bash
npm install @capacitor/status-bar
npx cap sync
```

## iOS 说明

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance"（`UIViewControllerBasedStatusBarAppearance`）设置为 `YES`。请阅读 [配置 iOS](https://capacitorjs.com/docs/v3/ios/configuration) 寻求帮助。

状态栏可见性默认为可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

`setBackgroundColor` 和 `setOverlaysWebView` 目前在 iOS 设备上不受支持。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅 iOS
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

// 在透明状态栏下显示内容（仅 Android）
StatusBar.setOverlaysWebView({ overlay: true });

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
};

const setStatusBarStyleLight = async () => {
  await StatusBar.setStyle({ style: Style.Light });
};

const hideStatusBar = async () => {
  await StatusBar.hide();
};

const showStatusBar = async () => {
  await StatusBar.show();
};
```

## API

<docgen-index>

* [`setStyle(...)`](#setstyle)
* [`setBackgroundColor(...)`](#setbackgroundcolor)
* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [`getInfo()`](#getinfo)
* [`setOverlaysWebView(...)`](#setoverlayswebview)
* [接口](#接口)
* [枚举](#枚举)

</docgen-index>

<docgen-api>


### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏的当前样式。

| 参数 | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**始于：** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。

此方法仅在 Android 上受支持。

| 参数 | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**始于：** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。

| 参数 | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**始于：** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数 | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**始于：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取有关状态栏当前状态的信息。

**返回：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**始于：** 1.0.0

--------------------


### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 WebView 以允许使用其下方的空间。

此方法仅在 Android 上受支持。

| 参数 | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**始于：** 1.0.0

--------------------


### 接口


#### StyleOptions

| 属性 | Type                                    | 描述 | 始于 |
| ----------- | --------------------------------------- | --------------------------------------------------------- | ----- |
| **`style`** | <code><a href="#style">Style</a></code> | 状态栏文字的样式。 | 1.0.0 |


#### BackgroundColorOptions

| 属性 | Type                | 描述 | 始于 |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`color`** | <code>string</code> | 设置状态栏颜色的十六进制颜色。此选项仅在 Android 上受支持。 | 1.0.0 |


#### AnimationOptions

| 属性 | Type                                            | 描述 | 始于 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`animation`** | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。 | 1.0.0 |


#### StatusBarInfo

| 属性 | Type                                    | 描述 | 始于 |
| -------------- | --------------------------------------- | ----------------------------------------------------------------------------------- | ----- |
| **`visible`**  | <code>boolean</code>                    | 状态栏是否可见。                                           | 1.0.0 |
| **`style`**    | <code><a href="#style">Style</a></code> | 当前状态栏样式。                                                       | 1.0.0 |
| **`color`**    | <code>string</code>                     | 当前状态栏颜色。此选项仅在 Android 上受支持。             | 1.0.0 |
| **`overlays`** | <code>boolean</code>                    | 状态栏是否覆盖。此选项仅在 Android 上受支持。 | 1.0.0 |


#### SetOverlaysWebViewOptions

| 属性 | Type                 | 描述 | 始于 |
| ------------- | -------------------- | ----------------------------------------- | ----- |
| **`overlay`** | <code>boolean</code> | 是否覆盖状态栏。 | 1.0.0 |


### 枚举


#### Style

| 成员 | Value                  | 描述 | 始于 |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景上的浅色文字。                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景上的深色文字。                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 在 iOS 13 及更高版本上，样式基于设备外观。如果设备使用深色模式，状态栏文字将为浅色。如果设备使用浅色模式，状态栏文字将为深色。在 iOS 12 及更早版本上，状态栏文字将为深色。在 Android 上，默认值将是应用启动时的样式。 | 1.0.0 |


#### Animation

| 成员 | Value                | 描述 | 始于 |
| ----------- | -------------------- | --------------------------------- | ----- |
| **`None`**  | <code>'NONE'</code>  | 显示/隐藏时无动画。    | 1.0.0 |
| **`Slide`** | <code>'SLIDE'</code> | 显示/隐藏时滑动动画。 | 1.0.0 |
| **`Fade`**  | <code>'FADE'</code>  | 显示/隐藏时淡入淡出动画。  | 1.0.0 |

</docgen-api>
