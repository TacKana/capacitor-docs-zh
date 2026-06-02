---
title: Device Capacitor 插件 API
description: Device API 暴露有关设备的内部信息，例如型号和操作系统版本，以及用户信息，例如唯一标识符。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/device/src/definitions.ts
sidebar_label: Device
translated: true
---

# @capacitor/device

Device API 暴露有关设备的内部信息，例如型号和操作系统版本，以及用户信息，例如唯一标识符。

## 安装

```bash
npm install @capacitor/device@latest-6
npx cap sync
```

## Apple 隐私清单要求

Apple 要求应用开发者现在必须指定 API 使用批准理由以增强用户隐私。到 2024 年 5 月 1 日，在向 App Store Connect 提交应用时必须包含这些理由。

在您的应用中使用此特定插件时，您必须在 `/ios/App` 中创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展生成它，并指定使用理由。

有关详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，必需的字典键是 [NSPrivacyAccessedAPICategoryDiskSpace](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397)，推荐的理由是 [85F4.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278397)。**

### 示例 PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，将此 dict 条目添加到数组中 -->
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

* [`getId()`](#getid)
* [`getInfo()`](#getinfo)
* [`getBatteryInfo()`](#getbatteryinfo)
* [`getLanguageCode()`](#getlanguagecode)
* [`getLanguageTag()`](#getlanguagetag)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getId()

```typescript
getId() => Promise<DeviceId>
```

返回设备的唯一标识符。

**返回：** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回有关底层设备/操作系统/平台的信息。

**返回：** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回有关电池的信息。

**返回：** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备的当前语言区域代码。

**返回：** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

获取设备的当前语言区域标签。

**返回：** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**始于：** 4.0.0

--------------------


### Interfaces


#### DeviceId

| 属性               | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 始于   |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`identifier`**   | <code>string</code> | 应用可用的设备标识符。该标识符可能在现代移动平台上发生变化，这些平台只允许按应用安装的 ID。在 iOS 上，该标识符是一个 UUID，唯一标识设备到应用供应商（[了解更多](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)）。在 Android 8+ 上，**该标识符是一个 64 位数字（以十六进制字符串表示）**，对于每个应用签名密钥、用户和设备的组合是唯一的（[了解更多](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)）。在 Web 上，会生成一个随机标识符并存储在 localStorage 中以供后续调用使用。如果 localStorage 不可用，每次调用都会生成一个新的随机标识符。 | 1.0.0 |


#### DeviceInfo

| 属性                      | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                                         | 始于   |
| ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`name`**                | <code>string</code>                                         | 设备名称。例如 "John's iPhone"。仅在 iOS 和 Android 7.1 及以上版本支持。在 iOS 16+ 上，如果没有适当的[授权](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name)，将返回通用设备名称。                                                                                      | 1.0.0 |
| **`model`**               | <code>string</code>                                         | 设备型号。例如 "iPhone13,4"。                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`platform`**            | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台（小写）。                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`operatingSystem`**     | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备的操作系统。                                                                                                                                                                                                                                                                                                                                             | 1.0.0 |
| **`osVersion`**           | <code>string</code>                                         | 设备操作系统的版本。                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`iOSVersion`**          | <code>number</code>                                         | iOS 版本号。仅适用于 iOS。多部分版本号被压缩为两位数字填充的整数，例如 `"16.3.1"` -> `160301`。                                                                                                                                                                                                                                                              | 5.0.0 |
| **`androidSDKVersion`**   | <code>number</code>                                         | Android SDK 版本号。仅适用于 Android。                                                                                                                                                                                                                                                                                                                        | 5.0.0 |
| **`manufacturer`**        | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`isVirtual`**           | <code>boolean</code>                                        | 应用是否运行在模拟器中。                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`memUsed`**             | <code>number</code>                                         | 当前应用使用的近似内存量，以字节为单位。除以 1048576 得到使用的 MB 数。                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`diskFree`**            | <code>number</code>                                         | 操作系统常规数据存储路径上的可用磁盘空间量，以字节为单位。在 Android 上，返回的是持有核心 Android OS 的 "system" 分区的可用磁盘空间。在 iOS 上，此值不准确。                                                                                                                                                                                                  | 1.0.0 |
| **`diskTotal`**           | <code>number</code>                                         | 操作系统常规数据存储路径的总大小，以字节为单位。在 Android 上，返回的是持有核心 Android OS 的 "system" 分区的磁盘空间。                                                                                                                                                                                                                                      | 1.0.0 |
| **`realDiskFree`**        | <code>number</code>                                         | 常规数据存储路径上的可用磁盘空间量，以字节为单位。                                                                                                                                                                                                                                                                                                           | 1.1.0 |
| **`realDiskTotal`**       | <code>number</code>                                         | 常规数据存储路径的总大小，以字节为单位。                                                                                                                                                                                                                                                                                                                      | 1.1.0 |
| **`webViewVersion`**      | <code>string</code>                                         | WebView 浏览器版本。                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |


#### BatteryInfo

| 属性                 | 类型                 | 描述                                               | 始于   |
| -------------------- | -------------------- | -------------------------------------------------- | ------ |
| **`batteryLevel`**   | <code>number</code>  | 表示电池充电量的百分比（0 到 1）。                  | 1.0.0 |
| **`isCharging`**     | <code>boolean</code> | 设备是否正在充电。                                 | 1.0.0 |


#### GetLanguageCodeResult

| 属性          | 类型                | 描述                     | 始于   |
| ------------- | ------------------- | ------------------------ | ------ |
| **`value`**   | <code>string</code> | 两个字符的语言代码。     | 1.0.0 |


#### LanguageTag

| 属性          | 类型                | 描述                                           | 始于   |
| ------------- | ------------------- | ---------------------------------------------- | ------ |
| **`value`**   | <code>string</code> | 返回一个格式良好的 IETF BCP 47 语言标签。       | 4.0.0 |


### Type Aliases


#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>
