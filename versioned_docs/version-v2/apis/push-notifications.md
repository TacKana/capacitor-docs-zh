---
title: Push Notifications
description: 推送通知 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/push-notifications
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# 推送通知

推送通知 API 提供了设备注册、接收服务器通知以及处理响应的方法。与 [本地通知](/apis/local-notifications.md) API 不同，后者主要用于离线场景下的本地通知调度和处理。

## 启用推送通知功能

在 iOS 平台上，您需要先在项目中启用推送通知功能才能使插件正常工作。进入应用项目的 `Capabilities` 部分，将 `Push Notifications` 从 `OFF` 切换到 `ON` 状态。

此操作会为应用添加推送功能并在项目中创建授权文件。

![启用推送通知功能](../../../static/img/v3/docs/ios/enable-push-capabilities.png)

对于 Android 平台，只需从 Firebase 控制台下载项目的 `google-services.json` 文件，并放置到 `项目名/android/app` 目录下即可。

## 推送通知图标

在 Android 平台上，需要在 `AndroidManifest.xml` 文件中配置带有正确名称的推送通知图标：

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

若未指定图标，Android 会使用应用图标。但推送图标要求是透明背景上的白色像素图案，而应用图标通常不符合此要求，会导致显示为白色方块或圆形。因此建议为推送通知单独提供图标。

您可以使用 Android Studio 的图标生成工具来创建推送通知图标。

## 禁用推送通知插件

如果项目中未使用推送通知功能，在提交应用到 iTunes Connect 时，Apple 会发送邮件提示存在 `缺少推送通知授权` 的问题。这是因为 Capacitor 内置了推送通知注册和获取令牌的代码。

Apple 发送此邮件只是为了确认您没有错误地忘记启用推送功能，如果确实不使用推送通知插件，可以安全忽略该提示。

若希望避免接收此类邮件，可以通过移除项目 Build Settings 中 `Active Compilation Conditions` 下的 `USE_PUSH` 来禁用推送通知插件。

![禁用推送通知](../../../static/img/v3/docs/ios/disable-push-plugin.png)

## 前台推送通知显示方式

在 iOS 平台上，您可以通过在 `capacitor.config.json` 中配置 `presentationOptions` 数组来定义应用处于前台时推送通知的显示方式。

可选值包括：

- `badge`：更新应用图标上的角标计数（默认值）
- `sound`：收到推送时设备会播放铃声/震动
- `alert`：以原生对话框形式显示推送通知

如果不需要任何上述效果，可以传入空数组。此时仍会触发 `pushNotificationReceived` 事件并携带推送信息。

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
- [接口](#interfaces)



## 示例教程

[在 Ionic Angular 应用中使用 Firebase 推送通知](/guides/push-notifications-firebase.md)

## API




### register()

```typescript
register() => Promise<void>
```

注册应用以接收推送通知。
将触发携带推送令牌的注册事件，
或在出现问题时触发注册错误事件。
不会请求用户通知权限，需先使用 requestPermission()。

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

在 iOS 上会提示用户允许显示通知
并返回权限授予状态。
Android 无此类提示，默认返回已授权。

**返回值:** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<PushNotificationDeliveredList>
```

获取通知中心当前可见的所有通知。

**返回值:** <code>Promise&lt;<a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a>&gt;</code>

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: PushNotificationDeliveredList) => Promise<void>
```

从通知中心移除指定的通知。

| 参数             | 类型                                                                                    | 描述                   |
| --------------- | --------------------------------------------------------------------------------------- | ---------------------- |
| **`delivered`** | <code><a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a></code> | 待移除的通知列表。     |

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

清除通知中心所有已送达的通知。

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

在 Android O 及以上版本(API 26+)创建通知渠道。

| 参数          | 类型                                                                | 描述         |
| ------------- | ------------------------------------------------------------------- | ------------ |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | 要创建的渠道 |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

在 Android O 及以上版本(API 26+)删除通知渠道。

| 参数          | 类型                                                                | 描述         |
| ------------- | ------------------------------------------------------------------- | ------------ |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | 要删除的渠道 |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

在 Android O 及以上版本(API 26+)列出所有可用通知渠道。

**返回值:** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: PushNotificationToken) => void) => PluginListenerHandle
```

当推送通知注册成功时触发的事件。
提供推送通知令牌。

| 参数               | 类型                                                                                        | 描述                      |
| ----------------- | ------------------------------------------------------------------------------------------- | ------------------------- |
| **`eventName`**   | <code>"registration"</code>                                                                 | 注册事件                  |
| **`listenerFunc`**| <code>(token: <a href="#pushnotificationtoken">PushNotificationToken</a>) =&gt; void</code> | 携带推送令牌的回调函数    |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => PluginListenerHandle
```

当推送通知注册失败时触发的事件。
提供注册错误信息。

| 参数               | 类型                                 | 描述                          |
| ----------------- | ------------------------------------ | ----------------------------- |
| **`eventName`**   | <code>"registrationError"</code>     | 注册错误事件                  |
| **`listenerFunc`**| <code>(error: any) =&gt; void</code> | 携带注册错误的回调函数        |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotification) => void) => PluginListenerHandle
```

当设备收到推送通知时触发的事件。

| 参数               | 类型                                                                                     | 描述                             |
| ----------------- | ---------------------------------------------------------------------------------------- | -------------------------------- |
| **`eventName`**   | <code>"pushNotificationReceived"</code>                                                  | 推送通知接收事件                 |
| **`listenerFunc`**| <code>(notification: <a href="#pushnotification">PushNotification</a>) =&gt; void</code> | 携带接收到的通知的回调函数       |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: PushNotificationActionPerformed) => void) => PluginListenerHandle
```

当用户对推送通知执行操作时触发的事件。

| 参数               | 类型                                                                                                                   | 描述                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **`eventName`**   | <code>"pushNotificationActionPerformed"</code>                                                                         | 推送通知操作执行事件           |
| **`listenerFunc`**| <code>(notification: <a href="#pushnotificationactionperformed">PushNotificationActionPerformed</a>) =&gt; void</code> | 携带通知操作信息的回调函数     |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除本插件所有原生事件监听器。

---

### 接口

#### NotificationPermissionResponse

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`granted`** | <code>boolean</code> |

#### PushNotificationDeliveredList

| 属性                | 类型                            |
| ------------------- | ------------------------------- |
| **`notifications`** | <code>PushNotification[]</code> |

#### PushNotification

| 属性               | 类型                 | 描述                                                                                                      |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------- |
| **`title`**        | <code>string</code>  | 通知标题                                                                                                 |
| **`subtitle`**     | <code>string</code>  | 通知副标题                                                                                               |
| **`body`**         | <code>string</code>  | 通知正文                                                                                                 |
| **`id`**           | <code>string</code>  | 通知ID                                                                                                   |
| **`badge`**        | <code>number</code>  | 角标数                                                                                                   |
| **`notification`** | <code>any</code>     | 原生通知对象                                                                                             |
| **`data`**         | <code>any</code>     | 附加数据                                                                                                 |
| **`click_action`** | <code>string</code>  | 点击动作                                                                                                 |
| **`link`**         | <code>string</code>  | 链接地址                                                                                                 |
| **`group`**        | <code>string</code>  | 仅Android：设置通知分组标识符，类似iOS的threadIdentifier                                                 |
| **`groupSummary`** | <code>boolean</code> | 仅Android：将本通知设为分组摘要（需与`group`属性配合使用）                                                |

#### NotificationChannel

| 属性              | 类型                               |
| ----------------- | ---------------------------------- |
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

| 属性           | 类型                               |
| -------------- | ---------------------------------- |
| **`channels`** | <code>NotificationChannel[]</code> |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### PushNotificationToken

| 属性        | 类型                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

#### PushNotificationActionPerformed

| 属性               | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`actionId`**     | <code>string</code>                                           |
| **`inputValue`**   | <code>string</code>                                           |
| **`notification`** | <code><a href="#pushnotification">PushNotification</a></code> |