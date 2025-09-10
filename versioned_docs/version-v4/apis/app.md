---
title: App Capacitor Plugin API
description: App API 用于处理应用的高级状态和事件。例如当应用进入或退出前台时触发事件，处理深度链接（deeplinks）、打开其他应用以及管理持久化的插件状态。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts
sidebar_label: App
---

# @capacitor/app

App API 用于处理应用的高级状态和事件。例如当应用进入或退出前台时触发事件，处理深度链接（deeplinks）、打开其他应用以及管理持久化的插件状态。

## 安装

```bash
npm install @capacitor/app
npx cap sync
```

## iOS

若要通过自定义协议（custom scheme）打开应用，需先注册协议。可编辑 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 文件并添加以下内容：

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

若要通过自定义协议打开应用，需先注册协议。可在 `AndroidManifest.xml` 文件的 `activity` 部分添加以下内容：

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 值存储在 `strings.xml` 中。添加 Android 平台时，`@capacitor/cli` 会自动将应用包名设为默认值，也可通过编辑 `strings.xml` 文件来修改。

## 示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('应用状态变更。是否活跃？', isActive);
});

App.addListener('appUrlOpen', data => {
  console.log('应用通过 URL 打开:', data);
});

App.addListener('appRestoredResult', data => {
  console.log('恢复的状态:', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log('应用通过 URL 打开: ' + url);
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
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>


### exitApp()

```typescript
exitApp() => Promise<void>
```

强制退出应用。通常应配合 Android 的 `backButton` 处理器使用，在导航完成后退出应用。

若使用 Ionic 框架，Ionic 会自动处理此逻辑，通常无需手动调用。

**自版本:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

获取应用信息。

**返回值:** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**返回值:** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取启动应用时使用的 URL（如果有）。

**返回值:** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用（仅适用于 Android）。

**自版本:** 1.1.0

--------------------


### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动状态变更。

iOS：当原生 [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) 和 [UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) 事件触发时  
Android：当 Capacitor 的 Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 和 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法调用时  
Web：当 document 的 visibilitychange 事件触发时

| 参数                | 类型                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| **`eventName`**     | <code>'appStateChange'</code>                                        |
| **`listenerFunc`**  | <code><a href="#statechangelistener">StateChangeListener</a></code>  |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

--------------------


### addListener('pause', ...)

```typescript
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动暂停事件。

iOS：当原生 [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) 事件触发时  
Android：当 Capacitor 的 Activity [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法调用时  
Web：当 document 的 visibilitychange 事件触发且 document.hidden 为 true 时

| 参数                | 类型                       |
| ------------------- | -------------------------- |
| **`eventName`**     | <code>'pause'</code>       |
| **`listenerFunc`**  | <code>() =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 4.1.0

--------------------


### addListener('resume', ...)

```typescript
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用或活动恢复事件。

iOS：当原生 [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) 事件触发时  
Android：当 Capacitor 的 Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法调用时（仅在 resume 事件首次触发后）  
Web：当 document 的 visibilitychange 事件触发且 document.hidden 为 false 时

| 参数                | 类型                       |
| ------------------- | -------------------------- |
| **`eventName`**     | <code>'resume'</code>      |
| **`listenerFunc`**  | <code>() =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 4.1.0

--------------------


### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听应用通过 URL 打开的事件。既处理自定义协议链接，也处理应用关联的 URL（iOS 通用链接/Android 应用链接）

| 参数                | 类型                                                      |
| ------------------- | --------------------------------------------------------- |
| **`eventName`**     | <code>'appUrlOpen'</code>                                 |
| **`listenerFunc`**  | <code><a href="#urlopenlistener">URLOpenListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

--------------------


### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

若应用启动时带有之前持久化的插件调用数据（如 Android 上关闭的应用被活动返回时），此方法会返回这些数据，并转换为插件调用的结果形式。

在 Android 低端设备上，由于内存限制，当应用启动新活动时，操作系统可能会终止应用以降低内存消耗。

例如，Camera API 会启动新活动拍照，可能无法将数据返回给应用。

为避免此问题，Capacitor 会在启动时存储所有恢复的活动结果。应添加 `appRestoredResult` 监听器来处理应用未运行时传递的插件调用结果。

获取结果后（如有），可更新 UI 以恢复用户预期的逻辑体验，如导航或选择正确的标签页。

建议所有依赖外部活动（如 Camera）的 Android 应用都处理此事件。

| 参数                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`eventName`**     | <code>'appRestoredResult'</code>                            |
| **`listenerFunc`**  | <code><a href="#restoredlistener">RestoredListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

--------------------


### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听硬件返回键事件（仅 Android）。监听此事件会禁用默认返回行为，可能需要手动调用 `window.history.back()`。如需关闭应用，请调用 `App.exitApp()`。

| 参数                | 类型                                                            |
| ------------------- | --------------------------------------------------------------- |
| **`eventName`**     | <code>'backButton'</code>                                       |
| **`listenerFunc`**  | <code><a href="#backbuttonlistener">BackButtonListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器

**自版本:** 1.0.0

--------------------


### 接口


#### AppInfo

| 属性           | 类型                | 描述                                                                                         | 自版本 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------- | ------ |
| **`name`**     | <code>string</code> | 应用名称                                                                                    | 1.0.0  |
| **`id`**       | <code>string</code> | 应用标识符。iOS 上是 Bundle Identifier，Android 上是 Application ID                         | 1.0.0  |
| **`build`**    | <code>string</code> | 构建版本号。iOS 上是 CFBundleVersion，Android 上是 versionCode                               | 1.0.0  |
| **`version`**  | <code>string</code> | 应用版本号。iOS 上是 CFBundleShortVersionString，Android 上是 package 的 versionName         | 1.0.0  |


#### AppState

| 属性             | 类型                 | 描述                   | 自版本 |
| ---------------- | -------------------- | --------------------- | ------ |
| **`isActive`**   | <code>boolean</code> | 应用是否处于活跃状态   | 1.0.0  |


#### AppLaunchUrl

| 属性        | 类型                | 描述                   | 自版本 |
| ----------- | ------------------- | --------------------- | ------ |
| **`url`**   | <code>string</code> | 用于打开应用的 URL     | 1.0.0  |


#### PluginListenerHandle

| 属性            | 类型                                      |
| --------------- | ----------------------------------------- |
| **`remove`**    | <code>() =&gt; Promise&lt;void&gt;</code> |


#### URLOpenListenerEvent

| 属性                          | 类型                 | 描述                                                                                                                                                                        | 自版本 |
| ----------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`url`**                     | <code>string</code>  | 打开应用时使用的 URL                                                                                                                                                       | 1.0.0  |
| **`iosSourceApplication`**    | <code>any</code>     | 打开应用的源应用（仅 iOS）https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                                         | 1.0.0  |
| **`iosOpenInPlace`**          | <code>boolean</code> | 是否应在原位置打开文档或需先复制。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace                                        | 1.0.0  |


#### RestoredListenerEvent

| 属性                | 类型                              | 描述                                                                                                                                       | 自版本 |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`pluginId`**     | <code>string</code>               | 对应结果的插件 ID，如 `Camera`                                                                                                            | 1.0.0  |
| **`methodName`**   | <code>string</code>               | 对应结果的方法名，如 `getPhoto`                                                                                                           | 1.0.0  |
| **`data`**         | <code>any</code>                  | 从插件传递的结果数据，通常与直接调用插件方法的结果一致，如 `CameraPhoto`                                                                  | 1.0.0  |
| **`success`**      | <code>boolean</code>              | 标识插件调用是否成功                                                                                                                      | 1.0.0  |
| **`error`**        | `{ message: string; }` | 若插件调用失败，包含错误信息                                                                                                              | 1.0.0  |


#### BackButtonListenerEvent

| 属性               | 类型                 | 描述                                                                                               | 自版本 |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| **`canGoBack`**    | <code>boolean</code> | 标识浏览器是否可以返回历史记录。当历史堆栈处于第一条记录时为 false                                 | 1.0.0  |


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