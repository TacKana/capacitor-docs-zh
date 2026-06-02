---
title: Camera Capacitor 插件 API
description: Camera API 提供使用相机拍照或从相册中选择现有照片的能力。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/camera/src/definitions.ts
sidebar_label: Camera
translated: true
---

# @capacitor/camera

Camera API 提供使用相机拍照或从相册中选择现有照片的能力。

## 安装

```bash
npm install @capacitor/camera@latest-7
npx cap sync
```

## iOS

iOS 需要在 `Info.plist` 中为您的应用添加并填写以下使用说明：

- `NSCameraUsageDescription`（隐私 - 相机使用说明）
- `NSPhotoLibraryAddUsageDescription`（隐私 - 相册添加使用说明）
- `NSPhotoLibraryUsageDescription`（隐私 - 相册使用说明）

阅读关于[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的更多信息，请参阅 [iOS 指南](https://capacitorjs.com/docs/ios) 以了解在 Xcode 中设置 iOS 权限的更多信息。

## Android

从设备图库中选择现有图像时，现在使用 Android Photo Picker 组件。Photo Picker 可在满足以下条件的设备上使用：

- 运行 Android 11（API 级别 30）或更高版本
- 通过 Google 系统更新接收模块化系统组件的更改

运行 Android 11 或 12 且支持 Google Play 服务的旧设备和 Android Go 设备可以安装 Photo Picker 的向后移植版本。要启用通过 Google Play 服务自动安装向后移植的 Photo Picker 模块，请在您的 `AndroidManifest.xml` 文件的 `<application>` 标签中添加以下条目：

```xml
<!-- 触发 Google Play 服务安装向后移植的 Photo Picker 模块。 -->
<!--suppress AndroidDomInspection -->
<service android:name="com.google.android.gms.metadata.ModuleDependencies"
    android:enabled="false"
    android:exported="false"
    tools:ignore="MissingClass">
    <intent-filter>
        <action android:name="com.google.android.gms.metadata.MODULE_DEPENDENCIES" />
    </intent-filter>
    <meta-data android:name="photopicker_activity:0:required" android:value="" />
</service>
```

如果未添加该条目，不支持 Photo Picker 的设备将回退使用 `Intent.ACTION_OPEN_DOCUMENT`。

Camera 插件不需要权限，除非使用 `saveToGallery: true`，在这种情况下应将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

您也可以仅在需要请求这些权限的 Android 版本上指定它们：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

存储权限用于读取/保存照片文件。

阅读关于[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)的更多信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android) 以了解有关设置 Android 权限的更多信息。

此外，由于 Camera API 启动一个单独的 Activity 来处理拍照，您应该在 `App` 插件中监听 `appRestoredResult`，以处理在 Activity 运行时您的应用被操作系统终止的情况下可能发送的任何相机数据。

### 变量

此插件将使用以下项目变量（在您的应用的 `variables.gradle` 文件中定义）：

- `androidxExifInterfaceVersion`：`androidx.exifinterface:exifinterface` 的版本（默认值：`1.3.7`）
- `androidxMaterialVersion`：`com.google.android.material:material` 的版本（默认值：`1.12.0`）

## PWA 说明

Camera 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

## 示例

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath 将包含一个可以设置为图片 src 的路径。
  // 您可以使用 image.path 访问原始文件，该路径可以
  // 传递给 Filesystem API 来读取图像的原始数据，
  // 如果需要（或者将 resultType 设置为 CameraResultType.Base64 传递给 getPhoto）
  var imageUrl = image.webPath;

  // 现在可以将其设置为图像的 src
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册中选择照片，或用相机拍摄新照片。

| 参数 | 类型 |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从照片库中选择多张图片。
在 iOS 13 及更早版本上，它只允许选择一张图片。

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**起始版本：** 1.2.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅 iOS 14+：允许用户更新其有限的照片库选择。
在 iOS 15+ 上，选择器关闭后返回所有有限的照片。
在 iOS 14 上或如果用户授予了对照片的完全访问权限，则返回空数组。

**返回值：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**起始版本：** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅 iOS 14+：返回从有限照片库中选择的照片数组。

**返回值：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**起始版本：** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求相机和相册权限。

| 参数 | 类型 |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### Interfaces


#### Photo

| 属性 | 类型 | 描述 | 起始版本 |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`base64String`** | <code>string</code>  | 图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>。 | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | 以 'data:image/jpeg;base64,' 开头的 URL 和图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>。注意：在 web 上，文件格式可能因浏览器而异。 | 1.0.0 |
| **`path`**         | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，路径将包含完整的、特定于平台的文件 URL，以后可以使用 Filesystem API 读取。 | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath 返回一个可用于设置图像 src 属性的路径，以便高效加载和渲染。 | 1.0.0 |
| **`exif`**         | <code>any</code>     | 从图像中检索到的任何 Exif 数据。 | 1.0.0 |
| **`format`**       | <code>string</code>  | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。 | 1.0.0 |
| **`saved`**        | <code>boolean</code> | 图像是否保存到图库。在 Android 和 iOS 上，如果用户未授予所需权限，保存到图库可能会失败。在 Web 上没有图库，因此始终返回 false。 | 1.1.0 |


#### ImageOptions

| 属性 | 类型 | 描述 | 默认值 | 起始版本 |
| ------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                           | 返回的 JPEG 图像质量，0-100。注意：此选项仅在 Android 和 iOS 上受支持。 | | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                          | 是否允许用户裁剪或进行小的编辑（平台特定）。 | | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据的返回方式。目前仅支持 'Base64'、'DataUrl' 或 'Uri'。 | | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                          | 是否将照片保存到图库。 | <code>: false</code> | 1.0.0 |
| **`width`**              | <code>number</code>                                           | 保存图像所需的宽度。保持宽高比。 | | 1.0.0 |
| **`height`**             | <code>number</code>                                           | 保存图像所需的高度。保持宽高比。 | | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                          | 是否自动旋转图像以纠正竖屏模式下的方向。 | <code>: true</code> | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认情况下，会提示用户选择相册或拍照。 | <code>: CameraSource.Prompt</code> | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅 iOS 和 Web：相机方向。 | <code>: CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                        | 仅 iOS：相机的呈现样式。 | <code>: 'fullscreen'</code> | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                          | 仅 Web：是否使用 PWA Element 体验或文件输入。 | | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                           | 显示提示时使用的文本值。 | <code>: 'Photo'</code> | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                           | 显示提示时使用的文本值。仅 iOS：'cancel' 按钮的标签。 | <code>: 'Cancel'</code> | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                           | 显示提示时使用的文本值。选择已保存图像的按钮标签。 | <code>: 'From Photos'</code> | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                           | 显示提示时使用的文本值。打开相机按钮的标签。 | <code>: 'Take Picture'</code> | 1.0.0 |


#### GalleryPhotos

| 属性 | 类型 | 描述 | 起始版本 |
| ------------ | --------------------------- | ------------------------------- | ----- |
| **`photos`** | <code>GalleryPhoto[]</code> | 所有选中的照片数组。 | 1.2.0 |


#### GalleryPhoto

| 属性 | 类型 | 描述 | 起始版本 |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | <code>string</code> | 完整的、特定于平台的文件 URL，以后可以使用 Filesystem API 读取。 | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath 返回一个可用于设置图像 src 属性的路径，以便高效加载和渲染。 | 1.2.0 |
| **`exif`**    | <code>any</code>    | 从图像中检索到的任何 Exif 数据。 | 1.2.0 |
| **`format`**  | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。 | 1.2.0 |


#### GalleryImageOptions

| 属性 | 类型 | 描述 | 默认值 | 起始版本 |
| ------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| **`quality`**            | <code>number</code>                    | 返回的 JPEG 图像质量，0-100。注意：此选项仅在 Android 和 iOS 上受支持。 | | 1.2.0 |
| **`width`**              | <code>number</code>                    | 保存图像所需的宽度。保持宽高比。 | | 1.2.0 |
| **`height`**             | <code>number</code>                    | 保存图像所需的高度。保持宽高比。 | | 1.2.0 |
| **`correctOrientation`** | <code>boolean</code>                   | 是否自动旋转图像以纠正竖屏模式下的方向。 | <code>: true</code> | 1.2.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | 仅 iOS：相机的呈现样式。 | <code>: 'fullscreen'</code> | 1.2.0 |
| **`limit`**              | <code>number</code>                    | 用户能够选择的最大图片数量。注意：此选项仅在 Android 13+ 和 iOS 上受支持。 | <code>0（无限制）</code> | 1.2.0 |


#### PermissionStatus

| 属性 | 类型 |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |


#### CameraPluginPermissions

| 属性 | 类型 |
| --------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |


### Type Aliases


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### 枚举


#### CameraResultType

| 成员 | 值 |
| ------------- | ---------------------- |
| **`Uri`**     | <code>'uri'</code>     |
| **`Base64`**  | <code>'base64'</code>  |
| **`DataUrl`** | <code>'dataUrl'</code> |


#### CameraSource

| 成员 | 值 | 描述 |
| ------------ | --------------------- | ------------------------------------------------------------- |
| **`Prompt`** | <code>'PROMPT'</code> | 提示用户选择相册或拍照。 |
| **`Camera`** | <code>'CAMERA'</code> | 使用相机拍摄新照片。 |
| **`Photos`** | <code>'PHOTOS'</code> | 从图库或相册中选择现有照片。 |


#### CameraDirection

| 成员 | 值 |
| ----------- | -------------------- |
| **`Rear`**  | <code>'REAR'</code>  |
| **`Front`** | <code>'FRONT'</code> |

</docgen-api>
