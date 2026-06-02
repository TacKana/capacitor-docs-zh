---
title: Status Bar Capacitor Plugin API
description: StatusBar API 提供用于配置状态栏样式以及显示或隐藏状态栏的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/status-bar/src/definitions.ts
sidebar_label: Status Bar
translated: true
---

# @capacitor/status-bar

StatusBar API 提供用于配置状态栏样式以及显示或隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar@latest-6
npx cap sync
```

## iOS 说明

此插件需要在 `Info.plist` 中将 "View controller-based status bar appearance"（`UIViewControllerBasedStatusBarAppearance`）设置为 `YES`。阅读关于[配置 iOS](https://capacitorjs.com/docs/ios/configuration) 的帮助信息。

状态栏的可见性默认为可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

`setBackgroundColor` 和 `setOverlaysWebView` 目前不支持 iOS 设备。

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
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏的当前样式。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**Since:** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。

此方法仅支持 Android。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**Since:** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上，如果状态栏初始是隐藏的并且初始样式设置为
`UIStatusBarStyleLightContent`，首次调用 show 时动画可能会出现
文本先显示为深色然后过渡到浅色的闪烁问题。建议
在首次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**Since:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**Since:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取状态栏当前状态的信息。

**返回：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 WebView，以允许使用其下方的空间。

此方法仅支持 Android。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**Since:** 1.0.0

--------------------


### 接口


#### StyleOptions

| 属性          | 类型                                    | 描述                           | Since |
| ------------- | --------------------------------------- | ------------------------------ | ----- |
| **`style`**   | <code><a href="#style">Style</a></code> | 状态栏文本的<a href="#style">样式</a>。 | 1.0.0 |


#### BackgroundColorOptions

| 属性          | 类型                | 描述                                             | Since |
| ------------- | ------------------- | ------------------------------------------------ | ----- |
| **`color`**   | <code>string</code> | 状态栏颜色被设置为此十六进制颜色。此选项仅支持 Android。 | 1.0.0 |


#### AnimationOptions

| 属性              | 类型                                            | 描述                                                   | 默认                           | Since |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------ | ----------------------------- | ----- |
| **`animation`**   | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅支持 iOS。       | <code>Animation.Fade</code> | 1.0.0 |


#### StatusBarInfo

| 属性             | 类型                                    | 描述                                           | Since |
| ---------------- | --------------------------------------- | ---------------------------------------------- | ----- |
| **`visible`**    | <code>boolean</code>                    | 状态栏是否可见。                                   | 1.0.0 |
| **`style`**      | <code><a href="#style">Style</a></code> | 当前状态栏样式。                                   | 1.0.0 |
| **`color`**      | <code>string</code>                     | 当前状态栏颜色。此选项仅支持 Android。               | 1.0.0 |
| **`overlays`**   | <code>boolean</code>                    | 状态栏是否处于覆盖模式。此选项仅支持 Android。         | 1.0.0 |


#### SetOverlaysWebViewOptions

| 属性            | 类型                 | 描述                     | Since |
| --------------- | -------------------- | ------------------------ | ----- |
| **`overlay`**   | <code>boolean</code> | 是否覆盖状态栏。           | 1.0.0 |


### 枚举


#### Style

| 成员            | 值                     | 描述                                                                                                                                                                                                                              | Since |
| --------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**      | <code>'DARK'</code>    | 深色背景下的浅色文本。                                                                                                                                                                                                             | 1.0.0 |
| **`Light`**     | <code>'LIGHT'</code>   | 浅色背景下的深色文本。                                                                                                                                                                                                             | 1.0.0 |
| **`Default`**   | <code>'DEFAULT'</code> | 样式基于设备外观。如果设备使用深色模式，状态栏文本将为浅色。如果设备使用浅色模式，状态栏文本将为深色。在 Android 上，默认值将是应用启动时所使用的样式。                                                                           | 1.0.0 |


#### Animation

| 成员       | 值                  | 描述                         | Since |
| ---------- | ------------------- | ---------------------------- | ----- |
| **`None`** | <code>'NONE'</code> | 显示/隐藏时无动画。             | 1.0.0 |
| **`Slide`**| <code>'SLIDE'</code>| 显示/隐藏时的滑动动画。在 iOS 15+ 上无效。 | 1.0.0 |
| **`Fade`** | <code>'FADE'</code> | 显示/隐藏时的淡入淡出动画。       | 1.0.0 |

</docgen-api>
