---
title: 本地通知
description: 本地通知 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/local-notifications
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# 本地通知

本地通知 API 提供了一种安排"本地"通知的方式——这些通知在设备上调度并发送，与从服务器发送的"推送"通知不同。

本地通知非常适合在用户上次访问后提醒他们应用中的变化、提供提醒功能，以及在应用不处于前台时传递离线信息。

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

## 本地通知配置（仅限 Android）

本地通知插件允许在 `capacitor.config.json` 中为 Android 平台添加以下配置值：

- `smallIcon`：允许设置本地通知的默认图标。
- `iconColor`：允许设置本地通知图标的默认颜色。
- `sound`：允许设置默认的通知声音。在 Android 26+ 上，它设置默认通道声音，除非卸载应用，否则无法更改。

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

安排通知。

| 参数          | 类型                                      |
| ------------- | ----------------------------------------- |
| **`options`** | `{ notifications: LocalNotification[]; }` |

**返回值：** <code>Promise&lt;<a href="#localnotificationscheduleresult">LocalNotificationScheduleResult</a>&gt;</code>

---

### getPending()

```typescript
getPending() => Promise<LocalNotificationPendingList>
```

获取待处理通知列表。

**返回值：** <code>Promise&lt;<a href="#localnotificationpendinglist">LocalNotificationPendingList</a>&gt;</code>

---

### registerActionTypes(...)

```typescript
registerActionTypes(options: { types: LocalNotificationActionType[]; }) => Promise<void>
```

注册操作类型。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`options`** | `{ types: LocalNotificationActionType[]; }` |

---

### cancel(...)

```typescript
cancel(pending: LocalNotificationPendingList) => Promise<void>
```

取消待处理通知。

| 参数          | 类型                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`pending`** | <code><a href="#localnotificationpendinglist">LocalNotificationPendingList</a></code> |

---

### areEnabled()

```typescript
areEnabled() => Promise<LocalNotificationEnabledResult>
```

检查是否启用了通知。

**返回值：** <code>Promise&lt;<a href="#localnotificationenabledresult">LocalNotificationEnabledResult</a>&gt;</code>

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

创建通知通道（仅限 Android）。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

删除通知通道（仅限 Android）。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

列出通知通道（仅限 Android）。

**返回值：** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

请求通知权限。

**返回值：** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotification) => void) => PluginListenerHandle
```

监听本地通知接收事件。

| 参数               | 类型                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"localNotificationReceived"</code>                                                   |
| **`listenerFunc`** | <code>(notification: <a href="#localnotification">LocalNotification</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: LocalNotificationActionPerformed) => void) => PluginListenerHandle
```

监听本地通知操作执行事件。

| 参数               | 类型                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"localNotificationActionPerformed"</code>                                                                                |
| **`listenerFunc`** | <code>(notificationAction: <a href="#localnotificationactionperformed">LocalNotificationActionPerformed</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器。

---

### 接口

#### LocalNotificationScheduleResult

#### LocalNotification

| 属性                   | 类型                                                                            | 描述                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**            | <code>string</code>                                                             | 通知标题                                                                                                                                                                         |
| **`body`**             | <code>string</code>                                                             | 通知正文                                                                                                                                                                         |
| **`id`**               | <code>number</code>                                                             | 通知 ID                                                                                                                                                                          |
| **`schedule`**         | <code><a href="#localnotificationschedule">LocalNotificationSchedule</a></code> | 调度设置                                                                                                                                                                         |
| **`sound`**            | <code>string</code>                                                             | 带扩展名的音频文件名。在 iOS 上，文件应在应用包中。在 Android 上，文件应在 res/raw 文件夹中。在 Android 26+（Android O 及更新版本）上无效，推荐格式为 .wav，因为两个平台都支持。 |
| **`smallIcon`**        | <code>string</code>                                                             | 仅限 Android：设置自定义状态栏图标。如果设置，将覆盖 capacitor.config.json 中的默认图标                                                                                          |
| **`iconColor`**        | <code>string</code>                                                             | 仅限 Android：设置通知图标的颜色                                                                                                                                                 |
| **`attachments`**      | <code>LocalNotificationAttachment[]</code>                                      | 附件                                                                                                                                                                             |
| **`actionTypeId`**     | <code>string</code>                                                             | 操作类型 ID                                                                                                                                                                      |
| **`extra`**            | <code>any</code>                                                                | 额外数据                                                                                                                                                                         |
| **`threadIdentifier`** | <code>string</code>                                                             | 仅限 iOS：设置通知分组的线程标识符                                                                                                                                               |
| **`summaryArgument`**  | <code>string</code>                                                             | 仅限 iOS 12+：设置通知分组的摘要参数                                                                                                                                             |
| **`group`**            | <code>string</code>                                                             | 仅限 Android：设置通知分组的组标识符，类似于 iOS 上的 threadIdentifier。                                                                                                         |
| **`groupSummary`**     | <code>boolean</code>                                                            | 仅限 Android：将此通知指定为组的摘要（应与 `group` 属性一起使用）。                                                                                                              |
| **`channelId`**        | <code>string</code>                                                             | 仅限 Android：设置生成本地通知的通知通道。如果具有给定名称的通道不存在，则通知不会触发。如果未提供，将使用默认通道。                                                             |
| **`ongoing`**          | <code>boolean</code>                                                            | 仅限 Android：设置通知为持续通知。如果设置为 true，通知无法被滑走。                                                                                                              |
| **`autoCancel`**       | <code>boolean</code>                                                            | 仅限 Android：设置在用户点击时自动移除通知                                                                                                                                       |

#### LocalNotificationSchedule

| 属性          | 类型                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`at`**      | <code><a href="#date">Date</a></code>                                                              |
| **`repeats`** | <code>boolean</code>                                                                               |
| **`every`**   | <code>"year" \| "month" \| "two-weeks" \| "week" \| "day" \| "hour" \| "minute" \| "second"</code> |
| **`count`**   | <code>number</code>                                                                                |
| **`on`**      | `{ year?: number; month?: number; day?: number; hour?: number; minute?: number; }`                 |

#### Date

支持日期和时间的基本存储和检索。

| 方法                   | 签名                                                                  | 描述                                                                                   |
| ---------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                       | 返回日期的字符串表示形式。字符串的格式取决于区域设置。                                 |
| **toDateString**       | () =&gt; string                                                       | 返回日期作为字符串值。                                                                 |
| **toTimeString**       | () =&gt; string                                                       | 返回时间作为字符串值。                                                                 |
| **toLocaleString**     | () =&gt; string                                                       | 返回适合主机环境当前区域设置的字符串值。                                               |
| **toLocaleDateString** | () =&gt; string                                                       | 返回适合主机环境当前区域设置的日期字符串值。                                           |
| **toLocaleTimeString** | () =&gt; string                                                       | 返回适合主机环境当前区域设置的时间字符串值。                                           |
| **valueOf**            | () =&gt; number                                                       | 返回存储的时间值，单位为自 1970 年 1 月 1 日 UTC 午夜以来的毫秒数。                    |
| **getTime**            | () =&gt; number                                                       | 获取以毫秒为单位的时间值。                                                             |
| **getFullYear**        | () =&gt; number                                                       | 获取年份，使用本地时间。                                                               |
| **getUTCFullYear**     | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取年份。                                                        |
| **getMonth**           | () =&gt; number                                                       | 获取月份，使用本地时间。                                                               |
| **getUTCMonth**        | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的月份。                        |
| **getDate**            | () =&gt; number                                                       | 获取月份中的日期，使用本地时间。                                                       |
| **getUTCDate**         | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取月份中的日期。                                                |
| **getDay**             | () =&gt; number                                                       | 获取星期几，使用本地时间。                                                             |
| **getUTCDay**          | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取星期几。                                                      |
| **getHours**           | () =&gt; number                                                       | 获取日期中的小时，使用本地时间。                                                       |
| **getUTCHours**        | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的小时值。                      |
| **getMinutes**         | () =&gt; number                                                       | 获取 <a href="#date">Date</a> 对象的分钟，使用本地时间。                               |
| **getUTCMinutes**      | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的分钟。                        |
| **getSeconds**         | () =&gt; number                                                       | 获取 <a href="#date">Date</a> 对象的秒，使用本地时间。                                 |
| **getUTCSeconds**      | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的秒。                          |
| **getMilliseconds**    | () =&gt; number                                                       | 获取 <a href="#date">Date</a> 的毫秒，使用本地时间。                                   |
| **getUTCMilliseconds** | () =&gt; number                                                       | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的毫秒。                        |
| **getTimezoneOffset**  | () =&gt; number                                                       | 获取本地计算机时间与协调世界时 (UTC) 之间的分钟差。                                    |
| **setTime**            | (time: number) =&gt; number                                           | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                   |
| **setMilliseconds**    | (ms: number) =&gt; number                                             | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。                             |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                             | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的毫秒值。                    |
| **setSeconds**         | (sec: number, ms?: number) =&gt; number                               | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。                               |
| **setUTCSeconds**      | (sec: number, ms?: number) =&gt; number                               | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的秒值。                      |
| **setMinutes**         | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。                             |
| **setUTCMinutes**      | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的分钟值。                    |
| **setHours**           | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。                             |
| **setUTCHours**        | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的小时值。                    |
| **setDate**            | (date: number) =&gt; number                                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份日期数值。                       |
| **setUTCDate**         | (date: number) =&gt; number                                           | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的月份日期。                  |
| **setMonth**           | (month: number, date?: number) =&gt; number                           | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。                             |
| **setUTCMonth**        | (month: number, date?: number) =&gt; number                           | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的月份值。                    |
| **setFullYear**        | (year: number, month?: number, date?: number) =&gt; number            | 使用本地时间设置 <a href="#date">Date</a> 对象的年份。                                 |
| **setUTCFullYear**     | (year: number, month?: number, date?: number) =&gt; number            | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的年份值。                    |
| **toUTCString**        | () =&gt; string                                                       | 返回使用协调世界时 (UTC) 转换的日期字符串。                                            |
| **toISOString**        | () =&gt; string                                                       | 以 ISO 格式返回日期字符串值。                                                          |
| **toJSON**             | (key?: any) =&gt; string                                              | 由 JSON.stringify 方法使用，以启用对象数据的 JavaScript 对象表示法 (JSON) 序列化转换。 |

#### LocalNotificationAttachment

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

| 属性        | 类型                 | 描述                       |
| ----------- | -------------------- | -------------------------- |
| **`value`** | <code>boolean</code> | 设备是否启用了本地通知功能 |

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
