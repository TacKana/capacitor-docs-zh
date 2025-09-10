---
title: Status Bar Capacitor Plugin API
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

本插件要求 `Info.plist` 文件中将 "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) 设置为 `YES`。如需帮助，请参阅 [iOS 配置文档](https://capacitorjs.com/docs/v3/ios/configuration)。

状态栏默认可见，样式默认为 `Style.Default`。您可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来修改这些默认值。

当前 iOS 设备不支持 `setBackgroundColor` 和 `setOverlaysWebView` 方法。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅 iOS 有效
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
});

// 让内容显示在透明状态栏下方（仅 Android 有效）
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

**自版本:** 1.0.0

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏背景颜色。

此方法仅 Android 支持。

| 参数          | 类型                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**自版本:** 1.0.0

---

### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本:** 1.0.0

---

### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**自版本:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取状态栏当前状态信息。

**返回值:** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**自版本:** 1.0.0

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否覆盖 WebView 以利用其下方空间。

此方法仅 Android 支持。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**自版本:** 1.0.0

---

### Interfaces

#### StyleOptions

| 属性        | 类型                                    | 描述                                     | 版本  |
| ----------- | --------------------------------------- | ---------------------------------------- | ----- |
| **`style`** | <code><a href="#style">Style</a></code> | 状态栏文本的 <a href="#style">样式</a>。 | 1.0.0 |

#### BackgroundColorOptions

| 属性        | 类型                | 描述                                                | 版本  |
| ----------- | ------------------- | --------------------------------------------------- | ----- |
| **`color`** | <code>string</code> | 设置状态栏颜色的十六进制值。此选项仅 Android 支持。 | 1.0.0 |

#### AnimationOptions

| 属性            | 类型                                            | 描述                                                 | 版本  |
| --------------- | ----------------------------------------------- | ---------------------------------------------------- | ----- |
| **`animation`** | <code><a href="#animation">Animation</a></code> | 显示/隐藏时使用的状态栏动画类型。仅 iOS 支持此选项。 | 1.0.0 |

#### StatusBarInfo

| 属性           | 类型                                    | 描述                                        | 版本  |
| -------------- | --------------------------------------- | ------------------------------------------- | ----- |
| **`visible`**  | <code>boolean</code>                    | 状态栏是否可见。                            | 1.0.0 |
| **`style`**    | <code><a href="#style">Style</a></code> | 当前状态栏样式。                            | 1.0.0 |
| **`color`**    | <code>string</code>                     | 当前状态栏颜色。此选项仅 Android 支持。     | 1.0.0 |
| **`overlays`** | <code>boolean</code>                    | 状态栏是否覆盖内容。此选项仅 Android 支持。 | 1.0.0 |

#### SetOverlaysWebViewOptions

| 属性          | 类型                 | 描述                       | 版本  |
| ------------- | -------------------- | -------------------------- | ----- |
| **`overlay`** | <code>boolean</code> | 是否让状态栏覆盖 WebView。 | 1.0.0 |

### Enums

#### Style

| 成员          | 值                     | 描述                                                                                                                                                         | 版本  |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景配浅色文字。                                                                                                                                         | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景配深色文字。                                                                                                                                         | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | iOS 13 及以上版本根据设备外观自动适配：深色模式使用浅色文字，浅色模式使用深色文字。iOS 12 及以下版本固定使用深色文字。Android 平台使用应用启动时的默认样式。 | 1.0.0 |

#### Animation

| 成员        | 值                   | 描述                    | 版本  |
| ----------- | -------------------- | ----------------------- | ----- |
| **`None`**  | <code>'NONE'</code>  | 显示/隐藏时不使用动画。 | 1.0.0 |
| **`Slide`** | <code>'SLIDE'</code> | 使用滑动动画。          | 1.0.0 |
| **`Fade`**  | <code>'FADE'</code>  | 使用淡入淡出动画。      | 1.0.0 |

</docgen-api>
