---
title: Geolocation Capacitor Plugin API
description: Geolocation API 提供了简便的方法，通过 GPS 获取和追踪设备的当前位置，并在可用时提供海拔、朝向和速度等信息。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

Geolocation API 提供了简便的方法，通过 GPS 获取和追踪设备的当前位置，并在可用时提供海拔、朝向和速度等信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

请阅读 [iOS 指南](https://capacitorjs.com/docs/v3/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 部分，了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此 API 需要将以下权限添加到你的 `AndroidManifest.xml` 文件中：

```xml

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限用于请求位置数据，包括粗略和精确位置。最后一行是可选的，但如果你应用 _必须_ 使用 GPS 才能运行，则是必需的。你也可以省略它，但请注意，这可能会导致你的应用安装在缺乏 GPS 硬件的设备上。

请阅读 [Android 指南](https://capacitorjs.com/docs/v3/android) 中的 [设置权限](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions) 部分，了解更多关于设置 Android 权限的信息。

### 变量

此插件将使用以下项目变量（定义在应用中的 `variables.gradle` 文件中）：

- `$playServicesLocationVersion` 版本 `com.google.android.gms:play-services-location` (默认：`17.1.0`)

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
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

<docgen-api>


### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前的 GPS 位置

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

设置一个监听器来监听位置变化。请注意，监听位置变化可能会消耗大量电量。请仅在需要时智能地开启监听。

| 参数          | 类型                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值：** <code>Promise&lt;string&gt;</code>

**自：** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听

| 参数         | 类型                                                            |
| ------------ | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限

| 参数             | 类型                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### Position

| 属性            | 类型                                                                                                                                                                                | 描述                                             | 自 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳                           | 1.0.0 |
| **`coords`**    | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }` | 包含数据精度的 GPS 坐标 | 1.0.0 |

#### PositionOptions（位置选项） {#positionoptions}

| 属性                     | 类型                  | 说明                                                                                                                                                                                | 默认值              | 引入版本 |
| ------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| **`enableHighAccuracy`** | <code>boolean</code>  | 高精度模式（如 GPS，若可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），该选项将被忽略。                                           | <code>false</code>  | 1.0.0    |
| **`timeout`**            | <code>number</code>   | 等待位置更新的最长时间（毫秒）。                                                                                                                                                    | <code>10000</code>  | 1.0.0    |
| **`maximumAge`**         | <code>number</code>   | 可接受的缓存位置的最大年龄（毫秒）。                                                                                                                                                | <code>0</code>      | 1.0.0    |

#### ClearWatchOptions（清除监听选项） {#clearwatchoptions}

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |

#### PermissionStatus（权限状态） {#permissionstatus}

| 属性                 | 类型                                                        | 说明                                                                                                                                                                                                                                        | 引入版本 |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | location（位置）别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它请求/检查位置权限。                                                                                     | 1.0.0    |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation（粗略位置）别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION 权限。在 Android 12+ 上，用户可以在“大致位置”（ACCESS_COARSE_LOCATION）和“精确位置”（ACCESS_FINE_LOCATION）之间选择，因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，其值与 location 别名相同。 | 1.2.0    |

#### GeolocationPluginPermissions（地理位置插件权限） {#geolocationpluginpermissions}

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |

### 类型别名

#### WatchPositionCallback（监听位置回调） {#watchpositioncallback}

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>

#### CallbackID（回调ID） {#callbackid}

<code>string</code>

#### PermissionState（权限状态） {#permissionstate}

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### GeolocationPermissionType（地理位置权限类型）

<code>'location' | 'coarseLocation'</code>