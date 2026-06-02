---
title: Camera - Capacitor 插件 API
description: Camera API 提供使用相机拍照或从相册中选择现有照片的功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
sidebar_label: Camera
---

# @capacitor/camera

Camera API 提供使用相机拍照或从相册中选择现有照片的功能。

## 安装

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS 需要在 `Info.plist` 中添加并填写以下使用说明：

- `NSCameraUsageDescription`（`Privacy - Camera Usage Description`）
- `NSPhotoLibraryAddUsageDescription`（`Privacy - Photo Library Additions Usage Description`）
- `NSPhotoLibraryUsageDescription`（`Privacy - Photo Library Usage Description`）

阅读 [iOS 指南](https://capacitorjs.com/docs/v3/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) 以获取有关在 Xcode 中设置 iOS 权限的更多信息。

## Android

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

存储权限用于读取/保存照片文件。

阅读 [Android 指南](https://capacitorjs.com/docs/v3/android) 中的 [设置权限](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions) 以获取有关设置 Android 权限的更多信息。

此外，由于 Camera API 会启动一个单独的 Activity 来处理拍照，您应该在 `App` 插件中监听 `appRestoredResult`，以处理在 Activity 运行时您的应用被操作系统终止时发送的任何相机数据。

### 变量

本插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `$androidxExifInterfaceVersion`：`androidx.exifinterface:exifinterface` 的版本（默认值：`1.3.2`）
- `$androidxMaterialVersion`：`com.google.android.material:material` 的版本（默认值：`1.3.0`）

## PWA 说明

Camera 插件需要 [PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath 将包含一个可以设置为图像 src 的路径。
  // 您可以使用 image.path 访问原始文件，该路径可以
  // 传递给 Filesystem API 以读取图像的原始数据，
  // 如果需要（或者将 resultType: CameraResultType.Base64 传递给 getPhoto）
  var imageUrl = image.webPath;

  // 现在可以将其设置为图像的 src
  imageElement.src = imageUrl;
};
```

## API

<docgen-index>

* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

<docgen-api>


### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册中选择照片，或使用相机拍摄新照片。

| 参数            | 类型                                                  |
| --------------- | ----------------------------------------------------- |
| **`options`**   | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从相册中选择多张图片。
在 iOS 13 及更早版本上，仅允许选择一张图片。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`options`**   | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**起始版本：** 1.2.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求相机和相册权限。

| 参数               | 类型                                                                        |
| ------------------ | --------------------------------------------------------------------------- |
| **`permissions`**  | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### 接口


#### Photo

| 属性                 | 类型                 | 描述                                                                                                                                                                                                        | 起始版本 |
| -------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`base64String`**   | <code>string</code>  | 图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>。                                                                                                           | 1.0.0   |
| **`dataUrl`**        | <code>string</code>  | 以 'data:image/jpeg;base64,' 开头的 URL 和图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>。                                                                  | 1.0.0   |
| **`path`**           | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，路径将包含一个完整的、平台特定的文件 URL，后续可以使用 Filesystem API 读取。                                                                  | 1.0.0   |
| **`webPath`**        | <code>string</code>  | webPath 返回一个可用于设置图像 src 属性的路径，以实现高效加载和渲染。                                                                                                                                       | 1.0.0   |
| **`exif`**           | <code>any</code>     | 从图像中检索到的 Exif 数据（如果有）。                                                                                                                                                                      | 1.0.0   |
| **`format`**         | <code>string</code>  | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg 和 png。gif 仅在文件输入时支持。                                                                                                | 1.0.0   |
| **`saved`**          | <code>boolean</code> | 图像是否已保存到相册。在 Android 和 iOS 上，如果用户未授予所需权限，保存到相册可能会失败。在 Web 上没有相册，因此始终返回 false。                                                                          | 1.1.0   |


#### ImageOptions

| 属性                        | 类型                                                          | 描述                                                                                                                                                                                                                                                              | 默认值                               | 起始版本 |
| --------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| **`quality`**               | <code>number</code>                                           | 返回的 JPEG 图像质量，范围 0-100。                                                                                                                                                                                                                                |                                      | 1.0.0   |
| **`allowEditing`**          | <code>boolean</code>                                          | 是否允许用户裁剪或进行小幅编辑（平台特定的）。在 iOS 14+ 上，仅支持 <a href="#camerasource">CameraSource.Camera</a>，不支持 <a href="#camerasource">CameraSource.Photos</a>。                                                                                      |                                      | 1.0.0   |
| **`resultType`**            | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据的返回方式。目前仅支持 'Base64'、'DataUrl' 或 'Uri'。                                                                                                                                                                                                         |                                      | 1.0.0   |
| **`saveToGallery`**         | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册选择的，则仅在编辑时保存。                                                                                                                                                                                                   | <code>: false</code>                 | 1.0.0   |
| **`width`**                 | <code>number</code>                                           | 保存图像的宽度。                                                                                                                                                                                                                                                  |                                      | 1.0.0   |
| **`height`**                | <code>number</code>                                           | 保存图像的高度。                                                                                                                                                                                                                                                  |                                      | 1.0.0   |
| **`preserveAspectRatio`**   | <code>boolean</code>                                          | 此设置无效。图片调整大小始终保留宽高比。                                                                                                                                                                                                                          |                                      | 1.0.0   |
| **`correctOrientation`**    | <code>boolean</code>                                          | 是否自动旋转图像"向上"以校正竖屏模式下的方向。                                                                                                                                                                                                                    | <code>: true</code>                  | 1.0.0   |
| **`source`**                | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认情况下，提示用户选择相册或拍照。                                                                                                                                                                                                              | <code>: CameraSource.Prompt</code>   | 1.0.0   |
| **`direction`**             | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅 iOS 和 Web：相机方向。                                                                                                                                                                                                                                         | <code>: CameraDirection.Rear</code>  | 1.0.0   |
| **`presentationStyle`**     | <code>'fullscreen' \| 'popover'</code>                        | 仅 iOS：相机的呈现样式。                                                                                                                                                                                                                                          | <code>: 'fullscreen'</code>          | 1.0.0   |
| **`webUseInput`**           | <code>boolean</code>                                          | 仅 Web：是否使用 PWA Element 体验或文件输入。默认是使用 PWA Elements（如果已安装），否则回退到文件输入。要始终使用文件输入，将其设置为 `true`。了解更多关于 PWA Elements：https://capacitorjs.com/docs/v3/pwa-elements                                                |                                      | 1.0.0   |
| **`promptLabelHeader`**     | <code>string</code>                                           | 显示提示时使用的文本值。                                                                                                                                                                                                                                          | <code>: 'Photo'</code>               | 1.0.0   |
| **`promptLabelCancel`**     | <code>string</code>                                           | 显示提示时使用的文本值。仅 iOS：'cancel' 按钮的标签。                                                                                                                                                                                                             | <code>: 'Cancel'</code>              | 1.0.0   |
| **`promptLabelPhoto`**      | <code>string</code>                                           | 显示提示时使用的文本值。选择已保存图像的按钮标签。                                                                                                                                                                                                                | <code>: 'From Photos'</code>         | 1.0.0   |
| **`promptLabelPicture`**    | <code>string</code>                                           | 显示提示时使用的文本值。打开相机的按钮标签。                                                                                                                                                                                                                      | <code>: 'Take Picture'</code>        | 1.0.0   |


#### GalleryPhotos

| 属性               | 类型                        | 描述                         | 起始版本 |
| ------------------ | --------------------------- | ---------------------------- | -------- |
| **`photos`**       | <code>GalleryPhoto[]</code> | 所有选取的照片的数组。        | 1.2.0   |


#### GalleryPhoto

| 属性            | 类型                | 描述                                                                                                         | 起始版本 |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| **`path`**      | <code>string</code> | 完整的、平台特定的文件 URL，后续可以使用 Filesystem API 读取。                                                | 1.2.0   |
| **`webPath`**   | <code>string</code> | webPath 返回一个可用于设置图像 src 属性的路径，以实现高效加载和渲染。                                         | 1.2.0   |
| **`exif`**      | <code>any</code>    | 从图像中检索到的 Exif 数据（如果有）。                                                                        | 1.2.0   |
| **`format`**    | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg、png 和 gif。                     | 1.2.0   |


#### GalleryImageOptions

| 属性                       | 类型                                   | 描述                                                                                  | 默认值                        | 起始版本 |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| **`quality`**              | <code>number</code>                    | 返回的 JPEG 图像质量，范围 0-100。                                                      |                               | 1.2.0   |
| **`width`**                | <code>number</code>                    | 保存图像的宽度。                                                                      |                               | 1.2.0   |
| **`height`**               | <code>number</code>                    | 保存图像的高度。                                                                      |                               | 1.2.0   |
| **`correctOrientation`**   | <code>boolean</code>                   | 是否自动旋转图像"向上"以校正竖屏模式下的方向。                                        | <code>: true</code>            | 1.2.0   |
| **`presentationStyle`**    | <code>'fullscreen' \| 'popover'</code> | 仅 iOS：相机的呈现样式。                                                              | <code>: 'fullscreen'</code>    | 1.2.0   |
| **`limit`**                | <code>number</code>                    | 仅 iOS：用户能够选择的最大图片数量。                                                  | <code>0（无限制）</code>       | 1.2.0   |


#### PermissionStatus

| 属性               | 类型                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`camera`**       | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`**       | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |


#### CameraPluginPermissions

| 属性                | 类型                                |
| ------------------- | ----------------------------------- |
| **`permissions`**   | <code>CameraPermissionType[]</code> |


### 类型别名


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### 枚举


#### CameraResultType

| 成员             | 值                    |
| --------------- | ---------------------- |
| **`Uri`**       | <code>'uri'</code>     |
| **`Base64`**    | <code>'base64'</code>  |
| **`DataUrl`**   | <code>'dataUrl'</code> |


#### CameraSource

| 成员            | 值                   | 描述                                                          |
| --------------- | -------------------- | ------------------------------------------------------------- |
| **`Prompt`**    | <code>'PROMPT'</code> | 提示用户选择相册或拍照。                                       |
| **`Camera`**    | <code>'CAMERA'</code> | 使用相机拍摄新照片。                                           |
| **`Photos`**    | <code>'PHOTOS'</code> | 从相册中选择现有照片。                                        |


#### CameraDirection

| 成员           | 值                  |
| -------------- | ------------------- |
| **`Rear`**     | <code>'REAR'</code>  |
| **`Front`**    | <code>'FRONT'</code> |

</docgen-api>
