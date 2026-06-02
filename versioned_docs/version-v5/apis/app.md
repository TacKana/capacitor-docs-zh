---
title: App Capacitor 插件 API
description: App API 处理高级别的应用状态和事件。例如，此 API 在应用进入和离开前台时发出事件，处理深层链接，打开其他应用，并管理持久化插件状态。
translated: true
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/app/src/definitions.ts
sidebar_label: App
---

# @capacitor/app

App API 处理高级别的应用状态和事件。例如，此 API 在应用进入和离开前台时发出事件，处理深层链接，打开其他应用，并管理持久化插件状态。

## 安装

```bash
npm install @capacitor/app@latest-5
npx cap sync
```

## iOS

为了能够从自定义 scheme 打开应用，您需要先注册该 scheme。您可以通过编辑 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 文件并添加以下内容来实现。

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

为了能够从自定义 scheme 打开应用，您需要先注册该 scheme。您可以通过在 `AndroidManifest.xml` 的 `activity` 部分中添加以下内容来实现。

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 值存储在 `strings.xml` 中。当添加 Android 平台时，`@capacitor/cli` 会将应用的包名添加为默认值，但可以通过编辑 `strings.xml` 文件来替换。

## 示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('应用状态已更改。是否活跃？', isActive);
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### exitApp()

```typescript
exitApp() => Promise<void>
```

强制退出应用。这应仅与 Android 的 `backButton` 处理程序结合使用，以在导航完成时退出应用。

Ionic 自身会处理此操作，因此如果您使用 Ionic，则无需调用此方法。

**自从：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

返回关于应用的信息。

**返回：** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**自从：** 1.0.0

--------------------


### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**返回：** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**自从：** 1.0.0

--------------------


### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取应用启动时的 URL（如果有）。

**返回：** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**自从：** 1.0.0

--------------------


### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用。

仅 Android 可用。

**自从：** 1.1.0

--------------------


### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或 Activity 状态的变化。

在 iOS 上，当原生的 [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) 和
[UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) 事件被触发时触发。
在 Android 上，当 Capacitor 的 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 和 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法被调用时触发。
在 Web 上，当文档的 visibilitychange 被触发时触发。

| 参数              | 类型                                                              |
| ----------------- | ----------------------------------------------------------------- |
| **`eventName`**   | <code>'appStateChange'</code>                                     |
| **`listenerFunc`**| <code><a href="#statechangelistener">StateChangeListener</a></code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 1.0.0

--------------------


### addListener('pause', ...)

```typescript
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或 Activity 暂停时的事件。

在 iOS 上，当原生的 [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) 事件被触发时触发。
在 Android 上，当 Capacitor 的 Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法被调用时触发。
在 Web 上，当文档的 visibilitychange 被触发且 document.hidden 为 true 时触发。

| 参数              | 类型                     |
| ----------------- | ------------------------ |
| **`eventName`**   | <code>'pause'</code>     |
| **`listenerFunc`**| <code>() =&gt; void</code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 4.1.0

--------------------


### addListener('resume', ...)

```typescript
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或 Activity 恢复时的事件。

在 iOS 上，当原生的 [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) 事件被触发时触发。
在 Android 上，当 Capacitor 的 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法被调用时触发，
但仅在 resume 首次触发之后。
在 Web 上，当文档的 visibilitychange 被触发且 document.hidden 为 false 时触发。

| 参数              | 类型                     |
| ----------------- | ------------------------ |
| **`eventName`**   | <code>'resume'</code>    |
| **`listenerFunc`**| <code>() =&gt; void</code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 4.1.0

--------------------


### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用的 URL 打开事件。这同时处理自定义 URL scheme 链接以及您的应用处理的 URL（iOS 上的 Universal Links 和 Android 上的 App Links）。

| 参数              | 类型                                                      |
| ----------------- | --------------------------------------------------------- |
| **`eventName`**   | <code>'appUrlOpen'</code>                                 |
| **`listenerFunc`**| <code><a href="#urlopenlistener">URLOpenListener</a></code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 1.0.0

--------------------


### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

如果应用是通过以前持久化的插件调用数据启动的，例如在 Android 上当一个 Activity 返回到一个已关闭的应用时，此调用将返回应用启动时的任何数据，转换为插件调用的结果形式。

在 Android 上，由于低端设备的内存限制，可能
会发生这样的情况：如果您的应用启动了新的 Activity，您的应用可能会被
操作系统终止以减少内存消耗。

例如，这意味着 Camera API（它会启动一个新的 Activity 来拍照）可能无法将数据返回到您的应用。

为了避免这种情况，Capacitor 在启动时存储所有恢复的 Activity 结果。
您应该为 `appRestoredResult` 添加一个监听器，以处理在您的应用未运行时传递的任何插件调用结果。

一旦您获得了结果（如果有），您可以更新 UI 以恢复用户的逻辑体验，例如导航或选择正确的标签页。

我们建议每个使用依赖于外部 Activity（例如 Camera）的插件的 Android 应用都处理此事件。

| 参数              | 类型                                                        |
| ----------------- | ----------------------------------------------------------- |
| **`eventName`**   | <code>'appRestoredResult'</code>                            |
| **`listenerFunc`**| <code><a href="#restoredlistener">RestoredListener</a></code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 1.0.0

--------------------


### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听硬件返回按钮事件（仅 Android）。监听此事件将禁用默认的返回按钮行为，因此您可能需要手动调用 `window.history.back()`。如果您想关闭应用，请调用 `App.exitApp()`。

| 参数              | 类型                                                            |
| ----------------- | --------------------------------------------------------------- |
| **`eventName`**   | <code>'backButton'</code>                                       |
| **`listenerFunc`**| <code><a href="#backbuttonlistener">BackButtonListener</a></code>|

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自从：** 1.0.0

--------------------


### Interfaces


#### AppInfo

| 属性          | 类型              | 描述                                                         | 自从   |
| ------------- | ----------------- | ------------------------------------------------------------ | ------ |
| **`name`**    | <code>string</code>| 应用的名称。                                                  | 1.0.0 |
| **`id`**      | <code>string</code>| 应用的标识符。在 iOS 上是 Bundle Identifier。在 Android 上是 Application ID。| 1.0.0 |
| **`build`**   | <code>string</code>| 构建版本。在 iOS 上是 CFBundleVersion。在 Android 上是 versionCode。| 1.0.0 |
| **`version`** | <code>string</code>| 应用版本。在 iOS 上是 CFBundleShortVersionString。在 Android 上是包的 versionName。| 1.0.0 |


#### AppState

| 属性           | 类型               | 描述                     | 自从   |
| -------------- | ------------------ | ------------------------ | ------ |
| **`isActive`** | <code>boolean</code>| 应用是否处于活跃状态。    | 1.0.0 |


#### AppLaunchUrl

| 属性      | 类型              | 描述                   | 自从   |
| --------- | ----------------- | ---------------------- | ------ |
| **`url`** | <code>string</code>| 用于打开应用的 URL。    | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                    |
| ------------ | --------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code>|


#### URLOpenListenerEvent

| 属性                         | 类型               | 描述                                                                                                                                                                      | 自从   |
| ---------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`url`**                    | <code>string</code> | 应用被打开时的 URL。                                                                                                                                                       | 1.0.0 |
| **`iosSourceApplication`**   | <code>any</code>    | 打开应用的源应用（仅 iOS）https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                                        | 1.0.0 |
| **`iosOpenInPlace`**         | <code>boolean</code>| 应用是应在原地打开传递的文档还是必须先复制它。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace                            | 1.0.0 |


#### RestoredListenerEvent

| 属性             | 类型                            | 描述                                                                                                                           | 自从   |
| ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`pluginId`**   | <code>string</code>              | 此结果对应的 pluginId。例如 `Camera`。                                                                                          | 1.0.0 |
| **`methodName`** | <code>string</code>              | 此结果对应的 methodName。例如 `getPhoto`                                                                                        | 1.0.0 |
| **`data`**       | <code>any</code>                 | 从插件传递的结果数据。这将是您正常调用插件方法时所期望的结果。例如 `CameraPhoto`                                                 | 1.0.0 |
| **`success`**    | <code>boolean</code>             | 指示插件调用是否成功的布尔值。                                                                                                  | 1.0.0 |
| **`error`**      | <code>{ message: string; }</code>| 如果插件调用未成功，将包含错误消息。                                                                                            | 1.0.0 |


#### BackButtonListenerEvent

| 属性            | 类型               | 描述                                                                           | 自从   |
| --------------- | ------------------ | ------------------------------------------------------------------------------ | ------ |
| **`canGoBack`** | <code>boolean</code>| 指示浏览器是否可以返回历史记录。当历史堆栈在第一个条目上时为 false。             | 1.0.0 |


### Type Aliases


#### StateChangeListener

<code>(state: <a href="#appstate">AppState</a>): void</code>


#### URLOpenListener

<code>(event: <a href="#urlopenlistenerevent">URLOpenListenerEvent</a>): void</code>


#### RestoredListener

<code>(event: <a href="#restoredlistenerevent">RestoredListenerEvent</a>): void</code>


#### BackButtonListener

<code>(event: <a href="#backbuttonlistenerevent">BackButtonListenerEvent</a>): void</code>

</docgen-api>
