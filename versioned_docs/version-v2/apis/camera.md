---
title: Camera
description: Camera API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/camera
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Camera API 允许用户从相册中选择照片或拍摄新照片。在 iOS 上，这使用了 `UIImagePickerController`；在 Android 上，此 API 会发送一个意图（intent），默认由系统相机应用处理。

- [`getPhoto(...)`](#getphoto)
- [接口](#interfaces)
- [枚举](#enums)

## iOS 注意事项

iOS 要求在 `Info.plist` 文件中为你的应用添加并填写以下使用描述：

名称：`Privacy - Camera Usage Description`
键：`NSCameraUsageDescription`

名称：`Privacy - Photo Library Additions Usage Description`
键：`NSPhotoLibraryAddUsageDescription`

名称：`Privacy - Photo Library Usage Description`
键：`NSPhotoLibraryUsageDescription`

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](/ios/index.md) 中的 [设置 iOS 权限](/ios/configuration.md)。

## Android 注意事项

此 API 需要在你的 `AndroidManifest.xml` 文件中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

存储权限用于读取/保存照片文件。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](/android/index.md) 中的 [设置 Android 权限](/android/configuration.md)。

此外，由于 Camera API 会启动一个单独的 Activity 来处理拍照，你应该在 `App` 插件中监听 `appRestoredResult`，以处理在 Activity 运行时应用被操作系统终止的情况下发送的任何相机数据。

## PWA 注意事项

Camera 插件需要 [PWA 元素](/web/pwa-elements.mdx) 才能正常工作。

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
  // image.webPath 将包含一个可用作图片 src 的路径。
  // 你可以通过 image.path 访问原始文件，如果需要，可以将其传递给 Filesystem API 来读取图像的原始数据
  // （或者将 resultType 设为 CameraResultType.Base64 传递给 getPhoto）
  var imageUrl = image.webPath;
  // 现在可以将其设置为 image 元素的 src
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

| 参数            | 类型                                                    |
| --------------- | ------------------------------------------------------- |
| **`options`**   | <code><a href="#cameraoptions">CameraOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#cameraphoto">CameraPhoto</a>&gt;</code>

---

### 接口

#### CameraPhoto

| 属性               | 类型                | 描述                                                                                                                                                                   |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`base64String`** | <code>string</code> | 图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>。                                                                       |
| **`dataUrl`**      | <code>string</code> | 以 'data:image/jpeg;base64,' 开头的 URL 和图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>。                            |
| **`path`**         | <code>string</code> | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，此路径将包含一个完整的、平台特定的文件 URL，稍后可以使用 Filesystem API 读取。                          |
| **`webPath`**      | <code>string</code> | webPath 返回一个路径，可用于设置图片的 src 属性，以实现高效的加载和渲染。                                                                                              |
| **`exif`**         | <code>any</code>    | 从图像中检索到的 Exif 数据（如果有）。                                                                                                                                 |
| **`format`**       | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg 和 png。gif 仅在通过文件输入使用时受支持。                                                  |#### CameraOptions（相机选项）| 属性                      | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`quality`**             | <code>number</code>                                           | 返回 JPEG 格式图像的质量，取值范围为 0-100                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`allowEditing`**        | <code>boolean</code>                                          | 是否允许用户裁剪或进行小幅编辑（具体功能因平台而异）                                                                                                                                                                                                                                                                                                                                                                                           |
| **`resultType`**          | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据返回的方式。目前仅支持 'Base64'、'DataUrl' 或 'Uri'                                                                                                                                                                                                                                                                                                                                                                          |
| **`saveToGallery`**       | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册中选取的，则仅在编辑后才会保存。默认值：false                                                                                                                                                                                                                                                                                                                                 |
| **`width`**               | <code>number</code>                                           | 保存图像的宽度                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`height`**              | <code>number</code>                                           | 保存图像的高度                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`preserveAspectRatio`** | <code>boolean</code>                                          | 是否保持图像的宽高比。如果此标志为 true，则宽度和高度将被用作最大值，并且宽高比将保持不变。这仅在同时传入宽度和高度时才相关。当仅提供宽度或高度时，宽高比始终会保持不变（此选项无实际作用）。未来的主要版本将把此行为更改为默认，并且可能会完全移除此选项。默认值：false |
| **`correctOrientation`**  | <code>boolean</code>                                          | 是否自动将图像旋转至"向上"方向以校正纵向模式下的方向。默认值：true                                                                                                                                                                                                                                                                                                                                                            |
| **`source`**              | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认情况下，会提示用户选择相册或拍摄照片。默认值：<a href="#camerasource">CameraSource.Prompt</a>                                                                                                                                                                                                                                                                                       |
| **`direction`**           | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅限 iOS 和 Web：相机方向。默认值：<a href="#cameradirection">CameraDirection.Rear</a>                                                                                                                                                                                                                                                                                                                                                                |
| **`presentationStyle`**   | <code>"fullscreen" \| "popover"</code>                        | 仅限 iOS：相机的呈现样式。默认为全屏显示。                                                                                                                                                                                                                                                                                                                                                                                             |
| **`webUseInput`**         | <code>boolean</code>                                          | 仅限 Web：是否使用 PWA 元素体验或文件输入。默认行为是如果安装了 PWA 元素则使用它，否则回退到文件输入。要始终使用文件输入，请将此值设为 `true`。了解更多关于 PWA 元素的信息：https://capacitorjs.com/docs/pwa-elements                                                                                                                                                                                              || **`promptLabelHeader`**   | <code>string</code>                                           | 如果仅使用 <a href="#camerasource">CameraSource.Prompt</a>，可更改提示标签。默认值：promptLabelHeader : '照片' // 仅限 iOS promptLabelCancel : '取消' // 仅限 iOS promptLabelPhoto : '从相册选取' promptLabelPicture : '拍照'                                                                                                                                                                                                                |
| **`promptLabelCancel`**   | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`promptLabelPhoto`**    | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`promptLabelPicture`**  | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |### 枚举类型

#### CameraResultType

| 成员           | 值                      |
| -------------- | ----------------------- |
| **`Uri`**      | <code>"uri"</code>      |
| **`Base64`**   | <code>"base64"</code>   |
| **`DataUrl`**  | <code>"dataUrl"</code>  |

#### CameraSource

| 成员          | 值                     |
| ------------- | ---------------------- |
| **`Prompt`**  | <code>"PROMPT"</code>  |
| **`Camera`**  | <code>"CAMERA"</code>  |
| **`Photos`**  | <code>"PHOTOS"</code>  |

#### CameraDirection

| 成员         | 值                    |
| ------------ | --------------------- |
| **`Rear`**   | <code>"REAR"</code>   |
| **`Front`**  | <code>"FRONT"</code>  |