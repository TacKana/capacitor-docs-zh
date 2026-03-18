---
title: Geolocation
description: 地理位置 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/geolocation
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

地理位置 API 提供了一些简便的方法，用于获取和追踪设备当前的位置（使用 GPS），如果设备支持，还会提供海拔、朝向和速度信息。

- [`getCurrentPosition(...)`](#getcurrentposition)
- [`watchPosition(...)`](#watchposition)
- [`clearWatch(...)`](#clearwatch)
- [接口](#interfaces)

## iOS 注意事项

苹果公司要求在 `Info.plist` 中为位置信息指定隐私描述：

名称: `Privacy - Location Always Usage Description`
键: `NSLocationAlwaysUsageDescription`

名称: `Privacy - Location When In Use Usage Description`
键: `NSLocationWhenInUseUsageDescription`

请在 [iOS 指南](/ios/index.md) 中阅读 [设置 iOS 权限](/ios/configuration.md)，了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android 注意事项

此 API 要求将以下权限添加到你的 `AndroidManifest.xml` 文件中：

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据，包括精确和粗略定位，最后一行是可选的，但如果你的应用 _必须_ 依赖 GPS 才能运行，则是必需的。你也可以省略它，但请注意，这可能会导致你的应用被安装在缺少 GPS 硬件的设备上。

请在 [Android 指南](/android/index.md) 中阅读 [设置 Android 权限](/android/configuration.md)，了解更多关于设置 Android 权限的信息。

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

获取设备的当前 GPS 位置。

| 参数           | 类型                                                              |
| -------------- | ----------------------------------------------------------------- |
| **`options`**  | <code><a href="#geolocationoptions">GeolocationOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geolocationposition">GeolocationPosition</a>&gt;</code>

---

### watchPosition(...)

```typescript
watchPosition(options: GeolocationOptions, callback: GeolocationWatchCallback) => CallbackID
```

设置监听位置变化。请注意，监听位置变化可能会消耗大量电量。请明智地只在需要时进行监听。

| 参数            | 类型                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#geolocationoptions">GeolocationOptions</a></code>                                     |
| **`callback`**  | <code>(position: <a href="#geolocationposition">GeolocationPosition</a>, err?: any) =&gt; void</code> |

**返回值:** <code>string</code>

---

### clearWatch(...)

```typescript
clearWatch(options: { id: string; }) => Promise<void>
```

清除指定的监听。

| 参数           | 类型                         |
| -------------- | ---------------------------- |
| **`options`**  | `{ id: string; }` |

---

### 接口

#### GeolocationPosition

| 属性               | 类型                                                                                                                                                    | 描述                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **`timestamp`**    | <code>number</code>                                                                                                                                     | 坐标的创建时间戳                           |
| **`coords`**       | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy?: number; altitude?: number; speed?: number; heading?: number; }` | GPS 坐标以及数据的精确度 |

#### GeolocationOptions

| 属性                        | 类型                 |
| --------------------------- | -------------------- |
| **`enableHighAccuracy`**    | <code>boolean</code> |
| **`timeout`**               | <code>number</code>  |
| **`maximumAge`**            | <code>number</code>  |