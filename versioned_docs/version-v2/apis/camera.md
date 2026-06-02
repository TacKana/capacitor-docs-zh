---
title: 相机
description: 相机 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/camera
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Camera API 允许用户从相册中选择照片或拍照。在 iOS 上，使用 `UIImagePickerController`；在 Android 上，此 API 发送一个 intent，默认情况下将由核心相机应用处理。

- [`getPhoto(...)`](#getphoto)
- [接口](#接口)
- [枚举](#枚举)

## iOS 注意事项

iOS 要求在 `Info.plist` 中添加并填写以下使用说明：

名称：`Privacy - Camera Usage Description`
键：`NSCameraUsageDescription`

名称：`Privacy - Photo Library Additions Usage Description`
键：`NSPhotoLibraryAddUsageDescription`

名称：`Privacy - Photo Library Usage Description`
键：`NSPhotoLibraryUsageDescription`

在 [iOS 指南](/ios/index.md) 中阅读关于 [设置 iOS 权限](/ios/configuration.md) 的更多信息，了解如何在 Xcode 中设置 iOS 权限。

## Android 注意事项

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

存储权限用于读取/保存照片文件。

在 [Android 指南](/android/index.md) 中阅读关于 [设置 Android 权限](/android/configuration.md) 的更多信息，了解如何设置 Android 权限。

此外，由于 Camera API 会启动一个单独的 Activity 来处理拍照，您应该监听 `App` 插件中的 `appRestoredResult`，以处理在 Activity 运行时应用被操作系统终止的情况下发送的相机数据。

## PWA 注意事项

Camera 插件需要 [PWA Elements](/web/pwa-elements.mdx) 才能工作。

## 示例

```typescript
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  // image.webPath 将包含一个可以设置为图像 src 的路径。
  // 您可以使用 image.path 访问原始文件，该路径可以
  // 传递给 Filesystem API 以读取图像的原始数据，
  // 如果需要的话（或者将 resultType 设置为 CameraResultType.Base64 传递给 getPhoto）
  var imageUrl = image.webPath;
  // 现在可以设置到图像的 src
  imageElement.src = imageUrl;
}
```

## 示例指南

[构建 Ionic Framework 相机应用](/guides/ionic-framework-app.md)

## API

### getPhoto(...)

```typescript
getPhoto(options: CameraOptions) => Promise<CameraPhoto>
```

提示用户从相册中选择照片，或使用相机拍摄新照片。

| 参数 | 类型 |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#cameraoptions">CameraOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#cameraphoto">CameraPhoto</a>&gt;</code>

---

### 接口

#### CameraPhoto

| 属性 | 类型 | 描述 |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`base64String`** | <code>string</code> | 图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>。 |
| **`dataUrl`**      | <code>string</code> | 以 'data:image/jpeg;base64,' 开头的 URL 和图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>。 |
| **`path`**         | <code>string</code> | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，路径将包含一个完整的、特定于平台的文件 URL，稍后可以使用 Filesystem API 读取。 |
| **`webPath`**      | <code>string</code> | webPath 返回一个可用于设置图像 src 属性以实现高效加载和渲染的路径。 |
| **`exif`**         | <code>any</code>    | 从图像中检索到的 Exif 数据（如果有的话） |
| **`format`**       | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg 和 png。gif 仅在使用文件输入时支持。 |

#### CameraOptions

| 属性 | 类型 | 描述 |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`quality`**             | <code>number</code>                                           | 返回的 JPEG 图像质量，从 0-100 |
| **`allowEditing`**        | <code>boolean</code>                                          | 是否允许用户裁剪或进行小幅编辑（平台特定） |
| **`resultType`**          | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据如何返回。目前仅支持 'Base64'、'DataUrl' 或 'Uri' |
| **`saveToGallery`**       | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册选取的，则仅在编辑后保存。默认值：false |
| **`width`**               | <code>number</code>                                           | 保存图像的宽度 |
| **`height`**              | <code>number</code>                                           | 保存图像的高度 |
| **`preserveAspectRatio`** | <code>boolean</code>                                          | 是否保持图像的宽高比。如果此标志为 true，则宽度和高度将用作最大值，并保持宽高比。这仅在同时传入宽度和高度时有效。当仅提供宽度或高度时，宽高比始终保留（此选项为空操作）。未来的主版本将默认启用此行为，并可能完全移除此选项。默认值：false |
| **`correctOrientation`**  | <code>boolean</code>                                          | 是否自动旋转图像以校正竖屏模式下的方向。默认值：true |
| **`source`**              | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认情况下，这会提示用户选择相册或拍照。默认值：<a href="#camerasource">CameraSource.Prompt</a> |
| **`direction`**           | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅 iOS 和 Web：相机方向。默认值：<a href="#cameradirection">CameraDirection.Rear</a> |
| **`presentationStyle`**   | <code>"fullscreen" \| "popover"</code>                        | 仅 iOS：相机的呈现样式。默认为 fullscreen。 |
| **`webUseInput`**         | <code>boolean</code>                                          | 仅 Web：是否使用 PWA Element 体验或文件输入。默认是使用 PWA Elements（如果已安装），否则回退到文件输入。要始终使用文件输入，请将其设置为 `true`。了解更多关于 PWA Elements：https://capacitorjs.com/docs/pwa-elements |
| **`promptLabelHeader`**   | <code>string</code>                                           | 如果仅使用 <a href="#camerasource">CameraSource.Prompt</a>，可以更改提示标签。默认值：promptLabelHeader : 'Photo' // 仅 iOS promptLabelCancel : 'Cancel' // 仅 iOS promptLabelPhoto : 'From Photos' promptLabelPicture : 'Take Picture' |
| **`promptLabelCancel`**   | <code>string</code>                                           | |
| **`promptLabelPhoto`**    | <code>string</code>                                           | |
| **`promptLabelPicture`**  | <code>string</code>                                           | |

### 枚举

#### CameraResultType

| 成员 | 值 |
| ------------- | ---------------------- |
| **`Uri`**     | <code>"uri"</code>     |
| **`Base64`**  | <code>"base64"</code>  |
| **`DataUrl`** | <code>"dataUrl"</code> |

#### CameraSource

| 成员 | 值 |
| ------------ | --------------------- |
| **`Prompt`** | <code>"PROMPT"</code> |
| **`Camera`** | <code>"CAMERA"</code> |
| **`Photos`** | <code>"PHOTOS"</code> |

#### CameraDirection

| 成员 | 值 |
| ----------- | -------------------- |
| **`Rear`**  | <code>"REAR"</code>  |
| **`Front`** | <code>"FRONT"</code> |
