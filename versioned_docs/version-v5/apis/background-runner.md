---
title: Background Runner Capacitor 插件 API
description: Capacitor 后台运行器
editUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 环境，用于在 Web 视图之外执行你的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner 支持多种设备 API，这些 API 在使用前需要获得用户的许可。

## iOS

在 iOS 上，你必须启用后台模式功能。

![在 Xcode 中启用后台模式功能](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，你必须至少启用 `Background fetch` 和 `Background processing` 模式，才能注册和调度后台任务。

如果你将使用地理定位或推送通知，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

启用后台模式功能后，将以下代码添加到应用的 `AppDelegate.swift` 中：

在文件顶部，`import Capacitor` 下面添加：
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

为了让 Background Runner 处理远程通知，添加以下代码：

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

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 在使用期间使用位置说明`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分。

## Android

将以下行插入 `android/app/build.gradle`：

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

如果你是从 1.0.5 版本升级并且已有 Android 项目，请务必删除 `android/src/main/libs` 中的 `android-js-engine-release.aar`。

### 地理定位

此 API 要求将以下权限添加到你的 `AndroidManifest.xml`：

```xml
<!-- 地理定位 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（包括粗略和精确位置），最后一行是可选的，但如果你的应用 _需要_ GPS 才能运行，则是必需的。你可以省略它，但请注意，这可能意味着你的应用会安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授予状态。

从 Android 12 开始，除非将此权限添加到你的 `AndroidManifest.xml`，否则计划通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍然可以从应用设置中禁用精确通知。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分。

## 关于 Background Runner

在构建复杂应用的过程中，有时需要在应用不在前台时执行工作。标准 Capacitor 应用面临的挑战是，当这些后台事件发生时，Web 视图不可用，这要求你编写原生代码来处理这些事件。这就是 Background Runner 插件的用武之地。

Background Runner 让你可以轻松编写 JavaScript 代码来处理原生后台事件。你只需要创建运行器 JavaScript 文件并 [定义配置](#configuring-background-runner)，然后 Background Runner 插件会自动配置和调度一个原生后台任务，该任务将根据你的配置和平台规则执行。无需修改你的 UI 代码。

## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，它调用你在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果运行器在你的运行器文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 后关闭（或者如果操作系统强制终止你的进程）。

#### 运行器 JS 文件示例

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在这里执行一些操作来更新系统');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('接收到的数据：' + JSON.stringify(args.user));

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
        title: '企业级 Background Runner',
        body: '收到静默推送通知',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在每个由运行器调用的事件处理程序中，调用 `resolve()` \ `reject()` 是 **必需** 的。如果不这样做，当你的事件在应用处于后台时被调用，可能会导致运行器被操作系统终止。如果应用在前台，对 `dispatchEvent` 的异步调用可能不会解析。

有关使用 Background Runner 的更多实际示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。## 配置后台运行器

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

加载时，后台运行器将自动注册一个后台任务，该任务将在您的应用进入后台时被调度和执行。

| 属性             | 类型                  | 描述                                                                                                                                                                        | 自版本 |
| ---------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`label`**      | <code>string</code>   | 运行器的名称，用于日志记录。                                                                                                                                                | 1.0.0  |
| **`src`**        | <code>string</code>   | 运行器 JavaScript 文件的路径，相对于应用包。                                                                                                                                | 1.0.0  |
| **`event`**      | <code>string</code>   | 当操作系统执行后台任务时将被调用的事件名称。                                                                                                                                | 1.0.0  |
| **`repeat`**     | <code>boolean</code>  | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                                                                        | 1.0.0  |
| **`interval`**   | <code>number</code>   | 应用进入后台后，后台任务应开始执行的分钟数。如果 `repeat` 为 true，这也指定了每次执行之间的分钟数间隔。                                                                     | 1.0.0  |
| **`autoStart`**  | <code>boolean</code>  | 在应用加载时自动注册和调度后台任务。                                                                                                                                        | 1.0.0  |

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

后台运行器不在浏览器或 Web 视图中执行您的 JavaScript 代码，因此您可能习惯使用的典型 Web API 可能不可用。这包括 DOM API 以及与应用程序 DOM 交互的能力。

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

除了标准的 Web API 之外，后台运行器还支持一些[自定义的 Capacitor API](#capacitor-api)，这些 API 暴露了相关的移动设备功能。

## 运行器生命周期

目前，运行器设计用于在您的应用程序处于后台时执行周期性工作，或者在您的应用程序处于前台时在与 UI 线程分离的线程中执行异步工作。因此，运行器不是长期存在的。在运行器事件调用之间不会保持状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文来加载和执行您的运行器代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供了超出原生 Android 的内置电池优化设置。其中一些优化必须由您的最终用户禁用，才能使您的后台任务正常工作。

访问 [Don't kill my app!](https://dontkillmyapp.com) 以获取有关受影响的制造商以及您的用户调整设置所需的步骤的更多信息。

## 后台任务的限制

在移动操作系统上运行持久、始终运行的后台服务是不可能的。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制，后台任务受到各种限制，您在设计和实现后台任务时必须牢记这些限制。

### iOS

- 您的任务的每次调用最多有大约 30 秒的运行时间，之后必须调用 `completed()`，否则您的任务将被终止。
- 虽然您可以设置一个间隔来定义应用进入后台后何时运行您的任务，或者它应该运行的频率，但这并不能保证。iOS 将根据您的应用使用频率等因素来决定您的任务最终何时以及以何种频率运行。
- 后台任务不在模拟器中执行。

### Android

- 您的任务最多有 10 分钟的时间来执行工作，但为了保持您的任务的跨平台兼容性，您应该将您的工作限制在最多 30 秒。
- 重复的后台任务的最小间隔至少为 15 分钟。与 iOS 类似，您请求的任何间隔都可能无法完全满足——实际执行时间受操作系统电池优化和其他启发式因素的影响。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回：** <code>any</code>

**自版本：** 1.0.0

--------------------### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数         | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回值:** <code>any</code>

**自版本:** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

将事件分派到已配置的运行器。

| 参数         | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
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
| **`label`**   | <code>string</code>                  | 要分派事件的目标运行器标签  | 1.0.0 |
| **`event`**   | <code>string</code>                  | 已注册事件监听器的名称。 | 1.0.0 |
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
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备当前的电池状态。 | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备当前的网络状态。 | 1.0.0 |


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

一个简单的字符串键值存储，在 iOS 上基于 UserDefaults，在 Android 上基于 Shared Preferences。

| 属性         | 类型                                                 | 描述                            | 自版本 |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置一个字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键对应的字符串值。  | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键对应的值。     | 1.0.0 |


#### CapacitorNotifications

发送基本的本地通知。

| 属性           | 类型                                  | 描述                   | 自版本 |
| -------------- | ------------------------------------- | ----------------------------- | ----- |
| **`schedule`** | <code>(options: {}) =&gt; void</code> | 调度一个本地通知 | 1.0.0 |

</capacitor-api-docs>#### 通知计划选项| 属性                  | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 始于版本 |
| --------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`id`**              | <code>number</code>  | 通知标识符。在 Android 上它是一个 32 位整数，因此值应在 -2147483648 到 2147483647 之间（包含两端）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0    |
| **`title`**           | <code>string</code>  | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0    |
| **`body`**            | <code>string</code>  | 通知的正文内容，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0    |
| **`scheduleAt`**      | <code>Date</code>    | 发送此通知的日期和时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0    |
| **`sound`**           | <code>string</code>  | 显示此通知时要播放的音频文件名。需要包含文件扩展名。在 iOS 上，文件应位于应用包中；在 Android 上，文件应位于 res/raw 文件夹中。建议使用 `.wav` 格式，因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android < 26 版本。对于 Android 26+，请使用配置了所需声音的 channelId。如果未找到声音文件（例如空字符串或错误名称），将使用默认的系统通知声音。如果不提供此属性，在 Android 上会产生默认声音，在 iOS 上则没有声音。                                                                                              | 1.0.0    |
| **`actionTypeId`**    | <code>string</code>  | 与此通知关联的操作类型标识符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0    |
| **`threadIdentifier`** | <code>string</code>  | 用于对多个通知进行分组。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `threadIdentifier` 属性。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0    |
| **`summaryArgument`** | <code>string</code>  | 此通知添加到类别的摘要格式字符串中的内容。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `summaryArgument` 属性。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0    |
| **`group`**           | <code>string</code>  | 用于对多个通知进行分组。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()` 方法并传入提供的值。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0    || **`groupSummary`**     | <code>string</code>  | 若设为 true，该通知将成为一组通知的摘要。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()` 并传入该值。仅在 Android 平台且使用 `group` 参数时可用。                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 若设为 true，通知将无法被滑动清除。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()` 并传入该值。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 若设为 true，用户点击通知时会自动取消该通知。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()` 并传入该值。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 为“大文本”样式通知设置多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于在收件箱和大文本通知样式中设置摘要文本详情。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID（即不带扩展名的文件名）。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 为通知设置大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID（即不带扩展名的文件名）。仅在 Android 平台可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定通知应投递到的渠道。如果给定名称的渠道不存在，则通知不会触发。如果未提供，将使用默认渠道。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()` 并传入该值。仅在 Android 26+ 版本可用。                                                                                                                                                                                                                                                                                                             | 1.0.0 |#### CapacitorGeolocation

获取设备位置信息。

| 属性                     | 类型                                                                                   | 说明                          | 始于 |
| ------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------ | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备上次已知的位置 | 1.0.0 |


#### GetCurrentPositionResult

| 属性                   | 类型                        | 说明                                                                                                           | 始于 |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| **`latitude`**         | <code>number</code>         | 以十进制度数表示的纬度                                                                                           | 1.0.0 |
| **`longitude`**        | <code>number</code>         | 以十进制度数表示的经度                                                                                          | 1.0.0 |
| **`accuracy`**         | <code>number</code>         | 经纬度坐标的精度，单位为米                                                    | 1.0.0 |
| **`altitude`**         | <code>number \| null</code> | 用户所在的海拔高度（如果可用）                                                                            | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔高度的精度，单位为米（如果可用）。在所有 iOS 版本和 Android 8.0+ 上可用。 | 1.0.0 |
| **`speed`**            | <code>number \| null</code> | 用户的移动速度（如果可用）                                                                        | 1.0.0 |
| **`heading`**          | <code>number \| null</code> | 用户面向的方位（如果可用）                                                                         | 1.0.0 |


#### CapcacitorWatch

与配对本应用的智能手表交互

sendMessage、transferUserInfo 和 updateApplicationContext 是通向 WCSession 委托方法的原始路径，但目前对 CapactiorWatch 手表应用没有效果。
如果为 Capacitor 应用开发了配套的原生手表应用，则可以使用这些方法。

| 属性                           | 类型                                                                     | 说明                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 使用 WCSession 委托方法 sendMessage() 向手表发送消息。这对 CapacitorWatch 手表应用没有效果                              |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 使用 WCSession 委托方法 transferUserInfo() 向手表发送信息。这对 CapacitorWatch 手表应用没有效果                       |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 使用 WCSession 委托方法 updateApplicationContext() 更新手表上的应用上下文。这对 CapacitorWatch 手表应用没有效果 |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查配套手表是否可达                                                                                                            |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 将手表上的当前 UI 替换为此处指定的内容。                                                                                           |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新手表用于在文本和按钮字段中显示变量的数据                                                                          |


</capacitor-api-docs>