---
title: Geolocation - Capacitor 地理位置插件 API
description: Geolocation API 提供了获取和跟踪设备当前位置的简单方法，包括海拔、方向和速度信息（如果可用）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/geolocation/src/definitions.ts
sidebar_label: Geolocation 地理位置
translated: true
---

# @capacitor/geolocation

Geolocation API 提供了获取和跟踪设备当前位置的简单方法，包括海拔、方向和速度信息（如果可用）。

## 安装

```bash
npm install @capacitor/geolocation@latest-5
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription`（`Privacy - Location Always Usage Description`）
- `NSLocationWhenInUseUsageDescription`（`Privacy - Location When In Use Usage Description`）

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（精确和粗略），最后一行是可选的，但如果你的应用 _必须_ 使用 GPS 功能，则有必要添加。你也可以省略它，但请注意这可能导致你的应用安装在缺少 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 了解更多关于设置 Android 权限的信息。

### 变量

此插件将使用以下项目变量（定义在你的应用的 `variables.gradle` 文件中）：

- `playServicesLocationVersion` 版本为 `com.google.android.gms:play-services-location`（默认值：`21.0.1`）

## 示例

```typescript
import { Geolocation } from '@capacitor/geolocation';

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('当前位置:', coordinates);
};
```

## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前的 GPS 位置。

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自从:** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化的监听。请注意，监听位置变化
可能会消耗大量电量。请只在需要时智能地监听。

| 参数          | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回:** <code>Promise&lt;string&gt;</code>

**自从:** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的位置监听。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自从:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务已禁用，将抛出异常。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务已禁用，将抛出异常。

| 参数             | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### 接口


#### Position

| 属性            | 类型                                                                                                                                                                                | 描述                                             | 自从 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳                                           | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标以及数据的精度 | 1.0.0 |


#### PositionOptions

| 属性                     | 类型                 | 描述                                                                                                                                                                           | 默认值            | 自从 |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| **`enableHighAccuracy`** | <code>boolean</code> | 高精度模式（例如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），将忽略此设置。 | <code>false</code> | 1.0.0 |
| **`timeout`**            | <code>number</code>  | 位置更新的最大等待时间，以毫秒为单位。在 Android 上，自插件 4.0.0 版本起，getCurrentPosition 会忽略此超时设置。                                   | <code>10000</code> | 1.0.0 |
| **`maximumAge`**         | <code>number</code>  | 可接受的缓存位置的最大使用期限，以毫秒为单位                                                                                                                    | <code>0</code>     | 1.0.0 |


#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| 属性                 | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 自从 |
| -------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它会请求/检查位置权限。                                                                                                                                                                        | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以选择"大致位置"（ACCESS_COARSE_LOCATION）或"精确位置"（ACCESS_FINE_LOCATION），因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，它将与 location 别名具有相同的值。 | 1.2.0 |


#### GeolocationPluginPermissions

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |


### 类型别名


#### Position

一个 <a href="#position">Position</a> 是一个坐标数组。
https://tools.ietf.org/html/rfc7946#section-3.1.1
数组应包含二到三个元素。
之前的 GeoJSON 规范允许更多元素（例如，可用于表示 M 值），
但当前规范只允许定义 X、Y 和（可选）Z。

<code>number[]</code>


#### WatchPositionCallback

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### GeolocationPermissionType

<code>'location' | 'coarseLocation'</code>

</docgen-api>
