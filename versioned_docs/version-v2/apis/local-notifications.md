---
title: Local Notifications
description: 本地通知 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/local-notifications
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# 本地通知

本地通知 API 提供了调度"本地"通知的能力——这些通知由设备本身调度和发送，不同于从服务器推送的"远程"通知。

本地通知非常适合以下场景：当用户再次打开应用时提醒他们应用发生的变化、提供提醒功能、或在应用未处于前台时传递离线信息。



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
      body: '内容',
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) },
      sound: null,
      attachments: null,
      actionTypeId: '',
      extra: null,
    },
  ],
});
console.log('已调度通知', notifs);
```

## 本地通知配置（仅Android）

在 `capacitor.config.json` 中可为 Android 平台添加以下本地通知插件配置项：

- `smallIcon`: 设置本地通知的默认图标
- `iconColor`: 设置本地通知图标的默认颜色
- `sound`: 设置默认通知音效。在 Android 26+ 系统上会设置默认通道音效且无法更改，除非卸载应用

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

| 参数          | 类型                                                 |
| ------------- | ---------------------------------------------------- |
| **`options`** | `{ notifications: LocalNotification[]; }` |

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

| 参数          | 类型                                                   |
| ------------- | ------------------------------------------------------ |
| **`options`** | `{ types: LocalNotificationActionType[]; }` |

---

### cancel(...)

```typescript
cancel(pending: LocalNotificationPendingList) => Promise<void>
```

| 参数          | 类型                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`pending`** | <code><a href="#localnotificationpendinglist">LocalNotificationPendingList</a></code> |

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

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> |

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

| 参数               | 类型                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"localNotificationReceived"</code>                                                   |
| **`listenerFunc`** | <code>(notification: <a href="#localnotification">LocalNotification</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: LocalNotificationActionPerformed) => void) => PluginListenerHandle
```

| 参数               | 类型                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>"localNotificationActionPerformed"</code>                                                                                |
| **`listenerFunc`** | <code>(notificationAction: <a href="#localnotificationactionperformed">LocalNotificationActionPerformed</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件所有原生监听器

---

### 接口

#### LocalNotificationScheduleResult

#### LocalNotification

| 属性                   | 类型                                                                            | 说明                                                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`title`**            | <code>string</code>                                                             | 通知标题                                                                                                                                                                                                                                                        |
| **`body`**             | <code>string</code>                                                             | 通知内容                                                                                                                                                                                                                                                        |
| **`id`**               | <code>number</code>                                                             | 通知ID                                                                                                                                                                                                                                                          |
| **`schedule`**         | <code><a href="#localnotificationschedule">LocalNotificationSchedule</a></code> | 调度设置                                                                                                                                                                                                                                                        |
| **`sound`**            | <code>string</code>                                                             | 音频文件名（带扩展名）。iOS需将文件放在应用包中，Android需放在res/raw目录下。Android 26+版本（O及以上）无效，推荐使用.wav格式（双平台兼容）                                                                                                                     |
| **`smallIcon`**        | <code>string</code>                                                             | 仅Android：自定义状态栏图标。若设置则覆盖capacitor.config.json中的默认图标                                                                                                                                                                                      |
| **`iconColor`**        | <code>string</code>                                                             | 仅Android：设置通知图标颜色                                                                                                                                                                                                                                     |
| **`attachments`**      | <code>LocalNotificationAttachment[]</code>                                      | 附件                                                                                                                                                                                                                                                            |
| **`actionTypeId`**     | <code>string</code>                                                             | 操作类型ID                                                                                                                                                                                                                                                      |
| **`extra`**            | <code>any</code>                                                                | 附加数据                                                                                                                                                                                                                                                        |
| **`threadIdentifier`** | <code>string</code>                                                             | 仅iOS：设置通知分组标识符                                                                                                                                                                                                                                       |
| **`summaryArgument`**  | <code>string</code>                                                             | 仅iOS 12+：设置通知分组的摘要参数                                                                                                                                                                                                                               |
| **`group`**            | <code>string</code>                                                             | 仅Android：设置通知分组标识符（类似iOS的threadIdentifier）                                                                                                                                                                                                      |
| **`groupSummary`**     | <code>boolean</code>                                                            | 仅Android：将该通知设为分组摘要（需与`group`属性配合使用）                                                                                                                                                                                                      |
| **`channelId`**        | <code>string</code>                                                             | 仅Android：设置生成本地通知的通道。如果指定名称的通道不存在则不会触发通知。若未提供则使用默认通道                                                                                                                                                               |
| **`ongoing`**          | <code>boolean</code>                                                            | 仅Android：设置持续通知。设为true后通知无法被滑动清除                                                                                                                                                                                                           |
| **`autoCancel`**       | <code>boolean</code>                                                            | 仅Android：设置点击通知后自动取消                                                                                                                                                                                                                               |

#### LocalNotificationSchedule

| 属性          | 类型                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **`at`**      | <code><a href="#date">Date</a></code>                                                              |
| **`repeats`** | <code>boolean</code>                                                                               |
| **`every`**   | <code>"year" \| "month" \| "two-weeks" \| "week" \| "day" \| "hour" \| "minute" \| "second"</code> |
| **`count`**   | <code>number</code>                                                                                |
| **`on`**      | `{ year?: number; month?: number; day?: number; hour?: number; minute?: number; }`      |

#### Date

提供日期和时间的基本存储与检索功能。

| 方法                 | 签名                                                             | 说明                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                       | 返回日期字符串表示（格式取决于区域设置）                                                                                        |
| **toDateString**       | () =&gt; string                                                       | 返回日期部分的字符串值                                                                                                          |
| **toTimeString**       | () =&gt; string                                                       | 返回时间部分的字符串值                                                                                                          |
| **toLocaleString**     | () =&gt; string                                                       | 根据当前区域设置返回字符串值                                                                                                    |
| **toLocaleDateString** | () =&gt; string                                                       | 根据当前区域设置返回日期部分的字符串值                                                                                          |
| **toLocaleTimeString** | () =&gt; string                                                       | 根据当前区域设置返回时间部分的字符串值                                                                                          |
| **valueOf**            | () =&gt; number                                                       | 返回自1970年1月1日UTC午夜以来的毫秒数                                                                                           |
| **getTime**            | () =&gt; number                                                       | 获取毫秒时间值                                                                                                                  |
| **getFullYear**        | () =&gt; number                                                       | 获取本地时间的年份                                                                                                              |
| **getUTCFullYear**     | () =&gt; number                                                       | 获取UTC时间的年份                                                                                                               |
| **getMonth**           | () =&gt; number                                                       | 获取本地时间的月份                                                                                                              |
| **getUTCMonth**        | () =&gt; number                                                       | 获取UTC时间的月份                                                                                                               |
| **getDate**            | () =&gt; number                                                       | 获取本地时间的日期                                                                                                              |
| **getUTCDate**         | () =&gt; number                                                       | 获取UTC时间的日期                                                                                                               |
| **getDay**             | () =&gt; number                                                       | 获取本地时间的星期                                                                                                              |
| **getUTCDay**          | () =&gt; number                                                       | 获取UTC时间的星期                                                                                                               |
| **getHours**           | () =&gt; number                                                       | 获取本地时间的小时                                                                                                              |
| **getUTCHours**        | () =&gt; number                                                       | 获取UTC时间的小时                                                                                                               |
| **getMinutes**         | () =&gt; number                                                       | 获取本地时间的分钟                                                                                                              |
| **getUTCMinutes**      | () =&gt; number                                                       | 获取UTC时间的分钟                                                                                                               |
| **getSeconds**         | () =&gt; number                                                       | 获取本地时间的秒数                                                                                                              |
| **getUTCSeconds**      | () =&gt; number                                                       | 获取UTC时间的秒数                                                                                                               |
| **getMilliseconds**    | () =&gt; number                                                       | 获取本地时间的毫秒                                                                                                              |
| **getUTCMilliseconds** | () =&gt; number                                                       | 获取UTC时间的毫秒                                                                                                               |
| **getTimezoneOffset**  | () =&gt; number                                                       | 获取本地时间与UTC时间的分钟差                                                                                                   |
| **setTime**            | (time: number) =&gt; number                                           | 设置Date对象的日期时间值                                                                                                        |
| **setMilliseconds**    | (ms: number) =&gt; number                                             | 使用本地时间设置毫秒值                                                                                                          |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                             | 使用UTC时间设置毫秒值                                                                                                           |
| **setSeconds**         | (sec: number, ms?: number) =&gt; number                               | 使用本地时间设置秒数                                                                                                            |
| **setUTCSeconds**      | (sec: number, ms?: number) =&gt; number                               | 使用UTC时间设置秒数                                                                                                             |
| **setMinutes**         | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用本地时间设置分钟                                                                                                            |
| **setUTCMinutes**      | (min: number, sec?: number, ms?: number) =&gt; number                 | 使用UTC时间设置分钟                                                                                                             |
| **setHours**           | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用本地时间设置小时                                                                                                            |
| **setUTCHours**        | (hours: number, min?: number, sec?: number, ms?: number) =&gt; number | 使用UTC时间设置小时                                                                                                             |
| **setDate**            | (date: number) =&gt; number                                           | 使用本地时间设置日期                                                                                                            |
| **setUTCDate**         | (date: number) =&gt; number                                           | 使用UTC时间设置日期                                                                                                             |
| **setMonth**           | (month: number, date?: number) =&gt; number                           | 使用本地时间设置月份                                                                                                            |
| **setUTCMonth**        | (month: number, date?: number) =&gt; number                           | 使用UTC时间设置月份                                                                                                             |
| **setFullYear**        | (year: number, month?: number, date?: number) =&gt; number            | 使用本地时间设置年份                                                                                                            |
| **setUTCFullYear**     | (year: number, month?: number, date?: number) =&gt; number            | 使用UTC时间设置年份                                                                                                             |
| **toUTCString**        | () =&gt; string                                                       | 返回UTC格式的日期字符串                                                                                                         |
| **toISOString**        | () =&gt; string                                                       | 返回ISO格式的日期字符串值                                                                                                       |
| **toJSON**             | (key?: any) =&gt; string                                              | 供JSON.stringify方法使用，用于对象数据的JSON序列化转换                                                                          |

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
| **`id`**                     | <code>string