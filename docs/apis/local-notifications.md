---
title: Local Notifications Capacitor 插件 API
description: Local Notifications API 提供了一种在本地调度设备通知的方法（即无需服务器发送推送通知）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: 本地通知
---

# @capacitor/local-notifications

Local Notifications API 提供了一种在本地调度设备通知的方法（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android

Android 13 需要进行权限检查才能发送通知。您需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，它不会显示提示，只会返回已授权状态。

从 Android 12 开始，除非在 `AndroidManifest.xml` 中添加以下权限，否则计划通知将不精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在该权限，用户仍可以从应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 检查该设置的值。如果用户禁用此设置，应用将重新启动，并且任何使用精确闹钟调度的通知都将被删除。如果您的应用依赖精确闹钟，请务必在应用启动时检查此设置（例如，在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中），以便提供备选方案或替代行为。

在 Android 14 中，有一个名为 `USE_EXACT_ALARM` 的新权限。使用此权限可以在无需向用户请求权限的情况下使用精确闹钟。这仅应在精确闹钟的使用对应用功能至关重要时使用。有关使用此权限的影响的更多信息，请参阅[此处](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM)。

从 Android 15 开始，用户可以在[私人空间](https://developer.android.com/about/versions/15/features#private-space)中安装应用。用户可以随时锁定其私人空间，这意味着推送通知在用户解锁之前不会显示。

无法检测应用是否安装在私人空间中。因此，如果您的应用显示任何关键通知，请告知用户避免将应用安装在私人空间中。

有关与私人空间相关的应用行为更改的更多信息，请参阅 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

在 Android 上，可以使用以下选项配置 Local Notifications：

| 属性（Prop）           | 类型（Type）                | 描述（Description）                                                                                                                                                                                                                                                                                                              | 起始版本（Since） |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`smallIcon`**        | <code>string</code>（字符串） | 设置通知的默认状态栏图标。图标应放置在应用的`res/drawable`文件夹中。此选项的取值应为可绘制资源 ID（即不带文件扩展名的文件名）。仅支持 Android 系统。                                                                     | 1.0.0 |
| **`iconColor`**        | <code>string</code>（字符串） | 设置通知状态栏图标的默认颜色。仅支持 Android 系统。                                                                                                                                                                                                                                 | 1.0.0 |
| **`sound`**            | <code>string</code>（字符串） | 设置通知的默认提示音。在 Android 8 及以上版本中，此属性会设置默认通知渠道的提示音，且除非卸载应用，否则无法修改该设置。若未找到指定的音频文件，在 Android 7.x 版本中会播放系统默认提示音，而在 Android 8 及以上版本中则无提示音。仅支持 Android 系统。 | 1.0.0 |

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

如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到功能限制。如果您需要在 Doze 模式下也能触发通知，请使用 `allowWhileIdle: true` 来调度通知。请谨慎使用 `allowWhileIdle`，因为这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

## API

<docgen-index>

- [`schedule(...)`](#schedule)
- [`getPending()`](#getpending)
- [`registerActionTypes(...)`](#registeractiontypes)
- [`cancel(...)`](#cancel)
- [`areEnabled()`](#areenabled)
- [`getDeliveredNotifications()`](#getdeliverednotifications)
- [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
- [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions()`](#requestpermissions)
- [`changeExactNotificationSetting()`](#changeexactnotificationsetting)
- [`checkExactNotificationSetting()`](#checkexactnotificationsetting)
- [`addListener('localNotificationReceived', ...)`](#addlistenerlocalnotificationreceived-)
- [`addListener('localNotificationActionPerformed', ...)`](#addlistenerlocalnotificationactionperformed-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)
- [类型别名](#type-aliases)
- [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

<a href="#schedule">调度</a>一个或多个本地通知。

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**始于：** 1.0.0

---

### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回值：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**始于：** 1.0.0

---

### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册在通知显示时要执行的操作。

仅适用于 iOS 和 Android。

| 参数          | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**始于：** 1.0.0

---

### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理的通知。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**始于：** 1.0.0

---

### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回值：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**始于：** 1.0.0

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回值：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**始于：** 4.0.0

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**始于：** 4.0.0

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**始于：** 4.0.0

---

### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知通道。

仅适用于 Android。

| 参数          | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**始于：** 1.0.0

---

### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知通道。

仅适用于 Android。

| 参数       | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**始于：** 1.0.0

---

### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知通道列表。

仅适用于 Android。

**返回值：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**始于：** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

---

### changeExactNotificationSetting()

```typescript
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

引导用户进入应用设置屏幕以配置精确闹钟。

如果用户将设置从授予更改为拒绝，应用将重新启动，并且任何使用精确闹钟调度的通知都将被删除。

在 Android < 12 上，用户不会被引导至应用设置屏幕，而是此函数将返回 `granted`。

仅适用于 Android。

**返回值：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**始于：** 6.0.0

---

### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

检查使用精确闹钟的应用设置。

仅适用于 Android。

**返回值：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**始于：** 6.0.0

---

### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

监听通知显示事件。

| 参数               | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

---

### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

监听在通知上执行操作的事件。

| 参数               | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**始于：** 1.0.0

---

### Interfaces

#### ScheduleResult

| 属性                | 类型                                       | 描述               | 始于  |
| ------------------- | ------------------------------------------ | ------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已调度的通知列表。 | 1.0.0 |

#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述         | 始于  |
| -------- | ------------------- | ------------ | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |

#### ScheduleOptions

| 属性                | 类型                                   | 描述               | 始于  |
| ------------------- | -------------------------------------- | ------------------ | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要调度的通知列表。 | 1.0.0 |

#### LocalNotificationSchema

| 属性（Prop）           | 类型（Type）                                  | 描述（Description）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 起始版本（Since） |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**            | <code>string</code>（字符串）                 | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`body`**             | <code>string</code>（字符串）                 | 通知的正文内容，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeBody`**        | <code>string</code>（字符串）                 | 设置多行文本块，用于在“大文本通知样式”中显示。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`summaryText`**      | <code>string</code>（字符串）                 | 用于在“收件箱通知样式”和“大文本通知样式”中设置摘要文本详情。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`id`**               | <code>number</code>（数字）                   | 通知的标识符。在Android系统中，它是一个32位整数，因此取值需在-2147483648至2147483647（含首尾值）之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | （通过<a href="#schedule">Schedule</a>配置）将通知安排在后续时间发送。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`sound`**            | <code>string</code>（字符串）                 | 通知显示时要播放的音频文件名，需包含文件扩展名。在iOS系统中，该文件需放在应用程序包（app bundle）内；在Android系统中，文件需放在res/raw文件夹中。推荐使用`.wav`格式，因为该格式同时支持iOS和Android。仅支持iOS系统及Android 7.x版本；对于Android 8及以上版本，需使用已配置所需声音的通知渠道ID（channelId）。若未找到声音文件（如传入空字符串或错误文件名），将使用系统默认通知声音；若未设置此属性，Android系统会播放默认声音，iOS系统则不播放声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>（字符串）                 | 设置自定义状态栏图标。若设置此属性，将覆盖Capacitor配置中的`smallIcon`选项。图标需放在应用的`res/drawable`文件夹中，此选项的取值应为可绘制资源ID（即不带扩展名的文件名）。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`largeIcon`**        | <code>string</code>（字符串）                 | 为通知设置大图标。图标需放在应用的`res/drawable`文件夹中，此选项的取值应为可绘制资源ID（即不带扩展名的文件名）。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`iconColor`**        | <code>string</code>（字符串）                 | 设置通知图标的颜色。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>（Attachment数组）   | 为此通知设置附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>（字符串）                 | 将某个操作类型与当前通知关联。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`extra`**            | <code>any</code>（任意类型）                  | 设置要存储在当前通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>（字符串）                 | 用于对多个通知进行分组。会为[`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent)（iOS系统通知内容类）设置`threadIdentifier`属性。仅支持iOS系统。                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>（字符串）                 | 此通知添加到“通知类别摘要格式字符串”中的文本。会为[`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent)（iOS系统通知内容类）设置`summaryArgument`属性。仅支持iOS系统。                                                                                                                                                                                                                                                                                                                                   | 1.0.0 |
| **`group`**            | <code>string</code>（字符串）                 | 用于对多个通知进行分组。会调用[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)（Android通知构建器类）的`setGroup()`方法，并传入此属性值。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`groupSummary`**     | <code>boolean</code>（布尔值）                | 若为`true`，此通知将成为一组通知的摘要。会调用[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)（Android通知构建器类）的`setGroupSummary()`方法，并传入此属性值。仅在Android系统中使用`group`属性时生效。                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`channelId`**        | <code>string</code>（字符串）                 | 指定通知应送达的渠道。若不存在具有指定名称的渠道，通知将不会发送；若未设置此属性，将使用默认渠道。会调用[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)（Android通知构建器类）的`setChannelId()`方法，并传入此属性值。仅支持Android 8及以上版本。                                                                                                                                                                                                                                                             | 1.0.0 |
| **`ongoing`**          | <code>boolean</code>（布尔值）                | 若为`true`，此通知无法通过滑动操作清除。会调用[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)（Android通知构建器类）的`setOngoing()`方法，并传入此属性值。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code>（布尔值）                | 若为`true`，用户点击通知后，通知将自动取消。会调用[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)（Android通知构建器类）的`setAutoCancel()`方法，并传入此属性值。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`inboxList`**        | <code>string[]</code>（字符串数组）           | 设置字符串列表，用于在“收件箱样式通知”中显示，最多允许包含5个字符串。仅支持Android系统。                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`silent`**           | <code>boolean</code>（布尔值）                | 若为`true`，应用在前台运行时，通知将不会显示。仅支持iOS系统。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 5.0.0 |

#### Schedule

表示通知的日程安排（调度规则）。

请使用 `at`、`on` 或 `every` 中的任意一个属性来安排通知（三者任选其一即可）。

| 属性（Prop）         | 类型（Type）                                          | 描述（Description）                                                                                                                                                                                                                                                                                             | 起始版本（Since） |
| -------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>                 | （通过<a href="#schedule">日程安排</a>）在特定的日期和时间发送通知。                                                                                                                                                                                                                                               | 1.0.0 |
| **`repeats`**        | <code>boolean</code>（布尔值）                        | 按照 `at` 指定的日期和时间重复发送此通知。仅支持 iOS 和 Android 系统。                                                                                                                                                                                                                                               | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>（布尔值）                        | 允许通知在设备处于[休眠模式（Doze）](https://developer.android.com/training/monitoring-device-state/doze-standby)时触发。请注意，此类通知[每个应用每 9 分钟仅能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)（注：链接内容为 Android 官方开发文档）。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>     | （通过<a href="#schedule">日程安排</a>）在特定的时间间隔（可多个）发送通知。此方式类似于安排 [cron 任务](https://en.wikipedia.org/wiki/Cron)（注：链接为 cron 任务调度机制的维基百科介绍）。仅支持 iOS 和 Android 系统。                                                                                             | 1.0.0 |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | （通过<a href="#schedule">日程安排</a>）在特定的时间间隔发送通知。                                                                                                                                                                                                                                                   | 1.0.0 |
| **`count`**          | <code>number</code>（数字）                           | 限制按 `every` 指定的时间间隔发送通知的总次数。                                                                                                                                                                                                                                                                    | 1.0.0 |


#### Date

启用日期和时间的基本存储和检索。

| 方法                   | 签名                                                                                                         | 描述                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | 返回日期的字符串表示形式。字符串的格式取决于区域设置。                                 |
| **toDateString**       | () =&gt; string                                                                                              | 返回日期作为字符串值。                                                                 |
| **toTimeString**       | () =&gt; string                                                                                              | 返回时间作为字符串值。                                                                 |
| **toLocaleString**     | () =&gt; string                                                                                              | 返回适合主机环境当前区域设置的字符串值。                                               |
| **toLocaleDateString** | () =&gt; string                                                                                              | 返回适合主机环境当前区域设置的日期字符串值。                                           |
| **toLocaleTimeString** | () =&gt; string                                                                                              | 返回适合主机环境当前区域设置的时间字符串值。                                           |
| **valueOf**            | () =&gt; number                                                                                              | 返回存储的时间值，自 1970 年 1 月 1 日 UTC 午夜以来的毫秒数。                          |
| **getTime**            | () =&gt; number                                                                                              | 获取时间值（毫秒）。                                                                   |
| **getFullYear**        | () =&gt; number                                                                                              | 获取年份（本地时间）。                                                                 |
| **getUTCFullYear**     | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取年份。                                                        |
| **getMonth**           | () =&gt; number                                                                                              | 获取月份（本地时间）。                                                                 |
| **getUTCMonth**        | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的月份。                        |
| **getDate**            | () =&gt; number                                                                                              | 获取月份中的日期（本地时间）。                                                         |
| **getUTCDate**         | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取月份中的日期。                                                |
| **getDay**             | () =&gt; number                                                                                              | 获取星期几（本地时间）。                                                               |
| **getUTCDay**          | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取星期几。                                                      |
| **getHours**           | () =&gt; number                                                                                              | 获取日期中的小时（本地时间）。                                                         |
| **getUTCHours**        | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的小时值。                      |
| **getMinutes**         | () =&gt; number                                                                                              | 获取 <a href="#date">Date</a> 对象的分钟（本地时间）。                                 |
| **getUTCMinutes**      | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的分钟。                        |
| **getSeconds**         | () =&gt; number                                                                                              | 获取 <a href="#date">Date</a> 对象的秒（本地时间）。                                   |
| **getUTCSeconds**      | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的秒。                          |
| **getMilliseconds**    | () =&gt; number                                                                                              | 获取 <a href="#date">Date</a> 的毫秒（本地时间）。                                     |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | 使用协调世界时 (UTC) 获取 <a href="#date">Date</a> 对象的毫秒。                        |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | 获取本地计算机时间与协调世界时 (UTC) 之间的分钟差。                                    |
| **setTime**            | (time: number) =&gt; number                                                                                  | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                   |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。                             |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的毫秒值。                    |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。                               |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的秒值。                      |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。                             |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的分钟值。                    |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。                             |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的小时值。                    |
| **setDate**            | (date: number) =&gt; number                                                                                  | 使用本地时间设置 <a href="#date">Date</a> 对象中的数字日期值。                         |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的数字日期值。                |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。                             |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的月份值。                    |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用本地时间设置 <a href="#date">Date</a> 对象的年份。                                 |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用协调世界时 (UTC) 设置 <a href="#date">Date</a> 对象中的年份值。                    |
| **toUTCString**        | () =&gt; string                                                                                              | 返回使用协调世界时 (UTC) 转换的日期字符串。                                            |
| **toISOString**        | () =&gt; string                                                                                              | 以 ISO 格式返回日期作为字符串值。                                                      |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | 由 JSON.stringify 方法使用，以启用对象数据的 JavaScript 对象表示法 (JSON) 序列化转换。 |

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

| 属性          | 类型                                                            | 描述                                                                                            | 始于  |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----- |
| **`id`**      | <code>string</code>                                             | 附件标识符。                                                                                    | 1.0.0 |
| **`url`**     | <code>string</code>                                             | 附件的 URL。使用 `res` 方案引用网络资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。 | 1.0.0 |
| **`options`** | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | <a href="#attachment">附件</a>选项。                                                            | 1.0.0 |

#### AttachmentOptions

| 属性                                                             | 类型                | 描述                                                                                                                                                                                                                  | 始于  |
| ---------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0 |

#### PendingResult

| 属性                | 类型                                          | 描述             | 始于  |
| ------------------- | --------------------------------------------- | ---------------- | ----- |
| **`notifications`** | <code>PendingLocalNotificationSchema[]</code> | 待处理通知列表。 | 1.0.0 |

#### PendingLocalNotificationSchema

| 属性           | 类型                                          | 描述                                               | 始于  |
| -------------- | --------------------------------------------- | -------------------------------------------------- | ----- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                       | 1.0.0 |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                       | 1.0.0 |
| **`id`**       | <code>number</code>                           | 通知标识符。                                       | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | <a href="#schedule">调度</a>此通知在稍后时间触发。 | 1.0.0 |
| **`extra`**    | <code>any</code>                              | 设置存储在此通知中的额外数据。                     | 1.0.0 |

#### RegisterActionTypesOptions

| 属性        | 类型                      | 描述                   | 始于  |
| ----------- | ------------------------- | ---------------------- | ----- |
| **`types`** | <code>ActionType[]</code> | 要注册的操作类型列表。 | 1.0.0 |

#### ActionType

操作的集合。

| 属性                                   | 类型                  | 描述                                                                                                                                                                        | 始于  |
| -------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的 ID。在通知中通过 `actionTypeId` 键引用。                                                                                                                         | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                                | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder`。仅适用于 iOS。      | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `customDismissAction`。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `allowInCarPlay`。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowTitle`。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowSubtitle`。仅适用于 iOS。 | 1.0.0 |

#### Action

显示通知时可以执行的操作。

| 属性                         | 类型                 | 描述                                                                                                                                                                                                 | 始于  |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。在 `'actionPerformed'` 事件中作为 `actionId` 引用。                                                                                                                                      | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                             | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `authenticationRequired`。仅适用于 iOS。                                  | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `foreground`。仅适用于 iOS。                                              | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `destructive`。仅适用于 iOS。                                             | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 而不是 `UNNotificationAction`。仅适用于 iOS。                                                                                                                   | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputButtonTitle`。仅当 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputPlaceholder`。仅当 `input` 为 `true` 时适用于 iOS。 | 1.0.0 |

#### CancelOptions

| 属性                | 类型                                       | 描述               | 始于  |
| ------------------- | ------------------------------------------ | ------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |

#### EnabledResult

| 属性        | 类型                 | 描述                     | 始于  |
| ----------- | -------------------- | ------------------------ | ----- |
| **`value`** | <code>boolean</code> | 设备是否启用了本地通知。 | 1.0.0 |

#### DeliveredNotifications

| 属性                | 类型                                       | 描述                       | 始于  |
| ------------------- | ------------------------------------------ | -------------------------- | ----- |
| **`notifications`** | <code>DeliveredNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |

#### DeliveredNotificationSchema

| 属性               | 类型                                          | 描述                                                         | 始于  |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------ | ----- |
| **`id`**           | <code>number</code>                           | 通知标识符。                                                 | 4.0.0 |
| **`tag`**          | <code>string</code>                           | 通知标签。仅适用于 Android。                                 | 4.0.0 |
| **`title`**        | <code>string</code>                           | 通知的标题。                                                 | 4.0.0 |
| **`body`**         | <code>string</code>                           | 通知的正文，显示在标题下方。                                 | 4.0.0 |
| **`group`**        | <code>string</code>                           | 通知的配置组。仅适用于 Android。                             | 4.0.0 |
| **`groupSummary`** | <code>boolean</code>                          | 如果此通知是一组通知的摘要，则为 true。仅适用于 Android。    | 4.0.0 |
| **`data`**         | <code>any</code>                              | 包含在通知负载中的任何附加数据。仅适用于 Android。           | 4.0.0 |
| **`extra`**        | <code>any</code>                              | 存储在此通知中的额外数据。仅适用于 iOS。                     | 4.0.0 |
| **`attachments`**  | <code>Attachment[]</code>                     | 此通知的附件。仅适用于 iOS。                                 | 1.0.0 |
| **`actionTypeId`** | <code>string</code>                           | 与此通知关联的<a href="#action">操作</a>类型。仅适用于 iOS。 | 4.0.0 |
| **`schedule`**     | <code><a href="#schedule">Schedule</a></code> | 用于触发此通知的<a href="#schedule">调度</a>。仅适用于 iOS。 | 4.0.0 |
| **`sound`**        | <code>string</code>                           | 显示通知时使用的声音。仅适用于 iOS。                         | 4.0.0 |

#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                              | 默认             | 始于  |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 通道标识符。                                                                                                                                                                      |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此通道的用户友好名称（向用户显示）。                                                                                                                                              |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此通道的描述（向用户显示）。                                                                                                                                                      |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 应为此通道发布的通知播放的声音。重要性至少为 `3` 的通知通道应具有声音。声音文件的文件名应相对于 Android 应用 `res/raw` 目录指定。如果未提供声音，或找不到声音文件，则不使用声音。 |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 此通道发布的通知的中断级别。                                                                                                                                                      | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 此通道发布的通知的可见性。此设置用于确定发布到此通道的通知是否出现在锁屏上，以及如果出现，是否以编辑形式显示。                                                                    |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 发布到此通道的通知是否应显示通知灯（在支持的设备上）。                                                                                                                            |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 发布到此通道的通知的灯光颜色。仅当在此通道上启用了灯光且设备支持时才受支持。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                           |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 发布到此通道的通知是否应振动。                                                                                                                                                    |                  | 1.0.0 |

#### ListChannelsResult

| 属性           | 类型                   | 描述           | 始于  |
| -------------- | ---------------------- | -------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 通知通道列表。 | 1.0.0 |

#### PermissionStatus

| 属性          | 类型                                                        | 描述                 | 始于  |
| ------------- | ----------------------------------------------------------- | -------------------- | ----- |
| **`display`** | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。 | 1.0.0 |

#### SettingsPermissionStatus

| 属性              | 类型                                                        | 描述                     | 始于  |
| ----------------- | ----------------------------------------------------------- | ------------------------ | ----- |
| **`exact_alarm`** | <code><a href="#permissionstate">PermissionState</a></code> | 使用精确闹钟的权限状态。 | 6.0.0 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ActionPerformed

| 属性               | 类型                                                                        | 描述                                                                     | 始于  |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----- |
| **`actionId`**     | <code>string</code>                                                         | 执行的操作的标识符。                                                     | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                         | 用户在通知上输入的值。仅在 iOS 上适用于将 `input` 设置为 `true` 的通知。 | 1.0.0 |
| **`notification`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知架构。                                                           | 1.0.0 |

### Type Aliases

#### ScheduleEvery

<code>'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'</code>

#### Importance

重要性级别。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>

#### Visibility

通知可见性。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

### Enums

#### Weekday

| 成员            | 值             |
| --------------- | -------------- |
| **`Sunday`**    | <code>1</code> |
| **`Monday`**    | <code>2</code> |
| **`Tuesday`**   | <code>3</code> |
| **`Wednesday`** | <code>4</code> |
| **`Thursday`**  | <code>5</code> |
| **`Friday`**    | <code>6</code> |
| **`Saturday`**  | <code>7</code> |

</docgen-api>
