---
title: Geolocation Capacitor Plugin API
description: Geolocation API 提供了一系列简单方法，用于通过GPS获取和追踪设备当前位置（若设备支持还可获取海拔、朝向和速度信息）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/geolocation/src/definitions.ts
sidebar_label: 地理位置
---

# @capacitor/geolocation

Geolocation API 提供了一系列简单方法，用于通过GPS获取和追踪设备当前位置（若设备支持还可获取海拔、朝向和速度信息）。

## 安装

```bash
npm install @capacitor/geolocation@latest-5
npx cap sync
```

## iOS

苹果公司要求在 `Info.plist` 中声明位置信息的使用说明：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终访问位置使用说明`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时访问位置使用说明`)

在 [iOS指南](https://capacitorjs.com/docs/ios) 中阅读 [配置 Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 了解如何在Xcode中设置iOS权限的更多信息

## Android

此API需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- 地理位置API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两项权限分别请求精确和粗略的位置数据，最后一行是可选的，但如果你的应用 _必须_ 依赖GPS才能运行则需要添加。你可以选择不添加，但请注意这意味着你的应用可能会安装在缺少GPS硬件的设备上。

在 [Android指南](https://capacitorjs.com/docs/android) 中阅读 [权限设置](https://capacitorjs.com/docs/android/configuration#setting-permissions) 了解如何设置Android权限的更多信息。

### 变量

本插件将使用以下项目变量（定义在你的应用 `variables.gradle` 文件中）：

- `playServicesLocationVersion` 定义 `com.google.android.gms:play-services-location` 的版本（默认：`21.0.1`）

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

- [`getCurrentPosition(...)`](#getcurrentposition)
- [`watchPosition(...)`](#watchposition)
- [`clearWatch(...)`](#clearwatch)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions(...)`](#requestpermissions)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前GPS位置

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自版本:** 1.0.0

---

### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化监听器。请注意持续监听位置变化可能会消耗大量电量，请仅在需要时启用监听。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**自版本:** 1.0.0

---

### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定监听器

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统定位服务被禁用将会抛出异常。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统定位服务被禁用将会抛出异常。

| 参数              | Type                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### Position

| 属性            | 类型                                                                                                                                                                                | 描述                | 版本  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标创建时间戳      | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS坐标及其数据精度 | 1.0.0 |

#### PositionOptions

| 属性                     | 类型                 | 描述                                                                                                                             | 默认值             | 版本  |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`enableHighAccuracy`** | <code>boolean</code> | 高精度模式（如启用GPS，若可用）。在Android 12+设备上，如果用户未授予ACCESS_FINE_LOCATION权限将被忽略（可通过location别名检查）。 | <code>false</code> | 1.0.0 |
| **`timeout`**            | <code>number</code>  | 等待位置更新的最长时间（毫秒）。在Android平台，自插件4.0.0版本起，getCurrentPosition将忽略此超时设置。                           | <code>10000</code> | 1.0.0 |
| **`maximumAge`**         | <code>number</code>  | 可接受的缓存位置的最大年龄（毫秒）                                                                                               | <code>0</code>     | 1.0.0 |

#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |

#### PermissionStatus

| 属性                 | 类型                                                        | 描述                                                                                                                                                                                                                                                                      | 版本  |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | 位置别名的权限状态。在Android平台会同时请求/检查ACCESS_COARSE_LOCATION和ACCESS_FINE_LOCATION权限。在iOS和Web平台会请求/检查位置权限。                                                                                                                                     | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation别名的权限状态。在Android平台会请求/检查ACCESS_COARSE_LOCATION权限。在Android 12+上，用户可以选择"近似位置"(ACCESS_COARSE_LOCATION)或"精确位置"(ACCESS_FINE_LOCATION)，因此当应用不需要高精度时可以使用此别名。在iOS和Web平台将保持与location别名相同的值。 | 1.2.0 |

#### GeolocationPluginPermissions

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |

### Type Aliases

#### Position

<a href="#position">Position</a> 是坐标数组。 遵循RFC 7946标准第3.1.1节
https://tools.ietf.org/html/rfc7946#section-3.1.1 数组应包含2-3个元素。
之前的GeoJSON规范允许更多元素（例如可用来表示M值）， 但现行规范只允许定义X、Y和（可选的）Z坐标。

<code>number[]</code>

#### WatchPositionCallback

<code>
  (position: <a href="#position">Position</a> | null, err?: any): void
</code>

#### CallbackID

<code>string</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### GeolocationPermissionType

<code>'location' | 'coarseLocation'</code>

</docgen-api>
