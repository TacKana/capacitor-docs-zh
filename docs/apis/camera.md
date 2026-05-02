---
title: Camera Capacitor Plugin API
description: Camera API 提供了使用相机拍照或从相册中选择现有照片的能力。
custom_edit_url: https://github.com/ionic-team/capacitor-camera/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-camera/blob/main/src/definitions.ts
sidebar_label: Camera
---

# @capacitor/camera

Camera API 提供了使用相机拍照或从相册中选择现有照片的能力。

## 安装

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS 需要在 `Info.plist` 中添加并填写以下使用说明：

- `NSCameraUsageDescription`（Privacy - Camera Usage Description）
- `NSPhotoLibraryAddUsageDescription`（Privacy - Photo Library Additions Usage Description）
- `NSPhotoLibraryUsageDescription`（Privacy - Photo Library Usage Description）

请参阅 [iOS 指南](https://capacitorjs.com/docs/ios) 中的 [配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 了解更多关于在 Xcode 中设置 iOS 权限的信息。

## Android

从设备图库选取已有图片时，现在会使用 Android 图片选择器组件。图片选择器适用于满足以下条件的设备：

- 运行 Android 11（API 级别 30）或更高版本
- 通过 Google 系统更新接收模块化系统组件的更新

运行 Android 11 或 12 且支持 Google Play 服务的旧设备及 Android Go 设备可以安装向后移植版本的图片选择器。要启用通过 Google Play 服务自动安装向后移植的图片选择器模块，请在 `AndroidManifest.xml` 文件的 `<application>` 标签中添加以下条目：

```xml
<!-- Trigger Google Play services to install the backported photo picker module. -->
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

如果未添加该条目，在不支持图片选择器的设备上，图片选择器组件会回退到 `Intent.ACTION_OPEN_DOCUMENT`。

Camera 插件不需要任何权限，除非使用 `saveToGallery: true`，在这种情况下，需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

你也可以仅在需要请求这些权限的 Android 版本中指定它们：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

存储权限用于读取/保存照片文件。

请参阅 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 了解更多关于设置 Android 权限的信息。

此外，由于 Camera API 会启动一个单独的 Activity 来处理拍照，你应该监听 `App` 插件中的 `appRestoredResult` 事件，以处理在 Activity 运行时应用被操作系统终止的情况下可能发送的任何相机数据。

### 变量

该插件将使用以下项目变量（定义在你应用的 `variables.gradle` 文件中）：

- `androidxExifInterfaceVersion`：`androidx.exifinterface:exifinterface` 的版本（默认：`1.4.1`）
- `androidxMaterialVersion`：`com.google.android.material:material` 的版本（默认：`1.13.0`）

## PWA 注意事项

在 Web 上，`takePhoto` 可以使用 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 的 `pwa-camera-modal` 自定义元素来提供类似原生的相机界面。如果该元素未注册，插件会回退到 `<input type="file">` 选择器。`chooseFromGallery` 在 Web 上始终使用 `<input type="file">`，无论是否安装了 PWA Elements。

### 以编程方式安装 PWA Elements

有关完整说明，请参阅 [PWA Elements 安装指南](https://capacitorjs.com/docs/web/pwa-elements#installation)。

### 提供自定义相机元素

你可以注册自己的 `pwa-camera-modal` 自定义元素，而不是使用 `@ionic/pwa-elements`。插件通过以下接口与其交互：

| 成员 | 类型 | 描述 |
|---|---|---|
| `facingMode` | `string` 属性 | 在呈现之前设置为 `'user'`（前置摄像头）或 `'environment'`（后置摄像头） |
| `componentOnReady()` | 方法 → `Promise<void>` | 插件创建元素后调用；当元素就绪时 resolve |
| `present()` | 方法 | 插件调用以显示相机界面 |
| `dismiss()` | 方法 | 插件在拍照或取消后调用以关闭相机界面 |
| `onPhoto` | 事件 | 当用户拍照或取消时触发。`event.detail` 必须是 `Blob`（已拍照）、`null`（用户取消）或 `Error`（出错） |

```typescript
class MyCameraModal extends HTMLElement {
  facingMode = 'environment';

  componentOnReady() {
    return Promise.resolve();
  }

  present() {
    // Show your custom camera UI, then dispatch exactly one 'onPhoto' event when done:
    //   - Blob: user took a photo
    //   - null: user cancelled
    //   - Error: something went wrong
    // Example:
    this.dispatchEvent(new CustomEvent('onPhoto', { detail: photoBlob }));
  }

  dismiss() {
    // Hide your custom camera UI (called by the plugin after receiving 'onPhoto')
  }
}

customElements.define('pwa-camera-modal', MyCameraModal);
```

## 示例

### 拍照

```typescript
import { Camera } from '@capacitor/camera';

const takePicture = async () => {
  try {
    const result = await Camera.takePhoto({
      quality: 90,
      includeMetadata: true,
    });

    // result.webPath 可以直接设置为 image 元素的 src
    imageElement.src = result.webPath;

    // 原生平台：将 result.uri 传递给 Filesystem API 以获取完整分辨率的 base64 数据，
    // 或使用 result.thumbnail 获取较低分辨率的 base64 预览。
    // Web 平台：result.thumbnail 包含完整图片的 base64 编码。

    console.log('Format:', result.metadata?.format);
    console.log('Resolution:', result.metadata?.resolution);
  } catch (e) {
    const error = e as any;
    // error.code 包含结构化的错误代码（例如 'OS-PLUG-CAMR-0003'）
    // 当错误由原生层抛出时。有关所有代码，请参阅“错误”部分。
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('takePhoto failed:', message);
  }
};
```### 从相册中选择

```typescript
import { Camera, MediaTypeSelection } from '@capacitor/camera';

const pickMedia = async () => {
  try {
    const { results } = await Camera.chooseFromGallery({
      mediaType: MediaTypeSelection.All, // 照片、视频或两者都选
      allowMultipleSelection: true,
      limit: 5,
      includeMetadata: true,
    });

    for (const item of results) {
      console.log('Type:', item.type);       // MediaType.Photo 或 MediaType.Video
      console.log('webPath:', item.webPath);
      console.log('Format:', item.metadata?.format);
      console.log('Size:', item.metadata?.size);
    }
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('chooseFromGallery failed:', message);
  }
};
```

### 录制并播放视频

```typescript
import { Camera } from '@capacitor/camera';

const recordAndPlay = async () => {
  let videoUri: string | undefined;

  try {
    const result = await Camera.recordVideo({
      saveToGallery: false,
      isPersistent: true, // 让文件在应用多次启动后依然可用
      includeMetadata: true,
    });

    videoUri = result.uri;
    console.log('Duration:', result.metadata?.duration);
    console.log('Saved to gallery:', result.saved);
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('recordVideo failed:', message);
    return;
  }

  if (videoUri) {
    try {
      await Camera.playVideo({ uri: videoUri });
    } catch (e) {
      const error = e as any;
      const message = error.code ? `[${error.code}] ${error.message}` : error.message;
      console.error('playVideo failed:', message);
    }
  }
};
```

### 编辑来自 base64 字符串的照片

`editPhoto` 从 base64 编码的图片打开应用内编辑器，并在 `outputImage` 中返回编辑后的图片（也是 base64 字符串）。

```typescript
import { Camera } from '@capacitor/camera';

const editFromBase64 = async (base64Image: string) => {
  try {
    const { outputImage } = await Camera.editPhoto({
      inputImage: base64Image, // 纯 base64，不含 data URL 前缀
    });

    // outputImage 是编辑后的图片，base64 编码
    imageElement.src = `data:image/jpeg;base64,${outputImage}`;
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('editPhoto failed:', message);
  }
};
```

### 编辑来自 URI 的照片

`editURIPhoto` 从文件 URI（例如从 `takePhoto` 或 Filesystem API 获取）打开应用内编辑器，并返回 `MediaResult`。

```typescript
import { Camera } from '@capacitor/camera';

const editFromURI = async (uri: string) => {
  try {
    const result = await Camera.editURIPhoto({
      uri,
      saveToGallery: false,
      includeMetadata: true,
    });

    // result.webPath 可以直接用作图片的 src
    imageElement.src = result.webPath;

    console.log('Format:', result.metadata?.format);
    console.log('Size:', result.metadata?.size);
    console.log('Saved to gallery:', result.saved);
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('editURIPhoto failed:', message);
  }
};
```

## 迁移到新版 API

版本 8.1.0 引入了新的改进 API，并弃用了 `getPhoto` 和 `pickImages`。

### 替换 `getPhoto`

`getPhoto` 通过 `CameraSource` 处理三种来源：`Camera`、`Photos` 和 `Prompt`。`Camera` 和 `Photos` 现在映射到不同的方法，而 `Prompt` 已被移除。

#### `CameraSource.Camera` 改为 `takePhoto`

新版 API 不支持 `CameraResultType.Base64` 和 `CameraResultType.DataUrl`。替代方案请参阅[结果类型的变化](#result-type-changes)。

```typescript
// 之前
const photo = await Camera.getPhoto({
  source: CameraSource.Camera,
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Uri,
  direction: CameraDirection.Rear,
  width: 1280,
  height: 720,
});
const imageUrl = photo.webPath;

// 之后
const result = await Camera.takePhoto({
  quality: 90,
  editable: 'in-app',        // 替代 allowEditing: true
  cameraDirection: CameraDirection.Rear, // 替代 direction
  targetWidth: 1280,         // 替代 width (1)
  targetHeight: 720,         // 替代 height (1)
});
const imageUrl = result.webPath;
```

**(1)** `width`/`height` 各自独立工作，设置一个最大尺寸的同时保持宽高比。`targetWidth`/`targetHeight` 必须同时使用——只设置其中一个无效。

#### `CameraSource.Photos` 改为 `chooseFromGallery`

```typescript
// 之前
const photo = await Camera.getPhoto({
  source: CameraSource.Photos,
  quality: 90,
  resultType: CameraResultType.Uri,
});
const imageUrl = photo.webPath;

// 之后
const { results } = await Camera.chooseFromGallery({
  quality: 90,
});
const imageUrl = results[0].webPath;
```

#### `CameraSource.Prompt`（或默认情况）

`getPhoto` 之前会显示一个原生提示框，让用户在相机和相册之间选择。这个提示框不再是插件的一部分。你应该使用自己的 UI 来构建选择提示（例如使用 `@capacitor/action-sheet`），然后根据用户的选择调用 `takePhoto` 或 `chooseFromGallery`。

```typescript
// 之前
const photo = await Camera.getPhoto({
  // source 默认为 CameraSource.Prompt
  quality: 90,
  resultType: CameraResultType.Uri,
});

// 之后：用你自己的 UI 确定来源，然后调用对应的方法
const result = await Camera.takePhoto({ quality: 90 });
// 或者
const { results } = await Camera.chooseFromGallery({ quality: 90 });
```

#### 结果类型的变化

`getPhoto` 返回一个 `Photo` 对象，其中可用的字段取决于 `resultType`。新版 API 完全移除了 `resultType`——无论照片如何拍摄，`MediaResult` 都有一组固定的字段。

| `Photo` 字段 | `MediaResult` 对应项 |
|---|---|
| `path` | `uri` |
| `webPath` | `webPath` |
| `base64String` | `thumbnail`（在 Web 上，包含完整的 base64 编码图片；在原生端，包含缩略图） |
| `dataUrl` | 无直接对应项——参见下方说明 |
| `saved` | `saved` |
| `format` | `metadata.format`（需要 `includeMetadata: true`） |
| `exif` | `metadata.exif`（需要 `includeMetadata: true`） |

**构建 data URL** —— 根据你的需求有两种方式可选：

在所有平台上，你可以结合 `thumbnail` 和 `metadata.format`（需要 `includeMetadata: true`）。在原生端，`thumbnail` 是较低分辨率的：

```typescript
const dataUrl = `data:image/${result.metadata.format};base64,${result.thumbnail}`;
```

在原生端，如果你需要完整分辨率的 base64，可以通过 Filesystem API 读取 `uri`，并从中构建 data URL：

```typescript
import { Filesystem } from '@capacitor/filesystem';

const { data } = await Filesystem.readFile({ path: result.uri });
const dataUrl = `data:image/${result.metadata.format};base64,${data}`;
```### 替换 `pickImages` → `chooseFromGallery`

`pickImages` 允许从相册中选择多张照片。向 `chooseFromGallery` 传入 `allowMultipleSelection: true` 即可获得相同行为。

```typescript
// 之前
const { photos } = await Camera.pickImages({
  quality: 90,
  limit: 5,
  width: 1280,
  height: 720,
});
for (const photo of photos) {
  console.log(photo.webPath);
}

// 之后
const { results } = await Camera.chooseFromGallery({
  allowMultipleSelection: true,
  quality: 90,
  limit: 5,
  targetWidth: 1280,  // 替换 width (1)
  targetHeight: 720,  // 替换 height (1)
});
for (const result of results) {
  console.log(result.webPath);
}
```

**(1)** `width`/`height` 各自独立工作，设置的是最大尺寸并保持宽高比。`targetWidth`/`targetHeight` 必须同时使用——仅设置一个无效。

`chooseFromGallery` 也可以通过设置 `mediaType` 为 `MediaTypeSelection.Video` 或 `MediaTypeSelection.All` 来选择视频或混合媒体。

### 选项重命名对照表

| 旧选项 | 新选项 | 适用范围 |
|---|---|---|
| `width` | `targetWidth` (1) | `takePhoto`, `chooseFromGallery` |
| `height` | `targetHeight` (1) | `takePhoto`, `chooseFromGallery` |
| `direction` | `cameraDirection` | `takePhoto` |
| `allowEditing` | `editable: 'in-app'` | `takePhoto`, `chooseFromGallery` |
| `resultType` | — (已移除，见[结果类型变更](#result-type-changes)) | — |
| `source` | — (已移除，请使用独立方法) | — |
| `promptLabel*` | — (已移除，请自行构建 UI) | — |

**(1)** `width`/`height` 各自独立工作，设置的是最大尺寸并保持宽高比。`targetWidth`/`targetHeight` 必须同时使用——仅设置一个无效。

## API

<docgen-index>

* [`takePhoto(...)`](#takephoto)
* [`recordVideo(...)`](#recordvideo)
* [`playVideo(...)`](#playvideo)
* [`chooseFromGallery(...)`](#choosefromgallery)
* [`editPhoto(...)`](#editphoto)
* [`editURIPhoto(...)`](#edituriphoto)
* [`pickLimitedLibraryPhotos()`](#picklimitedlibraryphotos)
* [`getLimitedLibraryPhotos()`](#getlimitedlibraryphotos)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

有关现有错误代码的列表，请参阅[错误](#errors)。

<docgen-api>
<!--更新源文件 JSDoc 注释后重新运行 docgen 以更新以下文档-->

### takePhoto(...)

```typescript
takePhoto(options: TakePhotoOptions) => Promise<MediaResult>
```

打开设备的相机，允许用户拍照。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#takephotooptions">TakePhotoOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**自版本：** 8.1.0

--------------------


### recordVideo(...)

```typescript
recordVideo(options: RecordVideoOptions) => Promise<MediaResult>
```

打开设备的相机，允许用户录制视频。
Web 平台不可用。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#recordvideooptions">RecordVideoOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**自版本：** 8.1.0

--------------------


### playVideo(...)

```typescript
playVideo(options: PlayVideoOptions) => Promise<void>
```

打开原生视频播放器。
Web 平台不可用。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#playvideooptions">PlayVideoOptions</a></code> |

**自版本：** 8.1.0

--------------------


### chooseFromGallery(...)

```typescript
chooseFromGallery(options: ChooseFromGalleryOptions) => Promise<MediaResults>
```

允许用户直接从相册中选择图片、视频或两者同时。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#choosefromgalleryoptions">ChooseFromGalleryOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#mediaresults">MediaResults</a>&gt;</code>

**自版本：** 8.1.0

--------------------


### editPhoto(...)

```typescript
editPhoto(options: EditPhotoOptions) => Promise<EditPhotoResult>
```

打开应用内编辑界面，使用提供的 base64 字符串编辑图片。
Web 平台不可用。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#editphotooptions">EditPhotoOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#editphotoresult">EditPhotoResult</a>&gt;</code>

**自版本：** 8.1.0

--------------------


### editURIPhoto(...)

```typescript
editURIPhoto(options: EditURIPhotoOptions) => Promise<MediaResult>
```

打开应用内编辑界面，使用提供的 URI 编辑图片。
Web 平台不可用。

| 参数 | 类型 |
| --- | --- |
| **`options`** | <code><a href="#edituriphotooptions">EditURIPhotoOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**自版本：** 8.1.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

允许用户更新其受限的相册选择。
返回选择器关闭后的所有受限照片。
如果用户改为授予相册完整访问权限，则返回空数组。

**返回：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本：** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

返回从受限相册库中选择的照片数组。

**返回：** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**自版本：** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查相机和相册权限

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求相机和相册权限

| 参数             | 类型                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**支持版本:** 1.0.0

--------------------


### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

提示用户从相册中选择一张照片，或使用相机拍摄新照片。

| 参数         | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**支持版本:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

允许用户从相册中选择多张图片。

| 参数         | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**支持版本:** 1.2.0

--------------------


### 接口


#### MediaResult

| 属性            | 类型                                                    | 描述                                                                                                                                                                                                                                                                                                                | 支持版本 |
| --------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`type`**      | <code><a href="#mediatype">MediaType</a></code>         | 媒体结果的类型。可以是 <a href="#photo">`Photo`</a> 或 `Video`。                                                                                                                                                                                                                                                  | 8.1.0 |
| **`uri`**       | <code>string</code>                                     | 指向媒体文件的 URI。在 Web 平台上不可用，请改用 `webPath`。                                                                                                                                                                                                                                   | 8.1.0 |
| **`thumbnail`** | <code>string</code>                                     | 返回媒体文件的缩略图（Base64 编码）。在 Web 平台上，对于 <a href="#mediatype">`MediaType.Photo`</a> 类型，此处返回完整图片（同样是 Base64 编码）；对于 <a href="#mediatype">`MediaType.Video`</a> 类型，返回从视频中捕获的一帧全分辨率 JPEG 图像，Base64 编码，质量 80%。 | 8.1.0 |
| **`saved`**     | <code>boolean</code>                                    | 媒体文件是否成功保存到相册。仅当输入选项中 `saveToGallery` 设为 `true` 时有效，否则始终返回 `false`。在 Web 平台上不可用。                                                                                                                                                                          | 8.1.0 |
| **`webPath`**   | <code>string</code>                                     | webPath 返回一个路径，可用于设置媒体元素的 `src` 属性，以实现高效的加载和渲染。                                                                                                                                                                                                      | 8.1.0 |
| **`metadata`**  | <code><a href="#mediametadata">MediaMetadata</a></code> | 与媒体结果关联的元数据。仅当输入选项中 `includeMetadata` 设为 `true` 时才会包含。                                                                                                                                                                                                            | 8.1.0 |#### MediaMetadata

| 属性               | 类型                  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                     | 引入版本 |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`size`**         | <code>number</code> | 媒体文件大小，单位为字节。                                                                                                                                                                                                                                                                                                                                                                                               | 8.1.0 |
| **`duration`**     | <code>number</code> | 仅适用于 <a href="#mediatype">`MediaType.Video`</a> - 媒体的持续时间，单位为秒。                                                                                                                                                                                                                                                                                                          | 8.1.0 |
| **`format`**       | <code>string</code> | 图片格式，例如：jpeg、png、mp4。Android 和 iOS 可能返回 'jpg' 而非 'jpeg'，两者格式相同只是名称不同。判断返回媒体是否为 JPEG 格式时，请同时比对 'jpeg' 和 'jpg'。Web 端支持 jpeg、png 和 gif，但具体支持情况因浏览器而异。Web 端仅当使用 `chooseFromGallery` 时支持 gif。 | 8.1.0 |
| **`resolution`**   | <code>string</code> | 媒体的分辨率，格式为 `&lt;宽度&gt;x&lt;高度&gt;`，例如：'1920x1080'。                                                                                                                                                                                                                                                                                                                                                     | 8.1.0 |
| **`creationDate`** | <code>string</code> | 媒体创建日期和时间，采用 ISO 8601 格式。如果创建日期不可用（例如 Android 7 及更低版本），则返回最后修改日期。Web 端始终返回最后修改日期。                                                                                                                                                                                                                                                                               | 8.1.0 |
| **`exif`**         | <code>string</code> | 从媒体项中提取的 Exif 数据（如果有）。仅适用于 <a href="#mediatype">`MediaType.Photo`</a>。Web 端不可用。                                                                                                                                                                                                                                                                                                                   | 8.1.0 |#### TakePhotoOptions 选项

| 属性                      | 类型                                                          | 描述                                                                                                                                                                                                                                                                                                                                                                       | 默认值                               | 起始版本 |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | -------- |
| **`quality`**             | <code>number</code>                                           | 返回图像的质量，取值范围 0-100。仅适用于 <a href="#encodingtype">`EncodingType.JPEG`</a>。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                   | <code>100</code>                     | 8.1.0    |
| **`targetWidth`**         | <code>number</code>                                           | 照片的目标宽度。必须为正数，且需与 `targetHeight` 配合使用。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                  |                                      | 8.1.0    |
| **`targetHeight`**        | <code>number</code>                                           | 照片的目标高度。必须为正数，且需与 `targetWidth` 配合使用。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                   |                                      | 8.1.0    |
| **`correctOrientation`**  | <code>boolean</code>                                          | 是否自动将图像“正向”旋转，以纠正竖屏模式下的方向。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                            | <code>true</code>                    | 8.1.0    |
| **`encodingType`**        | <code><a href="#encodingtype">EncodingType</a></code>         | 所拍摄照片的编码类型——JPEG 或 PNG。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                                            | <code>EncodingType.JPEG</code>       | 8.1.0    |
| **`saveToGallery`**       | <code>boolean</code>                                          | 是否将照片保存到相册。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                                                         | <code>false</code>                   | 8.1.0    |
| **`cameraDirection`**     | <code><a href="#cameradirection">CameraDirection</a></code>   | 仅 iOS 和 Web：摄像头的方向。                                                                                                                                                                                                                                                                                                                                            | <code>CameraDirection.Rear</code>    | 8.1.0    |
| **`editable`**            | <code>'in-app' \| 'external' \| 'no'</code>                   | 决定用户是否可以对照片进行编辑，以及如何编辑。<br>- `'in-app'`：使用应用内编辑器进行照片编辑。<br>- `'external'`：打开一个独立的（平台特定的）原生应用来处理照片编辑，如果没有可用的原生应用，则回退到应用内编辑器。注意：iOS 不支持外部编辑，将改用 `'in-app'`。<br>- `'no'`：不允许编辑。Web 平台不可用。                                                              | <code>'no'</code>                    | 8.1.0    |
| **`presentationStyle`**   | <code>'fullscreen' \| 'popover'</code>                        | 仅 iOS：摄像头的呈现样式。                                                                                                                                                                                                                                                                                                                                               | <code>'fullscreen'</code>            | 8.1.0    |
| **`webUseInput`**         | <code>boolean</code>                                          | 仅 Web：是否使用 PWA 元素体验或文件输入。默认行为是：如果已安装 PWA 元素则使用，否则回退到文件输入。若要始终使用文件输入，请将此选项设为 `true`。了解更多关于 PWA 元素的信息：https://capacitorjs.com/docs/web/pwa-elements                                                                                                                                           |                                      | 8.1.0    |
| **`includeMetadata`**     | <code>boolean</code>                                          | <a href="#mediaresult">MediaResult</a> 是否应包含其元数据。如果在获取元数据时发生错误，将返回空值。                                                                                                                                                                                                                                                                      | <code>false</code>                   | 8.1.0    |#### RecordVideoOptions

| Prop                  | Type                 | Description                                                                                                                                                                                                                                            | Default            | Since |
| --------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| **`saveToGallery`**   | <code>boolean</code> | 是否将视频保存到相册。                                                                                                                                                                                                                                 | <code>false</code> | 8.1.0 |
| **`includeMetadata`** | <code>boolean</code> | 是否在 <a href="#mediaresult">MediaResult</a> 中包含其元数据。若获取元数据时发生错误，将返回空值。                                                                                                                                                    | <code>false</code> | 8.1.0 |
| **`isPersistent`**    | <code>boolean</code> | 是否将视频存储于应用的持久化存储区，还是临时缓存。如果你打算在应用多次启动间使用返回的 `MediaResult#URI`，建议设置为 true；否则可设为 false。                                                                                                            | <code>true</code>  | 8.1.0 |

#### PlayVideoOptions

| Prop      | Type                | Description                                                                                                                                            | Since |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`uri`** | <code>string</code> | 要播放的视频 URI。你可以直接使用 `recordVideo` 或 `chooseFromGallery` 返回的 `MediaResult#URI`。                                                         | 8.1.0 |

#### MediaResults

| Prop          | Type                       | Description                | Since |
| ------------- | -------------------------- | -------------------------- | ----- |
| **`results`** | <code>MediaResult[]</code> | 媒体结果列表。             | 8.1.0 |#### 从画廊选择选项| 属性                           | 类型                                                                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 默认值                                  | 支持版本 |
| ------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| **`mediaType`**                | <code><a href="#mediatypeselection">MediaTypeSelection</a></code>    | 要选择的媒体类型，可以是图片、视频或两者兼有。                                                                                                                                                                                                                                                                                                                                                                                                                                                | <code>MediaTypeSelection.Photo</code>   | 8.1.0    |
| **`allowMultipleSelection`**   | <code>boolean</code>                                                | 是否允许从图库中选择多个媒体文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>false</code>                      | 8.1.0    |
| **`limit`**                    | <code>number</code>                                                 | 用户最多可选择的媒体文件数量。仅在 `allowMultipleSelection` 为 `true` 时生效。任何非正数均视为无限制。注意：此选项仅在 Android 13 及以上版本和 iOS 上受支持。                                                                                                                                                                                                                                                                                                                    | <code>0</code>                          | 8.1.0    |
| **`includeMetadata`**          | <code>boolean</code>                                                | 是否在 <a href="#mediaresult">MediaResult</a> 中包含其元数据。若获取元数据时发生错误，将返回空值。                                                                                                                                                                                                                                                                                                                                                                            | <code>false</code>                      | 8.1.0    |
| **`editable`**                 | <code>'in-app' \| 'external' \| 'no'</code>                         | 决定用户是否可以编辑照片以及编辑方式。<br/>- `'in-app'`：使用应用内编辑器进行编辑。<br/>- `'external'`：打开一个独立的（平台特定）原生应用来处理照片编辑，如果不可用则回退到应用内编辑器。注意：iOS 不支持外部编辑，会使用 `'in-app'` 代替。<br/>- `'no'`：不允许编辑。<br/>仅适用于 <a href="#mediatypeselection">`MediaTypeSelection.Photo`</a> 且 `allowMultipleSelection` 为 `false` 时。Web 端不可用。 | <code>'no'</code>                       | 8.1.0    |
| **`presentationStyle`**        | <code>'fullscreen' \| 'popover'</code>                              | 仅 iOS：媒体选择器的展示样式。                                                                                                                                                                                                                                                                                                                                                                                                                                              | <code>'fullscreen'</code>               | 8.1.0    |
| **`quality`**                  | <code>number</code>                                                 | 返回图片的质量，范围 0-100。仅适用于 <a href="#mediatype">`MediaType.Photo`</a> 和 JPEG 格式。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                                                                         | <code>100</code>                        | 8.1.0    |
| **`targetWidth`**              | <code>number</code>                                                 | 要应用的图片目标宽度。必须为正数，需与 `targetHeight` 配合使用。选择视频时不适用。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                                                                                              |                                         | 1.0.0    |
| **`targetHeight`**             | <code>number</code>                                                 | 要应用的图片目标高度。必须为正数，需与 `targetWidth` 配合使用。选择视频时不适用。注意：此选项仅在 Android 和 iOS 上受支持。                                                                                                                                                                                                                                                                                                                                              |                                         | 8.1.0    || **`correctOrientation`**     | <code>boolean</code>                                              | 是否自动将图像旋转到“向上”以修正竖屏模式下的方向。当选择视频时不适用。注意：此选项仅在 Android 和 iOS 上支持。                                                                                                                                                                                                                                                                                                                     | <code>true</code>                     | 8.1.0 |
| **`webUseInput`**            | <code>boolean</code>                                              | 仅限 Web：是否使用 PWA Element 体验或文件输入。默认情况下，如果已安装 PWA Elements 则使用它，否则回退到文件输入。要始终使用文件输入，请将此选项设为 `true`。了解更多关于 PWA Elements 的信息：https://capacitorjs.com/docs/web/pwa-elements                                                                                                                                                                                                                                      |                                       | 8.1.0 |#### EditPhotoResult

| Prop              | Type                | Description                  | Since |
| ----------------- | ------------------- | ---------------------------- | ----- |
| **`outputImage`** | <code>string</code> | 编辑后的图像，base64 编码。 | 8.1.0 |

#### EditPhotoOptions

| Prop             | Type                | Description                   | Since |
| ---------------- | ------------------- | ----------------------------- | ----- |
| **`inputImage`** | <code>string</code> | 待编辑图像的 base64 编码字符串。 | 8.1.0 |

#### EditURIPhotoOptions

| Prop                  | Type                 | Description                                                                                                                             | Default            | Since |
| --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`uri`**             | <code>string</code>  | 包含待编辑照片的 URI。                                                                                                                  |                    | 8.1.0 |
| **`saveToGallery`**   | <code>boolean</code> | 是否将编辑后的照片保存到相册。                                                                                                          | <code>false</code> | 8.1.0 |
| **`includeMetadata`** | <code>boolean</code> | <a href="#mediaresult">MediaResult</a> 是否包含其元数据。获取元数据时若出错，将返回空值。                                                | <code>false</code> | 8.1.0 |

#### GalleryPhotos

| Prop         | Type                        | Description                | Since |
| ------------ | --------------------------- | -------------------------- | ----- |
| **`photos`** | <code>GalleryPhoto[]</code> | 所有已选取照片的数组。 | 1.2.0 |

#### GalleryPhoto

| Prop          | Type                | Description                                                                                           | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | <code>string</code> | 完整的、平台特定的文件 URL，后续可使用 Filesystem API 读取。                                           | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath 返回一个可用于设置图像 `src` 属性的路径，以实现高效的加载与渲染。                             | 1.2.0 |
| **`exif`**    | <code>any</code>    | 从图像中提取的 Exif 数据（如果有）。                                                                  | 1.2.0 |
| **`format`**  | <code>string</code> | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 端支持 jpeg、png 和 gif。           | 1.2.0 |

#### PermissionStatus

| Prop         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |

#### CameraPluginPermissions

| Prop              | Type                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |

#### Photo

| Prop               | Type                 | Description                                                                                                                                                                                                                                                   | Since |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`base64String`** | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Base64</a>，则为图像的 base64 编码字符串。                                                                                                                                                             | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.DataUrl</a>，则为以 `data:image/jpeg;base64,` 开头的 URL 及对应的 base64 编码字符串。在 Web 端，文件格式可能因浏览器而异。                                                                            | 1.0.0 |
| **`path`**         | <code>string</code>  | 如果使用 <a href="#cameraresulttype">CameraResultType.Uri</a>，该路径将包含一个完整的、平台特定的文件 URL，后续可使用 Filesystem API 读取。                                                                                                                   | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath 返回一个可用于设置图像 `src` 属性的路径，以实现高效的加载与渲染。                                                                                                                                                                                     | 1.0.0 |
| **`exif`**         | <code>any</code>     | 从图像中提取的 Exif 数据（如果有）。                                                                                                                                                                                                                          | 1.0.0 |
| **`format`**       | <code>string</code>  | 图像的格式，例如：jpeg、png、gif。iOS 和 Android 仅支持 jpeg。Web 端支持 jpeg、png 和 gif，但确切可用性可能因浏览器而异。当 `webUseInput` 设为 `true` 或 `source` 设为 `Photos` 时，才支持 gif 格式。                                                          | 1.0.0 |
| **`saved`**        | <code>boolean</code> | 图像是否已保存到相册。在 Android 和 iOS 上，如果用户未授予所需权限，保存到相册可能会失败。Web 端没有相册概念，因此始终返回 `false`。                                                                                                                          | 1.1.0 |#### ImageOptions

| Prop                     | 类型                                                           | 描述                                                                                                                                                                                                                                                                           | 默认值                            | 版本   |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                            | 返回 JPEG 图像的画质，取值范围 0-100。注意：此选项仅支持 Android 和 iOS。                                                                                                                                                                                                       |                                   | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                           | 是否允许用户裁剪或进行微小编辑（平台相关）。注意：此选项仅支持 Android 和 iOS。在 iOS 上，仅支持 <a href="#camerasource">CameraSource.Camera</a>，不支持 <a href="#camerasource">CameraSource.Photos</a>。                                                                       |                                   | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code>  | 数据的返回格式。目前仅支持 `'Base64'`、`'DataUrl'` 或 `'Uri'`。                                                                                                                                                                                                                |                                   | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                           | 是否将照片保存到相册。如果照片是从相册选取的，则仅在编辑后才会保存。注意：此选项仅支持 Android 和 iOS。                                                                                                                                                                       | <code>false</code>                | 1.0.0 |
| **`width`**              | <code>number</code>                                            | 保存图像的最大宽度（按比例缩放）。注意：此选项仅支持 Android 和 iOS。                                                                                                                                                                                                          |                                   | 1.0.0 |
| **`height`**             | <code>number</code>                                            | 保存图像的最大高度（按比例缩放）。注意：此选项仅支持 Android 和 iOS。                                                                                                                                                                                                          |                                   | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                           | 是否自动旋转图像，以修正竖屏模式下的方向。注意：此选项仅支持 Android 和 iOS。                                                                                                                                                                                                  | <code>true</code>                 | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>          | 获取照片的来源。默认情况下会提示用户选择从相册选取或拍照。                                                                                                                                                                                                                    | <code>CameraSource.Prompt</code>  | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>    | 仅 iOS 和 Web：摄像头方向。                                                                                                                                                                                                                                                    | <code>CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                         | 仅 iOS：摄像头的呈现样式。                                                                                                                                                                                                                                                      | <code>'fullscreen'</code>         | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                           | 仅 Web：是否使用 PWA Element 方案或文件输入框。默认情况下，如果已安装 PWA Elements 则使用它，否则回退到文件输入框。若要始终使用文件输入框，请设为 `true`。了解更多关于 PWA Elements：https://capacitorjs.com/docs/web/pwa-elements                                            |                                   | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                            | 显示提示框时使用的文本。                                                                                                                                                                                                                                                        | <code>'Photo'</code>              | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                            | 显示提示框时使用的文本。仅 iOS：取消按钮的标签。                                                                                                                                                                                                                               | <code>'Cancel'</code>             | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                            | 显示提示框时使用的文本。选择已保存图片的按钮标签。                                                                                                                                                                                                                             | <code>'From Photos'</code>        | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                            | 显示提示框时使用的文本。打开相机的按钮标签。                                                                                                                                                                                                                                   | <code>'Take Picture'</code>       | 1.0.0 |#### GalleryImageOptions

| 属性                          | 类型                                   | 描述                                                                                           | 默认值                     | 起始版本 |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------- | -------- |
| **`quality`**                 | <code>number</code>                    | 要返回的 JPEG 图像质量，范围为 0-100。注意：此选项仅在 Android 和 iOS 上支持。                 |                            | 1.2.0    |
| **`width`**                   | <code>number</code>                    | 保存图像所需的最大宽度。会保持宽高比。                                                         |                            | 1.2.0    |
| **`height`**                  | <code>number</code>                    | 保存图像所需的最大高度。会保持宽高比。                                                         |                            | 1.2.0    |
| **`correctOrientation`**      | <code>boolean</code>                   | 是否自动将图像“正向”旋转，以修正竖屏模式下的方向                                                 | <code>true</code>          | 1.2.0    |
| **`presentationStyle`**       | <code>'fullscreen' \| 'popover'</code> | 仅 iOS：相机的呈现样式。                                                                       | <code>'fullscreen'</code>  | 1.2.0    |
| **`limit`**                   | <code>number</code>                    | 用户最多可以选择的图片数量。注意：此选项仅在 Android 13+ 和 iOS 上支持。                        | <code>0（无限制）</code>   | 1.2.0    |


### 类型别名


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### 枚举


#### MediaType

| 成员          | 值              |
| ------------- | --------------- |
| **`Photo`**   | <code>0</code>  |
| **`Video`**   | <code>1</code>  |


#### EncodingType

| 成员        | 值              |
| ----------- | --------------- |
| **`JPEG`**  | <code>0</code>  |
| **`PNG`**   | <code>1</code>  |


#### CameraDirection

| 成员          | 值                   |
| ------------- | -------------------- |
| **`Rear`**    | <code>'REAR'</code>  |
| **`Front`**   | <code>'FRONT'</code> |


#### MediaTypeSelection

| 成员          | 值              |
| ------------- | --------------- |
| **`Photo`**   | <code>0</code>  |
| **`Video`**   | <code>1</code>  |
| **`All`**     | <code>2</code>  |


#### CameraResultType

| 成员              | 值                     |
| ----------------- | ---------------------- |
| **`Uri`**         | <code>'uri'</code>     |
| **`Base64`**      | <code>'base64'</code>  |
| **`DataUrl`**     | <code>'dataUrl'</code> |


#### CameraSource

| 成员            | 值                     | 描述                                  |
| --------------- | ---------------------- | ------------------------------------- |
| **`Prompt`**    | <code>'PROMPT'</code>  | 提示用户选择相册或拍照。              |
| **`Camera`**    | <code>'CAMERA'</code>  | 使用相机拍摄新照片。                  |
| **`Photos`**    | <code>'PHOTOS'</code>  | 从图库或相册中选择已有照片。          |


### 错误

该插件在 Android 和 iOS 平台上返回结构化的错误信息。每个错误都包含一个错误码（例如 `OS-PLUG-CAMR-0003`）和一段人类可读的描述信息 `message`。请注意，这些错误仅在原生平台使用 8.1.0 版本引入的新 API 时可用：`takePhoto`、`chooseFromGallery`、`editPhoto`、`editURIPhoto`、`recordVideo` 和 `playVideo`。

| 错误码                  | 适用平台         | 描述                                          |
| ----------------------- | ---------------- | --------------------------------------------- |
| OS-PLUG-CAMR-0003       | Android, iOS     | 无法访问相机。请检查相机权限后重试。          |
| OS-PLUG-CAMR-0005       | Android, iOS     | 因未授予权限，无法访问相册。                  |
| OS-PLUG-CAMR-0006       | Android, iOS     | 拍照过程被取消。                              |
| OS-PLUG-CAMR-0007       | Android, iOS     | 没有可用的相机。                              |
| OS-PLUG-CAMR-0008       | iOS              | 所选文件包含无效数据。                        |
| OS-PLUG-CAMR-0009       | Android, iOS     | 无法编辑图片。                                |
| OS-PLUG-CAMR-0010       | Android, iOS     | 无法拍照。                                    |
| OS-PLUG-CAMR-0011       | iOS              | 无法从相册获取图片。                          |
| OS-PLUG-CAMR-0012       | Android, iOS     | 无法处理图片。                                |
| OS-PLUG-CAMR-0013       | Android, iOS     | 编辑照片过程被取消。                          |
| OS-PLUG-CAMR-0014       | iOS              | 无法解析“拍照”动作的参数。                    |
| OS-PLUG-CAMR-0016       | Android, iOS     | 无法录制视频。                                |
| OS-PLUG-CAMR-0017       | Android, iOS     | 录制视频过程被取消。                          |
| OS-PLUG-CAMR-0018       | Android, iOS     | 无法从图库选择媒体。                          |
| OS-PLUG-CAMR-0019       | iOS              | 无法对媒体结果进行编码。                      |
| OS-PLUG-CAMR-0020       | Android, iOS     | 从图库选择媒体的过程被取消。                  |
| OS-PLUG-CAMR-0021       | Android          | 无法获取媒体文件路径。                        |
| OS-PLUG-CAMR-0023       | Android, iOS     | 无法播放视频。                                |
| OS-PLUG-CAMR-0024       | Android          | URI 参数不能为空。                           |
| OS-PLUG-CAMR-0025       | iOS              | 无法从图库获取视频。                          |
| OS-PLUG-CAMR-0026       | iOS              | 插件内部存在问题。                            |
| OS-PLUG-CAMR-0027       | Android, iOS     | 所选文件不存在。                              |
| OS-PLUG-CAMR-0028       | Android, iOS     | 无法从 URI 中获取图片。                      |
| OS-PLUG-CAMR-0031       | Android          | 提供给插件方法的参数无效。                    |
| OS-PLUG-CAMR-0033       | Android          | 无法获取上下文。                              |