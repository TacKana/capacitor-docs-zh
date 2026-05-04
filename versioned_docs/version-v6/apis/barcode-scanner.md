---
title: Barcode Scanner Capacitor Plugin API
description: 使用 Outsystems 条码库的 Capacitor 插件
custom_edit_url: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts
sidebar_label: Barcode Scanner
---

# @capacitor/barcode-scanner

使用 Outsystems 条码库的 Capacitor 插件

## 安装

```bash
npm install @capacitor/barcode-scanner
npx cap sync
```

#### Android

条码扫描插件要求最低 Android SDK 目标版本为 26，这比您的 Capacitor 应用默认值要高。您可以在 `android/variables.gradle` 文件中更新此值。

```gradle
ext {
    minSdkVersion = 26
}
```

您需要修改 `android/build.gradle` 文件中的 `allprojects > repositories` 部分，以包含 Outsystems 仓库。添加仓库后，您的 `android/build.gradle` 文件应与此类似。

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url 'https://pkgs.dev.azure.com/OutSystemsRD/9e79bc5b-69b2-4476-9ca5-d67594972a52/_packaging/PublicArtifactRepository/maven/v1'
            name 'Azure'
            credentials {
                username = "optional"
                password = ""
            }
            content {
                includeGroup "com.github.outsystems"
            }
        }
    }
}
```

#### iOS

条码扫描器使用设备上的摄像头。请确保在您的 Info.plist 文件中配置了 `Privacy - Camera Usage Description`（隐私 - 相机使用说明），以便您的应用可以访问设备的摄像头。

---

## API

<docgen-index>

* [`scanBarcode(...)`](#scanbarcode)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

定义了能够扫描条码的插件合约的接口。
要求实现 `scanBarcode` 方法，该方法使用给定的选项启动条码扫描。

### scanBarcode(...)

```typescript
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| 参数           | 类型                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#capacitorbarcodescanneroptions">CapacitorBarcodeScannerOptions</a></code>         |

**返回值:** <code>Promise&lt;<a href="#capacitorbarcodescannerscanresult">CapacitorBarcodeScannerScanResult</a>&gt;</code>

--------------------


### 类型别名


#### CapacitorBarcodeScannerScanResult

定义从条码扫描返回的结果结构。

<code>{ ScanResult: string }</code>


#### CapacitorBarcodeScannerOptions

定义用于配置条码扫描的选项。

<code>{ hint: <a href="#capacitorbarcodescannertypehint">CapacitorBarcodeScannerTypeHint</a>; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: <a href="#capacitorbarcodescannercameradirection">CapacitorBarcodeScannerCameraDirection</a>; scanOrientation?: <a href="#capacitorbarcodescannerscanorientation">CapacitorBarcodeScannerScanOrientation</a>; android?: { scanningLibrary?: <a href="#capacitorbarcodeScannerAndroidScanningLibrary">CapacitorBarcodeScannerAndroidScanningLibrary</a>; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }</code>


#### CapacitorBarcodeScannerTypeHint

扩展了 Html5Qrcode 支持的格式，并添加了一个特殊的 'ALL' 选项，表示支持所有条码类型。
此类型定义结合了 <a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> 和 OSBarcodeTypeHintALLOption，用于表示要扫描的条码类型的提示。

<code><a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> | <a href="#capacitorbarcodescannertypehintalloption">CapacitorBarcodeScannerTypeHintALLOption</a></code>


### 枚举


#### Html5QrcodeSupportedFormats

| 成员                  | 值               |
| --------------------- | ---------------- |
| **`QR_CODE`**         | <code>0</code>   |
| **`AZTEC`**           | <code>1</code>   |
| **`CODABAR`**         | <code>2</code>   |
| **`CODE_39`**         | <code>3</code>   |
| **`CODE_93`**         | <code>4</code>   |
| **`CODE_128`**        | <code>5</code>   |
| **`DATA_MATRIX`**     | <code>6</code>   |
| **`MAXICODE`**        | <code>7</code>   |
| **`ITF`**             | <code>8</code>   |
| **`EAN_13`**          | <code>9</code>   |
| **`EAN_8`**           | <code>10</code>  |
| **`PDF_417`**         | <code>11</code>  |
| **`RSS_14`**          | <code>12</code>  |
| **`RSS_EXPANDED`**    | <code>13</code>  |
| **`UPC_A`**           | <code>14</code>  |
| **`UPC_E`**           | <code>15</code>  |
| **`UPC_EAN_EXTENSION`** | <code>16</code> |


#### CapacitorBarcodeScannerTypeHintALLOption

| 成员      | 值               |
| --------- | ---------------- |
| **`ALL`** | <code>17</code>  |


#### CapacitorBarcodeScannerCameraDirection

| 成员        | 值              |
| ----------- | --------------- |
| **`BACK`**  | <code>1</code>  |
| **`FRONT`** | <code>2</code>  |


#### CapacitorBarcodeScannerScanOrientation

| 成员            | 值              |
| --------------- | --------------- |
| **`PORTRAIT`**  | <code>1</code>  |
| **`LANDSCAPE`** | <code>2</code>  |
| **`ADAPTIVE`**  | <code>3</code>  |


#### CapacitorBarcodeScannerAndroidScanningLibrary {#capacitorbarcodeScannerAndroidScanningLibrary}

| 成员        | 值                     |
| ----------- | ---------------------- |
| **`ZXING`** | <code>'zxing'</code>   |
| **`MLKIT`** | <code>'mlkit'</code>   |

</docgen-api>