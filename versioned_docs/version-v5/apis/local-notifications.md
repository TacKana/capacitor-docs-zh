---
title: Local Notifications Capacitor Plugin API
description: Local Notifications API 提供了一种本地调度设备通知的方式（即无需服务器发送推送通知）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/local-notifications/src/definitions.ts
sidebar_label: 本地通知
---

# @capacitor/local-notifications

Local Notifications API 提供了一种本地调度设备通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications@latest-5
npx cap sync
```

## Android
Android 13 需要权限检查才能发送通知。你必须相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，而是直接返回已授权状态。

从 Android 12 开始，除非将以下权限添加到你的 `AndroidManifest.xml` 中，否则定时通知将不准确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

注意：即使拥有该权限，用户仍可以从应用设置中禁用精确通知。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

在 Android 上，本地通知可以使用以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                                                                                                                                  | 版本 |
| --------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知的默认状态栏图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                         | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                     | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认提示音。在 Android 26+ 上，它设置默认通道声音且无法更改，除非卸载应用。如果找不到音频文件，Android 21-25 会播放默认系统声音，而 Android 26+ 则无声音。仅适用于 Android。 | 1.0.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/local-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
```

</docgen-config>

## Doze 模式

如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，你的应用可能会受到功能限制。如果你需要在 Doze 模式下仍能触发通知，可以通过设置 `allowWhileIdle: true` 来调度通知。请谨慎使用 `allowWhileIdle`，因为这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

## API

<docgen-index>

* [`schedule(...)`](#schedule)
* [`getPending()`](#getpending)
* [`registerActionTypes(...)`](#registeractiontypes)
* [`cancel(...)`](#cancel)
* [`areEnabled()`](#areenabled)
* [`getDeliveredNotifications()`](#getdeliverednotifications)
* [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
* [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
* [`createChannel(...)`](#createchannel)
* [`deleteChannel(...)`](#deletechannel)
* [`listChannels()`](#listchannels)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`addListener('localNotificationReceived', ...)`](#addlistenerlocalnotificationreceived-)
* [`addListener('localNotificationActionPerformed', ...)`](#addlistenerlocalnotificationactionperformed-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

<a href="#schedule">调度</a>一个或多个本地通知。

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回值:** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册在通知显示时要执行的操作。

仅适用于 iOS 和 Android。

| 参数         | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**版本:** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理通知。

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**版本:** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否启用。

**返回值:** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**版本:** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**版本:** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

移除通知屏幕上的所有通知。

**版本:** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知通道。

仅适用于 Android。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知通道。

仅适用于 Android。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**版本:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知通道列表。

仅适用于 Android。

**返回值:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本:** 1.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知显示事件。

| 参数              | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知操作执行事件。

| 参数              | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器。

**版本:** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                | 类型                                       | 描述                          | 版本 |
| ------------------- | ------------------------------------------ | ---------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已调度的通知列表。 | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述                  | 版本 |
| -------- | ------------------- | -------------------- | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |


#### ScheduleOptions

| 属性                | 类型                                   | 描述                            | 版本 |
| ------------------- | -------------------------------------- | ------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要调度的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| 属性                   | 类型                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 版本 |
| ---------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**            | <code>string</code>                           | 通知标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | <code>string</code>                           | 通知正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`largeBody`**        | <code>string</code>                           | 设置大文本通知样式的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于设置收件箱和大文本通知样式的摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。在 Android 上是 32 位整数，因此值应在 -2147483648 到 2147483647 之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | <a href="#schedule">调度</a>此通知以在稍后时间触发。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 显示此通知时要播放的音频文件名。需包含文件扩展名。在 iOS 上，文件应位于应用包中；在 Android 上，文件应位于 res/raw 文件夹中。建议使用 `.wav` 格式，因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android < 26。对于 Android 26+，使用配置了所需声音的 channelId。如果找不到声音文件（如空字符串或错误名称），将使用默认系统通知声音。如果未提供，Android 上会产生默认声音，而 iOS 上无声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 设置此通知的附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 将此通知与操作类型关联。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于分组多个通知。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到类别摘要格式字符串中的字符串。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于分组多个通知。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为一组通知的摘要。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroupSummary()`。仅在使用 `group` 时适用于 Android。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应传递的通道。如果不存在给定名称的通道，则通知不会触发。如果未提供，将使用默认通道。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setChannelId()`。仅适用于 Android 26+。                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知无法滑动清除。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，用户