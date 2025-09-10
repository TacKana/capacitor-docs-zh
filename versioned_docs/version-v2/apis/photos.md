---
title: Photos
description: 相册 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

相册 API 提供了从用户照片库中加载照片和相册的方法，并支持保存照片。

## API

### getPhotos(...)

```typescript
getPhotos(options?: PhotosFetchOptions) => Promise<PhotosResult>
```

从用户的照片库中获取照片

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#photosfetchoptions">PhotosFetchOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photosresult">PhotosResult</a>&gt;</code>

---

### getAlbums(...)

```typescript
getAlbums(options?: PhotosAlbumsFetchOptions) => Promise<PhotosAlbumsResult>
```

从用户的照片库中获取相册

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photosalbumsfetchoptions">PhotosAlbumsFetchOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photosalbumsresult">PhotosAlbumsResult</a>&gt;</code>

---

### savePhoto(...)

```typescript
savePhoto(options?: PhotosSaveOptions) => Promise<PhotosSaveResult>
```

将照片保存到用户的照片库

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#photossaveoptions">PhotosSaveOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photossaveresult">PhotosSaveResult</a>&gt;</code>

---

### createAlbum(...)

```typescript
createAlbum(options: PhotosCreateAlbumOptions) => Promise<void>
```

在用户的照片库中创建相册

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photoscreatealbumoptions">PhotosCreateAlbumOptions</a></code> |

---

### 接口

#### PhotosResult

| 属性          | 类型                      | 描述                                   |
| ------------ | ------------------------- | -------------------------------------- |
| **`photos`** | <code>PhotoAsset[]</code> | 从照片库返回的照片列表                 |

#### PhotoAsset

| 属性                   | 类型                                                    | 描述                                                                 |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| **`identifier`**       | <code>string</code>                                     | 平台特定的标识符                                                    |
| **`data`**             | <code>string</code>                                     | 照片资源的 base64 编码数据（仅支持 JPEG 格式）                      |
| **`creationDate`**     | <code>string</code>                                     | 资源创建日期的 ISO 日期字符串                                       |
| **`fullWidth`**        | <code>number</code>                                     | 原始资源的完整宽度                                                  |
| **`fullHeight`**       | <code>number</code>                                     | 原始资源的完整高度                                                  |
| **`thumbnailWidth`**   | <code>number</code>                                     | 缩略图预览的宽度                                                    |
| **`thumbnailHeight`**  | <code>number</code>                                     | 缩略图预览的高度                                                    |
| **`location`**         | <code><a href="#photolocation">PhotoLocation</a></code> | 资源的位置元数据                                                    |

#### PhotoLocation

| 属性             | 类型                | 描述                                |
| ---------------- | ------------------- | ----------------------------------- |
| **`latitude`**   | <code>number</code> | 拍摄照片时的 GPS 纬度               |
| **`longitude`**  | <code>number</code> | 拍摄照片时的 GPS 经度               |
| **`heading`**    | <code>number</code> | 拍摄照片时用户的朝向                |
| **`altitude`**   | <code>number</code> | 拍摄照片时用户的海拔高度            |
| **`speed`**      | <code>number</code> | 拍摄照片时用户的速度                |

#### PhotosFetchOptions

| 属性                    | 类型                | 描述                                                                 |
| ----------------------- | ------------------- | ------------------------------------------------------------------- |
| **`quantity`**          | <code>number</code> | 要获取的照片数量，按最后创建日期降序排列                            |
| **`thumbnailWidth`**    | <code>number</code> | 返回缩略图的宽度                                                    |
| **`thumbnailHeight`**   | <code>number</code> | 返回缩略图的高度                                                    |
| **`thumbnailQuality`**  | <code>number</code> | 返回缩略图的 JPEG 质量（0-100）                                     |
| **`types`**             | <code>string</code> | 要返回的资源类型（当前仅支持 "photos"）                             |
| **`albumIdentifier`**   | <code>string</code> | 查询的相册标识符（可通过 getAlbums() 获取标识符）                   |

#### PhotosAlbumsResult

| 属性          | 类型                       | 描述                                     |
| ------------ | -------------------------- | ---------------------------------------- |
| **`albums`** | <code>PhotosAlbum[]</code> | 从查询返回的相册列表                     |

#### PhotosAlbum

| 属性               | 类型                                                        | 描述                        |
| ------------------ | ----------------------------------------------------------- | --------------------------- |
| **`identifier`**   | <code>string</code>                                         | 相册的本地标识符            |
| **`name`**         | <code>string</code>                                         | 相册名称                    |
| **`count`**        | <code>number</code>                                         | 相册中的项目数量            |
| **`type`**         | <code><a href="#photosalbumtype">PhotosAlbumType</a></code> | 相册类型                    |

#### PhotosAlbumsFetchOptions

| 属性              | 类型                 | 描述                         |
| ----------------- | -------------------- | ---------------------------- |
| **`loadShared`**  | <code>boolean</code> | 是否加载云共享相册           |

#### PhotosSaveResult

| 属性            | 类型                 | 描述                     |
| --------------- | -------------------- | ------------------------ |
| **`success`**   | <code>boolean</code> | 照片是否创建成功         |

#### PhotosSaveOptions

| 属性                   | 类型                | 描述                                                                           |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------ |
| **`data`**             | <code>string</code> | 照片的 base64 编码 JPEG 数据（注意：不要添加 HTML data-uri 类型前缀）          |
| **`albumIdentifier`**  | <code>string</code> | 可选的要保存照片的相册标识符                                                   |

#### PhotosCreateAlbumOptions

| 属性        | 类型                |
| ----------- | ------------------- |
| **`name`**  | <code>string</code> |

### 枚举

#### PhotosAlbumType

| 成员         | 值                   | 描述                                                    |
| ----------- | -------------------- | ------------------------------------------------------- |
| **`Smart`** | <code>"smart"</code> | 智能相册（如"收藏夹"或"最近添加"）                      |
| **`Shared`**| <code>"shared"</code>| 云共享相册                                              |
| **`User`**  | <code>"user"</code>  | 用户创建的相册                                          |