---
title: Status Bar Capacitor Plugin API
description: StatusBar API 提供配置状态栏样式以及显示或隐藏状态栏的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/status-bar/src/definitions.ts
sidebar_label: Status Bar
---

# @capacitor/status-bar

StatusBar API 提供配置状态栏样式以及显示或隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar@latest-7
npx cap sync
```

## iOS 注意事项

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。请参阅 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 以获取帮助。

状态栏的可见性默认为显示，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅限 iOS
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
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

提供以下配置值：

| 属性                     | 类型                  | 描述                                                                                                                                                                                                                                                                                                                                                                        | 默认值               | 自    |
| ------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----- |
| **`overlaysWebView`**    | <code>boolean</code>  | 状态栏是否覆盖在 WebView 之上。对于目标为 Android 15 的应用程序，除非在应用程序布局文件中添加了属性 windowOptOutEdgeToEdgeEnforcement，否则此属性无效。否则，应用程序将始终假定 overlays 为 true。更多细节请参阅 https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement                                                                          | <code>true</code>    | 1.0.0 |
| **`style`**              | <code>string</code>   | 状态栏文本的<a href="#style">样式</a>。                                                                                                                                                                                                                                                                                                                                      | <code>default</code> | 1.0.0 |
| **`backgroundColor`**    | <code>string</code>   | 状态栏背景颜色，格式为十六进制 #RRGGBB。如果 `overlaysWebView` 为 true 则无效。                                                                                                                                                                                                                                                                                             | <code>#000000</code> | 1.0.0 |

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
* [`addListener('statusBarVisibilityChanged', ...)`](#addlistenerstatusbarvisibilitychanged-)
* [`addListener('statusBarOverlayChanged', ...)`](#addlistenerstatusbaroverlaychanged-)
* [接口](#接口)
* [类型别名](#类型别名)
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

**自：** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**自：** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上，如果状态栏初始时隐藏且初始样式设置为 `UIStatusBarStyleLightContent`，则首次调用 show 时，动画可能会显示一个故障，文本先是深色然后过渡到浅色。建议在第一次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画选项。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自：** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自：** 1.0.0

--------------------

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取状态栏当前状态的信息。

**返回：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 WebView，以便使用其下方的空间。

| 参数            | 类型                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**自版本：** 1.0.0

--------------------


### addListener('statusBarVisibilityChanged', ...)

```typescript
addListener(eventName: 'statusBarVisibilityChanged', listenerFunc: VisibilityChangeListener) => Promise<PluginListenerHandle>
```

监听状态栏可见性变化。
当调用 hide 或 show 方法时触发。

| 参数                 | 类型                                                                          |
| -------------------- | ----------------------------------------------------------------------------- |
| **`eventName`**      | <code>'statusBarVisibilityChanged'</code>                                     |
| **`listenerFunc`**   | <code><a href="#visibilitychangelistener">VisibilityChangeListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 7.0.0

--------------------


### addListener('statusBarOverlayChanged', ...)

```typescript
addListener(eventName: 'statusBarOverlayChanged', listenerFunc: OverlayChangeListener) => Promise<PluginListenerHandle>
```

监听状态栏覆盖状态变化。
当调用 setOverlaysWebView 方法时触发。

| 参数                 | 类型                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| **`eventName`**      | <code>'statusBarOverlayChanged'</code>                                  |
| **`listenerFunc`**   | <code><a href="#overlaychangelistener">OverlayChangeListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 7.0.0

--------------------


### 接口


#### StyleOptions

| 属性           | 类型                                    | 描述                                               | 自版本 |
| -------------- | --------------------------------------- | -------------------------------------------------- | ------ |
| **`style`**    | <code><a href="#style">Style</a></code> | 状态栏文本的 <a href="#style">样式</a>。           | 1.0.0  |


#### BackgroundColorOptions

| 属性           | 类型                | 描述                                       | 自版本 |
| -------------- | ------------------- | ------------------------------------------ | ------ |
| **`color`**    | <code>string</code> | 设置状态栏颜色的十六进制色值。             | 1.0.0  |


#### AnimationOptions

| 属性                 | 类型                                            | 描述                                                                                                | 默认值                   | 自版本 |
| -------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------ | ------ |
| **`animation`**      | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上受支持。                                       | <code>Animation.Fade</code> | 1.0.0  |


#### StatusBarInfo

| 属性             | 类型                                    | 描述                                 | 自版本 |
| ---------------- | --------------------------------------- | ------------------------------------ | ------ |
| **`visible`**    | <code>boolean</code>                    | 状态栏是否可见。                     | 1.0.0  |
| **`style`**      | <code><a href="#style">Style</a></code> | 当前状态栏样式。                     | 1.0.0  |
| **`color`**      | <code>string</code>                     | 当前状态栏颜色。                     | 1.0.0  |
| **`overlays`**   | <code>boolean</code>                    | 状态栏是否处于覆盖模式。             | 1.0.0  |
| **`height`**     | <code>number</code>                     | 状态栏的高度。                       | 7.0.0  |


#### SetOverlaysWebViewOptions

| 属性             | 类型                 | 描述                               | 自版本 |
| ---------------- | -------------------- | ---------------------------------- | ------ |
| **`overlay`**    | <code>boolean</code> | 是否让状态栏覆盖 WebView。         | 1.0.0  |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### VisibilityChangeListener

<code>(info: <a href="#statusbarinfo">StatusBarInfo</a>): void</code>


#### OverlayChangeListener

<code>(info: <a href="#statusbarinfo">StatusBarInfo</a>): void</code>


### 枚举


#### Style

| 成员             | 值                      | 描述                                                                                                                               | 自版本 |
| ---------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**       | <code>'DARK'</code>     | 深色背景上的浅色文本。                                                                                                             | 1.0.0  |
| **`Light`**      | <code>'LIGHT'</code>    | 浅色背景上的深色文本。                                                                                                             | 1.0.0  |
| **`Default`**    | <code>'DEFAULT'</code>  | 样式基于设备外观。如果设备使用深色模式，状态栏文本将为浅色；如果设备使用浅色模式，状态栏文本将为深色。                             | 1.0.0  |


#### Animation

| 成员           | 值                    | 描述                                                   | 自版本 |
| -------------- | --------------------- | ------------------------------------------------------ | ------ |
| **`None`**     | <code>'NONE'</code>   | 显示/隐藏时无动画。                                    | 1.0.0  |
| **`Slide`**    | <code>'SLIDE'</code>  | 显示/隐藏时使用滑动动画。在 iOS 15+ 上无效。           | 1.0.0  |
| **`Fade`**     | <code>'FADE'</code>   | 显示/隐藏时使用淡入淡出动画。                          | 1.0.0  |

</docgen-api>