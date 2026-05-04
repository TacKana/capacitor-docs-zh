---
title: Status Bar Capacitor Plugin API
description: StatusBar API 提供了配置状态栏样式以及显示或隐藏状态栏的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/status-bar/src/definitions.ts
sidebar_label: Status Bar
---

# @capacitor/status-bar

StatusBar API 提供了配置状态栏样式以及显示或隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar@latest-6
npx cap sync
```

## iOS 注意事项

该插件要求将 `Info.plist` 中的 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。如需帮助，请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration)。

状态栏可见性默认为可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

`setBackgroundColor` 和 `setOverlaysWebView` 目前在 iOS 设备上不受支持。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅限 iOS
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

// 在透明状态栏下显示内容（仅限 Android）
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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏的当前样式。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**自版本：** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。

此方法仅在 Android 上受支持。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**自版本：** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上，如果状态栏初始隐藏，且初始样式设置为 `UIStatusBarStyleLightContent`，则首次调用 show 时，动画可能会出现一个显示文本为深色然后过渡到浅色的闪烁现象。建议在首次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画选项。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本：** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取关于状态栏当前状态的信息。

**返回值：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 WebView，以便使用其下方的空间。

此方法仅在 Android 上受支持。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**自版本：** 1.0.0

--------------------


### 接口


#### StyleOptions

| 属性          | 类型                                    | 描述                                               | 自版本 |
| ----------- | --------------------------------------- | --------------------------------------------------------- | ----- |
| **`style`** | <code><a href="#style">Style</a></code> | 状态栏文本的 <a href="#style">Style</a>。 | 1.0.0 |


#### BackgroundColorOptions

| 属性          | 类型                | 描述                                                                                 | 自版本 |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------- | ----- |
| **`color`** | <code>string</code> | 设置状态栏颜色的十六进制颜色值。此选项仅在 Android 上受支持。 | 1.0.0 |


#### AnimationOptions

| 属性                | 类型                                            | 描述                                                                                         | 默认值                     | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| **`animation`** | <code><a href="#animation">Animation</a></code> | 显示或隐藏状态栏时使用的动画类型。此选项仅在 iOS 上受支持。 | <code>Animation.Fade</code> | 1.0.0 |

#### StatusBarInfo

| 属性             | 类型                                    | 描述                                                                               | 始于版本 |
| ---------------- | --------------------------------------- | ---------------------------------------------------------------------------------- | -------- |
| **`visible`**    | <code>boolean</code>                    | 状态栏是否可见。                                                                   | 1.0.0    |
| **`style`**      | <code><a href="#style">Style</a></code> | 当前状态栏的样式。                                                                 | 1.0.0    |
| **`color`**      | <code>string</code>                     | 当前状态栏的颜色。此选项仅在 Android 上受支持。                                     | 1.0.0    |
| **`overlays`**   | <code>boolean</code>                    | 状态栏是否处于覆盖模式。此选项仅在 Android 上受支持。                               | 1.0.0    |


#### SetOverlaysWebViewOptions

| 属性            | 类型                 | 描述                             | 始于版本 |
| --------------- | -------------------- | -------------------------------- | -------- |
| **`overlay`**   | <code>boolean</code> | 是否将状态栏设置为覆盖模式。      | 1.0.0    |


### 枚举


#### Style

| 成员             | 值                      | 描述                                                                                                                                                                                                                  | 始于版本 |
| ---------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`Dark`**       | <code>'DARK'</code>     | 深色背景上显示浅色文字。                                                                                                                                                                                              | 1.0.0    |
| **`Light`**      | <code>'LIGHT'</code>    | 浅色背景上显示深色文字。                                                                                                                                                                                              | 1.0.0    |
| **`Default`**    | <code>'DEFAULT'</code>  | 样式基于设备的外观模式。如果设备使用深色模式，状态栏文字将为浅色。如果设备使用浅色模式，状态栏文字将为深色。在 Android 上，默认样式为应用启动时的样式。                                                                | 1.0.0    |


#### Animation

| 成员           | 值                    | 描述                                                   | 始于版本 |
| -------------- | --------------------- | ------------------------------------------------------ | -------- |
| **`None`**     | <code>'NONE'</code>   | 显示/隐藏时无动画效果。                                 | 1.0.0    |
| **`Slide`**    | <code>'SLIDE'</code>  | 显示/隐藏时使用滑动动画。在 iOS 15+ 上无效。            | 1.0.0    |
| **`Fade`**     | <code>'FADE'</code>   | 显示/隐藏时使用淡入淡出动画。                           | 1.0.0    |

</docgen-api>