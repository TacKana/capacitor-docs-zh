---
title: Geolocation Capacitor 插件 API
description: Geolocation API 提供了简单的方法来获取和追踪设备的当前位置（使用GPS），如果可用的话，还会包含海拔、方向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

Geolocation API 提供了简单的方法来获取和追踪设备的当前位置（使用GPS），如果可用的话，还会包含海拔、方向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription` （始终和使用期间访问位置信息描述）
- `NSLocationWhenInUseUsageDescription` （使用期间访问位置信息描述）

> [!注意]
> 此 Capacitor 插件不直接支持后台地理位置。但是，它依赖于
> [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，该库可以在后台报告位置。
> 因此，Apple 要求您在 `Info.plist` 中包含
> `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限提示不会显示给用户，您可以安全地使用与
> `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

阅读 [iOS指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解有关在 Xcode 中设置 iOS 权限的更多信息。

## Android

此插件需要在您的 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation Plugin -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（粗略和精确位置），最后一行是可选的，但如果您的应用*需要*依赖 GPS 功能，则必须添加。您可以省略它，但请注意，这可能意味着您的应用会安装在缺乏 GPS 硬件的设备上。

阅读 [Android指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分，了解有关设置 Android 权限的更多信息。

## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

有关错误代码列表，请参阅 [错误](#errors)

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**可用版本:** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置一个监听位置变化的观察器。请注意，监听位置变化会消耗大量电量。请仅在需要时进行监听。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回:** <code>Promise&lt;string&gt;</code>

**可用版本:** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的观察器

| 参数         | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**可用版本:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，将抛出错误。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**可用版本:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，将抛出错误。

在 Web 平台上不可用。

| 参数             | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**可用版本:** 1.0.0

--------------------


### 接口


#### Position

| 属性            | 类型                                                                                                                                                                                | 描述                                             | 可用版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标的时间戳                                           | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标以及数据的精度信息 | 1.0.0 |


#### PositionOptions

| 属性                             | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 默认值                | 可用版本 |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`enableHighAccuracy`**     | <code>boolean</code> | 高精度模式（例如使用 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可以通过 location 别名检查），此选项将被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | <code>false</code>     | 1.0.0 |
| **`timeout`**                | <code>number</code>  | 获取位置更新的最大等待时间（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | <code>10000</code>     | 1.0.0 |
| **`maximumAge`**             | <code>number</code>  | 可接受的缓存位置的最大年龄（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>0</code>         | 1.0.0 |
| **`minimumUpdateInterval`**  | <code>number</code>  | `watchPosition` 的最小更新间隔。不要与 `interval` 混淆。如果位置更新可用速度比此间隔更快，则仅当自上次位置更新以来最小更新间隔已过期时才会触发更新。此参数仅在 Android 上可用。在 iOS 或 Web 平台上无效。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>5000</code>      | 6.1.0 |
| **`interval`**               | <code>number</code>  | 在 `watchPosition` 中接收位置更新的期望间隔（毫秒）。对于非常小的 `interval` 值（几秒或更短），平台可能无法保证及时的位置更新 - 实际耗时可能比指定的更长。平台也可能提供比 `interval` 更快的位置更新。您可以使用 `minimumUpdateInterval` 来控制该行为。为了向后兼容 7.1.x 版本，如果未传递任何值，此参数的默认值将采用 `timeout` 的值。此参数仅在 Android 上可用。在 iOS 或 Web 平台上无效。                                                                                                                                | <code>`timeout`</code> | 8.0.0 |
| **`enableLocationFallback`** | <code>boolean</code> | 当 Google Play 服务的位置设置检查失败时，是否回退到 Android 框架的 `LocationManager`。这可能由于多种原因发生——例如，设备没有 Play 服务或设备没有网络连接（飞行模式）。如果设置为 `false`，失败信息将直接返回给调用者。请注意，`LocationManager` 可能不如 Google Play 服务的实现有效。如果设备处于飞行模式，则仅使用 GPS 提供程序，这可能需要更长时间才能返回位置，具体取决于 GPS 信号。这意味着，要在这种情况下接收位置，您可能需要提供更大的超时时间。此参数仅在 Android 上可用。在 iOS 或 Web 平台上无效。 | <code>true</code>      | 8.0.0 |


#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| 属性                     | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 可用版本 |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它会请求/检查位置权限。                                                                                                                                                                        | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 权限。在 Android 12+ 上，用户可以在“大致位置”（ACCESS_COARSE_LOCATION）或“精确位置”（ACCESS_FINE_LOCATION）之间进行选择，因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，它的值与 location 别名相同。 | 1.2.0 |


#### GeolocationPluginPermissions

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
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

该插件在原生 Android 和 iOS 上会返回带有特定代码的错误信息。Web 平台不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码           | 平台         | 消息                                  |
| -------------------- | ------------ | ---------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | 尝试获取位置时发生错误。 |
| OS-PLUG-GLOC-0003 | Android, iOS | 位置权限请求被拒绝。 |
| OS-PLUG-GLOC-0004 | iOS          | 'getCurrentPosition' 的输入参数无效。 |
| OS-PLUG-GLOC-0005 | iOS          | 'watchPosition' 的输入参数无效。 |
| OS-PLUG-GLOC-0006 | iOS          | 'clearWatch' 的输入参数无效。 |
| OS-PLUG-GLOC-0007 | Android, iOS | 位置服务未启用。 |
| OS-PLUG-GLOC-0008 | iOS          | 应用使用位置服务受到限制。 |
| OS-PLUG-GLOC-0009 | Android      | 启用位置的请求被拒绝。 |
| OS-PLUG-GLOC-0010 | Android, iOS | 无法及时获取位置。尝试使用更大的超时时间。 |
| OS-PLUG-GLOC-0011 | Android      | 超时时间必须为正数。 |
| OS-PLUG-GLOC-0012 | Android      | 未找到 WatchId。 |
| OS-PLUG-GLOC-0013 | Android      | 必须提供 WatchId。 |
| OS-PLUG-GLOC-0014 | Android      | Google Play 服务错误（用户可解决）。 |
| OS-PLUG-GLOC-0015 | Android      | Google Play 服务错误。 |
| OS-PLUG-GLOC-0016 | Android      | 位置设置错误。 |
| OS-PLUG-GLOC-0017 | Android      | 无法获取位置，因为设备的网络和位置都已关闭。 |