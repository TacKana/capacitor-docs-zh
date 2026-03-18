---
title: 后台运行器 Capacitor 插件 API
description: Capacitor 后台运行器
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 后台运行器
---

# @capacitor/background-runner

后台运行器提供了一个基于事件的独立 JavaScript 环境，用于在 Web 视图之外执行您的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

后台运行器支持多种设备 API，这些 API 在使用前需要获得用户的许可。

## iOS

在 iOS 上，您必须启用后台模式功能。

![在 Xcode 中启用后台模式功能](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，您至少需要启用 `Background fetch` 和 `Background processing` 模式，才能注册和调度后台任务。

如果您将使用地理位置或推送通知，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

您还需要在 `Info.plist` 文件中添加以下条目：
```
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.example.background.task</string>
</array>
```

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)。

请确保您在插件配置的 `label` 字段中使用的 ID 与 `BGTaskSchedulerPermittedIdentifiers` 中使用的 ID 相同（例如 "com.example.background.task"）。

启用后台模式功能后，将以下内容添加到您应用的 `AppDelegate.swift` 中：

在文件顶部，`import Capacitor` 下方添加：
```swift
import CapacitorBackgroundRunner
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // ....
    BackgroundRunnerPlugin.registerBackgroundTask()
    BackgroundRunnerPlugin.handleApplicationDidFinishLaunching(launchOptions: launchOptions)
    // ....

    return true
}
```

为了让后台运行器处理远程通知，请添加以下内容：

```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        // ....
        BackgroundRunnerPlugin.dispatchEvent(event: "remoteNotification", eventArgs: userInfo) { result in
            switch result {
            case .success:
                completionHandler(.newData)
            case .failure:
                completionHandler(.failed)
            }
        }
    }
```

### 地理位置

Apple 要求为位置信息在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时使用位置说明`)

## Android

将以下行插入到 `android/app/build.gradle`：

```diff
...

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
+		dirs '../../node_modules/@capacitor/background-runner/android/src/main/libs', 'libs'
    }
}
...

```

如果您是从 1.0.5 版本升级现有 Android 项目，请务必从 `android/src/main/libs` 中删除 `android-js-engine-release.aar`。

### 地理位置

此 API 需要将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<!-- 地理位置 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据，包括粗略和精确位置，最后一行是可选的，但如果您的应用*需要* GPS 才能运行，则是必需的。您可以省略它，但请注意这可能意味着您的应用会安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要进行权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授权。

从 Android 12 开始，除非将以下权限添加到您的 `AndroidManifest.xml`，否则计划通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在该权限，用户仍然可以从应用设置中禁用精确通知。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/android)中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

## 关于后台运行器

在构建复杂应用程序的过程中，有时需要在应用程序不在前台时执行工作。标准 Capacitor 应用程序的挑战在于，当这些后台事件发生时，Web 视图不可用，需要您编写原生代码来处理这些事件。这就是后台运行器插件的用武之地。

后台运行器让编写 JavaScript 代码来处理原生后台事件变得容易。您只需创建您的运行器 JavaScript 文件并 [定义您的配置](#configuring-background-runner)，然后后台运行器插件将自动配置和调度一个原生后台任务，该任务将根据您的配置和平台规则执行。无需修改您的 UI 代码。

## 使用后台运行器

后台运行器包含一个无头的 JavaScript 环境，该环境会调用您在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果运行器在您的运行器文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 后关闭（或者如果操作系统强制终止了您的进程）。#### 示例运行器 JS 文件

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在这里执行更新系统的操作');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('接收到的数据: ' + JSON.stringify(args.user));

    const updatedUser = args.user;
    updatedUser.firstName = updatedUser.firstName + ' 你好';
    updatedUser.lastName = updatedUser.lastName + ' 世界';

    resolve(updatedUser);
  } catch (err) {
    reject(err);
  }
});

addEventListener('remoteNotification', (resolve, reject, args) => {
  try {
    console.log('收到静默推送通知');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: '企业级后台运行器',
        body: '收到静默推送通知',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在每个由运行器调用的事件处理程序中，**必须**调用 `resolve()` 或 `reject()`。如果应用在后台运行时事件被触发，未能调用这些函数可能导致运行器被操作系统终止。如果应用在前台运行，对 `dispatchEvent` 的异步调用可能无法正常解析。

要查看更真实的使用 Background Runner 的示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置 Background Runner

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行文档生成器以更新以下文档-->

加载时，Background Runner 会自动注册一个后台任务，该任务将在应用进入后台时被调度和执行。

| 属性             | 类型                  | 描述                                                                                                                                                                                        | 始于版本 |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`label`**      | <code>string</code>   | 运行器的名称，用于日志记录。                                                                                                                                                                | 1.0.0    |
| **`src`**        | <code>string</code>   | 运行器 JavaScript 文件的路径，相对于应用包。                                                                                                                                                | 1.0.0    |
| **`event`**      | <code>string</code>   | 当操作系统执行后台任务时将调用的事件名称。                                                                                                                                                  | 1.0.0    |
| **`repeat`**     | <code>boolean</code>  | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                                                                                        | 1.0.0    |
| **`interval`**   | <code>number</code>   | 应用进入后台后，后台任务应开始执行的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的分钟数。                                                                                         | 1.0.0    |
| **`autoStart`**  | <code>boolean</code>  | 在应用加载时自动注册和调度后台任务。                                                                                                                                                        | 1.0.0    |

### 示例

在 `capacitor.config.json` 中:

```json
{
  "plugins": {
    "BackgroundRunner": {
      "label": "com.example.background.task",
      "src": "runners/background.js",
      "event": "myCustomEvent",
      "repeat": true,
      "interval": 15,
      "autoStart": true
    }
  }
}
```

在 `capacitor.config.ts` 中:

```ts
/// <reference types="@capacitor/background-runner" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    BackgroundRunner: {
      label: "com.example.background.task",
      src: "runners/background.js",
      event: "myCustomEvent",
      repeat: true,
      interval: 15,
      autoStart: true,
    },
  },
};

export default config;
```

</docgen-config>

## JavaScript API

Background Runner 不在浏览器或 Web 视图中执行你的 JavaScript 代码，因此你可能习惯使用的典型 Web API 可能不可用。这包括 DOM API 以及与你应用 DOM 交互的能力。

以下是 Background Runner 提供的可用 Web API 列表：

- [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  - 仅 `info`、`log`、`warn`、`error` 和 `debug` 可用
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
  - 仅 `decode` 可用
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  - 仅 `encode` 可用
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - 不支持事件监听器选项和 `useCapture`
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - 暂不支持 Request 对象
  - 在 options 对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API 外，Background Runner 还支持许多[自定义 Capacitor API](#capacitor-api)，这些 API 暴露了相关的移动设备功能。

## 运行器生命周期

目前，运行器设计用于在应用处于后台时执行周期性的工作，或在应用处于前台时在与 UI 线程分离的线程中执行异步工作。因此，运行器不是长期存活的。在运行器事件调用之间不会保持状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文，你的运行器代码在其中加载和执行，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供的内置电池优化设置超出了原生 Android 的功能。其中一些优化必须由你的最终用户禁用以确保后台任务正常工作。

要了解更多关于受影响的制造商以及用户需要调整设置的步骤，请访问 [Don't kill my app!](https://dontkillmyapp.com) 网站。

## 后台任务的限制

在移动操作系统上不可能运行持久、始终在后台运行的服务。由于 iOS 和 Android 为减少电池和数据消耗施加的限制，后台任务受到各种限制，在设计和实现后台任务时必须牢记这些限制。### iOS

- 每次调用你的任务时，大约有最多 30 秒的运行时间，之后必须调用 `completed()`，否则任务会被终止。
- 虽然你可以设置一个时间间隔来定义应用进入后台后任务何时运行，或者任务应运行的频率，但这并不保证。iOS 会最终决定你的任务何时运行以及运行频率，这部分取决于你的应用使用频率。
- 后台任务在模拟器中不会执行。

### Android

- 你的任务最多有 10 分钟的时间来执行工作，但为了保持任务的跨平台兼容性，你应该将工作时间限制在最多 30 秒。
- 重复的后台任务最小间隔至少为 15 分钟。类似于 iOS，你请求的任何间隔可能不会精确命中——实际执行时间会受到操作系统电池优化和其他启发式策略的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [`addListener('backgroundRunnerNotificationReceived', ...)`](#addlistenerbackgroundrunnernotificationreceived-)
* [`removeNotificationListeners()`](#removenotificationlisteners)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回值：** <code>any</code>

**自：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回值：** <code>any</code>

**自：** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向配置的运行器（runner）分发事件。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回值：** <code>any</code>

**自：** 1.0.0

--------------------


### addListener('backgroundRunnerNotificationReceived', ...)

```typescript
addListener(eventName: 'backgroundRunnerNotificationReceived', listenerFunc: (event: NotificationActionEvent) => void) => any
```

添加通知操作的监听器。

| 参数               | 类型                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'backgroundRunnerNotificationReceived'</code>                                             |
| **`listenerFunc`** | <code>(event: <a href="#notificationactionevent">NotificationActionEvent</a>) =&gt; void</code> |

**返回值：** <code>any</code>

**自：** 2.1.1

--------------------


### removeNotificationListeners()

```typescript
removeNotificationListeners() => any
```

为此插件移除通知操作监听器。

**返回值：** <code>any</code>

**自：** 2.1.1

--------------------


### 接口


#### PermissionStatus

| 属性                 | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | <code><a href="#permissionstate">PermissionState</a></code> |
| **`notifications`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### RequestPermissionOptions

| 属性        | 类型            |
| ---------- | --------------- |
| **`apis`** | <code>{}</code> |


#### DispatchEventOptions

| 属性            | 类型                                 | 描述                                 | 自     |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要分发事件到的运行器标签  | 1.0.0 |
| **`event`**   | <code>string</code>                  | 已注册的事件监听器名称。 | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                                            |       |


#### NotificationActionEvent

| 属性                    | 类型                |
| -------------------- | ------------------- |
| **`actionTypeId`**   | <code>string</code> |
| **`notificationId`** | <code>number</code> |


#### PluginListenerHandle

| 属性          | 类型                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |


### 类型别名


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### API

<code>'geolocation' | 'notifications'</code>

</docgen-api>

## Capacitor API

<capacitor-api-docs>

<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### 接口


#### CapacitorDevice

获取设备信息，例如网络连接和电池状态。

| 属性                     | 类型                                                             | 描述                                    | 自     |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备的当前电池状态。 | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备的当前网络状态。 | 1.0.0 |


#### BatteryStatus

| 属性                | 类型                 |
| ------------------ | -------------------- |
| **`batteryLevel`** | <code>number</code>  |
| **`isCharging`**   | <code>boolean</code> |


#### NetworkStatus

| 属性                   | 类型                 |
| -------------------- | -------------------- |
| **`connected`**      | <code>boolean</code> |
| **`connectionType`** | <code>string</code>  |


#### CapacitorKV

一个简单的字符串键/值存储，在 iOS 上由 UserDefaults 支持，在 Android 上由 Shared Preferences 支持。

| 属性          | 类型                                                 | 描述                            | 自     |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置一个字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。  | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键的值。     | 1.0.0 |#### CapacitorNotifications

发送本地通知。

| 属性             | 类型                                                                                                | 说明                       | 起始版本 |
| ---------------- | --------------------------------------------------------------------------------------------------- | -------------------------- | -------- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 安排本地通知               | 1.0.0    |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用角标数量           | 2.0.0    |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用角标数量           | 2.0.0    |#### NotificationScheduleOptions| 属性                   | 类型                 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 始于版本 |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上是 32 位整数，因此值应在 -2147483648 到 2147483647 之间（包含两端）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0    |
| **`title`**            | <code>string</code>  | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0    |
| **`body`**             | <code>string</code>  | 通知的正文内容，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0    |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0    |
| **`sound`**            | <code>string</code>  | 显示此通知时要播放的音频文件名。文件名需包含扩展名。<br/>- 在 iOS 上，文件应位于应用包中。<br/>- 在 Android 上，文件应位于 res/raw 文件夹中。<br/>推荐使用 `.wav` 格式，因为 iOS 和 Android 均支持该格式。<br/>仅适用于 iOS 和 Android 26 以下版本。对于 Android 26+，请使用已配置所需声音的 channelId。<br/>如果未找到声音文件（例如空字符串或错误文件名），将使用默认系统通知音。<br/>如果不提供此参数，在 Android 上会产生默认声音，在 iOS 上则没有声音。 | 1.0.0    |
| **`actionTypeId`**     | <code>string</code>  | 与此通知关联的操作类型标识符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0    |
| **`threadIdentifier`** | <code>string</code>  | 用于分组多个通知。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier` 属性。<br/>仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0    |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到类别摘要格式字符串中的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument` 属性。<br/>仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0    |
| **`group`**            | <code>string</code>  | 用于分组多个通知。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()` 方法并传入提供的值。<br/>仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0    || **`groupSummary`**     | <code>string</code>  | 如果设为 true，此通知将成为一个通知组的摘要。会调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroupSummary()` 方法并传入该值。仅在 Android 平台上使用 `group` 时可用。                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果设为 true，通知将无法被滑动清除。会调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setOngoing()` 方法并传入该值。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果设为 true，用户点击通知时该通知会被自动取消。会调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setAutoCancel()` 方法并传入该值。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置大文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于设置收件箱和大文本通知样式中的摘要文本详情。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置，此选项会覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定通知应发送到的渠道。如果给定名称的渠道不存在，则通知不会触发。如果未提供，将使用默认渠道。会调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setChannelId()` 方法并传入该值。仅在 Android 26+ 版本可用。                                                                                                                                                                                                                                                                                       | 1.0.0 |#### NotificationBadgeOptions

| 属性                    | 类型                | 说明                                                                     | 始于  |
| ----------------------- | ------------------- | ------------------------------------------------------------------------ | ----- |
| **`count`**             | <code>number</code> | 设置到应用角标上的数字。                                                 | 2.0.0 |
| **`notificationTitle`** | <code>string</code> | 关联角标计数通知的**必需**标题。仅适用于 Android。                       | 2.0.0 |
| **`notificationSubtitle`** | <code>string</code> | 关联角标计数通知的副标题。仅适用于 Android。                             | 2.0.0 |


#### CapacitorGeolocation

获取设备位置信息。

| 属性                  | 类型                                                                                   | 说明                     | 始于  |
| --------------------- | -------------------------------------------------------------------------------------- | ------------------------ | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备最后已知的位置   | 1.0.0 |


#### GetCurrentPositionResult

| 属性                | 类型                        | 说明                                                                                                                               | 始于  |
| ------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`latitude`**      | <code>number</code>         | 以十进制度数表示的纬度                                                                                                             | 1.0.0 |
| **`longitude`**     | <code>number</code>         | 以十进制度数表示的经度                                                                                                             | 1.0.0 |
| **`accuracy`**      | <code>number</code>         | 经纬度坐标的精度等级（单位：米）                                                                                                   | 1.0.0 |
| **`altitude`**      | <code>number \| null</code> | 用户所在的海拔高度（如果可用）                                                                                                     | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔坐标的精度等级（单位：米），如果可用。在所有 iOS 版本和 Android 8.0+ 上可用。                                                   | 1.0.0 |
| **`speed`**         | <code>number \| null</code> | 用户的移动速度（如果可用）                                                                                                         | 1.0.0 |
| **`heading`**       | <code>number \| null</code> | 用户面对的方向（如果可用）                                                                                                         | 1.0.0 |


#### CapacitorWatch

与设备配对的 Apple Watch 进行交互

`sendMessage`、`transferUserInfo` 和 `updateApplicationContext` 是 WCSession 委托方法的原始路由，但目前在一个 <a href="#capacitorwatch">CapacitorWatch</a> Watch 应用中不起作用。
如果开发一个原生 Watch 应用作为 Capacitor 应用的配套应用，则可以使用这些方法。

| 属性                          | 类型                                                                     | 说明                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**             | <code>(options: []) =&gt; void</code>                                    | 通过 WCSession 委托方法 `sendMessage()` 向手表发送消息。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有影响。                                                                         |
| **`transferUserInfo`**        | <code>(options: []) =&gt; void</code>                                    | 通过 WCSession 委托方法 `transferUserInfo()` 向手表发送信息。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有影响。                                                                    |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 通过 WCSession 委托方法 `updateApplicationContext()` 更新手表上的应用上下文。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有影响。                                                     |
| **`isReachable`**             | <code>boolean</code>                                                     | 检查配套手表是否可达。                                                                                                                                                                               |
| **`updateWatchUI`**           | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 用此处指定的内容替换手表上的当前 UI。                                                                                                                                                               |
| **`updateWatchData`**         | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新手表用于在文本和按钮字段中显示变量的数据。                                                                                                                                                       |


#### CapacitorApp

| 属性          | 类型                                                   |
| ------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |


#### AppState

| 属性          | 类型                 | 说明                 | 始于  |
| ------------- | -------------------- | -------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用是否处于活动状态。 | 1.0.0 |


#### AppInfo

| 属性         | 类型                | 说明                                                                                      | 始于  |
| ------------ | ------------------- | ----------------------------------------------------------------------------------------- | ----- |
| **`name`**   | <code>string</code> | 应用名称。                                                                                | 1.0.0 |
| **`id`**     | <code>string</code> | 应用标识符。在 iOS 上是 Bundle Identifier，在 Android 上是 Application ID。               | 1.0.0 |
| **`build`**  | <code>string</code> | 构建版本。在 iOS 上是 CFBundleVersion，在 Android 上是 versionCode。                      | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。在 iOS 上是 CFBundleShortVersionString，在 Android 上是 package 的 versionName。 | 1.0.0 |


</capacitor-api-docs>