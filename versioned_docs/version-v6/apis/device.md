---
title: Device Capacitor Plugin API
description: Device API 提供了关于设备的内部信息，如型号和操作系统版本，以及用户信息如唯一标识符。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

Device API 提供了关于设备的内部信息，如型号和操作系统版本，以及用户信息如唯一标识符。

## 安装

```bash
npm install @capacitor/device
npx cap sync
```

## 苹果隐私清单要求

为加强用户隐私保护，苹果现要求应用开发者在提交应用到 App Store Connect 时，必须声明 API 的使用目的。2024 年 5 月 1 日起，此项要求将强制执行。

使用本插件时，需在 `/ios/App` 目录下创建 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展生成该文件，并指定使用理由。

具体操作步骤请参考 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**本插件需要使用字典键 [NSPrivacyAccessedAPICategoryDiskSpace](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397)，推荐声明理由为 [85F4.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397)。**

### 示例 PrivacyInfo.xcprivacy 文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果隐私文件已存在，请将此字典项添加到数组 -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryDiskSpace</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>85F4.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
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

- [`getId()`](#getid)
- [`getInfo()`](#getinfo)
- [`getBatteryInfo()`](#getbatteryinfo)
- [`getLanguageCode()`](#getlanguagecode)
- [`getLanguageTag()`](#getlanguagetag)
- [接口](#interfaces)
- [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getId()

```typescript
getId() => Promise<DeviceId>
```

获取设备的唯一标识符。

**返回值:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**自:** 1.0.0

---

### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

获取底层设备/操作系统/平台的信息。

**返回值:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**自:** 1.0.0

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

获取电池相关信息。

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

| 属性             | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 自    |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | <code>string</code> | 应用可获取的设备标识符。在现代只允许获取应用安装 ID 的移动平台上，此标识符可能会变化。iOS 上，此标识符是 UUID，用于唯一标识设备给应用供应商（[了解更多](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)）。Android 8+ 上，**标识符是一个 64 位数字（以十六进制字符串表示）**，对每个应用签名密钥、用户和设备的组合是唯一的（[了解更多](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)）。Web 上会生成随机标识符并存储在 localStorage 中供后续调用。如果 localStorage 不可用，则每次调用都会生成新的随机标识符。 | 1.0.0 |

#### DeviceInfo

| 属性                    | 类型                                                        | 描述                                                                                                                                                                                                                                                                          | 自    |
| ----------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`name`**              | <code>string</code>                                         | 设备名称。例如"John 的 iPhone"。仅支持 iOS 和 Android 7.1 及以上版本。iOS 16+ 上需要相应[权限](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name)才能返回真实设备名，否则返回通用名称。 | 1.0.0 |
| **`model`**             | <code>string</code>                                         | 设备型号。例如"iPhone13,4"。                                                                                                                                                                                                                                                  | 1.0.0 |
| **`platform`**          | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台（小写）。                                                                                                                                                                                                                                                            | 1.0.0 |
| **`operatingSystem`**   | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备操作系统。                                                                                                                                                                                                                                                                | 1.0.0 |
| **`osVersion`**         | <code>string</code>                                         | 设备操作系统版本。                                                                                                                                                                                                                                                            | 1.0.0 |
| **`iOSVersion`**        | <code>number</code>                                         | iOS 版本号。仅 iOS 可用。多部分版本号会被压缩为两位数的整数，例如 `"16.3.1"` → `160301`                                                                                                                                                                                       | 5.0.0 |
| **`androidSDKVersion`** | <code>number</code>                                         | Android SDK 版本号。仅 Android 可用。                                                                                                                                                                                                                                         | 5.0.0 |
| **`manufacturer`**      | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`isVirtual`**         | <code>boolean</code>                                        | 应用是否运行在模拟器/仿真器中。                                                                                                                                                                                                                                               | 1.0.0 |
| **`memUsed`**           | <code>number</code>                                         | 当前应用使用的近似内存大小，单位字节。除以 1048576 可得到 MB 数。                                                                                                                                                                                                             | 1.0.0 |
| **`diskFree`**          | <code>number</code>                                         | 操作系统常规数据存储路径的可用磁盘空间，单位字节。Android 上返回核心 Android 操作系统所在"system"分区的可用空间。iOS 上此值不准确。                                                                                                                                           | 1.0.0 |
| **`diskTotal`**         | <code>number</code>                                         | 操作系统常规数据存储路径的总大小，单位字节。Android 上返回核心 Android 操作系统所在"system"分区的总大小。                                                                                                                                                                     | 1.0.0 |
| **`realDiskFree`**      | <code>number</code>                                         | 常规数据存储的可用磁盘空间，单位字节。                                                                                                                                                                                                                                        | 1.1.0 |
| **`realDiskTotal`**     | <code>number</code>                                         | 常规数据存储路径的总大小，单位字节。                                                                                                                                                                                                                                          | 1.1.0 |
| **`webViewVersion`**    | <code>string</code>                                         | WebView 浏览器版本                                                                                                                                                                                                                                                            | 1.0.0 |

#### BatteryInfo

| 属性               | 类型                 | 描述                       | 自    |
| ------------------ | -------------------- | -------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | 电池电量百分比（0 到 1）。 | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。         | 1.0.0 |

#### GetLanguageCodeResult

| 属性        | 类型                | 描述           | 自    |
| ----------- | ------------------- | -------------- | ----- |
| **`value`** | <code>string</code> | 两位语言代码。 | 1.0.0 |

#### LanguageTag

| 属性        | 类型                | 描述                                  | 自    |
| ----------- | ------------------- | ------------------------------------- | ----- |
| **`value`** | <code>string</code> | 返回符合 IETF BCP 47 标准的语言标签。 | 4.0.0 |

### Type Aliases

#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>
