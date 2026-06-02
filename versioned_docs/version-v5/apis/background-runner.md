---
title: Background Runner Capacitor 插件 API
description: Capacitor Background Runner
translated: true
editUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 环境，用于在 WebView 外部执行您的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner 支持各种设备 API，这些 API 需要用户在使用前授予权限。

## iOS

在 iOS 上，您必须启用 Background Modes 能力。

![在 Xcode 中启用 Background Mode 能力](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，您必须至少启用 `Background fetch` 和 `Background processing` 模式，以启用注册和调度后台任务的能力。

如果您将使用 Geolocation 或 Push Notifications，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置 Background Modes](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

启用 Background Modes 能力后，将以下内容添加到您的应用的 `AppDelegate.swift`：

在文件顶部，在 `import Capacitor` 下方添加：
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

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

## Android

在 `android/app/build.gradle` 中插入以下行：

```diff
...

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
+       dirs '../../node_modules/@capacitor/background-runner/android/src/main/libs', 'libs'
    }
}
...

```

如果您正在从 1.0.5 升级且已有 Android 项目，请确保从 `android/src/main/libs` 中删除 `android-js-engine-release.aar`。

### Geolocation

此 API 需要将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（精确和粗略），最后一行是可选的，但如果您的应用_需要_ GPS 才能运行，则是必需的。您可以省略它，但请记住这可能意味着您的应用会安装在缺少 GPS 硬件的设备上。

### Local Notifications

Android 13 需要进行权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，并将直接返回已授权。

从 Android 12 开始，除非将此权限添加到您的 `AndroidManifest.xml`，否则计划的推送通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍然可以从应用设置中禁用精确通知。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 以获取有关设置 Android 权限的更多信息。

## 关于 Background Runner

在构建复杂应用的过程中，有时需要在应用不在前台时执行工作。标准 Capacitor 应用的挑战在于，当这些后台事件发生时 WebView 不可用，需要您编写原生代码来处理这些事件。这就是 Background Runner 插件发挥作用的地方。

Background Runner 使编写 JavaScript 代码来处理原生后台事件变得容易。您需要做的就是创建您的 runner JavaScript 文件并[定义您的配置](#configuring-background-runner)，然后 Background Runner 插件将自动配置和调度一个原生后台任务，该任务将根据您的配置和平台规则执行。无需修改您的 UI 代码。

## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，它调用您在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果 runner 在您的 runner 文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 时（或者如果操作系统强制终止了您的进程）关闭。

#### Runner JS 文件示例

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在此处执行一些操作以更新系统');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('接受了这些数据：' + JSON.stringify(args.user));

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

在 runner 调用的每个事件处理程序中**必须**调用 `resolve()` / `reject()`。如果未这样做，当应用在后台时事件被调用，您的 runner 可能会被操作系统杀死。如果应用在前台，对 `dispatchEvent` 的异步调用可能不会 resolve。

有关使用 Background Runner 的更多实际示例，请查看 [Background Runner Test App](https://github.com/ionic-team/background-runner-testapp)。

## 配置 Background Runner

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

加载时，Background Runner 将自动注册一个
后台任务，该任务将在您的应用进入后台时被调度并运行。

| 属性            | 类型               | 描述                                                                                                                           | 自从   |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`label`**     | <code>string</code> | runner 的名称，用于日志。                                                                                                      | 1.0.0 |
| **`src`**       | <code>string</code> | runner JavaScript 文件的路径，相对于应用包。                                                                                   | 1.0.0 |
| **`event`**     | <code>string</code> | 当操作系统执行后台任务时将调用的事件名称。                                                                                     | 1.0.0 |
| **`repeat`**    | <code>boolean</code>| 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                           | 1.0.0 |
| **`interval`**  | <code>number</code> | 应用进入后台后，后台任务应开始执行的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的分钟数。                            | 1.0.0 |
| **`autoStart`** | <code>boolean</code>| 应用加载时自动注册和调度后台任务。                                                                                             | 1.0.0 |

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

Background Runner 不在浏览器或 WebView 中执行您的 JavaScript 代码，因此您可能习惯的典型 Web API 可能不可用。这包括 DOM API 以及与应用的 DOM 交互的能力。

以下是 Background Runner 中提供的可用 Web API 列表：

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
  - options 对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API 之外，Background Runner 还支持许多[自定义 Capacitor API](#capacitor-api)，这些 API 公开了相关的移动设备功能。

## Runner 生命周期

目前，runners 设计用于在应用处于后台时执行周期性的突发工作，或在应用处于前台时在与 UI 分离的线程中执行异步工作。因此，runners 不会长期存在。runner 中的事件调用之间不会维护状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文，在该上下文中加载和执行您的 runner 代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

某些 Android 厂商提供了超出原生 Android 范围的内置电池优化设置。其中一些优化必须由您的最终用户禁用，才能使您的后台任务正常工作。

访问 [Don't kill my app!](https://dontkillmyapp.com) 了解受影响的制造商以及您的用户调整设置所需的步骤。

## 后台任务的限制

在移动操作系统上无法运行持久、始终运行的后台服务。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制，后台任务受到各种限制，您在设计和实现后台任务时必须牢记这些限制。

### iOS

- 每次调用您的任务大约有最多 30 秒的运行时间，之后您必须调用 `completed()` 或者您的任务将被终止。
- 虽然您可以设置一个间隔来定义应用进入后台后何时运行任务，或者任务应多久运行一次，但这并不保证。iOS 将决定您的任务最终何时以及多久运行一次，这部分取决于您应用的使用频率。
- 后台任务不会在模拟器中执行。

### Android

- 您的任务最多有 10 分钟来执行工作，但为了使您的任务跨平台兼容，您应将工作限制在最多 30 秒内。
- 重复的后台任务至少需要有 15 分钟的最小间隔。与 iOS 类似，您请求的任何间隔可能都不会完全命中——实际执行时间受操作系统电池优化和其他启发式算法的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回：** <code>any</code>

**自从：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数          | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code>|

**返回：** <code>any</code>

**自从：** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向配置的 runner 派发一个事件。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code>|

**返回：** <code>any</code>

**自从：** 1.0.0

--------------------


### Interfaces


#### PermissionStatus

| 属性              | 类型                                                      |
| ----------------- | --------------------------------------------------------- |
| **`geolocation`** | <code><a href="#permissionstate">PermissionState</a></code>|
| **`notifications`**| <code><a href="#permissionstate">PermissionState</a></code>|


#### RequestPermissionOptions

| 属性       | 类型          |
| ---------- | ------------- |
| **`apis`** | <code>{}</code>|


#### DispatchEventOptions

| 属性          | 类型                               | 描述                              | 自从   |
| ------------- | ---------------------------------- | --------------------------------- | ------ |
| **`label`**   | <code>string</code>                | 要将事件派发到的 runner 标签      | 1.0.0 |
| **`event`**   | <code>string</code>                | 已注册的事件监听器的名称。        | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code>|                                   |        |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### API

<code>'geolocation' | 'notifications'</code>

</docgen-api>

## Capacitor API

<capacitor-api-docs>

<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### Interfaces


#### CapacitorDevice

获取设备信息，例如网络连接和电池状态。

| 属性                 | 类型                                                           | 描述                     | 自从   |
| -------------------- | -------------------------------------------------------------- | ------------------------ | ------ |
| **`getBatteryStatus`**| <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code>| 获取设备的当前电池状态。| 1.0.0 |
| **`getNetworkStatus`**| <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code>| 获取设备的当前网络状态。| 1.0.0 |


#### BatteryStatus

| 属性               | 类型               |
| ------------------ | ------------------ |
| **`batteryLevel`** | <code>number</code> |
| **`isCharging`**   | <code>boolean</code>|


#### NetworkStatus

| 属性               | 类型               |
| ------------------ | ------------------ |
| **`connected`**    | <code>boolean</code>|
| **`connectionType`**| <code>string</code> |


#### CapacitorKV

一个简单的字符串键/值存储，在 iOS 上由 UserDefaults 支持，在 Android 上由 Shared Preferences 支持。

| 属性         | 类型                                               | 描述                         | 自从   |
| ------------ | -------------------------------------------------- | ---------------------------- | ------ |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code>| 使用给定的键设置字符串值。   | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code> | 获取给定键的字符串值。       | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>              | 移除给定键的值。             | 1.0.0 |


#### CapacitorNotifications

发送基本的本地通知。

| 属性           | 类型                                  | 描述               | 自从   |
| -------------- | ------------------------------------- | ------------------ | ------ |
| **`schedule`** | <code>(options: {}) =&gt; void</code> | 调度一个本地通知   | 1.0.0 |


#### NotificationScheduleOptions

| 属性                   | 类型               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 自从   |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`id`**               | <code>number</code>| 通知标识符。在 Android 上是一个 32 位整数。因此值应在 -2147483648 到 2147483647 之间（含）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`title`**            | <code>string</code>| 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`body`**             | <code>string</code>| 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>   | 发送此通知的日期。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`sound`**            | <code>string</code>| 显示此通知时要播放的音频文件的名称。包含文件名中的文件扩展名。在 iOS 上，文件应在应用包中。在 Android 上，文件应在 res/raw 文件夹中。推荐格式为 `.wav`，因为 iOS 和 Android 都支持。仅 iOS 和 Android &lt; 26 可用。对于 Android 26+，使用配置了所需声音的 channelId。如果未找到声音文件（即空字符串或错误名称），将使用默认系统通知声音。如果未提供，在 Android 上会产生默认声音，在 iOS 上则没有声音。                                                                  | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>| 为此通知关联一个操作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>| 用于将多个通知分组。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅 iOS 可用。                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>| 此通知添加到类别的摘要格式字符串中的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅 iOS 可用。                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`group`**            | <code>string</code>| 用于将多个通知分组。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()`。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`groupSummary`**     | <code>string</code>| 如果为 true，此通知成为一组通知的摘要。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()`。仅在使用 `group` 时的 Android 可用。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`extra`**            | <code>any</code>    | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>| 如果为 true，通知不能被滑动移除。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()`。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>| 如果为 true，用户点击通知时该通知被取消。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()`。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`largeBody`**        | <code>string</code>| 设置用于在大文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`summaryText`**      | <code>string</code>| 用于设置收件箱和大文本通知样式中的摘要文本详情。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`smallIcon`**        | <code>string</code>| 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`largeIcon`**        | <code>string</code>| 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅 Android 可用。                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`channelId`**        | <code>string</code>| 指定通知应送达的频道。如果给定名称的频道不存在，则通知不会触发。如果未提供，将使用默认频道。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()`。仅 Android 26+ 可用。                                                                                                                                                                                                                         | 1.0.0 |


#### CapacitorGeolocation

访问设备位置信息。

| 属性                     | 类型                                                                                 | 描述                   | 自从   |
| ------------------------ | ------------------------------------------------------------------------------------ | ---------------------- | ------ |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code>| 获取设备的最后已知位置 | 1.0.0 |


#### GetCurrentPositionResult

| 属性                   | 类型                      | 描述                                                    | 自从   |
| ---------------------- | ------------------------- | ------------------------------------------------------- | ------ |
| **`latitude`**         | <code>number</code>       | 十进制度数的纬度                                         | 1.0.0 |
| **`longitude`**        | <code>number</code>       | 十进制度数的经度                                         | 1.0.0 |
| **`accuracy`**         | <code>number</code>       | 纬度和经度坐标的精度级别（以米为单位）                    | 1.0.0 |
| **`altitude`**         | <code>number \| null</code>| 用户所在的海拔高度（如果可用）                            | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code>| 海拔坐标的精度级别（以米为单位，如果可用）。在所有 iOS 版本和 Android 8.0+ 上可用。| 1.0.0 |
| **`speed`**            | <code>number \| null</code>| 用户的移动速度（如果可用）                               | 1.0.0 |
| **`heading`**          | <code>number \| null</code>| 用户面对的方向（如果可用）                               | 1.0.0 |


#### CapcacitorWatch

与配对此应用的手表进行交互。

sendMessage、transferUserInfo 和 updateApplicationContext 是 WCSession delegate 方法的原始路由，但在 CapactiorWatch Watch 应用中目前没有效果。
如果开发了原生手表应用作为 Capacitor 应用的配套应用，则可以使用它们。

| 属性                           | 类型                                                                   | 描述                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                  | 通过 sendMessage() WCSession delegate 方法向手表发送消息。在 CapacitorWatch 手表应用上没有效果。                       |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                  | 通过 transferUserInfo() WCSession delegate 方法向手表发送信息。在 CapacitorWatch 手表应用上没有效果。                  |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                  | 通过 updateApplicationContext() WCSession delegate 方法更新手表上的应用上下文。在 CapacitorWatch 手表应用上没有效果。 |
| **`isReachable`**              | <code>boolean</code>                                                   | 检查配套手表是否可达。                                                                                                |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                | 用手表上指定的 UI 替换当前 UI。                                                                                       |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code>| 更新手表用于在文本和按钮字段中显示变量的数据。                                                                          |


</capacitor-api-docs>
