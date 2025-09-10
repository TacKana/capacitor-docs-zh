---
title: Push Notifications Capacitor Plugin API
description: Push Notifications API 提供对原生推送通知功能的访问。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: 推送通知
---

# @capacitor/push-notifications

Push Notifications API 提供对原生推送通知功能的访问。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS 配置

在 iOS 上需要先启用推送通知能力。请参阅[设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities)了解如何启用该能力。

启用推送通知能力后，在应用的 `AppDelegate.swift` 中添加以下代码：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android 配置

Push Notification API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 处理通知。请参考[在 Android 上设置 FCM 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client)，按照指南创建 Firebase 项目并注册应用。你不需要手动添加 Firebase SDK 或修改应用清单文件 - 推送通知插件已包含这些配置。唯一需要的是将 Firebase 项目的 `google-services.json` 文件添加到应用的模块（app-level）目录中。

### 变量配置

本插件会使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认值：`23.0.5`）

---

## 推送通知图标

在 Android 上，需要在 `AndroidManifest.xml` 文件中添加指定名称的推送通知图标：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果不指定图标，Android 会使用应用图标，但推送图标应该是透明背景上的白色像素图案。由于应用图标通常不符合这个要求，会显示为白色方块或圆形。因此建议为推送通知提供单独的图标。

Android Studio 提供了图标生成工具，可用于创建推送通知图标。

## 应用在前台时的通知显示

<docgen-config>

你可以配置应用在前台运行时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                                                                                                                                                                                          | 版本 |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个可组合的字符串数组。数组可能的值有：- `badge`：更新应用图标上的角标计数（默认值）- `sound`：收到推送通知时设备会响铃/振动- `alert`：推送通知会显示在原生对话框中可以提供一个空数组来表示不需要任何选项。badge 仅在 iOS 上可用。                                                                                                                                                          | 1.0.0 |

### 配置示例

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

## 静默推送通知/纯数据通知
#### iOS
本插件不支持 iOS 静默推送（远程通知）。建议使用原生代码方案处理这类通知，参考[向应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android
本插件支持纯数据通知，但如果应用已被杀死，将不会调用 `pushNotificationReceived`。要处理这种场景，你需要创建一个继承 `FirebaseMessagingService` 的服务，参考[处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题
在 Android 上，有多种系统和应用状态会影响推送通知的接收：

* 如果设备进入[省电模式](https://developer.android.com/training/monitoring-device-state/doze-standby)，你的应用可能会受到能力限制。为了提高通知接收率，可以考虑使用[FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
* 开发环境和生产环境存在行为差异。建议在非 Android Studio 启动的情况下测试应用。了解更多[详情](https://stackoverflow.com/a/50238790/1351469)。

---

## 使用示例

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
    throw new Error('用户拒绝权限!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('已送达通知', notificationList);
}
```

## API 文档

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
* [接口定义](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>

### register()

```typescript
register() => Promise<void>
```

注册应用接收推送通知。

此方法会触发携带推送令牌的 `'registration'` 事件，或在出现问题时触发 `'registrationError'` 事件。它不会向用户请求通知权限，需要先使用 `requestPermissions()` 方法。

**版本：** 1.0.0

--------------------

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**版本：** 1.0.0

--------------------

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**版本：** 1.0.0

--------------------

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

移除通知屏幕上的所有通知。

**版本：** 1.0.0

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

**版本：** 1.0.0

--------------------

### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | `{ id: string; }` |

**版本：** 1.0.0

--------------------

### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅在 Android O 或更新版本（SDK 26+）上可用。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本：** 1.0.0

--------------------

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 上状态始终为 granted，因为总能接收推送通知。如果需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

--------------------

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 上不会弹出权限请求，因为总能接收推送通知。

在 iOS 上，首次调用此函数时会向用户请求推送通知权限，并根据用户选择返回 granted 或 denied。后续调用将直接返回当前权限状态而不会再次请求。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

--------------------

### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册成功完成时触发。

提供推送通知令牌。

| 参数              | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

--------------------

### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当推送通知注册遇到问题时触发。

提供包含注册问题的错误信息。

| 参数              | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'registrationError'</code>                                                    |
| **`listenerFunc`** | <code>(error: <a href="#registrationerror">RegistrationError</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

--------------------

### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当设备收到推送通知时触发。

| 参数              | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

--------------------

### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

当对推送通知执行操作时触发。

| 参数              | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本：** 1.0.0

--------------------

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件所有的原生监听器。

**版本：** 1.0.0

--------------------

### 接口定义


#### DeliveredNotifications

| 属性                | 类型                                  | 描述                                                         | 版本 |
| ------------------- | ------------------------------------- | ----------------------------------------------------------- | ---- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 通知屏幕上可见的通知列表。                                  | 1.0.0 |


#### PushNotificationSchema

| 属性               | 类型                 | 描述                                                                                                          | 版本 |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------ | ---- |
| **`title`**        | <code>string</code>  | 通知标题。                                                                                                  | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | 通知副标题。                                                                                               | 1.0.0 |
| **`body`**         | <code>string</code>  | 通知的主要内容。                                                                                          | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                                                               | 1.0.0 |
| **`tag`**          | <code>string</code>  | 通知标签。仅在 Android 上可用（来自推送通知）。                                                            | 4.0.0 |
| **`badge`**        | <code>number</code>  | 显示在应用图标上的角标数字。                                                                              | 1.0.0 |
| **`notification`** | <code>any</code>     | 已不再返回此字段。                                                                                        | 1.0.0 |
| **`data`**         | <code>any</code>     | 推送通知负载中包含的额外数据。                                                                            | 1.0.0 |
| **`click_action`** | <code>string</code>  | 用户打开通知时要执行的操作。仅在 Android 上可用。                                                         | 1.0.0 |
| **`link`**         | <code>string</code>  | 通知中的深度链接。仅在 Android 上可用。                                                                   | 1.0.0 |
| **`group`**        | <code>string</code>  | 设置通知分组的标识符。仅在 Android 上可用。功能类似于 iOS 上的 `threadIdentifier`。                        | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 将此通知指定为关联 `group` 的摘要。仅在 Android 上可用。                                                   | 1.0.0 |


#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                | 默认值          | 版本 |
| ----------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                        |                 | 1.0.0 |
| **`name`**        | <code>string</code>                               | 渠道的用户友好名称（展示给用户）。                                                                                                                                                                                                                  |                 | 1.0.0 |
| **`description`** | <code>string</code>                               | 渠道的描述（展示给用户）。                                                                                                                                                                                                                          |                 | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 发布到此渠道的通知应播放的声音。重要性级别至少为 `3` 的通知渠道应该有声音。