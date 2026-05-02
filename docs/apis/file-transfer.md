---
title: File Transfer Capacitor Plugin API
description: FileTransfer API 提供了下载和上传文件的机制。
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Transfer
---

# @capacitor/file-transfer

FileTransfer API 提供了下载和上传文件的机制。

## 安装

```bash
npm install @capacitor/file-transfer
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
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息。
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
    // 从 result 中获取服务器响应和其他信息 - 请参阅 `UploadFileResult` 接口
} catch(error) {
    if (error.code === 'OS-PLUG-FLTR-0010') {
      // HTTP 错误 - 有关 `errorData` 中可用字段的详细信息，请参阅 `FileTransferError`
      let errorData = error.data;
      this.showError('上传失败: ' + errorData.httpStatus + '; ' + errorData.body);
    } else {
      // 其他错误 - 使用 `error.code` 和 `error.message` 获取更多信息。
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
* [接口](#接口)

</docgen-index>

注意：部分输入选项来自 `@capacitor/core` 中的 `HttpOptions`，但本插件并未使用 `HttpOptions` 中的所有参数。下面记录了所使用的参数。

有关现有错误代码的列表，请参阅 [错误](#错误)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器执行 HTTP 请求并将文件下载到指定目标。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
要在 Android 和 iOS 上（不适用于 Web）获取有关 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### uploadFile(...)

```typescript
uploadFile(options: UploadFileOptions) => Promise<UploadFileResult>
```

向服务器执行 HTTP 请求以上传文件。

如果服务器返回 HTTP 错误（例如 404、500 等），Promise 将被拒绝。
要在 Android 和 iOS 上（不适用于 Web）获取有关 HTTP 错误响应的信息，请使用 `error.data` 属性中可用的 <a href="#filetransfererror">`FileTransferError`</a> 接口。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#uploadfileoptions">UploadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#uploadfileresult">UploadFileResult</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: "progress", listenerFunc: (progress: ProgressStatus) => void) => Promise<PluginListenerHandle>
```

添加文件传输（下载或上传）进度事件的监听器。

| 参数               | 类型                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                                          |
| **`listenerFunc`** | <code>(progress: <a href="#progressstatus">ProgressStatus</a>) =&gt; void</code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**起始版本:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**起始版本:** 1.0.0

--------------------


### 接口


#### DownloadFileResult

| 属性         | 类型                | 描述                                                          | 起始版本 |
| ---------- | ------------------- | -------------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                 | 1.0.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。此属性仅在 Web 端可用。 | 1.0.0 |#### DownloadFileOptions

| 属性                          | 类型                                                | 描述                                                                                                                                                                                                                                                                         | 始于版本 |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                   | <code>string</code>                                 | 下载文件的 URL 地址。                                                                                                                                                                                                                                                       | 1.0.0 |
| **`path`**                  | <code>string</code>                                 | 下载文件应移动到的完整文件路径。你可以使用 `@capacitor/filesystem` 这样的插件来获取完整的文件路径。                                                                                                                                                                          | 1.0.0 |
| **`progress`**              | <code>boolean</code>                                | 如果为 `true`，则每次接收到数据块时都会派发进度事件。更多信息请参考 `addListener()`。在 Android/iOS 上，为避免性能下降，数据块发送频率限制为每 100 毫秒一次。默认值为 `false`。                                                                                               | 1.0.0 |
| **`method`**                | <code>string</code>                                 | 要执行的 HTTP 请求方法。（默认为 GET）                                                                                                                                                                                                                                       | 1.0.0 |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求中的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                           | 1.0.0 |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code> | 要随请求发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                         | 1.0.0 |
| **`readTimeout`**           | <code>number</code>                                 | 等待读取额外数据的时长，单位为毫秒。每次接收到新数据时都会重置。默认值为 60,000 毫秒（1 分钟）。不支持 Web 平台。                                                                                                                                                               | 1.0.0 |
| **`connectTimeout`**        | <code>number</code>                                 | 等待初始连接的时长，单位为毫秒。默认值为 60,000 毫秒（1 分钟）。在 iOS 上，`connectTimeout` 和 `readTimeout` 没有实际区别。插件会尝试使用 `connectTimeout`，如果不存在则使用 `readTimeout`，如果两者都不存在则使用默认值。                                                   | 1.0.0 |
| **`disableRedirects`**      | <code>boolean</code>                                | 设置是否应禁用自动 HTTP 重定向。                                                                                                                                                                                                                                            | 1.0.0 |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                | 如果你需要在某些情况下（如 URL 已编码、Azure/Firebase 测试等）保持 URL 不编码，请使用此选项。默认值为 `true`。不支持 Web 平台。                                                                                                                                              | 1.0.0 |


#### HttpParams


#### HttpHeaders


#### UploadFileResult

| 属性               | 类型                                    | 描述                                            | 始于版本 |
| ------------------ | --------------------------------------- | ------------------------------------------------------ | ----- |
| **`bytesSent`**    | <code>number</code>                     | 总共上传的字节数                         | 1.0.0 |
| **`responseCode`** | <code>string</code>                     | 上传操作的 HTTP 响应码                      | 1.0.0 |
| **`response`**     | <code>string</code>                     | 上传操作的 HTTP 响应体（当可用时）    | 1.0.0 |
| **`headers`**      | <code>{ [key: string]: string; }</code> | 上传响应的 HTTP 响应头（当可用时） | 1.0.0 |#### UploadFileOptions

| 属性                        | 类型                                                | 描述                                                                                                                                                                                                                                                                                                                                                                                               | 引入版本 |
| --------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`url`**                   | <code>string</code>                                 | 文件上传的目标 URL。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0    |
| **`path`**                  | <code>string</code>                                 | 要上传文件的完整路径。你可以使用类似 `@capacitor/filesystem` 的插件来获取完整的文件路径。                                                                                                                                                                                                                                                                                                           | 1.0.0    |
| **`blob`**                  | <code>Blob</code>                                   | 要上传的 Blob 数据。如果提供了此参数，将优先使用它而不是路径。此特性仅在 Web 端可用。                                                                                                                                                                                                                                                                                                              | 1.0.0    |
| **`chunkedMode`**           | <code>boolean</code>                                | 是否以分块流式传输模式上传数据。Web 端不支持。注意：当 `chunkedMode` 为 `true` 时，上传使用 `Content-Type: multipart/form-data`。根据你的后端服务器配置，这可能导致上传失败。如果你的服务器期望原始数据流（例如 `application/octet-stream`），你必须在 `headers` 中显式设置 `Content-Type` 请求头。                                                                                                   | 1.0.0    |
| **`mimeType`**              | <code>string</code>                                 | 要上传数据的 MIME 类型。仅在未提供 "Content-Type" 请求头时使用。                                                                                                                                                                                                                                                                                                                                   | 1.0.0    |
| **`fileKey`**               | <code>string</code>                                 | 表单元素的类型。默认设置为 "file"。仅在未提供 "Content-Type" 请求头时使用。                                                                                                                                                                                                                                                                                                                        | 1.0.0    |
| **`progress`**              | <code>boolean</code>                                | 如果为 `true`，每接收到一个数据块都会派发进度事件。更多信息请参阅 `addListener()`。在 Android/iOS 上，事件会节流至每 100 毫秒触发一次，以避免性能下降。默认为 `false`。                                                                                                                                                                                                                            | 1.0.0    |
| **`method`**                | <code>string</code>                                 | 要执行的 HTTP 请求方法。（默认是 POST）                                                                                                                                                                                                                                                                                                                                                            | 1.0.0    |
| **`params`**                | <code><a href="#httpparams">HttpParams</a></code>   | 要附加到请求的 URL 参数。此 <a href="#httpparams">`HttpParams`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                                                                                                    | 1.0.0    |
| **`headers`**               | <code><a href="#httpheaders">HttpHeaders</a></code> | 随请求一起发送的 HTTP 请求头。此 <a href="#httpheaders">`HttpHeaders`</a> 接口来自 `@capacitor/core`。                                                                                                                                                                                                                                                                                             | 1.0.0    |
| **`readTimeout`**           | <code>number</code>                                 | 等待读取更多数据的时长，单位为毫秒。每次接收到新数据时重置。默认为 60,000 毫秒（1 分钟）。Web 端不支持。                                                                                                                                                                                                                                                                                           | 1.0.0    |
| **`connectTimeout`**        | <code>number</code>                                 | 等待初始连接的时长，单位为毫秒。默认为 60,000 毫秒（1 分钟）。Web 端不支持。在 iOS 中，`connectTimeout` 和 `readTimeout` 没有真正的区别。插件会尝试使用 `connectTimeout`，如果未设置则使用 `readTimeout`，如果都未设置则使用默认值。                                                                                                                                                                 | 1.0.0    |
| **`disableRedirects`**      | <code>boolean</code>                                | 设置是否应禁用自动 HTTP 重定向。Web 端不支持。                                                                                                                                                                                                                                                                                                                                                     | 1.0.0    |
| **`shouldEncodeUrlParams`** | <code>boolean</code>                                | 如果你需要在某些情况下保持 URL 不编码（例如已经编码过、Azure/Firebase 测试等），请使用此选项。默认值为 `true`。Web 端不支持。                                                                                                                                                                                                                                                                      | 1.0.0    |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |#### ProgressStatus

| 属性名称            | 类型                                | 描述                                                                                                                         | 始于版本 |
| ------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`type`**          | <code>'download' \| 'upload'</code> | 传输操作的类型（下载或上传）。                                                                                               | 1.0.0    |
| **`url`**           | <code>string</code>                 | 与传输相关的文件地址（下载或上传）。                                                                                         | 1.0.0    |
| **`bytes`**         | <code>number</code>                 | 迄今为止已传输的字节数。                                                                                                     | 1.0.0    |
| **`contentLength`** | <code>number</code>                 | 文件传输关联的总字节数。                                                                                                     | 1.0.0    |
| **`lengthComputable`** | <code>boolean</code>            | 指示 contentLength 的值是否有效。在某些情况下，可能无法确定总字节数。                                                        | 1.0.0    |

#### FileTransferError

| 属性名称        | 类型                                    | 描述                                                                             | 始于版本 |
| --------------- | --------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| **`code`**      | <code>string</code>                     | 错误标识码：OS-PLUG-FLTR-XXXX                                                    | 1.0.0    |
| **`message`**   | <code>string</code>                     | 描述错误原因的信息                                                               | 1.0.0    |
| **`source`**    | <code>string</code>                     | 文件传输操作的源（下载时为 URL，上传时为文件路径）                               | 1.0.0    |
| **`target`**    | <code>string</code>                     | 文件传输操作的目标（下载时为文件路径，上传时为 URL）                             | 1.0.0    |
| **`httpStatus`**| <code>number</code>                     | 服务器响应的 HTTP 状态码（如果可用）                                             | 1.0.0    |
| **`headers`**   | <code>{ [key: string]: string; }</code> | 服务器响应的 HTTP 头部信息（如果可用）                                           | 1.0.0    |
| **`body`**      | <code>string</code>                     | 服务器返回的 HTTP 错误响应体（如果可用）                                         | 1.0.0    |
| **`exception`** | <code>string</code>                     | 原生端抛出的异常信息（如果可用）                                                 | 1.0.0    |

<span id="downloadfileoptions"></span>
<span id="progressstatus"></span>
<span id="uploadfileoptions"></span>
<span id="downloadfileoptions"></span>
<span id="progressstatus"></span>
<span id="uploadfileoptions"></span>
<span id="downloadfileoptions"></span>
<span id="progressstatus"></span>
<span id="uploadfileoptions"></span>
<span id="downloadfileoptions"></span>
<span id="progressstatus"></span>
<span id="uploadfileoptions"></span>
<span id="downloadfileoptions"></span>
<span id="progressstatus"></span>
<span id="uploadfileoptions"></span>
</docgen-api>

### 错误处理
该插件在 iOS、Android 和 Web 平台上会返回以下特定代码的错误：

| 错误代码           | 平台                 | 描述                                                                 |
| ------------------ | -------------------- | -------------------------------------------------------------------- |
| OS-PLUG-FLTR-0004  | Android, iOS         | 方法输入参数无效。                                                   |
| OS-PLUG-FLTR-0005  | Android, iOS         | 提供的服务器 URL 无效或 URL 为空。                                   |
| OS-PLUG-FLTR-0006  | Android, iOS         | 无法执行操作，用户拒绝了权限请求。                                   |
| OS-PLUG-FLTR-0007  | Android, iOS         | 操作失败，因为文件不存在。                                           |
| OS-PLUG-FLTR-0008  | Android, iOS, Web    | 连接服务器失败。                                                     |
| OS-PLUG-FLTR-0009  | Android, iOS         | 服务器响应了 HTTP 304 – 未修改。若要避免此错误，请检查与 HTTP 缓存相关的头部设置。 |
| OS-PLUG-FLTR-0010  | Android, iOS         | 服务器响应了 HTTP 错误状态码。                                       |
| OS-PLUG-FLTR-0011  | Android, iOS, Web    | 操作失败并返回错误（通用错误）。                                     |

在您的应用程序中处理错误时，可以检查错误代码以确定具体问题。错误对象通常包含以下额外信息：

- `code`：错误代码（如上表所示）
- `message`：人类可读的错误描述
- `source`：传输的源（文件路径或 URL）
- `target`：传输的目标（文件路径或 URL）
- `httpStatus`：HTTP 状态码（针对 HTTP 错误）
- `body`：响应体（针对 HTTP 错误）
- `headers`：响应头部（针对 HTTP 错误）