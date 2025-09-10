---
title: Device Capacitor Plugin API
description: Device API 提供设备内部信息（如型号和操作系统版本）以及用户信息（如唯一标识符）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

Device API 提供设备内部信息（如型号和操作系统版本）以及用户信息（如唯一标识符）。

## 安装

```bash
npm install @capacitor/device@latest-5
npx cap sync
```

## 示例

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

**返回值:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**自:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回底层设备/操作系统/平台的信息。

**返回值:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**自:** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回电池相关信息。

**返回值:** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**自:** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备当前的语言区域代码。

**返回值:** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

获取设备当前的语言区域标签。

**返回值:** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**自:** 4.0.0

--------------------


### 接口


#### DeviceId

| 属性              | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 自    |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | <code>string</code> | 应用可访问的设备标识符。在现代只允许按应用安装ID的移动平台上，此标识符可能会变化。<br>iOS上是一个UUID，唯一标识供应商的设备（[了解更多](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)）。<br>Android 8+上是64位数字（以十六进制字符串表示），对每个应用签名密钥、用户和设备组合是唯一的（[了解更多](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)）。<br>Web上会生成随机标识符并存储在localStorage中供后续调用。如果localStorage不可用，则每次调用都会生成新的随机标识符。 | 1.0.0 |


#### DeviceInfo

| 属性                     | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                      | 自    |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`name`**              | <code>string</code>                                         | 设备名称。例如"John的iPhone"。仅iOS和Android 7.1及以上支持。<br>iOS 16+上若无相应[授权](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name)会返回通用设备名。 | 1.0.0 |
| **`model`**             | <code>string</code>                                         | 设备型号。例如"iPhone13,4"。                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`platform`**          | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台（小写）。                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`operatingSystem`**   | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备操作系统。                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`osVersion`**         | <code>string</code>                                         | 设备操作系统版本。                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`iOSVersion`**        | <code>number</code>                                         | iOS版本号。仅iOS可用。多段版本号会被压缩为两位数填充的整数，例如：`"16.3.1"` → `160301`                                                                                                                                                                                   | 5ureth0.0 |
| **`androidSDKVersion`** | <code>number</code>                                         | Android SDK版本号。仅Android可用。                                                                                                                                                                                                                                                                                       | 5.0.0 |
| **`manufacturer`**      | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`isVirtual`**         | <code>boolean</code>                                        | 应用是否运行在模拟器/仿真器中。                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`memUsed`**           | <code>number</code>                                         | 当前应用使用的近似内存（字节）。除以1048576可得到MB值。                                                                                                                                                                                                                                           | 1.0.0 |
| **`diskFree`**          | <code>number</code>                                         | 操作系统常规数据存储路径的可用磁盘空间（字节）。<br>Android返回核心Android OS所在"system"分区的空闲空间。<br>iOS此值不准确。                                                                                                                  | 1.0.0 |
| **`diskTotal`**         | <code>number</code>                                         | 操作系统常规数据存储路径的总大小（字节）。<br>Android返回核心Android OS所在"system"分区的总大小。                                                                                                                                                                                 | 1.0.0 |
| **`realDiskFree`**      | <code>number</code>                                         | 常规数据存储路径的实际可用空间（字节）。                                                                                                                                                                                                                                                                      | 1.1.0 |
| **`realDiskTotal`**     | <code>number</code>                                         | 常规数据存储路径的实际总大小（字节）。                                                                                                                                                                                                                                                                                        | 1.1.0 |
| **`webViewVersion`**    | <code>string</code>                                         | WebView浏览器版本。                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### BatteryInfo

| 属性                 | 类型                 | 描述                                                       | 自    |
| -------------------- | -------------------- | ----------------------------------------------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | 电池电量百分比（0到1）。 | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。                                   | 1.0.0 |


#### GetLanguageCodeResult

| 属性        | 类型                | 描述                  | 自    |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`value`** | <code>string</code> | 两位字母的语言代码。 | 1.0.0 |


#### LanguageTag

| 属性        | 类型                | 描述                                     | 自    |
| ----------- | ------------------- | ----------------------------------------------- | ----- |
| **`value`** | <code>string</code> | 返回符合规范的IETF BCP 47语言标签。 | 4.0.0 |


### 类型别名


#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>