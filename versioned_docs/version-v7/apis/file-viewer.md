---
title: 文件查看器 - Capacitor 插件 API
description: FileViewer API 提供了打开文件和预览媒体的机制。在 Web 端不可用。
custom_edit_url: https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-viewer/blob/1.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件查看器
translated: true
---

# @capacitor/file-viewer

FileViewer API 提供了打开文件和预览媒体的机制。在 Web 端不可用。

媒体预览方法目前仅支持 iOS。它使用内置播放器。

## 安装

```bash
npm install @capacitor/file-viewer@latest-7
npx cap sync
```

## 示例

```typescript
import { FileViewer } from "@capacitor/file-viewer";

// 可以使用像 @capacitor/filesystem 这样的插件来获取文件的完整路径
const openDocument = async () => {
  await FileViewer.openDocumentFromLocalPath({
    path: "path/to/file.pdf"
  });
};

// iOS 特有
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

关于已有错误代码的列表，请参阅[错误](#错误)。

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

文件查看器 API

仅适用于原生 Android 和 iOS；不适用于 Web / PWA。

### openDocumentFromLocalPath(...)

```typescript
openDocumentFromLocalPath(options: OpenFromLocalPathOptions) => Promise<void>
```

打开本地文件系统中存储的文件

| 参数          | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**自从：** 1.0.0

--------------------


### openDocumentFromResources(...)

```typescript
openDocumentFromResources(options: OpenFromResourcesOptions) => Promise<void>
```

打开应用资源文件

| 参数          | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**自从：** 1.0.0

--------------------


### openDocumentFromUrl(...)

```typescript
openDocumentFromUrl(options: OpenFromUrlOptions) => Promise<void>
```

从远程 URL 打开文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**自从：** 1.0.0

--------------------


### previewMediaContentFromLocalPath(...)

```typescript
previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions) => Promise<void>
```

预览存储在本地文件系统中的媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromLocalPath`。

| 参数          | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**自从：** 1.0.0

--------------------


### previewMediaContentFromResources(...)

```typescript
previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions) => Promise<void>
```

从应用资源中预览媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromResources`。

| 参数          | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**自从：** 1.0.0

--------------------


### previewMediaContentFromUrl(...)

```typescript
previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions) => Promise<void>
```

从远程 URL 预览媒体文件（即视频）。
仅在 iOS 上实现。Android 默认使用 `openDocumentFromUrl`。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**自从：** 1.0.0

--------------------


### 接口


#### OpenFromLocalPathOptions

| 属性         | 类型                  | 描述                         | 自从   |
| ------------ | --------------------- | ---------------------------- | ------ |
| **`path`**   | <code>string</code>   | 要打开的文件的完整绝对路径   | 1.0.0 |


#### OpenFromResourcesOptions

| 属性         | 类型                  | 描述                               | 自从   |
| ------------ | --------------------- | ---------------------------------- | ------ |
| **`path`**   | <code>string</code>   | 要打开的资源文件的相对路径         | 1.0.0 |


#### OpenFromUrlOptions

| 属性      | 类型                  | 描述                                      | 自从   |
| --------- | --------------------- | ----------------------------------------- | ------ |
| **`url`** | <code>string</code>   | 指向要打开的文件的远程 URL                | 1.0.0 |


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

| 错误代码          | 平台             | 消息                                     |
|-------------------|------------------|------------------------------------------|
| OS-PLUG-FLVW-0004 | Android, iOS     | 您尝试打开的文件不存在。                 |
| OS-PLUG-FLVW-0005 | Android, iOS     | 您尝试打开的 URL 格式不正确。            |
| OS-PLUG-FLVW-0006 | Android, iOS     | 要打开的文件的路径为空或空字符串。       |
| OS-PLUG-FLVW-0007 | Android, iOS     | 要打开的 URL 为空或空字符串。            |
| OS-PLUG-FLVW-0008 | Android, iOS     | 无法打开文件。                           |
| OS-PLUG-FLVW-0009 | Android, iOS     | 无效的参数。                             |
| OS-PLUG-FLVW-0010 | Android          | 没有可用于打开此文件的应用。             |
| OS-PLUG-FLVW-0011 | iOS              | Cordova / Capacitor 桥尚未初始化。       |
| OS-PLUG-FLVW-0012 | iOS              | 下载失败。                               |
| OS-PLUG-FLVW-0013 | iOS              | 文件没有扩展名。                         |
