---
title: Filesystem Capacitor 插件 API
description: Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上操作文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件系统
translated: true
source_hash: 355644dc
---

# @capacitor/filesystem

Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上操作文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple 隐私清单要求

Apple 规定应用开发者现在必须为 API 使用指定已批准的原因，以增强用户隐私。截至 2024 年 5 月 1 日，在向 App Store Connect 提交应用时，需要包含这些原因。

在应用中使用此特定插件时，你必须在 `/ios/App` 中创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展生成它，并指定使用原因。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的原因是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### 示例 PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，请将此字典条目添加到数组中 -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>C617.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## 从 downloadFile 迁移到 File Transfer 插件

从 7.1.0 版本开始，Filesystem 插件中的 `downloadFile` 功能已被弃用，推荐使用新的 [@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer) 插件。

### 安装 File Transfer 插件

```bash
npm install @capacitor/file-transfer
npx cap sync
```

### 迁移示例

之前（使用 Filesystem 插件）：

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

await Filesystem.downloadFile({
  url: 'https://example.com/file.pdf',
  path: 'downloaded-file.pdf',
  directory: Directory.Documents,
  progress: true
});

// 进度事件
Filesystem.addListener('progress', (progress) => {
  console.log(`已下载 ${progress.bytes} / ${progress.contentLength}`);
});
```

之后（使用 File Transfer 插件）：

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// 首先使用 Filesystem 获取完整文件路径
const fileInfo = await Filesystem.getUri({
  directory: Directory.Documents,
  path: 'downloaded-file.pdf'
});

// 然后使用 FileTransfer 插件进行下载
await FileTransfer.downloadFile({
  url: 'https://example.com/file.pdf',
  path: fileInfo.uri,
  progress: true
});

// 进度事件
FileTransfer.addListener('progress', (progress) => {
  console.log(`已下载 ${progress.bytes} / ${progress.contentLength}`);
});
```

File Transfer 插件提供了更高的可靠性、更好的错误处理（带有特定的错误代码），并且还增加了上传功能。

## iOS

要使文件显示在"文件"应用中，你还需要在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled`（Application supports iTunes file sharing）
- `LSSupportsOpeningDocumentsInPlace`（Supports opening documents in place）

阅读有关[配置 iOS](https://capacitorjs.com/docs/ios/configuration) 的帮助信息。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本上，此 API 需要在你的 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

请在 [Android 指南](https://capacitorjs.com/docs/android) 中阅读有关[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 的更多信息，了解如何设置 Android 权限。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 及更早版本上可用，而在 Android 11 及更新版本上，<a href="#directory">`Directory.Documents`</a> 只允许访问你的应用创建的文件/文件夹。

处理大文件时，可能需要在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 在文件之间还有额外的分层，例如备份到云端的特殊目录，或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作限定到设备上的特定特殊目录。

此外，Filesystem API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: "secrets/text.txt",
    data: "这是一个测试",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log("秘密文件：", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 以下是如何使用完整文件路径读取文件的示例。使用此方法
  // 可以从返回文件 URI 的插件（如 Camera）读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("数据：", contents);
};

const appendBinaryData = async () => {
  // 以下是如何追加二进制数据的示例，数据应以 base64 编码形式发送给插件，
  // 且不提供任何 `Encoding`。
  await Filesystem.appendFile({
    path: "file.bin",
    directory: Directory.Cache,
    data: "VGhpcyBpcyBtZWFudCB0byByZXByZXNlbnQgYSBCaW5hcnkgRGF0YSBleGFtcGxlIGVuY29kZWQgaW4gQmFzZTY0Lg=="
  });
};
```

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`readFile(...)`](#readfile)
* [`readFileInChunks(...)`](#readfileinchunks)
* [`writeFile(...)`](#writefile)
* [`appendFile(...)`](#appendfile)
* [`deleteFile(...)`](#deletefile)
* [`mkdir(...)`](#mkdir)
* [`rmdir(...)`](#rmdir)
* [`readdir(...)`](#readdir)
* [`getUri(...)`](#geturi)
* [`stat(...)`](#stat)
* [`rename(...)`](#rename)
* [`copy(...)`](#copy)
* [`downloadFile(...)`](#downloadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

有关现有错误代码列表，请参阅[错误](#错误)。

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读/写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读/写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

从磁盘分块读取文件。
仅限原生（在 Web 上不可用）。
使用回调接收每个读取的数据块。
如果返回空数据块，则表示文件已完全读取。

| 参数            | 类型                                                                          |
| --------------- | ----------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`**  | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**返回值:** <code>Promise&lt;string&gt;</code>

**自版本:** 7.1.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备上的指定位置

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备上的指定位置追加到文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自版本:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自版本:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建一个目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自版本:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除一个目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自版本:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自版本:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

执行 HTTP 请求到服务器并将文件下载到指定的目标位置。

此方法自 7.1.0 版本起已弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自版本:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件的监听器。

此方法自 7.1.0 版本起已弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

| 参数                | 类型                                                          |
| ------------------- | ------------------------------------------------------------- |
| **`eventName`**     | <code>'progress'</code>                                       |
| **`listenerFunc`**  | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器。

此方法自 7.1.0 版本起已弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

**自版本:** 5.2.0

--------------------


### 接口


#### PermissionStatus

| 属性                  | 类型                                                        |
| --------------------- | ----------------------------------------------------------- |
| **`publicStorage`**   | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| 属性       | 类型                        | 描述                                                                                                                                      | 自版本 |
| ---------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | 文件中包含的数据的表示。注意：Blob 仅在 Web 上可用。在原生平台上，数据以字符串形式返回。                                                    | 1.0.0 |


#### ReadFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                                                                                              | 默认值           | 自版本 |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----- |
| **`path`**        | <code>string</code>                             | 要读取的文件路径                                                                                                                                                                                                                   |                 | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要从中读取文件的 <a href="#directory">`Directory`</a>                                                                                                                                                                              |                 | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码，如果未提供，则以二进制形式读取数据并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串读取                                                                                    |                 | 1.0.0 |
| **`offset`**      | <code>number</code>                             | 开始读取文件的字节偏移量。仅限原生（在 Web 上不可用）。可与 length 结合使用以部分读取文件。                                                                                                                                        | <code>0</code>  | 8.1.0 |
| **`length`**      | <code>number</code>                             | 要读取的数据长度（字节）。任何非正值均表示读取到文件末尾。仅限原生（在 Web 上不可用）。可与 offset 结合使用以部分读取文件。                                                                                                        | <code>-1</code> | 8.1.0 |


#### ReadFileInChunksOptions

| 属性            | 类型                | 描述                  | 自版本 |
| --------------- | ------------------- | --------------------- | ----- |
| **`chunkSize`** | <code>number</code> | 数据块的大小（字节）。 | 7.1.0 |


#### WriteFileResult

| 属性      | 类型                | 描述                             | 自版本 |
| --------- | ------------------- | -------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件写入的目标 URI               | 1.0.0 |


#### WriteFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                                                                                                                                                                                                                          | 默认值              | 自版本 |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**        | <code>string</code>                             | 要写入的文件路径                                                                                                                                                                                                                                                                                                                                              |                    | 1.0.0 |
| **`data`**        | <code>string \| Blob</code>                     | 要写入的数据。注意：Blob 数据仅在 Web 上支持。                                                                                                                                                                                                                                                                                                                |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要存储文件的 <a href="#directory">`Directory`</a>                                                                                                                                                                                                                                                                                                             |                    | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，将写入二进制数据。为此，你必须以 base64 编码提供数据，以便插件在写入磁盘前进行解码。如果你未提供编码且使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串写入                                                                                                                |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                                                                                                                                                                    | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                                                                                                                                                                                                                            | 自版本 |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>                             | 要追加的文件路径                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`data`**        | <code>string</code>                             | 要追加的数据                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要存储文件的 <a href="#directory">`Directory`</a>                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 追加文件时使用的编码。如果未提供，将以二进制形式追加数据。为此，你必须以 base64 编码提供数据，以便插件在写入磁盘前进行解码。如果你未提供编码且使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串写入                                                                                                          | 1.0.0 |


#### DeleteFileOptions

| 属性              | 类型                                            | 描述                                                          | 自版本 |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>                             | 要删除的文件路径                                                | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要从中删除文件的 <a href="#directory">`Directory`</a>          | 1.0.0 |


#### MkdirOptions

| 属性              | 类型                                            | 描述                                                               | 默认值              | 自版本 |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------ | ----- |
| **`path`**        | <code>string</code>                             | 新目录的路径                                                         |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 在其中创建新目录的 <a href="#directory">`Directory`</a>              |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否同时创建任何缺失的父目录。                                        | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性              | 类型                                            | 描述                                                               | 默认值              | 自版本 |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------ | ----- |
| **`path`**        | <code>string</code>                             | 要删除的目录路径                                                     |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要从中删除目录的 <a href="#directory">`Directory`</a>                |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否递归删除目录的内容                                                | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性        | 类型                    | 描述                                            | 自版本 |
| ----------- | ----------------------- | ----------------------------------------------- | ----- |
| **`files`** | <code>FileInfo[]</code> | 目录内的文件和目录列表                           | 1.0.0 |


#### FileInfo

| 属性        | 类型                               | 描述                                                                              | 自版本 |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------- | ----- |
| **`name`**  | <code>string</code>                | 文件或目录的名称。                                                                  | 7.1.0 |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件的类型。                                                                        | 4.0.0 |
| **`size`**  | <code>number</code>                | 文件的大小（字节）。                                                                | 4.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在 Android 7 及更早版本的设备上不可用。                           | 7.1.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）。                                                              | 7.1.0 |
| **`uri`**   | <code>string</code>                | 文件的 URI。                                                                        | 4.0.0 |


#### ReaddirOptions

| 属性              | 类型                                            | 描述                                                     | 自版本 |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>                             | 要读取的目录路径                                           | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要从中列出文件的 <a href="#directory">`Directory`</a>     | 1.0.0 |


#### GetUriResult

| 属性      | 类型                | 描述             | 自版本 |
| --------- | ------------------- | ---------------- | ----- |
| **`uri`** | <code>string</code> | 文件的 URI        | 1.0.0 |


#### GetUriOptions

| 属性              | 类型                                            | 描述                                                        | 自版本 |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>                             | 要获取 URI 的文件路径                                         | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a>              | 1.0.0 |


#### StatOptions

| 属性              | 类型                                            | 描述                                                        | 自版本 |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>                             | 要获取数据的文件路径                                           | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a>              | 1.0.0 |


#### CopyOptions

| 属性                | 类型                                            | 描述                                                                                                                                                      | 自版本 |
| ------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`from`**          | <code>string</code>                             | 现有的文件或目录                                                                                                                                           | 1.0.0 |
| **`to`**            | <code>string</code>                             | 目标文件或目录                                                                                                                                             | 1.0.0 |
| **`directory`**     | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                                                                                  | 1.0.0 |
| **`toDirectory`**   | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，将使用 'directory' 参数作为目标                                                        | 1.0.0 |


#### CopyResult

| 属性      | 类型                | 描述                              | 自版本 |
| --------- | ------------------- | --------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件被复制到的 URI                 | 4.0.0 |


#### DownloadFileResult

| 属性       | 类型                | 描述                                                              | 自版本 |
| ---------- | ------------------- | ----------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                                   | 5.1.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。仅在 Web 上可用。                              | 5.1.0 |


#### DownloadFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                                                                                          | 默认值              | 自版本 |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**        | <code>string</code>                             | 下载文件应移动到的路径。                                                                                                                                                                                                      |                    | 5.1.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 要将文件写入的目录。如果使用此选项，filePath 可以是相对路径而非绝对路径。默认值为 `DATA` 目录。                                                                                                                               |                    | 5.1.0 |
| **`progress`**    | <code>boolean</code>                            | 一个可选的监听器函数，用于接收下载进度事件。如果使用此选项，应在接收到每个数据块时分发进度事件。在 Android/iOS 上，数据块每 100ms 节流一次以避免性能下降。                                                                     |                    | 5.1.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                                    | <code>false</code> | 5.1.2 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性                  | 类型                | 描述                                              | 自版本 |
| --------------------- | ------------------- | ------------------------------------------------- | ----- |
| **`url`**             | <code>string</code> | 正在下载的文件的 URL。                              | 5.1.0 |
| **`bytes`**           | <code>number</code> | 目前已下载的字节数。                                | 5.1.0 |
| **`contentLength`**   | <code>number</code> | 此文件需要下载的总字节数。                          | 5.1.0 |


### 类型别名


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### ReadFileInChunksCallback

用于接收从文件读取的数据块的回调，如果出错则返回错误。

<code>(chunkRead: <a href="#readfileresult">ReadFileResult</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### StatResult

<code><a href="#fileinfo">FileInfo</a></code>


#### RenameOptions

<code><a href="#copyoptions">CopyOptions</a></code>


#### ProgressListener

接收进度事件的监听器函数。

<code>(progress: <a href="#progressstatus">ProgressStatus</a>): void</code>


### 枚举


#### Directory

| 成员                   | 值                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 自版本 |
| ---------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Documents`**        | <code>'DOCUMENTS'</code>         | 文档目录。在 iOS 上，它是应用的 documents 目录。使用此目录存储用户生成的内容。在 Android 上，它是公共 Documents 文件夹，因此其他应用可以访问。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储。在 Android 11 或更新版本上，应用只能访问其创建的文件/文件夹。                                                              | 1.0.0 |
| **`Data`**             | <code>'DATA'</code>              | 数据目录。在 iOS 上，将使用 Documents 目录。在 Android 上，它是存放应用程序文件的目录。卸载应用程序时，文件将被删除。                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`Library`**          | <code>'LIBRARY'</code>           | Library 目录。在 iOS 上，将使用 Library 目录。在 Android 上，它是存放应用程序文件的目录。卸载应用程序时，文件将被删除。                                                                                                                                                                                                                                                                                                                                                                     | 1.1.0 |
| **`Cache`**            | <code>'CACHE'</code>             | 缓存目录。在内存不足的情况下可能会被删除，因此使用此目录编写应用特定的、可以轻松重新创建的文件。                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`External`**         | <code>'EXTERNAL'</code>          | 外部目录。在 iOS 上，将使用 Documents 目录。在 Android 上，它是主共享/外部存储设备上的目录，应用程序可以在其中放置其拥有的持久文件。这些文件对应用来说是内部的，通常不对用户可见。卸载应用程序时，文件将被删除。                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`ExternalStorage`**  | <code>'EXTERNAL_STORAGE'</code>  | 外部存储目录。在 iOS 上，将使用 Documents 目录。在 Android 上，它是主共享/外部存储目录。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储。在 Android 11 或更新版本上不可访问。                                                                                                                                                                                                 | 1.0.0 |
| **`ExternalCache`**    | <code>'EXTERNAL_CACHE'</code>    | 外部缓存目录。在 iOS 上，将使用 Documents 目录。在 Android 上，它是主共享/外部缓存。                                                                                                                                                                                                                                                                                                                                                                                                        | 7.1.0 |
| **`LibraryNoCloud`**   | <code>'LIBRARY_NO_CLOUD'</code>  | 没有云备份的 Library 目录。在 iOS 上使用。在 Android 上，它是存放应用程序文件的目录。                                                                                                                                                                                                                                                                                                                                                                                                       | 7.1.0 |
| **`Temporary`**        | <code>'TEMPORARY'</code>         | iOS 的临时目录。在 Android 上，它是存放应用程序缓存的目录。                                                                                                                                                                                                                                                                                                                                                                                                                                 | 7.1.0 |


#### Encoding

| 成员       | 值                    | 描述                                                                                                                              | 自版本 |
| ---------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`UTF8`** | <code>'utf8'</code>   | 八位 UCS 转换格式（UTF-8）                                                                                                        | 1.0.0 |
| **`ASCII`**| <code>'ascii'</code>  | 七位 ASCII，即 ISO646-US，即 Unicode 字符集的基本拉丁块。此编码仅在 Android 上支持。                                               | 1.0.0 |
| **`UTF16`**| <code>'utf16'</code>  | 十六位 UCS 转换格式（UTF-16），字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上支持。                                       | 1.0.0 |

</docgen-api>

### 错误

自 7.1.0 版本起，该插件在原生 Android 和 iOS 上返回带有特定代码的错误。Web 不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码          | 平台              | 消息                           |
|-------------------|-------------------|--------------------------------|
| OS-PLUG-FILE-0004 | iOS               | Cordova / Capacitor 桥接未初始化。 |
| OS-PLUG-FILE-0005 | Android, iOS      | 方法的输入参数无效。             |
| OS-PLUG-FILE-0006 | Android, iOS      | 提供了无效的路径。               |
| OS-PLUG-FILE-0007 | Android           | 无法执行文件操作，用户拒绝了权限请求。 |
| OS-PLUG-FILE-0008 | Android, iOS      | 操作失败，因为文件不存在。        |
| OS-PLUG-FILE-0009 | Android           | 提供的输入不支持此操作。          |
| OS-PLUG-FILE-0010 | Android, iOS      | 目录已存在，无法被覆盖。          |
| OS-PLUG-FILE-0011 | Android, iOS      | 缺少父目录——可能传递了 recursive=false 或父目录创建失败。 |
| OS-PLUG-FILE-0012 | Android, iOS      | 无法删除含有子项的目录；收到 recursive=false 但目录有内容。 |
| OS-PLUG-FILE-0013 | Android, iOS      | 操作失败并返回错误。              |
