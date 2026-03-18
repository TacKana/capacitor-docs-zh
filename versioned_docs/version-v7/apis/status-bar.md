---
title: Status Bar Capacitor Plugin API
description: StatusBar API 提供了配置状态栏样式、显示或隐藏状态栏的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/src/definitions.ts
sidebar_label: Status Bar
---

# @capacitor/status-bar

StatusBar API 提供了配置状态栏样式、显示或隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar@latest-7
npx cap sync
```

## iOS 注意事项

此插件要求将 `Info.plist` 中的 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。如需帮助，请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration)。

状态栏可见性默认显示，样式默认为 `Style.Default`。你可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认设置。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅 iOS
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

// 在透明状态栏下显示内容
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

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

可用的配置值如下：

| 属性                    | 类型                  | 描述                                                                                                                                                                                                                                                                                                                                                                                              | 默认值               | 自版本 |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ |
| **`overlaysWebView`**   | <code>boolean</code>  | 状态栏是否覆盖在 WebView 之上。对于目标 API 级别为 Android 15 的应用，除非在应用布局文件中添加 windowOptOutEdgeToEdgeEnforcement 属性，否则此属性无效。否则，应用将始终将 overlays 视为 true。更多细节请参考 https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement                                                                                               | <code>true</code>    | 1.0.0  |
| **`style`**             | <code>string</code>   | 状态栏文本的<a href="#style">样式</a>。                                                                                                                                                                                                                                                                                                                                                           | <code>default</code> | 1.0.0  |
| **`backgroundColor`**   | <code>string</code>   | 状态栏背景颜色，使用十六进制格式 #RRGGBB。如果 `overlaysWebView` 为 true，则此设置无效。                                                                                                                                                                                                                                                                                                           | <code>#000000</code> | 1.0.0  |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "StatusBar": {
      "overlaysWebView": false,
      "style": "DARK",
      "backgroundColor": "#ffffffff"
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/status-bar" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#ffffffff",
    },
  },
};

export default config;
```

</docgen-config>

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
在 iOS 上，如果状态栏初始隐藏且初始样式设置为 `UIStatusBarStyleLightContent`，则首次调用 show 时，动画可能会显示一个故障，文本先显示为深色然后过渡到浅色。建议在首次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画选项。

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

获取状态栏当前状态的信息。

**返回值：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**自版本：** 1.0.0

--------------------### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 WebView，以允许使用其下方的空间。

| 参数            | 类型                                                                            |
| --------------- | ------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**自：** 1.0.0

--------------------


### 接口


#### StyleOptions

| 属性          | 类型                                    | 描述                                 | 自     |
| ------------- | --------------------------------------- | ------------------------------------ | ------ |
| **`style`**   | <code><a href="#style">Style</a></code> | 状态栏文本的<a href="#style">样式</a>。 | 1.0.0  |


#### BackgroundColorOptions

| 属性          | 类型                | 描述                                 | 自     |
| ------------- | ------------------- | ------------------------------------ | ------ |
| **`color`**   | <code>string</code> | 用于设置状态栏颜色的十六进制颜色值。 | 1.0.0  |


#### AnimationOptions

| 属性              | 类型                                            | 描述                                                                 | 默认值                     | 自     |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------- | ------------------------- | ------ |
| **`animation`**   | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。           | <code>Animation.Fade</code> | 1.0.0  |


#### StatusBarInfo

| 属性            | 类型                                    | 描述                       | 自     |
| --------------- | --------------------------------------- | -------------------------- | ------ |
| **`visible`**   | <code>boolean</code>                    | 状态栏是否可见。           | 1.0.0  |
| **`style`**     | <code><a href="#style">Style</a></code> | 当前状态栏样式。           | 1.0.0  |
| **`color`**     | <code>string</code>                     | 当前状态栏颜色。           | 1.0.0  |
| **`overlays`**  | <code>boolean</code>                    | 状态栏是否处于覆盖模式。   | 1.0.0  |


#### SetOverlaysWebViewOptions

| 属性            | 类型                 | 描述                       | 自     |
| --------------- | -------------------- | -------------------------- | ------ |
| **`overlay`**   | <code>boolean</code> | 是否覆盖状态栏。           | 1.0.0  |


### 枚举


#### Style

| 成员          | 值                      | 描述                                                                                                                               | 自     |
| ------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景上的浅色文字。                                                                                                             | 1.0.0  |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景上的深色文字。                                                                                                             | 1.0.0  |
| **`Default`** | <code>'DEFAULT'</code> | 样式基于设备外观。如果设备使用深色模式，状态栏文字将为浅色；如果设备使用浅色模式，状态栏文字将为深色。                               | 1.0.0  |


#### Animation

| 成员        | 值                    | 描述                                       | 自     |
| ----------- | --------------------- | ------------------------------------------ | ------ |
| **`None`**  | <code>'NONE'</code>  | 显示/隐藏时无动画。                        | 1.0.0  |
| **`Slide`** | <code>'SLIDE'</code> | 显示/隐藏时使用滑动动画。在 iOS 15+ 上无效。 | 1.0.0  |
| **`Fade`**  | <code>'FADE'</code>  | 显示/隐藏时使用淡入淡出动画。              | 1.0.0  |

</docgen-api>