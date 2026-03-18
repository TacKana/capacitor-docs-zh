---
title: File Viewer Capacitor Plugin API
description: FileViewer API 提供了打开文件和预览媒体的功能。Web 平台不可用。
custom_edit_url: https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Viewer
---

# @capacitor/file-viewer

FileViewer API 提供了打开文件和预览媒体的功能。Web 平台不可用。

媒体预览功能目前仅在 iOS 上受支持。它使用内置播放器。

## 安装

```bash
npm install @capacitor/file-viewer@latest-7
npx cap sync
```

## 示例

```typescript
import { FileViewer } from "@capacitor/file-viewer";

// 可以使用 @capacitor/filesystem 等插件来获取文件的完整路径
const openDocument = async () => {
  await FileViewer.openDocumentFromLocalPath({
    path: "path/to/file.pdf"
  });
};

// iOS 专用功能
const previewMedia = async () => {
  await FileViewer.previewMediaContentFromUrl({
    path: "https://url_hosting_media/file.mp4"
  });
}
```

## API

<docgen-index>

* [`openDocumentFromLocalPath(...)`](#opendocumentfromlocalpath)
* [`openDocumentFromResources(...)`](#opendocumentfromresources)
* [`openDocumentFromUrl(...)`](#opendocumentfromurl)
* [`previewMediaContentFromLocalPath(...)`](#previewmediacontentfromlocalpath)
* [`previewMediaContentFromResources(...)`](#previewmediacontentfromresources)
* [`previewMediaContentFromUrl(...)`](#previewmediacontentfromurl)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

现有错误代码列表，请参阅[错误处理](#errors)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

File Viewer API

仅在原生 Android 和 iOS 平台可用；Web/PWA 不可用。

### openDocumentFromLocalPath(...)

```typescript
openDocumentFromLocalPath(options: OpenFromLocalPathOptions) => Promise<void>
```

打开存储在本地文件系统中的文件

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### openDocumentFromResources(...)

```typescript
openDocumentFromResources(options: OpenFromResourcesOptions) => Promise<void>
```

打开应用程序资源文件

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### openDocumentFromUrl(...)

```typescript
openDocumentFromUrl(options: OpenFromUrlOptions) => Promise<void>
```

从远程 URL 打开文件

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### previewMediaContentFromLocalPath(...)

```typescript
previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions) => Promise<void>
```

预览存储在本地文件系统中的媒体文件（主要是视频）。
仅在 iOS 上实现。Android 平台默认使用 `openDocumentFromLocalPath`。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### previewMediaContentFromResources(...)

```typescript
previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions) => Promise<void>
```

预览应用程序资源中的媒体文件（主要是视频）。
仅在 iOS 上实现。Android 平台默认使用 `openDocumentFromResources`。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### previewMediaContentFromUrl(...)

```typescript
previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions) => Promise<void>
```

预览远程 URL 中的媒体文件（主要是视频）。
仅在 iOS 上实现。Android 平台默认使用 `openDocumentFromUrl`。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**起始版本：** 1.0.0

--------------------


### 接口


#### OpenFromLocalPathOptions

| 属性         | 类型                | 描述                                 | 起始版本 |
| ---------- | ------------------- | ------------------------------------------ | ----- |
| **`path`** | <code>string</code> | 要打开文件的完整绝对路径 | 1.0.0 |


#### OpenFromResourcesOptions

| 属性         | 类型                | 描述                                    | 起始版本 |
| ---------- | ------------------- | ---------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 要打开的应用程序资源文件的相对路径 | 1.0.0 |


#### OpenFromUrlOptions

| 属性        | 类型                | 描述                                 | 起始版本 |
| --------- | ------------------- | ------------------------------------------- | ----- |
| **`url`** | <code>string</code> | 指向要打开文件的远程 URL | 1.0.0 |


### 类型别名


#### PreviewMediaFromLocalPathOptions

<code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code>


#### PreviewMediaFromResourcesOptions

<code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code>


#### PreviewMediaFromUrlOptions

<code><a href="#openfromurloptions">OpenFromUrlOptions</a></code>

</docgen-api>### 错误代码

该插件在原生 Android 和 iOS 平台上返回以下带特定代码的错误：

| 错误代码          | 平台              | 错误信息                          |
|-------------------|-------------------|-----------------------------------|
| OS-PLUG-FLVW-0004 | Android, iOS      | 尝试打开的文件不存在。             |
| OS-PLUG-FLVW-0005 | Android, iOS      | 尝试打开的 URL 格式不正确。        |
| OS-PLUG-FLVW-0006 | Android, iOS      | 要打开的文件路径为空或未提供。     |
| OS-PLUG-FLVW-0007 | Android, iOS      | 要打开的 URL 为空或未提供。        |
| OS-PLUG-FLVW-0008 | Android, iOS      | 无法打开文件。                     |
| OS-PLUG-FLVW-0009 | Android, iOS      | 参数无效。                         |
| OS-PLUG-FLVW-0010 | Android           | 没有可以打开此文件的应用。         |
| OS-PLUG-FLVW-0011 | iOS               | Cordova / Capacitor 桥接器未初始化。 |
| OS-PLUG-FLVW-0012 | iOS               | 下载失败。                         |
| OS-PLUG-FLVW-0013 | iOS               | 文件没有扩展名。                   |