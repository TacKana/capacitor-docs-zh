---
title: Local Notifications Capacitor Plugin API
description: 本地通知 API 提供了一种无需服务器发送推送通知，直接在设备上调度通知的方式。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: 本地通知
---

# @capacitor/local-notifications

本地通知 API 提供了一种无需服务器发送推送通知，直接在设备上调度通知的方式。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android 注意事项

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加以下权限，否则定时通知将无法精确触发：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

注意：即使拥有该权限，用户仍可在应用设置中禁用精确通知功能。

## 配置

<docgen-config>

在 Android 平台上，本地通知可通过以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                                                                                                                                  | 版本 |
| --------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知默认状态栏图标。图标应放置在应用的 `res/drawable` 目录中，值为不带扩展名的资源文件名（即 drawable 资源 ID）。仅适用于 Android 平台。                                                                         | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android 平台。                                                                                                                                                                                                                                     | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知默认提示音。在 Android 26+ 上会设置默认通道音效且无法修改（除非卸载应用）。如果未找到音频文件，在 Android 21-25 上将播放系统默认音效，而在 Android 26+ 上将没有声音。仅适用于 Android 平台。 | 1.0.0 |

### 配置示例

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

## 低电耗模式(Doze)处理

当设备进入[低电耗模式](https://developer.android.com/training/monitoring-device-state/doze-standby)时，应用功能可能受限。如需在 Doze 模式下仍触发通知，可使用 `allowWhileIdle: true` 参数。请谨慎使用此功能，因为[每个应用每9分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)此类通知。

## API 文档

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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>


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

注册通知显示时要执行的操作。

仅支持 iOS 和 Android 平台。

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

检查通知功能是否启用。

**返回值:** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知中心可见的通知列表。

**返回值:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**版本:** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知中心移除指定通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**版本:** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

清除通知中心所有通知。

**版本:** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅支持 Android 平台。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅支持 Android 平台。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | `{ id: string; }` |

**版本:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知渠道列表。

仅支持 Android 平台。

**返回值:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查本地通知显示权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求本地通知显示权限。

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

移除本插件所有监听器。

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
| **`largeBody`**        | <code>string</code>                           | 设置大文本通知样式中的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于设置收件箱和大文本通知样式中的摘要文本详情。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。在 Android 上是32位整数，取值范围应为-2147483648到2147483647之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | <a href="#schedule">调度</a>此通知在稍后时间触发。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 通知显示时播放的音频文件名（需包含扩展名）。在 iOS 上文件应位于应用包中；在 Android 上应位于 res/raw 目录。推荐使用 `.wav` 格式（因同时支持 iOS 和 Android）。仅适用于 iOS 和 Android < 26。对于 Android 26+ 请使用配置了所需音效的 channelId。如果未找到音频文件（如空字符串或错误文件名），将使用系统默认提示音。如未提供，在 Android 上将播放默认音效，在 iOS 上则无声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。若设置则覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 目录中，值为不带扩展名的资源文件名（即 drawable 资源 ID）。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 设置通知大图标。图标应放置在应用的 `res/drawable` 目录中，值为不带扩展名的资源文件名（即 drawable 资源 ID）。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标颜色。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 设置通知附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 关联此通知的操作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于分组多个通知。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `threadIdentifier` 属性。仅适用于 iOS 平台。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到分类摘要格式字符串的内容。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的 `summaryArgument` 属性。仅适用于 iOS 平台。                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于分组多个通知。调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroup()` 方法并传入此值。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 若为 true，此通知将成为通知组的摘要。调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setGroupSummary()` 方法并传入此值。仅在使用 `group` 时适用于 Android 平台。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应传递的渠道。如果不存在具有给定名称的渠道，则通知不会触发。若未提供，将使用默认渠道。调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setChannelId()` 方法并传入此值。仅适用于 Android 26+。                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 若为 true，通知将无法被滑动清除。调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setOngoing()` 方法并传入此值。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 若为 true，当用户点击通知时将被自动取消。调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setAutoCancel()` 方法并传入此值。仅适用于 Android 平台。                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **