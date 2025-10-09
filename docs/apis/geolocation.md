---
title: GPS定位 Capacitor 插件 API
description: GPS定位 API 提供了简便的方法，用于通过 GPS 获取和追踪设备的当前位置，并在可用时提供海拔、朝向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/next/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/next/packages/capacitor-plugin/src/definitions.ts
sidebar_label: GPS定位
---

# @capacitor/geolocation

地理定位 API 提供了简便的方法，用于通过 GPS 获取和追踪设备的当前位置，并在可用时提供海拔、朝向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription`（`隐私 - 始终和在应用使用时访问位置的使用说明`）
- `NSLocationWhenInUseUsageDescription`（`隐私 - 在应用使用时访问位置的使用说明`）

> [!注意]
> 此 Capacitor 插件不直接支持后台地理定位。但它依赖于
> [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，该组件可以在后台报告
> 位置。因此，Apple 要求你在 `Info.plist` 中包含
> `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限
> 提示不会向用户显示，你可以安全地使用与
> `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此插件需要将以下权限添加到你的 `AndroidManifest.xml`：

```xml
<!-- 地理定位插件 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求获取粗略和精确的位置数据，最后一行是可选的，但如果你的应用*需要* GPS 才能运行，则是必需的。你也可以省略它，但请注意，这可能导致你的应用安装在缺少 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分，了解更多关于设置 Android 权限的信息。

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

有关错误代码列表，请参阅 [错误](#errors)

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置

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

设置位置变化的监听器。请注意，监听位置变化
可能会消耗大量电量。仅在需要时智能地监听。

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

清除指定的监听器

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，将抛出错误。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，将抛出错误。

在 Web 上不可用。

| 参数              | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### Position

| 属性            | 类型                                                                                                                                                                                | 描述               | 自版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳   | 1.0.0  |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标及数据精度 | 1.0.0  |

#### PositionOptions

| 属性（Prop）                 | 类型（Type）                | 描述（Description）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 默认值（Default）  | 起始版本（Since） |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------------- |
| **`enableHighAccuracy`**     | <code>boolean</code>（布尔值） | 高精度模式（如全球定位系统GPS，若设备支持）。在Android 12及以上版本设备上，若用户未授予`ACCESS_FINE_LOCATION`（精确位置访问）权限（可通过位置别名检查），此模式将被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>（否） | 1.0.0             |
| **`timeout`**                | <code>number</code>（数字）   | 位置更新的最长等待时间（单位：毫秒）。在Android平台，自插件7.1.0版本起，该参数还用于确定`watchPosition`（监听位置）功能的位置更新间隔。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | <code>10000</code>（10000毫秒） | 1.0.0             |
| **`maximumAge`**             | <code>number</code>（数字）   | 可接受返回的缓存位置的最大有效期（单位：毫秒）。即若缓存位置的生成时间距当前时间不超过该值，则可返回此缓存位置。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | <code>0</code>（0毫秒） | 1.0.0             |
| **`minimumUpdateInterval`**  | <code>number</code>（数字）   | 位置更新的最小时间间隔（单位：毫秒）。若位置更新的可用频率高于此间隔，则仅当距离上次位置更新已超过该最小间隔时，才会触发新的更新。此参数**仅适用于Android平台**，在iOS或Web平台上无效果。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>5000</code>（5000毫秒） | 6.1.0             |
| **`enableLocationFallback`** | <code>boolean</code>（布尔值） | 此选项**仅适用于Android平台**。当谷歌Play服务（Google Play Service）的位置设置检查失败时，是否回退使用Android框架的`LocationManager`（位置管理器）。检查失败可能由多种原因导致，例如设备未安装Play服务、设备无网络连接（飞行模式）等。<br>若设为`false`（否），失败信息将传递给调用者。<br>**注意**：`LocationManager`的定位效果可能不如谷歌Play服务的实现。若设备处于飞行模式，仅会使用GPS定位源，而GPS定位获取位置的时间可能更长（取决于GPS信号强度）。这意味着在此类场景下，若需成功获取位置，可能需要设置更长的`timeout`（超时时间）。                                                                                                                                                                                                                                                          | <code>true</code>（是） | 8.0.0             |


#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |

#### PermissionStatus

| 属性                 | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                | 自版本 |
| -------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | location 别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它请求/检查位置权限。                                                                                                                                                    | 1.0.0  |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以选择 Approximate location（ACCESS_COARSE_LOCATION）或 Precise location（ACCESS_FINE_LOCATION），因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，其值与 location 别名相同。 | 1.2.0  |

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

### 错误

插件在原生 Android 和 iOS 上返回特定的错误代码。Web 不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码          | 平台         | 错误信息                                     |
| ----------------- | ------------ | -------------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | 尝试获取位置时出错。                         |
| OS-PLUG-GLOC-0003 | Android, iOS | 位置权限请求被拒绝。                         |
| OS-PLUG-GLOC-0004 | iOS          | 'getCurrentPosition' 输入参数无效。          |
| OS-PLUG-GLOC-0005 | iOS          | 'watchPosition' 输入参数无效。               |
| OS-PLUG-GLOC-0006 | iOS          | 'clearWatch' 输入参数无效。                  |
| OS-PLUG-GLOC-0007 | Android, iOS | 位置服务未启用。                             |
| OS-PLUG-GLOC-0008 | iOS          | 应用使用位置服务的权限受限。                 |
| OS-PLUG-GLOC-0009 | Android      | 启用位置的请求被拒绝。                       |
| OS-PLUG-GLOC-0010 | Android      | 无法在指定时间内获取位置。尝试增加超时时间。 |
| OS-PLUG-GLOC-0011 | Android      | 超时时间必须为正值。                         |
| OS-PLUG-GLOC-0012 | Android      | 未找到 WatchId。                             |
| OS-PLUG-GLOC-0013 | Android      | 必须提供 WatchId。                           |
| OS-PLUG-GLOC-0014 | Android      | Google Play 服务错误，用户可解决。           |
| OS-PLUG-GLOC-0015 | Android      | Google Play 服务错误。                       |
| OS-PLUG-GLOC-0016 | Android      | 位置设置错误。                               |
| OS-PLUG-GLOC-0017 | Android      | 由于设备的网络和位置均已关闭，无法获取位置信息。 |