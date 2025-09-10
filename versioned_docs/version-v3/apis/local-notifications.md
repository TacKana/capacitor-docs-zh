---
title: Local Notifications Capacitor Plugin API
description: 本地通知 API 提供了一种在设备本地调度通知的方式（即无需服务器发送推送通知）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: 本地通知
---

# @capacitor/local-notifications

本地通知 API 提供了一种在设备本地调度通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## 配置

<docgen-config>

在 Android 平台上，本地通知可以通过以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                | 版本  |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知默认的状态栏图标。图标应放置在应用的 `res/drawable` 目录中。该值应为可绘制资源 ID（即不带扩展名的文件名）。仅适用于 Android。                                                               | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                    | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认提示音。在 Android 26+ 上会设置默认通道提示音且无法更改，除非卸载应用。如果找不到音频文件，在 Android 21-25 上将播放默认系统提示音，在 Android 26+ 上则没有提示音。仅适用于 Android。 | 1.0.0 |

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
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav',
    },
  },
};

export default config;
```

</docgen-config>

## Doze 模式

如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到功能限制。如果您需要通知即使在 Doze 模式下也能触发，可以通过设置 `allowWhileIdle: true` 来调度通知。请谨慎使用 `allowWhileIdle`，因为这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

## API

<docgen-index>

- [`schedule(...)`](#schedule)
- [`getPending()`](#getpending)
- [`registerActionTypes(...)`](#registeractiontypes)
- [`cancel(...)`](#cancel)
- [`areEnabled()`](#areenabled)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions()`](#requestpermissions)
- [`addListener('localNotificationReceived', ...)`](#addlistenerlocalnotificationreceived-)
- [`addListener('localNotificationActionPerformed', ...)`](#addlistenerlocalnotificationactionperformed-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)
- [类型别名](#type-aliases)
- [枚举](#enums)

</docgen-index>

<docgen-api>

### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

<a href="#schedule">调度</a>一个或多个本地通知。

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**版本:** 1.0.0

---

### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回值:** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**版本:** 1.0.0

---

### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册通知显示时要执行的操作。

仅适用于 iOS 和 Android。

| 参数          | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**版本:** 1.0.0

---

### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理通知。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**版本:** 1.0.0

---

### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回值:** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**版本:** 1.0.0

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

创建通知通道。

仅适用于 Android。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本:** 1.0.0

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

删除通知通道。

仅适用于 Android。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本:** 1.0.0

---

### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知通道列表。

仅适用于 Android。

**返回值:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本:** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本:** 1.0.0

---

### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知显示事件。

| 参数               | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听通知操作执行事件。

| 参数               | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**版本:** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器。

**版本:** 1.0.0

---

### Interfaces

#### ScheduleResult

| 属性                | 类型                                       | 描述               | 版本  |
| ------------------- | ------------------------------------------ | ------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已调度的通知列表。 | 1.0.0 |

#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述         | 版本  |
| -------- | ------------------- | ------------ | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |

#### ScheduleOptions

| 属性                | 类型                                   | 描述               | 版本  |
| ------------------- | -------------------------------------- | ------------------ | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要调度的通知列表。 | 1.0.0 |

#### LocalNotificationSchema

| 属性                   | 类型                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                             | 版本  |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`title`**            | <code>string</code>                           | 通知标题。                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`body`**             | <code>string</code>                           | 通知正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`largeBody`**        | <code>string</code>                           | 设置多行文本块，以在大文本通知样式中显示。                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于设置收件箱和大文本通知样式中的摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | <a href="#schedule">调度</a>此通知在稍后时间触发。                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 显示此通知时播放的音频文件名。包含文件扩展名。在 iOS 上，文件应位于应用包中。在 Android 上，文件应位于 res/raw 目录中。推荐使用 `.wav` 格式，因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android &lt; 26。对于 Android 26+，请使用配置了所需提示音的 channelId。如果找不到声音文件（即空字符串或错误名称），将使用默认系统通知提示音。如果未提供，Android 上将播放默认提示音，iOS 上则无提示音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放在应用的 `res/drawable` 目录中。该值应为可绘制资源 ID（即不带扩展名的文件名）。仅适用于 Android。                                                                                                                                                                                                            | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 设置通知的大图标。图标应放在应用的 `res/drawable` 目录中。该值应为可绘制资源 ID（即不带扩展名的文件名）。仅适用于 Android。                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 为此通知设置附件。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 将此通知与操作类型关联。                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于分组多个通知。为 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 设置 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                          | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到类别摘要格式字符串的字符串。为 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 设置 `summaryArgument`。仅适用于 iOS 12+。                                                                                                                                                                                 | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于分组多个通知。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                    | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为一组通知的摘要。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()`。仅适用于 Android 且在使用 `group` 时。                                                                                                                                                  | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应传递的通道。如果不存在具有给定名称的通道，则通知不会触发。如果未提供，将使用默认通道。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()`。仅适用于 Android 26+。                                                                                                              | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知无法被滑动清除。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                   | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，当用户点击通知时将被取消。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                          | 1.0.0 |
| **`inboxList`**        | <code>string[]</code>                         | 设置要在收件箱样式通知中显示的字符串列表。最多允许 5 个字符串。仅适用于 Android。                                                                                                                                                                                                                                                                                                                | 1.0.0 |

#### Schedule

表示通知的调度配置。

使用 `at`、`on` 或 `every` 之一来调度通知。

| 属性                 | 类型                                              | 描述                                                                                                                                                                                                                                                                              | 版本  |
| -------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>             | <a href="#schedule">调度</a>在特定日期和时间通知。                                                                                                                                                                                                                                | 1.0.0 |
| **`repeats`**        | <code>boolean</code>                              | 按 `at` 指定的日期和时间重复传递此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                                                 | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>                              | 允许此通知在 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式下触发。仅适用于 Android 23+。注意这些通知每个应用每 9 分钟只能触发 [一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code> | <                                                                                                                                                                                                                                                                                 |
