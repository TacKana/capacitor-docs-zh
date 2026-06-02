---
title: Background Runner Capacitor 插件 API
description: Capacitor Background Runner（后台运行器）
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 后台运行
translated: true
source_hash: 59f19e44
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 环境，用于在 Web 视图之外执行你的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner 支持多种需要用户事先授权的设备 API。

## iOS

在 iOS 上，你必须启用 Background Modes（后台模式）功能。

![在 Xcode 中启用后台模式功能](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加完成后，你至少需要启用 `Background fetch` 和 `Background processing` 模式，才能注册和调度你的后台任务。

如果你将使用 Geolocation 或 Push Notifications，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

你还需要在 `Info.plist` 文件中添加以下条目：
```
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.example.background.task</string>
</array>
```

阅读关于在 [iOS 指南](https://capacitorjs.com/docs/ios) 中[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的更多信息，以了解在 Xcode 中设置 iOS 权限的详情。

确保你在插件配置的 `label` 字段中使用与 `BGTaskSchedulerPermittedIdentifiers` 相同的标识符（例如 "com.example.background.task"）。

启用 Background Modes 功能后，在你的应用的 `AppDelegate.swift` 中添加以下内容：

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

要允许 Background Runner 处理远程通知，请添加以下内容：

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

### 地理定位

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription`（隐私 - 始终使用位置描述）
- `NSLocationWhenInUseUsageDescription`（隐私 - 使用时位置描述）

## Android

在 `android/app/build.gradle` 中插入以下内容：

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

如果你要从 1.0.5 版本升级且已有 Android 项目，请务必从 `android/src/main/libs` 中删除 `android-js-engine-release.aar`。

### 地理定位

此 API 需要在你的 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- 地理定位 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（包括精确定位和粗略定位），最后一行是可选的，但如果你的应用 _需要_ GPS 才能运行，则必须添加。你也可以省略它，但请注意这可能导致你的应用被安装在没有 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，并且会直接返回已授权。

从 Android 12 开始，计划的（定时）通知将不会精确执行，除非在 `AndroidManifest.xml` 中添加此权限：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍然可以从应用设置中禁用精确通知。

阅读关于在 [Android 指南](https://capacitorjs.com/docs/android) 中[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 的更多信息，以了解在 Android 上设置权限的详情。

## 关于 Background Runner

在构建复杂应用的过程中，有时需要在应用不在前台时执行工作。标准 Capacitor 应用的挑战在于，当这些后台事件发生时，Web 视图不可用，因此你需要编写原生代码来处理这些事件。这就是 Background Runner 插件的作用所在。

Background Runner 让你可以轻松编写 JavaScript 代码来处理原生后台事件。你只需要创建你的 runner JavaScript 文件并[定义配置](#配置-background-runner)，然后 Background Runner 插件将自动配置和调度一个原生后台任务，该任务将根据你的配置和平台的规则执行。无需修改你的 UI 代码。


## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，用于调用在你 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果 runner 在你的 runner 文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 时（或操作系统强制终止你的进程时）关闭。

#### 示例 Runner JS 文件

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('do something to update the system here');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('accepted this data: ' + JSON.stringify(args.user));

    const updatedUser = args.user;
    updatedUser.firstName = updatedUser.firstName + ' HELLO';
    updatedUser.lastName = updatedUser.lastName + ' WORLD';

    resolve(updatedUser);
  } catch (err) {
    reject(err);
  }
});

addEventListener('remoteNotification', (resolve, reject, args) => {
  try {
    console.log('received silent push notification');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: 'Enterprise Background Runner',
        body: 'Received silent push notification',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在每个由 runner 调用的事件处理程序中，**必须**调用 `resolve()` 或 `reject()`。如果不这样做，当你的事件在应用后台被调用时，可能导致你的 runner 被操作系统杀死。如果应用在前台，对 `dispatchEvent` 的异步调用可能无法 resolve。

查看更多使用 Background Runner 的真实世界示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置 Background Runner

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

在加载时，Background Runner 将自动注册一个后台任务，该任务将在你的应用进入后台后被调度并运行。

| 属性             | 类型                 | 描述                                                                                                                                                              | 自      |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**     | <code>string</code>  | runner 的名称，用于日志。                                                                                                                                          | 1.0.0 |
| **`src`**       | <code>string</code>  | runner JavaScript 文件的路径，相对于应用包。                                                                                                                       | 1.0.0 |
| **`event`**     | <code>string</code>  | 当操作系统执行后台任务时将调用的事件名称。                                                                                                                          | 1.0.0 |
| **`repeat`**    | <code>boolean</code> | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                                                               | 1.0.0 |
| **`interval`**  | <code>number</code>  | 应用进入后台后，后台任务开始执行前的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的间隔分钟数。                                                             | 1.0.0 |
| **`autoStart`** | <code>boolean</code> | 在应用加载时自动注册和调度后台任务。                                                                                                                                | 1.0.0 |

### 示例

在 `capacitor.config.json` 中：

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

在 `capacitor.config.ts` 中：

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

Background Runner 不在浏览器或 Web 视图中执行你的 JavaScript 代码，因此你可能习惯使用的典型 Web API 可能不可用。这包括 DOM API 以及与应用的 DOM 进行交互的能力。

以下是 Background Runner 中提供的可用 Web API 列表：

- [console](https://developer.mozilla.org/zh-CN/docs/Web/API/console)
  - 仅支持 `info`、`log`、`warn`、`error` 和 `debug`
- [TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)
  - 仅支持 `decode`
- [TextEncoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder)
  - 仅支持 `encode`
- [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
  - 不支持事件监听器选项和 `useCapture`
- [setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/zh-CN/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
  - 尚未支持 Request 对象
  - 在 options 对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API，Background Runner 还支持一系列暴露相关移动设备功能的[自定义 Capacitor API](#capacitor-api)。

## Runner 生命周期

目前，runner 设计用于在应用后台执行周期性的短时突发任务，或在应用前台时在与 UI 分离的线程中执行异步工作。因此，runner 不会长时间存在。runner 中事件调用之间的状态不会保留。每次调用 `dispatchEvent()` 都会创建一个新的上下文，在其中加载和执行你的 runner 代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供了超出原生 Android 的内置电池优化设置。其中一些优化需要由你的最终用户禁用，才能使你的后台任务正常工作。

访问 [Don't kill my app!](https://dontkillmyapp.com) 了解受影响的制造商以及用户调整设置所需的步骤。

## 后台任务的限制

在移动操作系统上，不可能运行持久、始终在线的后台服务。由于 iOS 和 Android 为了减少电池和数据消耗而施加的限制，后台任务受到各种限制，你在设计和实现后台任务时必须牢记这些限制。

### iOS

- 你的每次任务调用大约有最多 30 秒的运行时间，之后你必须调用 `completed()`，否则你的任务将被杀死。
- 虽然你可以设置一个间隔来定义任务在应用后台化后何时运行，或多久运行一次，但这并不保证。iOS 将决定你的任务最终何时以及多久运行一次，部分取决于你的应用的使用频率。
- 后台任务不会在模拟器中执行。

### Android

- 你的任务最多有 10 分钟来执行工作，但为了保持你的任务跨平台兼容，你应该将工作限制在最多 30 秒。
- 重复后台任务的最小间隔至少为 15 分钟。与 iOS 类似，你请求的任何间隔可能不会精确命中——实际执行时间受操作系统电池优化和其他启发式算法的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [`addListener('backgroundRunnerNotificationReceived', ...)`](#addlistenerbackgroundrunnernotificationreceived-)
* [`removeNotificationListeners()`](#removenotificationlisteners)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

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

向配置的 runner 分发一个事件。

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

添加一个通知动作的监听器。

| 参数                | 类型                                                                                            |
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

移除此插件的通知动作监听器。

**返回值：** <code>any</code>

**自：** 2.1.1

--------------------


### 接口


#### PermissionStatus

| 属性                  | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | <code><a href="#permissionstate">PermissionState</a></code> |
| **`notifications`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### RequestPermissionOptions

| 属性       | 类型            |
| ---------- | --------------- |
| **`apis`** | <code>{}</code> |


#### DispatchEventOptions

| 属性            | 类型                                 | 描述                                      | 自      |
| ------------- | ------------------------------------ | ---------------------------------------- | ----- |
| **`label`**   | <code>string</code>                  | 要将事件分发到的 runner 标签               | 1.0.0 |
| **`event`**   | <code>string</code>                  | 已注册事件监听器的名称。                   | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                                           |       |


#### NotificationActionEvent

| 属性                   | 类型                |
| -------------------- | ------------------- |
| **`actionTypeId`**   | <code>string</code> |
| **`notificationId`** | <code>number</code> |


#### PluginListenerHandle

| 属性           | 类型                      |
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

<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### 接口


#### CapacitorDevice

获取设备信息，例如网络连接状态和电池状态。

| 属性                     | 类型                                                             | 描述                        | 自      |
| ---------------------- | ---------------------------------------------------------------- | -------------------------- | ----- |
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备的当前电池状态。   | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备的当前网络状态。   | 1.0.0 |


#### BatteryStatus

| 属性                 | 类型                 |
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

| 属性           | 类型                                                 | 描述                            | 自      |
| ------------ | ---------------------------------------------------- | ------------------------------ | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置一个字符串值。  | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。          | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键对应的值。            | 1.0.0 |


#### CapacitorNotifications

发送基本的本地通知。

| 属性               | 类型                                                                                                | 描述                            | 自      |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------------------------------ | ----- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 调度一个本地通知                | 1.0.0 |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用角标数量                | 2.0.0 |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用角标数量                | 2.0.0 |


#### NotificationScheduleOptions

| 属性                     | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 自      |
| ---------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上为 32 位整数，因此值应在 -2147483648 到 2147483647 之间（含边界）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`title`**            | <code>string</code>  | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`sound`**            | <code>string</code>  | 显示此通知时播放的音频文件名。文件名中需包含文件扩展名。在 iOS 上，文件应位于应用包中。在 Android 上，文件应位于 res/raw 文件夹中。推荐使用 `.wav` 格式，因为 iOS 和 Android 均支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，请使用已配置所需声音的 channelId。如果找不到声音文件（即空字符串或错误名称），将使用系统默认通知声音。如果未提供，则在 Android 上会产生默认声音，在 iOS 上则没有声音。                                                                                                                                                                                                               | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>  | 为此通知关联一个动作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>  | 用于对多个通知进行分组。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上的 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到分类摘要格式字符串的字符串。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上的 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`group`**            | <code>string</code>  | 用于对多个通知进行分组。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`groupSummary`**     | <code>string</code>  | 如果为 true，此通知成为一组通知的摘要。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroupSummary()`。仅在使用 `group` 时适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果为 true，通知不能被滑动移除。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果为 true，用户点击通知时自动取消该通知。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置要在大型文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于在收件箱和大型文本通知样式中设置摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源的 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源的 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定应在其上发送通知的频道。如果具有给定名称的频道不存在，则通知不会触发。如果未提供，则使用默认频道。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setChannelId()`。仅适用于 Android 26+。                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |


#### NotificationBadgeOptions

| 属性                         | 类型                | 描述                                                                               | 自      |
| -------------------------- | ------------------- | --------------------------------------------------------------------------------- | ----- |
| **`count`**                | <code>number</code> | 要设置在应用角标上的数字。                                                         | 2.0.0 |
| **`notificationTitle`**    | <code>string</code> | 关联角标通知的 **必需** 标题。仅适用于 Android。                                  | 2.0.0 |
| **`notificationSubtitle`** | <code>string</code> | 关联角标通知的副标题。仅适用于 Android。                                           | 2.0.0 |


#### CapacitorGeolocation

获取设备位置信息。

| 属性                       | 类型                                                                                   | 描述                          | 自      |
| ------------------------ | -------------------------------------------------------------------------------------- | ---------------------------- | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备的最后已知位置        | 1.0.0 |


#### GetCurrentPositionResult

| 属性                     | 类型                        | 描述                                                                                                          | 自      |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ | ----- |
| **`latitude`**         | <code>number</code>         | 纬度，以十进制度数表示                                                                                        | 1.0.0 |
| **`longitude`**        | <code>number</code>         | 经度，以十进制度数表示                                                                                        | 1.0.0 |
| **`accuracy`**         | <code>number</code>         | 纬度和经度坐标的精度级别，以米为单位                                                                          | 1.0.0 |
| **`altitude`**         | <code>number \| null</code> | 用户所在的海拔高度（如果有）                                                                                  | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔坐标的精度级别，以米为单位（如果有）。在所有 iOS 版本和 Android 8.0+ 上可用。                              | 1.0.0 |
| **`speed`**            | <code>number \| null</code> | 用户的移动速度（如果有）                                                                                      | 1.0.0 |
| **`heading`**          | <code>number \| null</code> | 用户面向的方向（如果有）                                                                                      | 1.0.0 |


#### CapacitorWatch

与配对此应用的手表进行交互

sendMessage、transferUserInfo 和 updateApplicationContext 是 WCSession 委托方法的原始路由，但在 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用中目前没有效果。
如果开发了原生手表应用作为 Capacitor 应用的配套应用，则可以使用它们。

| 属性                             | 类型                                                                     | 描述                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 使用 sendMessage() WCSession 委托方法向手表发送消息。在 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用中没有效果                                                               |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 使用 transferUserInfo() WCSession 委托方法向手表发送信息。在 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用中没有效果                                                          |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 使用 updateApplicationContext() WCSession 委托方法更新手表上的应用程序上下文。在 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用中没有效果                                      |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查配套手表是否可达                                                                                                                                                                 |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 将手表上的当前 UI 替换为此处指定的内容。                                                                                                                                             |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新手表用于在文本和按钮字段中显示变量的数据。                                                                                                                                       |


#### CapacitorApp

| 属性             | 类型                                                   |
| -------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |


#### AppState

| 属性             | 类型                 | 描述                       | 自      |
| -------------- | -------------------- | -------------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用是否处于活动状态。     | 1.0.0 |


#### AppInfo

| 属性          | 类型                | 描述                                                                                           | 自      |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用的名称。                                                                                   | 1.0.0 |
| **`id`**      | <code>string</code> | 应用的标识符。在 iOS 上为 Bundle Identifier。在 Android 上为 Application ID。                   | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本。在 iOS 上为 CFBundleVersion。在 Android 上为 versionCode。                            | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。在 iOS 上为 CFBundleShortVersionString。在 Android 上为 package 的 versionName。      | 1.0.0 |


</capacitor-api-docs>
