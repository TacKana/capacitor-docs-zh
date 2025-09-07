---
title: Geolocation Capacitor 插件 API
description: 地理定位 API 提供简单方法来获取和追踪设备当前 GPS 位置信息，包括海拔、方向和速度等可用数据。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/src/definitions.ts
sidebar_label: 地理位置
---

# @capacitor/geolocation

该地理定位 API 提供简单方法来获取和追踪设备当前 GPS 位置信息，包括海拔、方向和速度等可用数据。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

苹果公司要求在 `Info.plist` 中为位置信息配置隐私说明：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置描述`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用期间访问位置描述`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 章节，了解如何在 Xcode 中设置 iOS 权限的更多信息。

## Android

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取精确和粗略位置数据，最后一行是可选的，但如果应用必须依赖 GPS 才能运行则必须添加。你可以选择不加，但请注意这可能导致应用安装在缺少 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 章节，了解如何设置 Android 权限的更多信息。

### 变量

本插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$playServicesLocationVersion` 版本号 `com.google.android.gms:play-services-location` (默认值：`20.0.0`)

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
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前 GPS 位置

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化监听。注意持续监听位置变化会消耗大量电量。请仅在需要时合理使用。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**自版本:** 1.0.0

--------------------

### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的位置监听

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自版本:** 1.0.0

--------------------

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统定位服务被禁用将抛出异常。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统定位服务被禁用将抛出异常。

| 参数              | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### 接口

#### Position

| 属性              | 类型                                                                                                                                                                                | 描述                   | 版本  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`timestamp`**   | <code>number</code>                                                                                                                                                                 | 坐标创建时间戳         | 1.0.0 |
| **`coords`**      | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }` | 包含精度的 GPS 坐标数据 | 1.0.0 |

#### PositionOptions

| 属性                        | 类型                 | 描述                                                                                                                                                                           | 默认值            | 版本  |
| --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ----- |
| **`enableHighAccuracy`**    | <code>boolean</code> | 高精度模式（如启用 GPS 等）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），此设置将被忽略。                                     | <code>false</code> | 1.0.0 |
| **`timeout`**               | <code>number</code>  | 获取位置更新的最大等待时间（毫秒）。在 Android 中，自插件 4.0.0 版本起，getCurrentPosition 会忽略 timeout 参数。                                                                | <code>10000</code> | 1.0.0 |
| **`maximumAge`**            | <code>number</code>  | 可接受的缓存位置的最大年龄（毫秒）                                                                                                                                             | <code>0</code>     | 1.0.0 |

#### ClearWatchOptions

| 属性      | 类型                                              |
| --------- | ------------------------------------------------- |
| **`id`**  | <code><a href="#callbackid">CallbackID</a></code> |

#### PermissionStatus

| 属性                    | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                 | 版本  |
| ----------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`location`**          | <code><a href="#permissionstate">PermissionState</a></code> | 位置权限状态。在 Android 上会同时请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和网页端会请求/检查位置权限。                                                                                                                                                                                                | 1.0.0 |
| **`coarseLocation`**    | <code><a href="#permissionstate">PermissionState</a></code> | 粗略位置权限状态。在 Android 上会请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以选择"大致位置"(ACCESS_COARSE_LOCATION)或"精确位置"(ACCESS_FINE_LOCATION)，因此当应用不需要高精度时可以使用此别名。在 iOS 和网页端，该值将与 location 别名相同。                                                                       | 1.2.0 |

#### GeolocationPluginPermissions

| 属性                | 类型                                     |
| ------------------- | ---------------------------------------- |
| **`permissions`**   | <code>GeolocationPermissionType[]</code> |

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