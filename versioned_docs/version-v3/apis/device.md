---
title: Device Capacitor 插件 API
description: Device API 提供了设备的内部信息，例如型号和操作系统版本，以及用户信息如唯一标识符。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

Device API 提供了设备的内部信息，例如型号和操作系统版本，以及用户信息如唯一标识符。

## 安装

```bash
npm install @capacitor/device
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
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>


### getId()

```typescript
getId() => Promise<DeviceId>
```

返回设备的唯一标识符。

**返回值：** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回底层设备/操作系统/平台的相关信息。

**返回值：** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回电池相关信息。

**返回值：** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备当前的语言区域代码。

**返回值：** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### 接口


#### DeviceId

| 属性       | 类型                | 描述                                                                                                                                                                                                                            | 版本 |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`uuid`** | <code>string</code> | 设备对应用可用的 UUID。在现代移动平台上，此标识符可能会因每次应用安装而变化。在 Web 端，会生成随机标识符并存储在 localStorage 中以供后续调用使用。 | 1.0.0 |


#### DeviceInfo

| 属性                  | 类型                                                        | 描述                                                                                                                                                                                                                         | 版本 |
| --------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`name`**            | <code>string</code>                                         | 设备名称。例如："John的iPhone"。仅在 iOS 和 Android 7.1 及以上版本支持。                                                                                                                       | 1.0.0 |
| **`model`**           | <code>string</code>                                         | 设备型号。例如："iPhone"。                                                                                                                                                                                            | 1.0.0 |
| **`platform`**        | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台（小写）。                                                                                                                                                                                                    | 1.0.0 |
| **`operatingSystem`** | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备的操作系统。                                                                                                                                                                                                 | 1.0.0 |
| **`osVersion`**       | <code>string</code>                                         | 设备操作系统版本。                                                                                                                                                                                                       | 1.0.0 |
| **`manufacturer`**    | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                     | 1.0.0 |
| **`isVirtual`**       | <code>boolean</code>                                        | 应用是否运行在模拟器/仿真器中。                                                                                                                                                                                 | 1.0.0 |
| **`memUsed`**         | <code>number</code>                                         | 当前应用占用的近似内存，单位字节。除以 1048576 可得到 MB 值。                                                                                                                              | 1.0.0 |
| **`diskFree`**        | <code>number</code>                                         | 操作系统常规数据存储路径的可用磁盘空间，单位字节。在 Android 上返回核心 Android OS 所在"系统"分区的可用空间。iOS 上此值不准确。 | 1.0.0 |
| **`diskTotal`**       | <code>number</code>                                         | 操作系统常规数据存储路径的总大小，单位字节。在 Android 上返回核心 Android OS 所在"系统"分区的总空间大小。                                                                    | 1.0.0 |
| **`realDiskFree`**    | <code>number</code>                                         | 常规数据存储路径的可用磁盘空间，单位字节。                                                                                                                                                     | 1.1.0 |
| **`realDiskTotal`**   | <code>number</code>                                         | 常规数据存储路径的总大小，单位字节。                                                                                                                                                                           | 1.1.0 |
| **`webViewVersion`**  | <code>string</code>                                         | WebView 浏览器版本                                                                                                                                                                                                        | 1.0.0 |


#### BatteryInfo

| 属性               | 类型                 | 描述                                                       | 版本 |
| ------------------ | -------------------- | ----------------------------------------------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | 电池电量百分比（0到1之间）。 | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。                                   | 1.0.0 |


#### GetLanguageCodeResult

| 属性        | 类型                | 描述                  | 版本 |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`value`** | <code>string</code> | 两位字符的语言代码。 | 1.0.0 |


### 类型别名


#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>