---
title: Camera Capacitor Plugin API
description: 相机API提供调用设备摄像头拍照或从相册中选择现有照片的功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/camera/src/definitions.ts
sidebar_label: Camera
---

# @capacitor/camera

相机API提供调用设备摄像头拍照或从相册中选择现有照片的功能。

## 安装

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS配置

iOS需要在应用的`Info.plist`文件中添加并填写以下使用描述字段：

- `NSCameraUsageDescription` (`隐私-相机使用说明`)
- `NSPhotoLibraryAddUsageDescription` (`隐私-相册添加权限说明`) 
- `NSPhotoLibraryUsageDescription` (`隐私-相册使用说明`)

更多关于在Xcode中设置iOS权限的信息，请参阅[iOS指南](https://capacitorjs.com/docs/ios)中的[配置Info.plist](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)章节

## Android配置

当从设备相册选择现有图片时，Android系统会使用照片选择器组件。该组件在满足以下条件的设备上可用：

- 运行Android 11（API级别30）或更高版本
- 通过Google系统更新接收模块化系统组件变更

对于旧设备以及运行Android 11或12并支持Google Play服务的Android Go设备，可以安装向后兼容版本的照片选择器。要启用通过Google Play服务自动安装向后兼容的模块，请在`AndroidManifest.xml`文件的`<application>`标签内添加以下配置：

```xml
<!-- 触发Google Play服务安装向后兼容的照片选择器模块 -->
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

如果未添加此配置，不支持照片选择器的设备将回退使用`Intent.ACTION_OPEN_DOCUMENT`。

除非使用`saveToGallery: true`参数，否则相机插件不需要任何权限。如需使用该参数，则应在`AndroidManifest.xml`中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

也可以仅针对需要请求权限的Android版本进行指定：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

存储权限用于读取/保存照片文件。

更多关于设置Android权限的信息，请参阅[Android指南](https://capacitorjs.com/docs/android)中的[权限设置](https://capacitorjs.com/docs/android/configuration#setting-permissions)章节。

另外，由于相机API会启动单独的Activity来处理拍照，您应该在`App`插件中监听`appRestoredResult`事件，以处理在Activity运行期间应用被操作系统终止时可能发送的任何相机数据。

### 变量

本插件将使用以下项目变量（定义在应用的`variables.gradle`文件中）：

- `androidxExifInterfaceVersion`: `androidx.exifinterface:exifinterface`的版本（默认：`1.3.6`）
- `androidxMaterialVersion`: `com.google.android.material:material`的版本（默认：`1.10.0`）

## PWA注意事项

相机插件需要[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements)支持才能正常工作。

## 示例

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath包含可用作图片src的路径
  // 可以通过image.path访问原始文件，该路径可以传递给Filesystem API读取图像原始数据
  // （如果需要，也可以设置resultType: CameraResultType.Base64来获取Base64数据）
  var imageUrl = image.webPath;

  // 现在可以将其设置为图片元素的src
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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册选择照片或使用相机拍摄新照片

| 参数         | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从相册选择多张图片。
在iOS 13及更早版本上仅支持选择单张图片。

| 参数         | 类型                                                                |
| ------------ | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本:** 1.2.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅iOS 14+：允许用户更新其有限的照片库选择。
在iOS 15+上返回选择器关闭后的所有受限照片。
在iOS 14或用户已授予完整照片访问权限时返回空数组。

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本:** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

仅iOS 14+：返回从受限照片库中选择的照片数组。

**返回值:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本:** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

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

**自版本:** 1.0.0

--------------------


### 接口


#### Photo

| 属性               | 类型                 | 描述                                                                                                                                                                                                                                                              | 版本 |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`base64String`** | <code>string</code>  | 如果使用<a href="#cameraresulttype">CameraResultType.Base64</a>，则返回图像的base64编码字符串                                                                                                                                                                     | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | 如果使用<a href="#cameraresulttype">CameraResultType.DataUrl</a>，则返回以'data:image/jpeg;base64,'开头的URL和图像的base64编码字符串。注意：在Web上，文件格式可能因浏览器而异。                                                                                   | 1.0.0 |
| **`path`**         | <code>string</code>  | 如果使用<a href="#cameraresulttype">CameraResultType.Uri</a>，则path包含完整的平台特定文件URL，稍后可以使用Filesystem API读取。                                                                                                                                    | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath返回可用于设置图片src属性的路径，以实现高效加载和渲染。                                                                                                                                                                                                    | 1.0.0 |
| **`exif`**         | <code>any</code>     | 从图像中检索的Exif数据（如果有）                                                                                                                                                                                                                                  | 1.0.0 |
| **`format`**       | <code>string</code>  | 图像格式，如jpeg、png、gif。iOS和Android仅支持jpeg。Web支持jpeg、png和gif，但具体可用性可能因浏览器而异。gif仅在`webUseInput`设置为`true`或`source`设置为`Photos`时支持。                                                                                         | 1.0.0 |
| **`saved`**        | <code>boolean</code> | 图像是否已保存到相册。在Android和iOS上，如果用户未授予所需权限，保存到相册可能会失败。在Web上没有相册，因此始终返回false。                                                                                                                                        | 1.1.0 |


#### ImageOptions

| 属性                     | 类型                                                          | 描述                                                                                                                                                                                                                                                                | 默认值                             | 版本 |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ---- |
| **`quality`**            | <code>number</code>                                           | 返回JPEG图像的质量，0-100。注意：此选项仅在Android和iOS上受支持                                                                                                                                                                                                    |                                     | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                          | 是否允许用户裁剪或进行小编辑（平台特定）。在iOS 14+上仅支持<a href="#camerasource">CameraSource.Camera</a>，不支持<a href="#camerasource">CameraSource.Photos</a>。                                                                                                |                                     | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code> | 数据返回方式。当前仅支持'Base64'、'DataUrl'或'Uri'                                                                                                                                                                                                                 |                                     | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                          | 是否将照片保存到相册。如果照片是从相册选取的，则仅在编辑后才会保存。                                                                                                                                                                                               | <code>: false</code>                | 1.0.0 |
| **`width`**              | <code>number</code>                                           | 保存图像的期望最大宽度。保持宽高比。                                                                                                                                                                                                                               |                                     | 1.0.0 |
| **`height`**             | <code>number</code>                                           | 保存图像的期望最大高度。保持宽高比。                                                                                                                                                                                                                               |                                     | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                          | 是否在竖屏模式下自动旋转图像"向上"以校正方向                                                                                                                                                                                                                       | <code>: true</code>                 | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>         | 获取照片的来源。默认提示用户选择相册或拍照。                                                                                                                                                                                                                       | <code>: CameraSource.Prompt</code>  | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅iOS和Web：相机方向。                                                                                                                                                                                                                                             | <code>: CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                        | 仅iOS：相机的呈现样式。                                                                                                                                                                                                                                            | <code>: 'fullscreen'</code>         | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                          | 仅Web：是否使用PWA Element体验或文件输入。默认为如果安装了PWA Elements则使用它，否则回退到文件输入。要始终使用文件输入，请将此设置为`true`。了解更多关于PWA Elements：https://capacitorjs.com/docs/web/pwa-elements                                               |                                     | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                           | 显示提示时使用的文本值。                                                                                                                                                                                                                                           | <code>: 'Photo'</code>              | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                           | 显示提示时使用的文本值。仅iOS：'取消'按钮的标签。                                                                                                                                                                                                                  | <code>: 'Cancel'</code>             | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                           | 显示提示时使用的文本值。选择已保存图像的按钮标签。                                                                                                                                                                                                                 | <code>: 'From Photos'</code>        | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                           | 显示提示时使用的文本值。打开相机的按钮标签。                                                                                                                                                                                                                       | <code>: 'Take Picture'</code>       | 1.0.0 |


#### GalleryPhotos

| 属性         | 类型                        | 描述                     | 版本 |
| ------------ | --------------------------- | ------------------------ | ---- |
| **`photos`** | <code>GalleryPhoto[]</code> | 所有已选择照片的数组。   | 1.2.0 |


#### GalleryPhoto

| 属性          | 类型                | 描述                                                                                                       | 版本 |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------------- | ---- |
| **`path`**    | <code>string</code> | 完整的平台特定文件URL，稍后可以使用Filesystem API读取。                                                   | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath返回可用于设置图片src属性的路径，以实现高效加载和渲染。                                            | 1.2.0 |
| **`exif`**    | <code>any</code>    | 从图像中检索的Exif数据（如果有）                                                                          | 1.2.0 |
| **`format`**  | <code>string</code> | 图像格式，如jpeg、png、gif。iOS和Android仅支持jpeg。Web支持jpeg、png和gif。                               | 1.2.0 |


#### GalleryImageOptions

| 属性                     | 类型                                   | 描述                                                                                                             | 默认值                     | 版本 |
| ------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- | ---- |
| **`quality`**            | <code>number</code>                    | 返回JPEG图像的质量，0-100。注意：此选项仅在Android和iOS上受支持。                                               |                            | 1.2.0 |
| **`width`**              | <code>number</code>                    | 保存图像的期望最大宽度。保持宽高比。                                                                            |                            | 1.2.0 |
| **`height`**             | <code>number</code>                    | 保存图像的期望最大高度。保持宽高比。                                                                            |                            | 1.2.0 |
| **`correctOrientation`** | <code>boolean</code>                   | 是否在竖屏模式下自动旋转图像"向上"以校正方向                                                                    | <code>: true</code>       | 1.2.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | 仅iOS：相机的呈现样式。                                                                                        | <code>: 'fullscreen'</code> | 1.2.0 |
| **`limit`**              | <code>number</code>                    | 用户能够选择的图片最大数量。注意：此选项仅在Android 13+和iOS上受支持。                                          | <code>0 (无限制)</code>   | 1.2.0 |


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

