---
title: Geolocation Capacitor Plugin API
description: Geolocation（地理位置）API 提供了简单的方法，通过 GPS（如果可用）获取和追踪设备的当前位置，以及海拔、航向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

Geolocation（地理位置）API 提供了简单的方法，通过 GPS（如果可用）获取和追踪设备的当前位置，以及海拔、航向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation@latest-6
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此 API 需要将以下权限添加到您的 `AndroidManifest.xml` 文件中：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取位置数据，包括精确和粗略位置。最后一行是可选的，但如果你的应用 _必须_ 依赖 GPS 才能运行，则是必需的。你可以省略它，但请注意，这可能导致你的应用安装在没有 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分，了解更多关于设置 Android 权限的信息。

### 变量

此插件将使用以下项目变量（定义在你的应用的 `variables.gradle` 文件中）：

- `playServicesLocationVersion`：`com.google.android.gms:play-services-location` 的版本（默认值：`21.1.0`）

## 示例

```typescript
import { Geolocation } from '@capacitor/geolocation';

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('当前坐标：', coordinates);
};
```

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

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置。

| 参数         | 类型                                                        |
| ------------ | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自：** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置一个监听器以监听位置变化。请注意，监听位置变化可能会消耗大量电量。请仅在需要时启动监听。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值：** <code>Promise&lt;string&gt;</code>

**自：** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听器。

| 参数         | 类型                                                            |
| ------------ | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，则会抛出异常。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，则会抛出异常。

| 参数              | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### Position

| 属性              | 类型                                                                                                                                                                                | 描述                           | 自     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------ |
| **`timestamp`**   | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳               | 1.0.0 |
| **`coords`**      | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标及其数据的精度信息     | 1.0.0 |

#### 位置选项 {#positionoptions}

| 属性                         | 类型                   | 描述                                                                                                                                                                                                                                                                                                     | 默认值               | 起始版本 |
| ---------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| **`enableHighAccuracy`**     | <code>boolean</code>   | 高精度模式（如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过位置别名检查），则此设置将被忽略。                                                                                                                                                                 | <code>false</code>   | 1.0.0    |
| **`timeout`**                | <code>number</code>    | 等待位置更新的最长时间，单位为毫秒。在 Android 上，自插件 4.0.0 版本起，`getCurrentPosition` 方法会忽略超时设置。                                                                                                                                                                                         | <code>10000</code>   | 1.0.0    |
| **`maximumAge`**             | <code>number</code>    | 可接受的缓存位置的最大年龄，单位为毫秒                                                                                                                                                                                                                                                                    | <code>0</code>       | 1.0.0    |
| **`minimumUpdateInterval`**  | <code>number</code>    | 位置更新的最小时间间隔。如果位置更新的速度快于此间隔，则只有在上次位置更新后经过了最小更新间隔，才会进行新的更新。此参数仅适用于 Android 平台，对 iOS 或 Web 平台没有影响。                                                                                                                                | <code>5000</code>    | 6.1.0    |


#### 清除监听选项 {#clearwatchoptions}

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### 权限状态 {#permissionstatus}

| 属性                 | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 起始版本 |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | 位置别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它会请求/检查位置权限。                                                                                                                                                                                                              | 1.0.0    |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | 粗略位置别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 权限。在 Android 12+ 上，用户可以选择“大致位置”（ACCESS_COARSE_LOCATION）或“精确位置”（ACCESS_FINE_LOCATION），因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，其值与 location 别名相同。                                                                           | 1.2.0    |


#### 地理位置插件权限 {#geolocationpluginpermissions}

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |


### 类型别名


#### 监听位置回调 {#watchpositioncallback}

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>


#### 回调标识 {#callbackid}

<code>string</code>


#### 权限状态类型 {#permissionstate}

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### 地理位置权限类型

<code>'location' | 'coarseLocation'</code>

</docgen-api>