---
title: Calendar Capacitor 插件 API
description: 在设备日历中创建、查找、修改和删除事件。
custom_edit_url: https://github.com/ionic-team/capacitor-calendar/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-calendar/blob/main/src/definitions.ts
sidebar_label: 日历
translated: true
source_hash: f4c1f4c
---

# @capacitor/calendar

在设备日历中创建、查找、修改和删除事件。

## 安装

使用 npm

```bash
npm install @capacitor/calendar
```

使用 yarn

```bash
yarn add @capacitor/calendar
```

同步原生文件

```bash
npx cap sync
```

## iOS

在应用的 `Info.plist` 中添加日历使用说明键；如果没有这些键，iOS 会在首次访问日历时崩溃。iOS 17 将日历访问分为两个级别，各有自己的键；请保留 17 之前的键以兼容旧设备：

```xml
<key>NSCalendarsFullAccessUsageDescription</key>
<string>我们需要访问你的日历，以搜索、创建和删除事件。</string>
<key>NSCalendarsWriteOnlyAccessUsageDescription</key>
<string>我们需要访问你的日历，以创建事件。</string>
<key>NSCalendarsUsageDescription</key>
<string>我们需要访问你的日历，以搜索、创建和删除事件。</string>
```

注意：

- 该插件使用当前 EventKit 访问 API（iOS 17+ 上的 `requestFullAccessToEvents` / `requestWriteOnlyAccessToEvents`），绝不使用已弃用的 `requestAccess(to:)`。`writeCalendar` 可由只写访问（"仅添加事件"）满足；`readCalendar` 需要完全访问权限。
- `createEventInteractively` 展示系统事件编辑器，在 iOS 17+ 上完全不需要日历权限。
- EventKit 以秒为粒度存储日期，因此读取到的 `startDate`/`endDate` 毫秒部分会被截断。Android 保留精确的毫秒。

## Android

该插件在自己的 manifest 中声明了 `READ_CALENDAR` 和 `WRITE_CALENDAR`；Gradle 的 manifest 合并会自动将其添加到你的应用中。方法还会在权限尚未授予时请求所需的运行时权限：`findEvents`/`listCalendars` 需要读取权限，`createEvent`/`createCalendar` 需要写入权限，`modifyEvent`/`deleteEvent`/`deleteCalendar` 需要读写权限。

平台注意事项：

- `createEventInteractively` 打开系统日历编辑器，该编辑器既不返回所保存事件的 id，也不返回取消事件，因此当编辑器关闭时，调用会以空结果解析。
- `CreateEventOptions.url` 会被忽略：该平台的日历事件模型没有 URL 字段。

## 错误

每次拒绝都会携带结构化的错误码与消息：

| 错误码                | 含义                                  |
| --------------------- | ------------------------------------- |
| `OS-PLUG-CLDR-0000`   | 未知错误                              |
| `OS-PLUG-CLDR-0001`   | 无效参数（例如没有匹配的事件）        |
| `OS-PLUG-CLDR-0003`   | 挂起的操作（例如编辑器已打开）        |
| `OS-PLUG-CLDR-0004`   | I/O 错误                              |
| `OS-PLUG-CLDR-0005`   | 不支持                                |
| `OS-PLUG-CLDR-0006`   | 操作已取消（编辑器已关闭）            |
| `OS-PLUG-CLDR-0020`   | 权限被拒绝                            |

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`createEvent(...)`](#createevent)
* [`createEventInteractively(...)`](#createeventinteractively)
* [`modifyEvent(...)`](#modifyevent)
* [`findEvents(...)`](#findevents)
* [`deleteEvent(...)`](#deleteevent)
* [`listCalendars()`](#listcalendars)
* [`createCalendar(...)`](#createcalendar)
* [`deleteCalendar(...)`](#deletecalendar)
* [`openCalendar(...)`](#opencalendar)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### checkPermissions()

```typescript
checkPermissions() => Promise<CalendarPermissionStatus>
```

返回当前的日历权限状态，不进行提示。

在 iOS 17+ 上，`readCalendar` 反映完全访问权限；`writeCalendar` 也可通过只写访问（"仅添加事件"）获得。

**返回值:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options?: RequestPermissionsOptions | undefined) => Promise<CalendarPermissionStatus>
```

请求给定的日历权限（省略时请求两者）。

在 iOS 上，请求 `readCalendar` 会提示完全访问；仅请求 `writeCalendar` 时，在 iOS 17+ 上会提示只写访问。

| 参数          | 类型                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionsoptions">RequestPermissionsOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### createEvent(...)

```typescript
createEvent(options: CreateEventOptions) => Promise<CreateEventResult>
```

静默创建日历事件，并以其 id 作为结果解析。

需要写入权限；在权限尚未确定时会请求。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventoptions">CreateEventOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#createeventresult">CreateEventResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### createEventInteractively(...)

```typescript
createEventInteractively(options: CreateEventOptions) => Promise<CreateEventResult>
```

打开预先填充了给定值的系统事件编辑界面。当用户保存时解析（在平台提供 id 时带上新事件的 id；Android 不提供），当用户取消时以 `OS-PLUG-CLDR-0006` 失败。

在 iOS 17+ 上编辑器无需日历权限。在 Android 和旧版 iOS 上，会先请求写入权限。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#createeventoptions">CreateEventOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#createeventresult">CreateEventResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### modifyEvent(...)

```typescript
modifyEvent(options: ModifyEventOptions) => Promise<void>
```

用 `newEvent` 中的值更新第一个匹配 `filter` 的事件。仅更改 `newEvent` 中存在的字段。没有匹配的事件时以 `OS-PLUG-CLDR-0001` 失败。

需要读写权限。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyeventoptions">ModifyEventOptions</a></code> |

**自版本:** 1.0.0

--------------------


### findEvents(...)

```typescript
findEvents(options: FindEventsOptions) => Promise<FindEventsResult>
```

返回日期范围内与筛选字段匹配的事件。`title`、`location` 和 `notes` 按不区分大小写的子串匹配；`calendarName` 将搜索限制在该日历内。重复事件在范围内每次发生都会返回一次，每次都有各自的日期。

需要读取权限。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#findeventsoptions">FindEventsOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#findeventsresult">FindEventsResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### deleteEvent(...)

```typescript
deleteEvent(options: DeleteEventOptions) => Promise<void>
```

删除事件：指定 `id` 时按 id 删除，否则删除所有匹配筛选字段的事件。没有匹配项时以 `OS-PLUG-CLDR-0001` 失败。删除重复事件会移除整个事件系列。

需要读写权限。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#deleteeventoptions">DeleteEventOptions</a></code> |

**自版本:** 1.0.0

--------------------


### listCalendars()

```typescript
listCalendars() => Promise<ListCalendarsResult>
```

返回设备上可用的日历。

需要读取权限。

**返回值:** <code>Promise&lt;<a href="#listcalendarsresult">ListCalendarsResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### createCalendar(...)

```typescript
createCalendar(options: CreateCalendarOptions) => Promise<CreateCalendarResult>
```

创建日历，并以其 id 作为结果解析。

需要写入权限。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#createcalendaroptions">CreateCalendarOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#createcalendarresult">CreateCalendarResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### deleteCalendar(...)

```typescript
deleteCalendar(options: DeleteCalendarOptions) => Promise<void>
```

删除具有给定名称的日历。没有同名日历时以 `OS-PLUG-CLDR-0001` 失败。

需要读写权限。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecalendaroptions">DeleteCalendarOptions</a></code> |

**自版本:** 1.0.0

--------------------


### openCalendar(...)

```typescript
openCalendar(options?: OpenCalendarOptions | undefined) => Promise<void>
```

在给定日期打开系统日历应用（省略时为今天）。无需日历权限。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#opencalendaroptions">OpenCalendarOptions</a></code> |

**自版本:** 1.0.0

--------------------


### 接口


#### CalendarPermissionStatus

每个日历权限的权限状态。

| 属性                | 类型                                                        | 描述                                 | 自版本 |
| ------------------- | ----------------------------------------------------------- | ------------------------------------ | ----- |
| **`readCalendar`**  | <code><a href="#permissionstate">PermissionState</a></code> | 读取日历事件的权限。                 | 1.0.0 |
| **`writeCalendar`** | <code><a href="#permissionstate">PermissionState</a></code> | 向日历添加事件的权限。               | 1.0.0 |


#### RequestPermissionsOptions

{@link CalendarPlugin.requestPermissions} 接受的选项。

| 属性              | 类型                                  | 描述                                                   | 自版本 |
| ----------------- | ------------------------------------- | ------------------------------------------------------ | ----- |
| **`permissions`** | <code>CalendarPermissionType[]</code> | 要请求的权限。省略时请求两者。                         | 1.0.0 |


#### CreateEventResult

{@link CalendarPlugin.createEvent} 和 {@link CalendarPlugin.createEventInteractively} 的结果。

| 属性     | 类型                | 描述                                                                                                 | 自版本 |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------------- | ----- |
| **`id`** | <code>string</code> | 创建的事件 id。平台未返回时缺失（如 Android 的交互式编辑器）。                                      | 1.0.0 |


#### CreateEventOptions

{@link CalendarPlugin.createEvent} 和 {@link CalendarPlugin.createEventInteractively} 接受的选项，也是 {@link CalendarPlugin.modifyEvent} 的新值。

| 属性                        | 类型                                                        | 描述                                                                                                                                | 自版本 |
| --------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**                 | <code>string</code>                                         | 事件标题。                                                                                                                          | 1.0.0 |
| **`location`**              | <code>string</code>                                         | 事件地点。                                                                                                                          | 1.0.0 |
| **`notes`**                 | <code>string</code>                                         | 自由格式的事件备注。                                                                                                                | 1.0.0 |
| **`startDate`**             | <code>number</code>                                         | 事件开始时间，以纪元毫秒表示。                                                                                                      | 1.0.0 |
| **`endDate`**               | <code>number</code>                                         | 事件结束时间，以纪元毫秒表示。                                                                                                      | 1.0.0 |
| **`isAllDay`**              | <code>boolean</code>                                        | 事件是否持续一整天。                                                                                                                | 1.0.0 |
| **`calendarId`**            | <code>string</code>                                         | 要创建事件的日历 id。优先于 `calendarName`；两者都未设置时使用默认日历。                                                           | 1.0.0 |
| **`calendarName`**          | <code>string</code>                                         | 要创建事件的日历名称。                                                                                                              | 1.0.0 |
| **`url`**                   | <code>string</code>                                         | 附加到事件的 URL。**Android：**平台的日历事件模型没有 URL 字段；该值会被忽略。                                                     | 1.0.0 |
| **`firstReminderMinutes`**  | <code>number</code>                                         | 第一个提醒的事件前分钟数。                                                                                                          | 1.0.0 |
| **`secondReminderMinutes`** | <code>number</code>                                         | 第二个提醒的事件前分钟数。                                                                                                          | 1.0.0 |
| **`recurrence`**            | <code><a href="#eventrecurrence">EventRecurrence</a></code> | 重复事件的重复规则。                                                                                                                | 1.0.0 |


#### EventRecurrence

应用于已创建事件的重复规则。

| 属性            | 类型                                                                | 描述                                                                                                                               | 自版本 |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`frequency`** | <code><a href="#recurrencefrequency">RecurrenceFrequency</a></code> | 事件重复的频率。                                                                                                                   | 1.0.0 |
| **`interval`**  | <code>number</code>                                                 | 每隔 `interval` 个 `frequency` 周期重复一次（默认 1）。                                                                            | 1.0.0 |
| **`endDate`**   | <code>number</code>                                                 | 重复的最后可能日期，以纪元毫秒表示。与 `count` 互斥；两者都设置时 `endDate` 优先。                                                | 1.0.0 |
| **`count`**     | <code>number</code>                                                 | 重复的总次数。                                                                                                                     | 1.0.0 |


#### ModifyEventOptions

{@link CalendarPlugin.modifyEvent} 接受的选项。

| 属性           | 类型                                                                                                    | 描述                                                   | 自版本 |
| -------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----- |
| **`filter`**   | <code><a href="#eventfilter">EventFilter</a></code>                                                     | 标识要更改事件的字段。                                 | 1.0.0 |
| **`newEvent`** | <code><a href="#partial">Partial</a>&lt;<a href="#createeventoptions">CreateEventOptions</a>&gt;</code> | 要应用的新值。仅更改存在的字段。                       | 1.0.0 |


#### EventFilter

用于在 {@link CalendarPlugin.modifyEvent} 中定位要更改事件的字段。已设置的字段必须全部匹配。

| 属性               | 类型                | 描述                                          | 自版本 |
| ------------------ | ------------------- | --------------------------------------------- | ----- |
| **`title`**        | <code>string</code> | 要匹配的标题子串（不区分大小写）。             | 1.0.0 |
| **`location`**     | <code>string</code> | 要匹配的地点子串（不区分大小写）。             | 1.0.0 |
| **`notes`**        | <code>string</code> | 要匹配的备注子串（不区分大小写）。             | 1.0.0 |
| **`startDate`**    | <code>number</code> | 日期范围的开始，以纪元毫秒表示。               | 1.0.0 |
| **`endDate`**      | <code>number</code> | 日期范围的结束，以纪元毫秒表示。               | 1.0.0 |
| **`calendarName`** | <code>string</code> | 将匹配限制在该名称的日历内。                   | 1.0.0 |


#### FindEventsResult

{@link CalendarPlugin.findEvents} 的结果。

| 属性         | 类型                         | 描述                         | 自版本 |
| ------------ | ---------------------------- | ---------------------------- | ----- |
| **`events`** | <code>CalendarEvent[]</code> | 匹配搜索的事件。             | 1.0.0 |


#### CalendarEvent

一个日历事件。

| 属性               | 类型                         | 描述                                                 | 自版本 |
| ------------------ | ---------------------------- | ---------------------------------------------------- | ----- |
| **`id`**           | <code>string</code>          | 平台分配的事件 id。                                  | 1.0.0 |
| **`title`**        | <code>string</code>          | 事件标题。                                           | 1.0.0 |
| **`location`**     | <code>string</code>          | 事件地点。                                           | 1.0.0 |
| **`notes`**        | <code>string</code>          | 自由格式的事件备注。                                 | 1.0.0 |
| **`startDate`**    | <code>number</code>          | 事件开始时间，以纪元毫秒表示。                       | 1.0.0 |
| **`endDate`**      | <code>number</code>          | 事件结束时间，以纪元毫秒表示。                       | 1.0.0 |
| **`isAllDay`**     | <code>boolean</code>         | 事件是否持续一整天。                                 | 1.0.0 |
| **`calendarId`**   | <code>string</code>          | 包含该事件的日历 id。                                | 1.0.0 |
| **`calendarName`** | <code>string</code>          | 包含该事件的日历名称。                               | 1.0.0 |
| **`attendees`**    | <code>EventAttendee[]</code> | 事件的参与者。没有参与者时该属性缺失。               | 1.0.0 |


#### EventAttendee

{@link <a href="#calendarevent">CalendarEvent</a>} 的参与者。

| 属性         | 类型                                                                                                                         | 描述                                  | 自版本 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----- |
| **`name`**   | <code>string</code>                                                                                                          | 参与者的显示名称。                    | 1.0.0 |
| **`email`**  | <code>string</code>                                                                                                          | 参与者的电子邮件地址。                | 1.0.0 |
| **`status`** | <code>'unknown' \| 'pending' \| 'accepted' \| 'declined' \| 'tentative' \| 'delegated' \| 'completed' \| 'in-process'</code> | 参与者的参与状态。                    | 1.0.0 |


#### FindEventsOptions

{@link CalendarPlugin.findEvents} 接受的选项。

| 属性               | 类型                | 描述                                                                                         | 自版本 |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------- | ----- |
| **`title`**        | <code>string</code> | 要匹配的标题子串（不区分大小写）。                                                            | 1.0.0 |
| **`location`**     | <code>string</code> | 要匹配的地点子串（不区分大小写）。                                                            | 1.0.0 |
| **`notes`**        | <code>string</code> | 要匹配的备注子串（不区分大小写）。                                                            | 1.0.0 |
| **`startDate`**    | <code>number</code> | 搜索范围的开始，以纪元毫秒表示。默认为当前时间减去六个月。                                   | 1.0.0 |
| **`endDate`**      | <code>number</code> | 搜索范围的结束，以纪元毫秒表示。默认为当前时间加上两年。                                     | 1.0.0 |
| **`calendarName`** | <code>string</code> | 将搜索限制在该名称的日历内。                                                                 | 1.0.0 |


#### DeleteEventOptions

{@link CalendarPlugin.deleteEvent} 接受的选项。

| 属性               | 类型                | 描述                                                                                                                        | 自版本 |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**           | <code>string</code> | 要删除的事件 id。设置时忽略筛选字段。                                                                                       | 1.0.0 |
| **`fromDate`**     | <code>number</code> | 仅与 `id` 一起使用，针对重复事件：保留此日期（纪元毫秒）之前的重复，并移除其余系列。                                       | 1.0.0 |
| **`title`**        | <code>string</code> | 要匹配的标题子串（不区分大小写）。                                                                                          | 1.0.0 |
| **`location`**     | <code>string</code> | 要匹配的地点子串（不区分大小写）。                                                                                          | 1.0.0 |
| **`notes`**        | <code>string</code> | 要匹配的备注子串（不区分大小写）。                                                                                          | 1.0.0 |
| **`startDate`**    | <code>number</code> | 日期范围的开始，以纪元毫秒表示。                                                                                            | 1.0.0 |
| **`endDate`**      | <code>number</code> | 日期范围的结束，以纪元毫秒表示。                                                                                            | 1.0.0 |
| **`calendarName`** | <code>string</code> | 将匹配限制在该名称的日历内。                                                                                                | 1.0.0 |


#### ListCalendarsResult

{@link CalendarPlugin.listCalendars} 的结果。

| 属性            | 类型                          | 描述                     | 自版本 |
| --------------- | ----------------------------- | ------------------------ | ----- |
| **`calendars`** | <code>DeviceCalendar[]</code> | 设备上的日历。           | 1.0.0 |


#### DeviceCalendar

设备上可用的日历。

| 属性              | 类型                 | 描述                                                              | 自版本 |
| ----------------- | -------------------- | ----------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code>  | 平台分配的日历 id。                                               | 1.0.0 |
| **`name`**        | <code>string</code>  | 日历名称。                                                        | 1.0.0 |
| **`displayName`** | <code>string</code>  | 当平台将它与 `name` 区分时，向用户展示的名称。                    | 1.0.0 |
| **`isPrimary`**   | <code>boolean</code> | 是否为新事件的默认日历。                                          | 1.0.0 |


#### CreateCalendarResult

{@link CalendarPlugin.createCalendar} 的结果。

| 属性     | 类型                | 描述                     | 自版本 |
| -------- | ------------------- | ------------------------ | ----- |
| **`id`** | <code>string</code> | 创建的日历 id。          | 1.0.0 |


#### CreateCalendarOptions

{@link CalendarPlugin.createCalendar} 接受的选项。

| 属性        | 类型                | 描述                                                                     | 自版本 |
| ----------- | ------------------- | ------------------------------------------------------------------------ | ----- |
| **`name`**  | <code>string</code> | 日历名称。                                                               | 1.0.0 |
| **`color`** | <code>string</code> | 日历颜色，为 `#RRGGBB` 十六进制字符串。省略时由平台选择。                | 1.0.0 |


#### DeleteCalendarOptions

{@link CalendarPlugin.deleteCalendar} 接受的选项。

| 属性       | 类型                | 描述                       | 自版本 |
| ---------- | ------------------- | -------------------------- | ----- |
| **`name`** | <code>string</code> | 要删除的日历名称。         | 1.0.0 |


#### OpenCalendarOptions

{@link CalendarPlugin.openCalendar} 接受的选项。

| 属性       | 类型                | 描述                                                  | 自版本 |
| ---------- | ------------------- | ----------------------------------------------------- | ----- |
| **`date`** | <code>number</code> | 要显示的日期，以纪元毫秒表示。省略时为今天。          | 1.0.0 |


### 类型别名


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CalendarPermissionType

可单独请求的日历权限。

<code>'readCalendar' | 'writeCalendar'</code>


#### RecurrenceFrequency

重复事件的重复频率。

<code>'daily' | 'weekly' | 'monthly' | 'yearly'</code>


#### Partial

使 T 中的所有属性变为可选

<code>{
 [P in keyof T]?: T[P];
 }</code>

</docgen-api>
