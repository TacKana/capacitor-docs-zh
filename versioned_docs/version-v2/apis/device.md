---
title: 设备
description: 设备 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/device
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Device API 公开了设备的内部信息，例如型号和操作系统版本，以及用户信息，如唯一标识符。

- [`getInfo()`](#getinfo)
- [`getBatteryInfo()`](#getbatteryinfo)
- [`getLanguageCode()`](#getlanguagecode)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

const info = await Device.getInfo();
console.log(info);

// 示例输出：
{
  "diskFree": 12228108288,
  "appVersion": "1.0.2",
  "appBuild": "123",
  "appId": "com.capacitorjs.myapp",
  "appName": "MyApp",
  "operatingSystem": "ios",
  "osVersion": "11.2",
  "platform": "ios",
  "memUsed": 93851648,
  "diskTotal": 499054952448,
  "model": "iPhone",
  "manufacturer": "Apple",
  "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
  "isVirtual":true
}

const info = await Device.getBatteryInfo();
console.log(info);

// 示例输出：
{
  "batteryLevel": -1,
  "isCharging": true
}
```

## API

### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回关于底层设备/操作系统/平台的信息

**返回：** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<DeviceBatteryInfo>
```

返回关于电池的信息

**返回：** <code>Promise&lt;<a href="#devicebatteryinfo">DeviceBatteryInfo</a>&gt;</code>

---

### getLanguageCode()

```typescript
getLanguageCode() => Promise<DeviceLanguageCodeResult>
```

获取设备当前的语言区域代码

**返回：** <code>Promise&lt;<a href="#devicelanguagecoderesult">DeviceLanguageCodeResult</a>&gt;</code>

---

### 接口

#### DeviceInfo

| 属性 | 类型 | 描述 |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**            | <code>string</code>                                                | 注意：此属性仅 iOS 可用。设备名称。例如 "John's iPhone" |
| **`model`**           | <code>string</code>                                                | 设备型号。例如 "iPhone" |
| **`platform`**        | <code>"ios" \| "android" \| "electron" \| "web"</code>             | 设备平台（小写）。 |
| **`uuid`**            | <code>string</code>                                                | 设备对应用可用的 UUID。在仅允许每个安装应用 UUID 的现代移动平台上，此标识符可能会变化。 |
| **`appVersion`**      | <code>string</code>                                                | 应用的当前 bundle 版本 |
| **`appBuild`**        | <code>string</code>                                                | 应用的当前 bundle 构建号 |
| **`appId`**           | <code>string</code>                                                | 应用的 bundle id |
| **`appName`**         | <code>string</code>                                                | 应用的显示名称 |
| **`operatingSystem`** | <code>"unknown" \| "ios" \| "android" \| "windows" \| "mac"</code> | 设备的操作系统 |
| **`osVersion`**       | <code>string</code>                                                | 设备操作系统的版本 |
| **`manufacturer`**    | <code>string</code>                                                | 设备的制造商 |
| **`isVirtual`**       | <code>boolean</code>                                               | 应用是否在模拟器中运行 |
| **`memUsed`**         | <code>number</code>                                                | 当前应用大约使用的内存，以字节为单位。除以 1048576 得到使用的 MB 数。 |
| **`diskFree`**        | <code>number</code>                                                | 操作系统正常数据存储路径上可用的空闲磁盘空间，以字节为单位 |
| **`diskTotal`**       | <code>number</code>                                                | 操作系统正常数据存储路径的总大小，以字节为单位 |

#### DeviceBatteryInfo

| 属性 | 类型 | 描述 |
| ------------------ | -------------------- | ---------------------------------------------------------------- |
| **`batteryLevel`** | <code>number</code>  | 电池充电百分比（0 到 1） |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电 |

#### DeviceLanguageCodeResult

| 属性 | 类型 |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |
