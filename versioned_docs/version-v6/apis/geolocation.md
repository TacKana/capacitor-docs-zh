---
title: Geolocation Capacitor Plugin API
description: Geolocation API 提供了一系列简单方法来获取和追踪设备当前位置（使用GPS），包括海拔、朝向和速度等信息（如果可用）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/geolocation/src/definitions.ts
sidebar_label: 地理位置
---

# @capacitor/geolocation

Geolocation API 提供了一系列简单方法来获取和追踪设备当前位置（使用GPS），包括海拔、朝向和速度等信息（如果可用）。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

苹果公司要求必须在 `Info.plist` 中声明位置信息使用的隐私描述：

- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用期间的位置访问说明`)

更多关于在Xcode中设置iOS权限的信息，请阅读[iOS指南](https://capacitorjs.com/docs/ios)中的[配置Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)章节

## Android

此API需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- 地理位置API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限分别请求精确定位和粗略定位数据，最后一行是可选的，但如果你的应用_必须_使用GPS功能则必须添加。你可以选择省略，但要注意这可能导致应用安装在没有GPS硬件的设备上。

更多关于设置Android权限的信息，请阅读[Android指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)章节。

### 变量

本插件将使用以下项目变量（定义在你的应用`variables.gradle`文件中）：

- `playServicesLocationVersion` 定义`com.google.android.gms:play-services-location`的版本（默认值：`21.1.0`）

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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前的GPS位置

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化监听器。注意监听位置变化可能会消耗大量电量，请仅在需要时启用。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**起始版本:** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的位置监听器

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**起始版本:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统定位服务被禁用会抛出异常。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统定位服务被禁用会抛出异常。

| 参数              | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### 接口


#### Position

| 属性              | 类型                                                                                                                                                                                | 描述                                           | 起始版本 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| **`timestamp`**   | <code>number</code>                                                                                                                                                                 | 坐标生成时间戳                                 | 1.0.0    |
| **`coords`**      | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS坐标数据及其精度信息                        | 1.0.0    |


#### PositionOptions

| 属性                          | 类型                 | 描述                                                                                                                                                                                                                                                                                                     | 默认值            | 起始版本 |
| ----------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------- |
| **`enableHighAccuracy`**      | <code>boolean</code> | 高精度模式（如启用GPS等）。在Android 12+设备上，如果用户未授予ACCESS_FINE_LOCATION权限（可通过location别名检查），此设置将被忽略。                                                                                                                                                                       | <code>false</code> | 1.0.0    |
| **`timeout`**                 | <code>number</code>  | 等待位置更新的最长时间（毫秒）。在Android平台上，从插件4.0.0版本开始，getCurrentPosition方法将忽略此超时设置。                                                                                                                                                                                           | <code>10000</code> | 1.0.0    |
| **`maximumAge`**              | <code>number</code>  | 可接受的缓存位置的最大年龄（毫秒）                                                                                                                                                                                                                                                                      | <code>0</code>     | 1.0.0    |
| **`minimumUpdateInterval`**   | <code>number</code>  | 位置更新的最小间隔时间（毫秒）。如果位置更新比此间隔更快，则只有在上次更新超过最小间隔后才会触发更新。此参数仅适用于Android平台，对iOS和Web平台无效。                                                                                                                                                     | <code>5000</code>  | 6.1.0    |


#### ClearWatchOptions

| 属性      | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| 属性                    | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 起始版本 |
| ----------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`location`**          | <code><a href="#permissionstate">PermissionState</a></code> | location别名的权限状态。在Android上会同时请求/检查ACCESS_COARSE_LOCATION和ACCESS_FINE_LOCATION权限。在iOS和Web上会请求/检查位置权限。                                                                                                                                                                                                                      | 1.0.0    |
| **`coarseLocation`**    | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation别名的权限状态。在Android上请求/检查ACCESS_COARSE_LOCATION权限。在Android 12+上，用户可以选择"大致位置"(ACCESS_COARSE_LOCATION)或"精确位置"(ACCESS_FINE_LOCATION)，因此当应用不需要高精度时可以使用此别名。在iOS和Web上，其值与location别名相同。                                                                                            | 1.2.0    |


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