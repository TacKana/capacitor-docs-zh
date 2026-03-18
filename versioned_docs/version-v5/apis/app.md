---
title: App Capacitor Plugin API
description: App API 负责处理应用的高级状态和事件。例如，当应用进入和离开前台时，该 API 会发出事件，处理深度链接、打开其他应用，并管理持久化的插件状态。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app/src/definitions.ts
sidebar_label: App
---

# @capacitor/app

App API 负责处理应用的高级状态和事件。例如，当应用进入和离开前台时，该 API 会发出事件，处理深度链接、打开其他应用，并管理持久化的插件状态。

## 安装

```bash
npm install @capacitor/app@latest-5
npx cap sync
```

## iOS

为了能够通过自定义协议（scheme）打开应用，你需要先注册该协议。你可以通过编辑 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 文件并添加以下行来实现。

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.getcapacitor.capacitor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>mycustomscheme</string>
    </array>
  </dict>
</array>
```

## Android

为了能够通过自定义协议打开应用，你需要先注册该协议。你可以通过将以下行添加到 `AndroidManifest.xml` 的 `activity` 部分来实现。

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 的值存储在 `strings.xml` 中。当添加 Android 平台时，`@capacitor/cli` 会添加应用的包名作为默认值，但可以通过编辑 `strings.xml` 文件来替换。

## 示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('应用状态已更改。是否处于活动状态？', isActive);
});

App.addListener('appUrlOpen', data => {
  console.log('应用通过 URL 打开：', data);
});

App.addListener('appRestoredResult', data => {
  console.log('恢复的状态：', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log('应用通过 URL 打开：' + url);
};
```

## API

<docgen-index>

* [`exitApp()`](#exitapp)
* [`getInfo()`](#getinfo)
* [`getState()`](#getstate)
* [`getLaunchUrl()`](#getlaunchurl)
* [`minimizeApp()`](#minimizeapp)
* [`addListener('appStateChange', ...)`](#addlistenerappstatechange-)
* [`addListener('pause', ...)`](#addlistenerpause-)
* [`addListener('resume', ...)`](#addlistenerresume-)
* [`addListener('appUrlOpen', ...)`](#addlistenerappurlopen-)
* [`addListener('appRestoredResult', ...)`](#addlistenerapprestoredresult-)
* [`addListener('backButton', ...)`](#addlistenerbackbutton-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### exitApp()

```typescript
exitApp() => Promise<void>
```

强制退出应用。这应该仅与 Android 的 `backButton` 处理程序结合使用，以便在导航完成时退出应用。

Ionic 会自行处理此功能，因此如果你使用 Ionic，则无需调用此方法。

**自：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

返回有关应用的信息。

**返回：** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**自：** 1.0.0

--------------------


### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**返回：** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**自：** 1.0.0

--------------------


### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取应用启动时使用的 URL（如果有）。

**返回：** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**自：** 1.0.0

--------------------


### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用程序。

仅适用于 Android。

**自：** 1.1.0

--------------------


### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动状态的变化。

在 iOS 上，当原生的 [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) 和
[UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) 事件触发时，此监听器会触发。
在 Android 上，当 Capacitor 的 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 和 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法被调用时，此监听器会触发。
在 Web 上，当文档的 visibilitychange 事件触发时，此监听器会触发。

| 参数                 | 类型                                                                        |
| -------------------- | --------------------------------------------------------------------------- |
| **`eventName`**      | <code>'appStateChange'</code>                                               |
| **`listenerFunc`**   | <code><a href="#statechangelistener">StateChangeListener</a></code>         |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('pause', ...)

```typescript
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动暂停时的事件。

在 iOS 上，当原生的 [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) 事件触发时，此监听器会触发。
在 Android 上，当 Capacitor 的 Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法被调用时，此监听器会触发。
在 Web 上，当文档的 visibilitychange 事件触发且 document.hidden 为 true 时，此监听器会触发。

| 参数                 | 类型                       |
| -------------------- | -------------------------- |
| **`eventName`**      | <code>'pause'</code>       |
| **`listenerFunc`**   | <code>() =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 4.1.0

--------------------### addListener('resume', ...)

```typescript
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动恢复运行的事件。

在 iOS 上，当原生的 [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) 事件被触发时，此事件会触发。
在 Android 上，当 Capacitor 的 Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法被调用时触发，但仅在 resume 事件首次触发之后。
在 Web 上，当文档的 visibilitychange 事件被触发且 document.hidden 为 false 时触发。

| 参数                  | 类型                       |
| --------------------- | -------------------------- |
| **`eventName`**       | <code>'resume'</code>      |
| **`listenerFunc`**    | <code>() =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 4.1.0

--------------------

### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用打开 URL 的事件。此功能同时处理自定义 URL 方案链接以及你的应用处理的 URL（在 iOS 上是通用链接，在 Android 上是应用链接）。

| 参数                  | 类型                                                        |
| --------------------- | ----------------------------------------------------------- |
| **`eventName`**       | <code>'appUrlOpen'</code>                                   |
| **`listenerFunc`**    | <code><a href="#urlopenlistener">URLOpenListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------

### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

如果应用启动时带有之前持久化的插件调用数据（例如在 Android 上，当活动返回到一个已关闭的应用时），此调用将返回应用启动时携带的任何数据，这些数据会转换为插件调用的结果形式。

在 Android 上，由于低端设备的内存限制，如果你的应用启动了一个新的活动，操作系统可能会终止你的应用以减少内存消耗。

例如，这意味着启动新活动来拍照的 Camera API 可能无法将数据返回给你的应用。

为了避免这种情况，Capacitor 在启动时会存储所有恢复的活动结果。你应该为 `appRestoredResult` 添加一个监听器，以便处理应用未运行时传递的任何插件调用结果。

一旦你获得该结果（如果有），你可以更新 UI 以恢复用户的逻辑体验，例如导航或选择正确的标签页。

我们建议每个使用依赖外部活动（例如 Camera）的插件的 Android 应用都处理此事件和流程。

| 参数                  | 类型                                                          |
| --------------------- | ------------------------------------------------------------- |
| **`eventName`**       | <code>'appRestoredResult'</code>                              |
| **`listenerFunc`**    | <code><a href="#restoredlistener">RestoredListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------

### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听硬件返回按钮事件（仅限 Android）。监听此事件将禁用默认的返回按钮行为，因此你可能需要手动调用 `window.history.back()`。如果你想关闭应用，请调用 `App.exitApp()`。

| 参数                  | 类型                                                              |
| --------------------- | ----------------------------------------------------------------- |
| **`eventName`**       | <code>'backButton'</code>                                         |
| **`listenerFunc`**    | <code><a href="#backbuttonlistener">BackButtonListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器

**自版本：** 1.0.0

--------------------

### 接口


#### AppInfo

| 属性           | 类型                | 描述                                                                                          | 自版本 |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------- | ------ |
| **`name`**     | <code>string</code> | 应用名称。                                                                                    | 1.0.0  |
| **`id`**       | <code>string</code> | 应用标识符。在 iOS 上是 Bundle Identifier，在 Android 上是 Application ID。                   | 1.0.0  |
| **`build`**    | <code>string</code> | 构建版本。在 iOS 上是 CFBundleVersion，在 Android 上是 versionCode。                          | 1.0.0  |
| **`version`**  | <code>string</code> | 应用版本。在 iOS 上是 CFBundleShortVersionString，在 Android 上是 package 的 versionName。    | 1.0.0  |


#### AppState

| 属性            | 类型                 | 描述                     | 自版本 |
| --------------- | -------------------- | ------------------------ | ------ |
| **`isActive`**  | <code>boolean</code> | 应用是否处于活动状态。   | 1.0.0  |


#### AppLaunchUrl

| 属性        | 类型                | 描述                   | 自版本 |
| ----------- | ------------------- | ---------------------- | ------ |
| **`url`**   | <code>string</code> | 用于打开应用的 URL。   | 1.0.0  |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------- | ----------------------------------------- |
| **`remove`**  | <code>() =&gt; Promise&lt;void&gt;</code> |#### URLOpenListenerEvent

| 属性                       | 类型                 | 说明                                                                                                                                                                        | 始于 |
| -------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                  | <code>string</code>  | 应用被打开时传入的 URL。                                                                                                                                                   | 1.0.0 |
| **`iosSourceApplication`** | <code>any</code>     | 打开当前应用的源应用（仅限 iOS）https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                                   | 1.0.0 |
| **`iosOpenInPlace`**       | <code>boolean</code> | 指示应用是否应在原位置打开传入的文档，还是必须先复制一份。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace               | 1.0.0 |


#### RestoredListenerEvent

| 属性             | 类型                              | 说明                                                                                                                                       | 始于 |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`pluginId`**   | <code>string</code>               | 此结果对应的插件 ID。例如 `Camera`。                                                                                                       | 1.0.0 |
| **`methodName`** | <code>string</code>               | 此结果对应的方法名。例如 `getPhoto`。                                                                                                      | 1.0.0 |
| **`data`**       | <code>any</code>                  | 从插件传递过来的结果数据。这通常是你正常调用插件方法时预期的结果类型。例如 `CameraPhoto`。                                                 | 1.0.0 |
| **`success`**    | <code>boolean</code>              | 布尔值，表示插件调用是否成功。                                                                                                             | 1.0.0 |
| **`error`**      | <code>{ message: string; }</code> | 如果插件调用失败，将包含错误信息。                                                                                                         | 1.0.0 |


#### BackButtonListenerEvent

| 属性            | 类型                 | 说明                                                                                               | 始于 |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------- | ----- |
| **`canGoBack`** | <code>boolean</code> | 指示浏览器是否可以返回历史记录。当历史堆栈位于第一个条目时，该值为 false。                         | 1.0.0 |


### 类型别名


#### StateChangeListener

<code>(state: <a href="#appstate">AppState</a>): void</code>


#### URLOpenListener

<code>(event: <a href="#urlopenlistenerevent">URLOpenListenerEvent</a>): void</code>


#### RestoredListener

<code>(event: <a href="#restoredlistenerevent">RestoredListenerEvent</a>): void</code>


#### BackButtonListener

<code>(event: <a href="#backbuttonlistenerevent">BackButtonListenerEvent</a>): void</code>

</docgen-api>