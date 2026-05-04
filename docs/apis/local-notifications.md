---
title: Local Notifications Capacitor Plugin API
description: Local Notifications API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: Local Notifications
---

# @capacitor/local-notifications

Local Notifications API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授予状态。

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加以下权限，否则计划通知将不会是精确的：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在该权限，用户仍然可以从应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 来检查该设置的值。如果用户禁用了此设置，应用将重启，并且任何使用精确闹钟安排的通知都将被删除。如果你的应用依赖于精确闹钟，请务必在应用启动时（例如在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中）检查此设置，以便提供备用方案或替代行为。

在 Android 14 上，有一个名为 `USE_EXACT_ALARM` 的新权限。使用此权限可以在无需向用户请求权限的情况下使用精确闹钟。仅当精确闹钟的使用是你应用功能的核心时才应使用此权限。阅读更多关于使用此权限的影响 [这里](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM)。

从 Android 15 开始，用户可以在 [私密空间](https://developer.android.com/about/versions/15/features#private-space) 中安装应用。用户可以随时锁定其私密空间，这意味着推送通知在用户解锁之前不会显示。

无法检测应用是否安装在私密空间中。因此，如果你的应用显示任何关键通知，请告知用户避免将应用安装在私密空间中。

有关与应用私密空间相关的行为更改的更多信息，请参阅 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

在 Android 上，本地通知可以使用以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                                                                                                                 | 起始版本 |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`smallIcon`** | <code>string</code> | 设置通知的默认状态栏图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                         | 1.0.0    |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                                     | 1.0.0    |
| **`sound`**     | <code>string</code> | 设置通知的默认提示音。在 Android 8+ 上，它设置默认通道声音且除非卸载应用否则无法更改。如果未找到音频文件，在 Android 7.x 上将播放默认系统声音，在 Android 8+ 上将无声音。仅适用于 Android。                                                                                                          | 1.0.0    |

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

## 休眠模式

如果设备已进入 [休眠（Doze）模式](https://developer.android.com/training/monitoring-device-state/doze-standby)，你的应用可能会受到功能限制。如果你需要即使在休眠模式下也能触发通知，请使用 `allowWhileIdle: true` 来安排你的通知。请谨慎使用 `allowWhileIdle`，因为这些通知 [每个应用每 9 分钟只能触发一次。](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)

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
* [`changeExactNotificationSetting()`](#changeexactnotificationsetting)
* [`checkExactNotificationSetting()`](#checkexactnotificationsetting)
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

| 参数           | 类型                                                        |
| -------------- | ----------------------------------------------------------- |
| **`options`**  | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理的通知列表。

**返回值:** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册通知显示时要执行的操作。

仅适用于 iOS 和 Android。

| 参数           | 类型                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**自:** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理的通知。

| 参数           | 类型                                                    |
| -------------- | ------------------------------------------------------- |
| **`options`**  | <code><a href="#canceloptions">CancelOptions</a></code> |

**自:** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回值:** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自:** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕上移除指定的通知。

| 参数             | 类型                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| **`delivered`**  | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自:** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕上移除所有通知。

**自:** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android。

| 参数           | 类型                                        |
| -------------- | ------------------------------------------- |
| **`channel`**  | <code><a href="#channel">Channel</a></code> |

**自:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android。

| 参数        | 类型                         |
| ----------- | ---------------------------- |
| **`args`**  | <code>{ id: string; }</code> |

**自:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知渠道列表。

仅适用于 Android。

**返回值:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### changeExactNotificationSetting()

```typescript
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

引导用户进入应用设置屏幕以配置精确闹钟。

如果用户将设置从“授予”更改为“拒绝”，应用将重启，并且任何使用精确闹钟调度的通知将被删除。

在 Android &lt; 12 上，用户将不会被引导到应用设置屏幕，而是此函数将返回 `granted`。

仅适用于 Android。

**返回值:** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**自:** 6.0.0

--------------------


### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

检查应用是否设置了使用精确闹钟。

仅适用于 Android。

**返回值:** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**自:** 6.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

监听通知显示事件。

| 参数               | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自:** 1.0.0

--------------------

### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

监听通知上的操作被执行时的事件。

| 参数                 | 类型                                                                                         |
| -------------------- | -------------------------------------------------------------------------------------------- |
| **`eventName`**      | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`**   | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**自版本：** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                  | 类型                                       | 描述                       | 自版本 |
| --------------------- | ------------------------------------------ | -------------------------- | ----- |
| **`notifications`**   | <code>LocalNotificationDescriptor[]</code> | 已计划通知的列表。         | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性      | 类型                | 描述                 | 自版本 |
| --------- | ------------------- | -------------------- | ----- |
| **`id`**  | <code>number</code> | 通知标识符。         | 1.0.0 |


#### ScheduleOptions

| 属性                  | 类型                                   | 描述                     | 自版本 |
| --------------------- | -------------------------------------- | ------------------------ | ----- |
| **`notifications`**   | <code>LocalNotificationSchema[]</code> | 要计划的通知列表。       | 1.0.0 |

#### 本地通知模式 {#localnotificationschema}

| 属性                 | 类型                                          | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 版本   |
| -------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`title`**          | <code>string</code>                           | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0  |
| **`body`**           | <code>string</code>                           | 通知正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0  |
| **`largeBody`**      | <code>string</code>                           | 设置多行文本块，以大文本通知样式显示。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0  |
| **`summaryText`**    | <code>string</code>                           | 用于在收件箱和大文本通知样式中设置摘要文本详情。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0  |
| **`id`**             | <code>number</code>                           | 通知标识符。在 Android 上为 32 位整数，因此取值应在 -2147483648 到 2147483647 之间（含边界值）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0  |
| **`schedule`**       | <code><a href="#schedule">Schedule</a></code> | 将通知<a href="#schedule">安排</a>在稍后时间发送。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0  |
| **`sound`**          | <code>string</code>                           | 显示此通知时播放的音频文件名。需包含文件扩展名。在 iOS 上，文件应位于应用包中；在 Android 上，文件应位于 res/raw 文件夹中。推荐使用 .wav 格式，因为 iOS 和 Android 均支持。仅适用于 iOS 和 Android 7.x。对于 Android 8+，请使用配置了所需声音的 channelId。如果未找到声音文件（例如空字符串或错误名称），则使用默认系统通知音。如果未提供此属性，在 Android 上将产生默认声音，在 iOS 上则无声音。                                                                                              | 1.0.0  |
| **`smallIcon`**      | <code>string</code>                           | 设置自定义状态栏图标。如果设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0  |
| **`largeIcon`**      | <code>string</code>                           | 为通知设置大图标。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0  || **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 为此通知设置附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 为此通知关联一个操作类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于对多个通知进行分组。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到分类摘要格式字符串中的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于对多个通知进行分组。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上使用提供的值调用 `setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为一组通知的摘要。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上使用提供的值调用 `setGroupSummary()`。仅在 Android 上使用 `group` 时可用。                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应发送到的通道。如果给定名称的通道不存在，则通知不会触发。如果未提供，将使用默认通道。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上使用提供的值调用 `setChannelId()`。仅适用于 Android 8+。                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知将无法被滑动清除。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上使用提供的值调用 `setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，当用户点击通知时，通知将被取消。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上使用提供的值调用 `setAutoCancel()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 || **`inboxList`**        | <code>string[]</code>                         | 设置一个字符串列表，用于以收件箱风格显示通知。最多允许 5 个字符串。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`silent`**           | <code>boolean</code>                          | 如果为 true，当应用处于前台时，通知将不会显示。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 5.0.0 |

#### 计划（Schedule）

表示通知的计划安排。

可以使用 `at`、`on` 或 `every` 来安排通知。

| 属性                 | 类型                                                    | 描述                                                                                                                                                                                                                                                                                             | 引入版本 |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`at`**             | <code><a href="#date">Date</a></code>                   | 在特定日期和时间<a href="#schedule">计划</a>通知。                                                                                                                                                                                                                            | 1.0.0    |
| **`repeats`**        | <code>boolean</code>                                    | 在 `at` 指定的日期和时间重复发送此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                        | 1.0.0    |
| **`allowWhileIdle`** | <code>boolean</code>                                    | 允许此通知在 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby)（休眠）模式下触发。请注意，这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0    |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>       | 在特定时间间隔<a href="#schedule">计划</a>通知。这类似于安排 [cron](https://en.wikipedia.org/wiki/Cron) 任务。仅适用于 iOS 和 Android。                                                                                                           | 1.0.0    |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | 在特定时间间隔<a href="#schedule">计划</a>通知。                                                                                                                                                                                                                               | 1.0.0    |
| **`count`**          | <code>number</code>                                     | 限制按 `every` 指定的间隔发送通知的次数。                                                                                                                                                                                                                | 1.0.0    |

#### Date

提供日期和时间的基本存储与检索功能。| 方法                 | 签名                                                                                                         | 描述                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () => string                                                                                                 | 返回日期的字符串表示形式。字符串格式取决于语言环境。                                                                                  |
| **toDateString**       | () => string                                                                                                 | 以字符串形式返回日期值。                                                                                                               |
| **toTimeString**       | () => string                                                                                                 | 以字符串形式返回时间值。                                                                                                               |
| **toLocaleString**     | () => string                                                                                                 | 返回适合主机环境当前语言环境的字符串值。                                                                                              |
| **toLocaleDateString** | () => string                                                                                                 | 返回适合主机环境当前语言环境的日期字符串值。                                                                                          |
| **toLocaleTimeString** | () => string                                                                                                 | 返回适合主机环境当前语言环境的时间字符串值。                                                                                          |
| **valueOf**            | () => number                                                                                                 | 返回自 UTC 1970年1月1日午夜以来存储的时间值（毫秒）。                                                                                 |
| **getTime**            | () => number                                                                                                 | 获取时间值（毫秒）。                                                                                                                   |
| **getFullYear**        | () => number                                                                                                 | 使用本地时间获取年份。                                                                                                                 |
| **getUTCFullYear**     | () => number                                                                                                 | 使用协调世界时 (UTC) 获取年份。                                                                                                        |
| **getMonth**           | () => number                                                                                                 | 使用本地时间获取月份。                                                                                                                 |
| **getUTCMonth**        | () => number                                                                                                 | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的月份。                                                                         |
| **getDate**            | () => number                                                                                                 | 使用本地时间获取月份中的日期。                                                                                                         |
| **getUTCDate**         | () => number                                                                                                 | 使用协调世界时 (UTC) 获取月份中的日期。                                                                                                |
| **getDay**             | () => number                                                                                                 | 使用本地时间获取星期几。                                                                                                               |
| **getUTCDay**          | () => number                                                                                                 | 使用协调世界时 (UTC) 获取星期几。                                                                                                      |
| **getHours**           | () => number                                                                                                 | 使用本地时间获取日期中的小时数。                                                                                                       |
| **getUTCHours**        | () => number                                                                                                 | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的小时值。                                                                       |
| **getMinutes**         | () => number                                                                                                 | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟数。                                                                                |
| **getUTCMinutes**      | () => number                                                                                                 | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的分钟数。                                                                       |
| **getSeconds**         | () => number                                                                                                 | 使用本地时间获取 <a href="#date">Date</a> 对象的秒数。                                                                                  |
| **getUTCSeconds**      | () => number                                                                                                 | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的秒数。                                                                         |
| **getMilliseconds**    | () => number                                                                                                 | 使用本地时间获取 <a href="#date">Date</a> 的毫秒数。                                                                                    |
| **getUTCMilliseconds** | () => number                                                                                                 | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的毫秒数。                                                                       |
| **getTimezoneOffset**  | () => number                                                                                                 | 获取本地计算机时间与协调世界时 (UTC) 之间的分钟差。                                                                                    |
| **setTime**            | (time: number) => number                                                                                     | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                                                                    || **setMilliseconds**    | (ms: number) => number                                                                                    | 使用本地时间设置 <a href="#date">Date</a> 对象的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) => number                                                                                    | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) => number                                                         | 使用本地时间设置 <a href="#date">Date</a> 对象的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) => number                                                         | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的秒值。                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) => number                              | 使用本地时间设置 <a href="#date">Date</a> 对象的分钟值。                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) => number                              | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的分钟值。                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) => number | 使用本地时间设置 <a href="#date">Date</a> 对象的小时值。                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) => number | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的小时值。                                     |
| **setDate**            | (date: number) => number                                                                                  | 使用本地时间设置 <a href="#date">Date</a> 对象中月份的天数（数值）。                                        |
| **setUTCDate**         | (date: number) => number                                                                                  | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象中月份的天数。                        |
| **setMonth**           | (month: number, date?: number \| undefined) => number                                                     | 使用本地时间设置 <a href="#date">Date</a> 对象的月份值。                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) => number                                                     | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的月份值。                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) => number                         | 使用本地时间设置 <a href="#date">Date</a> 对象的年份值。                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) => number                         | 使用世界协调时间（UTC）设置 <a href="#date">Date</a> 对象的年份值。                                      |
| **toUTCString**        | () => string                                                                                              | 返回使用世界协调时间（UTC）转换的日期字符串。                                                            |
| **toISOString**        | () => string                                                                                              | 返回 ISO 格式的日期字符串值。                                                                                         |
| **toJSON**             | (key?: any) => string                                                                                     | 供 JSON.stringify 方法使用，以便将对象数据转换为 JavaScript 对象表示法（JSON）序列化格式。 |

#### ScheduleOn

| 属性          | 类型                                        |
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

| 属性          | 类型                                                            | 描述                                                                                                                           | 引入版本 |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**      | <code>string</code>                                             | 附件标识符。                                                                                                            | 1.0.0 |
| **`url`**     | <code>string</code>                                             | 附件的 URL。使用 `res` 协议引用 web 资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。 | 1.0.0 |
| **`options`** | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | <a href="#attachment">附件</a> 配置选项。                                                                                         | 1.0.0 |

#### AttachmentOptions

| 属性                                                             | 类型                | 描述                                                                                                                                                                                                                                   | 引入版本 |
| ---------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 可哈希选项中的 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 设置 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 可哈希选项中的 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0 |

#### PendingResult

| 属性                | 类型                                          | 描述                        | 引入版本 |
| ------------------- | --------------------------------------------- | ---------------------------------- | ----- |
| **`notifications`** | <code>PendingLocalNotificationSchema[]</code> | 待处理通知的列表。 | 1.0.0 |

#### PendingLocalNotificationSchema

| 属性           | 类型                                          | 描述                                                          | 引入版本 |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------- | ----- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                       | 1.0.0 |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                 | 1.0.0 |
| **`id`**       | <code>number</code>                           | 通知标识符。                                         | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 为通知设定一个<a href="#schedule">计划</a>，以便稍后触发。 | 1.0.0 |
| **`extra`**    | <code>any</code>                              | 设置要存储在此通知中的额外数据。                    | 1.0.0 |

#### RegisterActionTypesOptions

| 属性        | 类型                      | 描述                           | 引入版本 |
| ----------- | ------------------------- | ------------------------------------- | ----- |
| **`types`** | <code>ActionType[]</code> | 要注册的操作类型列表。 | 1.0.0 |

#### ActionType

一组操作（actions）的集合。

| 属性                                   | 类型                  | 描述                                                                                                                                                                                     | 起始版本 |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的 ID。在通知中通过 `actionTypeId` 键引用。                                                                                                               | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                           | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder` 属性。仅适用于 iOS。             | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `customDismissAction` 属性。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `allowInCarPlay` 属性。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `hiddenPreviewsShowTitle` 属性。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `hiddenPreviewsShowSubtitle` 属性。仅适用于 iOS。 | 1.0.0 |


#### Action

当通知显示时可以执行的操作。

| 属性                         | 类型                 | 描述                                                                                                                                                                                                     | 起始版本 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。在 `'actionPerformed'` 事件中作为 `actionId` 引用。                                                                                                                               | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                      | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `authenticationRequired` 属性。仅适用于 iOS。                         | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `foreground` 属性。仅适用于 iOS。                                     | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `destructive` 属性。仅适用于 iOS。                                    | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 代替 `UNNotificationAction`。仅适用于 iOS。                                                                                                              | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 设置 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 的 `textInputButtonTitle` 属性。仅当 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 设置 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 的 `textInputPlaceholder` 属性。仅当 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |


#### CancelOptions

| 属性                | 类型                                       | 描述                          | 起始版本 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |


#### EnabledResult

| 属性        | 类型                 | 描述                                                | 起始版本 |
| ----------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 设备是否启用了本地通知。 | 1.0.0 |


#### DeliveredNotifications

| 属性                | 类型                                       | 描述                                                         | 起始版本 |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>DeliveredNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |

#### DeliveredNotificationSchema

| 属性                  | 类型                                          | 说明                                                                                              | 始于版本 |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------- |
| **`id`**              | <code>number</code>                           | 通知标识符。                                                                                      | 4.0.0    |
| **`tag`**             | <code>string</code>                           | 通知标签。仅适用于 Android。                                                                      | 4.0.0    |
| **`title`**           | <code>string</code>                           | 通知的标题。                                                                                      | 4.0.0    |
| **`body`**            | <code>string</code>                           | 通知的正文内容，显示在标题下方。                                                                  | 4.0.0    |
| **`group`**           | <code>string</code>                           | 通知配置的分组。仅适用于 Android。                                                                | 4.0.0    |
| **`groupSummary`**    | <code>boolean</code>                          | 此通知是否为一组通知的摘要。仅适用于 Android。                                                    | 4.0.0    |
| **`data`**            | <code>any</code>                              | 通知负载中包含的任何附加数据。仅适用于 Android。                                                  | 4.0.0    |
| **`extra`**           | <code>any</code>                              | 存储在此通知中的额外数据。仅适用于 iOS。                                                          | 4.0.0    |
| **`attachments`**     | <code>Attachment[]</code>                     | 此通知的附件。仅适用于 iOS。                                                                      | 1.0.0    |
| **`actionTypeId`**    | <code>string</code>                           | 与此通知关联的<a href="#action">操作</a>类型。仅适用于 iOS。                                      | 4.0.0    |
| **`schedule`**        | <code><a href="#schedule">Schedule</a></code> | 触发此通知所使用的<a href="#schedule">调度</a>方式。仅适用于 iOS。                                | 4.0.0    |
| **`sound`**           | <code>string</code>                           | 通知显示时播放的声音。仅适用于 iOS。                                                              | 4.0.0    |

#### Channel

| 属性              | 类型                                              | 说明                                                                                                                                                                                                                                                              | 默认值           | 始于版本 |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                                      |                  | 1.0.0    |
| **`name`**        | <code>string</code>                               | 此渠道的用户友好名称（呈现给用户）。                                                                                                                                                                                                                              |                  | 1.0.0    |
| **`description`** | <code>string</code>                               | 此渠道的描述（呈现给用户）。                                                                                                                                                                                                                                      |                  | 1.0.0    |
| **`sound`**       | <code>string</code>                               | 发布到此渠道的通知应播放的声音。重要性至少为 `3` 的通知渠道应具有声音。声音文件的文件名应相对于 Android 应用 `res/raw` 目录指定。如果未提供声音或找不到声音文件，则不会使用声音。                                                                                 |                  | 1.0.0    |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此渠道的通知的打断级别。                                                                                                                                                                                                                                    | <code>`3`</code> | 1.0.0    |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 发布到此渠道的通知的可见性。此设置控制发布到此渠道的通知是否出现在锁屏上，以及如果出现，是否以摘要形式显示。                                                                                                                                                      |                  | 1.0.0    |
| **`lights`**      | <code>boolean</code>                              | 发布到此渠道的通知在支持的设备上是否显示通知灯。                                                                                                                                                                                                                  |                  | 1.0.0    |
| **`lightColor`**  | <code>string</code>                               | 发布到此渠道的通知的灯光颜色。仅当此渠道启用了灯光且设备支持时才有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                                 |                  | 1.0.0    |
| **`vibration`**   | <code>boolean</code>                              | 发布到此渠道的通知是否振动。                                                                                                                                                                                                                                      |                  | 1.0.0    |

#### ListChannelsResult

| 属性             | 类型                       | 描述                 | 始于   |
| ---------------- | -------------------------- | -------------------- | ------ |
| **`channels`**   | <code>Channel[]</code>     | 通知渠道列表。       | 1.0.0  |


#### PermissionStatus

| 属性            | 类型                                                        | 描述                     | 始于   |
| --------------- | ----------------------------------------------------------- | ------------------------ | ------ |
| **`display`**   | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。     | 1.0.0  |


#### SettingsPermissionStatus

| 属性                | 类型                                                        | 描述                     | 始于   |
| ------------------- | ----------------------------------------------------------- | ------------------------ | ------ |
| **`exact_alarm`**   | <code><a href="#permissionstate">PermissionState</a></code> | 使用精确闹钟的权限状态。 | 6.0.0  |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ActionPerformed

| 属性                 | 类型                                                                        | 描述                                                                                                                              | 始于   |
| -------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`actionId`**       | <code>string</code>                                                         | 已执行操作的标识符。                                                                                                              | 1.0.0  |
| **`inputValue`**     | <code>string</code>                                                         | 用户在通知中输入的值。仅在 iOS 上且通知设置了 `input` 为 `true` 时可用。                                                          | 1.0.0  |
| **`notification`**   | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知结构。                                                                                                                    | 1.0.0  |


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

| 成员               | 值              |
| ------------------ | --------------- |
| **`Sunday`**       | <code>1</code>  |
| **`Monday`**       | <code>2</code>  |
| **`Tuesday`**      | <code>3</code>  |
| **`Wednesday`**    | <code>4</code>  |
| **`Thursday`**     | <code>5</code>  |
| **`Friday`**       | <code>6</code>  |
| **`Saturday`**     | <code>7</code>  |

<span id="addlistenerlocalnotificationactionperformed-"></span>
<span id="date"></span>
<span id="listchannelsresult"></span>
<span id="localnotificationschema"></span>
<span id="schedule"></span>
<span id="scheduleon"></span>
<span id="addlistenerlocalnotificationactionperformed-"></span>
<span id="date"></span>
<span id="listchannelsresult"></span>
<span id="localnotificationschema"></span>
<span id="schedule"></span>
<span id="scheduleon"></span>
<span id="addlistenerlocalnotificationactionperformed-"></span>
<span id="date"></span>
<span id="listchannelsresult"></span>
<span id="localnotificationschema"></span>
<span id="schedule"></span>
<span id="scheduleon"></span>
<span id="addlistenerlocalnotificationactionperformed-"></span>
<span id="date"></span>
<span id="listchannelsresult"></span>
<span id="localnotificationschema"></span>
<span id="schedule"></span>
<span id="scheduleon"></span>
<span id="addlistenerlocalnotificationactionperformed-"></span>
<span id="date"></span>
<span id="listchannelsresult"></span>
<span id="localnotificationschema"></span>
<span id="schedule"></span>
<span id="scheduleon"></span>
</docgen-api>