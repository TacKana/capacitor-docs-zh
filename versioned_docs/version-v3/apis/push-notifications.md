---
title: Push Notifications Capacitor 插件 API
description: Push Notifications API 提供对原生推送通知的访问能力。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: 推送通知
---

# @capacitor/push-notifications

Push Notifications API 提供对原生推送通知的访问能力。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

在 iOS 上，您需要先启用推送通知能力。关于如何启用此功能，请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)。

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

推送通知 API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 来处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照指示创建 Firebase 项目并注册您的应用。您无需自行添加 Firebase SDK 或修改应用清单文件——推送通知插件已为您处理这些。唯一需要做的是将 Firebase 项目的 `google-services.json` 文件添加到应用的模块（应用级）目录中。

### 变量

本插件会使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认：`21.0.1`）

---

## 推送通知图标

在 Android 上，需要在 `AndroidManifest.xml` 文件中添加适当名称的推送通知图标：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为透明背景上的白色像素。由于应用图标通常不符合此要求，会显示为白色方块或圆形。因此建议为推送通知提供单独的图标。

Android Studio 提供了图标生成工具，可用于创建推送通知图标。

## 应用在前台时的推送通知显示

<docgen-config>

在 iOS 上，您可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                 | 起始版本 |
| ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可以组合的字符串数组。数组中可能的值包括：- `badge`：更新应用图标上的角标计数（默认值）- `sound`：收到推送通知时设备会响铃/振动- `alert`：推送通知以原生对话框形式显示如果不需要任何选项，可以提供一个空数组。仅适用于 iOS。 | 1.0.0 |

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
本插件不支持 iOS 静默推送（远程通知）。建议使用原生代码解决方案来处理此类通知，参见 [向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
本插件支持仅数据通知，但如果应用已被终止，将不会调用 `pushNotificationReceived`。要处理这种情况，您需要创建一个继承自 `FirebaseMessagingService` 的服务，参见 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。 

## 常见问题
在 Android 上，有多种系统和应用状态可能影响推送通知的送达：

* 如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到功能限制。为了提高通知接收的成功率，可以考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发环境和生产环境存在行为差异。尝试在 Android Studio 启动之外测试您的应用。了解更多信息 [此处](https://stackoverflow.com/a/50238790/1351469)。

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
    throw new Error('用户拒绝了权限!');
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

注册应用以接收推送通知。

此方法会触发带有推送令牌的 `'registration'` 事件，或在出现问题时触发 `'registrationError'`。它不会向用户请求通知权限，请先使用 `requestPermissions()`。

**起始版本:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**起始版本:** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**起始版本:** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**起始版本:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(channel: Channel) => Promise<void>
```

删除通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**起始版本:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

**返回:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 上状态始终为 granted，因为您始终可以接收推送通知。如果您需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 上不会请求权限，因为您始终可以接收推送通知。

在 iOS 上，首次使用此功能时会向用户请求推送通知权限，并根据用户选择返回 granted 或 denied。后续调用将获取当前权限状态而不再提示。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册顺利完成时调用。

提供推送通知令牌。

| 参数              | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本:** 1.0.0

--------------------


### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册遇到问题时调用。

提供注册问题的错误信息。

| 参数              | 类型                                 |
| ------------------ | ------------------------------------ |
| **`eventName`**    | <code>'registrationError'</code>     |
| **`listenerFunc`** | <code>(error: any) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本:** 1.0.0

--------------------


### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当设备收到推送通知时调用。

| 参数              | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本:** 1.0.0

--------------------


### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当对推送通知执行操作时调用。

| 参数              | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**起始版本:** 1.0.0

--------------------


### 接口


#### DeliveredNotifications

| 属性                | 类型                                  | 描述                                                         | 起始版本 |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### PushNotificationSchema

| 属性               | 类型                 | 描述                                                                                                          | 起始版本 |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code>  | 通知标题。                                                                                              | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | 通知副标题。                                                                                           | 1.0.0 |
| **`body`**         | <code>string</code>  | 通知的主要内容。                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                                                         | 1.0.0 |
| **`badge`**        | <code>number</code>  | 显示在应用图标角标上的数字。                                                                        | 1.0.0 |
| **`notification`** | <code>any</code>     | 不会返回此值。                                                                                             | 1.0.0 |
| **`data`**         | <code>any</code>     | 包含在推送通知负载中的任何附加数据。                                              | 1.0.0 |
| **`click_action`** | <code>string</code>  | 用户打开通知时要执行的操作。仅适用于 Android。                          | 1.0.0 |
| **`link`**         | <code>string</code>  | 通知中的深度链接。仅适用于 Android。                                                          | 1.0.0 |
| **`group`**        | <code>string</code>  | 设置通知分组的标识符。仅适用于 Android。功能类似于 iOS 的 `threadIdentifier`。 | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 将此通知指定为关联 `group` 的摘要。仅适用于 Android。                     | 1.0.0 |


#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                | 起始版本 |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                    | 1.0.0 |
| **`name`**        | <code>string</code>                               | 渠道的用户友好名称（展示给用户）。                                                                                                                                                                                           | 1.0.0 |
| **`description`** | <code>string</code>                               | 渠道的描述（展示给用户）。                                                                                                                                                                                                   | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 发布到此渠道的通知应播放的声音。重要性至少为 `3` 的通知渠道应具有声音。声音文件名应相对于安卓应用的 `res/raw` 目录指定。 | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此渠道的通知的中断级别。                                                                                                                                                                                        | 1.0.0 |
| **`visibility`**  | <code><a