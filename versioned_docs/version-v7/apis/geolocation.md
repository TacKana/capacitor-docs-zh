---
title: 地理位置 - Capacitor 插件 API
description: Geolocation API 提供了获取和跟踪设备当前位置的简单方法，包括海拔、方向和速度信息（如果可用）。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 地理位置
translated: true
---

# @capacitor/geolocation

Geolocation API 提供了获取和跟踪设备当前位置的简单方法，包括海拔、方向和速度信息（如果可用）。

## 安装

```bash
npm install @capacitor/geolocation@latest-7
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription`（`Privacy - Location Always and When In Use Usage Description`）
- `NSLocationWhenInUseUsageDescription`（`Privacy - Location When In Use Usage Description`）

> [!注意]
> 此 Capacitor 插件不直接支持后台定位。然而，它依赖于
> [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，后者可以在
> 后台报告位置。因此，Apple 要求您在 `Info.plist` 中包含
> `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限
> 提示不会显示给用户，您可以安全地使用与
> `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

阅读有关[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的 [iOS 指南](https://capacitorjs.com/docs/ios) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

## Android

此插件需要将以下权限添加到您的 `AndroidManifest.xml` 中：

```xml
<!-- 地理位置插件 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（包括精确和粗略定位），最后一行是可选的，但如果您的应用 _需要_ GPS 才能运行，则是必需的。您可以省略它，但请注意这可能意味着您的应用会安装在缺乏 GPS 硬件的设备上。

阅读有关[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 的 [Android 指南](https://capacitorjs.com/docs/android) 以获取有关设置 Android 权限的更多信息。


## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

关于错误代码的列表，请参阅[错误](#错误)

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置

| 参数           | 类型                                                      |
| -------------- | --------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自从：** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置更改的监听。请注意，监听位置更改
会消耗大量电量。请仅在需要时进行监听。

| 参数            | 类型                                                                  |
| --------------- | --------------------------------------------------------------------- |
| **`options`**   | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`**  | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

**自从：** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自从：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统定位服务被禁用，将抛出错误。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统定位服务被禁用，将抛出错误。

在 Web 端不可用。

| 参数               | 类型                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`permissions`**  | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从：** 1.0.0

--------------------


### 接口


#### Position

| 属性            | 类型                                                                                                                                                                              | 描述                           | 自从   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| **`timestamp`** | <code>number</code>                                                                                                                                                               | 坐标的创建时间戳               | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标以及数据的精度         | 1.0.0 |


#### PositionOptions

| 属性                              | 类型                 | 描述                                                                                                                                                                                                                                                                                                           | 默认值              | 自从   |
| --------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| **`enableHighAccuracy`**          | <code>boolean</code> | 高精度模式（例如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），则此选项将被忽略。                                                                                               | <code>false</code>  | 1.0.0 |
| **`timeout`**                     | <code>number</code>  | 位置更新的最大等待时间（毫秒）。在 Android 上，自插件 7.1.0 版本起，它也用于确定 `watchPosition` 的位置更新间隔。                                                                                                                               | <code>10000</code>  | 1.0.0 |
| **`maximumAge`**                  | <code>number</code>  | 可接受的缓存位置的最大年龄（毫秒）                                                                                                                                                                                                                                                                             | <code>0</code>      | 1.0.0 |
| **`minimumUpdateInterval`**       | <code>number</code>  | 位置更新的最小间隔。如果位置更新可用频率快于此间隔，则仅当自上次位置更新以来最小更新间隔已过时才会触发更新。此参数仅适用于 Android。在 iOS 或 Web 平台上无效。                                                                                   | <code>5000</code>   | 6.1.0 |


#### ClearWatchOptions

| 属性     | 类型                                            |
| -------- | ----------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| 属性                   | 类型                                                      | 描述                                                                                                                                                                                                                                                                                                                                                                          | 自从   |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`location`**         | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它会请求/检查位置权限。                                                                                                                                                                                                                           | 1.0.0 |
| **`coarseLocation`**   | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以在"近似位置"（ACCESS_COARSE_LOCATION）或"精确位置"（ACCESS_FINE_LOCATION）之间选择，因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，它的值与 location 别名相同。                                                                                   | 1.2.0 |


#### GeolocationPluginPermissions

| 属性              | 类型                                   |
| ----------------- | -------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |


### 类型别名


#### WatchPositionCallback

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### GeolocationPermissionType

<code>'location' | 'coarseLocation'</code>

</docgen-api>

### 错误

该插件在原生 Android 和 iOS 上返回带有特定代码的特定错误。Web 端不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码             | 平台          | 消息                                          |
| -------------------- | ------------- | --------------------------------------------- |
| OS-PLUG-GLOC-0002    | Android, iOS  | 尝试获取位置时发生错误。                      |
| OS-PLUG-GLOC-0003    | Android, iOS  | 位置权限请求被拒绝。                          |
| OS-PLUG-GLOC-0004    | iOS           | 'getCurrentPosition' 输入参数无效。           |
| OS-PLUG-GLOC-0005    | iOS           | 'watchPosition' 输入参数无效。                |
| OS-PLUG-GLOC-0006    | iOS           | 'clearWatch' 输入参数无效。                   |
| OS-PLUG-GLOC-0007    | Android, iOS  | 定位服务未启用。                              |
| OS-PLUG-GLOC-0008    | iOS           | 应用使用定位服务受到限制。                    |
| OS-PLUG-GLOC-0009    | Android       | 启用位置的请求被拒绝。                        |
| OS-PLUG-GLOC-0010    | Android       | 无法及时获取位置。请尝试使用更长的超时时间。  |
| OS-PLUG-GLOC-0011    | Android       | 超时时间必须是正数。                          |
| OS-PLUG-GLOC-0012    | Android       | 未找到 WatchId。                              |
| OS-PLUG-GLOC-0013    | Android       | 需要提供 WatchId。                            |
| OS-PLUG-GLOC-0014    | Android       | Google Play 服务错误，用户可解决。            |
| OS-PLUG-GLOC-0015    | Android       | Google Play 服务错误。                        |
| OS-PLUG-GLOC-0016    | Android       | 位置设置错误。                                |
