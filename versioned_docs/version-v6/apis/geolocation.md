---
title: Geolocation Capacitor 插件 API
description: Geolocation API 提供简单的方法来获取和跟踪设备当前的位置（使用 GPS），以及海拔、方向和速度信息（如果可用）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/src/definitions.ts
sidebar_label: Geolocation
translated: true
---

# @capacitor/geolocation

Geolocation API 提供简单的方法来获取和跟踪设备当前的位置（使用 GPS），以及海拔、方向和速度信息（如果可用）。

## 安装

```bash
npm install @capacitor/geolocation@latest-6
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationWhenInUseUsageDescription`（Privacy - Location When In Use Usage Description）

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中关于 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的内容，了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此 API 需要在您的 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（精确和粗略），最后一行是可选的，但如果您的应用**需要** GPS 功能，则必须添加。您可以省略它，但请注意这可能导致您的应用安装在缺乏 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中关于 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 的内容，了解更多关于设置 Android 权限的信息。

### 变量

此插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `playServicesLocationVersion`：`com.google.android.gms:play-services-location` 的版本（默认值：`21.1.0`）

## 示例

```typescript
import { Geolocation } from '@capacitor/geolocation';

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
};
```

## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置。

| 参数              | 类型                                                        |
| ----------------- | ----------------------------------------------------------- |
| **`options`**     | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**始于：** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化监听。请注意，监听位置变化会消耗大量电量。请仅在需要时进行监听。

| 参数              | 类型                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| **`options`**     | <code><a href="#positionoptions">PositionOptions</a></code>               |
| **`callback`**    | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code>   |

**返回：** <code>Promise&lt;string&gt;</code>

**始于：** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的位置监听。

| 参数              | 类型                                                            |
| ----------------- | --------------------------------------------------------------- |
| **`options`**     | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**始于：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统定位服务被禁用，将抛出错误。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统定位服务被禁用，将抛出错误。

| 参数               | 类型                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| **`permissions`**  | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code>   |

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### 接口


#### Position

| 属性              | 类型                                                                                                                                                                                  | 描述                   | 始于   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ |
| **`timestamp`**   | <code>number</code>                                                                                                                                                                   | 坐标的创建时间戳。     | 1.0.0 |
| **`coords`**      | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code>   | GPS 坐标及数据精度。   | 1.0.0 |


#### PositionOptions

| 属性                           | 类型                 | 描述                                                                                                                                                                                                                                                                                                          | 默认值               | 始于   |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------ |
| **`enableHighAccuracy`**       | <code>boolean</code> | 高精度模式（例如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），将被忽略。                                                                                                                                                                     | <code>false</code>  | 1.0.0 |
| **`timeout`**                  | <code>number</code>  | 位置更新的最大等待时间（毫秒）。在 Android 上，自插件 4.0.0 版本起，getCurrentPosition 中忽略 timeout。                                                                                                                                                                                                        | <code>10000</code>  | 1.0.0 |
| **`maximumAge`**               | <code>number</code>  | 可接受的缓存位置的最大时间（毫秒）。                                                                                                                                                                                                                                                                           | <code>0</code>      | 1.0.0 |
| **`minimumUpdateInterval`**    | <code>number</code>  | 位置更新的最小间隔时间。如果位置更新可用频率高于此间隔，则仅在上次位置更新后此最小间隔已过时才会触发更新。此参数仅适用于 Android。对 iOS 或 Web 平台无影响。                                                                                                                                                  | <code>5000</code>   | 6.1.0 |


#### ClearWatchOptions

| 属性       | 类型                                                |
| ---------- | --------------------------------------------------- |
| **`id`**   | <code><a href="#callbackid">CallbackID</a></code>   |


#### PermissionStatus

| 属性                   | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                             | 始于   |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`location`**         | <code><a href="#permissionstate">PermissionState</a></code>   | location 别名的权限状态。在 Android 上，同时请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，请求/检查位置权限。                                                                                                                                                                                                                 | 1.0.0 |
| **`coarseLocation`**   | <code><a href="#permissionstate">PermissionState</a></code>   | coarseLocation 别名的权限状态。在 Android 上，请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以选择"大致位置"（ACCESS_COARSE_LOCATION）或"精确位置"（ACCESS_FINE_LOCATION），因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，其值与 location 别名相同。                                                                                    | 1.2.0 |


#### GeolocationPluginPermissions

| 属性                | 类型                                       |
| ------------------- | ------------------------------------------ |
| **`permissions`**   | <code>GeolocationPermissionType[]</code>   |


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
