---
title: Geolocation
description: 地理位置 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/geolocation
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

地理位置 API 提供简单的方法来获取和追踪设备的当前位置（使用 GPS），如果设备支持的话，还可以获取海拔、方向和速度信息。

- [`getCurrentPosition(...)`](#getcurrentposition)
- [`watchPosition(...)`](#watchposition)
- [`clearWatch(...)`](#clearwatch)
- [接口定义](#interfaces)

## iOS 注意事项

苹果要求在 `Info.plist` 中为定位信息添加隐私描述：

名称: `Privacy - Location Always Usage Description`
键名: `NSLocationAlwaysUsageDescription`

名称: `Privacy - Location When In Use Usage Description`
键名: `NSLocationWhenInUseUsageDescription`

更多关于在 Xcode 中设置 iOS 权限的信息，请阅读 [iOS 指南](/ios/index.md) 中的 [设置 iOS 权限](/ios/configuration.md)

## Android 注意事项

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- 地理位置 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取精确和粗略的位置数据，最后一行是可选的，但如果你的应用 _必须_ 使用 GPS 才能运行，则需要添加。你可以省略它，但请注意这可能导致应用安装在缺少 GPS 硬件的设备上。

更多关于设置 Android 权限的信息，请阅读 [Android 指南](/android/index.md) 中的 [设置 Android 权限](/android/configuration.md)

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

获取设备当前的 GPS 位置

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#geolocationoptions">GeolocationOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geolocationposition">GeolocationPosition</a>&gt;</code>

---

### watchPosition(...)

```typescript
watchPosition(options: GeolocationOptions, callback: GeolocationWatchCallback) => CallbackID
```

设置位置变化的监听器。请注意持续监听位置变化会消耗大量电量，建议只在必要时启用。

| 参数           | 类型                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#geolocationoptions">GeolocationOptions</a></code>                                     |
| **`callback`** | <code>(position: <a href="#geolocationposition">GeolocationPosition</a>, err?: any) =&gt; void</code> |

**返回值:** <code>string</code>

---

### clearWatch(...)

```typescript
clearWatch(options: { id: string; }) => Promise<void>
```

清除指定的位置监听

| 参数          | 类型              |
| ------------- | ----------------- |
| **`options`** | `{ id: string; }` |

---

### Interfaces

#### GeolocationPosition

| 属性            | 类型                                                                                                                                         | 描述                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **`timestamp`** | <code>number</code>                                                                                                                          | 坐标的创建时间戳       |
| **`coords`**    | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy?: number; altitude?: number; speed?: number; heading?: number; }` | GPS 坐标数据及其精确度 |

#### GeolocationOptions

| 属性                     | 类型                 |
| ------------------------ | -------------------- |
| **`enableHighAccuracy`** | <code>boolean</code> |
| **`timeout`**            | <code>number</code>  |
| **`maximumAge`**         | <code>number</code>  |
