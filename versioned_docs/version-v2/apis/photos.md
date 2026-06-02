---
title: Photos
description: Photos API
contributors:
  - mlynch
  - jcesarmobile
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

Photos API 提供了从用户照片库加载照片和相册以及保存照片的方法。

## API

### getPhotos(...)

```typescript
getPhotos(options?: PhotosFetchOptions) => Promise<PhotosResult>
```

从用户照片库获取照片

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#photosfetchoptions">PhotosFetchOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#photosresult">PhotosResult</a>&gt;</code>

---

### getAlbums(...)

```typescript
getAlbums(options?: PhotosAlbumsFetchOptions) => Promise<PhotosAlbumsResult>
```

从用户照片库获取相册

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photosalbumsfetchoptions">PhotosAlbumsFetchOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#photosalbumsresult">PhotosAlbumsResult</a>&gt;</code>

---

### savePhoto(...)

```typescript
savePhoto(options?: PhotosSaveOptions) => Promise<PhotosSaveResult>
```

将照片保存到用户照片库

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#photossaveoptions">PhotosSaveOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#photossaveresult">PhotosSaveResult</a>&gt;</code>

---

### createAlbum(...)

```typescript
createAlbum(options: PhotosCreateAlbumOptions) => Promise<void>
```

在用户照片库中创建相册

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photoscreatealbumoptions">PhotosCreateAlbumOptions</a></code> |

---

### 接口

#### PhotosResult

| 属性 | 类型 | 描述 |
| ------------ | ------------------------- | -------------------------------------------- |
| **`photos`** | <code>PhotoAsset[]</code> | 从照片库返回的照片列表 |

#### PhotoAsset

| 属性 | 类型 | 描述 |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`identifier`**      | <code>string</code>                                     | 平台特定的标识符 |
| **`data`**            | <code>string</code>                                     | 照片资源的数据，以 base64 编码字符串形式提供（仅支持 JPEG） |
| **`creationDate`**    | <code>string</code>                                     | 资源创建日期的 ISO 日期字符串 |
| **`fullWidth`**       | <code>number</code>                                     | 原始资源的完整宽度 |
| **`fullHeight`**      | <code>number</code>                                     | 原始资源的完整高度 |
| **`thumbnailWidth`**  | <code>number</code>                                     | 缩略图预览的宽度 |
| **`thumbnailHeight`** | <code>number</code>                                     | 缩略图预览的高度 |
| **`location`**        | <code><a href="#photolocation">PhotoLocation</a></code> | 资源的位置元数据 |

#### PhotoLocation

| 属性 | 类型 | 描述 |
| --------------- | ------------------- | ---------------------------------------- |
| **`latitude`**  | <code>number</code> | 拍摄照片的 GPS 纬度 |
| **`longitude`** | <code>number</code> | 拍摄照片的 GPS 经度 |
| **`heading`**   | <code>number</code> | 拍摄照片时用户的方向 |
| **`altitude`**  | <code>number</code> | 拍摄照片时用户的海拔 |
| **`speed`**     | <code>number</code> | 拍摄照片时用户的速度 |

#### PhotosFetchOptions

| 属性 | 类型 | 描述 |
| ---------------------- | ------------------- | --------------------------------------------------------------------- |
| **`quantity`**         | <code>number</code> | 要获取的照片数量，按创建日期降序排列 |
| **`thumbnailWidth`**   | <code>number</code> | 要返回的缩略图宽度 |
| **`thumbnailHeight`**  | <code>number</code> | 要返回的缩略图高度 |
| **`thumbnailQuality`** | <code>number</code> | 要返回的缩略图质量，以 JPEG 格式（0-100） |
| **`types`**            | <code>string</code> | 要返回的资源类型（目前仅支持 "photos"） |
| **`albumIdentifier`**  | <code>string</code> | 要查询的相册标识符（使用 getAlbums() 获取标识符） |

#### PhotosAlbumsResult

| 属性 | 类型 | 描述 |
| ------------ | -------------------------- | ------------------------------------------ |
| **`albums`** | <code>PhotosAlbum[]</code> | 从查询返回的相册列表 |

#### PhotosAlbum

| 属性 | 类型 | 描述 |
| ---------------- | --------------------------------------------------------- | ----------------------------- |
| **`identifier`** | <code>string</code>                                         | 相册的本地标识符 |
| **`name`**       | <code>string</code>                                         | 相册名称 |
| **`count`**      | <code>number</code>                                         | 相册中的项目数 |
| **`type`**       | <code><a href="#photosalbumtype">PhotosAlbumType</a></code> | 相册类型 |

#### PhotosAlbumsFetchOptions

| 属性 | 类型 | 描述 |
| -------------- | -------------------- | ----------------------------------- |
| **`loadShared`** | <code>boolean</code> | 是否加载云端共享相册 |

#### PhotosSaveResult

| 属性 | 类型 | 描述 |
| ------------- | -------------------- | ----------------------------- |
| **`success`** | <code>boolean</code> | 照片是否已创建 |

#### PhotosSaveOptions

| 属性 | 类型 | 描述 |
| --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`data`**            | <code>string</code> | 照片的 base64 编码 JPEG 数据（注意：不要添加 HTML data-uri 类型前缀） |
| **`albumIdentifier`** | <code>string</code> | 可选的相册标识符，用于将照片保存到该相册 |

#### PhotosCreateAlbumOptions

| 属性 | 类型 |
| ---------- | ------------------- |
| **`name`** | <code>string</code> |

### 枚举

#### PhotosAlbumType

| 成员 | 值 | 描述 |
| ------------ | --------------------- | -------------------------------------------------------------- |
| **`Smart`**  | <code>"smart"</code>  | 相册是"智能"相册（如收藏或最近添加） |
| **`Shared`** | <code>"shared"</code> | 相册是云端共享相册 |
| **`User`**   | <code>"user"</code>   | 相册是用户创建的相册 |
