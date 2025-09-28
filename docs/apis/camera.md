---
title: Camera Capacitor 插件 API
description: Camera API 提供了使用相机拍摄照片或从相册中选择现有照片的功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
sidebar_label: 相机
---

# @capacitor/camera

Camera API 提供了使用相机拍摄照片或从相册中选择现有照片的功能。

## 安装

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS 要求在 `Info.plist` 中添加并填写以下使用描述：

- `NSCameraUsageDescription` (`隐私 - 相机使用描述`)
- `NSPhotoLibraryAddUsageDescription` (`隐私 - 照片库添加使用描述`)
- `NSPhotoLibraryUsageDescription` (`隐私 - 照片库使用描述`)

有关在 Xcode 中设置 iOS 权限的更多信息，请阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)

## Android

当从设备相册中选择现有图片时，现在使用 Android 照片选择器组件。照片选择器在满足以下条件的设备上可用：

- 运行 Android 11（API 级别 30）或更高版本
- 通过 Google 系统更新接收模块化系统组件的更改

运行 Android 11 或 12 且支持 Google Play 服务的旧设备和 Android Go 设备可以安装照片选择器的向后移植版本。要通过 Google Play 服务启用向后移植照片选择器模块的自动安装，请在 `AndroidManifest.xml` 文件的 `<application>` 标签中添加以下条目：

```xml
<!-- 触发 Google Play 服务安装向后移植的照片选择器模块。 -->
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

如果未添加该条目，不支持照片选择器的设备将回退到 `Intent.ACTION_OPEN_DOCUMENT`。

Camera 插件不需要权限，除非使用 `saveToGallery: true`，在这种情况下，应将以下权限添加到 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

您还可以仅为需要请求这些权限的 Android 版本指定它们：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

存储权限用于读取/保存照片文件。

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

此外，由于 Camera API 启动一个单独的 Activity 来处理拍照，您应该在 `App` 插件中监听 `appRestoredResult`，以处理在 Activity 运行时操作系统终止应用程序的情况下发送的任何相机数据。

### 变量

此插件将使用以下项目变量（在应用程序的 `variables.gradle` 文件中定义）：

- `androidxExifInterfaceVersion`: `androidx.exifinterface:exifinterface` 的版本（默认值：`1.3.7`）
- `androidxMaterialVersion`: `com.google.android.material:material` 的版本（默认值：`1.12.0`）

## PWA 注意事项

Camera 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

## 示例

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  // image.webPath 将包含一个可用作图像 src 的路径。
  // 您可以使用 image.path 访问原始文件，该文件可以
  // 传递给 Filesystem API 以读取图像的原始数据，
  // 如果需要（或传递 resultType: CameraResultType.Base64 给 getPhoto）
  var imageUrl = image.webPath;

  // 现在可以设置为图像的 src
  imageElement.src = imageUrl;
};
```

## API

<docgen-index>

- [`getPhoto(...)`](#getphoto)
- [`pickImages(...)`](#pickimages)
- [`pickLimitedLibraryPhotos()`](#picklimitedlibraryphotos)
- [`getLimitedLibraryPhotos()`](#getlimitedlibraryphotos)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions(...)`](#requestpermissions)
- [接口](#interfaces)
- [类型别名](#type-aliases)
- [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册中选择照片或使用相机拍摄新照片。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**自版本：** 1.0.0

---

### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从照片库中选择多张图片。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本：** 1.2.0

---

### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

允许用户更新其有限的照片库选择。
在选择器关闭后返回所有有限的照片。
如果用户授予了对照片的完全访问权限，它将返回一个空数组。

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本：** 4.1.0

---

### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

返回一个从有限的照片库中选择的照片数组。

**返回值：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本：** 4.1.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

---

### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求相机和相册权限

| 参数              | 类型                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

---

### Interfaces

#### Photo

| 属性               | 类型                 | 描述                                                                                                                                                                                             | 自版本 |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`base64String`** | <code>string</code>  | 图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>。                                                                                                 | 1.0.0  |
| **`dataUrl`**      | <code>string</code>  | 以 'data:image/jpeg;base64,' 开头的 URL 和图像的 base64 编码字符串表示，如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>。注意：在 Web 上，文件格式可能因浏览器而异。           | 1.0.0  |
| **`path`**         | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，路径将包含一个完整的、平台特定的文件 URL，稍后可以使用 Filesystem API 读取。                                                      | 1.0.0  |
| **`webPath`**      | <code>string</code>  | webPath 返回一个可用于设置图像 src 属性的路径，以实现高效加载和渲染。                                                                                                                            | 1.0.0  |
| **`exif`**         | <code>any</code>     | 从图像检索的 Exif 数据（如果有）                                                                                                                                                                 | 1.0.0  |
| **`format`**       | <code>string</code>  | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg、png 和 gif，但具体可用性可能因浏览器而异。仅当 `webUseInput` 设置为 `true` 或 `source` 设置为 `Photos` 时支持 gif。 | 1.0.0  |
| **`saved`**        | <code>boolean</code> | 图像是否已保存到相册。在 Android 和 iOS 上，如果用户未授予所需权限，保存到相册可能会失败。在 Web 上没有相册，因此始终返回 false。                                                                | 1.1.0  |

#### ImageOptions

| 属性（Prop）              | 类型（Type）                                          | 描述（Description）                                                                                                                                                                                                                                                                | 默认值（Default）                  | 起始版本（Since） |
| ------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| **`quality`**             | <code>number</code>（数字）                           | 以 JPEG 格式返回的图片质量，取值范围为 0-100。注意：此选项仅支持 Android 和 iOS 系统。                                                                                                                                                                                         | （无默认值）                        | 1.0.0 |
| **`allowEditing`**        | <code>boolean</code>（布尔值）                        | 是否允许用户裁剪图片或进行小幅编辑（因平台而异）。在 iOS 系统中，此选项仅支持 <a href="#camerasource">CameraSource.Camera</a>（相机），不支持 <a href="#camerasource">CameraSource.Photos</a>（相册）。                                                                               | （无默认值）                        | 1.0.0 |
| **`resultType`**          | <code><a href="#cameraresulttype">CameraResultType</a></code> | 图片数据的返回格式。目前仅支持 “Base64”、“DataUrl” 或 “Uri” 格式。                                                                                                                                                                                                              | （无默认值）                        | 1.0.0 |
| **`saveToGallery`**       | <code>boolean</code>（布尔值）                        | 是否将图片保存到相册。若图片是从相册中选取的，则仅在编辑后才会保存。                                                                                                                                                                                                              | <code>: false</code>（否）          | 1.0.0 |
| **`width`**               | <code>number</code>（数字）                           | 保存图片的期望最大宽度，图片的宽高比会保持不变。                                                                                                                                                                                                                                  | （无默认值）                        | 1.0.0 |
| **`height`**              | <code>number</code>（数字）                           | 保存图片的期望最大高度，图片的宽高比会保持不变。                                                                                                                                                                                                                                  | （无默认值）                        | 1.0.0 |
| **`correctOrientation`**  | <code>boolean</code>（布尔值）                        | 是否自动将图片旋转至“正向”，以修正竖屏模式下的图片方向问题。                                                                                                                                                                                                                      | <code>: true</code>（是）           | 1.0.0 |
| **`source`**              | <code><a href="#camerasource">CameraSource</a></code> | 获取图片的来源。默认情况下，会提示用户选择从相册选取图片或使用相机拍摄。                                                                                                                                                                                                          | <code>: CameraSource.Prompt</code>（提示选择） | 1.0.0 |
| **`direction`**           | <code><a href="#cameradirection">CameraDirection</a></code> | 仅支持 iOS 和 Web 端：相机的取景方向（如前置、后置）。                                                                                                                                                                                                                           | <code>: CameraDirection.Rear</code>（后置） | 1.0.0 |
| **`presentationStyle`**   | <code>'fullscreen' \| 'popover'</code>（字符串枚举）  | 仅支持 iOS 端：相机界面的呈现样式，可选“全屏（fullscreen）”或“弹出层（popover）”。                                                                                                                                                                                                | <code>: 'fullscreen'</code>（全屏） | 1.0.0 |
| **`webUseInput`**         | <code>boolean</code>（布尔值）                        | 仅支持 Web 端：是否使用 PWA Elements（渐进式 Web 应用元素）体验或文件输入框。默认行为是：若已安装 PWA Elements，则使用该体验；若未安装，则回退至文件输入框。若需始终使用文件输入框，可将此属性设为 `true`。关于 PWA Elements 的更多信息，请参考：https://capacitorjs.com/docs/web/pwa-elements | （无默认值）                        | 1.0.0 |
| **`promptLabelHeader`**   | <code>string</code>（字符串）                         | 显示提示弹窗时使用的标题文本。                                                                                                                                                                                                                                                  | <code>: 'Photo'</code>（照片）      | 1.0.0 |
| **`promptLabelCancel`**   | <code>string</code>（字符串）                         | 显示提示弹窗时使用的文本。仅支持 iOS 端：“取消”按钮的标签文本。                                                                                                                                                                                                                  | <code>: 'Cancel'</code>（取消）     | 1.0.0 |
| **`promptLabelPhoto`**    | <code>string</code>（字符串）                         | 显示提示弹窗时使用的文本。用于选择已保存图片的按钮标签文本。                                                                                                                                                                                                                      | <code>: 'From Photos'</code>（从相册选择） | 1.0.0 |
| **`promptLabelPicture`**  | <code>string</code>（字符串）                         | 显示提示弹窗时使用的文本。用于打开相机的按钮标签文本。                                                                                                                                                                                                                            | <code>: 'Take Picture'</code>（拍摄照片） | 1.0.0 |


#### GalleryPhotos

| 属性         | 类型                        | 描述                 | 自版本 |
| ------------ | --------------------------- | -------------------- | ------ |
| **`photos`** | <code>GalleryPhoto[]</code> | 所有选定照片的数组。 | 1.2.0  |

#### GalleryPhoto

| 属性          | 类型                | 描述                                                                                      | 自版本 |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------- | ------ |
| **`path`**    | <code>string</code> | 完整的、平台特定的文件 URL，稍后可以使用 Filesystem API 读取。                            | 1.2.0  |
| **`webPath`** | <code>string</code> | webPath 返回一个可用于设置图像 src 属性的路径，以实现高效加载和渲染。                     | 1.2.0  |
| **`exif`**    | <code>any</code>    | 从图像检索的 Exif 数据（如果有）                                                          | 1.2.0  |
| **`format`**  | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 支持 jpeg、png 和 gif。 | 1.2.0  |

#### GalleryImageOptions

| 属性                     | 类型                                   | 描述                                                                       | 默认值                      | 自版本 |
| ------------------------ | -------------------------------------- | -------------------------------------------------------------------------- | --------------------------- | ------ |
| **`quality`**            | <code>number</code>                    | 返回的 JPEG 图像质量，从 0-100 注意：此选项仅在 Android 和 iOS 上受支持。  |                             | 1.2.0  |
| **`width`**              | <code>number</code>                    | 保存图像的所需最大宽度。保持宽高比。                                       |                             | 1.2.0  |
| **`height`**             | <code>number</code>                    | 保存图像的所需最大高度。保持宽高比。                                       |                             | 1.2.0  |
| **`correctOrientation`** | <code>boolean</code>                   | 是否自动将图像“向上”旋转以校正纵向模式下的方向                             | <code>: true</code>         | 1.2.0  |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | 仅限 iOS：相机的呈现样式。                                                 | <code>: 'fullscreen'</code> | 1.2.0  |
| **`limit`**              | <code>number</code>                    | 用户可以选择的最大图片数量。注意：此选项仅在 Android 13+ 和 iOS 上受支持。 | <code>0 (无限制)</code>     | 1.2.0  |

#### PermissionStatus

| 属性         | 类型                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |

#### CameraPluginPermissions

| 属性              | 类型                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |

### Type Aliases

#### CameraPermissionState

<code>
  <a href="#permissionstate">PermissionState</a> | 'limited'
</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### CameraPermissionType

<code>'camera' | 'photos'</code>

### Enums

#### CameraResultType

| 成员          | 值                     |
| ------------- | ---------------------- |
| **`Uri`**     | <code>'uri'</code>     |
| **`Base64`**  | <code>'base64'</code>  |
| **`DataUrl`** | <code>'dataUrl'</code> |

#### CameraSource

| 成员         | 值                    | 描述                         |
| ------------ | --------------------- | ---------------------------- |
| **`Prompt`** | <code>'PROMPT'</code> | 提示用户选择相册或拍照。     |
| **`Camera`** | <code>'CAMERA'</code> | 使用相机拍摄新照片。         |
| **`Photos`** | <code>'PHOTOS'</code> | 从图库或相册中选择现有照片。 |

#### CameraDirection

| 成员        | 值                   |
| ----------- | -------------------- |
| **`Rear`**  | <code>'REAR'</code>  |
| **`Front`** | <code>'FRONT'</code> |

</docgen-api>
