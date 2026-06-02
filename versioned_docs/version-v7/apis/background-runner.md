---
title: Background Runner Capacitor 插件 API
description: Capacitor Background Runner
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/2.x/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/2.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
translated: true
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 环境，用于在 Web View 之外执行您的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner@latest-7
npx cap sync
```

Background Runner 支持多种设备 API，这些 API 在使用前需要用户授权权限。

## iOS

在 iOS 上，您必须启用 Background Modes 功能。

![在 Xcode 中启用 Background Mode 功能](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，您必须至少启用 `Background fetch` 和 `Background processing` 模式，才能注册和调度您的后台任务。

如果您将使用 Geolocation 或 Push Notifications，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置 Background Modes](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

您还需要在 `Info.plist` 文件中添加以下条目：
```
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.example.background.task</string>
</array>
```

阅读关于[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的更多信息，请参阅 [iOS 指南](https://capacitorjs.com/docs/ios) 以了解在 Xcode 中设置 iOS 权限的更多信息。

确保您在插件配置的 `label` 字段中使用与 `BGTaskSchedulerPermittedIdentifiers` 相同的 ID（例如 "com.example.background.task"）。

启用 Background Modes 功能后，将以下内容添加到您的应用的 `AppDelegate.swift` 中：

在文件顶部，在 `import Capacitor` 下添加：
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

### Geolocation

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription`（隐私 - 始终使用位置描述）
- `NSLocationWhenInUseUsageDescription`（隐私 - 使用期间位置描述）

## Android

在 `android/app/build.gradle` 中插入以下行：

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

如果您是从 1.0.5 版本升级且已有 Android 项目，请确保从 `android/src/main/libs` 中删除 `android-js-engine-release.aar`。

### Geolocation

此 API 需要在您的 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（精确和粗略），最后一行是可选的，但如果您的应用*需要* GPS 功能才能运行，则是必需的。您可以省略它，但请注意这可能意味着您的应用会安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，而是直接返回已授权。

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加此权限，否则计划的通知不会精确执行：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使有此权限，用户仍然可以从应用设置中禁用精确通知。

阅读关于[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)的更多信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android) 以了解有关设置 Android 权限的更多信息。

## 关于 Background Runner

在构建复杂应用的过程中，有时需要在应用不在前台时执行工作。标准 Capacitor 应用的挑战在于，当这些后台事件发生时，Web View 不可用，因此您需要编写原生代码来处理这些事件。这就是 Background Runner 插件发挥作用的地方。

Background Runner 使得编写 JavaScript 代码来处理原生后台事件变得容易。您需要做的就是创建您的 Runner JavaScript 文件并[定义您的配置](#配置-background-runner)，然后 Background Runner 插件将自动配置和调度一个原生后台任务，该任务将根据您的配置和平台的规则执行。无需修改您的 UI 代码。


## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，它调用您在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理器。如果 Runner 在您的 Runner 文件中找到与传入事件对应的事件处理器，它将执行该事件处理器，然后在调用 `resolve()` 或 `reject()` 时关闭（或者如果操作系统强制杀死您的进程，也会关闭）。

#### Runner JS 文件示例

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在此处执行某些操作以更新系统');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('接受了此数据：' + JSON.stringify(args.user));

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
    console.log('收到静默推送通知');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: '企业 Background Runner',
        body: '收到静默推送通知',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在 Runner 调用的每个事件处理器中**必须**调用 `resolve()` \ `reject()`。如果不这样做，可能导致您的 Runner 在应用处于后台时被 OS 杀死。如果应用在前台，对 `dispatchEvent` 的异步调用可能无法解析。

有关使用 Background Runner 的更真实示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置 Background Runner

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

加载时，Background Runner 将自动注册一个
后台任务，该任务将在您的应用进入后台后调度并运行。

| 属性 | 类型 | 描述 | 起始版本 |
| --------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**     | <code>string</code>  | Runner 的名称，用于日志中。 | 1.0.0 |
| **`src`**       | <code>string</code>  | Runner JavaScript 文件的路径，相对于应用包。 | 1.0.0 |
| **`event`**     | <code>string</code>  | 当 OS 执行后台任务时将调用的事件名称。 | 1.0.0 |
| **`repeat`**    | <code>boolean</code> | 后台任务是否应根据 `interval` 中设置的间隔重复执行。 | 1.0.0 |
| **`interval`**  | <code>number</code>  | 应用进入后台后，后台任务开始执行的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的间隔分钟数。 | 1.0.0 |
| **`autoStart`** | <code>boolean</code> | 在应用加载时自动注册和调度后台任务。 | 1.0.0 |

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

Background Runner 不在浏览器或 Web View 中执行您的 JavaScript 代码，因此您可能习惯的典型 Web API 可能不可用。这包括 DOM API 以及与您的应用的 DOM 交互的能力。

以下是 Background Runner 中提供的 Web API 列表：

- [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  - 仅支持 `info`、`log`、`warn`、`error` 和 `debug`
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
  - 仅支持 `decode`
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  - 仅支持 `encode`
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - 不支持 Event Listener options 和 `useCapture`
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - 尚不支持 Request 对象
  - 选项对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API 之外，Background Runner 还支持许多[自定义 Capacitor API](#capacitor-api)，这些 API 暴露了相关的移动设备功能。

## Runner 生命周期

目前，Runner 设计用于在应用处于后台时执行周期性的短时工作任务，或者在应用处于前台时在与 UI 分离的线程中执行异步工作。因此，Runner 的生命周期不长。状态不会在 Runner 中的事件调用之间保持。每次调用 `dispatchEvent()` 都会创建一个新的上下文，在其中加载和执行您的 Runner 代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供了内置的电池优化设置，这些设置超出了标准 Android 提供的范围。其中一些优化需要您的最终用户禁用，您的后台任务才能正常工作。

请访问[不要杀死我的应用！](https://dontkillmyapp.com)以获取有关受影响的制造商以及用户需要采取的调整设置步骤的更多信息。

## 后台任务的限制

在移动操作系统上，不可能运行持久的、始终运行的后台服务。由于 iOS 和 Android 为了减少电池和数据消耗而施加的限制，后台任务受到各种限制，您在设计和实现后台任务时必须牢记这些限制。

### iOS

- 每次调用您的任务大约有最多 30 秒的运行时间，之后您必须调用 `completed()`，否则您的任务将被杀死。
- 虽然您可以设置间隔来定义任务在应用后台化后何时运行，或者应该多久运行一次，但这并不能保证。iOS 将决定您的任务最终何时以及多久运行一次，这在一定程度上取决于您的应用被使用的频率。
- 后台任务不在模拟器中执行。

### Android

- 您的任务最多有 10 分钟来执行工作，但为了保持跨平台兼容性，您应尽量将工作限制在最多 30 秒内。
- 重复的后台任务的最小间隔至少为 15 分钟。与 iOS 类似，您请求的任何间隔可能不会精确达到 - 实际的执行时间受 OS 电池优化和其他启发式算法的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [`addListener('backgroundRunnerNotificationReceived', ...)`](#addlistenerbackgroundrunnernotificationreceived-)
* [`removeNotificationListeners()`](#removenotificationlisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回值：** <code>any</code>

**起始版本：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回值：** <code>any</code>

**起始版本：** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向已配置的 Runner 分发事件。

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回值：** <code>any</code>

**起始版本：** 1.0.0

--------------------


### addListener('backgroundRunnerNotificationReceived', ...)

```typescript
addListener(eventName: 'backgroundRunnerNotificationReceived', listenerFunc: (event: NotificationActionEvent) => void) => any
```

为通知操作添加监听器。

| 参数 | 类型 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'backgroundRunnerNotificationReceived'</code>                                             |
| **`listenerFunc`** | <code>(event: <a href="#notificationactionevent">NotificationActionEvent</a>) =&gt; void</code> |

**返回值：** <code>any</code>

**起始版本：** 2.1.1

--------------------


### removeNotificationListeners()

```typescript
removeNotificationListeners() => any
```

移除此插件的通知操作监听器。

**返回值：** <code>any</code>

**起始版本：** 2.1.1

--------------------


### Interfaces


#### PermissionStatus

| 属性 | 类型 |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | <code><a href="#permissionstate">PermissionState</a></code> |
| **`notifications`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### RequestPermissionOptions

| 属性 | 类型 |
| ---------- | --------------- |
| **`apis`** | <code>{}</code> |


#### DispatchEventOptions

| 属性 | 类型 | 描述 | 起始版本 |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要分发事件的 Runner 标签 | 1.0.0 |
| **`event`**   | <code>string</code>                  | 已注册事件监听器的名称。 | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                                            |       |


#### NotificationActionEvent

| 属性 | 类型 |
| -------------------- | ------------------- |
| **`actionTypeId`**   | <code>string</code> |
| **`notificationId`** | <code>number</code> |


#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### API

<code>'geolocation' | 'notifications'</code>

</docgen-api>

## Capacitor API

<capacitor-api-docs>

<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### Interfaces


#### CapacitorDevice

获取设备信息，例如网络连接和电池状态。

| 属性 | 类型 | 描述 | 起始版本 |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备的当前电池状态。 | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备的当前网络状态。 | 1.0.0 |


#### BatteryStatus

| 属性 | 类型 |
| ------------------ | -------------------- |
| **`batteryLevel`** | <code>number</code>  |
| **`isCharging`**   | <code>boolean</code> |


#### NetworkStatus

| 属性 | 类型 |
| -------------------- | -------------------- |
| **`connected`**      | <code>boolean</code> |
| **`connectionType`** | <code>string</code>  |


#### CapacitorKV

一个简单的字符串键/值存储，在 iOS 上由 UserDefaults 支持，在 Android 上由 Shared Preferences 支持。

| 属性 | 类型 | 描述 | 起始版本 |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。 | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 删除给定键的值。 | 1.0.0 |


#### CapacitorNotifications

发送基本的本地通知。

| 属性 | 类型 | 描述 | 起始版本 |
| ---------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- | ----- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 调度本地通知 | 1.0.0 |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用徽章计数 | 2.0.0 |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用徽章计数 | 2.0.0 |


#### NotificationScheduleOptions

| 属性 | 类型 | 描述 | 起始版本 |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上是一个 32 位整数。因此值应在 -2147483648 到 2147483647 之间（含）。 | 1.0.0 |
| **`title`**            | <code>string</code>  | 通知的标题。 | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知的正文，显示在标题下方。 | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期。 | 1.0.0 |
| **`sound`**            | <code>string</code>  | 显示此通知时要播放的音频文件名。在 iOS 上，文件应在应用包中。在 Android 上，文件应在 res/raw 文件夹中。推荐格式为 `.wav`，因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，使用配置了所需声音的 channelId。 | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>  | 将操作类型与此通知关联。 | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>  | 用于对多个通知进行分组。仅适用于 iOS。 | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到类别的摘要格式字符串中的字符串。仅适用于 iOS。 | 1.0.0 |
| **`group`**            | <code>string</code>  | 用于对多个通知进行分组。仅适用于 Android。 | 1.0.0 |
| **`groupSummary`**     | <code>string</code>  | 如果为 true，此通知将成为一组通知的摘要。仅适用于 Android（与 `group` 一起使用时）。 | 1.0.0 |
| **`extra`**            | <code>any</code>     | 为此通知设置要存储的额外数据。 | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果为 true，通知不能被滑动清除。仅适用于 Android。 | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果为 true，用户点击通知时自动取消。仅适用于 Android。 | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置在大文本通知样式中显示的多行文本块。 | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于设置收件箱和大文本通知样式中的摘要文本详情。仅适用于 Android。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。仅适用于 Android。 | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 设置通知的大图标。仅适用于 Android。 | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定通知应发送到的频道。仅适用于 Android 26+。 | 1.0.0 |


#### NotificationBadgeOptions

| 属性 | 类型 | 描述 | 起始版本 |
| -------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ----- |
| **`count`**                | <code>number</code> | 要设置的应用程序徽章计数。 | 2.0.0 |
| **`notificationTitle`**    | <code>string</code> | 关联徽章计数通知的**必需**标题。仅适用于 Android。 | 2.0.0 |
| **`notificationSubtitle`** | <code>string</code> | 关联徽章计数通知的副标题。仅适用于 Android。 | 2.0.0 |


#### CapacitorGeolocation

访问设备位置信息。

| 属性 | 类型 | 描述 | 起始版本 |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------------------------- | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备的最后已知位置 | 1.0.0 |


#### GetCurrentPositionResult

| 属性 | 类型 | 描述 | 起始版本 |
| ---------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| **`latitude`**         | <code>number</code>         | 以十进制为单位的纬度 | 1.0.0 |
| **`longitude`**        | <code>number</code>         | 以十进制为单位的经度 | 1.0.0 |
| **`accuracy`**         | <code>number</code>         | 纬度和经度坐标的精度级别（以米为单位） | 1.0.0 |
| **`altitude`**         | <code>number \| null</code> | 用户所在的海拔高度（如果可用） | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔高度的精度级别（以米为单位，如果可用）。 | 1.0.0 |
| **`speed`**            | <code>number \| null</code> | 用户的移动速度（如果可用） | 1.0.0 |
| **`heading`**          | <code>number \| null</code> | 用户面向的方向（如果可用） | 1.0.0 |


#### CapacitorWatch

与此应用配对的 Watch 交互。

| 属性 | 类型 | 描述 |
| ------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 使用 sendMessage() WCSession 代理方法向 Watch 发送消息。对 CapacitorWatch watch 应用没有效果。 |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 使用 transferUserInfo() WCSession 代理方法向 Watch 发送信息。对 CapacitorWatch watch 应用没有效果。 |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 使用 updateApplicationContext() WCSession 代理方法更新 Watch 上的应用上下文。对 CapacitorWatch watch 应用没有效果。 |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查配对的 Watch 是否可达。 |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 用此处指定的内容替换 Watch 上的当前 UI。 |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新 Watch 用于在文本和按钮字段中显示变量的数据。 |


#### CapacitorApp

| 属性 | 类型 |
| -------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |


#### AppState

| 属性 | 类型 | 描述 | 起始版本 |
| -------------- | -------------------- | --------------------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用是否活跃。 | 1.0.0 |


#### AppInfo

| 属性 | 类型 | 描述 | 起始版本 |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用的名称。 | 1.0.0 |
| **`id`**      | <code>string</code> | 应用的标识符。在 iOS 上是 Bundle Identifier。在 Android 上是 Application ID。 | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本。在 iOS 上是 CFBundleVersion。在 Android 上是 versionCode。 | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。在 iOS 上是 CFBundleShortVersionString。在 Android 上是 package 的 versionName。 | 1.0.0 |


</capacitor-api-docs>
