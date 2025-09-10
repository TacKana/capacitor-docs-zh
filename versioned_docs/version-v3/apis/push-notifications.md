---
title: 推送通知 Capacitor 插件 API
description: 推送通知 API 提供对原生推送通知的访问。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts
sidebar_label: 推送通知
---

# @capacitor/push-notifications

推送通知 API 提供对原生推送通知的访问。

## 安装

```bash
npm install @capacitor/push-notifications
npx cap sync
```

## iOS

在 iOS 上，您必须启用推送通知功能。请参阅 [设置功能](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities) 了解如何启用该功能。

启用推送通知功能后，将以下内容添加到您的应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

## Android

推送通知 API 使用 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK 处理通知。请参阅 [在 Android 上设置 Firebase Cloud Messaging 客户端应用](https://firebase.google.com/docs/cloud-messaging/android/client) 并按照说明创建 Firebase 项目并注册您的应用。无需将 Firebase SDK 添加到您的应用或编辑应用清单——Push Notifications 插件已为您处理。您只需将 Firebase 项目的 `google-services.json` 文件添加到应用的模块（app 级）目录即可。

### 变量

此插件将使用以下项目变量（在您的应用 `variables.gradle` 文件中定义）：

- `$firebaseMessagingVersion`：`com.google.firebase:firebase-messaging` 的版本（默认：`21.0.1`）

---

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为白色像素加透明背景。由于应用图标通常不是这种样式，可能会显示为白色方块或圆形。因此，建议为推送通知单独提供图标。

Android Studio 提供了图标生成器，可用于创建推送通知图标。

## 前台推送通知显示效果

<docgen-config>

在 iOS 上，您可以配置应用在前台时推送通知的显示方式。

| 属性                      | 类型                              | 描述                                                                                                                                                                                                                  | 版本  |
| ------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`presentationOptions`** | <code>PresentationOption[]</code> | 这是一个字符串数组，可组合使用。数组中的可选值有：- `badge`：更新应用图标上的角标（默认值）- `sound`：收到推送通知时设备响铃/震动- `alert`：以原生对话框显示推送通知。如果不需要任何选项，可传递空数组。仅 iOS 可用。 | 1.0.0 |

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
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
```

</docgen-config>

## 静默推送通知 / 仅数据通知

#### iOS

该插件不支持 iOS 静默推送（远程通知）。建议使用原生代码方案处理此类通知，参见 [向您的应用推送后台更新](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app)。

#### Android

该插件支持仅数据通知，但如果应用已被杀死，将不会调用 `pushNotificationReceived`。如需处理此场景，您需要创建一个继承自 `FirebaseMessagingService` 的服务，参见 [处理 FCM 消息](https://firebase.google.com/docs/cloud-messaging/android/receive)。

## 常见问题

在 Android 上，系统和应用的不同状态可能影响推送通知的送达：

- 如果设备进入了 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到限制。为提高通知送达概率，可考虑使用 [FCM 高优先级消息](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message)。
- 开发环境与生产环境行为存在差异。请尝试在不通过 Android Studio 启动的情况下测试应用。详情请阅读 [这里](https://stackoverflow.com/a/50238790/1351469)。

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
    console.log('执行推送通知操作', notification.actionId, notification.inputValue);
  });
};

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('用户拒绝了权限！');
  }

  await PushNotifications.register();
};

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('已送达通知', notificationList);
};
```

## API

<docgen-index>

- [`register()`](#register)
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

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。

此方法将触发 `'registration'` 事件并返回推送令牌，或在出现问题时触发 `'registrationError'`。不会弹出权限请求，请先使用 `requestPermissions()`。

**自版本:** 1.0.0

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取当前在通知栏可见的通知列表。

**返回:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自版本:** 1.0.0

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知栏移除指定的通知。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自版本:** 1.0.0

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

移除通知栏中的所有通知。

**自版本:** 1.0.0

---

### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅在 Android O 或更高版本（SDK 26+）可用。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本:** 1.0.0

---

### deleteChannel(...)

```typescript
deleteChannel(channel: Channel) => Promise<void>
```

删除通知渠道。

仅在 Android O 或更高版本（SDK 26+）可用。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自版本:** 1.0.0

---

### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出可用的通知渠道。

仅在 Android O 或更高版本（SDK 26+）可用。

**返回:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收推送通知的权限。

在 Android 上，状态始终为 granted，因为总是可以接收推送通知。如果需要检查用户是否允许显示通知，请使用 local-notifications 插件。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收推送通知的权限。

在 Android 上不会弹出权限请求，因为总是可以接收推送通知。

在 iOS 上，首次调用会弹出推送通知权限请求，根据用户选择返回 granted 或 denied。后续调用将获取当前权限状态，不会再次弹窗。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### addListener('registration', ...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

推送通知注册成功时调用。

提供推送通知令牌。

| 参数               | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'registration'</code>                                 |
| **`listenerFunc`** | <code>(token: <a href="#token">Token</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### addListener('registrationError', ...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

推送通知注册失败时调用。

提供注册错误信息。

| 参数               | 类型                                 |
| ------------------ | ------------------------------------ |
| **`eventName`**    | <code>'registrationError'</code>     |
| **`listenerFunc`** | <code>(error: any) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### addListener('pushNotificationReceived', ...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

设备收到推送通知时调用。

| 参数               | 类型                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationReceived'</code>                                                              |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationschema">PushNotificationSchema</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### addListener('pushNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

在推送通知上执行操作时调用。

| 参数               | 类型                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'pushNotificationActionPerformed'</code>                                         |
| **`listenerFunc`** | <code>(notification: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有原生监听器。

**自版本:** 1.0.0

---

### 接口

#### DeliveredNotifications

| 属性                | 类型                                  | 描述                         | 版本  |
| ------------------- | ------------------------------------- | ---------------------------- | ----- |
| **`notifications`** | <code>PushNotificationSchema[]</code> | 当前在通知栏可见的通知列表。 | 1.0.0 |

#### PushNotificationSchema

| 属性               | 类型                 | 描述                                                                    | 版本  |
| ------------------ | -------------------- | ----------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code>  | 通知标题。                                                              | 1.0.0 |
| **`subtitle`**     | <code>string</code>  | 通知副标题。                                                            | 1.0.0 |
| **`body`**         | <code>string</code>  | 通知的主要文本内容。                                                    | 1.0.0 |
| **`id`**           | <code>string</code>  | 通知标识符。                                                            | 1.0.0 |
| **`badge`**        | <code>number</code>  | 应用图标角标显示的数字。                                                | 1.0.0 |
| **`notification`** | <code>any</code>     | 不会返回该字段。                                                        | 1.0.0 |
| **`data`**         | <code>any</code>     | 推送通知负载中包含的其他数据。                                          | 1.0.0 |
| **`click_action`** | <code>string</code>  | 用户打开通知时执行的操作，仅 Android 可用。                             | 1.0.0 |
| **`link`**         | <code>string</code>  | 通知中的深度链接，仅 Android 可用。                                     | 1.0.0 |
| **`group`**        | <code>string</code>  | 设置通知分组标识符，仅 Android 可用，类似于 iOS 的 `threadIdentifier`。 | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 将此通知设为关联 `group` 的摘要，仅 Android 可用。                      | 1.0.0 |

#### Channel

| 属性              | 类型                                              | 描述                                                                                                             | 版本  |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                     | 1.0.0 |
| **`name`**        | <code>string</code>                               | 该渠道的人类可读名称（展示给用户）。                                                                             | 1.0.0 |
| **`description`** | <code>string</code>                               | 该渠道的描述（展示给用户）。                                                                                     | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 该渠道通知应播放的声音。重要性至少为 `3` 的通知渠道应有声音。声音文件名应相对于 android app `res/raw` 目录指定。 | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 该渠道通知的打扰级别。                                                                                           | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 该渠道通知的可见性。用于设置通知是否显示在锁屏上，以及是否以脱敏形式显示。                                       | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 该渠道通知是否显示通知灯（设备支持时）。                                                                         | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 该渠道通知的灯光颜色，仅在启用灯光且设备支持时有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 该渠道通知是否震动。                                                                                             | 1.0.0 |

#### ListChannelsResult

| 属性           | 类型                   | 描述                     | 版本  |
| -------------- | ---------------------- | ------------------------ | ----- |
| **`channels`** | <code>Channel[]</code> | 应用创建的所有渠道列表。 | 1.0.0 |

#### PermissionStatus

| 属性          | 类型                                                        | 描述                 | 版本  |
| ------------- | ----------------------------------------------------------- | -------------------- | ----- |
| **`receive`** | <code><a href="#permissionstate">PermissionState</a></code> | 接收通知的权限状态。 | 1.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### Token

| 属性        | 类型                | 描述                                    | 版本  |
| ----------- | ------------------- | --------------------------------------- | ----- |
| **`value`** | <code>string</code> | iOS 为 APNS 令牌，Android 为 FCM 令牌。 | 1.0.0 |

#### ActionPerformed

| 属性               | 类型                                                                      | 描述                              | 版本  |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                       | 在通知上执行的操作。              | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                       | 通知操作输入的文本，仅 iOS 可用。 | 1.0.0 |
| **`notification`** | <code><a href="#pushnotificationschema">PushNotificationSchema</a></code> | 执行操作的通知。                  | 1.0.0 |

### 类型别名

#### Importance

重要性级别。详情参见 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>

#### Visibility

通知可见性。详情参见 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
