---
title: Push Notifications Capacitor 插件 API
description: Push Notifications API 提供了访问原生推送通知的能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: Push Notifications
---

# @capacitor/push-notifications

Push Notifications API 提供了访问原生推送通知的能力。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

在 iOS 上，你必须启用推送通知能力。关于如何启用该能力，请参阅 [设置能力](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)。

启用推送通知能力后，将以下代码添加到你的应用 `AppDelegate.swift` 中：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照说明创建 Firebase 项目并注册你的应用。无需将 Firebase SDK 添加到你的应用或编辑应用清单文件——Push Notifications 插件已为你提供。唯一需要的是将你 Firebase 项目的 `google-services.json` 文件添加到应用的模块（应用级）目录中。

### 变量

此插件将使用以下项目变量（定义在你应用的 `variables.gradle` 文件中）：

- `$firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认：`21.0.1`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应是透明背景上的白色像素。由于应用图标通常不是这样，它将显示一个白色方块或圆圈。因此，建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，你可以用来创建推送通知图标。

## 应用在前台时的推送通知显示方式

<docgen-config>

在 iOS 上，你可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 始于版本 |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中可能的值有： - `badge`：更新应用图标上的角标计数（默认值） - `sound`：收到推送通知时设备会响铃/振动 - `alert`：推送通知以原生对话框形式显示 如果不希望任何选项，可以提供一个空数组。仅适用于 iOS。 | 1.0.0    |

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
此插件不支持 iOS 静默推送（远程通知）。我们建议使用原生代码解决方案来处理这类通知，请参阅 [向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
此插件支持纯数据通知，但如果应用已被终止，则**不会**调用 `pushNotificationReceived`。要处理这种情况，你需要创建一个继承自 `FirebaseMessagingService` 的服务，请参阅 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题
在 Android 上，各种系统和应用状态可能会影响推送通知的送达：

* 如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，你的应用可能会受到能力限制。为了提高通知被接收的几率，请考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发环境和生产环境的行为存在差异。尝试在应用未被 Android Studio 启动的情况下进行测试。更多信息请阅读[此处](https://stackoverflow.com/a/50238790/1351469)。

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
  console.log('已送达的通知', notificationList);
}
```

## API

<docgen-index>

* [`register()`](#register)
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


### register()

```typescript
register() => Promise<void>
```

注册应用程序以接收推送通知。

此方法将触发携带推送令牌的 `'registration'` 事件，如果出现问题则触发 `'registrationError'`。它不会向用户请求通知权限，请先使用 `requestPermissions()`。

**自版本：** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取在通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕上移除指定的通知。

| 参数 | 类型 |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自版本：** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕上移除所有通知。

**自版本：** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数 | 类型 |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(channel: Channel) => Promise<void>
```

删除通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数 | 类型 |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 上，状态始终为已授予，因为您始终可以接收推送通知。如果您需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 上，它不会请求权限，因为您始终可以接收推送通知。

在 iOS 上，首次使用此函数时，它将提示用户授予推送通知权限，并根据用户选择返回已授予或已拒绝。在后续调用中，它将获取当前权限状态而不再提示。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册顺利完成时调用。

提供推送通知令牌。

| 参数 | 类型 |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本：** 1.0.0

--------------------

### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册完成并出现问题时调用。

提供注册问题的错误信息。

| 参数                  | 类型                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| **`eventName`**       | <code>'registrationError'</code>                                     |
| **`listenerFunc`**    | <code>(error: any) =&gt; void</code>                                 |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当设备收到推送通知时调用。

| 参数                  | 类型                                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**       | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`**    | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当对推送通知执行操作时调用。

| 参数                  | 类型                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| **`eventName`**       | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`**    | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件所有的原生监听器。

**自：** 1.0.0

--------------------


### 接口


#### DeliveredNotifications

| 属性                    | 类型                                  | 描述                                                               | 自 |
| ----------------------- | ------------------------------------- | ------------------------------------------------------------------ | ----- |
| **`notifications`**     | <code>PushNotificationSchema[]</code> | 在通知屏幕上可见的通知列表。                                       | 1.0.0 |


#### PushNotificationSchema

| 属性                    | 类型                 | 描述                                                                                               | 自 |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------- | ----- |
| **`title`**             | <code>string</code>  | 通知标题。                                                                                         | 1.0.0 |
| **`subtitle`**          | <code>string</code>  | 通知副标题。                                                                                       | 1.0.0 |
| **`body`**              | <code>string</code>  | 通知的主要文本内容。                                                                               | 1.0.0 |
| **`id`**                | <code>string</code>  | 通知标识符。                                                                                       | 1.0.0 |
| **`badge`**             | <code>number</code>  | 显示在应用图标角标上的数字。                                                                       | 1.0.0 |
| **`notification`**      | <code>any</code>     | 此属性未返回。                                                                                     | 1.0.0 |
| **`data`**              | <code>any</code>     | 推送通知负载中包含的任何附加数据。                                                                 | 1.0.0 |
| **`click_action`**      | <code>string</code>  | 用户打开通知时要执行的操作。仅在 Android 上可用。                                                  | 1.0.0 |
| **`link`**              | <code>string</code>  | 通知中的深度链接。仅在 Android 上可用。                                                            | 1.0.0 |
| **`group`**             | <code>string</code>  | 设置用于通知分组的组标识符。仅在 Android 上可用。功能类似于 iOS 上的 `threadIdentifier`。          | 1.0.0 |
| **`groupSummary`**      | <code>boolean</code> | 将此通知指定为关联 `group` 的摘要。仅在 Android 上可用。                                           | 1.0.0 |

#### 频道 {#channel}

| 属性                | 类型                                                                      | 说明                                                                                                                                                                                                                                                              | 起始版本 |
| ------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`id`**            | <code>string</code>                                                       | 频道标识符。                                                                                                                                                                                                                                                      | 1.0.0    |
| **`name`**          | <code>string</code>                                                       | 此频道的用户友好名称（展示给用户）。                                                                                                                                                                                                                              | 1.0.0    |
| **`description`**   | <code>string</code>                                                       | 此频道的描述信息（展示给用户）。                                                                                                                                                                                                                                  | 1.0.0    |
| **`sound`**         | <code>string</code>                                                       | 发送到此频道的通知应播放的声音。重要性级别至少为 `3` 的通知频道应设置声音。声音文件名应相对于 Android 应用的 `res/raw` 目录指定。                                                                                                                                 | 1.0.0    |
| **`importance`**    | <code><a href="#importance">Importance</a></code>                         | 发送到此频道的通知的中断级别。                                                                                                                                                                                                                                    | 1.0.0    |
| **`visibility`**    | <code><a href="#visibility">Visibility</a></code>                         | 发送到此频道的通知的可见性。此设置决定通知是否显示在锁屏界面上，以及是否以摘要形式显示。                                                                                                                                                                          | 1.0.0    |
| **`lights`**        | <code>boolean</code>                                                      | 在支持通知灯的设备上，发送到此频道的通知是否显示通知灯。                                                                                                                                                                                                          | 1.0.0    |
| **`lightColor`**    | <code>string</code>                                                       | 发送到此频道的通知的灯光颜色。仅在此频道启用通知灯且设备支持时才有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                                 | 1.0.0    |
| **`vibration`**     | <code>boolean</code>                                                      | 发送到此频道的通知是否振动。                                                                                                                                                                                                                                      | 1.0.0    |


#### 列出频道结果 {#listchannelsresult}

| 属性            | 类型                   | 说明                                           | 起始版本 |
| --------------- | ---------------------- | ---------------------------------------------- | -------- |
| **`channels`**  | <code>Channel[]</code> | 由你的应用创建的所有频道列表。                 | 1.0.0    |


#### 权限状态 {#permissionstatus}

| 属性            | 类型                                                              | 说明                       | 起始版本 |
| --------------- | ----------------------------------------------------------------- | -------------------------- | -------- |
| **`receive`**   | <code><a href="#permissionstate">PermissionState</a></code>       | 接收通知的权限状态。       | 1.0.0    |


#### 插件监听器句柄 {#pluginlistenerhandle}

| 属性            | 类型                                      |
| --------------- | ----------------------------------------- |
| **`remove`**    | <code>() =&gt; Promise&lt;void&gt;</code> |


#### 令牌 {#token}

| 属性            | 类型                | 说明                                                                   | 起始版本 |
| --------------- | ------------------- | ---------------------------------------------------------------------- | -------- |
| **`value`**     | <code>string</code> | 在 iOS 上包含 APNS 令牌。在 Android 上包含 FCM 令牌。                  | 1.0.0    |


#### 已执行操作 {#actionperformed}

| 属性                  | 类型                                                                          | 说明                                                     | 起始版本 |
| --------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- | -------- |
| **`actionId`**        | <code>string</code>                                                           | 在通知上执行的操作标识。                                 | 1.0.0    |
| **`inputValue`**      | <code>string</code>                                                           | 在通知操作中输入的文字。仅在 iOS 上可用。                | 1.0.0    |
| **`notification`**    | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code>     | 执行操作所在的通知。                                     | 1.0.0    |


### 类型别名


#### 重要性 {#importance}

重要性级别。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### 可见性 {#visibility}

通知可见性。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### 权限状态 {#permissionstate}

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>