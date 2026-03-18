---
title: Device Capacitor 插件 API
description: Device API 提供设备内部信息，例如型号和操作系统版本，以及用户信息如唯一标识符。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

Device API 提供设备内部信息，例如型号和操作系统版本，以及用户信息如唯一标识符。

## 安装

```bash
npm install @capacitor/device@latest-7
npx cap sync
```

## 插件使用示例

```typescript
import { Device } from '@capacitor/device';

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};
```

## API

<docgen-index>

* [`getId()`](#getid)
* [`getInfo()`](#getinfo)
* [`getBatteryInfo()`](#getbatteryinfo)
* [`getLanguageCode()`](#getlanguagecode)
* [`getLanguageTag()`](#getlanguagetag)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getId()

```typescript
getId() => Promise<DeviceId>
```

返回设备的唯一标识符。

**返回值：** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回底层设备/操作系统/平台的相关信息。

**返回值：** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回电池的相关信息。

**返回值：** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备当前的语言区域代码。

**返回值：** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

获取设备当前的语言区域标签。

**返回值：** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**起始版本：** 4.0.0

--------------------


### 接口


#### DeviceId

| 属性             | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 起始版本 |
| ---------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | <code>string</code> | 应用程序可访问的设备标识符。在现代移动平台上，此标识符可能会发生变化，因为平台通常只允许每个应用拥有独立的安装ID。在 iOS 上，此标识符是一个 UUID，用于唯一标识应用供应商的设备（[了解更多](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)）。在 Android 8+ 上，**此标识符是一个 64 位数字（以十六进制字符串表示）**，对于每个应用签名密钥、用户和设备的组合是唯一的（[了解更多](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)）。在 Web 端，会生成一个随机标识符并存储在 localStorage 中供后续调用。如果 localStorage 不可用，则每次调用都会生成一个新的随机标识符。 | 1.0.0 |#### DeviceInfo

| 属性                   | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                      | 起始版本 |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`name`**             | <code>string</code>                                         | 设备名称。例如："John's iPhone"。此功能仅在 iOS 和 Android 7.1 及以上版本中受支持。在 iOS 16+ 上，若无适当的[权限](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name)，将返回通用设备名称。 | 1.0.0    |
| **`model`**            | <code>string</code>                                         | 设备型号。例如："iPhone13,4"。                                                                                                                                                                                                                                                                                                             | 1.0.0    |
| **`platform`**         | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台（小写）。                                                                                                                                                                                                                                                                                                                         | 1.0.0    |
| **`operatingSystem`**  | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备的操作系统。                                                                                                                                                                                                                                                                                                                          | 1.0.0    |
| **`osVersion`**        | <code>string</code>                                         | 设备操作系统的版本号。                                                                                                                                                                                                                                                                                                                    | 1.0.0    |
| **`iOSVersion`**       | <code>number</code>                                         | iOS 版本号。仅 iOS 可用。多段式版本号会被压缩成一个补足至两位数的整数，例如：`"16.3.1"` -> `160301`                                                                                                                                                                                                                                      | 5.0.0    |
| **`androidSDKVersion`**| <code>number</code>                                         | Android SDK 版本号。仅 Android 可用。                                                                                                                                                                                                                                                                                                    | 5.0.0    |
| **`manufacturer`**     | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                                                                                                                                               | 1.0.0    |
| **`isVirtual`**        | <code>boolean</code>                                        | 应用是否运行在模拟器/仿真器中。                                                                                                                                                                                                                                                                                                            | 1.0.0    |
| **`memUsed`**          | <code>number</code>                                         | 当前应用大致使用的内存，单位为字节。除以 1048576 可获得使用的 MB 数。                                                                                                                                                                                                                                                                       | 1.0.0    |
| **`webViewVersion`**   | <code>string</code>                                         | WebView 浏览器版本。                                                                                                                                                                                                                                                                                                                      | 1.0.0    |

#### BatteryInfo

| 属性               | 类型                 | 描述                                     | 起始版本 |
| ------------------ | -------------------- | ---------------------------------------- | -------- |
| **`batteryLevel`** | <code>number</code>  | 表示电池电量百分比的数值（0 到 1）。      | 1.0.0    |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。                       | 1.0.0    |

#### GetLanguageCodeResult

| 属性        | 类型                | 描述                     | 起始版本 |
| ----------- | ------------------- | ------------------------ | -------- |
| **`value`** | <code>string</code> | 两位字符的语言代码。     | 1.0.0    |

#### LanguageTag

| 属性        | 类型                | 描述                                     | 起始版本 |
| ----------- | ------------------- | ---------------------------------------- | -------- |
| **`value`** | <code>string</code> | 返回一个格式良好的 IETF BCP 47 语言标签。 | 4.0.0    |

### 类型别名

#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>