---
title: File Transfer Capacitor Plugin API
description: FileTransfer API 提供了下载和上传文件的机制。
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Transfer
---

# @capacitor/file-transfer

FileTransfer API 提供了下载和上传文件的机制。

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
    // 然后使用 FileTransfer 插件进行下载
    await FileTransfer.downloadFile({
        url: 'https://example.com/file.pdf',
        path: fileInfo.uri,
        progress: true
    });
} catch(error) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      // HTTP 错误 - 有关 `errorData` 中可用字段的详细信息，请参阅 `FileTransferError`
      let errorData = error.data;
      this.showError('上传失败: ' + errorData.httpStatus + '; ' + errorData.body);
    } else {
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息
      this.showError('上传失败: ' + error.code + '; ' + error.message);
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
    // 然后使用 FileTransfer 插件进行上传
    const result = await FileTransfer.uploadFile({
        url: 'https://example.com/upload_api',
        path: fileInfo.uri,
        chunkedMode: true,
        headers: {
            // 上传默认使用 `multipart/form-data`。
            // 如果你想避免这种情况，可以显式设置 'Content-Type' 请求头。
            'Content-Type': 'application/octet-stream',
        },
        progress: false
    });
    // 从结果中获取服务器响应和其他信息 - 请参阅 `UploadFileResult` 接口
} catch(error) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      // HTTP 错误 - 有关 `errorData` 中可用字段的详细信息，请参阅 `FileTransferError`
      let errorData = error.data;
      this.showError('上传失败: ' + errorData.httpStatus + '; ' + errorData.body);
    } else {
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息
      this.showError('上传失败: ' + error.code + '; ' + error.message);
    }
}
```

## API

<docgen-index>

* [`downloadFile(...)`](#downloadfile)
* [`uploadFile(...)`](#uploadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)

</docgen-index>

注意：部分输入选项来自 `@capacitor/core` 中的 `HttpOptions`，但本插件并未使用 `HttpOptions` 中的所有参数。下面会记录实际使用的参数。

有关现有错误代码的列表，请参阅[错误处理](#errors)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求，并将文件下载到指定目标路径。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
在 Android 和 iOS 上运行时（不适用于 Web），要获取 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### uploadFile(...)

```typescript
uploadFile(options: UploadFileOptions) => Promise<UploadFileResult>
```

向服务器发起 HTTP 请求以上传文件。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
在 Android 和 iOS 上运行时（不适用于 Web），要获取 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#uploadfileoptions">UploadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#uploadfileresult">UploadFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: "progress", listenerFunc: (progress: ProgressStatus) => void) => Promise<PluginListenerHandle>
```

为文件传输（下载或上传）进度事件添加监听器。

| 参数               | 类型                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                                          |
| **`listenerFunc`** | <code>(progress: <a href="#progressstatus">ProgressStatus</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件的所有监听器。

**自：** 1.0.0

--------------------


### 接口


#### DownloadFileResult

| 属性         | 类型                | 说明                                                          | 自     |
| ---------- | ------------------- | -------------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                 | 1.0.0 |
| **`blob`** | <code>Blob</code>   | 已下载文件的 Blob 数据。此属性仅在 Web 上可用。 | 1.0.0 |#### 下载文件选项

| 属性                        | 类型                                                | 说明                                                                                                                                                                                                                                                                 | 始版 |
| --------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                   | <code>string</code>                                 | 要下载文件的 URL。                                                                                                                                                                                                                                                   | 1.0.0 |
| **`path`**                  | <code>string</code>                                 | 下载文件应移动到的完整文件路径。你可以使用像 `@capacitor/filesystem` 这样的插件来获取完整的文件路径。                                                                                                                                                                 | 1.0.0 |
| **`progress`**              | <code>boolean</code>                                | 如果为 true，每次接收到数据块时都会分派进度事件。更多信息请参阅 addListener()。在 Android/iOS 上，为了避免速度下降，数据块会被节流到每 100ms 一次。默认值为 `false`。                                                                                                | 1.0.0 |
| **`method`**                | <code>string</code>                                 | 要运行的 HTTP 请求方法。（默认为 GET）                                                                                                                                                                                                                               | 1.0.0 |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                      | 1.0.0 |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code> | 要随请求发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                  | 1.0.0 |
| **`readTimeout`**           | <code>number</code>                                 | 等待读取额外数据的时长（毫秒）。每次接收到新数据时重置。默认为 60,000 毫秒（1 分钟）。Web 平台不支持。                                                                                                                                                               | 1.0.0 |
| **`connectTimeout`**        | <code>number</code>                                 | 等待初始连接的时长（毫秒）。默认为 60,000 毫秒（1 分钟）。在 iOS 上，`connectTimeout` 和 `readTimeout` 没有真正的区别。插件会尝试使用 `connectTimeout`，如果没有则使用 `readTimeout`，如果都没有则使用默认值。                                                       | 1.0.0 |
| **`disableRedirects`**      | <code>boolean</code>                                | 设置是否应禁用自动 HTTP 重定向。                                                                                                                                                                                                                                     | 1.0.0 |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                | 如果你需要在某些情况下（已经编码、Azure/Firebase 测试等）保持 URL 未编码，请使用此选项。默认值为 `true`。Web 平台不支持。                                                                                                                                             | 1.0.0 |


#### HttpParams


#### HttpHeaders


#### 上传文件结果

| 属性               | 类型                                    | 说明                                             | 始版 |
| ------------------ | --------------------------------------- | ------------------------------------------------ | ----- |
| **`bytesSent`**    | <code>number</code>                     | 上传的总字节数                                   | 1.0.0 |
| **`responseCode`** | <code>string</code>                     | 上传的 HTTP 响应码                               | 1.0.0 |
| **`response`**     | <code>string</code>                     | 上传的 HTTP 响应体（如果可用）                   | 1.0.0 |
| **`headers`**      | <code>{ [key: string]: string; }</code> | 上传响应的 HTTP 头信息（如果可用）               | 1.0.0 |#### UploadFileOptions

| 属性                         | 类型                                                | 说明                                                                                                                                                                                                                                                                                                                                                                           | 版本  |
| ---------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`url`**                    | <code>string</code>                                 | 文件上传的目标 URL。                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`path`**                   | <code>string</code>                                 | 要上传文件的完整路径。可以使用 `@capacitor/filesystem` 等插件来获取完整的文件路径。                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`blob`**                   | <code>Blob</code>                                   | 要上传的 Blob 数据。如果提供了此参数，将优先使用 blob 而不是 path。此选项仅在 Web 平台上可用。                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`chunkedMode`**            | <code>boolean</code>                                | 是否以分块流模式上传数据。Web 平台不支持。注意：当 `chunkedMode` 为 `true` 时，上传会使用 `Content-Type: multipart/form-data`。根据后端服务器的不同，这可能导致上传失败。如果服务器期望接收原始数据流（例如 `application/octet-stream`），则必须在 `headers` 中显式设置 `Content-Type` 请求头。                                                                                 | 1.0.0 |
| **`mimeType`**               | <code>string</code>                                 | 要上传数据的 MIME 类型。仅在未提供 "Content-Type" 请求头时使用。                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`fileKey`**                | <code>string</code>                                 | 表单元素的类型。默认为 "file"。仅在未提供 "Content-Type" 请求头时使用。                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`progress`**               | <code>boolean</code>                                | 如果设为 `true`，则每收到一个数据块都会触发进度事件。更多信息请参考 addListener()。在 Android/iOS 上，为避免性能下降，事件触发频率被限制为每 100 毫秒一次。默认为 `false`。                                                                                                                                                                                                     | 1.0.0 |
| **`method`**                 | <code>string</code>                                 | 要执行的 HTTP 请求方法。（默认为 POST）                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`params`**                 | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`headers`**                | <code><a href="#httpheaders">HttpHeaders</a></code> | 要与请求一起发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`readTimeout`**            | <code>number</code>                                 | 等待读取额外数据的超时时间（毫秒）。每次收到新数据时重置。默认为 60,000 毫秒（1 分钟）。Web 平台不支持。                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`connectTimeout`**         | <code>number</code>                                 | 等待初始连接的超时时间（毫秒）。默认为 60,000 毫秒（1 分钟）。Web 平台不支持。在 iOS 上，`connectTimeout` 和 `readTimeout` 没有实质区别。插件会尝试使用 `connectTimeout`，如果没有则使用 `readTimeout`，如果都没有则使用默认值。                                                                                                                                                | 1.0.0 |
| **`disableRedirects`**       | <code>boolean</code>                                | 设置是否禁用自动 HTTP 重定向。Web 平台不支持。                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`shouldEncodeUrlParams`**  | <code>boolean</code>                                | 在特定情况下（例如 URL 已编码、Azure/Firebase 测试等），如果需要保持 URL 不编码，请使用此选项。默认为 `true`。Web 平台不支持。                                                                                                                                                                                                                                                 | 1.0.0 |

#### PluginListenerHandle

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |#### ProgressStatus

| 属性                   | 类型                                | 描述                                                                                                                         | 始于版本 |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`type`**             | <code>'download' \| 'upload'</code> | 传输操作的类型（下载或上传）。                                                                                | 1.0.0 |
| **`url`**              | <code>string</code>                 | 与传输关联的文件 URL（下载或上传）。                                                              | 1.0.0 |
| **`bytes`**            | <code>number</code>                 | 目前已传输的字节数。                                                                                             | 1.0.0 |
| **`contentLength`**    | <code>number</code>                 | 文件传输的总字节数。                                                                        | 1.0.0 |
| **`lengthComputable`** | <code>boolean</code>                | `contentLength` 值是否有效。在某些情况下，可能无法确定总字节数。 | 1.0.0 |


#### FileTransferError

| 属性             | 类型                                    | 描述                                                                             | 始于版本 |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------- | ----- |
| **`code`**       | <code>string</code>                     | 标识错误的代码：OS-PLUG-FLTR-XXXX                                           | 1.0.0 |
| **`message`**    | <code>string</code>                     | 说明发生了什么错误的描述信息                                                    | 1.0.0 |
| **`source`**     | <code>string</code>                     | 文件传输操作的源（下载时为 URL，上传时为文件路径） | 1.0.0 |
| **`target`**     | <code>string</code>                     | 文件传输操作的目标（下载时为文件路径，上传时为 URL）  | 1.0.0 |
| **`httpStatus`** | <code>number</code>                     | 服务器响应的 HTTP 状态码（如果可用）                                  | 1.0.0 |
| **`headers`**    | <code>{ [key: string]: string; }</code> | 服务器响应的 HTTP 头信息（如果可用）                                    | 1.0.0 |
| **`body`**       | <code>string</code>                     | 服务器返回的 HTTP 错误响应体（如果可用）                                 | 1.0.0 |
| **`exception`**  | <code>string</code>                     | 原生端抛出的异常信息（如果可用）                                  | 1.0.0 |

</docgen-api>

### 错误码
该插件在 iOS、Android 和 Web 平台上会返回以下特定错误码：

| 错误码        | 支持平台       | 描述                      |
|-------------------|-------------------|----------------------------------|
| OS-PLUG-FLTR-0004 | Android, iOS      | 方法输入参数无效。 |
| OS-PLUG-FLTR-0005 | Android, iOS      | 提供的服务器 URL 无效或为空。 |
| OS-PLUG-FLTR-0006 | Android, iOS      | 操作失败，用户拒绝了权限请求。 |
| OS-PLUG-FLTR-0007 | Android, iOS      | 操作失败，因为文件不存在。 |
| OS-PLUG-FLTR-0008 | Android, iOS, Web | 连接服务器失败。 |
| OS-PLUG-FLTR-0009 | Android, iOS      | 服务器返回 HTTP 304 – 未修改。如需避免此错误，请检查与 HTTP 缓存相关的头部信息。 |
| OS-PLUG-FLTR-0010 | Android, iOS      | 服务器返回了 HTTP 错误状态码。 |
| OS-PLUG-FLTR-0011 | Android, iOS, Web | 操作失败并返回错误（通用错误）。 |

在应用程序中处理错误时，你可以通过检查错误码来确定具体问题。错误对象通常包含以下额外信息：

- `code`：错误码（如上表所示）
- `message`：可读的错误描述
- `source`：传输的源（文件路径或 URL）
- `target`：传输的目标（文件路径或 URL）
- `httpStatus`：HTTP 状态码（针对 HTTP 错误）
- `body`：响应体（针对 HTTP 错误）
- `headers`：响应头（针对 HTTP 错误）