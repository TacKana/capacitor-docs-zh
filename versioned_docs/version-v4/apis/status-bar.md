---
title: Status Bar Capacitor 插件 API
description: StatusBar API 提供配置状态栏样式以及显示/隐藏状态栏的方法。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts
sidebar_label: 状态栏
---

# @capacitor/status-bar

StatusBar API 提供配置状态栏样式以及显示/隐藏状态栏的方法。

## 安装

```bash
npm install @capacitor/status-bar
npx cap sync
```

## iOS 注意事项

此插件需要在 `Info.plist` 中将 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。如需帮助请阅读 [iOS 配置指南](https://capacitorjs.com/docs/ios/configuration)。

状态栏默认可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来修改这些默认值。

`setBackgroundColor` 和 `setOverlaysWebView` 方法目前在 iOS 设备上不受支持。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅限 iOS
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
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

- [`setStyle(...)`](#setstyle)
- [`setBackgroundColor(...)`](#setbackgroundcolor)
- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [`getInfo()`](#getinfo)
- [`setOverlaysWebView(...)`](#setoverlayswebview)
- [接口](#interfaces)
- [枚举](#enums)

</docgen-index>

<docgen-api>

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏当前样式。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**自版本：** 1.0.0

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏背景颜色。

此方法仅支持 Android。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**自版本：** 1.0.0

---

### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上，如果状态栏初始为隐藏且初始样式设置为 `UIStatusBarStyleLightContent`，首次调用 show 方法时可能会出现动画异常，显示文本先为深色再过渡为浅色。建议在首次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画选项。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本：** 1.0.0

---

### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本：** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取状态栏当前状态信息。

**返回值：** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**自版本：** 1.0.0

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否覆盖 WebView，以便使用其下方的空间。

此方法仅支持 Android。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**自版本：** 1.0.0

---

### Interfaces

#### StyleOptions

| 属性        | 类型                                    | 描述                                    | 自版本 |
| ----------- | --------------------------------------- | --------------------------------------- | ------ |
| **`style`** | <code><a href="#style">Style</a></code> | 状态栏文本的<a href="#style">样式</a>。 | 1.0.0  |

#### BackgroundColorOptions

| 属性        | 类型                | 描述                                               | 自版本 |
| ----------- | ------------------- | -------------------------------------------------- | ------ |
| **`color`** | <code>string</code> | 设置状态栏颜色的十六进制值。此选项仅支持 Android。 | 1.0.0  |

#### AnimationOptions

| 属性            | 类型                                            | 描述                                                 | 自版本 |
| --------------- | ----------------------------------------------- | ---------------------------------------------------- | ------ |
| **`animation`** | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅支持 iOS。 | 1.0.0  |

#### StatusBarInfo

| 属性           | 类型                                    | 描述                                           | 自版本 |
| -------------- | --------------------------------------- | ---------------------------------------------- | ------ |
| **`visible`**  | <code>boolean</code>                    | 状态栏是否可见。                               | 1.0.0  |
| **`style`**    | <code><a href="#style">Style</a></code> | 当前状态栏样式。                               | 1.0.0  |
| **`color`**    | <code>string</code>                     | 当前状态栏颜色。此选项仅支持 Android。         | 1.0.0  |
| **`overlays`** | <code>boolean</code>                    | 状态栏是否处于覆盖模式。此选项仅支持 Android。 | 1.0.0  |

#### SetOverlaysWebViewOptions

| 属性          | 类型                 | 描述             | 自版本 |
| ------------- | -------------------- | ---------------- | ------ |
| **`overlay`** | <code>boolean</code> | 是否覆盖状态栏。 | 1.0.0  |

### Enums

#### Style

| 成员          | 值                     | 描述                                                                                                                                                      | 自版本 |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景下的浅色文本。                                                                                                                                    | 1.0.0  |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景下的深色文本。                                                                                                                                    | 1.0.0  |
| **`Default`** | <code>'DEFAULT'</code> | 样式基于设备外观。如果设备使用深色模式，状态栏文本将显示为浅色；如果设备使用浅色模式，状态栏文本将显示为深色。在 Android 上，默认样式为应用启动时的样式。 | 1.0.0  |

#### Animation

| 成员        | 值                   | 描述                                         | 自版本 |
| ----------- | -------------------- | -------------------------------------------- | ------ |
| **`None`**  | <code>'NONE'</code>  | 显示/隐藏时不使用动画。                      | 1.0.0  |
| **`Slide`** | <code>'SLIDE'</code> | 显示/隐藏时使用滑动动画。在 iOS 15+ 上无效。 | 1.0.0  |
| **`Fade`**  | <code>'FADE'</code>  | 显示/隐藏时使用淡入淡出动画。                | 1.0.0  |

</docgen-api>
