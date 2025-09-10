---
title: Device Capacitor Plugin API
description: Device API 提供了设备内部信息（如型号和操作系统版本）以及用户信息（如唯一标识符）。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

Device API 提供了设备内部信息（如型号和操作系统版本）以及用户信息（如唯一标识符）。

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

- [`getId()`](#getid)
- [`getInfo()`](#getinfo)
- [`getBatteryInfo()`](#getbatteryinfo)
- [`getLanguageCode()`](#getlanguagecode)
- [`getLanguageTag()`](#getlanguagetag)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>

### getId()

```typescript
getId() => Promise<DeviceId>
```

返回设备的唯一标识符。

**返回值:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**自:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回底层设备/操作系统/平台的信息。

**返回值:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**自:** 1.0.0

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回电池相关信息。

**返回值:** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**自:** 1.0.0

---

### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备当前的语言区域代码。

**返回值:** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**自:** 1.0.0

---

### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

获取设备当前的语言区域标签。

**返回值:** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**自:** 4.0.0

---

### Interfaces

#### DeviceId

| 属性       | 类型                | 说明                                                                                                                                                                                                 | 自    |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`uuid`** | <code>string</code> | 应用可访问的设备 UUID。在现代移动平台上，此标识符可能随应用的安装而变化。在 Web 端，会生成随机标识符并存储在 localStorage 中供后续调用。如果 localStorage 不可用，则每次调用都会生成新的随机标识符。 | 1.0.0 |

#### DeviceInfo

| 属性                  | 类型                                                        | 说明                                                                                                                             | 自           |
| --------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ----- |
| **`name`**            | <code>string</code>                                         | 设备名称。例如"John's iPhone"。仅在 iOS 和 Android 7.1 及以上版本支持。                                                          | 1.0.0        |
| **`model`**           | <code>string</code>                                         | 设备型号。例如"iPhone13,4"。                                                                                                     | 1.0.0        |
| **`platform`**        | <code>'ios'                                                 | 'android'                                                                                                                        | 'web'</code> | 设备平台（小写）。 | 1.0.0 |
| **`operatingSystem`** | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备操作系统。                                                                                                                   | 1.0.0        |
| **`osVersion`**       | <code>string</code>                                         | 设备操作系统版本。                                                                                                               | 1.0.0        |
| **`manufacturer`**    | <code>string</code>                                         | 设备制造商。                                                                                                                     | 1.0.0        |
| **`isVirtual`**       | <code>boolean</code>                                        | 是否运行在模拟器/仿真器中。                                                                                                      | 1.0.0        |
| **`memUsed`**         | <code>number</code>                                         | 当前应用使用的内存字节数。除以 1048576 可得到 MB 值。                                                                            | 1.0.0        |
| **`diskFree`**        | <code>number</code>                                         | 操作系统常规数据存储路径的可用磁盘空间（字节）。在 Android 上返回核心 Android OS 所在"系统"分区的可用空间。在 iOS 上此值不准确。 | 1.0.0        |
| **`diskTotal`**       | <code>number</code>                                         | 操作系统常规数据存储路径的总大小（字节）。在 Android 上返回核心 Android OS 所在"系统"分区的总大小。                              | 1.0.0        |
| **`realDiskFree`**    | <code>number</code>                                         | 常规数据存储的实际可用磁盘空间（字节）。                                                                                         | 1.1.0        |
| **`realDiskTotal`**   | <code>number</code>                                         | 常规数据存储路径的总大小（字节）。                                                                                               | 1.1.0        |
| **`webViewVersion`**  | <code>string</code>                                         | WebView 浏览器版本                                                                                                               | 1.0.0        |

#### BatteryInfo

| 属性               | 类型                 | 说明                       | 自    |
| ------------------ | -------------------- | -------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | 电池电量百分比（0 到 1）。 | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。         | 1.0.0 |

#### GetLanguageCodeResult

| 属性        | 类型                | 说明                 | 自    |
| ----------- | ------------------- | -------------------- | ----- |
| **`value`** | <code>string</code> | 两位字符的语言代码。 | 1.0.0 |

#### LanguageTag

| 属性        | 类型                | 说明                                  | 自    |
| ----------- | ------------------- | ------------------------------------- | ----- |
| **`value`** | <code>string</code> | 返回格式良好的 IETF BCP 47 语言标签。 | 4.0.0 |

### Type Aliases

#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>
