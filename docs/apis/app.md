---
title: App Capacitor 插件 API
description: App API 处理高级别的应用状态和事件。例如，此 API 在应用进入和离开前台时发出事件，处理深层链接，打开其他应用，以及管理持久化的插件状态。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts
sidebar_label: 应用
translated: true
source_hash: 1c23f457
---

# @capacitor/app

App API 处理高级别的应用状态和事件。例如，此 API 在应用进入和离开前台时发出事件，处理深层链接，打开其他应用，以及管理持久化的插件状态。

## 安装

```bash
npm install @capacitor/app
npx cap sync
```

## iOS

要能够通过自定义 scheme 打开应用，你需要先注册该 scheme。你可以通过编辑 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 文件并添加以下内容来实现。


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

要能够通过自定义 scheme 打开应用，你需要先注册该 scheme。你可以通过在 `AndroidManifest.xml` 的 `activity` 部分中添加以下内容来实现。

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 的值存储在 `strings.xml` 中。当添加 Android 平台时，`@capacitor/cli` 会以应用的包名作为默认值，但可以通过编辑 `strings.xml` 文件进行替换。

## 示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});

App.addListener('appUrlOpen', data => {
  console.log('App opened with URL:', data);
});

App.addListener('appRestoredResult', data => {
  console.log('Restored state:', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log('App opened with URL: ' + url);
};
```

## 配置

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

| 属性                              | 类型                 | 描述                                              | 默认值            | 自      |
| --------------------------------- | -------------------- | ------------------------------------------------- | ------------------ | ----- |
| **`disableBackButtonHandler`**    | <code>boolean</code> | 禁用插件的默认返回按钮处理。仅 Android 可用。     | <code>false</code> | 7.1.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "App": {
      "disableBackButtonHandler": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/app" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    App: {
      disableBackButtonHandler: true,
    },
  },
};

export default config;
```

</docgen-config>

## API

<docgen-index>

* [`exitApp()`](#exitapp)
* [`getInfo()`](#getinfo)
* [`getState()`](#getstate)
* [`getLaunchUrl()`](#getlaunchurl)
* [`minimizeApp()`](#minimizeapp)
* [`getAppLanguage()`](#getapplanguage)
* [`toggleBackButtonHandler(...)`](#togglebackbuttonhandler)
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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### exitApp()

```typescript
exitApp() => Promise<void>
```

强制退出应用。此方法应仅与 Android 的 `backButton` 处理程序结合使用，在导航完成时退出应用。

Ionic 会自行处理此功能，因此如果你使用 Ionic，则不需要调用此方法。

**自：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

返回应用的相关信息。

**返回值：** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**自：** 1.0.0

--------------------


### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**返回值：** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**自：** 1.0.0

--------------------


### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取应用启动时的 URL（如果有）。

**返回值：** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**自：** 1.0.0

--------------------


### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用程序。

仅 Android 可用。

**自：** 1.1.0

--------------------


### getAppLanguage()

```typescript
getAppLanguage() => Promise<AppLanguageCode>
```

获取应用特定的语言区域代码。

**返回值：** <code>Promise&lt;<a href="#applanguagecode">AppLanguageCode</a>&gt;</code>

**自：** 8.1.0

--------------------


### toggleBackButtonHandler(...)

```typescript
toggleBackButtonHandler(options: ToggleBackButtonHandlerOptions) => Promise<void>
```

在运行时启用或禁用插件的返回按钮处理。

仅 Android 可用。

| 参数          | 类型                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#togglebackbuttonhandleroptions">ToggleBackButtonHandlerOptions</a></code> |

**自：** 7.1.0

--------------------


### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle>
```

监听应用或活动状态的变化。

在 iOS 上，当原生 [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) 和
[UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) 事件被触发时发出。
在 Android 上，当 Capacitor 的 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 和 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法被调用时发出。
在 Web 上，当 document 的 visibilitychange 被触发时发出。

| 参数                | 类型                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'appStateChange'</code>                                       |
| **`listenerFunc`** | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### addListener('pause', ...)

```typescript
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听应用或活动暂停时的事件。

在 iOS 上，当原生 [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) 事件被触发时发出。
在 Android 上，当 Capacitor 的 Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法被调用时发出。
在 Web 上，当 document 的 visibilitychange 被触发且 document.hidden 为 true 时发出。

| 参数                | 类型                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'pause'</code>       |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 4.1.0

--------------------


### addListener('resume', ...)

```typescript
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听应用或活动恢复时的事件。

在 iOS 上，当原生 [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) 事件被触发时发出。
在 Android 上，当 Capacitor 的 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法被调用时发出，
但仅在 resume 首次触发之后。
在 Web 上，当 document 的 visibilitychange 被触发且 document.hidden 为 false 时发出。

| 参数                | 类型                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'resume'</code>      |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 4.1.0

--------------------


### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle>
```

监听应用的 URL 打开事件。这处理自定义 URL scheme 链接以及你的应用处理的 URL（iOS 上的 Universal Links 和 Android 上的 App Links）。

| 参数                | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'appUrlOpen'</code>                                   |
| **`listenerFunc`** | <code><a href="#urlopenlistener">URLOpenListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle>
```

如果应用启动时带有先前持久化的插件调用数据，例如在 Android 上当一个 Activity 返回到一个已关闭的应用时，此调用将返回应用启动时携带的任何数据，转换为插件调用的结果形式。

在 Android 上，由于低端设备的内存限制，如果你的应用启动了一个新的 Activity，操作系统可能会终止你的应用以减少内存消耗。

例如，这意味着启动新 Activity 来拍照的 Camera API 可能无法将数据返回给你的应用。

为了避免这种情况，Capacitor 在启动时存储所有恢复的活动结果。你应该为 `appRestoredResult` 添加一个监听器，以处理在你的应用未运行时传递过来的任何插件调用结果。

一旦你获得了该结果（如果有），你就可以更新 UI 来为用户恢复符合逻辑的体验，例如导航或选择适当的标签页。

我们建议所有使用依赖外部 Activity 的插件（例如 Camera）的 Android 应用都处理此事件。

| 参数                | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'appRestoredResult'</code>                              |
| **`listenerFunc`** | <code><a href="#restoredlistener">RestoredListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle>
```

监听硬件返回按钮事件（仅 Android）。监听此事件将禁用默认的返回按钮行为，因此你可能需要手动调用 `window.history.back()`。如果你想关闭应用，请调用 `App.exitApp()`。

| 参数                | 类型                                                              |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`**    | <code>'backButton'</code>                                         |
| **`listenerFunc`** | <code><a href="#backbuttonlistener">BackButtonListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自：** 1.0.0

--------------------


### Interfaces


#### AppInfo

| 属性          | 类型                | 描述                                                                                                | 自      |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用的名称。                                                                                        | 1.0.0 |
| **`id`**      | <code>string</code> | 应用的标识符。在 iOS 上为 Bundle Identifier。在 Android 上为 Application ID。                        | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本号。在 iOS 上为 CFBundleVersion。在 Android 上为 versionCode。                               | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。在 iOS 上为 CFBundleShortVersionString。在 Android 上为 package 的 versionName。           | 1.0.0 |


#### AppState

| 属性             | 类型                 | 描述                           | 自      |
| -------------- | -------------------- | ------------------------------ | ----- |
| **`isActive`** | <code>boolean</code> | 应用是否处于活动状态。         | 1.0.0 |


#### AppLaunchUrl

| 属性        | 类型                | 描述                       | 自      |
| --------- | ------------------- | -------------------------- | ----- |
| **`url`** | <code>string</code> | 用于打开应用的 URL。       | 1.0.0 |


#### AppLanguageCode

| 属性          | 类型                | 描述                               | 自      |
| ----------- | ------------------- | ---------------------------------- | ----- |
| **`value`** | <code>string</code> | 两个或三个字符的语言代码。         | 8.1.0 |


#### ToggleBackButtonHandlerOptions

| 属性            | 类型                 | 描述                                              | 自      |
| ------------- | -------------------- | ------------------------------------------------ | ----- |
| **`enabled`** | <code>boolean</code> | 指示是启用还是禁用默认的返回按钮处理。            | 7.1.0 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| ------------- | ----------------------------------------- |
| **`remove`**  | <code>() =&gt; Promise&lt;void&gt;</code> |


#### URLOpenListenerEvent

| 属性                         | 类型                 | 描述                                                                                                                                                                            | 自      |
| ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                    | <code>string</code>  | 应用被打开时使用的 URL。                                                                                                                                                        | 1.0.0 |
| **`iosSourceApplication`**   | <code>any</code>     | 打开应用的源应用程序（仅 iOS）。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                                         | 1.0.0 |
| **`iosOpenInPlace`**         | <code>boolean</code> | 应用是否应在原位打开传递的文档，还是必须先复制它。https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace                              | 1.0.0 |


#### RestoredListenerEvent

| 属性               | 类型                              | 描述                                                                                                                                                         | 自      |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`pluginId`**     | <code>string</code>               | 此结果对应的 pluginId。例如 `Camera`。                                                                                                                       | 1.0.0 |
| **`methodName`**   | <code>string</code>               | 此结果对应的 methodName。例如 `getPhoto`。                                                                                                                   | 1.0.0 |
| **`data`**         | <code>any</code>                  | 从插件传递的结果数据。这将是通常情况下调用插件方法时预期的结果。例如 `CameraPhoto`。                                                                         | 1.0.0 |
| **`success`**      | <code>boolean</code>              | 布尔值，指示插件调用是否成功。                                                                                                                               | 1.0.0 |
| **`error`**        | <code>{ message: string; }</code> | 如果插件调用未成功，将包含错误消息。                                                                                                                         | 1.0.0 |


#### BackButtonListenerEvent

| 属性              | 类型                 | 描述                                                                                                  | 自      |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------- | ----- |
| **`canGoBack`**   | <code>boolean</code> | 指示浏览器是否可以在历史记录中返回。当历史记录栈位于第一条记录时，该值为 false。                       | 1.0.0 |


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
