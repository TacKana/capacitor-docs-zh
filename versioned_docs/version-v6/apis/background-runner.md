---
title: Background Runner Capacitor 插件 API
description: Capacitor 后台运行器
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
---

# @capacitor/background-runner

Background Runner 提供了一个基于事件的独立 JavaScript 运行环境，用于在 WebView 外部执行你的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner 支持多种需要用户授权后才能使用的设备 API。

## iOS

在 iOS 上你必须启用后台模式能力。

![在 Xcode 中启用后台模式能力](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后，你至少需要启用 `Background fetch` 和 `Background processing` 模式才能注册和调度后台任务。

如果你需要使用地理定位或推送通知功能，请分别启用 `Location updates` 或 `Remote notifications`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

启用后台模式能力后，在你的应用 `AppDelegate.swift` 中添加以下内容：

在文件顶部 `import Capacitor` 下方添加：
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

要让 Background Runner 处理远程通知，添加以下代码：

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

Apple 要求在地理位置信息使用前需在 `Info.plist` 中指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)

## Android

在 `android/app/build.gradle` 中添加以下行：

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

如果你是从 1.0.5 版本升级现有 Android 项目，请确保删除 `android/src/main/libs` 中的 `android-js-engine-release.aar`。

### 地理定位

此 API 需要将以下权限添加到你的 `AndroidManifest.xml`：

```xml
<!-- 地理定位 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取精确和粗略的位置数据，最后一行是可选的，但如果你的应用需要 GPS 功能则必须添加。你可以忽略它，但请记住这意味着你的应用可能安装在缺少 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示并直接返回已授权状态。

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加以下权限，否则计划通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

注意即使存在该权限，用户仍可以从应用设置中禁用精确通知。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/android)中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

## 关于 Background Runner
在构建复杂应用程序的过程中，有时需要在应用程序不在前台时执行工作。标准 Capacitor 应用程序的挑战在于，当这些后台事件发生时 WebView 不可用，需要编写原生代码来处理这些事件。这正是 Background Runner 插件的用武之地。

Background Runner 让你可以轻松编写 JavaScript 代码来处理原生后台事件。你只需要创建运行器 JavaScript 文件并 [定义配置](#configuring-background-runner)，Background Runner 插件就会自动配置和调度一个原生后台任务，该任务将根据你的配置和平台规则执行。无需修改你的 UI 代码。

## 使用 Background Runner

Background Runner 包含一个无头 JavaScript 环境，它调用你在 `capacitor.config.ts` 文件中指定的 JavaScript 文件中的事件处理程序。如果运行器在你的运行器文件中找到与传入事件对应的事件处理程序，它将执行该事件处理程序，然后在调用 `resolve()` 或 `reject()` 后关闭（或如果操作系统强制终止你的进程）。

#### 示例运行器 JS 文件

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

在每个由运行器调用的事件处理程序中必须调用 `resolve()` \ `reject()`。如果不这样做，可能会导致当你的事件在应用后台被调用时运行器被操作系统终止。如果应用在前台，对 `dispatchEvent` 的异步调用可能不会解析。

有关使用 Background Runner 的更多真实示例，请查看 [Background Runner 测试应用](https://github.com/ionic-team/background-runner-testapp)。

## 配置 Background Runner

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

加载时，Background Runner 会自动注册一个后台任务，该任务将在你的应用进入后台后调度并运行。

| 属性            | 类型                 | 描述                                                                                                                                                                                          | 版本 |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**     | <code>string</code>  | 运行器的名称，用于日志记录。                                                                                                                                                                | 1.0.0 |
| **`src`**       | <code>string</code>  | 运行器 JavaScript 文件的路径，相对于应用包。                                                                                                                                  | 1.0.0 |
| **`event`**     | <code>string</code>  | 当操作系统执行后台任务时将调用的事件名称。                                                                                                                  | 1.0.0 |
| **`repeat`**    | <code>boolean</code> | 后台任务是否应根据 `interval` 中设置的间隔重复执行。                                                                                                                            | 1.0.0 |
| **`interval`**  | <code>number</code>  | 应用进入后台后开始执行后台任务的分钟数。如果 `repeat` 为 true，这也指定每次执行之间的分钟数。 | 1.0.0 |
| **`autoStart`** | <code>boolean</code> | 是否在应用加载时自动注册和调度后台任务。                                                                                                                                     | 1.0.0 |

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

Background Runner 不是在浏览器或 WebView 中执行你的 JavaScript 代码，因此你可能熟悉的典型 Web API 可能不可用。这包括 DOM API 以及与应用程序 DOM 交互的能力。

以下是 Background Runner 中提供的可用 Web API 列表：

- [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  - 仅 `info`、`log`、`warn`、`error` 和 `debug` 可用
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
  - 仅 `decode` 可用
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  - 仅 `encode` 可用
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API EventTarget/addEventListener)
  - 不支持事件监听器选项和 `useCapture`
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - 尚不支持 Request 对象
  - 在 options 对象中仅支持 `method`、`headers` 和 `body`

除了标准 Web API 外，Background Runner 还支持一些 [自定义 Capacitor API](#capacitor-api)，这些自定义 API 暴露了相关的移动设备功能

## 运行器生命周期

目前，运行器设计用于在应用后台执行周期性工作，或在前台执行与 UI 分离的异步工作。因此，运行器的生命周期不长。运行器调用之间不保持状态。每次调用 `dispatchEvent()` 都会创建一个新的上下文来加载和执行你的运行器代码，一旦调用 `resolve()` 或 `reject()`，该上下文就会被销毁。

## Android 电池优化

一些 Android 厂商提供了超出原生 Android 的内置电池优化设置。其中一些优化必须由你的最终用户禁用才能使后台任务正常工作。

访问 [Don't kill my app!](https://dontkillmyapp.com) 了解更多关于受影响制造商的信息以及用户调整设置所需的步骤。

## 后台任务的限制

在移动操作系统上无法运行持续、始终运行的后台服务。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制，后台任务有各种限制，你在设计和实现后台任务时必须牢记这些限制。

### iOS

- 每次调用你的任务大约有最多 30 秒的运行时间，然后你必须调用 `completed()` 否则你的任务会被终止。
- 虽然你可以设置一个间隔来定义应用进入后台后任务运行的时间，或者它应该运行的频率，但这并不能保证。iOS 将最终决定你的任务何时以及多久运行一次，这部分取决于你应用的使用频率。
- 后台任务不会在模拟器中执行。

### Android

- 你的任务最多有 10 分钟的时间来执行工作，但为了保持跨平台兼容性，你应该将工作时间限制在最多 30 秒。
- 重复后台任务的最小间隔至少为 15 分钟。类似于 iOS，你请求的任何间隔可能不会精确命中 - 实际执行时间取决于操作系统电池优化和其他启发式方法。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回:** <code>any</code>

**版本:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数         | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回:** <code>any</code>

**版本:** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

将事件分派到配置的运行器。

| 参数         | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回:** <code>any</code>

**版本:** 1.0.0

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

| 属性          | 类型                                 | 描述                                | 版本 |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要分派事件的运行器标签  | 1.0.0 |
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

获取设备信息，如网络连接和电池状态。

| 属性                   | 类型                                                             | 描述                                    | 版本 |
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

| 属性         | 类型                                                 | 描述                            | 版本 |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定的键设置字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。  | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键的值。     | 1.0.0 |


#### CapacitorNotifications

发送基本的