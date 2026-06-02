---
title: Local Notifications Capacitor 插件 API
description: Local Notifications API 提供了一种在本地安排设备通知的方式（即无需服务器发送推送通知）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: Local Notifications
translated: true
---

# @capacitor/local-notifications

Local Notifications API 提供了一种在本地安排设备通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## 配置

<docgen-config>


在 Android 上，可以通过以下选项配置本地通知：

| 属性 | Type                | 描述 | 始于 |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知的默认状态栏图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                         | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                     | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认通知声音。在 Android 26+ 上，它设置默认频道的提示音，除非应用被卸载，否则无法更改。如果未找到音频文件，则在 Android 21-25 上将播放默认系统声音，在 Android 26+ 上将没有声音。仅适用于 Android。 | 1.0.0 |

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

## 低电耗模式 (Doze)

如果设备已进入 [低电耗模式](https://developer.android.com/training/monitoring-device-state/doze-standby)，您的应用可能受到功能限制。如果您需要在低电耗模式下也能触发通知，请使用 `allowWhileIdle: true` 来安排您的通知。请谨慎使用 `allowWhileIdle`，因为这些通知 [每应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

## API

<docgen-index>

* [`schedule(...)`](#schedule)
* [`getPending()`](#getpending)
* [`registerActionTypes(...)`](#registeractiontypes)
* [`cancel(...)`](#cancel)
* [`areEnabled()`](#areenabled)
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


### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

安排一个或多个本地通知。

| 参数 | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册通知显示时要执行的操作。

仅适用于 iOS 和 Android。

| 参数 | Type                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**始于：** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理的通知。

| 参数 | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**始于：** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

创建通知频道。

仅适用于 Android。

| 参数 | Type                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**始于：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

删除通知频道。

仅适用于 Android。

| 参数 | Type                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**始于：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知频道列表。

仅适用于 Android。

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知显示的事件。

| 参数 | Type                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于：** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知上执行操作的事件。

| 参数 | Type                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**始于：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器。

**始于：** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性 | Type                                       | 描述 | 始于 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已安排的通知列表。 | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性 | Type                | 描述 | 始于 |
| -------- | ------------------- | ---------------------------- | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |


#### ScheduleOptions

| 属性 | Type                                   | 描述 | 始于 |
| ------------------- | -------------------------------------- | -------------------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要安排的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| 属性 | Type                                          | 描述 | 始于 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**            | <code>string</code>                           | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | <code>string</code>                           | 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`largeBody`**        | <code>string</code>                           | 设置一个多行文本块，用于大文本通知样式显示。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于在收件箱和大文本通知样式中设置摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | 将此通知安排在稍后时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 此通知显示时要播放的音频文件名。在文件名中包含文件扩展名。在 iOS 上，文件应在应用 bundle 中。在 Android 上，文件应在 res/raw 文件夹中。推荐使用 `.wav` 格式，因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，请使用配置了所需声音的 channelId。如果未找到声音文件（即空字符串或错误名称），将使用默认系统通知声音。如果未提供，Android 将产生默认声音，iOS 将没有声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。如果设置，它将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 为通知设置大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 为此通知设置附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 为此通知关联一个操作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于对多个通知进行分组。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到类别摘要格式字符串中的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅适用于 iOS 12+。                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于对多个通知进行分组。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为一组通知的摘要。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()`。仅适用于 Android 且使用 `group` 时。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应投递到的频道。如果指定名称的频道不存在，则通知不会触发。如果未提供，将使用默认频道。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()`。仅适用于 Android 26+。                                                                                                                                                                                                                     | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知不能滑动消除。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，用户点击通知时通知将被取消。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`inboxList`**        | <code>string[]</code>                         | 设置一个字符串列表，用于在收件箱样式的通知中显示。最多允许 5 个字符串。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### Schedule

表示通知的安排。

使用 `at`、`on` 或 `every` 之一来安排通知。

| 属性 | Type                                                    | 描述 | 始于 |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>                   | 在特定的日期和时间安排通知。                                                                                                                                                                                                                                                            | 1.0.0 |
| **`repeats`**        | <code>boolean</code>                                    | 在 `at` 指定的日期和时间重复投递此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                                                        | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>                                    | 允许此通知在 [低电耗模式](https://developer.android.com/training/monitoring-device-state/doze-standby) 下触发。仅适用于 Android 23+。请注意，这些通知 [每应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>       | 在特定间隔上安排通知。这类似于安排 [cron](https://en.wikipedia.org/wiki/Cron) 任务。仅适用于 iOS 和 Android。                                                                                                                                           | 1.0.0 |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | 按特定间隔安排通知。                                                                                                                                                                                                                                                               | 1.0.0 |
| **`count`**          | <code>number</code>                                     | 限制由 `every` 指定的间隔投递通知的次数。                                                                                                                                                                                                                                                | 1.0.0 |


#### Date

支持日期和时间的 basic storage and retrieval。

| 方法 | 签名 | 描述 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | 返回日期的字符串表示形式。格式取决于区域设置。                                              |
| **toDateString**       | () =&gt; string                                                                                              | 以字符串值形式返回日期。                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | 以字符串值形式返回时间。                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | 返回适合宿主环境当前区域设置的字符串值。                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | 返回适合宿主环境当前区域设置的日期字符串值。                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | 返回适合宿主环境当前区域设置的时间字符串值。                                                  |
| **valueOf**            | () =&gt; number                                                                                              | 返回自 1970 年 1 月 1 日 UTC 午夜以来存储的时间值（以毫秒为单位）。                                                      |
| **getTime**            | () =&gt; number                                                                                              | 以毫秒为单位获取时间值。                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | 使用本地时间获取年份。                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取年份。                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | 使用本地时间获取月份。                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 Date 对象的月份。                                             |
| **getDate**            | () =&gt; number                                                                                              | 使用本地时间获取月份中的日期。                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取月份中的日期。                                                                      |
| **getDay**             | () =&gt; number                                                                                              | 使用本地时间获取星期几。                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取星期几。                                                                        |
| **getHours**           | () =&gt; number                                                                                              | 使用本地时间获取日期中的小时。                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 Date 对象中的小时值。                                       |
| **getMinutes**         | () =&gt; number                                                                                              | 使用本地时间获取 Date 对象的分钟。                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 Date 对象的分钟。                                           |
| **getSeconds**         | () =&gt; number                                                                                              | 使用本地时间获取 Date 对象的秒。                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 Date 对象的秒。                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | 使用本地时间获取 Date 的毫秒。                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 Date 对象的毫秒。                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | 获取本地计算机时间与协调世界时 (UTC) 之间的时间差（以分钟为单位）。                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | 设置 Date 对象中的日期和时间值。                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | 使用本地时间设置 Date 对象中的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | 使用协调世界时 (UTC) 设置 Date 对象中的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用本地时间设置 Date 对象中的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用协调世界时 (UTC) 设置 Date 对象中的秒值。                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用本地时间设置 Date 对象中的分钟值。                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用协调世界时 (UTC) 设置 Date 对象中的分钟值。                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用本地时间设置 Date 对象中的小时值。                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用协调世界时 (UTC) 设置 Date 对象中的小时值。                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | 使用本地时间设置 Date 对象的月份中的日期值。                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | 使用协调世界时 (UTC) 设置 Date 对象中的月份日期。                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用本地时间设置 Date 对象中的月份值。                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用协调世界时 (UTC) 设置 Date 对象中的月份值。                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用本地时间设置 Date 对象的年份。                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用协调世界时 (UTC) 设置 Date 对象中的年份值。                                      |
| **toUTCString**        | () =&gt; string                                                                                              | 使用协调世界时 (UTC) 将日期转换为字符串。                                                            |
| **toISOString**        | () =&gt; string                                                                                              | 以 ISO 格式将日期作为字符串值返回。                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | 被 JSON.stringify 方法使用，以实现对象数据到 JavaScript 对象表示法 (JSON) 序列化的转换。 |


#### ScheduleOn

| 属性 | Type                                        |
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

| 属性 | Type                                                            | 描述 | 始于 |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**      | <code>string</code>                                             | 附件标识符。                                                                                                            | 1.0.0 |
| **`url`**     | <code>string</code>                                             | 附件的 URL。使用 `res` 方案引用 Web 资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。 | 1.0.0 |
| **`options`** | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | 附件选项。                                                                                         | 1.0.0 |


#### AttachmentOptions

| 属性 | Type                | 描述 | 始于 |
| ---------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0 |


#### PendingResult

| 属性 | Type                                          | 描述 | 始于 |
| ------------------- | --------------------------------------------- | ---------------------------------- | ----- |
| **`notifications`** | <code>PendingLocalNotificationSchema[]</code> | 待处理通知列表。 | 1.0.0 |


#### PendingLocalNotificationSchema

| 属性 | Type                                          | 描述 | 始于 |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------- | ----- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                       | 1.0.0 |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                 | 1.0.0 |
| **`id`**       | <code>number</code>                           | 通知标识符。                                         | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 将此通知安排在稍后时间。 | 1.0.0 |
| **`extra`**    | <code>any</code>                              | 设置要存储在此通知中的额外数据。                    | 1.0.0 |


#### RegisterActionTypesOptions

| 属性 | Type                      | 描述 | 始于 |
| ----------- | ------------------------- | ------------------------------------- | ----- |
| **`types`** | <code>ActionType[]</code> | 要注册的操作类型列表。 | 1.0.0 |


#### ActionType

操作的集合。

| 属性 | Type                  | 描述 | 始于 |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的 ID。由通知中的 `actionTypeId` 键引用。                                                                                                               | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                           | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder`。仅适用于 iOS。             | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `customDismissAction`。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `allowInCarPlay`。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowTitle`。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowSubtitle`。仅适用于 iOS。 | 1.0.0 |


#### Action

通知显示时可以执行的操作。

| 属性 | Type                 | 描述 | 始于 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。由 `'actionPerformed'` 事件中的 `actionId` 引用。                                                                                                                               | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                      | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `authenticationRequired`。仅适用于 iOS。                         | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `foreground`。仅适用于 iOS。                                     | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `destructive`。仅适用于 iOS。                                    | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 而不是 `UNNotificationAction`。仅适用于 iOS。                                                                                                              | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputButtonTitle`。仅适用于 iOS 且 `input` 为 `true` 时。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputPlaceholder`。仅适用于 iOS 且 `input` 为 `true` 时。 | 1.0.0 |


#### CancelOptions

| 属性 | Type                                       | 描述 | 始于 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |


#### EnabledResult

| 属性 | Type                 | 描述 | 始于 |
| ----------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 设备是否已启用本地通知。 | 1.0.0 |


#### Channel

| 属性 | Type                                              | 描述 | 始于 |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code>                               | 频道标识符。                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此频道的人类可读名称（展示给用户）。                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`description`** | <code>string</code>                               | 此频道的描述（展示给用户）。                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 发布到此频道的通知应播放的声音。重要性至少为 `3` 的通知频道应有声音。声音文件的文件名应相对于 Android 应用 `res/raw` 目录指定。如果未提供声音或找不到声音文件，则不使用声音。 | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此频道的通知的中断级别。                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 发布到此频道的通知的可见性。此设置决定发布到此频道的通知是否出现在锁屏上，以及如果出现，是否以编辑形式显示。                                                                                                                                                                                                   | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 发布到此频道的通知是否应在支持该功能的设备上显示通知灯。                                                                                                                                                                                                                                   | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 发布到此频道的通知的灯光颜色。仅当此频道启用了灯光且设备支持时才适用。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                              | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 发布到此频道的通知是否应振动。                                                                                                                                                                                                                                                                                   | 1.0.0 |


#### ListChannelsResult

| 属性 | Type                   | 描述 | 始于 |
| -------------- | ---------------------- | ---------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 通知频道列表。 | 1.0.0 |


#### PermissionStatus

| 属性 | Type                                                        | 描述 | 始于 |
| ------------- | ----------------------------------------------------------- | --------------------------------------------- | ----- |
| **`display`** | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。 | 1.0.0 |


#### PluginListenerHandle

| 属性 | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ActionPerformed

| 属性 | Type                                                                        | 描述 | 始于 |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                         | 执行的操作的标识符。                                                                                | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                         | 用户在通知上输入的值。仅适用于 iOS 中 `input` 设置为 `true` 的通知。 | 1.0.0 |
| **`notification`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知模式。                                                                                      | 1.0.0 |


### 类型别名


#### ScheduleEvery

<code>'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'</code>


#### NotificationChannel

<code><a href="#channel">Channel</a></code>


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

| 成员 | Value          |
| --------------- | -------------- |
| **`Sunday`**    | <code>1</code> |
| **`Monday`**    | <code>2</code> |
| **`Tuesday`**   | <code>3</code> |
| **`Wednesday`** | <code>4</code> |
| **`Thursday`**  | <code>5</code> |
| **`Friday`**    | <code>6</code> |
| **`Saturday`**  | <code>7</code> |

</docgen-api>
