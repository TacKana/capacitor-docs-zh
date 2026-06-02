---
title: 推送通知
description: 推送通知 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/push-notifications
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 推送通知

推送通知 API 提供了注册设备以接收来自服务器的通知的方法，以及处理接收到的通知并对其做出响应的方法。相比之下，[本地通知](/apis/local-notifications.md) API 提供了离线本地通知安排和处理的手段。

## 启用推送通知功能

在 iOS 上，您必须在项目中启用推送通知功能才能使推送通知插件正常工作。为此，请转到应用项目的 `Capabilities` 部分，将 `Push Notifications` 按钮从 `OFF` 切换到 `ON` 位置。

此更改将为应用添加推送功能，并在项目中创建一个 entitlements 文件。

![启用推送通知功能](../../../static/img/v3/docs/ios/enable-push-capabilities.png)

在 Android 上，只需从 Firebase 控制台下载应用项目的 `google-services.json` 文件，并将其放置在 `projectName/android/app` 文件夹中。

## 推送通知图标

在 Android 上，应将具有适当名称的推送通知图标添加到 `AndroidManifest.xml` 文件中：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

如果未指定图标，Android 将使用应用图标，但推送图标应为透明背景上的白色像素。由于应用图标通常不是这样，它会显示一个白色方块或圆形。因此建议为推送通知提供单独的图标。

Android Studio 有一个图标生成器，您可以使用它来创建推送通知图标。

## 禁用推送通知插件

如果您在项目中未使用推送通知，则在将应用提交到 iTunes Connect 时，Apple 会向您发送一封邮件，指出由于 `Missing Push Notification Entitlement` 而存在问题。这是因为 Capacitor 包含了注册推送通知和获取 token 的代码。

Apple 发送该邮件只是为了确保您没有犯错误并忘记在应用中启用推送通知功能，但如果您不使用推送通知插件，可以安全地忽略它。

如果您不想收到该邮件，可以通过在项目的 Build Settings 部分中将 `USE_PUSH` 从 `Active Compilation Conditions` 中移除来禁用推送通知插件。

![禁用推送通知](../../../static/img/v3/docs/ios/disable-push-plugin.png)

## 前台推送通知的显示

在 iOS 上，您可以通过在 `capacitor.config.json` 中提供 `presentationOptions`（可组合的字符串数组）来配置应用在前台时推送通知的显示方式。

可能的值有：

- `badge`：应用图标上的角标计数被更新（默认值）
- `sound`：收到推送通知时设备会响铃/振动
- `alert`：推送通知显示在原生对话框中

如果不需要上述任何选项，可以提供一个空数组。`pushNotificationReceived` 事件仍将携带推送通知信息被触发。

```json
"plugins": {
  "PushNotifications": {
    "presentationOptions": ["badge", "sound", "alert"]
  }
}
```

- [`register()`](#register)
- [`requestPermission()`](#requestpermission)
- [`getDeliveredNotifications()`](#getdeliverednotifications)
- [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
- [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

## 示例指南

[在 Ionic Angular 应用中使用 Firebase 推送通知](/guides/push-notifications-firebase.md)

## API

### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。
将触发 registration 事件并返回推送 token，
如果出现问题则触发 registrationError。
不会提示用户授予通知权限，请先使用 requestPermission()。

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

在 iOS 上，提示用户允许显示通知
并返回权限是否已授予。
在 Android 上没有此类提示，因此直接返回已授予。

**返回：** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<PushNotificationDeliveredList>
```

返回通知屏幕上可见的通知。

**返回：** <code>Promise&lt;<a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a>&gt;</code>

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: PushNotificationDeliveredList) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数 | 类型 | 描述 |
| --------------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| **`delivered`** | <code><a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a></code> | 已投递的通知列表。 |

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

在 Android O 或更新版本（SDK 26+）上创建通知频道。

| 参数 | 类型 | 描述 |
| ------------- | ----------------------------------------------------------------- | ----------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | 要创建的频道。 |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

在 Android O 或更新版本（SDK 26+）上删除通知频道。

| 参数 | 类型 | 描述 |
| ------------- | ----------------------------------------------------------------- | ----------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | 要删除的频道。 |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

在 Android O 或更新版本（SDK 26+）上列出可用的通知频道。

**返回：** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: PushNotificationToken) => void) => PluginListenerHandle
```

推送通知注册成功完成时调用的事件。
提供推送通知 token。

| 参数 | 类型 | 描述 |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------- |
| **`eventName`**    | <code>"registration"</code>                                                                 | registration。 |
| **`listenerFunc`** | <code>(token: <a href="#pushnotificationtoken">PushNotificationToken</a>) =&gt; void</code> | 携带推送 token 的回调。 |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => PluginListenerHandle
```

推送通知注册出现问题完成时调用的事件。
提供带有注册问题的错误。

| 参数 | 类型 | 描述 |
| ------------------ | ------------------------------------ | ------------------------------------- |
| **`eventName`**    | <code>"registrationError"</code>     | registrationError。 |
| **`listenerFunc`** | <code>(error: any) =&gt; void</code> | 带有注册错误的回调。 |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotification) => void) => PluginListenerHandle
```

设备收到推送通知时调用的事件。

| 参数 | 类型 | 描述 |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`eventName`**    | <code>"pushNotificationReceived"</code>                                                  | pushNotificationReceived。 |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotification">PushNotification</a>) =&gt; void</code> | 带有接收到的通知的回调。 |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: PushNotificationActionPerformed) => void) => PluginListenerHandle
```

对推送通知执行操作时调用的事件。

| 参数 | 类型 | 描述 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **`eventName`**    | <code>"pushNotificationActionPerformed"</code>                                                                         | pushNotificationActionPerformed。 |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationactionperformed">PushNotificationActionPerformed</a>) =&gt; void</code> | 带有通知操作的回调。 |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器。

---

### 接口

#### NotificationPermissionResponse

| 属性 | 类型 |
| ------------- | -------------------- |
| **`granted`** | <code>boolean</code> |

#### PushNotificationDeliveredList

| 属性 | 类型 |
| ------------------- | ------------------------------- |
| **`notifications`** | <code>PushNotification[]</code> |

#### PushNotification

| 属性 | 类型 | 描述 |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **`title`**        | <code>string</code>  | |
| **`subtitle`**     | <code>string</code>  | |
| **`body`**         | <code>string</code>  | |
| **`id`**           | <code>string</code>  | |
| **`badge`**        | <code>number</code>  | |
| **`notification`** | <code>any</code>     | |
| **`data`**         | <code>any</code>     | |
| **`click_action`** | <code>string</code>  | |
| **`link`**         | <code>string</code>  | |
| **`group`**        | <code>string</code>  | 仅 Android：设置通知分组的组标识符，类似于 iOS 上的 threadIdentifier。 |
| **`groupSummary`** | <code>boolean</code> | 仅 Android：将此通知指定为组的摘要（应与 `group` 属性一起使用）。 |

#### NotificationChannel

| 属性 | 类型 |
| --------------- | -------------------------------- |
| **`id`**          | <code>string</code>                |
| **`name`**        | <code>string</code>                |
| **`description`** | <code>string</code>                |
| **`sound`**       | <code>string</code>                |
| **`importance`**  | <code>1 \| 2 \| 5 \| 4 \| 3</code> |
| **`visibility`**  | <code>0 \| 1 \| -1</code>          |
| **`lights`**      | <code>boolean</code>               |
| **`lightColor`**  | <code>string</code>                |
| **`vibration`**   | <code>boolean</code>               |

#### NotificationChannelList

| 属性 | 类型 |
| ------------ | -------------------------------- |
| **`channels`** | <code>NotificationChannel[]</code> |

#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### PushNotificationToken

| 属性 | 类型 |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

#### PushNotificationActionPerformed

| 属性 | 类型 |
| ---------------- | ------------------------------------------------------------- |
| **`actionId`**     | <code>string</code>                                           |
| **`inputValue`**   | <code>string</code>                                           |
| **`notification`** | <code><a href="#pushnotification">PushNotification</a></code> |
