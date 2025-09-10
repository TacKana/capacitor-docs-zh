---
title: Geolocation Capacitor Plugin API
description: Geolocation API 提供了一套简单的方法，用于通过 GPS 获取和追踪设备的当前位置，在可用情况下还能获取海拔、朝向和速度信息。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main geolocation/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

Geolocation API 提供了一套简单的方法，用于通过 GPS 获取和追踪设备的当前位置，在可用情况下还能获取海拔、朝向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

苹果要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysUsageDescription` (`隐私 - 始终使用位置描述`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 使用时使用位置描述`)

更多关于在 Xcode 中设置 iOS 权限的信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/v3/ios)中的 [配置 `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist)

## Android

该 API 需要将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（精确和粗略），最后一行是可选的，但如果您的应用 _必须_ 依赖 GPS 才能运行，则需要添加。您可以省略它，但请注意这意味着您的应用可能会安装在缺少 GPS 硬件的设备上。

更多关于设置 Android 权限的信息，请阅读 [Android 指南](https://capacitorjs.com/docs/v3/android)中的 [设置权限](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions)

### 变量

该插件将使用以下项目变量（定义在您应用的 `variables.gradle` 文件中）：

- `$playServicesLocationVersion` 版本号为 `com.google.android.gms:play-services-location`（默认值：`17.1.0`）

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

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前的 GPS 位置

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自:** 1.0.0

---

### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化的监听器。请注意监听位置变化可能会消耗大量电量。请仅在需要时启用监听。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**自:** 1.0.0

---

### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听器

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限

| 参数              | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

---

### Interfaces

#### Position

| 属性            | 类型                                                                                                                                                                     | 描述              | 自    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                      | 坐标创建时间戳    | 1.0.0 |
| **`coords`**    | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }` | GPS坐标及数据精度 | 1.0.0 |

#### PositionOptions

| 属性                     | 类型                 | 描述                                                                                                                                         | 默认值             | 自    |
| ------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`enableHighAccuracy`** | <code>boolean</code> | 高精度模式（如启用GPS，如果可用）在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），此设置将被忽略 | <code>false</code> | 1.0.0 |
| **`timeout`**            | <code>number</code>  | 获取位置更新的最大等待时间（毫秒）                                                                                                           | <code>10000</code> | 1.0.0 |
| **`maximumAge`**         | <code>number</code>  | 可接受的缓存位置的最大存活时间（毫秒）                                                                                                       | <code>0</code>     | 1.0.0 |

#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |

#### PermissionStatus

| 属性                 | 类型                                                        | 描述                                                                                                                                                                                                                                                                               | 自    |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上它会同时请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 web 上它会请求/检查位置权限。                                                                                                                               | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上它会请求/检查 ACCESS_COARSE_LOCATION 权限。在 Android 12+ 上，用户可以选择"大致位置"(ACCESS_COARSE_LOCATION)或"精确位置"(ACCESS_FINE_LOCATION)，因此如果应用不需要高精度，可以使用此别名。在 iOS 和 web 上，它的值与 location 别名相同 | 1.2.0 |

#### GeolocationPluginPermissions

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |

### Type Aliases

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
