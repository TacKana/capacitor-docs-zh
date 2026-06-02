---
title: 本地通知 - Capacitor 插件 API
description: 本地通知 API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: 本地通知
translated: true
---

# @capacitor/local-notifications

本地通知 API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android

从 Android 12 开始，除非将此权限添加到您的 `AndroidManifest.xml` 中，否则计划的通知将不会精确执行：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使拥有此权限，用户仍然可以从应用设置中禁用精确通知。

## 配置

<docgen-config>

在 Android 上，本地通知可以通过以下选项进行配置：

| 属性             | 类型                | 描述                                                                                                                                                                                                                                                                                                                  | 起始版本 |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知的状态栏默认图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                         | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                     | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认通知声音。在 Android 26+ 上，它会设置默认渠道的声音，除非卸载应用，否则无法更改。如果未找到音频文件，在 Android 21-25 上将播放默认系统声音，在 Android 26+ 上将没有声音。仅适用于 Android。 | 1.0.0 |

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

## Doze（休眠模式）

如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby)（休眠）模式，您的应用可能会受到功能限制。如果您需要在 Doze 期间也触发通知，请使用 `allowWhileIdle: true` 来调度通知。请谨慎使用 `allowWhileIdle`，因为这些通知[每应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

调度一个或多个本地通知。

| 参数            | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知的列表。

**返回：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册在通知显示时可执行的操作。

仅适用于 iOS 和 Android。

| 参数            | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理的通知。

| 参数            | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**起始版本：** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数              | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**起始版本：** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**起始版本：** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android。

| 参数            | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**起始版本：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android。

| 参数        | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | `{ id: string; }` |

**起始版本：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知渠道列表。

仅适用于 Android。

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知被显示的事件。

| 参数                | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知上执行操作的事件。

| 参数                | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**起始版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**起始版本：** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                 | 类型                                       | 描述                          | 起始版本 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已调度的通知列表。 | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性       | 类型                | 描述                  | 起始版本 |
| -------- | ------------------- | ---------------------------- | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |


#### ScheduleOptions

| 属性                | 类型                                   | 描述                            | 起始版本 |
| ------------------- | -------------------------------------- | -------------------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要调度的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| 属性                     | 类型                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 起始版本 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**            | <code>string</code>                           | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | <code>string</code>                           | 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`largeBody`**        | <code>string</code>                           | 设置在大文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于在收件箱和大文本通知样式中设置摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。在 Android 上为 32 位整数，因此值应在 -2147483648 到 2147483647 之间（含边界值）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | 将此通知调度到稍后时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 显示此通知时播放的音频文件名。包含文件扩展名。在 iOS 上，文件应位于应用 bundle 中。在 Android 上，文件应放在 res/raw 文件夹中。推荐使用 `.wav` 格式，因为 iOS 和 Android 均支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，请使用配置了所需声音的 channelId。如果未找到声音文件（即空字符串或错误名称），将使用系统默认通知声音。如果未提供，Android 上会产生默认声音，iOS 上则无声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 为此通知设置附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 为此通知关联一个操作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于分组多个通知。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上的 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到类别摘要格式字符串中的字符串。设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上的 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于分组多个通知。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为通知组的摘要。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setGroupSummary()`。仅在使用 `group` 时适用于 Android。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应投递到的渠道。如果给定名称的渠道不存在，则通知不会触发。如果未提供，将使用默认渠道。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setChannelId()`。仅适用于 Android 26+。                                                                                                                                                                                                                     | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知不能被滑动清除。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，用户点击通知时自动取消该通知。使用提供的值调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上的 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`inboxList`**        | <code>string[]</code>                         | 设置在收件箱样式通知中显示的字符串列表。最多允许 5 个字符串。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### Schedule

表示通知的调度计划。

使用 `at`、`on` 或 `every` 来调度通知。

| 属性                   | 类型                                                    | 描述                                                                                                                                                                                                                                                                                                                             | 起始版本 |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>                   | 在特定日期和时间调度通知。                                                                                                                                                                                                                                                            | 1.0.0 |
| **`repeats`**        | <code>boolean</code>                                    | 在 `at` 指定的日期和时间重复投递此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                                                        | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>                                    | 允许此通知在 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby)（休眠）模式下触发。仅适用于 Android 23+。请注意，这些通知[每应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>       | 在特定的时间间隔调度通知。类似于调度 [cron](https://en.wikipedia.org/wiki/Cron) 任务。仅适用于 iOS 和 Android。                                                                                                                                           | 1.0.0 |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | 在特定的时间间隔调度通知。                                                                                                                                                                                                                                                               | 1.0.0 |
| **`count`**          | <code>number</code>                                     | 限制通过 `every` 指定的间隔投递通知的次数。                                                                                                                                                                                                                                                | 1.0.0 |


#### Date

支持基本的日期和时间存储与检索。

| 方法                   | 签名                                                                                                    | 描述                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | 返回日期的字符串表示形式。字符串格式取决于区域设置。                                              |
| **toDateString**       | () =&gt; string                                                                                              | 以字符串值形式返回日期。                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | 以字符串值形式返回时间。                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的字符串值形式返回值。                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的字符串值形式返回日期。                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的字符串值形式返回时间。                                                  |
| **valueOf**            | () =&gt; number                                                                                              | 返回自 1970 年 1 月 1 日 UTC 午夜以来存储的时间值（毫秒为单位）。                                                      |
| **getTime**            | () =&gt; number                                                                                              | 获取时间值（毫秒为单位）。                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | 使用本地时间获取年份。                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取年份。                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | 使用本地时间获取月份。                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的月份。                                             |
| **getDate**            | () =&gt; number                                                                                              | 使用本地时间获取月份中的日期。                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取月份中的日期。                                                                      |
| **getDay**             | () =&gt; number                                                                                              | 使用本地时间获取星期几。                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取星期几。                                                                        |
| **getHours**           | () =&gt; number                                                                                              | 使用本地时间获取日期中的小时数。                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象中的小时值。                                       |
| **getMinutes**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟数。                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的分钟数。                                           |
| **getSeconds**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的秒数。                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的秒数。                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的毫秒数。                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的毫秒数。                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | 获取本地计算机时间与协调世界时（UTC）之间的分钟差。                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的秒值。                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的分钟值。                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的小时值。                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | 使用本地时间设置 <a href="#date">Date</a> 对象中月份日期的数值。                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中月份日期的数值。                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的月份值。                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用本地时间设置 <a href="#date">Date</a> 对象的年份。                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的年份值。                                      |
| **toUTCString**        | () =&gt; string                                                                                              | 使用协调世界时（UTC）将日期转换为字符串。                                                            |
| **toISOString**        | () =&gt; string                                                                                              | 以 ISO 格式的字符串值形式返回日期。                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | 由 JSON.stringify 方法使用，用于将对象的数据转换为 JavaScript Object Notation (JSON) 序列化。 |


#### ScheduleOn

| 属性            | 类型                                        |
| ------------- | ------------------------------------------- |
| **`year`**    | <code>number</code>                         |
| **`month`**   | <code>number</code>                         |
| **`day`**     | <code>number</code>                         |
| **`weekday`** | <code><a href="#weekday">Weekday</a></code> |
| **`hour`**    | <code>number</code>                         |
| **`minute`**  | <code>number</code>                         |
| **`second`**  | <code>number</code>                         |


#### Attachment

表示通知附件。

| 属性            | 类型                                                            | 描述                                                                                                                           | 起始版本 |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**      | <code>string</code>                                             | 附件标识符。                                                                                                            | 1.0.0 |
| **`url`**     | <code>string</code>                                             | 附件的 URL。使用 `res` scheme 引用 web 资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。 | 1.0.0 |
| **`options`** | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | <a href="#attachment">Attachment</a>（附件）选项。                                                                                         | 1.0.0 |


#### AttachmentOptions

| 属性                                                               | 类型                | 描述                                                                                                                                                                                                                                   | 起始版本 |
| ---------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0 |


#### PendingResult

| 属性                | 类型                                          | 描述                        | 起始版本 |
| ------------------- | --------------------------------------------- | ---------------------------------- | ----- |
| **`notifications`** | <code>PendingLocalNotificationSchema[]</code> | 待处理通知的列表。 | 1.0.0 |


#### PendingLocalNotificationSchema

| 属性             | 类型                                          | 描述                                                          | 起始版本 |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------- | ----- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                       | 1.0.0 |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                 | 1.0.0 |
| **`id`**       | <code>number</code>                           | 通知标识符。                                         | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 将此通知调度到稍后时间。 | 1.0.0 |
| **`extra`**    | <code>any</code>                              | 设置要存储在此通知中的额外数据。                    | 1.0.0 |


#### RegisterActionTypesOptions

| 属性        | 类型                      | 描述                           | 起始版本 |
| ----------- | ------------------------- | ------------------------------------- | ----- |
| **`types`** | <code>ActionType[]</code> | 要注册的操作类型列表。 | 1.0.0 |


#### ActionType

操作的集合。

| 属性                                     | 类型                  | 描述                                                                                                                                                                                     | 起始版本 |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的 ID。在通知中通过 `actionTypeId` 键引用。                                                                                                               | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                           | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder`。仅适用于 iOS。             | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `customDismissAction`。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `allowInCarPlay`。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowTitle`。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowSubtitle`。仅适用于 iOS。 | 1.0.0 |


#### Action

通知显示时可执行的操作。

| 属性                           | 类型                 | 描述                                                                                                                                                                                                     | 起始版本 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。在 `'actionPerformed'` 事件中以 `actionId` 形式引用。                                                                                                                               | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                      | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `authenticationRequired`。仅适用于 iOS。                         | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `foreground`。仅适用于 iOS。                                     | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `destructive`。仅适用于 iOS。                                    | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 而不是 `UNNotificationAction`。仅适用于 iOS。                                                                                                              | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputButtonTitle`。仅在 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputPlaceholder`。仅在 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |


#### CancelOptions

| 属性                | 类型                                       | 描述                          | 起始版本 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |


#### EnabledResult

| 属性        | 类型                 | 描述                                                | 起始版本 |
| ----------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 设备是否已启用本地通知。 | 1.0.0 |


#### DeliveredNotifications

| 属性                | 类型                                       | 描述                                                         | 起始版本 |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>DeliveredNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### DeliveredNotificationSchema

| 属性                 | 类型                                          | 描述                                                                                    | 起始版本 |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| **`id`**           | <code>number</code>                           | 通知标识符。                                                                   | 4.0.0 |
| **`tag`**          | <code>string</code>                           | 通知标签。仅适用于 Android。                                               | 4.0.0 |
| **`title`**        | <code>string</code>                           | 通知的标题。                                                                 | 4.0.0 |
| **`body`**         | <code>string</code>                           | 通知的正文，显示在标题下方。                                           | 4.0.0 |
| **`group`**        | <code>string</code>                           | 通知的配置分组。仅适用于 Android。                          | 4.0.0 |
| **`groupSummary`** | <code>boolean</code>                          | 此通知是否为通知组的摘要。仅适用于 Android。  | 4.0.0 |
| **`data`**         | <code>any</code>                              | 通知负载中包含的任何附加数据。仅适用于 Android。 | 4.0.0 |
| **`extra`**        | <code>any</code>                              | 要存储在此通知中的额外数据。仅适用于 iOS。                          | 4.0.0 |
| **`attachments`**  | <code>Attachment[]</code>                     | 此通知的附件。仅适用于 iOS。                                 | 1.0.0 |
| **`actionTypeId`** | <code>string</code>                           | 与此通知关联的 <a href="#action">Action</a>（操作）类型。仅适用于 iOS。    | 4.0.0 |
| **`schedule`**     | <code><a href="#schedule">Schedule</a></code> | 用于触发此通知的调度计划。仅适用于 iOS。       | 4.0.0 |
| **`sound`**        | <code>string</code>                           | 通知显示时使用的声音。仅适用于 iOS。               | 4.0.0 |


#### Channel

| 属性                | 类型                                              | 描述                                                                                                                                                                                                                                                                                                                                    | 默认值          | 起始版本 |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                                                                                                        |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此渠道的用户友好名称（呈现给用户）。                                                                                                                                                                                                                                                                               |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此渠道的描述（呈现给用户）。                                                                                                                                                                                                                                                                                       |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 投递到此渠道的通知应播放的声音。重要性至少为 `3` 的通知渠道应有声音。声音文件的文件名应相对于 Android 应用的 `res/raw` 目录指定。如果未提供声音或未找到声音文件，将不使用声音。                                                                                  |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 投递到此渠道的通知的中断级别。                                                                                                                                                                                                                                                                            | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 投递到此渠道的通知的可见性。此设置用于控制投递到此渠道的通知是否显示在锁屏上，以及是否以编辑形式显示。                                                                                                                                                   |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 投递到此渠道的通知是否应在支持该功能的设备上显示通知指示灯。                                                                                                                                                                                                                                   |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 投递到此渠道的通知的灯光颜色。仅在此渠道启用了指示灯且设备支持时有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                              |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 投递到此渠道的通知是否应振动。                                                                                                                                                                                                                                                                                   |                  | 1.0.0 |


#### ListChannelsResult

| 属性             | 类型                   | 描述                        | 起始版本 |
| -------------- | ---------------------- | ---------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 通知渠道列表。 | 1.0.0 |


#### PermissionStatus

| 属性            | 类型                                                        | 描述                                   | 起始版本 |
| ------------- | ----------------------------------------------------------- | --------------------------------------------- | ----- |
| **`display`** | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。 | 1.0.0 |


#### PluginListenerHandle

| 属性           | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ActionPerformed

| 属性                 | 类型                                                                        | 描述                                                                                                            | 起始版本 |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                         | 已执行操作的标识符。                                                                                | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                         | 用户在通知上输入的值。仅适用于 `input` 设置为 `true` 的 iOS 通知。 | 1.0.0 |
| **`notification`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知 schema。                                                                                      | 1.0.0 |


### 类型别名


#### ScheduleEvery

<code>'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'</code>


#### Importance

重要性级别。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。更多详情请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### 枚举


#### Weekday

| 成员             | 值          |
| --------------- | -------------- |
| **`Sunday`**    | <code>1</code> |
| **`Monday`**    | <code>2</code> |
| **`Tuesday`**   | <code>3</code> |
| **`Wednesday`** | <code>4</code> |
| **`Thursday`**  | <code>5</code> |
| **`Friday`**    | <code>6</code> |
| **`Saturday`**  | <code>7</code> |

</docgen-api>
