---
title: File Transfer Capacitor 插件 API
description: FileTransfer API 提供了下载和上传文件的机制。
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件传输
---

# @capacitor/file-transfer

FileTransfer API 提供了下载和上传文件的机制。

## 安装

```bash
npm install @capacitor/file-transfer
npx cap sync
```

## API

<docgen-index>

- [`downloadFile(...)`](#downloadfile)
- [`uploadFile(...)`](#uploadfile)
- [`addListener('progress', ...)`](#addlistenerprogress-)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#interfaces)

</docgen-index>

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

| 属性           | 类型                 | 描述                                                                                                                                                  | 自版本 |
| -------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**     | <code>string</code>  | 下载文件应移动到的完整文件路径。                                                                                                                      | 1.0.0  |
| **`progress`** | <code>boolean</code> | 如果为 true，每接收到一个数据块都会派发进度事件。更多信息请参阅 addListener()。在 Android/iOS 上，数据块派发会被节流至每 100 毫秒一次以避免性能下降。 | 1.0.0  |

#### UploadFileResult

| 属性               | 类型                                    | 描述                               | 自版本 |
| ------------------ | --------------------------------------- | ---------------------------------- | ------ |
| **`bytesSent`**    | <code>number</code>                     | 已上传的总字节数                   | 1.0.0  |
| **`responseCode`** | <code>string</code>                     | 上传操作的 HTTP 响应码             | 1.0.0  |
| **`response`**     | <code>string</code>                     | 上传操作的 HTTP 响应体（如果可用） | 1.0.0  |
| **`headers`**      | <code>{ [key: string]: string; }</code> | 上传响应的 HTTP 头信息（如果可用） | 1.0.0  |

#### UploadFileOptions

| 属性              | 类型                 | 描述                                                                                                                                                  | 自版本 |
| ----------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**        | <code>string</code>  | 要上传文件的完整路径。                                                                                                                                | 1.0.0  |
| **`blob`**        | <code>Blob</code>    | 要上传的 blob 数据。如果提供了此参数，将优先使用它而不是路径。此属性仅在 Web 平台可用。                                                               | 1.0.0  |
| **`chunkedMode`** | <code>boolean</code> | 是否以分块流模式上传数据。Web 平台不支持。                                                                                                            | 1.0.0  |
| **`mimeType`**    | <code>string</code>  | 要上传数据的 MIME 类型。仅在未提供 "Content-Type" 头信息时使用。                                                                                      | 1.0.0  |
| **`fileKey`**     | <code>string</code>  | 表单元素的类型。默认设置为 "file"。仅在未提供 "Content-Type" 头信息时使用。                                                                           | 1.0.0  |
| **`progress`**    | <code>boolean</code> | 如果为 true，每接收到一个数据块都会派发进度事件。更多信息请参阅 addListener()。在 Android/iOS 上，数据块派发会被节流至每 100 毫秒一次以避免性能下降。 | 1.0.0  |

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
