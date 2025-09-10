---
title: Push Notifications Capacitor Plugin API
description: Push Notifications API 提供原生推送通知功能支持。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/src/definitions.ts
sidebar_label: 推送通知
---

# @capacitor/push-notifications

Push Notifications API 提供原生推送通知功能支持。

## 安装

```bash
npm install @capacitor/push-notifications@latest-5
npx cap sync
```

## iOS 配置

在 iOS 上需要启用 Push Notifications 功能。请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities) 了解如何启用该功能。

启用推送通知功能后，在应用的 `AppDelegate.swift` 中添加以下代码：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android 配置

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 处理通知。请参阅 [在 Android 上设置 FCM 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按指引创建 Firebase 项目和注册应用。无需手动添加 Firebase SDK 或修改应用清单文件 - Push Notifications 插件会自动处理。唯一需要的是将 Firebase 项目的 `google-services.json` 文件添加到应用模块（app-level）目录中。

Android 13 要求进行权限检查才能接收推送通知。当目标 SDK 为 33 时，需要相应调用 `checkPermissions()` 和 `requestPermissions()` 方法。

### 变量

本插件使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `firebaseMessagingVersion` - `com.google.firebase:firebase-messaging` 版本号（默认：`23.1.2`）

---

## 推送通知图标

在 Android 上，应将指定名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 会使用应用图标，但推送图标应该是透明背景上的白色像素图案。由于应用图标通常不符合这一要求，会显示为白色方块或圆形。因此建议为推送通知提供单独的图标。

Android Studio 提供了图标生成工具可用于创建推送通知图标。

## 推送通知渠道

从 Android 8.0（API 级别 26）开始支持并推荐使用通知渠道。SDK 会按以下顺序获取传入推送通知的 `channelId`：

1. **首先检查传入通知是否设置了 `channelId`**
   通过 FCM 控制台或 API 发送推送通知时，可以指定 `channelId`
2. **然后检查 `AndroidManifest.xml` 中可能给定的值**
   如果你想创建并使用自己的默认渠道，请设置 `default_notification_channel_id` 为通知渠道对象的 ID；当传入消息未明确设置通知渠道时，FCM 将使用此值

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最后使用 Firebase SDK 提供的备用 `channelId`**
   FCM 默认提供了一个基本设置的通知渠道。Firebase SDK 会在收到第一条推送消息时创建此渠道。

> **警告**
> 使用选项 1 或 2 时，仍需在代码中创建与所选选项 ID 匹配的通知渠道。可使用 [`createChannel(...)`](#createchannel) 方法实现。如果不这样做，SDK 将回退到选项 3。

## 应用在前台时的推送通知显示

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

您可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                      | 版本  |
| ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可组合的字符串数组。数组可能的值包括： - `badge`：更新应用图标上的角标计数（默认值） - `sound`：收到推送通知时设备会响铃/振动 - `alert`：以原生对话框形式显示推送通知 如果不需要任何选项，可以提供一个空数组。badge 仅 iOS 可用。 | 1.0.0 |

### 示例

在 `capacitor.config.json` 中:

```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

在 `capacitor.config.ts` 中:

```ts
/// <reference types="@capacitor/push-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
```

</docgen-config>

## 静默推送通知 / 纯数据通知

#### iOS

本插件不支持 iOS 静默推送（Remote Notifications）。我们建议使用原生代码解决方案处理这类通知，参见 [向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android

本插件支持纯数据通知，但如果应用已被杀死，将不会调用 `pushNotificationReceived`。要处理这种情况，需要创建一个继承 `FirebaseMessagingService` 的服务，参见 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题

在 Android 上，有多种系统和应用状态可能影响推送通知的送达：

- 如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受限。为提高通知接收率，可考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
- 开发环境和生产环境存在行为差异。建议在非 Android Studio 启动的情况下测试应用。更多信息参见 [这里](https://stackoverflow.com/a/50238790/1351469)。

---

## 示例

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', (token) => {
    console.info('注册令牌: ', token.value);
  });

  await PushNotifications.addListener('registrationError', (err) => {
    console.error('注册错误: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('收到推送通知: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('推送通知操作执行', notification.actionId, notification.inputValue);
  });
};

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('用户拒绝权限!');
  }

  await PushNotifications.register();
};

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('已送达的通知', notificationList);
};
```

## API

<docgen-index>

- [`register()`](#register)
- [`unregister()`](#unregister)
- [`getDeliveredNotifications()`](#getdeliverednotifications)
- [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
- [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions()`](#requestpermissions)
- [`addListener('registration', ...)`](#addlistenerregistration-)
- [`addListener('registrationError', ...)`](#addlistenerregistrationerror-)
- [`addListener('pushNotificationReceived', ...)`](#addlistenerpushnotificationreceived-)
- [`addListener('pushNotificationActionPerformed', ...)`](#addlistenerpushnotificationactionperformed-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发带有推送令牌的 `'registration'` 事件，或出现问题时触发 `'registrationError'`。它不会向用户请求通知权限，需先使用 `requestPermissions()` 方法。

**版本：** 1.0.0

---

### unregister()

```typescript
unregister() => Promise<void>
```

取消应用的推送通知注册。

在 Android 上会删除 Firebase 令牌，在 iOS 上会取消 APNS 注册。

**版本：** 5.0.0

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**版本：** 1.0.0

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕移除指定通知。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**版本：** 1.0.0

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

移除通知屏幕上的所有通知。

**版本：** 1.0.0

---

### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本：** 1.0.0

---

### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

| 参数       | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**版本：** 1.0.0

---

### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本：** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 12 及以下版本上，状态始终为 granted，因为总能接收推送通知。如果需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 12 及以下版本上不会提示权限，因为总能接收推送通知。

在 iOS 上，首次调用此函数时会提示用户推送通知权限，并根据用户选择返回 granted 或 denied。后续调用将获取当前权限状态而不再提示。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

---

### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册顺利完成时调用。

提供推送通知令牌。

| 参数               | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册遇到问题时调用。

提供注册问题的错误信息。

| 参数               | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'registrationError'</code>                                                    |
| **`listenerFunc`** | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 4.0.0

---

### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当设备收到推送通知时调用。

| 参数               | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当对推送通知执行操作时调用。

| 参数               | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件所有原生监听器。

**版本：** 1.0.0

---

### Interfaces

#### DeliveredNotifications

| 属性                | 类型                                  | 描述                       | 版本  |
| ------------------- | ------------------------------------- | -------------------------- | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |

#### PushNotificationSchema

| 属性               | 类型                | 描述                                        | 版本  |
| ------------------ | ------------------- | ------------------------------------------- | ----- |
| **`title`**        | <code>string</code> | 通知标题。                                  | 1.0.0 |
| **`subtitle`**     | <code>string</code> | 通知副标题。                                | 1.0.0 |
| **`body`**         | <code>string</code> | 通知主要内容。                              | 1.0.0 |
| **`id`**           | <code>string</code> | 通知标识符。                                | 1.0.0 |
| **`tag`**          | <code>string</code> | 通知标签。仅 Android 可用（来自推送通知）。 | 4.0.0 |
| **`badge`**        | <code>number</code> | 应用图标角标显示的数字。                    | 1.0.0 |
| **`notification`** | <code>any           |
