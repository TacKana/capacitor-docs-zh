---
title: Background Runner Capacitor 插件 API
description: Capacitor Background Runner
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/2.x/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/2.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 环境，用于在 WebView 之外执行你的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner 支持多种设备 API，这些 API 在使用前需要获得用户的许可。

## iOS

在 iOS 上，你必须启用 Background Modes（后台模式）能力。

![在 Xcode 中启用 Background Mode 能力](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，你至少需要启用 `Background fetch` 和 `Background processing` 模式，才能注册和调度后台任务。

如果你将使用地理位置或推送通知功能，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置 Background Modes](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

启用 Background Modes 能力后，请将以下代码添加到你的应用 `AppDelegate.swift` 中：

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

为了让 Background Runner 能够处理远程通知，请添加以下代码：

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

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分。

## Android

将以下行插入到 `android/app/build.gradle` 文件中：

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

如果你是从 1.0.5 版本升级现有的 Android 项目，请确保删除 `android/src/main/libs` 目录下的 `android-js-engine-release.aar` 文件。

### 地理位置

此 API 要求将以下权限添加到你的 `AndroidManifest.xml` 文件中：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取位置数据（粗略和精确），最后一行是可选的，但如果你的应用_需要_ GPS 才能运行，则必须添加。你可以省略它，但请注意，这意味着你的应用可能会安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，只会返回已授权状态。

从 Android 12 开始，除非在你的 `AndroidManifest.xml` 中添加此权限，否则计划通知将不会是精确的：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍然可以从应用设置中禁用精确通知。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分。

## 关于 Background Runner
在构建复杂应用程序的过程中，有时需要在应用程序不在前台时执行任务。标准 Capacitor 应用程序面临的挑战是，当这些后台事件发生时，WebView 不可用，这要求你编写原生代码来处理这些事件。这就是 Background Runner 插件的用武之地。

Background Runner 让你可以轻松地编写 JavaScript 代码来处理原生后台事件。你只需要创建你的 runner JavaScript 文件并 [定义你的配置](#configuring-background-runner)，然后 Background Runner 插件将根据你的配置和平台规则自动配置和调度一个原生后台任务。无需对你的 UI 代码进行任何修改。

## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，它会调用你在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果 runner 在你的 runner 文件中找到了与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 后关闭（或者如果操作系统强制终止你的进程）。

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

在被 runner 调用的每个事件处理程序中，调用 `resolve()` \ `reject()` 是**必需**的。如果不这样做，当你的应用在后台运行时，如果事件被触发，可能会导致你的 runner 被操作系统终止。如果应用在前台运行，对 `dispatchEvent` 的异步调用可能不会解析。

有关使用 Background Runner 的更多实际示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置后台运行器 {#configuring-background-runner}

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

加载时，后台运行器会自动注册一个后台任务，当应用进入后台时，该任务将被调度并执行。

| 属性             | 类型                  | 描述                                                                                                                                                                          | 始于  |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**      | <code>string</code>   | 运行器的名称，用于日志记录。                                                                                                                                                  | 1.0.0 |
| **`src`**        | <code>string</code>   | 运行器 JavaScript 文件的路径，相对于应用包。                                                                                                                                  | 1.0.0 |
| **`event`**      | <code>string</code>   | 当操作系统执行后台任务时将被调用的事件名称。                                                                                                                                  | 1.0.0 |
| **`repeat`**     | <code>boolean</code>  | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                                                                           | 1.0.0 |
| **`interval`**   | <code>number</code>   | 应用进入后台后，后台任务开始执行所需的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的分钟间隔。                                                                        | 1.0.0 |
| **`autoStart`**  | <code>boolean</code>  | 在应用加载时自动注册并调度后台任务。                                                                                                                                          | 1.0.0 |

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

后台运行器不在浏览器或 Web 视图中执行你的 JavaScript 代码，因此你可能习惯的典型 Web API 可能不可用。这包括 DOM API 以及与应用程序 DOM 交互的能力。

以下是后台运行器中提供的可用 Web API 列表：

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
  - 尚不支持 Request 对象
  - 在 options 对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API 外，后台运行器还支持一些[自定义的 Capacitor API](#capacitor-api)，这些自定义 API 暴露了相关的移动设备功能。

## 运行器生命周期

目前，运行器设计用于在应用处于后台时执行周期性的工作，或在应用处于前台时在与 UI 不同的线程中执行异步工作。因此，运行器不是长期存活的。在运行器中对事件的调用之间不保持状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文来加载和执行你的运行器代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供了超出原生 Android 的内置电池优化设置。其中一些优化必须由你的最终用户禁用，才能让你的后台任务正常工作。

请访问 [Don't kill my app!](https://dontkillmyapp.com) 以获取有关受影响的制造商以及用户调整设置所需步骤的更多信息。

## 后台任务的限制

在移动操作系统上运行持久且始终运行的后台服务是不可能的。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制，后台任务受到各种限制，你在设计和实现后台任务时必须牢记这些限制。

### iOS

- 在必须调用 `completed()` 之前，你的任务的每次调用大约有 30 秒的运行时间，否则任务将被终止。
- 虽然你可以设置一个间隔来定义应用进入后台后任务何时运行，或者应该运行的频率，但这并不能保证。iOS 将决定你的任务最终何时以及以何种频率运行，这部分取决于你应用的使用频率。
- 后台任务不会在模拟器中执行。

### Android

- 你的任务最多有 10 分钟的时间来执行工作，但为了使你的任务跨平台兼容，你应该将工作限制在最多 30 秒。
- 重复的后台任务的最小间隔至少为 15 分钟。与 iOS 类似，你请求的任何间隔可能无法精确命中——实际执行时间受操作系统电池优化和其他启发式算法的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回值：** <code>any</code>

**始于：** 1.0.0

--------------------

### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数         | 类型                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回值:** <code>any</code>

**自版本:** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向配置的运行器发送事件。

| 参数         | 类型                                                                  |
| ------------ | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回值:** <code>any</code>

**自版本:** 1.0.0

--------------------


### 接口


#### PermissionStatus

| 属性                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | <code><a href="#permissionstate">PermissionState</a></code> |
| **`notifications`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### RequestPermissionOptions

| 属性       | 类型            |
| ---------- | --------------- |
| **`apis`** | <code>{}</code> |


#### DispatchEventOptions

| 属性          | 类型                                 | 描述                                | 自版本 |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要发送事件的目标运行器标签  | 1.0.0 |
| **`event`**   | <code>string</code>                  | 已注册的事件监听器名称。 | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                                            |       |


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

获取设备信息，例如网络连接状态和电池状态。

| 属性                   | 类型                                                             | 描述                                    | 自版本 |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备的当前电池状态。 | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备的当前网络状态。 | 1.0.0 |


#### BatteryStatus

| 属性               | 类型                 |
| ------------------ | -------------------- |
| **`batteryLevel`** | <code>number</code>  |
| **`isCharging`**   | <code>boolean</code> |


#### NetworkStatus

| 属性                 | 类型                 |
| -------------------- | -------------------- |
| **`connected`**      | <code>boolean</code> |
| **`connectionType`** | <code>string</code>  |


#### CapacitorKV

一个简单的字符串键/值存储，在 iOS 上由 UserDefaults 支持，在 Android 上由 Shared Preferences 支持。

| 属性         | 类型                                                 | 描述                            | 自版本 |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置一个字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键对应的字符串值。  | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键对应的值。     | 1.0.0 |


#### CapacitorNotifications

发送基本的本地通知。

| 属性             | 类型                                                                                                | 描述                        | 自版本 |
| ---------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- | ----- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 安排一个本地通知      | 1.0.0 |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用程序角标计数    | 2.0.0 |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用程序角标计数 | 2.0.0 |

#### 通知排程选项

| 属性                   | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 版本  |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上为 32 位整数，因此值应在 -2147483648 到 2147483647 之间（包含边界）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`title`**            | <code>string</code>  | 通知标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`sound`**            | <code>string</code>  | 显示此通知时要播放的音频文件名。需包含文件扩展名。在 iOS 上，文件应位于应用包中；在 Android 上，文件应位于 res/raw 文件夹中。推荐使用 `.wav` 格式，因为 iOS 和 Android 均支持该格式。仅适用于 iOS 及 Android < 26 版本。对于 Android 26+，请使用配置了所需声音的 channelId。如果未找到声音文件（例如空字符串或错误文件名），将使用默认系统通知音。若未提供此参数，在 Android 上将播放默认声音，在 iOS 上则无声音。                                                                                                                             | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>  | 与此通知关联的操作类型标识符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>  | 用于对多个通知进行分组。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `threadIdentifier` 属性。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到类别摘要格式字符串中的内容。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `summaryArgument` 属性。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`group`**            | <code>string</code>  | 用于对多个通知进行分组。以提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroup()` 方法。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 || **`groupSummary`**     | <code>string</code>  | 如果为 true，此通知将成为一组通知的摘要。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()` 并传入提供的值。仅在使用 `group` 参数时对 Android 有效。                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果为 true，通知将无法被滑动清除。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()` 并传入提供的值。仅对 Android 有效。                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果为 true，用户点击通知时该通知会被取消。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()` 并传入提供的值。仅对 Android 有效。                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置用于大文本通知样式的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于设置收件箱和大文本通知样式中的摘要文本详情。仅对 Android 有效。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置此选项，将覆盖 Capacitor 配置中的 `smallIcon` 设置。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅对 Android 有效。                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 设置通知的大图标。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅对 Android 有效。                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定通知应发送到的渠道。如果给定名称的渠道不存在，则通知不会触发。如果未提供，将使用默认渠道。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()` 并传入提供的值。仅对 Android 26+ 有效。                                                                                                                                                                                                                                                                           | 1.0.0 |

#### NotificationBadgeOptions

| 属性                     | 类型                | 描述                                                                 | 始于版本 |
| ------------------------ | ------------------- | -------------------------------------------------------------------- | -------- |
| **`count`**              | <code>number</code> | 设置应用徽章上显示的数字。                                           | 2.0.0    |
| **`notificationTitle`**  | <code>string</code> | 关联徽章计数通知的**必需**标题。仅适用于 Android。                   | 2.0.0    |
| **`notificationSubtitle`** | <code>string</code> | 关联徽章计数通知的副标题。仅适用于 Android。                         | 2.0.0    |


#### CapacitorGeolocation

获取设备位置信息。

| 属性                   | 类型                                                                                   | 描述                           | 始于版本 |
| ---------------------- | -------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备最后已知的位置信息     | 1.0.0    |


#### GetCurrentPositionResult

| 属性                 | 类型                        | 描述                                                                                                               | 始于版本 |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------- |
| **`latitude`**       | <code>number</code>         | 以十进制表示的纬度                                                                                                 | 1.0.0    |
| **`longitude`**      | <code>number</code>         | 以十进制表示的经度                                                                                                 | 1.0.0    |
| **`accuracy`**       | <code>number</code>         | 经纬度坐标的精度，单位为米                                                                                         | 1.0.0    |
| **`altitude`**       | <code>number \| null</code> | 用户所在的海拔高度（如果可用）                                                                                     | 1.0.0    |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔坐标的精度，单位为米（如果可用）。在所有 iOS 版本和 Android 8.0+ 上可用。                                      | 1.0.0    |
| **`speed`**          | <code>number \| null</code> | 用户的移动速度（如果可用）                                                                                         | 1.0.0    |
| **`heading`**        | <code>number \| null</code> | 用户面对的方向（如果可用）                                                                                         | 1.0.0    |


#### CapacitorWatch

与配对本应用的智能手表进行交互。

sendMessage、transferUserInfo 和 updateApplicationContext 是 WCSession 委托方法的原始路由，但目前对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有任何效果。如果开发原生手表应用作为 Capacitor 应用的伴侣应用，这些方法可能有用。

| 属性                           | 类型                                                                     | 描述                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 通过 sendMessage() WCSession 委托方法向手表发送消息。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有效果。                                        |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 通过 transferUserInfo() WCSession 委托方法向手表发送信息。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有效果。                                   |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 通过 updateApplicationContext() WCSession 委托方法更新手表上的应用上下文。这对 <a href="#capacitorwatch">CapacitorWatch</a> 手表应用没有效果。                   |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查伴侣手表是否可达                                                                                                                                             |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 用此处指定的内容替换手表上当前的用户界面。                                                                                                                       |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新手表用于在文本和按钮字段中显示变量的数据                                                                                                                     |


#### CapacitorApp

| 属性           | 类型                                                   |
| -------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |


#### AppState

| 属性           | 类型                 | 描述                     | 始于版本 |
| -------------- | -------------------- | ------------------------ | -------- |
| **`isActive`** | <code>boolean</code> | 应用是否处于活动状态。   | 1.0.0    |


#### AppInfo

| 属性          | 类型                | 描述                                                                                         | 始于版本 |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------- | -------- |
| **`name`**    | <code>string</code> | 应用的名称。                                                                                 | 1.0.0    |
| **`id`**      | <code>string</code> | 应用的标识符。在 iOS 上是 Bundle Identifier，在 Android 上是 Application ID。                | 1.0.0    |
| **`build`**   | <code>string</code> | 构建版本号。在 iOS 上是 CFBundleVersion，在 Android 上是 versionCode。                       | 1.0.0    |
| **`version`** | <code>string</code> | 应用版本号。在 iOS 上是 CFBundleShortVersionString，在 Android 上是 package 的 versionName。 | 1.0.0    |


</capacitor-api-docs>