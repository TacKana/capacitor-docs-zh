---
title: File Transfer Capacitor 插件 API
description: FileTransfer API 提供下载和上传文件的机制。
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Transfer
translated: true
---

# @capacitor/file-transfer

FileTransfer API 提供下载和上传文件的机制。

## 安装

```bash
npm install @capacitor/file-transfer@latest-7
npx cap sync
```

## 示例

### 下载

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// 首先使用 Filesystem 获取完整的文件路径
const fileInfo = await Filesystem.getUri({
  directory: Directory.Data,
  path: 'downloaded-file.pdf'
});

try {
    // 然后使用 FileTransfer 插件下载
    await FileTransfer.downloadFile({
        url: 'https://example.com/file.pdf',
        path: fileInfo.uri,
        progress: true
    });
} catch(error) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      // HTTP 错误 - 参见 `FileTransferError` 了解 `errorData` 中可用字段的详细信息
      let errorData = error.data;
      this.showError('上传失败：' + errorData.httpStatus + '; ' + errorData.body);
    } else {
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息。
      this.showError('上传失败：' + error.code + '; ' + error.message);
    }
}

// 进度事件
FileTransfer.addListener('progress', (progress) => {
  console.log(`已下载 ${progress.bytes} / ${progress.contentLength}`);
});
```

### 上传

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// 首先使用 Filesystem 获取完整的文件路径
const fileInfo = await Filesystem.getUri({
  directory: Directory.Cache,
  path: 'image_upload.png'
});

try {
    // 然后使用 FileTransfer 插件上传
    const result = await FileTransfer.uploadFile({
        url: 'https://example.com/upload_api',
        path: fileInfo.uri,
        chunkedMode: true,
        headers: {
            // 上传默认使用 `multipart/form-data`。
            // 如果您想避免这种情况，可以显式设置 'Content-Type' 头。
            'Content-Type': 'application/octet-stream',
        },
        progress: false
    });
    // 从结果中获取服务器响应和其他信息 - 参见 `UploadFileResult` 接口
} catch(error) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      // HTTP 错误 - 参见 `FileTransferError` 了解 `errorData` 中可用字段的详细信息
      let errorData = error.data;
      this.showError('上传失败：' + errorData.httpStatus + '; ' + errorData.body);
    } else {
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息。
      this.showError('上传失败：' + error.code + '; ' + error.message);
    }
}
```

## API

<docgen-index>

* [`downloadFile(...)`](#downloadfile)
* [`uploadFile(...)`](#uploadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#接口)

</docgen-index>

注意：部分输入选项来自 `@capacitor/core` 中的 `HttpOptions`，但插件并未使用 `HttpOptions` 中的所有参数。以下记录的是实际使用的参数。

关于现有错误代码的列表，请参见[错误](#错误)。

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发送 HTTP 请求并将文件下载到指定目标。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
要在 Android 和 iOS（不适用于 web）上运行时获取关于 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### uploadFile(...)

```typescript
uploadFile(options: UploadFileOptions) => Promise<UploadFileResult>
```

向服务器发送 HTTP 请求以上传文件。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
要在 Android 和 iOS（不适用于 web）上运行时获取关于 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#uploadfileoptions">UploadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#uploadfileresult">UploadFileResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: "progress", listenerFunc: (progress: ProgressStatus) => void) => Promise<PluginListenerHandle>
```

为文件传输（下载或上传）进度事件添加监听器。

| 参数 | 类型 |
| ------------------ | -------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                                          |
| **`listenerFunc`** | <code>(progress: <a href="#progressstatus">ProgressStatus</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**起始版本：** 1.0.0

--------------------


### 接口


#### DownloadFileResult

| 属性 | 类型 | 描述 | 起始版本 |
| ---------- | ------------------- | ------------------------------------------------------------ | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。 | 1.0.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。仅在 web 上可用。 | 1.0.0 |


#### DownloadFileOptions

| 属性 | 类型 | 描述 | 起始版本 |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                   | <code>string</code>                                 | 下载文件的 URL。 | 1.0.0 |
| **`path`**                  | <code>string</code>                                 | 下载文件应移动到的完整文件路径。 | 1.0.0 |
| **`progress`**              | <code>boolean</code>                                | 如果为 true，将在每个接收到的块上分发进度事件。默认为 `false`。 | 1.0.0 |
| **`method`**                | <code>string</code>                                 | 要执行的 HTTP 请求方法。（默认是 GET） | 1.0.0 |
| **`params`**                | <code>HttpParams</code>   | 要附加到请求的 URL 参数。 | 1.0.0 |
| **`headers`**               | <code>HttpHeaders</code> | 随请求发送的 HTTP 请求头。 | 1.0.0 |
| **`readTimeout`**           | <code>number</code>                                 | 等待读取额外数据的毫秒数。每次收到新数据时重置。默认值为 60000 毫秒（1 分钟）。web 上不支持。 | 1.0.0 |
| **`connectTimeout`**        | <code>number</code>                                 | 等待初始连接的毫秒数。默认值为 60000 毫秒（1 分钟）。 | 1.0.0 |
| **`disableRedirects`**      | <code>boolean</code>                                | 设置是否禁用自动 HTTP 重定向。 | 1.0.0 |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                | 如果您需要在某些情况下保持 URL 不编码，请使用此选项。默认为 `true`。web 上不支持。 | 1.0.0 |


#### UploadFileResult

| 属性 | 类型 | 描述 | 起始版本 |
| ------------------ | --------------------------------------- | ------------------------------------------------------ | ----- |
| **`bytesSent`**    | <code>number</code>                     | 上传的总字节数。 | 1.0.0 |
| **`responseCode`** | <code>string</code>                     | 上传的 HTTP 响应代码。 | 1.0.0 |
| **`response`**     | <code>string</code>                     | 上传的 HTTP 响应体（可用时）。 | 1.0.0 |
| **`headers`**      | <code>{ [key: string]: string; }</code> | 上传响应的 HTTP 头（可用时）。 | 1.0.0 |


#### UploadFileOptions

| 属性 | 类型 | 描述 | 起始版本 |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                   | <code>string</code>                                 | 上传文件的 URL。 | 1.0.0 |
| **`path`**                  | <code>string</code>                                 | 要上传文件的完整文件路径。 | 1.0.0 |
| **`blob`**                  | <code>Blob</code>                                   | 要上传的 blob 数据。如果提供，将使用此数据而不是路径。仅在 web 上可用。 | 1.0.0 |
| **`chunkedMode`**           | <code>boolean</code>                                | 是否以分块流模式上传数据。web 上不支持。 | 1.0.0 |
| **`mimeType`**              | <code>string</code>                                 | 要上传数据的 MIME 类型。 | 1.0.0 |
| **`fileKey`**               | <code>string</code>                                 | 表单元素的类型。默认设置为 "file"。 | 1.0.0 |
| **`progress`**              | <code>boolean</code>                                | 如果为 true，将在每个接收到的块上分发进度事件。默认为 `false`。 | 1.0.0 |
| **`method`**                | <code>string</code>                                 | 要执行的 HTTP 请求方法。（默认是 POST） | 1.0.0 |
| **`params`**                | <code>HttpParams</code>   | 要附加到请求的 URL 参数。 | 1.0.0 |
| **`headers`**               | <code>HttpHeaders</code> | 随请求发送的 HTTP 请求头。 | 1.0.0 |
| **`readTimeout`**           | <code>number</code>                                 | 等待读取额外数据的毫秒数。默认值为 60000 毫秒（1 分钟）。web 上不支持。 | 1.0.0 |
| **`connectTimeout`**        | <code>number</code>                                 | 等待初始连接的毫秒数。默认值为 60000 毫秒（1 分钟）。web 上不支持。 | 1.0.0 |
| **`disableRedirects`**      | <code>boolean</code>                                | 设置是否禁用自动 HTTP 重定向。web 上不支持。 | 1.0.0 |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                | 如果您需要在某些情况下保持 URL 不编码，请使用此选项。默认为 `true`。web 上不支持。 | 1.0.0 |


#### PluginListenerHandle

| 属性 | 类型 |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性 | 类型 | 描述 | 起始版本 |
| -------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`type`**           | <code>'download' \| 'upload'</code> | 传输操作的类型（下载或上传）。 | 1.0.0 |
| **`url`**            | <code>string</code>                 | 与传输关联的文件的 URL。 | 1.0.0 |
| **`bytes`**          | <code>number</code>                 | 迄今为止已传输的字节数。 | 1.0.0 |
| **`contentLength`**  | <code>number</code>                 | 与文件传输关联的总字节数。 | 1.0.0 |
| **`lengthComputable`** | <code>boolean</code>                | contentLength 值是否相关。 | 1.0.0 |


#### FileTransferError

| 属性 | 类型 | 描述 | 起始版本 |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------- | ----- |
| **`code`**       | <code>string</code>                     | 标识错误的代码：OS-PLUG-FLTR-XXXX。 | 1.0.0 |
| **`message`**    | <code>string</code>                     | 告知出错原因的消息。 | 1.0.0 |
| **`source`**     | <code>string</code>                     | 文件传输操作的源（下载的 URL，上传的文件路径）。 | 1.0.0 |
| **`target`**     | <code>string</code>                     | 文件传输操作的目标（下载的文件路径，上传的 URL）。 | 1.0.0 |
| **`httpStatus`** | <code>number</code>                     | 服务器响应的 HTTP 状态码（如果可用）。 | 1.0.0 |
| **`headers`**    | <code>{ [key: string]: string; }</code> | 来自服务器响应的 HTTP 头（如果可用）。 | 1.0.0 |
| **`body`**       | <code>string</code>                     | 来自服务器的 HTTP 错误响应体（如果可用）。 | 1.0.0 |
| **`exception`**  | <code>string</code>                     | 原生端抛出的异常消息（如果可用）。 | 1.0.0 |

</docgen-api>

### 错误
插件在 iOS、Android 和 Web 上返回以下带有特定代码的错误：

| 错误代码 | 平台 | 描述 |
|-------------------|-------------------|----------------------------------|
| OS-PLUG-FLTR-0004 | Android, iOS | 方法的输入参数无效。 |
| OS-PLUG-FLTR-0005 | Android, iOS | 提供的服务器 URL 无效或 URL 为空。 |
| OS-PLUG-FLTR-0006 | Android, iOS | 无法执行操作，用户拒绝了权限请求。 |
| OS-PLUG-FLTR-0007 | Android, iOS | 操作失败，因为文件不存在。 |
| OS-PLUG-FLTR-0008 | Android, iOS, Web | 无法连接到服务器。 |
| OS-PLUG-FLTR-0009 | Android, iOS | 服务器响应 HTTP 304 - 未修改。 |
| OS-PLUG-FLTR-0010 | Android, iOS | 服务器响应了一个 HTTP 错误状态码。 |
| OS-PLUG-FLTR-0011 | Android, iOS, Web | 操作失败并出现错误（通用错误）。 |

在应用中处理错误时，您可以检查错误代码以确定具体问题。错误对象通常包含额外信息，例如：

- `code`：错误代码（如上表所示）
- `message`：错误的人类可读描述
- `source`：传输的源（文件路径或 URL）
- `target`：传输的目标（文件路径或 URL）
- `httpStatus`：HTTP 状态码（对于 HTTP 错误）
- `body`：响应体（对于 HTTP 错误）
- `headers`：响应头（对于 HTTP 错误）
