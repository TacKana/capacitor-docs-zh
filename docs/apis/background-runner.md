---
title: 后台运行器 Capacitor 插件 API
description: Capacitor 后台运行器
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 后台运行器
---

# @capacitor/background-runner

后台运行器提供了一个基于事件的独立 JavaScript 环境，用于在 WebView 之外执行您的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

后台运行器支持多种设备 API，这些 API 在使用前需要用户授权。

## iOS

在 iOS 上，您必须启用后台模式能力。

![在 Xcode 中启用后台模式能力](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，您至少需要启用 `Background fetch` 和 `Background processing` 模式，以便能够注册和调度后台任务。

如果您将使用地理位置或推送通知，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

启用后台模式能力后，将以下内容添加到您的应用程序的 `AppDelegate.swift` 中：

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

为了让后台运行器处理远程通知，添加以下内容：

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

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解更多关于在 Xcode 中设置 iOS 权限的信息。

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

如果您是从 1.0.5 版本升级现有的 Android 项目，请确保删除 `android/src/main/libs` 中的 `android-js-engine-release.aar`。

### 地理位置

此 API 要求将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<!-- 地理位置 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据，包括精确和粗略位置，最后一行是可选的，但如果您的应用 _需要_ GPS 才能运行，则是必需的。您可以省略它，但请注意，这可能导致您的应用安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授权。

从 Android 12 开始，除非在您的 `AndroidManifest.xml` 中添加此权限，否则定时通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在该权限，用户仍可以从应用设置中禁用精确通知。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分，了解更多关于设置 Android 权限的信息。

## 关于后台运行器

在构建复杂应用程序的过程中，有时需要在应用程序不在前台时执行工作。标准 Capacitor 应用程序的挑战在于，当这些后台事件发生时，WebView 不可用，需要您编写原生代码来处理这些事件。这就是后台运行器插件的用武之地。

后台运行器使编写 JavaScript 代码来处理原生后台事件变得容易。您只需要创建运行器 JavaScript 文件并 [定义您的配置](#configuring-background-runner)，然后后台运行器插件将自动配置和调度一个原生后台任务，该任务将根据您的配置和平台规则执行。无需修改您的 UI 代码。

## 使用后台运行器

后台运行器包含一个无头 JavaScript 环境，该环境调用您在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果运行器在您的运行器文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 后关闭（或者如果操作系统强制终止您的进程）。

#### 示例运行器 JS 文件

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在此处执行更新系统的操作');
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
        title: '企业后台运行器',
        body: '收到静默推送通知',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在运行器调用的每个事件处理程序中，调用 `resolve()` \ `reject()` 是 **必需的**。未能这样做可能会导致您的运行器在应用程序处于后台时被操作系统杀死。如果应用程序处于前台，对 `dispatchEvent` 的异步调用可能无法解析。

有关使用后台运行器的更多实际示例，请查看 [后台运行器测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置后台运行器

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

加载时，后台运行器将自动注册一个后台任务，该任务将在您的应用程序进入后台时被调度和执行。

| 属性            | 类型                 | 描述                                                                                                      | 始于  |
| --------------- | -------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**     | <code>string</code>  | 运行器的名称，用于日志记录。                                                                              | 1.0.0 |
| **`src`**       | <code>string</code>  | 运行器 JavaScript 文件的路径，相对于应用程序包。                                                          | 1.0.0 |
| **`event`**     | <code>string</code>  | 当操作系统执行后台任务时将调用的事件的名称。                                                              | 1.0.0 |
| **`repeat`**    | <code>boolean</code> | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                      | 1.0.0 |
| **`interval`**  | <code>number</code>  | 应用程序进入后台后，后台任务应开始执行的分钟数。如果 `repeat` 为 true，则此值也指定每次执行之间的分钟数。 | 1.0.0 |
| **`autoStart`** | <code>boolean</code> | 在应用程序加载时自动注册和调度后台任务。                                                                  | 1.0.0 |

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
      label: 'com.example.background.task',
      src: 'runners/background.js',
      event: 'myCustomEvent',
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

后台运行器不在浏览器或 WebView 中执行您的 JavaScript 代码，因此您可能习惯的典型 Web API 可能不可用。这包括 DOM API 以及与应用程序 DOM 交互的能力。

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
  - 在选项对象中仅支持 `method`、`headers` 和 `body`

除了标准的 Web API，后台运行器还支持许多 [自定义 Capacitor API](#capacitor-api)，这些自定义 API 公开了相关的移动设备功能。

## 运行器生命周期

目前，运行器设计用于在应用程序处于后台时执行周期性工作，或在应用程序处于前台时在与 UI 分离的线程中执行异步工作。因此，运行器不是长期存活的。运行器中的事件调用之间不维护状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文来加载和执行您的运行器代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供内置的电池优化设置，这些设置超出了标准 Android 的功能。其中一些优化必须由您的最终用户禁用，以便您的后台任务正常工作。

访问 [Don't kill my app!](https://dontkillmyapp.com) 了解更多关于受影响的制造商以及您的用户调整设置所需步骤的信息。

## 后台任务的限制

在移动操作系统上运行持久、始终运行的后台服务是不可能的。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制，后台任务受到各种限制，您在设计和实现后台任务时必须牢记这些限制。

### iOS

- 您的任务的每次调用最多有大约 30 秒的运行时间，之后您必须调用 `completed()`，否则您的任务将被杀死。
- 虽然您可以设置一个间隔来定义应用程序进入后台后任务运行的时间，或者它应该运行的频率，但这并不能保证。iOS 将根据您使用应用程序的频率等因素，最终决定您的任务运行的时间和频率。
- 后台任务在模拟器中不执行。

### Android

- 您的任务最多有 10 分钟的时间来执行工作，但为了保持您的任务跨平台兼容，您应该将您的工作限制在最多 30 秒。
- 重复后台任务的最小间隔至少为 15 分钟。与 iOS 类似，您请求的任何间隔可能无法精确达到 - 实际执行时间受操作系统电池优化和其他启发式方法的影响。

## API

<docgen-index>

- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions(...)`](#requestpermissions)
- [`dispatchEvent(...)`](#dispatchevent)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回：** <code>any</code>

**始于：** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回：** <code>any</code>

**始于：** 1.0.0

---

### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向配置的运行器分发事件。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回：** <code>any</code>

**始于：** 1.0.0

---

### Interfaces

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

| 属性          | 类型                                 | 描述                     | 始于  |
| ------------- | ------------------------------------ | ------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要分发事件到的运行器标签 | 1.0.0 |
| **`event`**   | <code>string</code>                  | 注册的事件监听器的名称。 | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                          |       |

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

| 属性                   | 类型                                                             | 描述                     | 始于  |
| ---------------------- | ---------------------------------------------------------------- | ------------------------ | ----- |
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

一个简单的字符串键/值存储，由 iOS 上的 UserDefaults 和 Android 上的 Shared Preferences 支持。

| 属性         | 类型                                                 | 描述                     | 始于  |
| ------------ | ---------------------------------------------------- | ------------------------ | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定键设置字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。   | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键的值。         | 1.0.0 |

#### CapacitorNotifications

发送基本的本地通知。

| 属性             | 类型                                                                                                | 描述                 | 始于  |
| ---------------- | --------------------------------------------------------------------------------------------------- | -------------------- | ----- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 调度本地通知         | 1.0.0 |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用程序徽章计数 | 2.0.0 |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用程序徽章计数 | 2.0.0 |

#### NotificationScheduleOptions

| 属性                   | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                              | 始于  |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上，它是一个 32 位整数。因此，值应在 -2147483648 和 2147483647 之间（包含）。                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`title`**            | <code>string</code>  | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期。                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`sound`**            | <code>string</code>  | 显示此通知时播放的音频文件名。包含文件扩展名。在 iOS 上，文件应在应用程序包中。在 Android 上，文件应在 res/raw 文件夹中。推荐的格式是 `.wav`，因为它受 iOS 和 Android 支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，使用配置了所需声音的 channelId。如果找不到声音文件（例如空字符串或错误名称），将使用默认系统通知声音。如果未提供，在 Android 上会产生默认声音，在 iOS 上则无声音。 | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>  | 与此通知关联的操作类型。                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>  | 用于分组多个通知。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                         | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到类别摘要格式字符串中的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                  | 1.0.0 |
| **`group`**            | <code>string</code>  | 用于分组多个通知。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                     | 1.0.0 |
| **`groupSummary`**     | <code>string</code>  | 如果为 true，此通知将成为一组通知的摘要。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroupSummary()`。仅在使用 `group` 时适用于 Android。                                                                                                                                                      | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果为 true，通知无法被滑走。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                        | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果为 true，当用户点击通知时，通知会被取消。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                     | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置在大文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于在收件箱和大文本通知样式中设置摘要文本详细信息。仅适用于 Android。                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置，此选项将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放在应用程序的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                             | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 设置通知的大图标。图标应放在应用程序的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                             | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定通知应传递到的频道。如果具有给定名称的频道不存在，则通知不会触发。如果未提供，将使用默认频道。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setChannelId()`。仅适用于 Android 26+。                                                                                                             | 1.0.0 |

#### NotificationBadgeOptions

| 属性                       | 类型                | 描述                                                 | 始于  |
| -------------------------- | ------------------- | ---------------------------------------------------- | ----- |
| **`count`**                | <code>number</code> | 要在应用程序徽章上设置的数字。                       | 2.0.0 |
| **`notificationTitle`**    | <code>string</code> | 关联徽章计数通知的 **必需** 标题。仅适用于 Android。 | 2.0.0 |
| **`notificationSubtitle`** | <code>string</code> | 关联徽章计数通知的副标题。仅适用于 Android。         | 2.0.0 |

#### CapacitorGeolocation

获取设备位置信息。

| 属性                     | 类型                                                                                   | 描述                   | 始于  |
| ------------------------ | -------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备最后已知的位置 | 1.0.0 |

#### GetCurrentPositionResult

| 属性                   | 类型                        | 描述                                                                           | 始于  |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------ | ----- |
| **`latitude`**         | <code>number</code>         | 十进制度的纬度                                                                 | 1.0.0 |
| **`longitude`**        | <code>number</code>         | 十进制度的经度                                                                 | 1.0.0 |
| **`accuracy`**         | <code>number</code>         | 经纬度坐标的精度级别，以米为单位                                               | 1.0.0 |
| **`altitude`**         | <code>number \| null</code> | 用户所在的海拔高度（如果可用）                                                 | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔坐标的精度级别，以米为单位，如果可用。适用于所有 iOS 版本和 Android 8.0+。 | 1.0.0 |
| **`speed`**            | <code>number \| null</code> | 用户的移动速度（如果可用）                                                     | 1.0.0 |
| **`heading`**          | <code>number \| null</code> | 用户面对的方向（如果可用）                                                     | 1.0.0 |

#### CapacitorWatch

与此应用配对的 watch 交互

sendMessage、transferUserInfo 和 updateApplicationContext 是 WCSession 委托方法的原始路由，但在 <a href="#capacitorwatch">CapacitorWatch</a> Watch 应用程序中目前没有效果。
如果开发了本地 watch 应用作为 Capacitor 应用的伴侣应用，则可以使用它们。

| 属性                           | 类型                                                                     | 描述                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 使用 sendMessage() WCSession 委托方法向 watch 发送消息。这对 <a href="#capacitorwatch">CapacitorWatch</a> watch 应用没有影响                          |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 使用 transferUserInfo() WCSession 委托方法向 watch 发送信息。这对 <a href="#capacitorwatch">CapacitorWatch</a> watch 应用没有影响                     |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 使用 updateApplicationContext() WCSession 委托方法更新 watch 上的应用程序上下文。这对 <a href="#capacitorwatch">CapacitorWatch</a> watch 应用没有影响 |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查伴侣 watch 是否可达                                                                                                                               |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 使用此处指定的内容替换 watch 上的当前 UI。                                                                                                            |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新 watch 用于在文本和按钮字段中显示变量的数据                                                                                                       |

#### CapacitorApp

| 属性           | 类型                                                   |
| -------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |

#### AppState

| 属性           | 类型                 | 描述                       | 始于  |
| -------------- | -------------------- | -------------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用程序是否处于活动状态。 | 1.0.0 |

#### AppInfo

| 属性          | 类型                | 描述                                                                                           | 始于  |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用程序的名称。                                                                               | 1.0.0 |
| **`id`**      | <code>string</code> | 应用程序的标识符。在 iOS 上是 Bundle Identifier。在 Android 上是 Application ID                | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本。在 iOS 上是 CFBundleVersion。在 Android 上是 versionCode。                           | 1.0.0 |
| **`version`** | <code>string</code> | 应用程序版本。在 iOS 上是 CFBundleShortVersionString。在 Android 上是 package 的 versionName。 | 1.0.0 |

</capacitor-api-docs>
