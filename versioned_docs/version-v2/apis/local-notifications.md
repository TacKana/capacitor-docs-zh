---
title: 本地通知
description: 本地通知 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/local-notifications
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# 本地通知

本地通知 API 提供了一种安排"本地"通知的方法——这些通知是在设备上安排和交付的，而不是从服务器发送的"推送"通知。

本地通知非常适合提醒用户自上次访问以来应用发生了变化、提供提醒功能以及在应用不在前台时传递离线信息。

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
- [接口](#接口)

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
console.log('已安排的通知', notifs);
```

## 本地通知配置（仅 Android）

本地通知插件允许在 `capacitor.config.json` 中为 Android 平台添加以下配置值：

- `smallIcon`：允许您设置本地通知的默认图标。
- `iconColor`：允许您设置本地通知图标的默认颜色。
- `sound`：允许您设置默认通知声音。在 Android 26+ 上，设置默认频道声音，除非应用被卸载，否则无法更改。

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

| 参数 | 类型 |
| ------------- | ---------------------------------------------------- |
| **`options`** | `{ notifications: LocalNotification[]; }` |

**返回：** <code>Promise&lt;<a href="#localnotificationscheduleresult">LocalNotificationScheduleResult</a>&gt;</code>

---

### getPending()

```typescript
getPending() => Promise<LocalNotificationPendingList>
```

**返回：** <code>Promise&lt;<a href="#localnotificationpendinglist">LocalNotificationPendingList</a>&gt;</code>

---

### registerActionTypes(...)

```typescript
registerActionTypes(options: { types: LocalNotificationActionType[]; }) => Promise<void>
```

| 参数 | 类型 |
| ------------- | ------------------------------------------------------ |
| **`options`** | `{ types: LocalNotificationActionType[]; }` |

---

### cancel(...)

```typescript
cancel(pending: LocalNotificationPendingList) => Promise<void>
```

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------------------------- |
| **`pending`** | <code><a href="#localnotificationpendinglist">LocalNotificationPendingList</a></code> |

---

### areEnabled()

```typescript
areEnabled() => Promise<LocalNotificationEnabledResult>
```

**返回：** <code>Promise&lt;<a href="#localnotificationenabledresult">LocalNotificationEnabledResult</a>&gt;</code>

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

**返回：** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

**返回：** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotification) => void) => PluginListenerHandle
```

| 参数 | 类型 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"localNotificationReceived"</code>                                                   |
| **`listenerFunc`** | <code>(notification: <a href="#localnotification">LocalNotification</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: LocalNotificationActionPerformed) => void) => PluginListenerHandle
```

| 参数 | 类型 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"localNotificationActionPerformed"</code>                                                                                |
| **`listenerFunc`** | <code>(notificationAction: <a href="#localnotificationactionperformed">LocalNotificationActionPerformed</a>) =&gt; void</code> |

**返回：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器

---

### 接口

#### LocalNotificationScheduleResult

#### LocalNotification

| 属性 | 类型 | 描述 |
| ---------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**            | <code>string</code>                                                             | |
| **`body`**             | <code>string</code>                                                             | |
| **`id`**               | <code>number</code>                                                             | |
| **`schedule`**         | <code><a href="#localnotificationschedule">LocalNotificationSchedule</a></code> | |
| **`sound`**            | <code>string</code>                                                             | 带扩展名的音频文件名。在 iOS 上，文件应位于应用 bundle 中。在 Android 上，文件应放在 res/raw 文件夹中。在 Android 26+（Android O 及更新版本）上不起作用。推荐格式为 .wav，因为它受两个平台支持。 |
| **`smallIcon`**        | <code>string</code>                                                             | 仅 Android：设置自定义状态栏图标。如果设置，将覆盖 capacitor.config.json 中的默认图标。 |
| **`iconColor`**        | <code>string</code>                                                             | 仅 Android：设置通知图标的颜色。 |
| **`attachments`**      | <code>LocalNotificationAttachment[]</code>                                      | |
| **`actionTypeId`**     | <code>string</code>                                                             | |
| **`extra`**            | <code>any</code>                                                                | |
| **`threadIdentifier`** | <code>string</code>                                                             | 仅 iOS：设置通知分组的线程标识符。 |
| **`summaryArgument`**  | <code>string</code>                                                             | 仅 iOS 12+：设置通知分组的摘要参数。 |
| **`group`**            | <code>string</code>                                                             | 仅 Android：设置通知分组的组标识符，类似于 iOS 上的 threadIdentifier。 |
| **`groupSummary`**     | <code>boolean</code>                                                            | 仅 Android：将此通知指定为组的摘要（应与 `group` 属性一起使用）。 |
| **`channelId`**        | <code>string</code>                                                             | 仅 Android：设置本地通知将生成的频道名称。如果给定名称的频道不存在，则通知不会触发。如果未提供，将使用默认频道。 |
| **`ongoing`**          | <code>boolean</code>                                                            | 仅 Android：将通知设置为进行中。如果设置为 true，则通知不能被滑动清除。 |
| **`autoCancel`**       | <code>boolean</code>                                                            | 仅 Android：设置用户点击通知时自动移除通知。 |

#### LocalNotificationSchedule

| 属性 | 类型 |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`at`**      | <code><a href="#date">Date</a></code>                                                              |
| **`repeats`** | <code>boolean</code>                                                                               |
| **`every`**   | <code>"year" \| "month" \| "two-weeks" \| "week" \| "day" \| "hour" \| "minute" \| "second"</code> |
| **`count`**   | <code>number</code>                                                                                |
| **`on`**      | `{ year?: number; month?: number; day?: number; hour?: number; minute?: number; }`      |

#### Date

支持日期和时间的存储和检索。

| 方法 | 签名 | 描述 |
| ---------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                       | 返回日期的字符串表示形式。字符串格式取决于区域设置。 |
| **toDateString**       | () =&gt; string                                                       | 以字符串值形式返回日期。 |
| **toTimeString**       | () =&gt; string                                                       | 以字符串值形式返回时间。 |
| **toLocaleString**     | () =&gt; string                                                       | 返回适合宿主环境当前区域设置的字符串值。 |
| **toLocaleDateString** | () =&gt; string                                                       | 返回适合宿主环境当前区域设置的日期字符串值。 |
| **toLocaleTimeString** | () =&gt; string                                                       | 返回适合宿主环境当前区域设置的时间字符串值。 |
| **valueOf**            | () =&gt; number                                                       | 返回自 1970 年 1 月 1 日 UTC 午夜以来存储的时间值（以毫秒为单位）。 |
| **getTime**            | () =&gt; number                                                       | 获取时间值（以毫秒为单位）。 |
| **getFullYear**        | () =&gt; number                                                       | 使用本地时间获取年份。 |
| **getUTCFullYear**     | () =&gt; number                                                       | 使用协调世界时（UTC）获取年份。 |
| **getMonth**           | () =&gt; number                                                       | 使用本地时间获取月份。 |
| **getUTCMonth**        | () =&gt; number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的月份。 |
| **getDate**            | () =&gt; number                                                       | 使用本地时间获取月份中的日期。 |
| **getUTCDate**         | () =&gt; number                                                       | 使用协调世界时（UTC）获取月份中的日期。 |
| **getDay**             | () =&gt; number                                                       | 使用本地时间获取星期几。 |
| **getUTCDay**          | () =&gt; number                                                       | 使用协调世界时（UTC）获取星期几。 |
| **getHours**           | () =&gt; number                                                       | 使用本地时间获取日期中的小时。 |
| **getUTCHours**        | () =&gt; number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象中的小时值。 |
| **getMinutes**         | () =&gt; number                                                       | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟。 |
| **getUTCMinutes**      | () =&gt; number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的分钟。 |
| **getSeconds**         | () =&gt; number                                                       | 使用本地时间获取 <a href="#date">Date</a> 对象的秒。 |
| **getUTCSeconds**      | () =&gt; number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的秒。 |
| **getMilliseconds**    | () =&gt; number                                                       | 使用本地时间获取 <a href="#date">Date</a> 的毫秒。 |
| **getUTCMilliseconds** | () =&gt; number                                                       | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的毫秒。 |
| **getTimezoneOffset**  | () =&gt; number                                                       | 获取本地计算机时间与协调世界时（UTC）之间的分钟差。 |
| **setTime**            | (time: number) =&gt; number                                           | 设置 <a href="#date">Date</a> 对象中的日期和时间值。 |
| **setMilliseconds**    | (ms: number) =&gt; number                                             | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。 |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                             | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的毫秒值。 |
| **setSeconds**         | (sec: number, ms?: number) =&gt; number                               | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。 |
| **setUTCSeconds**      | (sec: number, ms?: number) =&gt; number                               | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的秒值。 |
| **setMinutes**         | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。 |
| **setUTCMinutes**      | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的分钟值。 |
| **setHours**           | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。 |
| **setUTCHours**        | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的小时值。 |
| **setDate**            | (date: number) =&gt; number                                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份日期值。 |
| **setUTCDate**         | (date: number) =&gt; number                                           | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的月份日期值。 |
| **setMonth**           | (month: number, date?: number) =&gt; number                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。 |
| **setUTCMonth**        | (month: number, date?: number) =&gt; number                           | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的月份值。 |
| **setFullYear**        | (year: number, month?: number, date?: number) =&gt; number            | 使用本地时间设置 <a href="#date">Date</a> 对象的年份。 |
| **setUTCFullYear**     | (year: number, month?: number, date?: number) =&gt; number            | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的年份值。 |
| **toUTCString**        | () =&gt; string                                                       | 使用协调世界时（UTC）将日期转换为字符串。 |
| **toISOString**        | () =&gt; string                                                       | 以 ISO 格式返回日期字符串值。 |
| **toJSON**             | (key?: any) =&gt; string                                              | 由 JSON.stringify 方法使用，以便转换对象的数据进行 JavaScript Object Notation (JSON) 序列化。 |

#### LocalNotificationAttachment

| 属性 | 类型 |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **`id`**      | <code>string</code>                                                                               |
| **`url`**     | <code>string</code>                                                                               |
| **`options`** | <code><a href="#localnotificationattachmentoptions">LocalNotificationAttachmentOptions</a></code> |

#### LocalNotificationAttachmentOptions

| 属性 | 类型 |
| ---------------------------------------------------------------- | ------------------- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> |

#### LocalNotificationPendingList

| 属性 | 类型 |
| ------------------- | --------------------------------------- |
| **`notifications`** | <code>LocalNotificationRequest[]</code> |

#### LocalNotificationRequest

| 属性 | 类型 |
| -------- | ------------------- |
| **`id`** | <code>string</code> |

#### LocalNotificationActionType

| 属性 | 类型 |
| -------------------------------------- | -------------------------------------- |
| **`id`**                               | <code>string</code>                    |
| **`actions`**                          | <code>LocalNotificationAction[]</code> |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>                    |
| **`iosCustomDismissAction`**           | <code>boolean</code>                   |
| **`iosAllowInCarPlay`**                | <code>boolean</code>                   |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>                   |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>                   |

#### LocalNotificationAction

| 属性 | 类型 | 描述 |
| ---------------------------- | -------------------- | -------------------- |
| **`id`**                     | <code>string</code>  | |
| **`title`**                  | <code>string</code>  | |
| **`requiresAuthentication`** | <code>boolean</code> | |
| **`foreground`**             | <code>boolean</code> | |
| **`destructive`**            | <code>boolean</code> | |
| **`input`**                  | <code>boolean</code> | |
| **`inputButtonTitle`**       | <code>string</code>  | |
| **`inputPlaceholder`**       | <code>string</code>  | |

#### LocalNotificationEnabledResult

| 属性 | 类型 | 描述 |
| ----------- | -------------------- | --------------------------------------------------------- |
| **`value`** | <code>boolean</code> | 设备是否启用了本地通知 |

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

#### NotificationPermissionResponse

| 属性 | 类型 |
| ------------- | -------------------- |
| **`granted`** | <code>boolean</code> |

#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### LocalNotificationActionPerformed

| 属性 | 类型 |
| ---------------- | --------------------------------------------------------------- |
| **`actionId`**     | <code>string</code>                                             |
| **`inputValue`**   | <code>string</code>                                             |
| **`notification`** | <code><a href="#localnotification">LocalNotification</a></code> |
