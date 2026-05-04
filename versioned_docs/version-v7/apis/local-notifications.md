---
title: Local Notifications Capacitor Plugin API
description: Local Notifications API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/local-notifications/src/definitions.ts
sidebar_label: Local Notifications
---

# @capacitor/local-notifications

Local Notifications API 提供了一种在本地调度设备通知的方式（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications@latest-7
npx cap sync
```

## Android

Android 13 需要权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授权状态。

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加以下权限，否则调度的通知不会精确触发：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍可以从应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 检查此设置的值。如果用户禁用此设置，应用将重启，并且任何使用精确闹钟调度的通知都将被删除。如果您的应用依赖精确闹钟，请务必在应用启动时（例如，在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中）检查此设置，以便提供回退方案或替代行为。

在 Android 14 中，有一个名为 `USE_EXACT_ALARM` 的新权限。使用此权限可以在无需向用户请求权限的情况下使用精确闹钟。仅当精确闹钟的使用是您应用功能的核心时才应使用此权限。有关使用此权限的更多信息，请参阅[此处](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM)。

从 Android 15 开始，用户可以在[私人空间](https://developer.android.com/about/versions/15/features#private-space)中安装应用。用户可以随时锁定其私人空间，这意味着推送通知在用户解锁之前不会显示。

无法检测应用是否安装在私人空间中。因此，如果您的应用显示任何关键通知，请告知用户避免将应用安装在私人空间中。

有关与应用私人空间相关的行为更改的更多信息，请参阅 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

在 Android 上，本地通知可以使用以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                              | 自版本 |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知的默认状态栏图标。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                              | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认提示音。在 Android 26+ 上，它设置默认通道声音，除非卸载应用，否则无法更改。如果找不到音频文件，在 Android 21-25 上将播放默认系统声音，在 Android 26+ 上将没有声音。仅适用于 Android。                                                                                                                                                                                                         | 1.0.0 |

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

如果设备已进入[休眠](https://developer.android.com/training/monitoring-device-state/doze-standby)模式，您的应用可能会受到能力限制。如果您需要即使在休眠期间也能触发通知，请使用 `allowWhileIdle: true` 来调度您的通知。请谨慎使用 `allowWhileIdle`，因为[每个应用每 9 分钟只能触发一次此类通知](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

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

| 参数         | 类型                                                        |
| ------------ | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回值：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册通知显示时要执行的操作。

仅在 iOS 和 Android 上可用。

| 参数         | 类型                                                                              |
| ------------ | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**自：** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理通知。

| 参数         | 类型                                                    |
| ------------ | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**自：** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知功能是否已启用。

**返回值：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**自：** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕移除指定通知。

| 参数           | 类型                                                                      |
| -------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**自：** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕移除所有通知。

**自：** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅在 Android 上可用。

| 参数         | 类型                                        |
| ------------ | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**自：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅在 Android 上可用。

| 参数      | 类型                         |
| --------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**自：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知渠道列表。

仅在 Android 上可用。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### changeExactNotificationSetting()

```typescript
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

引导用户前往应用设置屏幕配置精确闹钟。

如果用户将设置从“授予”更改为“拒绝”，应用将重启，并且任何使用精确闹钟调度的通知将被删除。

在 Android < 12 上，用户将不会被引导至应用设置屏幕，此函数将直接返回 `granted`。

仅在 Android 上可用。

**返回值：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**自：** 6.0.0

--------------------


### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

检查应用使用精确闹钟的设置。

仅在 Android 上可用。

**返回值：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**自：** 6.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

监听通知显示事件。

| 参数              | 类型                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**   | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------

### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

监听用户对通知执行操作时触发的事件。

| 参数               | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**自：** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                 | 类型                                       | 描述                       | 自 |
| ------------------- | ------------------------------------------ | ------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已安排的通知列表。         | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述               | 自 |
| -------- | ------------------- | ------------------ | ----- |
| **`id`** | <code>number</code> | 通知标识符。       | 1.0.0 |


#### ScheduleOptions

| 属性                 | 类型                                   | 描述                     | 自 |
| ------------------- | -------------------------------------- | ----------------------- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要安排的通知列表。       | 1.0.0 |

#### LocalNotificationSchema

| 属性                  | 类型                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 起始版本 |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`title`**           | <code>string</code>                           | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0    |
| **`body`**            | <code>string</code>                           | 通知的正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0    |
| **`largeBody`**       | <code>string</code>                           | 设置多行文本块，用于以大文本通知样式显示。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0    |
| **`summaryText`**     | <code>string</code>                           | 用于在收件箱和大文本通知样式中设置摘要文本细节。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0    |
| **`id`**              | <code>number</code>                           | 通知标识符。在 Android 上，它是一个 32 位整数。因此，值应在 -2147483648 到 2147483647 之间（包含边界）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0    |
| **`schedule`**        | <code><a href="#schedule">Schedule</a></code> | 为通知<a href="#schedule">设置定时</a>，以便在稍后时间触发。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0    |
| **`sound`**           | <code>string</code>                           | 显示此通知时要播放的音频文件名称。文件名需包含扩展名。在 iOS 上，文件应位于应用包中。在 Android 上，文件应位于 res/raw 文件夹中。建议使用 `.wav` 格式，因为 iOS 和 Android 均支持此格式。仅适用于 iOS 和 Android < 26。对于 Android 26+，请使用配置了所需声音的 channelId。如果未找到声音文件（例如空字符串或错误名称），将使用默认的系统通知声音。如果未提供，在 Android 上会产生默认声音，在 iOS 上则没有声音。                                                                                                                                                                                                               | 1.0.0    |
| **`smallIcon`**       | <code>string</code>                           | 设置自定义状态栏图标。如果设置，此选项将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0    |
| **`largeIcon`**       | <code>string</code>                           | 为通知设置大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0    || **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 设置此通知的附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 将操作类型与此通知关联。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置要存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于对多个通知进行分组。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>                           | 此通知添加到类别摘要格式字符串的字符串。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`group`**            | <code>string</code>                           | 用于对多个通知进行分组。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()` 并传入提供的值。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>                          | 如果为 true，此通知将成为一组通知的摘要。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()` 并传入提供的值。仅适用于 Android，且在使用 `group` 参数时有效。                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`channelId`**        | <code>string</code>                           | 指定通知应传递到的通道。如果具有给定名称的通道不存在，则通知不会触发。如果未提供，将使用默认通道。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()` 并传入提供的值。仅适用于 Android 26+。                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>                          | 如果为 true，通知将无法被滑动清除。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()` 并传入提供的值。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>                          | 如果为 true，当用户点击通知时，通知将被取消。在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()` 并传入提供的值。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 || **`inboxList`**        | <code>string[]</code>                         | 设置一个字符串列表，用于以收件箱样式显示通知。最多允许5个字符串。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`silent`**           | <code>boolean</code>                          | 如果为 true，当应用处于前台时，通知将不会显示。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 5.0.0 |

#### 定时设置

表示通知的定时计划。

使用 `at`、`on` 或 `every` 来设定通知的定时计划。

| 属性                 | 类型                                                    | 说明                                                                                                                                                                                                                                                                                                                             | 起始版本 |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>                   | 在特定的日期和时间<a href="#schedule">安排</a>通知。                                                                                                                                                                                                                                                            | 1.0.0 |
| **`repeats`**        | <code>boolean</code>                                    | 在 `at` 指定的日期和时间重复发送此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                                                        | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>                                    | 允许此通知在设备处于[Doze模式](https://developer.android.com/training/monitoring-device-state/doze-standby)时触发。仅适用于 Android 23+。请注意，这些通知[每个应用每9分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>       | 在特定的时间间隔<a href="#schedule">安排</a>通知。这类似于调度 [cron](https://en.wikipedia.org/wiki/Cron) 任务。仅适用于 iOS 和 Android。                                                                                                                                           | 1.0.0 |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | 按特定的时间间隔<a href="#schedule">安排</a>通知。                                                                                                                                                                                                                                                               | 1.0.0 |
| **`count`**          | <code>number</code>                                     | 限制按 `every` 指定的间隔发送通知的次数。                                                                                                                                                                                                                                                | 1.0.0 |

#### 日期 {#date}

提供日期和时间的基本存储与检索功能。| 方法                 | 签名                                                                                                        | 描述                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | 返回日期的字符串表示形式。字符串的格式取决于区域设置。                                              |
| **toDateString**       | () =&gt; string                                                                                              | 将日期以字符串值的形式返回。                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | 将时间以字符串值的形式返回。                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | 根据主机环境的当前区域设置，以适当的字符串值返回。                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | 根据主机环境的当前区域设置，以适当的字符串值返回日期。                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | 根据主机环境的当前区域设置，以适当的字符串值返回时间。                                                  |
| **valueOf**            | () =&gt; number                                                                                              | 返回自 1970 年 1 月 1 日午夜（UTC）以来的毫秒时间值。                                                      |
| **getTime**            | () =&gt; number                                                                                              | 获取时间的毫秒值。                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | 使用本地时间获取年份。                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取年份。                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | 使用本地时间获取月份。                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的月份。                                             |
| **getDate**            | () =&gt; number                                                                                              | 使用本地时间获取月份中的第几天。                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取月份中的第几天。                                                                      |
| **getDay**             | () =&gt; number                                                                                              | 使用本地时间获取星期几。                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取星期几。                                                                        |
| **getHours**           | () =&gt; number                                                                                              | 使用本地时间获取日期中的小时数。                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的小时值。                                       |
| **getMinutes**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟数。                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的分钟数。                                           |
| **getSeconds**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的秒数。                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的秒数。                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 的毫秒数。                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的毫秒数。                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | 获取本地计算机时间与协调世界时（UTC）之间的分钟差。                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                                                    || **setMilliseconds**    | (ms: number) => number                                                                                    | 使用本地时间设置<a href="#date">Date</a>对象中的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) => number                                                                                    | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) => number                                                         | 使用本地时间设置<a href="#date">Date</a>对象中的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) => number                                                         | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的秒值。                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) => number                              | 使用本地时间设置<a href="#date">Date</a>对象中的分钟值。                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) => number                              | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的分钟值。                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) => number | 使用本地时间设置<a href="#date">Date</a>对象中的小时值。                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) => number | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的小时值。                                     |
| **setDate**            | (date: number) => number                                                                                  | 使用本地时间设置<a href="#date">Date</a>对象中月份中的日期（1-31）。                                        |
| **setUTCDate**         | (date: number) => number                                                                                  | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中月份中的日期（1-31）。                        |
| **setMonth**           | (month: number, date?: number \| undefined) => number                                                     | 使用本地时间设置<a href="#date">Date</a>对象中的月份值（0-11）。                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) => number                                                     | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的月份值（0-11）。                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) => number                         | 使用本地时间设置<a href="#date">Date</a>对象中的年份值。                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) => number                         | 使用协调世界时（UTC）设置<a href="#date">Date</a>对象中的年份值。                                      |
| **toUTCString**        | () => string                                                                                              | 返回一个使用协调世界时（UTC）转换的日期字符串。                                                            |
| **toISOString**        | () => string                                                                                              | 返回一个ISO格式的日期字符串值。                                                                                         |
| **toJSON**             | (key?: any) => string                                                                                     | 由JSON.stringify方法使用，以启用对象数据的转换，用于JavaScript对象表示法（JSON）序列化。 |

#### ScheduleOn

| 属性           | 类型                                        |
| -------------- | ------------------------------------------- |
| **`year`**     | <code>number</code>                         |
| **`month`**    | <code>number</code>                         |
| **`day`**      | <code>number</code>                         |
| **`weekday`**  | <code><a href="#weekday">Weekday</a></code> |
| **`hour`**     | <code>number</code>                         |
| **`minute`**   | <code>number</code>                         |
| **`second`**   | <code>number</code>                         |


#### Attachment

表示一个通知附件。

| 属性           | 类型                                                            | 描述                                                                                                                                 | 始于版本 |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **`id`**       | <code>string</code>                                             | 附件标识符。                                                                                                                         | 1.0.0    |
| **`url`**      | <code>string</code>                                             | 附件的 URL。使用 `res` 协议来引用 web 资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。                                   | 1.0.0    |
| **`options`**  | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | <a href="#attachment">Attachment</a> 选项。                                                                                          | 1.0.0    |


#### AttachmentOptions

| 属性                                                                                 | 类型                | 描述                                                                                                                                                                                                                                   | 始于版本 |
| ------------------------------------------------------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项字典中设置 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0    |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项字典中设置 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0    |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项字典中设置 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0    |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项字典中设置 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0    |


#### PendingResult

| 属性                  | 类型                                          | 描述                 | 始于版本 |
| --------------------- | --------------------------------------------- | -------------------- | -------- |
| **`notifications`**   | <code>PendingLocalNotificationSchema[]</code> | 待处理通知的列表。   | 1.0.0    |


#### PendingLocalNotificationSchema

| 属性           | 类型                                          | 描述                                                           | 始于版本 |
| -------------- | --------------------------------------------- | -------------------------------------------------------------- | -------- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                                   | 1.0.0    |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                                   | 1.0.0    |
| **`id`**       | <code>number</code>                           | 通知标识符。                                                   | 1.0.0    |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 为此通知<a href="#schedule">Schedule</a>稍后触发的计划。       | 1.0.0    |
| **`extra`**    | <code>any</code>                              | 设置要存储在此通知中的额外数据。                               | 1.0.0    |


#### RegisterActionTypesOptions

| 属性         | 类型                      | 描述                       | 始于版本 |
| ------------ | ------------------------- | -------------------------- | -------- |
| **`types`**  | <code>ActionType[]</code> | 要注册的操作类型列表。     | 1.0.0    |

#### ActionType

操作类型的集合。

| 属性                                   | 类型                  | 说明                                                                                                                                                                                     | 引入版本 |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的标识符。在通知中通过 `actionTypeId` 键引用。                                                                                                               | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                           | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder`。仅适用于 iOS。             | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `customDismissAction`。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `allowInCarPlay`。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `hiddenPreviewsShowTitle`。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 选项中的 `hiddenPreviewsShowSubtitle`。仅适用于 iOS。 | 1.0.0 |


#### Action

显示通知时可执行的操作。

| 属性                         | 类型                 | 说明                                                                                                                                                                                                     | 引入版本 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。在 `'actionPerformed'` 事件中作为 `actionId` 引用。                                                                                                                               | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                      | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `authenticationRequired`。仅适用于 iOS。                         | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `foreground`。仅适用于 iOS。                                     | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 设置 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 选项中的 `destructive`。仅适用于 iOS。                                    | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 替代 `UNNotificationAction`。仅适用于 iOS。                                                                                                              | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 设置 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上的 `textInputButtonTitle`。仅适用于 iOS 且当 `input` 为 `true` 时。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 设置 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上的 `textInputPlaceholder`。仅适用于 iOS 且当 `input` 为 `true` 时。 | 1.0.0 |


#### CancelOptions

| 属性                | 类型                                       | 说明                          | 引入版本 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |


#### EnabledResult

| 属性        | 类型                 | 说明                                                | 引入版本 |
| ----------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 设备是否已启用本地通知。 | 1.0.0 |


#### DeliveredNotifications

| 属性                | 类型                                       | 说明                                                         | 引入版本 |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>DeliveredNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |

#### DeliveredNotificationSchema

| 属性               | 类型                                          | 描述                                                                                     | 起始版本 |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| **`id`**           | <code>number</code>                           | 通知标识符。                                                                             | 4.0.0    |
| **`tag`**          | <code>string</code>                           | 通知标签。仅适用于 Android。                                                             | 4.0.0    |
| **`title`**        | <code>string</code>                           | 通知标题。                                                                               | 4.0.0    |
| **`body`**         | <code>string</code>                           | 通知正文内容，显示在标题下方。                                                           | 4.0.0    |
| **`group`**        | <code>string</code>                           | 通知所属的配置组。仅适用于 Android。                                                     | 4.0.0    |
| **`groupSummary`** | <code>boolean</code>                          | 此通知是否为通知组的摘要。仅适用于 Android。                                             | 4.0.0    |
| **`data`**         | <code>any</code>                              | 通知负载中包含的任何附加数据。仅适用于 Android。                                         | 4.0.0    |
| **`extra`**        | <code>any</code>                              | 存储在此通知中的额外数据。仅适用于 iOS。                                                 | 4.0.0    |
| **`attachments`**  | <code>Attachment[]</code>                     | 此通知的附件。仅适用于 iOS。                                                             | 1.0.0    |
| **`actionTypeId`** | <code>string</code>                           | 与此通知关联的<a href="#action">操作</a>类型。仅适用于 iOS。                             | 4.0.0    |
| **`schedule`**     | <code><a href="#schedule">Schedule</a></code> | 触发此通知所使用的<a href="#schedule">计划</a>。仅适用于 iOS。                           | 4.0.0    |
| **`sound`**        | <code>string</code>                           | 通知显示时播放的声音。仅适用于 iOS。                                                     | 4.0.0    |


#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                                                                                                          | 默认值           | 起始版本 |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| **`id`**          | <code>string</code>                               | 通道标识符。                                                                                                                                                                                                                                                                                                                                  |                  | 1.0.0    |
| **`name`**        | <code>string</code>                               | 此通道的用户友好名称（展示给用户）。                                                                                                                                                                                                                                                                                                          |                  | 1.0.0    |
| **`description`** | <code>string</code>                               | 此通道的描述（展示给用户）。                                                                                                                                                                                                                                                                                                                  |                  | 1.0.0    |
| **`sound`**       | <code>string</code>                               | 发布到此通道的通知应播放的声音。重要性至少为 `3` 的通知通道应具有声音。声音文件名应相对于 Android 应用 `res/raw` 目录指定。如果未提供声音或未找到声音文件，则不会使用声音。                                                                                                                                                                    |                  | 1.0.0    |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此通道的通知的干扰级别。                                                                                                                                                                                                                                                                                                                | <code>`3`</code> | 1.0.0    |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 发布到此通道的通知的可见性。此设置控制发布到此通道的通知是否显示在锁屏界面上，以及如果显示，是否以脱敏形式呈现。                                                                                                                                                                                                                              |                  | 1.0.0    |
| **`lights`**      | <code>boolean</code>                              | 发布到此通道的通知在支持此功能的设备上是否显示通知灯。                                                                                                                                                                                                                                                                                        |                  | 1.0.0    |
| **`lightColor`**  | <code>string</code>                               | 发布到此通道的通知的灯光颜色。仅当此通道启用了灯光且设备支持时才有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                                                                                                             |                  | 1.0.0    |
| **`vibration`**   | <code>boolean</code>                              | 发布到此通道的通知是否振动。                                                                                                                                                                                                                                                                                                                  |                  | 1.0.0    |

#### ListChannelsResult

| 属性             | 类型                       | 描述                 | 始于   |
| ---------------- | -------------------------- | -------------------- | ------ |
| **`channels`**   | <code>Channel[]</code>     | 通知渠道列表。       | 1.0.0  |


#### PermissionStatus

| 属性            | 类型                                                        | 描述                   | 始于   |
| --------------- | ----------------------------------------------------------- | ---------------------- | ------ |
| **`display`**   | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。   | 1.0.0  |


#### SettingsPermissionStatus

| 属性                | 类型                                                        | 描述                 | 始于   |
| ------------------- | ----------------------------------------------------------- | -------------------- | ------ |
| **`exact_alarm`**   | <code><a href="#permissionstate">PermissionState</a></code> | 使用精确闹钟的权限状态。 | 6.0.0  |


#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ActionPerformed

| 属性                 | 类型                                                                        | 描述                                                                                                            | 始于   |
| -------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| **`actionId`**       | <code>string</code>                                                         | 已执行操作的标识符。                                                                                           | 1.0.0  |
| **`inputValue`**     | <code>string</code>                                                         | 用户在通知上输入的值。仅适用于 iOS 上设置了 `input` 为 `true` 的通知。                                          | 1.0.0  |
| **`notification`**   | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知模式。                                                                                                 | 1.0.0  |


### 类型别名


#### ScheduleEvery

<code>'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'</code>


#### Importance

重要性级别。更多详情，请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。更多详情，请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### 枚举


#### Weekday

| 成员             | 值              |
| ---------------- | --------------- |
| **`Sunday`**     | <code>1</code>  |
| **`Monday`**     | <code>2</code>  |
| **`Tuesday`**    | <code>3</code>  |
| **`Wednesday`**  | <code>4</code>  |
| **`Thursday`**   | <code>5</code>  |
| **`Friday`**     | <code>6</code>  |
| **`Saturday`**   | <code>7</code>  |

</docgen-api>