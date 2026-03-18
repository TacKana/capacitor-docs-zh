---
title: Push Notifications Capacitor Plugin API
description: Push Notifications API 提供了访问原生推送通知的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/src/definitions.ts
sidebar_label: Push Notifications
---

# @capacitor/push-notifications

Push Notifications API 提供了访问原生推送通知的能力。

## 安装

```bash
npm install @capacitor/push-notifications@latest-5
npx cap sync
```

## iOS

在 iOS 上，你必须启用 Push Notifications 功能。请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities) 了解如何启用该功能的说明。

启用 Push Notifications 功能后，将以下代码添加到你的应用程序的 `AppDelegate.swift` 中：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照说明创建 Firebase 项目并注册你的应用程序。你无需将 Firebase SDK 添加到你的应用程序或编辑应用清单——Push Notifications 插件已为你提供这些。唯一需要的是将你的 Firebase 项目的 `google-services.json` 文件添加到应用程序的模块（应用级）目录中。

当目标 SDK 版本为 33 时，Android 13 需要进行权限检查才能接收推送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

### 变量

此插件将使用以下项目变量（在你的应用程序的 `variables.gradle` 文件中定义）：

- `firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认值：`23.1.2`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用程序图标，但推送图标应为透明背景上的白色像素。由于应用程序图标通常不是这样的，它会显示一个白色方块或圆圈。因此，建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，你可以用它来创建推送通知图标。

## 推送通知通道

从 Android 8.0（API 级别 26）及更高版本开始，支持并推荐使用通知通道。SDK 将按以下顺序为传入的推送通知派生 `channelId`：

1.  **首先，它将检查传入的通知是否设置了 `channelId`。**
    无论是通过 FCM 控制台还是通过其 API 发送推送通知，都可以指定一个 `channelId`。
2.  **然后，它将检查 `AndroidManifest.xml` 中可能给定的值。**
    如果你希望创建并使用自己的默认通道，请将 `default_notification_channel_id` 设置为你的通知通道对象的 ID，如下所示；每当传入消息未明确设置通知通道时，FCM 将使用此值。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3.  **最后，它将使用 Firebase SDK 为我们提供的备用 `channelId`。**
    FCM 提供了一个具有基本设置的默认通知通道。该通道将在 Firebase SDK 收到第一条推送消息时创建。

> **警告**
> 当使用选项 1 或 2 时，你仍然需要创建一个通知通道，其 ID 与所选选项中使用的 ID 匹配。你可以使用 [`createChannel(...)`](#createchannel) 来实现这一点。如果你不这样做，SDK 将回退到选项 3。

## 应用在前台时的推送通知显示

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

你可以配置应用处于前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                          | 始于 |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中的可能值有： - `badge`：应用图标上的标记计数会更新（默认值） - `sound`：收到推送通知时设备会响铃/振动 - `alert`：推送通知以原生对话框形式显示 如果不需要任何选项，可以提供空数组。badge 仅适用于 iOS。 | 1.0.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/push-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
```

</docgen-config>

## 静默推送通知 / 纯数据通知
#### iOS
此插件不支持 iOS 静默推送（远程通知）。我们建议使用原生代码解决方案来处理此类通知，请参阅 [向你的应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
此插件确实支持纯数据通知，但如果应用程序已被杀死，将**不会**调用 `pushNotificationReceived`。要处理这种情况，你需要创建一个继承自 `FirebaseMessagingService` 的服务，请参阅 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。## 常见问题
在 Android 平台上，有多种系统和应用状态可能会影响推送通知的送达：

* 如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby)（休眠）模式，您的应用功能可能会受到限制。为了提高通知被接收的概率，请考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发环境和生产环境下的行为存在差异。请尝试在 Android Studio 启动之外的方式测试您的应用。了解更多信息请阅读[此处](https://stackoverflow.com/a/50238790/1351469)。

---

## 示例

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}
```

## API

<docgen-index>

* [`register()`](#register)
* [`unregister()`](#unregister)
* [`getDeliveredNotifications()`](#getdeliverednotifications)
* [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
* [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
* [`createChannel(...)`](#createchannel)
* [`deleteChannel(...)`](#deletechannel)
* [`listChannels()`](#listchannels)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`addListener('registration', ...)`](#addlistenerregistration-)
* [`addListener('registrationError', ...)`](#addlistenerregistrationerror-)
* [`addListener('pushNotificationReceived', ...)`](#addlistenerpushnotificationreceived-)
* [`addListener('pushNotificationActionPerformed', ...)`](#addlistenerpushnotificationactionperformed-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发 `'registration'` 事件并返回推送令牌，或在出现问题时触发 `'registrationError'` 事件。该方法不会向用户请求通知权限，请先使用 `requestPermissions()` 方法。

**自：** 1.0.0

--------------------


### unregister()

```typescript
unregister() => Promise<void>
```

取消应用对推送通知的注册。

在 Android 上会删除 Firebase 令牌，在 iOS 上会取消 APNS 注册。

**自：** 5.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数 | 类型 |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自：** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**自：** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅在 Android O 或更高版本（SDK 26+）上可用。

| 参数 | 类型 |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅在 Android O 或更高版本（SDK 26+）上可用。

| 参数 | 类型 |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**自：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅在 Android O 或更高版本（SDK 26+）上可用。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 12 及更低版本上，状态始终为已授予，因为您始终可以接收推送通知。如果您需要检查用户是否允许显示通知，请使用本地通知插件。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 12 及更低版本上，它不会提示权限请求，因为您始终可以接收推送通知。

在 iOS 上，首次使用此函数时，它会向用户请求推送通知权限，并根据用户的选择返回 granted（已授予）或 denied（已拒绝）。在后续调用中，它将获取当前权限状态而不会再次提示。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册顺利完成时调用。

提供推送通知令牌。

| 参数                 | 类型                                                        |
| -------------------- | ----------------------------------------------------------- |
| **`eventName`**      | <code>'registration'</code>                                 |
| **`listenerFunc`**   | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册过程中遇到问题时调用。

提供注册问题的错误信息。

| 参数                 | 类型                                                                                |
| -------------------- | ----------------------------------------------------------------------------------- |
| **`eventName`**      | <code>'registrationError'</code>                                                    |
| **`listenerFunc`**   | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当设备接收到推送通知时调用。

| 参数                 | 类型                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**      | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`**   | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当用户对推送通知执行了某个操作时调用。

| 参数                 | 类型                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| **`eventName`**      | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`**   | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自：** 1.0.0

--------------------


### 接口


#### DeliveredNotifications

| 属性                    | 类型                                  | 描述                                     | 自 |
| ----------------------- | ------------------------------------- | ---------------------------------------- | -- |
| **`notifications`**     | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。               | 1.0.0 |


#### PushNotificationSchema

| 属性                   | 类型                 | 描述                                                                                                                       | 自 |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | -- |
| **`title`**            | <code>string</code>  | 通知标题。                                                                                                                 | 1.0.0 |
| **`subtitle`**         | <code>string</code>  | 通知副标题。                                                                                                               | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知的主要文本内容。                                                                                                       | 1.0.0 |
| **`id`**               | <code>string</code>  | 通知标识符。                                                                                                               | 1.0.0 |
| **`tag`**              | <code>string</code>  | 通知标签。仅在 Android 上可用（来自推送通知）。                                                                           | 4.0.0 |
| **`badge`**            | <code>number</code>  | 应用图标角标上显示的数字。                                                                                                 | 1.0.0 |
| **`notification`**     | <code>any</code>     | 未返回此项。                                                                                                               | 1.0.0 |
| **`data`**             | <code>any</code>     | 包含在推送通知负载中的任何附加数据。                                                                                       | 1.0.0 |
| **`click_action`**     | <code>string</code>  | 用户打开通知时要执行的操作。仅在 Android 上可用。                                                                         | 1.0.0 |
| **`link`**             | <code>string</code>  | 通知中的深度链接。仅在 Android 上可用。                                                                                   | 1.0.0 |
| **`group`**            | <code>string</code>  | 设置用于通知分组的组标识符。仅在 Android 上可用。功能类似 iOS 上的 `threadIdentifier`。                                     | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code> | 将此通知指定为关联 `group` 的摘要。仅在 Android 上可用。                                                                   | 1.0.0 |#### Channel

| 属性名             | 类型                                              | 描述                                                                                                                                                                                                                                                          | 默认值           | 始于版本 |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| **`id`**           | <code>string</code>                               | 通道标识符。                                                                                                                                                                                                                                                  |                  | 1.0.0    |
| **`name`**         | <code>string</code>                               | 此通道的用户友好名称（展示给用户）。                                                                                                                                                                                                                          |                  | 1.0.0    |
| **`description`**  | <code>string</code>                               | 此通道的描述（展示给用户）。                                                                                                                                                                                                                                  |                  | 1.0.0    |
| **`sound`**        | <code>string</code>                               | 发送到该通道的通知应播放的声音。重要性级别（importance）至少为 `3` 的通知通道应设置声音。声音文件名应相对于 Android 应用的 `res/raw` 目录指定。                                                                                                               |                  | 1.0.0    |
| **`importance`**   | <code><a href="#importance">Importance</a></code> | 发送到该通道的通知的打断级别。                                                                                                                                                                                                                                | <code>`3`</code> | 1.0.0    |
| **`visibility`**   | <code><a href="#visibility">Visibility</a></code> | 发送到该通道的通知的可见性。此设置决定了发送到该通道的通知是否显示在锁屏界面上，以及如果显示，是否以脱敏形式呈现。                                                                                                                                            |                  | 1.0.0    |
| **`lights`**       | <code>boolean</code>                              | 发送到该通道的通知是否应显示指示灯（如果设备支持）。                                                                                                                                                                                                          |                  | 1.0.0    |
| **`lightColor`**   | <code>string</code>                               | 发送到该通道的通知的指示灯颜色。仅当此通道启用了指示灯功能且设备支持时才有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                      |                  | 1.0.0    |
| **`vibration`**    | <code>boolean</code>                              | 发送到该通道的通知是否应振动。                                                                                                                                                                                                                                |                  | 1.0.0    |


#### ListChannelsResult

| 属性名          | 类型                   | 描述                     | 始于版本 |
| --------------- | ---------------------- | ------------------------ | -------- |
| **`channels`**  | <code>Channel[]</code> | 您的应用创建的所有通道列表。 | 1.0.0    |


#### PermissionStatus

| 属性名          | 类型                                                        | 描述                   | 始于版本 |
| --------------- | ----------------------------------------------------------- | ---------------------- | -------- |
| **`receive`**   | <code><a href="#permissionstate">PermissionState</a></code> | 接收通知的权限状态。   | 1.0.0    |


#### PluginListenerHandle

| 属性名         | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### Token

| 属性名        | 类型                | 描述                                                               | 始于版本 |
| ------------- | ------------------- | ------------------------------------------------------------------ | -------- |
| **`value`**   | <code>string</code> | 在 iOS 上包含 APNS 令牌，在 Android 上包含 FCM 令牌。              | 1.0.0    |


#### RegistrationError

| 属性名        | 类型                | 描述                             | 始于版本 |
| ------------- | ------------------- | -------------------------------- | -------- |
| **`error`**   | <code>string</code> | 描述注册失败原因的错误消息。     | 4.0.0    |


#### ActionPerformed

| 属性名               | 类型                                                                      | 描述                                     | 始于版本 |
| -------------------- | ------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| **`actionId`**       | <code>string</code>                                                       | 在通知上执行的操作 ID。                  | 1.0.0    |
| **`inputValue`**     | <code>string</code>                                                       | 在通知操作中输入的值。仅 iOS 可用。      | 1.0.0    |
| **`notification`**   | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code> | 执行了操作的通知对象。                   | 1.0.0    |


### 类型别名


#### Importance

重要性级别。更多详情，请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。更多详情，请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>