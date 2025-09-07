---
title: Push Notifications Capacitor 插件 API
description: Push Notifications API 提供对原生推送通知的访问。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: Push Notifications
---

# @capacitor/push-notifications

Push Notifications API 提供对原生推送通知的访问。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

在 iOS 上，您必须启用推送通知功能。有关如何启用该功能的说明，请参阅[设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)。

启用推送通知功能后，将以下内容添加到您应用的 `AppDelegate.swift` 中：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅[在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client)，并按照说明创建 Firebase 项目并注册您的应用程序。无需将 Firebase SDK 添加到您的应用或编辑应用清单 - Push Notifications 插件已为您提供。唯一需要的是将您 Firebase 项目的 `google-services.json` 文件添加到应用的模块（应用级）目录中。

Android 13 需要进行权限检查才能接收推送通知。当目标 SDK 为 33 时，您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

从 Android 15 开始，用户可以在[私密空间](https://developer.android.com/about/versions/15/features#private-space)中安装应用。用户可以随时锁定其私密空间，这意味着推送通知在用户解锁之前不会显示。

无法检测应用是否安装在私密空间中。因此，如果您的应用显示任何关键通知，请告知用户避免将应用安装在私密空间中。

有关与私密空间相关的应用行为更改的更多信息，请参阅 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

### 变量

此插件将使用以下项目变量（在您应用的 `variables.gradle` 文件中定义）：

- `firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认值：`24.1.0`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为透明背景上的白色像素。由于应用图标通常不是这样，它将显示白色方块或圆形。因此，建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，您可以使用它来创建推送通知图标。

## 推送通知渠道

从 Android 8.0（API 级别 26）及更高版本开始，支持并推荐使用通知渠道。SDK 将按以下顺序为传入的推送通知派生 `channelId`：

1. **首先检查传入的通知是否设置了 `channelId`。**
   当从 FCM 仪表板或通过其 API 发送推送通知时，可以指定 `channelId`。
2. **然后检查 `AndroidManifest.xml` 中可能给定的值。**
   如果您希望创建和使用自己的默认渠道，请将 `default_notification_channel_id` 设置为通知渠道对象的 ID，如下所示；当传入消息未显式设置通知渠道时，FCM 将使用此值。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最后将使用 Firebase SDK 为我们提供的回退 `channelId`。**
   FCM 提供了一个具有基本设置的默认通知渠道。此渠道将在收到第一条推送消息时由 Firebase SDK 创建。

> **警告**
> 使用选项 1 或 2 时，您仍然需要在代码中创建一个通知渠道，其 ID 与所选选项中使用的 ID 匹配。您可以使用 [`createChannel(...)`](#createchannel) 来实现。如果不这样做，SDK 将回退到选项 3。

## 前台推送通知的外观

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

您可以配置应用处于前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                          | 自版本 |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中的可能值有： - `badge`：应用图标上的角标计数更新（默认值） - `sound`：收到推送通知时设备会响铃/振动 - `alert`：推送通知显示在原生对话框中 如果不需要任何选项，可以提供空数组。badge 仅适用于 iOS。 | 1.0.0 |

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

## 静默推送通知 / 仅数据通知
#### iOS
此插件不支持 iOS 静默推送（远程通知）。我们建议使用原生代码解决方案来处理这些类型的通知，请参阅[向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
此插件支持仅数据通知，但如果应用已被杀死，则不会调用 `pushNotificationReceived`。要处理此场景，您需要创建一个扩展 `FirebaseMessagingService` 的服务，请参阅[处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题
在 Android 上，有各种系统和应用状态可能影响推送通知的传递：

* 如果设备已进入[低电耗模式](https://developer.android.com/training/monitoring-device-state/doze-standby)，您的应用可能具有受限功能。为了增加通知被接收的机会，请考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发和生产环境之间存在行为差异。尝试在 Android Studio 启动之外测试您的应用。阅读更多[此处](https://stackoverflow.com/a/50238790/1351469)。

---

## 示例

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('注册令牌：', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('注册错误：', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('收到推送通知：', notification);
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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发带有推送令牌的 `'registration'` 事件，或在出现问题时触发 `'registrationError'`。它不会提示用户通知权限，请先使用 `requestPermissions()`。

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

**返回：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

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

从通知屏幕中移除所有通知。

**自版本：** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android O 或更新版本（SDK 26+）。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android O 或更新版本（SDK 26+）。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**自版本：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅适用于 Android O 或更新版本（SDK 26+）。

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 12 及以下版本上，状态始终为已授予，因为您始终可以接收推送通知。如果您需要检查用户是否允许显示通知，请使用本地通知插件。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 12 及以下版本上，它不会提示权限，因为您始终可以接收推送通知。

在 iOS 上，首次使用此功能时，它将提示用户推送通知权限，并根据用户选择返回已授予或已拒绝。在后续调用中，它将获取权限的当前状态而不再次提示。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle>
```

当推送通知注册完成且无问题时调用。

提供推送通知令牌。

| 参数              | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

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

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

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

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

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

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

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
| **`body`**         | <code>string</code>  | 通知的主要文本负载。                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                                                         | 1.0.0 |
| **`tag`**          | <code>string</code>  | 通知标签。仅适用于 Android（来自推送通知）。                                           | 4.0.0 |
| **`badge`**        | <code>number</code>  | 显示应用图标角标的数字。                                                                        | 1.0.0 |
| **`notification`** | <code>any</code>     | 未返回。                                                                                             | 1.0.0 |
| **`data`**         | <code>any</code>     | 包含在推送通知负载中的任何附加数据。                                              | 1.0.0 |
| **`click_action`** | <code>string</code>  | 用户打开通知时要执行的操作。仅适用于 Android。                          | 1.0.0 |
| **`link`**         | <code>string</code>  | 通知中的深层链接。仅适用于 Android。                                                          | 1.0.0 |
| **`group`**        | <code>string</code>  | 设置通知分组的组标识符。仅适用于 Android。功能类似于 iOS 上的 `threadIdentifier`。 | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 将此通知指定为相关 `group` 的摘要。仅适用于 Android。                     | 1.0.0 |


#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                | 默认值          | 自版本 |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                    |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此渠道的用户友好名称（向用户显示）。                                                                                                                                                                                           |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此渠道的描述（向用户显示）。                                                                                                                                                                                                   |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 应为此渠道发布的通知播放的声音。重要性至少为 `3` 的通知渠道应具有声音。声音文件的文件名应相对于 Android 应用 `res/raw` 目录指定。 |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 此渠道发布的通知的中断级别。                                                                                                                                                                                                                        | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 此渠道发布的通知的可见性。此设置用于确定发布到此渠道的通知是否出现在锁屏上，以及如果出现，是否以编辑形式出现。                                               |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 发布到此渠道的通知是否应显示通知灯（在支持的设备上）。                                                                                                                                               |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 此渠道发布的通知的灯光颜色。仅在此渠道启用灯光且设备支持时才受支持。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                          |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 发布到此渠道的通知是否振动。                                                                                                                                                                                               |                  | 1.0.0 |


#### ListChannelsResult

| 属性           | 类型                   | 描述                                   | 自版本 |
| -------------- | ---------------------- | --------------------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 您的应用创建的所有渠道的列表。 | 1.0.0 |


#### PermissionStatus

| 属性          | 类型                                                        | 描述                                  | 自版本 |
| ------------- | ----------------------------------------------------------- | -------------------------------------------- | ----- |
| **`receive`** | <code><a href="#permissionstate">PermissionState</a></code> | 接收通知的权限状态。 | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### Token

| 属性        | 类型                | 描述                                                              | 自版本 |
| ----------- | ------------------- | ------------------------------------------------------------------------ | ----- |
| **`value`** | <code>string</code> | 在 iOS 上包含 APNS 令牌。在 Android 上包含 FCM 令牌。 | 1.0.0 |


#### RegistrationError

| 属性        | 类型                | 描述                                        | 自版本 |
| ----------- | ------------------- | -------------------------------------------------- | ----- |
| **`error`** | <code>string</code> | 描述注册失败的错误消息。 | 4.0.0 |


#### ActionPerformed

| 属性               | 类型                                                                      | 描述                                                     | 自版本 |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                       | 在通知上执行的操作。                       | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                       | 在通知操作上输入的文本。仅适用于 iOS。 | 1.0.0 |
| **`notification`** | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code> | 执行操作的通知。             | 1.0.0 |


### 类型别名


#### Importance

重要性级别。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>