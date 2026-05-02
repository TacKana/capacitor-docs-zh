```mdx
---
title: Geolocation Capacitor 插件 API
description: Geolocation API 提供了简单的方法来获取和跟踪设备的当前位置（使用 GPS），以及可用的海拔、航向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 地理位置
---

# @capacitor/geolocation

Geolocation API 提供了简单的方法来获取和跟踪设备的当前位置（使用 GPS），以及可用的海拔、航向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中为位置信息指定隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription`（`Privacy - Location Always and When In Use Usage Description`）
- `NSLocationWhenInUseUsageDescription`（`Privacy - Location When In Use Usage Description`）

> [!NOTE]
> 此 Capacitor 插件不直接支持后台地理定位。但它依赖于
> [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，
> 该库可以在后台报告位置。因此，Apple 要求你在 `Info.plist` 中包含
> `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限提示不会向用户显示，
> 你可以安全地使用与 `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 以获取更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

此插件需要在你的 `AndroidManifest.xml` 中添加以下权限：

```xml
<!-- Geolocation Plugin -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据（包括粗略和精确位置），最后一行是可选的，但如果你的应用依赖 GPS 才能运行，则必须包含它。你可以省略它，但请注意这可能意味着你的应用会安装在没有 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 以获取更多关于设置 Android 权限的信息。

## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)

</docgen-index>

有关错误代码列表，请参阅 [错误](#错误)

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备当前的 GPS 位置

| 参数           | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化监听。请注意，监听位置变化会消耗大量电量。仅在需要时智能地开启监听。

| 参数           | 类型                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

**自版本：** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监听

| 参数           | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**自版本：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，将抛出错误。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，将抛出错误。

在 Web 上不可用。

| 参数             | 类型                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### 接口


#### Position

| 属性            | 类型                                                                                                                                                                                                                                                                                                       | 描述                                             | 自版本 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                                                                                                                                        | 坐标的创建时间戳                           | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; magneticHeading: number \| null; trueHeading: number \| null; headingAccuracy: number \| null; course: number \| null; }</code> | GPS 坐标以及数据的精确度 | 1.0.0 |

<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
</docgen-api>
```#### PositionOptions

| 属性                           | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 默认值                 | 起始版本 |
| ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----- |
| **`enableHighAccuracy`**     | <code>boolean</code> | 高精度模式（例如使用 GPS，若可用）。在 Android 12+ 设备上，如果用户未授予 `ACCESS_FINE_LOCATION` 权限（可通过 location 别名检查），该设置将被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | <code>false</code>     | 1.0.0 |
| **`timeout`**                | <code>number</code>  | 等待位置更新的最大时长（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | <code>10000</code>     | 1.0.0 |
| **`maximumAge`**             | <code>number</code>  | 可接受的缓存位置的最大时效（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | <code>0</code>         | 1.0.0 |
| **`minimumUpdateInterval`**  | <code>number</code>  | `watchPosition` 的最小更新间隔。不要与 `interval` 混淆。如果位置更新的可用频率高于此间隔，则仅当自上次位置更新后最小更新间隔已过期时，才会触发更新。该参数仅适用于 Android，在 iOS 或 Web 平台上无效。                                                                                                                                                                                                                                                                                                                                                                                                                    | <code>5000</code>      | 6.1.0 |
| **`interval`**               | <code>number</code>  | 在 `watchPosition` 中接收位置更新的期望间隔（毫秒）。当 `interval` 取值非常小（几秒或更少）时，平台可能无法保证及时的位置更新——实际耗时可能超过指定值。平台也可能以比 `interval` 更快的频率提供位置更新。您可以使用 `minimumUpdateInterval` 来控制该行为。为了向后兼容 7.1.x 版本，如果未传入值，此参数的默认值与 `timeout` 相同。该参数仅适用于 Android，在 iOS 或 Web 平台上无效。                                                                                                                                                                                                                                  | <code>`timeout`</code> | 8.0.0 |
| **`enableLocationFallback`** | <code>boolean</code> | 当 Google Play 服务的位置设置检查失败时，是否回退到 Android 框架的 `LocationManager`。失败可能由多种原因导致——例如设备未安装 Play 服务，或设备处于无网络连接状态（飞行模式）。若设置为 `false`，失败将直接传递给调用方。请注意，`LocationManager` 的效果可能不如 Google Play 服务实现。如果设备处于飞行模式，则仅使用 GPS 提供程序，根据 GPS 信号强度，获取位置的时间可能更长。这意味着，在这种情况下接收位置，您可能需要设置更高的超时时间。该参数仅适用于 Android，在 iOS 或 Web 平台上无效。                                                                                             | <code>true</code>      | 8.0.0 |

#### ClearWatchOptions

| 属性     | 类型                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |#### PermissionStatus

| 属性                  | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                        | 自版本 |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | 位置别名（location）对应的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 两项权限。在 iOS 和 Web 上，它会请求/检查位置权限。                                                                                                                                                                        | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | 粗略位置别名（coarseLocation）对应的权限状态。在 Android 上，它会请求/检查 ACCESS_COARSE_LOCATION 权限。在 Android 12+ 中，用户可以选择大致位置（ACCESS_COARSE_LOCATION）或精确位置（ACCESS_FINE_LOCATION），因此当应用不需要高精度时可以使用此别名。在 iOS 和 Web 上，该值与 location 别名相同。 | 1.2.0 |


#### GeolocationPluginPermissions

| 属性              | 类型                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |


### 类型别名

#### WatchPositionCallback

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>

#### CallbackID

<code>string</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### GeolocationPermissionType

<code>'location' | 'coarseLocation'</code>

<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
<span id="clearwatchoptions"></span>
<span id="geolocationpluginpermissions"></span>
<span id="permissionstatus"></span>
<span id="positionoptions"></span>
<span id="watchpositioncallback"></span>
</docgen-api>

### 错误码

该插件在原生 Android 和 iOS 平台上会返回带有特定错误码的错误信息。Web 平台不遵循此错误标准。

下表列出了插件所有的错误码：

| 错误码               | 平台          | 错误信息                                      |
| -------------------- | ------------ | ---------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | 尝试获取位置时发生错误。 |
| OS-PLUG-GLOC-0003 | Android, iOS | 位置权限请求被拒绝。 |
| OS-PLUG-GLOC-0004 | iOS          | “getCurrentPosition” 的输入参数无效。 |
| OS-PLUG-GLOC-0005 | iOS          | “watchPosition” 的输入参数无效。 |
| OS-PLUG-GLOC-0006 | iOS          | “clearWatch” 的输入参数无效。 |
| OS-PLUG-GLOC-0007 | Android, iOS | 位置服务未开启。 |
| OS-PLUG-GLOC-0008 | iOS          | 应用使用位置服务的权限受到限制。 |
| OS-PLUG-GLOC-0009 | Android      | 开启位置的请求被拒绝。 |
| OS-PLUG-GLOC-0010 | Android, iOS | 未能及时获取位置。请尝试设置更高的超时时间。 |
| OS-PLUG-GLOC-0011 | Android      | 超时时间必须为正数。 |
| OS-PLUG-GLOC-0012 | Android      | 未找到指定的 WatchId。 |
| OS-PLUG-GLOC-0013 | Android      | 必须提供 WatchId。 |
| OS-PLUG-GLOC-0014 | Android      | Google Play Services 出现可解析的用户错误。 |
| OS-PLUG-GLOC-0015 | Android      | Google Play Services 出现错误。 |
| OS-PLUG-GLOC-0016 | Android      | 位置设置错误。 |
| OS-PLUG-GLOC-0017 | Android      | 无法获取位置，因为设备的网络和定位功能均已关闭。 |