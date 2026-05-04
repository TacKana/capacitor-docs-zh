---
title: Photos
description: 照片 API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

照片 API 提供了从用户相册中加载照片和相簿的方法，同时也支持保存照片。

## API

### getPhotos(...)

```typescript
getPhotos(options?: PhotosFetchOptions) => Promise<PhotosResult>
```

从用户的相册中获取照片

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#photosfetchoptions">PhotosFetchOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photosresult">PhotosResult</a>&gt;</code>

---

### getAlbums(...)

```typescript
getAlbums(options?: PhotosAlbumsFetchOptions) => Promise<PhotosAlbumsResult>
```

从用户的相册中获取相簿

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photosalbumsfetchoptions">PhotosAlbumsFetchOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photosalbumsresult">PhotosAlbumsResult</a>&gt;</code>

---

### savePhoto(...)

```typescript
savePhoto(options?: PhotosSaveOptions) => Promise<PhotosSaveResult>
```

将照片保存到用户的相册中

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#photossaveoptions">PhotosSaveOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#photossaveresult">PhotosSaveResult</a>&gt;</code>

---

### createAlbum(...)

```typescript
createAlbum(options: PhotosCreateAlbumOptions) => Promise<void>
```

在用户的相册中创建一个相簿

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photoscreatealbumoptions">PhotosCreateAlbumOptions</a></code> |

---

### 接口

#### PhotosResult

| 属性          | 类型                      | 说明                               |
| ------------ | ------------------------- | ---------------------------------- |
| **`photos`** | <code>PhotoAsset[]</code> | 从相册中返回的照片列表             |

#### PhotoAsset

| 属性                     | 类型                                                    | 说明                                                           |
| ---------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| **`identifier`**       | <code>string</code>                                     | 平台特定的标识符                                               |
| **`data`**             | <code>string</code>                                     | 照片资源的数据，以 base64 编码的字符串（仅支持 JPEG 格式） |
| **`creationDate`**     | <code>string</code>                                     | 资源创建日期的 ISO 日期字符串                                  |
| **`fullWidth`**        | <code>number</code>                                     | 原始资源的完整宽度                                             |
| **`fullHeight`**       | <code>number</code>                                     | 原始资源的完整高度                                             |
| **`thumbnailWidth`**   | <code>number</code>                                     | 缩略图预览的宽度                                               |
| **`thumbnailHeight`**  | <code>number</code>                                     | 缩略图预览的高度                                               |
| **`location`**         | <code><a href="#photolocation">PhotoLocation</a></code> | 资源的定位元数据                                               |

#### PhotoLocation

| 属性              | 类型                | 说明                               |
| --------------- | ------------------- | ---------------------------------- |
| **`latitude`**  | <code>number</code> | 拍摄照片时的 GPS 纬度              |
| **`longitude`** | <code>number</code> | 拍摄照片时的 GPS 经度              |
| **`heading`**   | <code>number</code> | 拍摄照片时用户的朝向               |
| **`altitude`**  | <code>number</code> | 拍摄照片时用户的海拔高度           |
| **`speed`**     | <code>number</code> | 拍摄照片时用户的速度               |

#### PhotosFetchOptions

| 属性                      | 类型                | 说明                                                             |
| ---------------------- | ------------------- | ---------------------------------------------------------------- |
| **`quantity`**         | <code>number</code> | 要获取的照片数量，按最近创建日期降序排列                         |
| **`thumbnailWidth`**   | <code>number</code> | 返回的缩略图宽度                                                 |
| **`thumbnailHeight`**  | <code>number</code> | 返回的缩略图高度                                                 |
| **`thumbnailQuality`** | <code>number</code> | 以 JPEG 格式返回的缩略图质量（0-100）                            |
| **`types`**            | <code>string</code> | 要返回的资源类型（目前仅支持 "photos"）                          |
| **`albumIdentifier`**  | <code>string</code> | 要查询的相簿标识符（使用 getAlbums() 获取标识符）                |

#### PhotosAlbumsResult

| 属性          | 类型                       | 说明                                 |
| ------------ | -------------------------- | ------------------------------------ |
| **`albums`** | <code>PhotosAlbum[]</code> | 从查询中返回的相簿列表               |

#### PhotosAlbum

| 属性                | 类型                                                        | 说明                     |
| ---------------- | ----------------------------------------------------------- | ------------------------ |
| **`identifier`** | <code>string</code>                                         | 相簿的本地标识符         |
| **`name`**       | <code>string</code>                                         | 相簿的名称               |
| **`count`**      | <code>number</code>                                         | 相簿中的项目数量         |
| **`type`**       | <code><a href="#photosalbumtype">PhotosAlbumType</a></code> | 相簿的类型               |

#### PhotosAlbumsFetchOptions

| 属性              | 类型                 | 说明                           |
| ---------------- | -------------------- | ------------------------------ |
| **`loadShared`** | <code>boolean</code> | 是否加载云共享相簿             |

#### PhotosSaveResult

| 属性           | 类型                 | 说明                     |
| ------------- | -------------------- | ------------------------ |
| **`success`** | <code>boolean</code> | 照片是否创建成功         |

#### PhotosSaveOptions

| 属性                  | 类型                | 说明                                                                       |
| --------------------- | ------------------- | -------------------------------------------------------------------------- |
| **`data`**            | <code>string</code> | 照片的 base64 编码 JPEG 数据（注意：不要添加 HTML data-uri 类型前缀）      |
| **`albumIdentifier`** | <code>string</code> | 用于保存此照片的可选相册标识符                                             |

#### PhotosCreateAlbumOptions

| 属性       | 类型                |
| ---------- | ------------------- |
| **`name`** | <code>string</code> |

### 枚举

#### PhotosAlbumType

| 成员         | 值                    | 说明                                             |
| ------------ | --------------------- | ------------------------------------------------ |
| **`Smart`**  | <code>"smart"</code>  | 相册是“智能”相册（例如“收藏夹”或“最近添加”）     |
| **`Shared`** | <code>"shared"</code> | 相册是云端共享相册                               |
| **`User`**   | <code>"user"</code>   | 相册是用户创建的相册                             |