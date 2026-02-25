---
title: Filesystem Capacitor 插件 API
description: Filesystem API 提供了一套类似 NodeJS 的 API，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了一套类似 NodeJS 的 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple 隐私清单要求

苹果现在要求应用开发者指定使用 API 的批准理由，以增强用户隐私。到 2024 年 5 月 1 日，在向 App Store Connect 提交应用时，必须包含这些理由。

在你的应用中使用此特定插件时，你需要在 `/ios/App` 目录下创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展生成它，并指定使用原因。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的原因是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### PrivacyInfo.xcprivacy 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，将此字典条目添加到数组中 -->
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
  console.log(`已下载 ${progress.bytes} 字节，总共 ${progress.contentLength} 字节`);
});
```

之后（使用 File Transfer 插件）：

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// 首先使用 Filesystem 获取完整的文件路径
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
  console.log(`已下载 ${progress.bytes} 字节，总共 ${progress.contentLength} 字节`);
});
```

File Transfer 插件提供了更高的可靠性，带有特定错误码的更好错误处理，并且还增加了上传功能。

## iOS

要使文件显示在“文件”应用中，你还必须在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

阅读关于[配置 iOS](https://capacitorjs.com/docs/ios/configuration) 的帮助。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本上，此 API 需要将以下权限添加到你的 `AndroidManifest.xml` 中：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

阅读 [Android 指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)部分，了解更多关于设置 Android 权限的信息。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本上可用，而在 Android 11 及更新版本上，<a href="#directory">`Directory.Documents`</a> 只允许访问你的应用创建的文件/文件夹。

处理大文件可能需要你在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 对文件有额外的分离层，例如备份到云端的特殊目录，或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作限定在设备上的特定特殊目录中。

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

  console.log("秘密文件内容:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个使用完整文件路径读取文件的示例。使用此方法可以从返回文件 URI 的插件（例如 Camera）读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("数据:", contents);
};

const appendBinaryData = async () => {
  // 这是一个追加二进制数据的示例，数据应以 base64 编码发送给插件，且不提供任何 `Encoding`。
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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

有关现有错误代码列表，请参阅[错误](#errors)。

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从：** 1.0.0

--------------------


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

从磁盘分块读取文件。
仅限原生（在 Web 上不可用）。
使用回调接收每个读取的块。
如果返回空块，表示文件已完全读取。

| 参数           | 类型                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`** | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

**自从：** 7.1.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备上的指定位置

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

追加内容到设备上指定位置的文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自从：** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自从：** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建一个目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自从：** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除一个目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自从：** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回给定路径和目录的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关信息

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**自从：** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自从：** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 http 请求并将文件下载到指定目标位置。

此方法自 7.1.0 版本起已被弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自从：** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件的监听器。

此方法自 7.1.0 版本起已被弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

| 参数               | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自从：** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器。

此方法自 7.1.0 版本起已被弃用。
我们建议使用 @capacitor/file-transfer 插件与此插件配合使用。

**自从：** 5.2.0

--------------------


### 接口


#### PermissionStatus

| 属性               | 类型                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| 属性       | 类型                        | 描述                                                                                                                                           | 自从 |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | 文件中所含数据的表示形式。 注意：Blob 仅在 Web 上可用。在原生平台，数据作为字符串返回。 | 1.0.0 |


#### ReadFileOptions

| 属性           | 类型                                            | 描述                                                                                                                                                                                                                       | 默认值          | 自从 |
| -------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----- |
| **`path`**      | <code>string</code>                             | 要读取的文件的路径                                                                                                                                                                           |                 | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中读取文件的 <a href="#directory">`Directory`</a>                                                                                                                                       |                 | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码，如果未提供，数据将以二进制形式读取并以 base64 编码返回。传递 <a href="#encoding">Encoding.UTF8</a> 以将数据作为字符串读取。                              |                 | 1.0.0 |
| **`offset`**    | <code>number</code>                             | 从文件开始读取的偏移量（以字节为单位）。仅限原生（在 Web 上不可用）。可与 length 结合使用以部分读取文件。                                              | <code>0</code>  | 8.1.0 |
| **`length`**    | <code>number</code>                             | 要读取的数据长度（以字节为单位）。任何非正值意味着读取到文件末尾。仅限原生（在 Web 上不可用）。可与 offset 结合使用以部分读取文件。 | <code>-1</code> | 8.1.0 |


#### ReadFileInChunksOptions

| 属性           | 类型                | 描述                 | 自从 |
| -------------- | ------------------- | ------------------- | ----- |
| **`chunkSize`** | <code>number</code> | 块的大小（以字节为单位）。 | 7.1.0 |


#### WriteFileResult

| 属性     | 类型                | 描述                       | 自从 |
| -------- | ------------------- | -------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件被写入到的 uri | 1.0.0 |


#### WriteFileOptions

| 属性           | 类型                                            | 描述                                                                                                                                                                                                                                                                                                                                                 | 默认值             | 自从 |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要写入的文件的路径                                                                                                                                                                                                                                                                                                                  |                    | 1.0.0 |
| **`data`**      | <code>string \| Blob</code>                     | 要写入的数据 注意：Blob 数据仅在 Web 上支持。                                                                                                                                                                                                                                                                                     |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                                                                                                                                                                                                    |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，将写入二进制数据。为此，你必须提供 base64 编码的数据，以便插件在写入磁盘前对其进行解码。如果你未提供编码但使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 以将数据作为字符串写入。 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                                                                                                                                | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性           | 类型                                            | 描述                                                                                                                                                                                                                                                                                                                                                   | 自从 |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件的路径                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要追加的数据                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 追加到文件时使用的编码。如果未提供，将追加二进制数据。为此，你必须提供 base64 编码的数据，以便插件在写入磁盘前对其进行解码。如果你未提供编码但使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 以将数据作为字符串写入。 | 1.0.0 |


#### DeleteFileOptions

| 属性           | 类型                                            | 描述                                             | 自从 |
| -------------- | ----------------------------------------------- | ------------------------------------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要删除的文件的路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中删除文件的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### MkdirOptions

| 属性           | 类型                                            | 描述                                              | 默认值             | 自从 |
| -------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 新目录的路径                                         |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 在其中创建新目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建任何缺失的父目录。             | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性           | 类型                                            | 描述                                              | 默认值             | 自从 |
| -------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要移除的目录的路径                                   |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中移除目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否递归移除目录的内容           | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性       | 类型                    | 描述                         | 自从 |
| ---------- | ----------------------- | ---------------------------- | ----- |
| **`files`** | <code>FileInfo[]</code> | 目录内的文件和目录列表 | 1.0.0 |


#### FileInfo

| 属性       | 类型                               | 描述                                                                         | 自从 |
| ---------- | ---------------------------------- | ---------------------------------------------------------------------------- | ----- |
| **`name`**  | <code>string</code>                | 文件或目录的名称。                                                       | 7.1.0 |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件的类型。                                                                    | 4.0.0 |
| **`size`**  | <code>number</code>                | 文件的大小（以字节为单位）。                                                           | 4.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在 Android 7 及更旧设备上不可用。 | 7.1.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）。                                           | 7.1.0 |
| **`uri`**   | <code>string</code>                | 文件的 uri。                                                                 | 4.0.0 |


#### ReaddirOptions

| 属性           | 类型                                            | 描述                                           | 自从 |
| -------------- | ----------------------------------------------- | ---------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要读取的目录的路径                           | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中列出文件的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### GetUriResult

| 属性     | 类型                | 描述           | 自从 |
| -------- | ------------------- | -------------- | ----- |
| **`uri`** | <code>string</code> | 文件的 uri | 1.0.0 |


#### GetUriOptions

| 属性           | 类型                                            | 描述                                            | 自从 |
| -------------- | ----------------------------------------------- | ----------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要获取 URI 的文件的路径                        | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 获取文件所在的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### StatOptions

| 属性           | 类型                                            | 描述                                            | 自从 |
| -------------- | ----------------------------------------------- | ----------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要获取信息的文件的路径                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 获取文件所在的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### CopyOptions

| 属性             | 类型                                            | 描述                                                                                                      | 自从 |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| **`from`**        | <code>string</code>                             | 现有的文件或目录                                                                                               | 1.0.0 |
| **`to`**          | <code>string</code>                             | 目标文件或目录                                                                                            | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                           | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，将使用 'directory' 参数作为目标。 | 1.0.0 |


#### CopyResult

| 属性     | 类型                | 描述                     | 自从 |
| -------- | ------------------- | ------------------------ | ----- |
| **`uri`** | <code>string</code> | 文件被复制到的 uri | 4.0.0 |


#### DownloadFileResult

| 属性      | 类型                | 描述                                       | 自从 |
| --------- | ------------------- | ------------------------------------------ | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                 | 5.1.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。这仅在 Web 上可用。 | 5.1.0 |


#### DownloadFileOptions

| 属性           | 类型                                            | 描述                                                                                                                                                                                                                     | 默认值             | 自从 |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 下载的文件应移动到的路径。                                                                                                                                                                                 |                    | 5.1.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要将文件写入的目录。如果使用此选项，filePath 可以是相对路径而不是绝对路径。默认是 `DATA` 目录。                                                                           |                    | 5.1.0 |
| **`progress`**  | <code>boolean</code>                            | 一个可选的监听函数，用于接收下载进度事件。如果使用此选项，应在接收到每个块时分发进度事件。在 Android/iOS 上，为避免减速，块事件会被限制为每 100ms 一次。 |                    | 5.1.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                | <code>false</code> | 5.1.2 |


#### PluginListenerHandle

| 属性        | 类型                                      |
| ----------- | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性               | 类型                | 描述                          | 自从 |
| ------------------ | ------------------- | ----------------------------- | ----- |
| **`url`**           | <code>string</code> | 正在下载的文件的 url。                | 5.1.0 |
| **`bytes`**         | <code>number</code> | 目前已下载的字节数。               | 5.1.0 |
| **`contentLength`** | <code>number</code> | 此文件要下载的总字节数。 | 5.1.0 |


### 类型别名


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### ReadFileInChunksCallback

用于接收从文件读取的块或在出错时接收错误的回调。

<code>(chunkRead: <a href="#readfileresult">ReadFileResult</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### StatResult

<code><a href="#fileinfo">FileInfo</a></code>


#### RenameOptions

<code><a href="#copyoptions">CopyOptions</a></code>


#### ProgressListener

接收进度事件的监听函数。

<code>(progress: <a href="#progressstatus">ProgressStatus</a>): void</code>


### 枚举


#### Directory

| 成员                | 值                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 自从 |
| ------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Documents`**     | <code>'DOCUMENTS'</code>      | 文档目录。在 iOS 上是应用的文档目录。使用此目录存储用户生成的内容。在 Android 上是公共文档文件夹，因此其他应用可以访问。在 Android 10 上，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 启用传统外部存储，否则无法访问。在 Android 11 或更新版本上，应用只能访问自己创建的文件/文件夹。 | 1.0.0 |
| **`Data`**          | <code>'DATA'</code>           | 数据目录。在 iOS 上将使用 Documents 目录。在 Android 上是保存应用文件的目录。卸载应用时，这些文件将被删除。                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`Library`**       | <code>'LIBRARY'</code>        | 库目录。在 iOS 上将使用 Library 目录。在 Android 上是保存应用文件的目录。卸载应用时，这些文件将被删除。                                                                                                                                                                                                                                                                                                        | 1.1.0 |
| **`Cache`**         | <code>'CACHE'</code>          | 缓存目录。在内存不足时可能会被删除，因此请使用此目录写入应用特定的、你的应用可以轻松重新创建的文件。                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`External`**      | <code>'EXTERNAL'</code>       | 外部目录。在 iOS 上将使用 Documents 目录。在 Android 上是主共享/外部存储设备上的目录，应用程序可以在其中放置它拥有的持久文件。这些文件对应用来说是内部的，通常对用户来说不可见为媒体。卸载应用时，这些文件将被删除。                                                                                                                        | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录。在 iOS 上将使用 Documents 目录。在 Android 上是主共享/外部存储目录。在 Android 10 上，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 启用传统外部存储，否则无法访问。在 Android 11 或更新版本上无法访问。                                                                        | 1.0.0 |
| **`ExternalCache`**   | <code>'EXTERNAL_CACHE'</code>   | 外部缓存目录。在 iOS 上将使用 Documents 目录。在 Android 上是主共享/外部缓存。                                                                                                                                                                                                                                                                                                                                  | 7.1.0 |
| **`LibraryNoCloud`**  | <code>'LIBRARY_NO_CLOUD'</code> | 不进行云备份的库目录。在 iOS 中使用。在 Android 上是保存应用文件的目录。                                                                                                                                                                                                                                                                                                                                         | 7.1.0 |
| **`Temporary`**      | <code>'TEMPORARY'</code>       | iOS 的临时目录。在 Android 上是保存应用缓存的目录。                                                                                                                                                                                                                                                                                                                                                                | 7.1.0 |


#### Encoding

| 成员      | 值                | 描述                                                                                                                                             | 自从 |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 转换格式                                                                                                      | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，又名 ISO646-US，又名 Unicode 字符集的基本拉丁块。此编码仅在 Android 上支持。 | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上支持。   | 1.0.0 |

</docgen-api>

### 错误

从 7.1.0 版本开始，该插件在原生 Android 和 iOS 上返回带有特定代码的特定错误。Web 端不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码        | 平台             | 消息                       |
|-------------------|------------------|------------------------------|
| OS-PLUG-FILE-0004 | iOS              | Cordova / Capacitor 桥接器未初始化。 |
| OS-PLUG-FILE-0005 | Android, iOS     | 方法输入参数无效。 |
| OS-PLUG-FILE-0006 | Android, iOS     | 提供了无效的路径。 |
| OS-PLUG-FILE-0007 | Android          | 无法执行文件操作，用户拒绝了权限请求。 |
| OS-PLUG-FILE-0008 | Android, iOS     | 操作失败，因为文件不存在。 |
| OS-PLUG-FILE-0009 | Android          | 操作不支持提供的输入。 |
| OS-PLUG-FILE-0010 | Android, iOS     | 目录已存在，无法被覆盖。 |
| OS-PLUG-FILE-0011 | Android, iOS     | 缺少父目录 – 可能是传入了 recursive=false 或父目录创建失败。 |
| OS-PLUG-FILE-0012 | Android, iOS     | 无法删除包含子项的非空目录；收到 recursive=false 但目录有内容。 |
| OS-PLUG-FILE-0013 | Android, iOS     | 操作因错误而失败。 |