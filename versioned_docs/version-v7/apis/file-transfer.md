---
title: File Transfer Capacitor 插件 API
description: FileTransfer API 提供了下载和上传文件的机制。
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/1.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件传输
---

# @capacitor/file-transfer

FileTransfer API 提供了下载和上传文件的机制。

## 安装

```bash
npm install @capacitor/file-transfer@latest-7
npx cap sync
```

## Example

### Download

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// First get the full file path using Filesystem
const fileInfo = await Filesystem.getUri({
  directory: Directory.Data,
  path: 'downloaded-file.pdf'
});

try {
    // Then use the FileTransfer plugin to download
    await FileTransfer.downloadFile({
        url: 'https://example.com/file.pdf',
        path: fileInfo.uri,
        progress: true
    });
} catch(error) {
    // handle error - see `FileTransferError` interface for what error information is returned
}

// Progress events
FileTransfer.addListener('progress', (progress) => {
  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);
});
```

### Upload

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// First get the full file path using Filesystem
const fileInfo = await Filesystem.getUri({
  directory: Directory.Cache,
  path: 'image_upload.png'
});

try {
    // Then use the FileTransfer plugin to upload
    const result = await FileTransfer.downloadFile({
        url: 'https://example.com/upload_api',
        path: fileInfo.uri,
        chunkedMode: true,
        headers: {
            // Upload uses `multipart/form-data` by default.
            // If you want to avoid that, you can set the 'Content-Type' header explicitly.
            'Content-Type': 'application/octet-stream',
        },
        progress: false
    });
    // get server response and other info from result - see `UploadFileResult` interface
} catch(error) {
    // handle error - see `FileTransferError` interface for what error information is returned
}
```


## API

<docgen-index>

- [`downloadFile(...)`](#downloadfile)
- [`uploadFile(...)`](#uploadfile)
- [`addListener('progress', ...)`](#addlistenerprogress-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)

</docgen-index>

Note: Some of the input options come from `HttpOptions` in `@capacitor/core`, but the plugin does not use all parameters from `HttpOptions`. The ones that are used are documented below.

For list of existing error codes, see [Errors](#errors).

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并将文件下载到指定位置。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自版本：** 1.0.0

---

### uploadFile(...)

```typescript
uploadFile(options: UploadFileOptions) => Promise<UploadFileResult>
```

执行 HTTP 请求将文件上传到服务器

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#uploadfileoptions">UploadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#uploadfileresult">UploadFileResult</a>&gt;</code>

**自版本：** 1.0.0

---

### addListener('progress', ...)

```typescript
addListener(eventName: "progress", listenerFunc: (progress: ProgressStatus) => void) => Promise<PluginListenerHandle>
```

添加文件传输（下载或上传）进度事件的监听器。

| 参数               | 类型                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                                          |
| **`listenerFunc`** | <code>(progress: <a href="#progressstatus">ProgressStatus</a>) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

---

### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**自版本：** 1.0.0

---

### Interfaces

#### DownloadFileResult

| 属性       | 类型                | 描述                                            | 自版本 |
| ---------- | ------------------- | ----------------------------------------------- | ------ |
| **`path`** | <code>string</code> | 文件下载到的路径。                              | 1.0.0  |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。此属性仅在 Web 平台可用。 | 1.0.0  |

#### DownloadFileOptions

| 属性（Prop）                | 类型（Type）                                        | 描述（Description）                                                                                                                                                                                                                                                        | 起始版本（Since） |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **`url`**                   | <code>string</code>（字符串）                       | 用于下载文件的 URL。                                                                                                                                                                                                                                                       | 1.0.0             |
| **`path`**                  | <code>string</code>（字符串）                       | 下载文件应移动到的完整文件路径。你可以使用 `@capacitor/filesystem` 这类插件来获取完整文件路径。                                                                                                                                                                             | 1.0.0             |
| **`progress`**              | <code>boolean</code>（布尔值）                      | 若为 `true`，则每接收到一个数据块（chunk）时都会触发进度事件（progress event）。更多信息可查看 `addListener()` 方法。在 Android/iOS 平台上，为避免性能下降，数据块触发频率会限制为每 100 毫秒一次。默认值为 `false`。                                                                 | 1.0.0             |
| **`method`**                | <code>string</code>（字符串）                       | 要执行的 HTTP 请求方法。（默认值为 GET）                                                                                                                                                                                                                                   | 1.0.0             |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求中的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                           | 1.0.0             |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code> | 要随请求一起发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                     | 1.0.0             |
| **`readTimeout`**           | <code>number</code>（数字）                         | 等待读取额外数据的时长（以毫秒为单位）。每次接收到新数据时，该时长会重置。默认值为 60,000 毫秒（1 分钟）。Web 平台不支持此属性。                                                                                                                                              | 1.0.0             |
| **`connectTimeout`**        | <code>number</code>（数字）                         | 等待初始连接的时长（以毫秒为单位）。默认值为 60,000 毫秒（1 分钟）。在 iOS 平台上，`connectTimeout`（连接超时）与 `readTimeout`（读取超时）并无实质区别：插件会优先尝试使用 `connectTimeout`，若不可用则使用 `readTimeout`，若两者均不可用则使用默认值。                              | 1.0.0             |
| **`disableRedirects`**      | <code>boolean</code>（布尔值）                      | 设置是否应禁用 HTTP 自动重定向。                                                                                                                                                                                                                                           | 1.0.0             |
| **`shouldEncodeUrlParams`** | <code>boolean</code>（布尔值）                      | 若你需要在特定场景下保持 URL 不编码（如 URL 已编码、进行 Azure/Firebase 测试等），可使用此选项。默认值为 `true`（即默认编码）。Web 平台不支持此属性。                                                                                                                        | 1.0.0             |


#### HttpParams


#### HttpHeaders


#### UploadFileResult

| 属性               | 类型                                    | 描述                               | 自版本 |
| ------------------ | --------------------------------------- | ---------------------------------- | ------ |
| **`bytesSent`**    | <code>number</code>                     | 已上传的总字节数                   | 1.0.0  |
| **`responseCode`** | <code>string</code>                     | 上传操作的 HTTP 响应码             | 1.0.0  |
| **`response`**     | <code>string</code>                     | 上传操作的 HTTP 响应体（如果可用） | 1.0.0  |
| **`headers`**      | <code>{ [key: string]: string; }</code> | 上传响应的 HTTP 头信息（如果可用） | 1.0.0  |

#### UploadFileOptions

| 属性（Prop）                | 类型（Type）                                        | 描述（Description）                                                                                                                                                                                                                                                                                                                                                                    | 起始版本（Since） |
| --------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **`url`**                   | <code>string</code>（字符串）                       | 用于上传文件的 URL。                                                                                                                                                                                                                                                                                                                                                                   | 1.0.0             |
| **`path`**                  | <code>string</code>（字符串）                       | 待上传文件的完整文件路径。你可使用 `@capacitor/filesystem` 这类插件获取完整文件路径。                                                                                                                                                                                                                                 | 1.0.0             |
| **`blob`**                  | <code>Blob</code>（二进制大对象）                   | 待上传的 Blob 数据。若提供该参数，将优先使用 Blob 数据而非文件路径。此属性仅在 Web 平台可用。                                                                                                                                                                                                                          | 1.0.0             |
| **`chunkedMode`**           | <code>boolean</code>（布尔值）                      | 是否以分块流模式（chunked streaming mode）上传数据。Web 平台不支持此属性。<br>**注意**：当 `chunkedMode` 设为 `true` 时，上传请求将使用 `Content-Type: multipart/form-data`（多部分表单数据类型）。根据后端服务器的配置，这可能导致上传失败。若你的服务器期望接收原始流数据（例如 `application/octet-stream`，二进制流类型），则必须在 `headers`（请求头）中显式设置 `Content-Type` 头信息。 | 1.0.0             |
| **`mimeType`**              | <code>string</code>（字符串）                       | 待上传数据的 MIME 类型（多用途互联网邮件扩展类型）。仅在未提供 "Content-Type"（内容类型）请求头时生效。                                                                                                                                                                                                                  | 1.0.0             |
| **`fileKey`**               | <code>string</code>（字符串）                       | 表单元素类型。默认值设为 "file"（文件）。仅在未提供 "Content-Type" 请求头时生效。                                                                                                                                                                                                                                      | 1.0.0             |
| **`progress`**              | <code>boolean</code>（布尔值）                      | 若设为 `true`，则每接收到一个数据块（chunk）时都会触发进度事件（progress event）。更多详情可参考 `addListener()` 方法。在 Android/iOS 平台上，为避免性能下降，数据块触发频率会限制为每 100 毫秒一次。默认值为 `false`。                                                                                                  | 1.0.0             |
| **`method`**                | <code>string</code>（字符串）                       | 要执行的 HTTP 请求方法。（默认值为 POST）                                                                                                                                                                                                                                                                                                                                            | 1.0.0             |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求中的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                       | 1.0.0             |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code> | 要随请求一同发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                 | 1.0.0             |
| **`readTimeout`**           | <code>number</code>（数字）                         | 等待读取额外数据的时长（单位：毫秒）。每次接收到新数据时，该时长会重置。默认值为 60,000 毫秒（1 分钟）。Web 平台不支持此属性。                                                                                                                                                                                            | 1.0.0             |
| **`connectTimeout`**        | <code>number</code>（数字）                         | 等待初始连接的时长（单位：毫秒）。默认值为 60,000 毫秒（1 分钟）。Web 平台不支持此属性。在 iOS 平台上，`connectTimeout`（连接超时）与 `readTimeout`（读取超时）并无实质区别：插件会优先尝试使用 `connectTimeout`，若不可用则使用 `readTimeout`，若两者均不可用则使用默认值。                                                  | 1.0.0             |
| **`disableRedirects`**      | <code>boolean</code>（布尔值）                      | 设置是否应禁用 HTTP 自动重定向。Web 平台不支持此属性。                                                                                                                                                                                                                                                                    | 1.0.0             |
| **`shouldEncodeUrlParams`** | <code>boolean</code>（布尔值）                      | 若需在特定场景下保持 URL 不编码（如 URL 已预先编码、进行 Azure/Firebase 测试等），可使用此选项。默认值为 `true`（即默认对 URL 参数进行编码）。Web 平台不支持此属性。                                                                                                                                                        | 1.0.0             |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ProgressStatus

| 属性                   | 类型                                | 描述                                                           | 自版本 |
| ---------------------- | ----------------------------------- | -------------------------------------------------------------- | ------ |
| **`type`**             | <code>'download' \| 'upload'</code> | 传输操作的类型（下载或上传）。                                 | 1.0.0  |
| **`url`**              | <code>string</code>                 | 与传输（下载或上传）关联的文件 URL。                           | 1.0.0  |
| **`bytes`**            | <code>number</code>                 | 到目前为止已传输的字节数。                                     | 1.0.0  |
| **`contentLength`**    | <code>number</code>                 | 与文件传输关联的总字节数。                                     | 1.0.0  |
| **`lengthComputable`** | <code>boolean</code>                | contentLength 值是否相关。在某些情况下，可能无法确定总字节数。 | 1.0.0  |

</docgen-api>

### 错误信息

该插件在 iOS、Android 和 Web 平台上会返回以下特定代码的错误：

| 错误代码          | 平台              | 描述                                                                             |
| ----------------- | ----------------- | -------------------------------------------------------------------------------- |
| OS-PLUG-FLTR-0004 | Android, iOS      | 方法的输入参数无效。                                                             |
| OS-PLUG-FLTR-0005 | Android, iOS      | 提供了无效的服务器 URL 或 URL 为空。                                             |
| OS-PLUG-FLTR-0006 | Android, iOS      | 无法执行操作，用户拒绝了权限请求。                                               |
| OS-PLUG-FLTR-0007 | Android, iOS      | 操作失败，因为文件不存在。                                                       |
| OS-PLUG-FLTR-0008 | Android, iOS, Web | 连接到服务器失败。                                                               |
| OS-PLUG-FLTR-0009 | Android, iOS      | 服务器响应 HTTP 304 – 未修改。如果想避免此错误，请检查与 HTTP 缓存相关的头信息。 |
| OS-PLUG-FLTR-0010 | Android, iOS      | 服务器响应了 HTTP 错误状态码。                                                   |
| OS-PLUG-FLTR-0011 | Android, iOS, Web | 操作失败并出现错误（通用错误）。                                                 |

在应用程序中处理错误时，您可以检查错误代码以确定具体问题。错误对象通常包含以下附加信息：

- `code`：错误代码（如上表所示）
- `message`：人类可读的错误描述
- `source`：传输的源（文件路径或 URL）
- `target`：传输的目标（文件路径或 URL）
- `httpStatus`：HTTP 状态码（针对 HTTP 错误）
- `body`：响应体（针对 HTTP 错误）
- `headers`：响应头信息（针对 HTTP 错误）
