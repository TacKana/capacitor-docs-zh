---
title: Local Notifications Capacitor Plugin API
description: Local Notifications API 提供了在本地（无需服务器发送推送通知）调度设备通知的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/local-notifications/src/definitions.ts
sidebar_label: Local Notifications
---

# @capacitor/local-notifications

Local Notifications API 提供了在本地（无需服务器发送推送通知）调度设备通知的方法。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android
Android 13 需要权限检查才能发送通知。您需要相应调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，只会返回已授权状态。

从 Android 12 开始，除非将以下权限添加到 `AndroidManifest.xml`，否则定时通知不会精确触发：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

注意：即使存在该权限，用户仍可以在应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 检查该设置的值。如果用户禁用此设置，应用将重启并且任何使用精确闹钟调度的通知将被删除。如果您的应用依赖精确闹钟，请务必在应用启动时（例如在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中）检查此设置，以提供回退或替代行为。

在 Android 14 中，有一个名为 `USE_EXACT_ALARM` 的新权限。使用此权限可以在无需向用户请求权限的情况下使用精确闹钟。只有在精确闹钟的使用是应用功能的核心时才应使用此权限。详细了解使用此权限的影响[请参见此处](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM)。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

在 Android 上，Local Notifications 可以使用以下选项进行配置：

| 属性            | 类型                | 描述                                                                                                                                                                                                                                                                                                                  | 版本 |
| --------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`smallIcon`** | <code>string</code> | 设置通知的默认状态栏图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅在 Android 上可用。                                                                         | 1.0.0 |
| **`iconColor`** | <code>string</code> | 设置通知状态栏图标的默认颜色。仅在 Android 上可用。                                                                                                                                                                                                                                     | 1.0.0 |
| **`sound`**     | <code>string</code> | 设置通知的默认通知声音。在 Android 26+ 上，它设置默认通道声音且除非卸载应用否则无法更改。如果找不到音频文件，则在 Android 21-25 上会播放默认系统声音，而在 Android 26+ 上则无声音。仅在 Android 上可用。 | 1.0.0 |

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

## Doze 模式

如果设备进入 [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) 模式，您的应用可能会受到限制。如果您需要在 Doze 模式下也能触发通知，请使用 `allowWhileIdle: true` 调度通知。请谨慎使用 `allowWhileIdle`，因为这些通知[每个应用每 9 分钟只能触发一次](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)。

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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

<a href="#schedule">调度</a>一个或多个本地通知。

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**版本：** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理通知列表。

**返回：** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**版本：** 1.0.0

--------------------


### registerActionTypes(...)

```typescript
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

注册在通知显示时要采取的操作。

仅在 iOS 和 Android 上可用。

| 参数         | 类型                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#registeractiontypesoptions">RegisterActionTypesOptions</a></code> |

**版本：** 1.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消待处理通知。

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**版本：** 1.0.0

--------------------


### areEnabled()

```typescript
areEnabled() => Promise<EnabledResult>
```

检查通知是否启用。

**返回：** <code>Promise&lt;<a href="#enabledresult">EnabledResult</a>&gt;</code>

**版本：** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**返回：** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**版本：** 4.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中移除指定的通知。

| 参数           | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**版本：** 4.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中移除所有通知。

**版本：** 4.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知通道。

仅在 Android 上可用。

| 参数         | 类型                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**版本：** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知通道。

仅在 Android 上可用。

| 参数      | 类型                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**版本：** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

获取通知通道列表。

仅在 Android 上可用。

**返回：** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求显示本地通知的权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**版本：** 1.0.0

--------------------


### changeExactNotificationSetting()

```typescript
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

引导用户到应用设置屏幕配置精确闹钟。

如果用户将设置从授权更改为拒绝，应用将重启并且任何使用精确闹钟调度的通知将被删除。

在 Android < 12 上，用户不会被引导到应用设置屏幕，此函数将返回 `granted`。

仅在 Android 上可用。

**返回：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**版本：** 6.0.0

--------------------


### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

检查使用精确闹钟的应用设置。

仅在 Android 上可用。

**返回：** <code>Promise&lt;<a href="#settingspermissionstatus">SettingsPermissionStatus</a>&gt;</code>

**版本：** 6.0.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

监听通知显示事件。

| 参数              | 类型                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

监听通知操作执行事件。

| 参数              | 类型                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                              |
| **`listenerFunc`** | <code>(notificationAction: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**版本：** 1.0.0

--------------------


### 接口


#### ScheduleResult

| 属性                | 类型                                       | 描述                          | 版本 |
| ------------------- | ------------------------------------------ | ------------------------------------ | ----- |
| **`notifications`** | <code>LocalNotificationDescriptor[]</code> | 已调度的通知列表。 | 1.0.0 |


#### LocalNotificationDescriptor

描述本地通知的对象。

| 属性     | 类型                | 描述                  | 版本 |
| -------- | ------------------- | ---------------------------- | ----- |
| **`id`** | <code>number</code> | 通知标识符。 | 1.0.0 |


#### ScheduleOptions

| 属性                | 类型                                   | 描述                            | 版本 |
| ------------------- | -------------------------------------- | -------------------------------------- | ----- |
| **`notifications`** | <code>LocalNotificationSchema[]</code> | 要调度的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| 属性                   | 类型                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 版本 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**            | <code>string</code>                           | 通知标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | <code>string</code>                           | 通知正文，显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`largeBody`**        | <code>string</code>                           | 设置在大型文本通知样式中显示的多行文本块。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>                           | 用于设置收件箱和大型文本通知样式中的摘要文本详情。仅在 Android 上可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`id`**               | <code>number</code>                           | 通知标识符。在 Android 上为 32 位整数。因此值应在 -2147483648 和 2147483647 之间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`schedule`**         | <code><a href="#schedule">Schedule</a></code> | <a href="#schedule">调度</a>此通知以便稍后触发。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`sound`**            | <code>string</code>                           | 显示此通知时要播放的音频文件名。包含文件扩展名。在 iOS 上，文件应位于应用 bundle 中。在 Android 上，文件应位于 res/raw 文件夹中。推荐格式为 `.wav`，因为它同时支持 iOS 和 Android。仅在 iOS 和 Android < 26 上可用。对于 Android 26+，使用配置了所需声音的 channelId。如果找不到声音文件（即空字符串或错误名称），将使用默认系统通知声音。如果未提供，在 Android 上将产生默认声音，在 iOS 上则无声音。 | 1.0.0 |
| **`smallIcon`**        | <code>string</code>                           | 设置自定义状态栏图标。如果设置，则覆盖 Capacitor 配置中的 `smallIcon` 选项。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅在 Android 上可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>                           | 设置通知的大图标。图标应放置在应用的 `res/drawable` 文件夹中。此选项的值应为可绘制资源 ID，即不带扩展名的文件名。仅在 Android 上可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`iconColor`**        | <code>string</code>                           | 设置通知图标的颜色。仅在 Android 上可用。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`attachments`**      | <code>Attachment[]</code>                     | 设置此通知的附件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>                           | 将此通知与操作类型关联。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`extra`**            | <code>any</code>                              | 设置存储在此通知中的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>                           | 用于分组多个通知。在 [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent) 上设置 `threadIdentifier`。仅在 iOS 上可用。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  |