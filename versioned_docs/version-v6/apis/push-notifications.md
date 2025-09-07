---
title: Push Notifications Capacitor Plugin API
description: Push Notifications API 提供了原生推送通知的接入能力。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/push-notifications/src/definitions.ts
sidebar_label: 推送通知
---

# @capacitor/push-notifications

Push Notifications API 提供了原生推送通知的接入能力。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

在 iOS 上，您需要启用推送通知功能。有关如何启用该功能的说明，请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)。

启用推送通知功能后，在应用的 `AppDelegate.swift` 中添加以下代码：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照创建 Firebase 项目和注册应用程序的说明进行操作。无需将 Firebase SDK 添加到应用或编辑应用清单 - Push Notifications 插件已经提供了这些功能。唯一需要的是将 Firebase 项目的 `google-services.json` 文件添加到应用的模块（应用级）目录中。

Android 13 需要权限检查才能接收推送通知。当目标 SDK 为 33 时，您需要相应调用 `checkPermissions()` 和 `requestPermissions()`。

### 变量

此插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `firebaseMessagingVersion` 版本为 `com.google.firebase:firebase-messaging`（默认：`23.3.1`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为透明背景上的白色像素。由于应用图标通常不符合此要求，因此会显示白色方块或圆形。因此，建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，可以用来创建推送通知图标。

## 推送通知通道

从 Android 8.0（API 级别 26）及更高版本开始，支持并推荐使用通知通道。SDK 将按照以下顺序为传入的推送通知派生 `channelId`：

1. **首先检查传入的通知是否设置了 `channelId`。**
   无论是通过 FCM 仪表板还是其 API 发送推送通知，都可以指定 `channelId`。
2. **然后检查 `AndroidManifest.xml` 中可能给定的值。**
   如果您希望创建并使用自己的默认通道，请将 `default_notification_channel_id` 设置为通知通道对象的 ID，如下所示；当传入消息未明确设置通知通道时，FCM 将使用此值。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最后它将使用 Firebase SDK 为我们提供的回退 `channelId`。**
   FCM 提供了一个具有基本设置的默认通知通道。此通道将在收到第一条推送消息时由 Firebase SDK 创建。

> **警告**
> 使用选项 1 或 2 时，您仍需要在代码中创建一个与所选选项中使用的 ID 匹配的通知通道。您可以使用 [`createChannel(...)`](#createchannel) 来实现这一点。如果不这样做，SDK 将回退到选项 3。

## 前台推送通知的外观

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

您可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                          | 自版本 |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中的可能值有： - `badge`：应用图标上的徽章计数更新（默认值） - `sound`：设备在收到推送通知时会响铃/振动 - `alert`：推送通知显示在原生对话框中 如果不希望使用任何选项，可以提供空数组。badge 仅适用于 iOS。 | 1.0.0 |

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
此插件不支持 iOS 静默推送（远程通知）。我们建议使用原生代码解决方案来处理这些类型的通知，请参阅 [向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
此插件支持纯数据通知，但如果应用已被终止，则不会调用 `pushNotificationReceived`。要处理这种情况，您需要创建一个继承 `FirebaseMessagingService` 的服务，请参阅 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。 

## 常见问题
在 Android 上，有多种系统和应用状态会影响推送通知的传递：

* 如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到限制。为了增加通知被接收的机会，请考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发和生产环境之间存在行为差异。尝试在 Android Studio 启动之外测试您的应用。更多信息请参阅 [此处](https://stackoverflow.com/a/50238790/1351469)。

---

## 示例

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('注册令牌: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('注册错误: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('收到推送通知: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('推送通知操作执行', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('用户拒绝权限！');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('已送达的通知', notificationList);
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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发带有推送令牌的 `'registration'` 事件，如果出现问题则触发 `'registrationError'`。它不会提示用户获取通知权限，请先使用 `requestPermissions()`。

**自版本：** 1.0.0

--------------------


### unregister()

```typescript
unregister() => Promise<void>
```

取消注册应用的推送通知。

这将删除 Android 上的 Firebase 令牌，并取消 iOS 上的 APNS 注册。

**自版本：** 5.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自版本：** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

移除通知屏幕上的所有通知。

**自版本：** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知通道。

仅适用于 Android O 或更高版本（SDK 26+）。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知通道。

仅适用于 Android O 或更高版本（SDK 26+）。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**自版本：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知通道。

仅适用于 Android O 或更高版本（SDK 26+）。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 12 及以下版本上，状态始终为已授予，因为您始终可以接收推送通知。如果您需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 12 及以下版本上，它不会提示权限，因为您始终可以接收推送通知。

在 iOS 上，第一次使用该功能时，它将提示用户获取推送通知权限，并根据用户选择返回已授予或已拒绝。在后续调用中，它将获取当前权限状态而不再次提示。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle>
```

当推送通知注册顺利完成时调用。

提供推送通知令牌。

| 参数              | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle>
```

当推送通知注册完成但出现问题时调用。

提供注册问题的错误信息。

| 参数              | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'registrationError'</code>                                                    |
| **`listenerFunc`** | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 4.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle>
```

当设备收到推送通知时调用。

| 参数              | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

当对推送通知执行操作时调用。

| 参数              | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自版本：** 1.0.0

--------------------


### 接口


#### DeliveredNotifications

| 属性                | 类型                                  | 描述                                                         | 自版本 |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### PushNotificationSchema

| 属性               | 类型                 | 描述                                                                                                          | 自版本 |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code>  | 通知标题。                                                                                              | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | 通知副标题。                                                                                           | 1.0.0 |
| **`body`**         | <code>string</code>  | 通知的主要文本内容。                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                                                         | 1.0.0 |
| **`tag`**          | <code>string</code>  | 通知标签。仅适用于 Android（来自推送通知）。                                           | 4.0.0 |
| **`badge`**        | <code>number</code>  | 应用图标徽章上显示的数字。                                                                        | 1.0.0 |
| **`notification`** | <code>any</code>     | 未返回。                                                                                             | 1.0.0 |
| **`data`**        