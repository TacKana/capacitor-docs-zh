---
title: Camera Capacitor Plugin API
description: Camera API 提供了通过摄像头拍摄照片或从相册选择现有照片的功能。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
sidebar_label: 相机
---

# @capacitor/camera

Camera API 提供了通过摄像头拍摄照片或从相册选择现有照片的功能。

## 安装

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS 需要在应用的 `Info.plist` 中添加并填写以下使用说明：

- `NSCameraUsageDescription` (`隐私 - 相机使用说明`)
- `NSPhotoLibraryAddUsageDescription` (`隐私 - 相册添加使用说明`)
- `NSPhotoLibraryUsageDescription` (`隐私 - 相册使用说明`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 部分，了解如何在 Xcode 中设置 iOS 权限的更多信息。

## Android

此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

存储权限用于读取/保存照片文件。

阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 部分，了解如何设置 Android 权限的更多信息。

另外，由于 Camera API 会启动一个单独的 Activity 来处理拍照，你应该在 `App` 插件中监听 `appRestoredResult` 事件，以处理操作系统在 Activity 运行时终止应用时可能发送的任何相机数据。

### 变量

该插件将使用以下项目变量（定义在应用的 `variables.gradle` 文件中）：

- `$androidxExifInterfaceVersion`: `androidx.exifinterface:exifinterface` 版本（默认：`1.3.3`）
- `$androidxMaterialVersion`: `com.google.android.material:material` 版本（默认：`1.6.1`）

## PWA 注意事项

Camera 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath 包含可用作图片 src 的路径
  // 你可以使用 image.path 访问原始文件，该路径可以传递给 Filesystem API 以读取图片的原始数据
  // （如果需要，也可以传递 resultType: CameraResultType.Base64 给 getPhoto）
  var imageUrl = image.webPath;

  // 现在可以将其设置为图片的 src
  imageElement.src = imageUrl;
};
```

## API

<docgen-index>

* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [`pickLimitedLibraryPhotos()`](#picklimitedlibraryphotos)
* [`getLimitedLibraryPhotos()`](#getlimitedlibraryphotos)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册选择照片或使用摄像头拍摄新照片。

| 参数         | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**自:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从相册中选择多张图片。在 iOS 13 及更早版本上只能选择一张图片。

| 参数         | 类型                                                                |
| ------------ | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自:** 1.2.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅限 iOS 14+：允许用户更新其有限的照片库选择。在 iOS 15+ 上，选择器关闭后返回所有有限照片。在 iOS 14 上或用户授予相册完全访问权限时返回空数组。

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自:** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅限 iOS 14+：返回从有限照片库中选择的照片数组。

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自:** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求相机和相册权限

| 参数             | 类型                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### 接口


#### Photo

| 属性               | 类型                 | 描述                                                                                                                                                                                                      | 自 |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`base64String`** | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>，则为图片的 base64 编码字符串表示形式。                                                                                         | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>，则为以 'data:image/jpeg;base64,' 开头的 URL，后跟图片的 base64 编码字符串表示形式。                                    | 1.0.0 |
| **`path`**         | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，则路径将包含一个完整的、平台特定的文件 URL，可以使用 Filesystem API 读取。                                         | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath 返回一个可用作图片 src 属性的路径，用于高效加载和渲染。                                                                                                | 1.0.0 |
| **`exif`**         | <code>any</code>     | 从图片中检索的 Exif 数据（如果有）                                                                                                                                                                      | 1.0.0 |
| **`format`**       | <code>string</code>  | 图片格式，例如 jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg 和 png。gif 仅在文件输入时支持。                                                            | 1.0.0 |
| **`saved`**        | <code>boolean</code> | 图片是否已保存到相册。在 Android 和 iOS 上，如果用户未授予所需权限，保存到相册可能会失败。Web 上没有相册，因此始终返回 false。 | 1.1.0 |


#### ImageOptions

| 属性                     | 类型                                                          | 描述                                                                                                                                                                                                                                                                | 默认值                             | 自 |
| ------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                           | 返回 JPEG 图片的质量，范围 0-100                                                                                                                                                                                                                         |                                     | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                          | 是否允许用户裁剪或进行小编辑（平台特定）。在 iOS 14+ 上仅支持 <a href="#camerasource">CameraSource.Camera</a>，不支持 <a href="#camerasource">CameraSource.Photos</a>。                                                |                                     | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据应如何返回。目前仅支持 'Base64'、'DataUrl' 或 'Uri'                                                                                                                                                                                 |                                     | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册中选取的，则仅在编辑后保存。                                                                                                                                                       | <code>: false</code>                | 1.0.0 |
| **`width`**              | <code>number</code>                                           | 保存图片所需的最大宽度。保持宽高比。                                                                                                                                                                                               |                                     | 1.0.0 |
| **`height`**             | <code>number</code>                                           | 保存图片所需的最大高度。保持宽高比。                                                                                                                                                                                              |                                     | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                          | 是否自动将图片旋转为"向上"方向以纠正纵向模式下的方向                                                                                                                                                                                 | <code>: true</code>                 | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认提示用户选择相册或拍照。                                                                                                                                                       | <code>: CameraSource.Prompt</code>  | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅限 iOS 和 Web：摄像头方向。                                                                                                                                                                                                                                    | <code>: CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                        | 仅限 iOS：相机的呈现样式。                                                                                                                                                                                                                            | <code>: 'fullscreen'</code>         | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                          | 仅限 Web：是否使用 PWA Element 体验或文件输入。默认使用 PWA Elements（如果已安装），否则回退到文件输入。要始终使用文件输入，请将其设置为 `true`。了解有关 PWA Elements 的更多信息：https://capacitorjs.com/docs/web/pwa-elements |                                     | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                           | 显示提示时使用的文本值。                                                                                                                                                                                                                              | <code>: 'Photo'</code>              | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                           | 显示提示时使用的文本值。仅限 iOS："取消"按钮的标签。                                                                                                                                                                                  | <code>: 'Cancel'</code>             | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                           | 显示提示时使用的文本值。选择保存图片的按钮标签。                                                                                                                                                                             | <code>: 'From Photos'</code>        | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                           | 显示提示时使用的文本值。打开相机的按钮标签。                                                                                                                                                                                  | <code>: 'Take Picture'</code>       | 1.0.0 |


#### GalleryPhotos

| 属性         | 类型                        | 描述                     | 自 |
| ------------ | --------------------------- | ------------------------------- | ----- |
| **`photos`** | <code>GalleryPhoto[]</code> | 所有已选图片的数组。 | 1.2.0 |


#### GalleryPhoto

| 属性          | 类型                | 描述                                                                                                       | 自 |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | <code>string</code> | 完整的、平台特定的文件 URL，可以使用 Filesystem API 读取。                                 | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath 返回一个可用作图片 src 属性的路径，用于高效加载和渲染。 | 1.2.0 |
| **`exif`**    | <code>any</code>    | 从图片中检索的 Exif 数据（如果有）                                                                       | 1.2.0 |
| **`format`**  | <code>string</code> | 图片格式，例如 jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg、png 和 gif。   | 1.2.0 |


#### GalleryImageOptions

| 属性                     | 类型                                   | 描述                                                                                | 默认值                     | 自 |
| ------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------- | ----- |
| **`quality`**            | <code>number</code>                    | 返回 JPEG 图片的质量，范围 0-100                                         |                             | 1.2.0 |
| **`width`**              | <code>number</code>                    | 保存图片所需的最大宽度。保持宽高比。               |                             | 1.2.0 |
| **`height`**             | <code>number</code>                    | 保存图片所需的最大高度。保持宽高比。              |                             | 1.2.0 |
| **`correctOrientation`** | <code>boolean</code>                   | 是否自动将图片旋转为"向上"方向以纠正纵向模式 | <code>: true</code>         | 1.2.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | 仅限 iOS：相机的呈现样式。                                            | <code>: 'fullscreen'</code> | 1.2.0 |
| **`limit`**              | <code>number</code>                    | 仅限 iOS：用户可以选择的最大图片数量。                      | <code>0 (无限制)</code>  | 1.2.0 |


#### PermissionStatus

| 属性         | 类型                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |


#### CameraPluginPermissions

| 属性              | 类型                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |


### 类型别名


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### 枚举


#### CameraResultType

| 成员       | 值                  |
| ------------- | ---------------------- |
| **`Uri`**     | <code>'uri'</code>     |
| **`Base64`**  | <code>'base64'</code>  |
| **`DataUrl`** | <code>'dataUrl'</code> |


#### CameraSource

| 成员      | 值                 | 描述                                                        |
| ------------ | --------------------- | ------------------------------------------------------------------ |
| **`Prompt`** | <code>'PROMPT'</code> | 提示用户选择相册或拍照。 |
| **`Camera`** | <code>'CAMERA'</code> | 使用相机拍摄新照片。                                 |
| **`Photos`** | <code>'PHOTOS'</code> | 从相册或照片库中选择现有照片。            |


#### CameraDirection

| 成员     | 值                |
| ----------- | -------------------- |
| **`Rear`**  | <code>'REAR'</code>  |
| **`Front`** | <code>'FRONT'</code> |

</docgen-api>