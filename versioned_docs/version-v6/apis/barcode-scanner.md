---
title: Barcode Scanner Capacitor Plugin API
description: 使用Outsystems条码库的Capacitor插件
custom_edit_url: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts
sidebar_label: 条码扫描器
---

# @capacitor/barcode-scanner

基于Outsystems条码库的Capacitor插件

## 安装

```bash
npm install @capacitor/barcode-scanner
npx cap sync
```

#### Android配置

条码扫描插件要求最低Android SDK版本为26，这高于Capacitor应用的默认值。您可以在`android/variables.gradle`文件中更新此设置：

```gradle
ext {
    minSdkVersion = 26
}
```

需要在`android/build.gradle`文件的`allprojects > repositories`部分添加Outsystems仓库。添加后的配置示例如下：

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

#### iOS配置

条码扫描功能需要使用设备摄像头。请确保在Info.plist文件中配置"Privacy - Camera Usage Description"，以便应用能访问摄像头权限。

---

## API接口

<docgen-index>

- [`scanBarcode(...)`](#scanbarcode)
- [类型别名](#type-aliases)
- [枚举类型](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

定义条码扫描插件功能接口。
要求实现scanBarcode方法，该方法通过给定选项初始化条码扫描。

### scanBarcode(...)

```typescript
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| 参数          | 类型                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#capacitorbarcodescanneroptions">CapacitorBarcodeScannerOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#capacitorbarcodescannerscanresult">CapacitorBarcodeScannerScanResult</a>&gt;</code>

---

### Type Aliases

#### CapacitorBarcodeScannerScanResult

定义条码扫描返回结果的结构。

<code>{ ScanResult: string }</code>

#### CapacitorBarcodeScannerOptions

定义条码扫描的配置选项。

<code>{ hint: <a href="#capacitorbarcodescannertypehint">CapacitorBarcodeScannerTypeHint</a>; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: <a href="#capacitorbarcodescannercameradirection">CapacitorBarcodeScannerCameraDirection</a>; scanOrientation?: <a href="#capacitorbarcodescannerscanorientation">CapacitorBarcodeScannerScanOrientation</a>; android?: { scanningLibrary?: <a href="#capacitorbarcodescannerandroidscanninglibrary">CapacitorBarcodeScannerAndroidScanningLibrary</a>; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }</code>

#### CapacitorBarcodeScannerTypeHint

扩展Html5Qrcode支持的格式，新增'ALL'选项表示支持所有条码类型。
结合<a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a>和OSBarcodeTypeHintALLOption的类型定义，表示要扫描的条码类型提示。

<code>
  <a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> |{' '}
  <a href="#capacitorbarcodescannertypehintalloption">CapacitorBarcodeScannerTypeHintALLOption</a>
</code>

### Enums类型

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

| 成员        | 值                     |
| ----------- | ---------------------- |
| **`ZXING`** | <code>'zxingly'</code> |
| **`MLKIT`** | <code>'mlkit'</code>   |

</docgen-api>
