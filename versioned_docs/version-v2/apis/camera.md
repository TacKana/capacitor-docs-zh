---
title: Camera
description: 相机API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/camera
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

相机API允许用户从相册选取照片或拍摄新照片。在iOS上使用`UIImagePickerController`，在Android上默认通过系统相机应用处理。

- [`getPhoto(...)`](#getphoto)
- [接口](#interfaces)
- [枚举](#enums)

## iOS注意事项

iOS需要在`Info.plist`中添加以下使用说明：

名称: `Privacy - Camera Usage Description`
键名: `NSCameraUsageDescription`

名称: `Privacy - Photo Library Additions Usage Description`
键名: `NSPhotoLibraryAddUsageDescription`

名称: `Privacy - Photo Library Usage Description`
键名: `NSPhotoLibraryUsageDescription`

更多关于在Xcode中设置iOS权限的信息，请参阅[iOS指南](/ios/index.md)中的[设置iOS权限](/ios/configuration.md)

## Android注意事项

此API需要在`AndroidManifest.xml`中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

存储权限用于读取/保存照片文件。

更多关于设置Android权限的信息，请参阅[Android指南](/android/index.md)中的[设置Android权限](/android/configuration.md)

此外，由于相机API会启动单独的Activity来处理拍照，您应该监听`App`插件中的`appRestoredResult`，以便在Activity运行时应用被操作系统终止的情况下处理任何相机数据。

## PWA注意事项

相机插件需要[PWA Elements](/web/pwa-elements.mdx)支持才能正常工作。

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
  // image.webPath包含可用于设置图像src的路径
  // 您可以通过image.path访问原始文件，该路径可以
  // 传递给Filesystem API以读取图像的原始数据
  // （如果需要，也可以将resultType设为CameraResultType.Base64）
  var imageUrl = image.webPath;
  // 现在可以将其设置为图像的src
  imageElement.src = imageUrl;
}
```

## 示例教程

[构建Ionic Framework相机应用](/guides/ionic-framework-app.md)

## API

### getPhoto(...)

```typescript
getPhoto(options: CameraOptions) => Promise<CameraPhoto>
```

提示用户从相册选择照片或使用相机拍摄新照片

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#cameraoptions">CameraOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#cameraphoto">CameraPhoto</a>&gt;</code>

---

### 接口

#### CameraPhoto

| 属性                | 类型                | 说明                                                                                                                                                                   |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`base64String`**  | <code>string</code> | 使用<a href="#cameraresulttype">CameraResultType.Base64</a>时的base64编码字符串                                                                                        |
| **`dataUrl`**       | <code>string</code> | 使用<a href="#cameraresulttype">CameraResultType.DataUrl</a>时的'data:image/jpeg;base64,'开头的URL和base64编码字符串                                                   |
| **`path`**          | <code>string</code> | 使用<a href="#cameraresulttype">CameraResultType.Uri</a>时的完整平台特定文件URL，可通过Filesystem API读取                                                              |
| **`webPath`**       | <code>string</code> | webPath返回可用于设置图像src属性的路径，以实现高效加载和渲染                                                                                                           |
| **`exif`**          | <code>any</code>    | 从图像中检索的Exif数据（如果有）                                                                                                                                       |
| **`format`**        | <code>string</code> | 图像格式，如jpeg、png、gif。iOS和Android仅支持jpeg。Web支持jpeg和png。仅在使用文件输入时支持gif                                                                        |

#### CameraOptions

| 属性                       | 类型                                                          | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`quality`**              | <code>number</code>                                           | JPEG图像质量，0-100                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`allowEditing`**         | <code>boolean</code>                                          | 是否允许用户裁剪或进行小幅编辑（平台特定）                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`resultType`**           | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据返回方式。目前仅支持'Base64'、'DataUrl'或'Uri'                                                                                                                                                                                                                                                                                                                                                                                                           |
| **`saveToGallery`**        | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册选取的，则仅在编辑后才会保存。默认: false                                                                                                                                                                                                                                                                                                                                                                              |
| **`width`**                | <code>number</code>                                           | 保存图像的宽度                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`height`**               | <code>number</code>                                           | 保存图像的高度                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **`preserveAspectRatio`**  | <code>boolean</code>                                          | 是否保持图像宽高比。如果为true，则width和height将作为最大值并保持宽高比。仅当同时提供width和height时相关。当只提供width或height时，宽高比始终会保持（此选项无效）。未来主要版本可能会将此行为设为默认，并可能完全移除此选项。默认: false                                                                                                                                                                                                                        |
| **`correctOrientation`**   | <code>boolean</code>                                          | 是否自动将图像"向上"旋转以校正纵向模式下的方向 默认: true                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`source`**               | <code><a href="#camerasource">CameraSource</a></code>         | 照片来源。默认提示用户选择相册或拍照。默认: <a href="#camerasource">CameraSource.Prompt</a>                                                                                                                                                                                                                                                                                                                                                                 |
| **`direction`**            | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅iOS和Web: 相机方向。默认: <a href="#cameradirection">CameraDirection.Rear</a>                                                                                                                                                                                                                                                                                                                                                                             |
| **`presentationStyle`**    | <code>"fullscreen" \| "popover"</code>                        | 仅iOS: 相机的呈现样式。默认为全屏。                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **`webUseInput`**          | <code>boolean</code>                                          | 仅Web: 使用PWA Element体验还是文件输入。默认使用已安装的PWA Elements，若未安装则回退到文件输入。要始终使用文件输入，设为`true`。了解更多关于PWA Elements: https://capacitorjs.com/docs/pwa-elements                                                                                                                                                                                                                                                          |
| **`promptLabelHeader`**    | <code>string</code>                                           | 如果使用<a href="#camerasource">CameraSource.Prompt</a>，可更改提示标签。默认: promptLabelHeader : '照片' // 仅iOS promptLabelCancel : '取消' // 仅iOS promptLabelPhoto : '从相册选择' promptLabelPicture : '拍照'                                                                                                                                                                                                                                             |
| **`promptLabelCancel`**    | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **`promptLabelPhoto`**     | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **`promptLabelPicture`**   | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### 枚举

#### CameraResultType

| 成员          | 值                     |
| ------------- | ---------------------- |
| **`Uri`**     | <code>"uri"</code>     |
| **`Base64`**  | <code>"base64"</code>  |
| **`DataUrl`** | <code>"dataUrl"</code> |

#### CameraSource

| 成员         | 值                    |
| ------------ | --------------------- |
| **`Prompt`** | <code>"PROMPT"</code> |
| **`Camera`** | <code>"CAMERA"</code> |
| **`Photos`** | <code>"PHOTOS"</code> |

#### CameraDirection

| 成员        | 值                   |
| ----------- | -------------------- |
| **`Rear`**  | <code>"REAR"</code>  |
| **`Front`** | <code>"FRONT"</code> |