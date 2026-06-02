---
title: Push Notifications - Capacitor 推送通知插件 API
description: 推送通知 API 提供对原生推送通知的访问。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/push-notifications/src/definitions.ts
sidebar_label: Push Notifications 推送通知
translated: true
---

# @capacitor/push-notifications

推送通知 API 提供对原生推送通知的访问。

## 安装

```bash
npm install @capacitor/push-notifications@latest-5
npx cap sync
```

## iOS

在 iOS 上，你必须启用推送通知功能。请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities) 了解如何启用该功能的说明。

启用推送通知功能后，将以下内容添加到你的应用的 `AppDelegate.swift`：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

推送通知 API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照说明创建 Firebase 项目并注册你的应用程序。无需将 Firebase SDK 添加到你的应用或编辑你的应用清单——推送通知插件已为你提供这些。只需将 Firebase 项目的 `google-services.json` 文件添加到你的应用的模块（应用级）目录中即可。

Android 13 需要权限检查才能接收推送通知。在针对 SDK 33 时，你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

### 变量

此插件将使用以下项目变量（定义在你的应用的 `variables.gradle` 文件中）：

- `firebaseMessagingVersion` 版本为 `com.google.firebase:firebase-messaging`（默认值：`23.1.2`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为透明背景上的白色像素。由于应用图标通常不是这样，它会显示一个白色方块或圆圈。因此建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，你可以用来创建推送通知图标。

## 推送通知频道

从 Android 8.0（API 级别 26）及更高版本开始，支持并建议使用通知频道。SDK 将按以下顺序为传入的推送通知派生 `channelId`：

1. **首先检查传入通知是否设置了 `channelId`。**
   当从 FCM 仪表板或通过其 API 发送推送通知时，可以指定 `channelId`。
2. **然后检查 `AndroidManifest.xml` 中是否有可能的给定值。**
   如果你更喜欢创建和使用自己的默认频道，请将 `default_notification_channel_id` 设置为你的通知频道对象的 ID，如下所示；当传入消息未显式设置通知频道时，FCM 将使用此值。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最后，它将使用 Firebase SDK 为我们提供的回退 `channelId`。**
   FCM 提供了一个具有基本设置的默认通知频道。该频道将在收到第一条推送消息时由 Firebase SDK 创建。

> **警告**
> 使用选项 1 或 2 时，你仍然需要在代码中创建一个与所选选项使用的 ID 匹配的通知频道。你可以使用 [`createChannel(...)`](#createchannel) 来实现。如果不这样做，SDK 将回退到选项 3。

## 前台时推送通知的外观

<docgen-config>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

你可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                          | 自从 |
| ------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中可能的值有：- `badge`：更新应用图标上的徽章计数（默认值）- `sound`：收到推送通知时设备会响铃/振动 - `alert`：推送通知在原生对话框中显示。如果不需要任何选项，可以提供空数组。badge 仅 iOS 可用。 | 1.0.0 |

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
此插件支持纯数据通知，但如果应用已被杀死，将**不会**调用 `pushNotificationReceived`。要处理此场景，你需要创建一个扩展 `FirebaseMessagingService` 的服务，请参阅 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题
在 Android 上，各种系统和应用状态可能会影响推送通知的投递：

* 如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，你的应用可能会受到功能限制。为了增加收到通知的几率，请考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发和生产之间存在行为差异。尝试在 Android Studio 启动之外测试你的应用。更多信息请阅读 [此处](https://stackoverflow.com/a/50238790/1351469)。

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
    console.log('推送通知操作已执行', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('用户拒绝了权限！');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('已投递的通知', notificationList);
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发 `'registration'` 事件（带有推送令牌）或
`'registrationError'`（如果出现问题）。它不会提示用户获取通知
权限，请先使用 `requestPermissions()`。

**自从:** 1.0.0

--------------------


### unregister()

```typescript
unregister() => Promise<void>
```

取消注册应用的推送通知。

这将在 Android 上删除 Firebase 令牌，并在 iOS 上取消注册 APNS。

**自从:** 5.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自从:** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自从:** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**自从:** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知频道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自从:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知频道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**自从:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知频道。

仅在 Android O 或更新版本（SDK 26+）上可用。

**返回:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 12 及以下版本，状态始终为已授权，因为你始终可以
接收推送通知。如果你需要检查用户是否允许
显示通知，请使用 local-notifications 插件。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 12 及以下版本，它不会提示权限，因为你始终可以
接收推送通知。

在 iOS 上，首次使用该函数时，它将提示用户
获取推送通知权限，并根据用户选择返回已授权或已拒绝。
在后续调用中，它将获取权限的当前状态而不再提示。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

推送通知注册成功完成时调用。

提供推送通知令牌。

| 参数              | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 1.0.0

--------------------


### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

推送通知注册出现问题完成时调用。

提供包含注册问题的错误。

| 参数              | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'registrationError'</code>                                                    |
| **`listenerFunc`** | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 1.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

设备收到推送通知时调用。

| 参数              | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

在推送通知上执行操作时调用。

| 参数              | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自从:** 1.0.0

--------------------


### 接口


#### DeliveredNotifications

| 属性                | 类型                                  | 描述                                                         | 自从 |
| ------------------- | ------------------------------------- | ------------------------------------------------------------ | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### PushNotificationSchema

| 属性               | 类型                 | 描述                                                                                                          | 自从 |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code>  | 通知标题。                                                                                              | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | 通知副标题。                                                                                           | 1.0.0 |
| **`body`**         | <code>string</code>  | 通知的主要文本负载。                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                                                         | 1.0.0 |
| **`tag`**          | <code>string</code>  | 通知标签。仅 Android 可用（来自推送通知）。                                           | 4.0.0 |
| **`badge`**        | <code>number</code>  | 应用图标徽章上显示的数字。                                                                        | 1.0.0 |
| **`notification`** | <code>any</code>     | 不返回此值。                                                                                             | 1.0.0 |
| **`data`**         | <code>any</code>     | 包含在推送通知负载中的任何附加数据。                                              | 1.0.0 |
| **`click_action`** | <code>string</code>  | 用户打开通知时要执行的操作。仅 Android 可用。                          | 1.0.0 |
| **`link`**         | <code>string</code>  | 来自通知的深层链接。仅 Android 可用。                                                          | 1.0.0 |
| **`group`**        | <code>string</code>  | 设置通知分组的组标识符。仅 Android 可用。类似于 iOS 上的 `threadIdentifier`。 | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 将此通知指定为关联 `group` 的摘要。仅 Android 可用。                     | 1.0.0 |


#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                | 默认值          | 自从 |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 频道标识符。                                                                                                                                                                                                                                    |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此频道的人类可读名称（向用户显示）。                                                                                                                                                                                                               |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此频道的描述（向用户显示）。                                                                                                                                                                                                                       |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 发布到此频道的通知应播放的声音。重要性至少为 `3` 的通知频道应有声音。声音文件的文件名应相对于 Android 应用 `res/raw` 目录指定。 |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此频道的通知的中断级别。                                                                                                                                                                                        | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 发布到此频道的通知的可见性。此设置用于控制发布到此频道的通知是否显示在锁屏上，以及是否以编辑形式显示。                                               |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 发布到此频道的通知是否应在支持它的设备上显示通知灯。                                                                                                                                               |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 发布到此频道的通知的灯光颜色。仅当此频道启用了灯光且设备支持时才支持。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                          |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 发布到此频道的通知是否应振动。                                                                                                                                                                                               |                  | 1.0.0 |


#### ListChannelsResult

| 属性           | 类型                   | 描述                                   | 自从 |
| -------------- | ---------------------- | -------------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 你的应用创建的所有频道的列表。 | 1.0.0 |


#### PermissionStatus

| 属性          | 类型                                                        | 描述                                  | 自从 |
| ------------- | ----------------------------------------------------------- | ------------------------------------- | ----- |
| **`receive`** | <code><a href="#permissionstate">PermissionState</a></code> | 接收通知的权限状态。 | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### Token

| 属性        | 类型                | 描述                                                              | 自从 |
| ----------- | ------------------- | ----------------------------------------------------------------- | ----- |
| **`value`** | <code>string</code> | 在 iOS 上包含 APNS 令牌。在 Android 上包含 FCM 令牌。 | 1.0.0 |


#### RegistrationError

| 属性        | 类型                | 描述                                        | 自从 |
| ----------- | ------------------- | ------------------------------------------- | ----- |
| **`error`** | <code>string</code> | 描述注册失败的错误消息。 | 4.0.0 |


#### ActionPerformed

| 属性               | 类型                                                                      | 描述                                                     | 自从 |
| ------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                       | 在通知上执行的操作。                       | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                       | 在通知操作上输入的文本。仅 iOS 可用。 | 1.0.0 |
| **`notification`** | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code> | 执行操作所在的通知。             | 1.0.0 |


### 类型别名


#### Importance

重要级别。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)。

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)。

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
