---
title: Local Notifications Capacitor 插件 API
description: Local Notifications API 提供了一种在本地安排设备通知的方法（即无需服务器发送推送通知）。
translated: true
custom_edit_url: https://github.com/ionic-team/capacitor-local-notifications/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-local-notifications/blob/main/src/definitions.ts
sidebar_label: 本地通知
source_hash: 50eb6cb6
---

# @capacitor/local-notifications

Local Notifications API 提供了一种在本地安排设备通知的方法（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，将直接返回已授权。

从 Android 12 开始，除非将此权限添加到 `AndroidManifest.xml`，否则计划的通知不会是精确的：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在此权限，用户仍然可以从应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 来检查组件的值。如果用户禁用了此设置，应用将重新启动，并且任何使用精确闹钟安排的通知都将被删除。如果你的应用依赖于精确闹钟，请确保在应用启动时检查此设置（例如，在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中），以提供回退或替代行为。

在 Android 14 上，有一个名为 `USE_EXACT_ALARM` 的新权限。使用此权限无需向用户请求权限即可使用精确闹钟。仅当精确闹钟的使用对你的应用功能至关重要时，才应使用此权限。在此处阅读有关使用此权限的更多信息[这里](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM)。

从 Android 15 开始，用户可以在[私人空间](https://developer.android.com/about/versions/15/features#private-space)中安装应用。用户可以随时锁定其私人空间，这意味着推送通知在用户解锁之前不会显示。

无法检测应用是否安装在私人空间中。因此，如果你的应用显示任何关键通知，请告知用户避免在私人空间中安装应用。

有关应用在私人空间方面行为变化的更多信息，请参考 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

## 配置

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

本地通知可以通过以下选项进行配置：

| 属性                      | 类型                                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                    | Since |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`**           | <code>string</code>                                | 设置通知的默认状态栏图标。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**           | <code>string</code>                                | 设置通知状态栏图标的默认颜色。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`sound`**               | <code>string</code>                                | 设置通知的默认提示音。Android 8+ 会设置默认通知渠道的声音；除非卸载应用，否则无法更改。如果音频文件不存在，Android 7.x 会播放默认系统通知声音，而 Android 8+ 不会播放声音。仅适用于 Android。 | 1.0.0 |
| **`presentationOptions`** | <code>LocalNotificationPresentationOption[]</code> | 这是一个可组合的字符串数组。数组中的可选值包括：`badge`：更新应用图标上的角标计数（默认值）；`sound`：收到通知时设备会响铃/振动；`banner`：通知显示为横幅；`list`：通知显示在通知中心中。如果不需要任何选项，可以提供空数组。仅适用于 iOS。 | 8.2.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav",
      "presentationOptions": ["badge", "sound", "banner", "list"]
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
      presentationOptions: ["badge", "sound", "banner", "list"],
    },
  },
};

export default config;
```

</docgen-config>

## Doze（低电耗模式）

如果设备已进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，你的应用可能具有受限的功能。如果你需要在 Doze 模式下也能触发通知，请使用 `allowWhileIdle: true` 安排通知。谨慎使用 `allowWhileIdle`，因为这些通知[每个应用每 9 分钟只能触发一次。](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)

## 错误

从 8.3.0 版本开始，插件会在 Android 和 iOS 上返回结构化错误。每个错误都包含一个 `code`（例如 `OS-PLUG-LNOT-0001`）和一条便于理解的 `message`。错误码 0001、0002、0005、0006、0011 和 0012 在两个平台上的含义相同；其他错误码均为特定平台所用。

| 错误码 | 平台 | 描述 |
|---|---|---|
| OS-PLUG-LNOT-0001 | Android, iOS | 必须通过 `notifications` 选项提供 notifications 数组。 |
| OS-PLUG-LNOT-0002 | Android, iOS | 通知缺少标识符。 |
| OS-PLUG-LNOT-0003 | iOS | 无法构建通知内容。 |
| OS-PLUG-LNOT-0004 | iOS | 无法创建通知，触发器构建失败。 |
| OS-PLUG-LNOT-0005 | Android, iOS | 此设备上未启用通知。 |
| OS-PLUG-LNOT-0006 | Android, iOS | 提供的颜色无效。必须是十六进制字符串（例如 #ff0000）。 |
| OS-PLUG-LNOT-0007 | Android | 提供的通知格式无效。 |
| OS-PLUG-LNOT-0008 | Android | 传给插件的日期格式无效。 |
| OS-PLUG-LNOT-0009 | Android | 标识符必须是 32 位整数。 |
| OS-PLUG-LNOT-0010 | iOS | 无法安排通知。 |
| OS-PLUG-LNOT-0011 | Android, iOS | notifications 应为通知对象列表。 |
| OS-PLUG-LNOT-0012 | Android, iOS | 必须提供 ids 数组。 |
| OS-PLUG-LNOT-0013 | iOS | 无法请求通知权限。 |
| OS-PLUG-LNOT-0014 | Android | 传给插件的 JSON 对象无效。 |
| OS-PLUG-LNOT-0015 | Android | 渠道缺少标识符。 |
| OS-PLUG-LNOT-0016 | Android | 渠道缺少名称。 |
| OS-PLUG-LNOT-0017 | Android | 权限不足，无法安排精确闹钟；已改为安排不精确闹钟。 |
| OS-PLUG-LNOT-0018 | Android | 权限不足，无法安排精确闹钟。 |

## API

<docgen-index>

* [`schedule(...)`](#schedule)
* [`update(...)`](#update)
* [`getPending()`](#getpending)
* [`registerActionTypes(...)`](#registeractiontypes)
* [`cancel(...)`](#cancel)
* [`cancelAll()`](#cancelall)
* [`areEnabled()`](#areenabled)
* [`getDeliveredNotifications()`](#getdeliverednotifications)
* [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
* [`removeDeliveredNotificationsById(...)`](#removedeliverednotificationsbyid)
* [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
* [`getByIds(...)`](#getbyids)
* [`getAll(...)`](#getall)
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
* [Interfaces](#接口)
* [Type Aliases](#类型别名)
* [Enums](#枚举)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

安排一个或多个本地通知（使用 <a href="#schedule">Schedule</a>）。

从 8.3.0 版本开始，如果尚未授予所需的通知权限，此方法会在安排通知前请求该权限（Android 13+ 的 `POST_NOTIFICATIONS` 权限，以及 iOS 的 `UNUserNotificationCenter` 授权）。已事先调用 `requestPermissions()` 的应用不受影响。

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### update(...)

```typescript
update(options: ScheduleOptions) => Promise<ScheduleResult>
```

更新一个或多个先前安排的本地通知，并按 `id` 匹配。

当前未安排的通知 `id` 会被忽略。与 `schedule` 一样，如果需要，此方法会请求通知权限。

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**Since:** 8.3.0

--------------------

### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知的列表。

**返回：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册在显示通知时要执行的操作。

仅适用于 iOS 和 Android。

| 参数         | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**Since:** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理的通知。

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**Since:** 1.0.0

--------------------


### cancelAll()

```typescript
cancelAll() => Promise<void>
```

取消所有待处理（已安排）的通知。

**Since:** 8.3.0

--------------------

### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否已启用。

**返回：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**Since:** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**Since:** 4.0.0

--------------------


### removeDeliveredNotificationsById(...)

```typescript
removeDeliveredNotificationsById(options: RemoveByIdsOptions) => Promise<void>
```

从通知中心移除指定的已投递通知，并按 `id` 匹配。

这是 `removeDeliveredNotifications` 的按 ID 操作对应方法，因此只持有标识符的调用方（例如 OutSystems 的 `ClearNotifications` 操作）可以通过一次方法调用完成映射。

| 参数         | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#removebyidsoptions">RemoveByIdsOptions</a></code> |

**Since:** 8.3.0

--------------------

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**Since:** 4.0.0

--------------------


### getByIds(...)

```typescript
getByIds(options: GetByIdsOptions) => Promise<GetNotificationsResult>
```

获取与所提供标识符匹配的通知，无论它们仍处于已安排（待处理）状态，还是已经投递。

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#getbyidsoptions">GetByIdsOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#getnotificationsresult">GetNotificationsResult</a>&gt;</code>

**Since:** 8.3.0

--------------------


### getAll(...)

```typescript
getAll(options?: GetAllOptions | undefined) => Promise<GetNotificationsResult>
```

获取插件已知的所有通知，可选择按状态筛选。

省略 `state` 时，会同时返回已安排和已投递的通知。`SCHEDULED` 返回待处理通知；`TRIGGERED` 返回已投递通知。

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#getalloptions">GetAllOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#getnotificationsresult">GetNotificationsResult</a>&gt;</code>

**Since:** 8.3.0

--------------------

### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**Since:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**Since:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知渠道列表。

仅适用于 Android。

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### changeExactNotificationSetting()

```typescript
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

引导用户进入应用设置屏幕以配置精确闹钟。

如果用户将设置从已授权更改为拒绝，应用
将重新启动，任何使用精确闹钟安排的通知将被删除。

在 Android &lt; 12 上，用户**不会**被引导到应用设置屏幕，此函数将
返回 `granted`。

仅适用于 Android。

**返回：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**Since:** 6.0.0

--------------------


### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

检查使用精确闹钟的应用设置。

仅适用于 Android。

**返回：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**Since:** 6.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

监听通知显示时的事件。

| 参数              | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

监听在通知上执行操作时的事件。

| 参数              | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**Since:** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                | 类型                                       | 描述                          | Since |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已安排的通知列表。 | 1.0.0 |
| **`warning`**       | <code><a href="#schedulewarning">ScheduleWarning</a></code> | 当本次调用中至少有一条通知的 `isExactNotification` 为 `true`（默认值），但未获得精确闹钟权限时设置：该通知会改为以不精确闹钟安排。`update()` 调用不会设置此字段；如果所有适用通知均按所请求的精确程度安排，也不会设置此字段。 | 8.3.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述                  | Since |
| -------- | ------------------- | ---------------------------- | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |


#### ScheduleWarning

随成功结果一同返回的非致命警告。

| 属性          | 类型                | 描述                                           | Since |
| ------------- | ------------------- | ---------------------------------------------- | ----- |
| **`code`**    | <code>string</code> | `OS-PLUG-LNOT-NNNN` 警告码。                  | 8.3.0 |
| **`message`** | <code>string</code> | 便于理解的警告说明。                           | 8.3.0 |

#### ScheduleOptions

| 属性                | 类型                                   | 描述                            | Since |
| ------------------- | -------------------------------------- | -------------------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要安排的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| 属性 | 类型 | 描述 | 默认值 | Since |
| --- | --- | --- | --- | --- |
| **`title`** | <code>string</code> | 通知的标题。 |  | 1.0.0 |
| **`body`** | <code>string</code> | 通知正文，显示在标题下方。 |  | 1.0.0 |
| **`largeBody`** | <code>string</code> | 设置在大文本通知样式中显示的多行文本块。 |  | 1.0.0 |
| **`summaryText`** | <code>string</code> | 用于在收件箱和大文本通知样式中设置摘要文本详情。仅适用于 Android。 |  | 1.0.0 |
| **`id`** | <code>number</code> | 通知标识符。在 Android 上是一个 32 位整数，因此值应在 -2147483648 到 2147483647 之间（含边界值）。 |  | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 使用 <a href="#schedule">Schedule</a> 为此通知安排稍后触发的时间。 |  | 1.0.0 |
| **`sound`** | <code>string</code> | 显示通知时要播放的音频文件名，文件名需包含扩展名。iOS 上，文件应位于应用 bundle 中；Android 上应位于 `res/raw` 目录。推荐使用 `.wav`，因为 iOS 和 Android 均支持此格式。仅适用于 iOS 和 Android 7.x。Android 8+ 请使用已配置所需声音的渠道的 `channelId`。如果未找到声音文件（即文件名为空或错误），将播放默认系统通知声音。如果未提供此字段，Android 会播放默认声音，iOS 则不会播放声音。 |  | 1.0.0 |
| **`smallIcon`** | <code>string</code> | 设置自定义状态栏图标。若设置，将覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。 |  | 1.0.0 |
| **`largeIcon`** | <code>string</code> | 设置通知的大图标。图标应放在应用的 `res/drawable` 文件夹中。此选项的值应为 drawable 资源 ID，即不带扩展名的文件名。仅适用于 Android。 |  | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知图标的颜色。仅适用于 Android。 |  | 1.0.0 |
| **`attachments`** | <code>Attachment[]</code> | 设置此通知的附件。 |  | 1.0.0 |
| **`actionTypeId`** | <code>string</code> | 为此通知关联一个操作类型。 |  | 1.0.0 |
| **`extra`** | <code>any</code> | 设置要存储在此通知中的附加数据。 |  | 1.0.0 |
| **`threadIdentifier`** | <code>string</code> | 用于对多个通知分组。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅适用于 iOS。 |  | 1.0.0 |
| **`summaryArgument`** | <code>string</code> | 此通知添加到类别摘要格式字符串中的内容。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `summaryArgument`。仅适用于 iOS。 |  | 1.0.0 |
| **`relevanceScore`** | <code>number</code> | 系统在对应用通知分组时，用于确定哪条通知是特色通知的分数。值必须在 0 到 1 之间，其中 0 表示相关性最低，1 表示相关性最高。默认值为 0。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `relevanceScore`。仅适用于 iOS。 |  | 8.1.0 |
| **`interruptionLevel`** | <code><a href="#interruptionlevel">InterruptionLevel</a></code> | 指示通知优先级和投递时机的打扰级别。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `interruptionLevel`。仅适用于 iOS。 |  | 8.1.0 |
| **`group`** | <code>string</code> | 用于对多个通知分组。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroup()`。仅适用于 Android。 |  | 1.0.0 |
| **`groupSummary`** | <code>boolean</code> | 若为 `true`，此通知将成为一组通知的摘要。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setGroupSummary()`。仅适用于 Android，且需同时使用 `group`。 |  | 1.0.0 |
| **`channelId`** | <code>string</code> | 指定通知应投递到的渠道。如果不存在具有给定名称的渠道，通知将不会触发。如果未提供，则使用默认渠道。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setChannelId()`。仅适用于 Android 8+。 |  | 1.0.0 |
| **`ongoing`** | <code>boolean</code> | 若为 `true`，用户无法通过滑动移除此通知。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setOngoing()`。仅适用于 Android。 |  | 1.0.0 |
| **`autoCancel`** | <code>boolean</code> | 若为 `true`，用户点击通知时会取消该通知。使用提供的值在 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 上调用 `setAutoCancel()`。仅适用于 Android。 |  | 1.0.0 |
| **`inboxList`** | <code>string[]</code> | 设置一个字符串列表，以便在收件箱样式通知中显示。最多允许 5 个字符串。仅适用于 Android。 |  | 1.0.0 |
| **`silent`** | <code>boolean</code> | 若为 `true`，应用处于前台时通知不会显示。仅适用于 iOS。 |  | 5.0.0 |
| **`badge`** | <code>number</code> | 投递此通知时要显示在应用图标角标上的数字。在 iOS 上，此项会设置 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 的角标计数。在 Android 上，此项会调用 [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) 的 `setNumber()`。 |  | 8.3.0 |
| **`foreground`** | <code>boolean</code> | 指定应用处于前台时是否应显示通知。在 iOS 上，`true` 会强制显示通知，即使应用处于前台；`false` 会隐藏通知（但仍会将其传递给 `localNotificationReceived` 监听器）。此项独立于 `silent`；两者同时提供时，以 `foreground` 为准。在 Android 上，此项会提高通知优先级，使通知能够以抬头通知的形式显示。 |  | 8.3.0 |
| **`isExactNotification`** | <code>boolean</code> | 指定是否应为此通知安排精确闹钟。仅适用于 Android。默认值为 `true`：对于 `schedule()`（API 31+），如果应用尚未获准安排精确闹钟，系统会打开“闹钟和提醒”设置页面供用户授权，无论 `isExactMandatory` 的值如何。如果用户仍拒绝授权，则会回退为不精确闹钟（除非同时将 `isExactMandatory` 设为 `true`，这种情况下调用会被拒绝）；此类回退会设置 `ScheduleResult.warning`。`update()` 不会显示提示，而是静默回退。将此项设为 `false`，即可直接按不精确闹钟安排此通知，不受权限状态影响。 | <code>true</code> | 8.3.0 |
| **`isExactMandatory`** | <code>boolean</code> | 指定此通知是否必须使用精确闹钟。仅适用于 Android；并且仅当 `isExactNotification` 为 `true`（默认值）且调用 `schedule()` 时才有意义。如果精确闹钟权限被拒绝，且正在安排的任一通知将此项设为 `true`，则整个 `schedule()` 调用会被拒绝，而不会回退为不精确闹钟。对 `update()` 无效：该方法不会强制执行此要求，并且与非强制通知一样，会回退为不精确闹钟。 | <code>false</code> | 8.3.0 |


#### Schedule

表示通知的安排计划。

使用 `at`、`on` 或 `every` 来安排通知。

| 属性                 | 类型                                                    | 描述                                                                                                                                                                                                                                                                                             | Since |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`at`**             | <code><a href="#date">Date</a></code>                   | 在特定的日期和时间安排通知。                                                                                                                                                                                                                            | 1.0.0 |
| **`repeats`**        | <code>boolean</code>                                    | 在 `at` 指定的日期和时间重复投递此通知。仅适用于 iOS 和 Android。                                                                                                                                                                                        | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>                                    | 允许此通知在 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式下触发。请注意这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。 | 1.0.0 |
| **`on`**             | <code><a href="#scheduleon">ScheduleOn</a></code>       | 在特定时间间隔安排通知。这类似于安排 [cron](https://en.wikipedia.org/wiki/Cron) 作业。仅适用于 iOS 和 Android。                                                                                                           | 1.0.0 |
| **`every`**          | <code><a href="#scheduleevery">ScheduleEvery</a></code> | 按特定时间间隔安排通知。                                                                                                                                                                                                                               | 1.0.0 |
| **`count`**          | <code>number</code>                                     | 限制由 `every` 指定的时间间隔投递通知的次数。                                                                                                                                                                                                                | 1.0.0 |


#### Date

支持日期和时间的基本存储和检索。

| Method                 | Signature                                                                                                    | 描述                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | 返回日期的字符串表示形式。格式取决于区域设置。                                              |
| **toDateString**       | () =&gt; string                                                                                              | 以字符串值形式返回日期。                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | 以字符串值形式返回时间。                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的值形式返回值。                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的字符串值形式返回日期。                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | 以适合主机环境当前区域设置的字符串值形式返回时间。                                                  |
| **valueOf**            | () =&gt; number                                                                                              | 返回以毫秒为单位的存储时间值，从 1970 年 1 月 1 日 UTC 午夜开始。                                                      |
| **getTime**            | () =&gt; number                                                                                              | 获取以毫秒为单位的时间值。                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | 使用本地时间获取年份。                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取年份。                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | 使用本地时间获取月份。                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的月份。                                             |
| **getDate**            | () =&gt; number                                                                                              | 使用本地时间获取月份中的日期。                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取月份中的日期。                                                                      |
| **getDay**             | () =&gt; number                                                                                              | 使用本地时间获取星期几。                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取星期几。                                                                        |
| **getHours**           | () =&gt; number                                                                                              | 使用本地时间获取日期中的小时。                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象中的小时值。                                       |
| **getMinutes**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的分钟。                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的分钟。                                           |
| **getSeconds**         | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 对象的秒数。                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的秒数。                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | 使用本地时间获取 <a href="#date">Date</a> 的毫秒数。                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | 使用协调世界时（UTC）获取 <a href="#date">Date</a> 对象的毫秒数。                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | 获取本地计算机时间和协调世界时（UTC）之间的时差（以分钟为单位）。                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | 设置 <a href="#date">Date</a> 对象中的日期和时间值。                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | 使用本地时间设置 <a href="#date">Date</a> 对象中的毫秒值。                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的毫秒值。                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用本地时间设置 <a href="#date">Date</a> 对象中的秒值。                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的秒值。                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用本地时间设置 <a href="#date">Date</a> 对象中的分钟值。                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的分钟值。                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用本地时间设置 <a href="#date">Date</a> 对象中的小时值。                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的小时值。                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | 使用本地时间设置 <a href="#date">Date</a> 对象的月份中的日期数值。                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的月份日期数值。                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用本地时间设置 <a href="#date">Date</a> 对象中的月份值。                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的月份值。                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用本地时间设置 <a href="#date">Date</a> 对象的年份。                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | 使用协调世界时（UTC）设置 <a href="#date">Date</a> 对象中的年份值。                                      |
| **toUTCString**        | () =&gt; string                                                                                              | 返回使用协调世界时（UTC）转换为字符串的日期。                                                            |
| **toISOString**        | () =&gt; string                                                                                              | 以 ISO 格式的字符串值形式返回日期。                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | 由 JSON.stringify 方法使用，以实现对象数据到 JavaScript Object Notation (JSON) 序列化的转换。 |


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

| 属性          | 类型                                                            | 描述                                                                                                                           | Since |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**      | <code>string</code>                                             | 附件标识符。                                                                                                            | 1.0.0 |
| **`url`**     | <code>string</code>                                             | 附件的 URL。使用 `res` 方案来引用 Web 资源，例如 `res:///assets/img/icon.png`。也接受 `file` URL。 | 1.0.0 |
| **`options`** | <code><a href="#attachmentoptions">AttachmentOptions</a></code> | 附件选项。                                                                                         | 1.0.0 |


#### AttachmentOptions

| 属性                                                             | 类型                | 描述                                                                                                                                                                                                                                   | Since |
| ---------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`**              | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsTypeHintKey` 键。仅适用于 iOS。              | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`**       | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailHiddenKey` 键。仅适用于 iOS。       | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailClippingRectKey` 键。仅适用于 iOS。 | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`**         | <code>string</code> | 在 [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment) 的可哈希选项中设置 `UNNotificationAttachmentOptionsThumbnailTimeKey` 键。仅适用于 iOS。         | 1.0.0 |


#### PendingResult

| 属性                | 类型                                          | 描述                        | Since |
| ------------------- | --------------------------------------------- | ---------------------------------- | ----- |
| **`notifications`** | <code>PendingLocalNotificationSchema[]</code> | 待处理的通知列表。 | 1.0.0 |


#### PendingLocalNotificationSchema

| 属性           | 类型                                          | 描述                                                          | Since |
| -------------- | --------------------------------------------- | -------------------------------------------------------------------- | ----- |
| **`title`**    | <code>string</code>                           | 通知的标题。                                       | 1.0.0 |
| **`body`**     | <code>string</code>                           | 通知的正文，显示在标题下方。                 | 1.0.0 |
| **`id`**       | <code>number</code>                           | 通知标识符。                                         | 1.0.0 |
| **`schedule`** | <code><a href="#schedule">Schedule</a></code> | 安排此通知在稍后时间触发。 | 1.0.0 |
| **`extra`**    | <code>any</code>                              | 设置存储在此通知中的附加数据。                    | 1.0.0 |


#### RegisterActionTypesOptions

| 属性        | 类型                      | 描述                           | Since |
| ----------- | ------------------------- | ------------------------------------- | ----- |
| **`types`** | <code>ActionType[]</code> | 要注册的操作类型列表。 | 1.0.0 |


#### ActionType

操作的集合。

| 属性                                   | 类型                  | 描述                                                                                                                                                                                     | Since |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                               | <code>string</code>   | 操作类型的 ID。在通知中通过 `actionTypeId` 键引用。                                                                                                               | 1.0.0 |
| **`actions`**                          | <code>Action[]</code> | 与此操作类型关联的操作列表。                                                                                                                                           | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | <code>string</code>   | 设置 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的 `hiddenPreviewsBodyPlaceholder`。仅适用于 iOS。             | 1.0.0 |
| **`iosCustomDismissAction`**           | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `customDismissAction`。仅适用于 iOS。        | 1.0.0 |
| **`iosAllowInCarPlay`**                | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `allowInCarPlay`。仅适用于 iOS。             | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`**       | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowTitle`。仅适用于 iOS。    | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`**    | <code>boolean</code>  | 在 [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory) 的选项中设置 `hiddenPreviewsShowSubtitle`。仅适用于 iOS。 | 1.0.0 |


#### Action

显示通知时可以执行的操作。

| 属性                         | 类型                 | 描述                                                                                                                                                                                                     | Since |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**                     | <code>string</code>  | 操作标识符。在 `'actionPerformed'` 事件中作为 `actionId` 引用。                                                                                                                               | 1.0.0 |
| **`title`**                  | <code>string</code>  | 为此操作显示的标题文本。                                                                                                                                                                      | 1.0.0 |
| **`requiresAuthentication`** | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `authenticationRequired`。仅适用于 iOS。                         | 1.0.0 |
| **`foreground`**             | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `foreground`。仅适用于 iOS。                                     | 1.0.0 |
| **`destructive`**            | <code>boolean</code> | 在 [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction) 的选项中设置 `destructive`。仅适用于 iOS。                                    | 1.0.0 |
| **`input`**                  | <code>boolean</code> | 使用 `UNTextInputNotificationAction` 而不是 `UNNotificationAction`。仅适用于 iOS。                                                                                                              | 1.0.0 |
| **`inputButtonTitle`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputButtonTitle`。仅适用于 iOS 且 `input` 为 `true` 时。 | 1.0.0 |
| **`inputPlaceholder`**       | <code>string</code>  | 在 [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction) 上设置 `textInputPlaceholder`。仅适用于 iOS 且 `input` 为 `true` 时。 | 1.0.0 |


#### CancelOptions

| 属性                | 类型                                       | 描述                          | Since |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 要取消的通知列表。 | 1.0.0 |


#### EnabledResult

| 属性        | 类型                 | 描述                                                | Since |
| ----------- | -------------------- | ---------------------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 设备是否已启用本地通知。 | 1.0.0 |


#### DeliveredNotifications

| 属性                | 类型                                       | 描述                                                         | Since |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------- | ----- |
| **`notifications`** | <code>DeliveredNotificationSchema[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### DeliveredNotificationSchema

| 属性               | 类型                                          | 描述                                                                                    | Since |
| ------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----- |
| **`id`**           | <code>number</code>                           | 通知标识符。                                                                   | 4.0.0 |
| **`tag`**          | <code>string</code>                           | 通知标签。仅适用于 Android。                                               | 4.0.0 |
| **`title`**        | <code>string</code>                           | 通知的标题。                                                                 | 4.0.0 |
| **`body`**         | <code>string</code>                           | 通知的正文，显示在标题下方。                                           | 4.0.0 |
| **`group`**        | <code>string</code>                           | 通知的已配置分组。仅适用于 Android。                          | 4.0.0 |
| **`groupSummary`** | <code>boolean</code>                          | 此通知是否为一组通知的摘要。仅适用于 Android。  | 4.0.0 |
| **`data`**         | <code>any</code>                              | 通知负载中包含的任何附加数据。仅适用于 Android。 | 4.0.0 |
| **`extra`**        | <code>any</code>                              | 存储在此通知中的附加数据。仅适用于 iOS。                          | 4.0.0 |
| **`attachments`**  | <code>Attachment[]</code>                     | 此通知的附件。仅适用于 iOS。                                 | 1.0.0 |
| **`actionTypeId`** | <code>string</code>                           | 与此通知关联的操作类型。仅适用于 iOS。    | 4.0.0 |
| **`schedule`**     | <code><a href="#schedule">Schedule</a></code> | 用于触发此通知的安排计划。仅适用于 iOS。       | 4.0.0 |
| **`sound`**        | <code>string</code>                           | 显示通知时使用的声音。仅适用于 iOS。               | 4.0.0 |


#### RemoveByIdsOptions

| 属性      | 类型                  | 描述 | Since |
| --------- | --------------------- | ---- | ----- |
| **`ids`** | <code>number[]</code> | 要移除的已投递通知的标识符。 | 8.3.0 |


#### GetNotificationsResult

| 属性                | 类型                                   | 描述 | Since |
| ------------------- | -------------------------------------- | ---- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 与查询匹配的通知列表。 | 8.3.0 |


#### GetByIdsOptions

| 属性      | 类型                  | 描述 | Since |
| --------- | --------------------- | ---- | ----- |
| **`ids`** | <code>number[]</code> | 要检索的通知标识符。 | 8.3.0 |


#### GetAllOptions

| 属性        | 类型                                                            | 描述 | Since |
| ----------- | --------------------------------------------------------------- | ---- | ----- |
| **`state`** | <code><a href="#notificationstate">NotificationState</a></code> | 按状态筛选返回的通知。省略时会返回已安排和已投递的通知。 | 8.3.0 |

#### Channel

| 属性              | 类型                                              | 描述                                                                                                                                                                                                                                                                                                                                    | 默认值          | Since |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                                                                                                        |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此渠道的人类可读名称（向用户显示）。                                                                                                                                                                                                                                                                               |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此渠道的描述（向用户显示）。                                                                                                                                                                                                                                                                                       |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 投递到此渠道的通知应播放的声音。重要性至少为 `3` 的通知渠道应有声音。声音文件的文件名应相对于 android 应用 `res/raw` 目录指定。如果未提供声音或找不到声音文件，则不使用声音。 |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 投递到此渠道的通知的打扰级别。                                                                                                                                                                                                                                                                            | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 投递到此渠道的通知的可见性。此设置用于控制投递到此渠道的通知是否显示在锁屏上，如果显示，是否以编辑形式显示。                                                                                                                                                                                                   |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 投递到此渠道的通知是否应在支持的设备上显示通知灯。                                                                                                                                                                                                                                   |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 投递到此渠道的通知的灯光颜色。仅在此渠道上启用了灯光且设备支持时有效。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                              |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 投递到此渠道的通知是否应振动。                                                                                                                                                                                                                                                                                   |                  | 1.0.0 |


#### ListChannelsResult

| 属性           | 类型                   | 描述                        | Since |
| -------------- | ---------------------- | ---------------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 通知渠道列表。 | 1.0.0 |


#### PermissionStatus

| 属性          | 类型                                                        | 描述                                   | Since |
| ------------- | ----------------------------------------------------------- | --------------------------------------------- | ----- |
| **`display`** | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。 | 1.0.0 |


#### SettingsPermissionStatus

| 属性              | 类型                                                        | 描述                             | Since |
| ----------------- | ----------------------------------------------------------- | --------------------------------------- | ----- |
| **`exact_alarm`** | <code><a href="#permissionstate">PermissionState</a></code> | 使用精确闹钟的权限状态。 | 6.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ActionPerformed

| 属性               | 类型                                                                        | 描述                                                                                                            | Since |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                         | 已执行操作的标识符。                                                                                | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                         | 用户在通知上输入的值。仅适用于 iOS 上 `input` 设置为 `true` 的通知。 | 1.0.0 |
| **`notification`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 原始通知模式。                                                                                      | 1.0.0 |


### 类型别名


#### ScheduleEvery

<code>'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'</code>


#### InterruptionLevel

指示通知优先级和投递时机的打扰级别。

- `active`：系统立即呈现通知，点亮屏幕，并可播放声音。
- `critical`：系统立即呈现通知，点亮屏幕，并绕过静音开关播放声音。
  需要 [Critical Alerts 授权](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.usernotifications.critical-alerts)。
- `passive`：系统将通知添加到通知列表，不点亮屏幕也不播放声音。
- `timeSensitive`：系统立即呈现通知，点亮屏幕，可播放声音，并突破系统通知控制。
  需要 Time Sensitive Notifications 功能。没有此功能，通知可能无法突破更严格的专注模式（如勿扰模式）。
  即使拥有此功能，用户也可以在设置中按专注模式禁用 Time Sensitive 通知。
  更多详情请参见 [Time Sensitive 通知](https://developer.apple.com/documentation/usernotifications/unnotificationinterruptionlevel/timesensitive)。

<code>'active' | 'critical' | 'passive' | 'timeSensitive'</code>


#### NotificationState

用于筛选 `getAll` 结果的通知状态。

- `SCHEDULED`：等待投递的通知。
- `TRIGGERED`：已投递的通知。

<code>'SCHEDULED' | 'TRIGGERED'</code>

#### Importance

重要性级别。更多详情请参见 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)。

<code>0 | 1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。更多详情请参见 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)。

<code>-1 | 0 | 1</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### 枚举


#### Weekday

| Members         | Value          |
| --------------- | -------------- |
| **`Sunday`**    | <code>1</code> |
| **`Monday`**    | <code>2</code> |
| **`Tuesday`**   | <code>3</code> |
| **`Wednesday`** | <code>4</code> |
| **`Thursday`**  | <code>5</code> |
| **`Friday`**    | <code>6</code> |
| **`Saturday`**  | <code>7</code> |

</docgen-api>
