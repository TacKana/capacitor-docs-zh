---
title: Barcode Scanner Capacitor Plugin API
description: 使用 Outsystems 条码库的 Capacitor 插件
custom_edit_url: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts
sidebar_label: 条码扫描器
---

# @capacitor/barcode-scanner

使用 Outsystems 条码库的 Capacitor 插件

## 安装

```bash
npm install @capacitor/barcode-scanner
npx cap sync
```

#### Android

条码扫描器插件要求最低 Android SDK 目标版本为 26，这高于 Capacitor 应用的默认值。你可以在 `android/variables.gradle` 文件中更新此值。

```gradle
ext {
    minSdkVersion = 26
}
```

注意：Android 上使用 `ZXING` 扫描库时支持所有格式，而 `MLKIT` 支持除 `MAXICODE`、`RSS_14`、`RSS_EXPANDED` 和 `UPC_EAN_EXTENSION` 之外的所有格式——如果在 `hint` 中使用这些格式，将会默认扫描所有类型。

#### iOS

条码扫描器需要使用设备的摄像头。请确保在 Info.plist 文件中配置了 Privacy - Camera Usage Description（隐私 - 相机使用说明），以便你的应用能够访问设备的摄像头。

注意：iOS 支持除 `MAXICODE` 和 `UPC_EAN_EXTENSION` 之外的所有格式——如果在 `hint` 中使用这两种格式，将会默认扫描所有类型。此外，Apple Vision 无法区分 `UPC_A` 和 `EAN_13`，因此在 `hint` 中指定其中之一时，两者都可以被扫描。

---

## API

<docgen-index>

- [`scanBarcode(...)`](#scanbarcode)
- [类型别名](#type-aliases)
- [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

定义条码扫描插件接口的契约。
要求实现 scanBarcode 方法，该方法使用给定选项启动条码扫描。

### scanBarcode(...)

```typescript
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| 参数          | 类型                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#capacitorbarcodescanneroptions">CapacitorBarcodeScannerOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#capacitorbarcodescannerscanresult">CapacitorBarcodeScannerScanResult</a>&gt;</code>

---

### 类型别名

#### CapacitorBarcodeScannerScanResult

定义条码扫描返回结果的结构。

<code>{ ScanResult: string; format: <a href="#capacitorbarcodescannertypehint">CapacitorBarcodeScannerTypeHint</a>; }</code>

#### CapacitorBarcodeScannerTypeHint

扩展了 Html5Qrcode 支持的格式，并添加了特殊的 'ALL' 选项，
表示支持所有条码类型。
类型定义结合了 <a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> 和 OSBarcodeTypeHintALLOption，
用于表示要扫描的条码类型的提示。

<code>
  <a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> |{' '}
  <a href="#capacitorbarcodescannertypehintalloption">CapacitorBarcodeScannerTypeHintALLOption</a>
</code>

#### CapacitorBarcodeScannerOptions

定义用于配置条码扫描的选项。

<code>{ hint: <a href="#capacitorbarcodescannertypehint">CapacitorBarcodeScannerTypeHint</a>; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: <a href="#capacitorbarcodescannercameradirection">CapacitorBarcodeScannerCameraDirection</a>; scanOrientation?: <a href="#capacitorbarcodescannerscanorientation">CapacitorBarcodeScannerScanOrientation</a>; android?: { scanningLibrary?: <a href="#capacitorbarcodescannerandroidscanninglibrary">CapacitorBarcodeScannerAndroidScanningLibrary</a>; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }</code>

### 枚举

#### Html5QrcodeSupportedFormats

| 成员                    | 值              |
| ----------------------- | --------------- |
| **`QR_CODE`**           | <code>0</code>  |
| **`AZTEC`**             | <code>1</code>  |
| **`CODABAR`**           | <code>2</code>  |
| **`CODE_39`**           | <code>3</code>  |
| **`CODE_93`**           | <code>4</code>  |
| **`CODE_128`**          | <code>5</code>  |
| **`DATA_MATRIX`**       | <code>6</code>  |
| **`MAXICODE`**          | <code>7</code>  |
| **`ITF`**               | <code>8</code>  |
| **`EAN_13`**            | <code>9</code>  |
| **`EAN_8`**             | <code>10</code> |
| **`PDF_417`**           | <code>11</code> |
| **`RSS_14`**            | <code>12</code> |
| **`RSS_EXPANDED`**      | <code>13</code> |
| **`UPC_A`**             | <code>14</code> |
| **`UPC_E`**             | <code>15</code> |
| **`UPC_EAN_EXTENSION`** | <code>16</code> |

#### CapacitorBarcodeScannerTypeHintALLOption

| 成员      | 值              |
| --------- | --------------- |
| **`ALL`** | <code>17</code> |

#### CapacitorBarcodeScannerCameraDirection

| 成员        | 值             |
| ----------- | -------------- |
| **`BACK`**  | <code>1</code> |
| **`FRONT`** | <code>2</code> |

#### CapacitorBarcodeScannerScanOrientation

| 成员            | 值             |
| --------------- | -------------- |
| **`PORTRAIT`**  | <code>1</code> |
| **`LANDSCAPE`** | <code>2</code> |
| **`ADAPTIVE`**  | <code>3</code> |

#### CapacitorBarcodeScannerAndroidScanningLibrary

| 成员        | 值                   |
| ----------- | -------------------- |
| **`ZXING`** | <code>'zxing'</code> |
| **`MLKIT`** | <code>'mlkit'</code> |

</docgen-api>
