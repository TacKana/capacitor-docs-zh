---
title: Status Bar Capacitor Plugin API
description: StatusBar API 提供了配置状态栏样式以及显示或隐藏状态栏的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts
sidebar_label: Status Bar
---

# @capacitor/status-bar

StatusBar API 提供了配置状态栏样式以及显示或隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar
npx cap sync
```

## Android 16+ 行为变更

针对使用 **Capacitor 8** 且目标版本为 **Android 16（API 等级 36）** 或更高的应用，以下状态栏配置选项**将不再生效**：

- `overlaysWebView`
- `backgroundColor`

这些选项依赖于能够选择退出安卓的**边到边（edge-to-edge）** 系统 UI 行为，该行为允许应用控制状态栏的覆盖方式及其背景颜色。

在 **Android 15（API 等级 35）** 中，仍然可以通过在应用布局文件中设置 `windowOptOutEdgeToEdgeEnforcement` 属性来退出这种强制行为。
如果没有该属性，应用会将 `overlaysWebView` 视为始终 `true`。
更多详情请参阅安卓文档：[https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement](https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement)

从 **Android 16** 开始，此退出选项**不再可用**，该行为由系统强制执行。  
因此，`overlaysWebView` 和 `backgroundColor` 配置选项将不再产生任何效果。

## iOS 说明

此插件要求在 `Info.plist` 中将 "View controller-based status bar appearance"（`UIViewControllerBasedStatusBarAppearance`）设置为 `YES`。请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 获取帮助。

状态栏默认可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

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
<!--请更新源文件中的 JSDoc 注释并重新运行 docgen 以更新以下文档-->

可用的配置值如下：

| 属性                     | 类型                   | 描述                                                                                                                               | 默认值               | 始于版本 |
|--------------------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------|----------------------|----------|
| **`overlaysWebView`**    | <code>boolean</code>   | 状态栏是否覆盖在 WebView 之上。在 Android 15+ 上不可用。                                                                           | <code>true</code>    | 1.0.0    |
| **`style`**              | <code>string</code>    | 状态栏文本的<a href="#style">样式</a>。                                                                                            | <code>default</code> | 1.0.0    |
| **`backgroundColor`**    | <code>string</code>    | 状态栏背景颜色的十六进制格式，例如 #RRGGBB。如果 `overlaysWebView` 为 true 则不生效。在 Android 15+ 上不可用。                     | <code>#000000</code> | 1.0.0    |

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
<!--请更新源文件中的 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏的当前样式。

| 参数          | 类型                                                  |
|---------------|-------------------------------------------------------|
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**始于版本：** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。
如果样式设置为默认，调用此函数将更新状态栏的前景颜色（iOS 17 以下版本除外）。
在 Android 15+ 上不可用。

| 参数          | 类型                                                                      |
|---------------|---------------------------------------------------------------------------|
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**始于版本：** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上，如果状态栏最初被隐藏且初始样式设置为 `UIStatusBarStyleLightContent`，则首次调用 show 时，动画可能会显示文本为深色然后过渡到浅色的闪烁现象。建议在首次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画选项。

| 参数          | 类型                                                          |
|---------------|---------------------------------------------------------------|
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**始于版本：** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
|---------------|---------------------------------------------------------------|
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**始于版本：** 1.0.0

--------------------### getInfo()

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
不适用于 Android 15+。

| 参数           | 类型                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code>     |

**自版本：** 1.0.0

--------------------


### addListener('statusBarVisibilityChanged', ...)

```typescript
addListener(eventName: 'statusBarVisibilityChanged', listenerFunc: VisibilityChangeListener) => Promise<PluginListenerHandle>
```

监听状态栏可见性变化。
当 hide 或 show 方法被调用时触发。

| 参数                | 类型                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| **`eventName`**     | <code>'statusBarVisibilityChanged'</code>                                       |
| **`listenerFunc`**  | <code><a href="#visibilitychangelistener">VisibilityChangeListener</a></code>   |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 7.0.0

--------------------


### addListener('statusBarOverlayChanged', ...)

```typescript
addListener(eventName: 'statusBarOverlayChanged', listenerFunc: OverlayChangeListener) => Promise<PluginListenerHandle>
```

监听状态栏覆盖状态变化。
当 setOverlaysWebView 被调用时触发。

| 参数                | 类型                                                                        |
| ------------------- | --------------------------------------------------------------------------- |
| **`eventName`**     | <code>'statusBarOverlayChanged'</code>                                      |
| **`listenerFunc`**  | <code><a href="#overlaychangelistener">OverlayChangeListener</a></code>     |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 7.0.0

--------------------


### 接口


#### StyleOptions

| 属性           | 类型                                    | 描述                                                | 自版本 |
| -------------- | --------------------------------------- | --------------------------------------------------- | ------ |
| **`style`**    | <code><a href="#style">Style</a></code> | 状态栏文本的<a href="#style">样式</a>。             | 1.0.0  |


#### BackgroundColorOptions

| 属性           | 类型                | 描述                                      | 自版本 |
| -------------- | ------------------- | ----------------------------------------- | ------ |
| **`color`**    | <code>string</code> | 用于设置状态栏颜色的十六进制颜色值。      | 1.0.0  |


#### AnimationOptions

| 属性                | 类型                                            | 描述                                                                                         | 默认值                        | 自版本 |
| ------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| **`animation`**     | <code><a href="#animation">Animation</a></code> | 显示或隐藏状态栏时使用的动画类型。此选项仅在 iOS 上受支持。                                  | <code>Animation.Fade</code>   | 1.0.0  |


#### StatusBarInfo

| 属性              | 类型                                    | 描述                             | 自版本 |
| ----------------- | --------------------------------------- | -------------------------------- | ------ |
| **`visible`**     | <code>boolean</code>                    | 状态栏是否可见。                 | 1.0.0  |
| **`style`**       | <code><a href="#style">Style</a></code> | 当前状态栏样式。                 | 1.0.0  |
| **`color`**       | <code>string</code>                     | 当前状态栏颜色。                 | 1.0.0  |
| **`overlays`**    | <code>boolean</code>                    | 状态栏是否处于覆盖模式。         | 1.0.0  |
| **`height`**      | <code>number</code>                     | 状态栏的高度。                   | 7.0.0  |


#### SetOverlaysWebViewOptions

| 属性              | 类型                 | 描述                              | 自版本 |
| ----------------- | -------------------- | --------------------------------- | ------ |
| **`overlay`**     | <code>boolean</code> | 是否将状态栏设置为覆盖模式。      | 1.0.0  |


#### PluginListenerHandle

| 属性            | 类型                                      |
| --------------- | ----------------------------------------- |
| **`remove`**    | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### VisibilityChangeListener

<code>(info: <a href="#statusbarinfo">StatusBarInfo</a>): void</code>


#### OverlayChangeListener

<code>(info: <a href="#statusbarinfo">StatusBarInfo</a>): void</code>


### 枚举


#### Style

| 成员             | 值                      | 描述                                                                                                                              | 自版本 |
| ---------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**       | <code>'DARK'</code>     | 深色背景上的浅色文本。                                                                                                            | 1.0.0  |
| **`Light`**      | <code>'LIGHT'</code>    | 浅色背景上的深色文本。                                                                                                            | 1.0.0  |
| **`Default`**    | <code>'DEFAULT'</code>  | 样式基于设备外观。如果设备使用深色模式，状态栏文本将为浅色；如果设备使用浅色模式，状态栏文本将为深色。                           | 1.0.0  |


#### Animation

| 成员            | 值                    | 描述                                                   | 自版本 |
| --------------- | --------------------- | ------------------------------------------------------ | ------ |
| **`None`**      | <code>'NONE'</code>   | 显示/隐藏时无动画。                                    | 1.0.0  |
| **`Slide`**     | <code>'SLIDE'</code>  | 显示/隐藏时使用滑动动画。在 iOS 15+ 上无效。           | 1.0.0  |
| **`Fade`**      | <code>'FADE'</code>   | 显示/隐藏时使用淡入淡出动画。                          | 1.0.0  |

</docgen-api>