---
title: Geolocation
description: Geolocation API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/geolocation
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Geolocation API 提供了简单的获取和跟踪设备当前位置的方法，使用 GPS 以及可用的海拔、方向和速度信息。

- [`getCurrentPosition(...)`](#getcurrentposition)
- [`watchPosition(...)`](#watchposition)
- [`clearWatch(...)`](#clearwatch)
- [接口](#interfaces)

## iOS 注意事项

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

名称：`Privacy - Location Always Usage Description`
键：`NSLocationAlwaysUsageDescription`

名称：`Privacy - Location When In Use Usage Description`
键：`NSLocationWhenInUseUsageDescription`

在 [iOS 指南](/ios/index.md) 中阅读关于 [设置 iOS 权限](/ios/configuration.md) 的更多信息，了解如何在 Xcode 中设置 iOS 权限。

## Android 注意事项

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（粗略和精确位置），最后一行是可选的，但如果您的应用 _需要_ GPS 才能运行，则必须添加。您可以省略它，但请注意这可能意味着您的应用会安装在缺少 GPS 硬件的设备上。

在 [Android 指南](/android/index.md) 中阅读关于 [设置 Android 权限](/android/configuration.md) 的更多信息，了解如何设置 Android 权限。

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

class GeolocationExample {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('当前位置', coordinates);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {});
  }
}
```

## API

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: GeolocationOptions) => Promise<GeolocationPosition>
```

获取设备的当前 GPS 位置

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#geolocationoptions">GeolocationOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#geolocationposition">GeolocationPosition</a>&gt;</code>

---

### watchPosition(...)

```typescript
watchPosition(options: GeolocationOptions, callback: GeolocationWatchCallback) => CallbackID
```

设置位置变化的监听。请注意，监听位置变化会消耗大量电量。请仅在需要时监听。

| 参数 | 类型 |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#geolocationoptions">GeolocationOptions</a></code>                                     |
| **`callback`** | <code>(position: <a href="#geolocationposition">GeolocationPosition</a>, err?: any) =&gt; void</code> |

**返回：** <code>string</code>

---

### clearWatch(...)

```typescript
clearWatch(options: { id: string; }) => Promise<void>
```

清除指定的监听

| 参数 | 类型 |
| ------------- | ---------------------------- |
| **`options`** | `{ id: string; }` |

---

### 接口

#### GeolocationPosition

| 属性 | 类型 | 描述 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **`timestamp`** | <code>number</code> | 坐标的创建时间戳 |
| **`coords`**    | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy?: number; altitude?: number; speed?: number; heading?: number; }` | GPS 坐标以及数据的精确度 |

#### GeolocationOptions

| 属性 | 类型 |
| ------------------------ | -------------------- |
| **`enableHighAccuracy`** | <code>boolean</code> |
| **`timeout`**            | <code>number</code>  |
| **`maximumAge`**         | <code>number</code>  |
