---
title: File Viewer Capacitor 插件 API
description: FileViewer API 提供了打开文件和预览媒体的机制。在 Web 上不可用。
custom_edit_url: https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件查看器
translated: true
source_hash: 62e627d4
---

# @capacitor/file-viewer

FileViewer API 提供了打开文件和预览媒体的机制。在 Web 上不可用。

媒体预览方法目前仅在 iOS 上支持。它使用内置播放器。

## 安装

```bash
npm install @capacitor/file-viewer
npx cap sync
```

## 示例

```typescript
import { FileViewer } from "@capacitor/file-viewer";

// 可以使用 @capacitor/filesystem 等插件获取文件的完整路径
const openDocument = async () => {
  await FileViewer.openDocumentFromLocalPath({
    path: "path/to/file.pdf"
  });
};

// 仅限 iOS
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
* [接口](#接口)
* [类型别名](#类型别名)

</docgen-index>

有关现有错误代码列表，请参阅[错误](#错误)。

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

文件查看器 API

仅在原生 Android 和 iOS 上可用；不适用于 Web / PWA。

### openDocumentFromLocalPath(...)

```typescript
openDocumentFromLocalPath(options: OpenFromLocalPathOptions) => Promise<void>
```

打开本地文件系统中存储的文件

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**自版本:** 1.0.0

--------------------


### openDocumentFromResources(...)

```typescript
openDocumentFromResources(options: OpenFromResourcesOptions) => Promise<void>
```

打开应用资源文件

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**自版本:** 1.0.0

--------------------


### openDocumentFromUrl(...)

```typescript
openDocumentFromUrl(options: OpenFromUrlOptions) => Promise<void>
```

从远程 URL 打开文件

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**自版本:** 1.0.0

--------------------


### previewMediaContentFromLocalPath(...)

```typescript
previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions) => Promise<void>
```

预览存储在本地文件系统中的媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromLocalPath`。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**自版本:** 1.0.0

--------------------


### previewMediaContentFromResources(...)

```typescript
previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions) => Promise<void>
```

预览应用资源中的媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromResources`。

| 参数          | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**自版本:** 1.0.0

--------------------


### previewMediaContentFromUrl(...)

```typescript
previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions) => Promise<void>
```

预览远程 URL 中的媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromUrl`。

| 参数          | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**自版本:** 1.0.0

--------------------


### 接口


#### OpenFromLocalPathOptions

| 属性       | 类型                | 描述                                    | 自版本 |
| ---------- | ------------------- | --------------------------------------- | ----- |
| **`path`** | <code>string</code> | 要打开文件的完整绝对路径                | 1.0.0 |


#### OpenFromResourcesOptions

| 属性       | 类型                | 描述                                        | 自版本 |
| ---------- | ------------------- | ------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 要打开的资源文件的相对路径                  | 1.0.0 |


#### OpenFromUrlOptions

| 属性      | 类型                | 描述                                     | 自版本 |
| --------- | ------------------- | ---------------------------------------- | ----- |
| **`url`** | <code>string</code> | 指向要打开文件的远程 URL                  | 1.0.0 |


### 类型别名


#### PreviewMediaFromLocalPathOptions

<code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code>


#### PreviewMediaFromResourcesOptions

<code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code>


#### PreviewMediaFromUrlOptions

<code><a href="#openfromurloptions">OpenFromUrlOptions</a></code>

</docgen-api>

### 错误

该插件在原生 Android 和 iOS 上返回以下带有特定代码的错误：

| 错误代码          | 平台              | 消息                           |
|-------------------|-------------------|--------------------------------|
| OS-PLUG-FLVW-0004 | Android, iOS      | 你尝试打开的文件不存在。         |
| OS-PLUG-FLVW-0005 | Android, iOS      | 你尝试打开的 URL 格式不正确。    |
| OS-PLUG-FLVW-0006 | Android, iOS      | 要打开的文件路径为空。           |
| OS-PLUG-FLVW-0007 | Android, iOS      | 要打开的 URL 为空。              |
| OS-PLUG-FLVW-0008 | Android, iOS      | 无法打开文件。                   |
| OS-PLUG-FLVW-0009 | Android, iOS      | 参数无效。                       |
| OS-PLUG-FLVW-0010 | Android           | 没有可打开此文件的应用。         |
| OS-PLUG-FLVW-0011 | iOS               | Cordova / Capacitor 桥接未初始化。 |
| OS-PLUG-FLVW-0012 | iOS               | 下载失败。                       |
| OS-PLUG-FLVW-0013 | iOS               | 文件没有扩展名。                 |
