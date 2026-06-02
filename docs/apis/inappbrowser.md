---
title: InAppBrowser Capacitor 插件 API
description: InAppBrowser 插件提供了一个 Web 浏览器视图，允许你从外部加载任何网页。它充当标准 Web 浏览器，对于加载不受信任的内容而不危及应用安全性非常有用。它提供了三种打开 URL 的方式：在 WebView 中、在应用内系统浏览器中（Android 上的 Custom Tabs 和 iOS 上的 SFSafariViewController）以及在设备默认浏览器中。
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts
sidebar_label: 应用内浏览器
source_hash: 6ad420a4
---

# @capacitor/inappbrowser

InAppBrowser 插件提供了一个 Web 浏览器视图，允许你从外部加载任何网页。它充当标准 Web 浏览器，对于加载不受信任的内容而不危及应用安全性非常有用。它提供了三种打开 URL 的方式：在 WebView 中、在应用内系统浏览器中（Android 上的 Custom Tabs 和 iOS 上的 SFSafariViewController）以及在设备默认浏览器中。

## 安装

```bash
npm install @capacitor/inappbrowser
npx cap sync
```

## 支持的平台

- iOS
- Android

#### Android

InAppBrowser 插件要求最低 Android SDK 目标为 26。这高于 Capacitor 应用附带的默认值。你可以在 `android/variables.gradle` 文件中更新此值。

```gradle
ext {
    minSdkVersion = 26
}
```

#### LocalStorage 隔离
`openInWebView` 选项为 `localStorage` 和 `cookies` 提供了隔离，以确保在 InAppBrowser 中加载的内容不会干扰主应用的存储。

- **iOS**：默认情况下隔离存储。
- **Android (API 28+)**：默认情况下通过在一个单独的进程 (`:OSInAppBrowser`) 中运行 InAppBrowser 并使用专用的数据目录后缀来**隔离存储**。
- **Android (API < 28)**：由于平台限制，存储与**主应用共享**。

### 选择退出隔离（Android）
如果你的用例需要在 Android 上的主应用和 InAppBrowser 之间共享 `localStorage` 或 `cookies`，你可以通过在 `android` 选项中设置 `isIsolated: false` 来选择退出隔离。

:::caution

禁用隔离会降低应用的安全性，允许潜在的不受信任的 Web 内容访问你的应用的私有存储（Cookies、LocalStorage 等）。仅在绝对必要时使用。

:::

:::warning

**破坏性变更（Android）**：升级到此版本的应用将丢失 InAppBrowser 先前存储的任何现有 `localStorage` 或 cookies。这是因为 WebView 现在运行在具有自己数据目录的单独进程中。用户可能需要重新登录依赖持久会话数据的网站。

:::

---

## 使用示例
#### 在外部浏览器中打开
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.openInExternalBrowser({
    url: "https://www.google.com"
});
```

#### 在系统浏览器中打开（Android 上的 Custom Tabs，iOS 上的 SFSafariViewController）
```typescript
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInSystemBrowser({
    url: "https://www.google.com",
    options: DefaultSystemBrowserOptions
});
```

#### 在 WebView 中打开
```typescript
import { InAppBrowser, DefaultWebViewOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInWebView({
    url: "https://www.google.com",
    options: DefaultWebViewOptions
});
```

#### 关闭（WebView 或系统浏览器）
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.close();
```

#### 添加监听器
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.addListener('browserClosed', () => {
    console.log("浏览器已关闭。");
});

await InAppBrowser.addListener('browserPageNavigationCompleted', (data) => {
    console.log("浏览器页面导航已完成。" + data.url);
});

await InAppBrowser.addListener('browserPageLoaded', () => {
    console.log("浏览器已加载。");
});
```

#### 移除所有监听器
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
InAppBrowser.removeAllListeners();
```

## API

<docgen-index>

* [`openInWebView(...)`](#openinwebview)
* [`openInSystemBrowser(...)`](#openinsystembrowser)
* [`openInExternalBrowser(...)`](#openinexternalbrowser)
* [`close()`](#close)
* [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
* [`addListener('browserPageNavigationCompleted', ...)`](#addlistenerbrowserpagenavigationcompleted-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#接口)
* [Enums](#枚举)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### openInWebView(...)

```typescript
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

在你的移动应用中使用自定义 WebView 打开给定 URL 的 Web 内容。

| 参数       | 类型                                                                                | 描述                                    |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| **`model`** | <code><a href="#openinwebviewparametermodel">OpenInWebViewParameterModel</a></code> | 在 WebView 中打开 URL 的参数 |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

在你的移动应用中使用 SafariViewController（iOS）和 Custom Tabs（Android）打开给定 URL 的 Web 内容。

| 参数       | 类型                                                                                            | 描述                                          |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **`model`** | <code><a href="#openinsystembrowserparametermodel">OpenInSystemBrowserParameterModel</a></code> | 在系统浏览器中打开 URL 的参数 |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

在移动应用外部的单独浏览器中打开给定 URL 的 Web 内容。

| 参数       | 类型                                                                                | 描述                                            |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **`model`** | <code><a href="#openindefaultparametermodel">OpenInDefaultParameterModel</a></code> | 在外部浏览器中打开 URL 的参数 |

--------------------


### close()

```typescript
close() => Promise<void>
```

关闭当前的活动浏览器。可用于关闭通过 openInSystemBrowser 或 openInWebView 操作启动的浏览器。

--------------------


### addListener('browserClosed' | 'browserPageLoaded', ...)

```typescript
addListener(eventName: "browserClosed" | "browserPageLoaded", listenerFunc: () => void) => Promise<PluginListenerHandle>
```

为指定的浏览器事件添加监听器，不返回数据。

| 参数              | 类型                                                | 描述                                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> | 要监听的浏览器事件名称：'browserClosed' 或 'browserPageLoaded'。 |
| **`listenerFunc`** | <code>() =&gt; void</code>                          | 事件发生时调用的函数。                                     |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('browserPageNavigationCompleted', ...)

```typescript
addListener(eventName: "browserPageNavigationCompleted", listenerFunc: (data: BrowserPageNavigationCompletedEventData) => void) => Promise<PluginListenerHandle>
```

为指定的浏览器事件添加监听器，该事件接收数据。

| 参数              | 类型                                                                                                                           | 描述                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'browserPageNavigationCompleted'</code>                                                                                  | 要监听的浏览器事件名称：'browserPageNavigationCompleted'。仅适用于 openInWebView。 |
| **`listenerFunc`** | <code>(data: <a href="#browserpagenavigationcompletedeventdata">BrowserPageNavigationCompletedEventData</a>) =&gt; void</code> | 事件发生时调用的函数。                                                              |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除所有浏览器事件的监听器。

--------------------


### 接口


#### OpenInWebViewParameterModel

定义在 WebView 中打开 URL 的选项。

| 属性                | 类型                                                      | 描述                                                          |
| ------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **`options`**       | <code><a href="#webviewoptions">WebViewOptions</a></code> | 包含一些要应用于 WebView 的配置的结构体。 |
| **`customHeaders`** | <code>{ [key: string]: string; }</code>                   | 随请求发送的自定义请求头映射。                 |


#### WebViewOptions

| 属性                                  | 类型                                                                    | 描述                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`showURL`**                         | <code>boolean</code>                                                    | 在 WebView 上显示 URL。                                                                       |
| **`showToolbar`**                     | <code>boolean</code>                                                    | 在 WebView 上显示工具栏。                                                                   |
| **`clearCache`**                      | <code>boolean</code>                                                    | 在新窗口打开前清除 WebView 的 cookie 缓存。                                       |
| **`clearSessionCache`**               | <code>boolean</code>                                                    | 在新窗口打开前清除会话 cookie 缓存。                                          |
| **`mediaPlaybackRequiresUserAction`** | <code>boolean</code>                                                    | 防止 HTML5 音频或视频自动播放。                                                        |
| **`closeButtonText`**                 | <code>string</code>                                                     | 设置 WebView 上关闭按钮显示的文本。                                           |
| **`toolbarPosition`**                 | <code><a href="#toolbarposition">ToolbarPosition</a></code>             | 设置 WebView 上工具栏的显示位置。                                               |
| **`showNavigationButtons`**           | <code>boolean</code>                                                    | 显示导航按钮。                                                                        |
| **`leftToRight`**                     | <code>boolean</code>                                                    | 交换导航按钮和关闭按钮的位置。                                     |
| **`customWebViewUserAgent`**          | <code>string \| null</code>                                             | 设置打开 WebView 的自定义用户代理。如果为空或未设置，将忽略该参数。 |
| **`android`**                         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> | Android 特定的 WebView 选项。                                                                      |
| **`iOS`**                             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         | iOS 特定的 WebView 选项。                                                                          |


#### AndroidWebViewOptions

| 属性               | 类型                 | 描述                                                                                                                                |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`allowZoom`**    | <code>boolean</code> | 显示 Android 浏览器的缩放控件。                                                                                                 |
| **`hardwareBack`** | <code>boolean</code> | 使用硬件返回按钮在 WebView 的历史记录中向后导航。如果没有上一页，WebView 将关闭。 |
| **`pauseMedia`**   | <code>boolean</code> | 使 WebView 随应用暂停/恢复，以停止后台音频。                                                                     |
| **`isIsolated`**   | <code>boolean</code> | 是否在隔离进程中运行 InAppBrowser。仅适用于 Android。默认为 true。                                                    |


#### iOSWebViewOptions

| 属性                                      | 类型                                                  | 描述                                                                                                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`allowOverScroll`**                     | <code>boolean</code>                                  | 打开 WebView 的弹跳属性。                                                                                                                                                                         |
| **`enableViewportScale`**                 | <code>boolean</code>                                  | 通过 meta 标签防止视口缩放。                                                                                                                                                                  |
| **`allowInLineMediaPlayback`**            | <code>boolean</code>                                  | 允许内联 HTML5 媒体播放，显示在浏览器窗口内而不是设备特定的播放界面。注意：HTML 的 video 元素还必须包含 webkit-playsinline 属性。 |
| **`surpressIncrementalRendering`**        | <code>boolean</code>                                  | 等待所有新的视图内容接收完毕后再进行渲染。                                                                                                                                            |
| **`viewStyle`**                           | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | 设置 WebView 的呈现样式。                                                                                                                                                                   |
| **`animationEffect`**                     | <code><a href="#iosanimation">iOSAnimation</a></code> | 设置 WebView 的过渡样式。                                                                                                                                                                     |
| **`allowsBackForwardNavigationGestures`** | <code>boolean</code>                                  | 在 WebView 中启用前进和后退滑动手势。                                                                                                                                                       |


#### OpenInSystemBrowserParameterModel

定义在系统浏览器中打开 URL 的选项。

| 属性          | 类型                                                                  | 描述                                                                |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> | 包含一些要应用于系统浏览器的配置的结构体。 |


#### SystemBrowserOptions

| 属性          | 类型                                                                                | 描述                              |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| **`android`** | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> | Android 特定的系统浏览器选项。 |
| **`iOS`**     | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         | iOS 特定的系统浏览器选项。     |


#### AndroidSystemBrowserOptions

| 属性                      | 类型                                                              | 描述                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`showTitle`**           | <code>boolean</code>                                              | 启用标题显示。                                                                                                       |
| **`hideToolbarOnScroll`** | <code>boolean</code>                                              | 滚动时隐藏工具栏。                                                                                                |
| **`viewStyle`**           | <code><a href="#androidviewstyle">AndroidViewStyle</a></code>     | 设置 Custom Tabs 的呈现样式。                                                                                       |
| **`bottomSheetOptions`**  | <code><a href="#androidbottomsheet">AndroidBottomSheet</a></code> | 当 viewStyle 选择底部表单时设置其选项。如果 viewStyle 是 FULL_SCREEN，则忽略此项。 |
| **`startAnimation`**      | <code><a href="#androidanimation">AndroidAnimation</a></code>     | 设置浏览器出现时的开始动画。                                                                           |
| **`exitAnimation`**       | <code><a href="#androidanimation">AndroidAnimation</a></code>     | 设置浏览器消失时的退出动画。                                                                           |


#### AndroidBottomSheet

| 属性          | 类型                 | 描述                                                                                                                                                                        |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`height`**  | <code>number</code>  | 设置底部表单的高度（以像素为单位）。Custom Tabs 将底部高度设置为至少屏幕的 50%。如果未传递值，则默认为最小值。 |
| **`isFixed`** | <code>boolean</code> | 设置底部表单是否固定。                                                                                                                                            |


#### iOSSystemBrowserOptions

| 属性                       | 类型                                                  | 描述                                          |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> | 设置用作关闭按钮标题的文本。    |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | 设置 SafariViewController 的呈现样式。 |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> | 设置 SafariViewController 的过渡样式。 |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  | 启用向下滚动时折叠工具栏。          |
| **`enableReadersMode`**    | <code>boolean</code>                                  | 启用阅读器模式。                                |


#### OpenInDefaultParameterModel

定义在外部浏览器中打开 URL 的选项，并被其他选项使用。

| 属性      | 类型                | 描述                                                                            |
| --------- | ------------------- | -------------------------------------------------------------------------------------- |
| **`url`** | <code>string</code> | 要打开的 URL。必须包含 'http' 或 'https' 作为协议前缀。 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### BrowserPageNavigationCompletedEventData

定义 'browserPageNavigationCompleted' 事件的数据。

| 属性      | 类型                | 描述                          |
| --------- | ------------------- | ------------------------------------ |
| **`url`** | <code>string</code> | 已加载页面的 URL。 |


### 枚举


#### ToolbarPosition

| Members      |
| ------------ |
| **`TOP`**    |
| **`BOTTOM`** |


#### iOSViewStyle

| Members           |
| ----------------- |
| **`PAGE_SHEET`**  |
| **`FORM_SHEET`**  |
| **`FULL_SCREEN`** |


#### iOSAnimation

| Members               |
| --------------------- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`**  |
| **`COVER_VERTICAL`**  |


#### AndroidViewStyle

| Members            |
| ------------------ |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`**  |


#### AndroidAnimation

| Members               |
| --------------------- |
| **`FADE_IN`**         |
| **`FADE_OUT`**        |
| **`SLIDE_IN_LEFT`**   |
| **`SLIDE_OUT_RIGHT`** |


#### DismissStyle

| Members      |
| ------------ |
| **`CLOSE`**  |
| **`CANCEL`** |
| **`DONE`**   |

</docgen-api>
