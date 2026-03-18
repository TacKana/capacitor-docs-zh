---
title: Local Notifications
description: Local Notifications API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/local-notifications
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# 本地通知

Local Notification API 提供了一种调度“本地”通知的方式——这些通知在设备上被调度和传递，与从服务器发送的“推送”通知不同。

本地通知非常适合提醒用户自上次访问应用以来发生的变化，提供提醒功能，以及在应用不在前台时传递离线信息。



- [`schedule(...)`](#schedule)
- [`getPending()`](#getpending)
- [`registerActionTypes(...)`](#registeractiontypes)
- [`cancel(...)`](#cancel)
- [`areEnabled()`](#areenabled)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`requestPermission()`](#requestpermission)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)



## 示例

```typescript
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

const notifs = await LocalNotifications.schedule({
  notifications: [
    {
      title: '标题',
      body: '正文',
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) },
      sound: null,
      attachments: null,
      actionTypeId: '',
      extra: null,
    },
  ],
});
console.log('已调度的通知', notifs);
```

## 本地通知配置（仅适用于 Android）

本地通知插件允许在 `capacitor.config.json` 中的 Android 平台配置项中添加以下配置值：

- `smallIcon`: 允许您设置本地通知的默认图标。
- `iconColor`: 允许您设置本地通知图标的默认颜色。
- `sound`: 允许您设置默认的通知提示音。在 Android 26+ 上，它设置的是默认通道的提示音，并且除非卸载应用，否则无法更改。

```json
 "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  }
```

## API



### schedule(...)

```typescript
schedule(options: { notifications: LocalNotification[]; }) => Promise<LocalNotificationScheduleResult>
```

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | `{ notifications: LocalNotification[]; }` |

**返回值:** <code>Promise&lt;<a href="#localnotificationscheduleresult">LocalNotificationScheduleResult</a>&gt;</code>

---

### getPending()

```typescript
getPending() => Promise<LocalNotificationPendingList>
```

**返回值:** <code>Promise&lt;<a href="#localnotificationpendinglist">LocalNotificationPendingList</a>&gt;</code>

---

### registerActionTypes(...)

```typescript
registerActionTypes(options: { types: LocalNotificationActionType[]; }) => Promise<void>
```

| 参数            | 类型                                                    |
| --------------- | ------------------------------------------------------- |
| **`options`**   | `{ types: LocalNotificationActionType[]; }` |

---

### cancel(...)

```typescript
cancel(pending: LocalNotificationPendingList) => Promise<void>
```

| 参数            | 类型                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- |
| **`pending`**   | <code><a href="#localnotificationpendinglist">LocalNotificationPendingList</a></code> |

---

### areEnabled()

```typescript
areEnabled() => Promise<LocalNotificationEnabledResult>
```

**返回值:** <code>Promise&lt;<a href="#localnotificationenabledresult">LocalNotificationEnabledResult</a>&gt;</code>

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

| 参数            | 类型                                                                 |
| --------------- | -------------------------------------------------------------------- |
| **`channel`**   | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

| 参数            | 类型                                                                 |
| --------------- | -------------------------------------------------------------------- |
| **`channel`**   | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

**返回值:** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

**返回值:** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotification) => void) => PluginListenerHandle
```

| 参数                 | 类型                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **`eventName`**      | <code>"localNotificationReceived"</code>                                                         |
| **`listenerFunc`**   | <code>(notification: <a href="#localnotification">LocalNotification</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: LocalNotificationActionPerformed) => void) => PluginListenerHandle
```

| 参数                 | 类型                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**      | <code>"localNotificationActionPerformed"</code>                                                                                                     |
| **`listenerFunc`**   | <code>(notificationAction: <a href="#localnotificationactionperformed">LocalNotificationActionPerformed</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### LocalNotificationScheduleResult#### LocalNotification

| 属性                   | 类型                                                                            | 说明                                                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**            | <code>string</code>                                                             | 通知标题                                                                                                                                                                                                                                                        |
| **`body`**             | <code>string</code>                                                             | 通知正文                                                                                                                                                                                                                                                        |
| **`id`**               | <code>number</code>                                                             | 通知唯一标识符                                                                                                                                                                                                                                                  |
| **`schedule`**         | <code><a href="#localnotificationschedule">LocalNotificationSchedule</a></code> | 通知触发时间安排                                                                                                                                                                                                                                                |
| **`sound`**            | <code>string</code>                                                             | 带扩展名的音频文件名。在 iOS 上，文件应位于应用程序包中。在 Android 上，文件应位于 res/raw 文件夹中。不适用于 Android 26+ 版本（Android O 及更新版本），建议使用 .wav 格式，因为该格式受到两个平台的支持。                                                     |
| **`smallIcon`**        | <code>string</code>                                                             | 仅限 Android：设置自定义状态栏图标。如果设置，将覆盖 capacitor.config.json 中的默认图标                                                                                                                                                                        |
| **`iconColor`**        | <code>string</code>                                                             | 仅限 Android：设置通知图标的颜色                                                                                                                                                                                                                                |
| **`attachments`**      | <code>LocalNotificationAttachment[]</code>                                      | 通知附件                                                                                                                                                                                                                                                        |
| **`actionTypeId`**     | <code>string</code>                                                             | 操作类型标识符                                                                                                                                                                                                                                                  |
| **`extra`**            | <code>any</code>                                                                | 额外数据                                                                                                                                                                                                                                                        |
| **`threadIdentifier`** | <code>string</code>                                                             | 仅限 iOS：设置用于通知分组的线程标识符                                                                                                                                                                                                                          |
| **`summaryArgument`**  | <code>string</code>                                                             | 仅限 iOS 12+：设置用于通知分组的摘要参数                                                                                                                                                                                                                        |
| **`group`**            | <code>string</code>                                                             | 仅限 Android：设置用于通知分组的组标识符，类似于 iOS 上的 threadIdentifier。                                                                                                                                                                                    |
| **`groupSummary`**     | <code>boolean</code>                                                            | 仅限 Android：将此通知指定为组的摘要（应与 `group` 属性一起使用）。                                                                                                                                                                                             |
| **`channelId`**        | <code>string</code>                                                             | 仅限 Android：设置将生成本地通知的通知渠道。如果具有给定名称的渠道不存在，则通知不会触发。如果未提供，将使用默认渠道。                                                                                                                                          |
| **`ongoing`**          | <code>boolean</code>                                                            | 仅限 Android：设置通知为持续状态。如果设置为 true，通知无法被滑动清除。                                                                                                                                                                                         |
| **`autoCancel`**       | <code>boolean</code>                                                            | 仅限 Android：设置通知在用户点击时自动移除                                                                                                                                                                                                                      |#### LocalNotificationSchedule（本地通知调度）

| 属性          | 类型                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`at`**      | <code><a href="#date">Date</a></code>                                                              |
| **`repeats`** | <code>boolean</code>                                                                               |
| **`every`**   | <code>"year" \| "month" \| "two-weeks" \| "week" \| "day" \| "hour" \| "minute" \| "second"</code> |
| **`count`**   | <code>number</code>                                                                                |
| **`on`**      | `{ year?: number; month?: number; day?: number; hour?: number; minute?: number; }`      |#### 日期

提供日期和时间的基本存储与检索功能。| 方法                 | 签名                                                             | 描述                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () => string                                                       | 返回日期的字符串表示形式。字符串的格式取决于区域设置。                                              |
| **toDateString**       | () => string                                                       | 将日期作为字符串值返回。                                                                                                       |
| **toTimeString**       | () => string                                                       | 将时间作为字符串值返回。                                                                                                       |
| **toLocaleString**     | () => string                                                       | 返回适合主机环境当前区域设置的字符串值。                                                 |
| **toLocaleDateString** | () => string                                                       | 返回适合主机环境当前区域设置的日期字符串值。                                                  |
| **toLocaleTimeString** | () => string                                                       | 返回适合主机环境当前区域设置的时间字符串值。                                                  |
| **valueOf**            | () => number                                                       | 返回自 1970 年 1 月 1 日午夜（UTC）以来存储的时间值（毫秒）。                                                      |
| **getTime**            | () => number                                                       | 获取时间值（毫秒）。                                                                                                    |
| **getFullYear**        | () => number                                                       | 使用本地时间获取年份。                                                                                                        |
| **getUTCFullYear**     | () => number                                                       | 使用协调世界时（UTC）获取年份。                                                                                   |
| **getMonth**           | () => number                                                       | 使用本地时间获取月份。                                                                                                       |
| **getUTCMonth**        | () => number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的月份。                                             |
| **getDate**            | () => number                                                       | 使用本地时间获取月份中的日期。                                                                                            |
| **getUTCDate**         | () => number                                                       | 使用协调世界时（UTC）获取月份中的日期。                                                                      |
| **getDay**             | () => number                                                       | 使用本地时间获取星期几。                                                                                             |
| **getUTCDay**          | () => number                                                       | 使用协调世界时（UTC）获取星期几。                                                                        |
| **getHours**           | () => number                                                       | 使用本地时间获取日期中的小时数。                                                                                             |
| **getUTCHours**        | () => number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的小时值。                                       |
| **getMinutes**         | () => number                                                       | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟数。                                                                |
| **getUTCMinutes**      | () => number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的分钟数。                                           |
| **getSeconds**         | () => number                                                       | 使用本地时间获取 <a href="#date">Date</a> 对象的秒数。                                                                |
| **getUTCSeconds**      | () => number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的秒数。                                           |
| **getMilliseconds**    | () => number                                                       | 使用本地时间获取 <a href="#date">Date</a> 的毫秒数。                                                                  |
| **getUTCMilliseconds** | () => number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的毫秒数。                                      |
| **getTimezoneOffset**  | () => number                                                       | 获取本地计算机时间与协调世界时（UTC）之间的分钟差。                             |
| **setTime**            | (time: number) => number                                           | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                                                    |
| **setMilliseconds**    | (ms: number) => number                                             | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) => number                                             | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number) => number                               | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number) => number                               | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的秒值。                                   || **setMinutes**         | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。                                                                               |
| **setUTCMinutes**      | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的分钟值。                                                                       |
| **setHours**           | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。                                                                                |
| **setUTCHours**        | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的小时值。                                                                        |
| **setDate**            | (date: number) =&gt; number                                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份日期值（数值）。                                                                     |
| **setUTCDate**         | (date: number) =&gt; number                                           | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的月份日期值（数值）。                                                            |
| **setMonth**           | (month: number, date?: number) =&gt; number                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。                                                                                 |
| **setUTCMonth**        | (month: number, date?: number) =&gt; number                           | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的月份值。                                                                        |
| **setFullYear**        | (year: number, month?: number, date?: number) =&gt; number            | 使用本地时间设置 <a href="#date">Date</a> 对象中的年份值。                                                                                 |
| **setUTCFullYear**     | (year: number, month?: number, date?: number) =&gt; number            | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的年份值。                                                                        |
| **toUTCString**        | () =&gt; string                                                       | 返回一个使用协调世界时 (UTC) 转换为字符串的日期。                                                                                          |
| **toISOString**        | () =&gt; string                                                       | 以 ISO 格式返回日期的字符串值。                                                                                                           |
| **toJSON**             | (key?: any) =&gt; string                                              | 由 JSON.stringify 方法使用，以便在 JavaScript 对象表示法 (JSON) 序列化过程中转换对象的数据。                                               |#### LocalNotificationAttachment

| 属性          | 类型                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **`id`**      | <code>string</code>                                                                               |
| **`url`**     | <code>string</code>                                                                               |
| **`options`** | <code><a href="#localnotificationattachmentoptions">LocalNotificationAttachmentOptions</a></code> |

#### LocalNotificationAttachmentOptions

| 属性                                                             | 类型                |
| ---------------------------------------------------------------- | ------------------- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> |

#### LocalNotificationPendingList

| 属性                | 类型                                    |
| ------------------- | --------------------------------------- |
| **`notifications`** | <code>LocalNotificationRequest[]</code> |

#### LocalNotificationRequest

| 属性     | 类型                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

#### LocalNotificationActionType

| 属性                                   | 类型                                   |
| -------------------------------------- | -------------------------------------- |
| **`id`**                               | <code>string</code>                    |
| **`actions`**                          | <code>LocalNotificationAction[]</code> |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>                    |
| **`iosCustomDismissAction`**           | <code>boolean</code>                   |
| **`iosAllowInCarPlay`**                | <code>boolean</code>                   |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>                   |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>                   |

#### LocalNotificationAction

| 属性                         | 类型                 |
| ---------------------------- | -------------------- |
| **`id`**                     | <code>string</code>  |
| **`title`**                  | <code>string</code>  |
| **`requiresAuthentication`** | <code>boolean</code> |
| **`foreground`**             | <code>boolean</code> |
| **`destructive`**            | <code>boolean</code> |
| **`input`**                  | <code>boolean</code> |
| **`inputButtonTitle`**       | <code>string</code>  |
| **`inputPlaceholder`**       | <code>string</code>  |

#### LocalNotificationEnabledResult

| 属性        | 类型                 | 描述                                               |
| ----------- | -------------------- | --------------------------------------------------------- |
| **`value`** | <code>boolean</code> | 设备是否启用了本地通知 |

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

#### NotificationPermissionResponse

| 属性          | 类型                 |
| ------------- | -------------------- |
| **`granted`** | <code>boolean</code> |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### LocalNotificationActionPerformed

| 属性               | 类型                                                            |
| ------------------ | --------------------------------------------------------------- |
| **`actionId`**     | <code>string</code>                                             |
| **`inputValue`**   | <code>string</code>                                             |
| **`notification`** | <code><a href="#localnotification">LocalNotification</a></code> |