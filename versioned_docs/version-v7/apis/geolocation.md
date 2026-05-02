---
title: Geolocation Capacitor Plugin API
description: Geolocation API 提供简单的方法，通过 GPS 获取和追踪设备的当前位置，如果可用的话还会包含海拔、航向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/7.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

Geolocation API 提供简单的方法，通过 GPS 获取和追踪设备的当前位置，如果可用的话还会包含海拔、航向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation@latest-7
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription` (`隐私 - 始终和在应用使用时访问位置`)
- `NSLocationWhenInUseUsageDescription` (`隐私 - 在应用使用时访问位置`)

> [!注意]
> 此 Capacitor 插件不直接支持后台地理定位。但是，它依赖于 [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，该库可以在后台报告位置。因此，Apple 要求你必须在 `Info.plist` 中包含 `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限提示不会显示给用户，你可以安全地使用与 `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

在 [iOS 指南](https://capacitorjs.com/docs/ios) 中阅读 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 以了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此插件需要将以下权限添加到你的 `AndroidManifest.xml` 中：

```xml
<!-- Geolocation 插件 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据，包括精确和粗略位置，最后一行是可选的，但如果你的应用_需要_ GPS 才能运行，则必须添加。你可以省略它，但请注意这可能导致你的应用被安装在缺少 GPS 硬件的设备上。

在 [Android 指南](https://capacitorjs.com/docs/android) 中阅读 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 以了解更多关于设置 Android 权限的信息。

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

关于错误代码列表，请参阅 [错误](#错误)

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置

| 参数           | 类型                                                        |
| -------------- | ----------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自:** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置对位置变化的监听。请注意，监听位置变化可能会消耗大量电量。请只在需要时明智地监听。

| 参数            | 类型                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| **`options`**   | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`**  | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**自:** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听

| 参数           | 类型                                                            |
| -------------- | --------------------------------------------------------------- |
| **`options`**  | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，将会抛出错误。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，将会抛出错误。

在 Web 上不可用。

| 参数                | 类型                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| **`permissions`**   | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### 接口


#### Position

| 属性               | 类型                                                                                                                                                                                | 描述                                             | 自     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ |
| **`timestamp`**    | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳                                 | 1.0.0 |
| **`coords`**       | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标及其数据的精度                           | 1.0.0 |#### 位置选项

| 属性                         | 类型                  | 描述                                                                                                                                                                                                                                                                                                     | 默认值               | 始于版本 |
| ---------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| **`enableHighAccuracy`**     | <code>boolean</code>  | 高精度模式（如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可通过 location 别名检查），此设置将被忽略。                                                                                                                              | <code>false</code>   | 1.0.0    |
| **`timeout`**                | <code>number</code>   | 等待位置更新的最长时间（毫秒）。在 Android 中，从插件 7.1.0 版本开始，此参数也用于确定 `watchPosition` 的位置更新间隔。                                                                                                                                                                                             | <code>10000</code>   | 1.0.0    |
| **`maximumAge`**             | <code>number</code>   | 可接受返回的缓存位置的最大时间（毫秒）                                                                                                                                                                                                                                                                     | <code>0</code>       | 1.0.0    |
| **`minimumUpdateInterval`**  | <code>number</code>   | 位置更新的最小时间间隔。如果位置更新速度快于此间隔，则仅在上次位置更新后经过此最小更新间隔时才会进行更新。此参数仅适用于 Android，在 iOS 或 Web 平台上无效。                                                                                                                                    | <code>5000</code>    | 6.1.0    |

#### 清除监听选项

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |

#### 权限状态

| 属性                   | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 始于版本 |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`location`**         | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它会请求/检查 location 权限。                                                                                                                                                                                                    | 1.0.0    |
| **`coarseLocation`**   | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以选择“大致位置”（ACCESS_COARSE_LOCATION）或“精确位置”（ACCESS_FINE_LOCATION），因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，其值与 location 别名相同。 | 1.2.0    |

#### 地理位置插件权限

| 属性                | 类型                                     |
| ------------------- | ---------------------------------------- |
| **`permissions`**   | <code>GeolocationPermissionType[]</code> |

### 类型别名

#### 监听位置回调

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>

#### 回调 ID

<code>string</code>

#### 权限状态

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### 地理位置权限类型

<code>'location' | 'coarseLocation'</code>

</docgen-api>

### 错误

插件在原生 Android 和 iOS 平台上会返回带有特定代码的错误。Web 平台不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码             | 平台        | 消息                                   |
| -------------------- | ----------- | ---------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | 尝试获取位置时发生错误。 |
| OS-PLUG-GLOC-0003 | Android, iOS | 位置权限请求被拒绝。 |
| OS-PLUG-GLOC-0004 | iOS         | 'getCurrentPosition' 输入参数无效。 |
| OS-PLUG-GLOC-0005 | iOS         | 'watchPosition' 输入参数无效。 |
| OS-PLUG-GLOC-0006 | iOS         | 'clearWatch' 输入参数无效。 |
| OS-PLUG-GLOC-0007 | Android, iOS | 位置服务未启用。 |
| OS-PLUG-GLOC-0008 | iOS         | 应用对位置服务的使用受到限制。 |
| OS-PLUG-GLOC-0009 | Android     | 启用位置的请求被拒绝。 |
| OS-PLUG-GLOC-0010 | Android     | 无法在指定时间内获取位置。尝试设置更长的超时时间。 |
| OS-PLUG-GLOC-0011 | Android     | 超时时间必须为正值。 |
| OS-PLUG-GLOC-0012 | Android     | 未找到 WatchId。 |
| OS-PLUG-GLOC-0013 | Android     | 必须提供 WatchId。 |
| OS-PLUG-GLOC-0014 | Android     | Google Play 服务错误，用户可解决。 |
| OS-PLUG-GLOC-0015 | Android     | Google Play 服务错误。 |
| OS-PLUG-GLOC-0016 | Android     | 位置设置错误。 |