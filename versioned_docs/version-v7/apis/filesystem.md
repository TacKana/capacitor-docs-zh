---
title: 文件系统插件 API
description: 文件系统 API 提供类似 NodeJS 的 API，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/7.x/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/7.x/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件系统
---

# @capacitor/filesystem

文件系统 API 提供类似 NodeJS 的 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem@latest-7
npx cap sync
```

## Apple 隐私清单要求

苹果现在要求应用程序开发者为 API 使用指定批准的理由，以增强用户隐私。截至 2024 年 5 月 1 日，向 App Store Connect 提交应用时必须包含这些理由。

当在应用中使用此特定插件时，必须在 `/ios/App` 中创建 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展生成该文件，并指定使用理由。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐理由是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### PrivacyInfo.xcprivacy 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果隐私信息文件已存在，请将此字典条目添加到数组中 -->
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

## 从 downloadFile 迁移到文件传输插件

自版本 7.1.0 起，文件系统插件中的 `downloadFile` 功能已被弃用，推荐使用新的 [@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer) 插件。

### 安装文件传输插件

```bash
npm install @capacitor/file-transfer@latest-7
npx cap sync
```

### 迁移示例

之前（使用文件系统插件）：

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

之后（使用文件传输插件）：

```typescript
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

// 首先使用文件系统获取完整的文件路径
const fileInfo = await Filesystem.getUri({
  directory: Directory.Documents,
  path: 'downloaded-file.pdf'
});

// 然后使用文件传输插件进行下载
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

文件传输插件提供了更高的可靠性、更好的错误处理（包含特定错误代码），并增加了上传功能。

## iOS

要让文件出现在文件应用中，您还必须在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

有关帮助，请阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration)。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本中，此 API 需要将以下权限添加到您的 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

有关设置 Android 权限的更多信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本中可用，而 <a href="#directory">`Directory.Documents`</a> 在 Android 11 及更新版本中仅允许访问您的应用创建的文件/文件夹。

处理大文件时，您可能需要将 `android:largeHeap="true"` 添加到 `AndroidManifest.xml` 的 `<application>` 标签中。

## 理解目录和文件

iOS 和 Android 在文件之间有额外的隔离层，例如备份到云端的特殊目录，或用于存储文档的目录。文件系统 API 提供了一种简单的方法，将每个操作限定在设备上的特定特殊目录。

此外，文件系统 API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整的文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: "secrets/text.txt",
    data: "This is a test",
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

  console.log("secrets:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个使用完整文件路径读取文件的示例。使用此方法从返回文件 URI 的插件（例如相机）读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
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

有关现有错误代码列表，请参阅 [错误](#错误)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 平台使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要调用。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 平台使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要调用。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件。

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

分块读取磁盘文件。
仅原生平台支持（Web 端不可用）。
使用回调函数接收每个读取的数据块。
如果返回空数据块，表示文件已完全读取。

| 参数           | 类型                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`** | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**返回:** <code>Promise&lt;string&gt;</code>

**自版本:** 7.1.0

--------------------

### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备的指定位置。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

向设备指定位置的文件末尾追加内容。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自版本:** 1.0.0

--------------------

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自版本:** 1.0.0

--------------------

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自版本:** 1.0.0

--------------------

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自版本:** 1.0.0

--------------------

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

获取目录下的文件列表（非递归）。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

获取指定路径和目录的完整文件 URI。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

获取文件信息。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**自版本:** 1.0.0

--------------------

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自版本:** 1.0.0

--------------------

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并将文件下载到指定位置。

此方法自版本 7.1.0 起已被弃用。
我们建议改用 @capacitor/file-transfer 插件，与此插件配合使用。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件监听器。

此方法自版本 7.1.0 起已被弃用。
我们建议改用 @capacitor/file-transfer 插件，与此插件配合使用。

| 参数               | 类型                                                            |
| ------------------ | --------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

此方法自版本 7.1.0 起已被弃用。
我们建议改用 @capacitor/file-transfer 插件，与此插件配合使用。

**自:** 5.2.0

--------------------


### 接口


#### PermissionStatus

| 属性                  | 类型                                                      |
| --------------------- | --------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| 属性        | 类型                        | 描述                                                                                                                             | 自     |
| ----------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`data`** | <code>string \| Blob</code> | 文件中所包含数据的表示形式。注意：Blob 仅在 Web 平台上可用。在原生平台上，数据以字符串形式返回。 | 1.0.0 |


#### ReadFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                               | 自     |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 读取文件所在的 <a href="#directory">`Directory`</a>                                                                                                              | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件的编码方式。如果未提供，数据将以二进制形式读取并以 base64 编码返回。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式读取数据。 | 1.0.0 |


#### ReadFileInChunksOptions

| 属性              | 类型                | 描述                  | 自     |
| ----------------- | ------------------- | --------------------- | ------ |
| **`chunkSize`** | <code>number</code> | 块的大小，单位为字节。 | 7.1.0 |


#### WriteFileResult

| 属性       | 类型                | 描述                             | 自     |
| ---------- | ------------------- | -------------------------------- | ------ |
| **`uri`** | <code>string</code> | 文件被写入的 uri                 | 1.0.0 |


#### WriteFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                               | 默认值             | 自     |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                                                   |                    | 1.0.0 |
| **`data`**      | <code>string \| Blob</code>                     | 要写入的数据。注意：Blob 数据仅在 Web 平台上受支持。                                                                                               |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                  |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据将以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式写入数据。 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建所有缺失的父目录。                                                                                                                         | <code>false</code> | 1.0.0 |#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 起始版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件路径                                                                                                                            | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                                                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a> 目录                                                                                             | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据将以 base64 编码写入。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入 | 1.0.0 |


#### DeleteFileOptions

| 属性            | 类型                                            | 描述                                                      | 起始版本 |
| --------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中删除文件的 <a href="#directory">`Directory`</a> 目录 | 1.0.0 |


#### MkdirOptions

| 属性            | 类型                                            | 描述                                                           | 默认值            | 起始版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 新目录的路径                                         |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 创建新目录的 <a href="#directory">`Directory`</a> 目录 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建所有缺失的父目录。             | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性            | 类型                                            | 描述                                                           | 默认值            | 起始版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要移除的目录路径                                   |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中移除目录的 <a href="#directory">`Directory`</a> 目录 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否递归移除目录内的所有内容           | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性        | 类型                    | 描述                                        | 起始版本 |
| ----------- | ----------------------- | -------------------------------------------------- | ----- |
| **`files`** | <code>FileInfo[]</code> | 目录内的文件和目录列表 | 1.0.0 |


#### FileInfo

| 属性        | 类型                               | 描述                                                                          | 起始版本 |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------ | ----- |
| **`name`**  | <code>string</code>                | 文件或目录的名称。                                                       | 7.1.0 |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件的类型。                                                                    | 4.0.0 |
| **`size`**  | <code>number</code>                | 文件大小，单位为字节。                                                           | 4.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间，单位为毫秒。在 Android 7 及更早的设备上不可用。 | 7.1.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间，单位为毫秒。                                           | 7.1.0 |
| **`uri`**   | <code>string</code>                | 文件的 URI。                                                                 | 4.0.0 |


#### ReaddirOptions

| 属性            | 类型                                            | 描述                                                 | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要读取的目录路径                           | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 列出文件的 <a href="#directory">`Directory`</a> 目录 | 1.0.0 |


#### GetUriResult

| 属性      | 类型                | 描述         | 起始版本 |
| --------- | ------------------- | ------------------- | ----- |
| **`uri`** | <code>string</code> | 文件的 URI | 1.0.0 |


#### GetUriOptions

| 属性            | 类型                                            | 描述                                                    | 起始版本 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要获取 URI 的文件路径                        | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> 目录 | 1.0.0 |#### StatOptions

| 属性            | 类型                                           | 描述                                    | 始于 |
| --------------- | ---------------------------------------------- | --------------------------------------- | ---- |
| **`path`**      | <code>string</code>                            | 要获取数据的文件路径                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> 目录 | 1.0.0 |

#### CopyOptions

| 属性              | 类型                                           | 描述                                                                                                                              | 始于 |
| ----------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`from`**        | <code>string</code>                            | 现有的文件或目录                                                                                                                  | 1.0.0 |
| **`to`**          | <code>string</code>                            | 目标文件或目录                                                                                                                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                                                          | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，则使用 'directory' 参数作为目标目录                         | 1.0.0 |

#### CopyResult

| 属性      | 类型                | 描述               | 始于 |
| --------- | ------------------- | ------------------ | ---- |
| **`uri`** | <code>string</code> | 文件复制到的 URI   | 4.0.0 |

#### DownloadFileResult

| 属性       | 类型                | 描述                                                             | 始于 |
| ---------- | ------------------- | ---------------------------------------------------------------- | ---- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                               | 5.1.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。此属性仅在 Web 端可用。                    | 5.1.0 |

#### DownloadFileOptions

| 属性            | 类型                                           | 描述                                                                                                                              | 默认值             | 始于 |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| **`path`**      | <code>string</code>                            | 下载文件应移动到的路径。                                                                                                          |                    | 5.1.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 写入文件的目录。如果使用此选项，filePath 可以是相对路径而非绝对路径。默认为 `DATA` 目录。                                         |                    | 5.1.0 |
| **`progress`**  | <code>boolean</code>                           | 可选的监听器函数，用于接收下载进度事件。如果使用此选项，应在每次接收到数据块时触发进度事件。在 Android/iOS 上，为避免性能下降，数据块触发会限制为每 100 毫秒一次。 |                    | 5.1.0 |
| **`recursive`** | <code>boolean</code>                           | 是否创建任何缺失的父目录。                                                                                                        | <code>false</code> | 5.1.2 |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ProgressStatus

| 属性                | 类型                | 描述                       | 始于 |
| ------------------- | ------------------- | -------------------------- | ---- |
| **`url`**           | <code>string</code> | 正在下载的文件的 URL。     | 5.1.0 |
| **`bytes`**         | <code>number</code> | 目前已下载的字节数。       | 5.1.0 |
| **`contentLength`** | <code>number</code> | 此文件要下载的总字节数。   | 5.1.0 |

### 类型别名

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### ReadFileInChunksCallback

用于接收从文件读取的数据块的回调函数，或在出错时接收错误信息。

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

### 枚举#### 目录

| 成员名称             | 值                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 起始版本 |
| -------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`Documents`**      | <code>'DOCUMENTS'</code>         | 文档目录。在 iOS 上为应用的文档目录，用于存储用户生成的内容。在 Android 上为公共文档文件夹，因此其他应用可以访问。在 Android 10 上，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用传统外部存储，否则无法访问。在 Android 11 或更高版本上，应用只能访问其创建的文件/文件夹。                                                                                              | 1.0.0    |
| **`Data`**           | <code>'DATA'</code>              | 数据目录。在 iOS 上使用文档目录。在 Android 上为存放应用文件的目录，文件会在应用卸载时被删除。                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0    |
| **`Library`**        | <code>'LIBRARY'</code>           | 资源库目录。在 iOS 上使用资源库目录。在 Android 上为存放应用文件的目录，文件会在应用卸载时被删除。                                                                                                                                                                                                                                                                                                                                                                                           | 1.1.0    |
| **`Cache`**          | <code>'CACHE'</code>             | 缓存目录。在内存不足时可能会被删除，因此请使用此目录来存放应用可以轻松重新创建的应用特定文件。                                                                                                                                                                                                                                                                                                                                                                                              | 1.0.0    |
| **`External`**       | <code>'EXTERNAL'</code>          | 外部目录。在 iOS 上使用文档目录。在 Android 上为主共享/外部存储设备上的目录，应用可以在其中放置其拥有的持久性文件。这些文件是应用内部的，通常对用户而言不可见。文件会在应用卸载时被删除。                                                                                                                                                                                                                                                                                                          | 1.0.0    |
| **`ExternalStorage`**| <code>'EXTERNAL_STORAGE'</code>  | 外部存储目录。在 iOS 上使用文档目录。在 Android 上为主共享/外部存储目录。在 Android 10 上，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用传统外部存储，否则无法访问。在 Android 11 或更高版本上无法访问。                                                                                                                                                                                                           | 1.0.0    |
| **`ExternalCache`**  | <code>'EXTERNAL_CACHE'</code>    | 外部缓存目录。在 iOS 上使用文档目录。在 Android 上为主共享/外部缓存。                                                                                                                                                                                                                                                                                                                                                                                                                     | 7.1.0    |
| **`LibraryNoCloud`** | <code>'LIBRARY_NO_CLOUD'</code>  | 无云备份的资源库目录。用于 iOS。在 Android 上为存放应用文件的目录。                                                                                                                                                                                                                                                                                                                                                                                                                         | 7.1.0    |
| **`Temporary`**      | <code>'TEMPORARY'</code>         | iOS 的临时目录。在 Android 上为存放应用缓存的目录。                                                                                                                                                                                                                                                                                                                                                                                                                                       | 7.1.0    |

#### 编码

| 成员名称    | 值                     | 描述                                                                                                                              | 起始版本 |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`UTF8`**  | <code>'utf8'</code>    | 八位 UCS 转换格式                                                                                                                 | 1.0.0    |
| **`ASCII`** | <code>'ascii'</code>   | 七位 ASCII，即 ISO646-US，即 Unicode 字符集的基本拉丁语块。此编码仅在 Android 上受支持。                                              | 1.0.0    |
| **`UTF16`** | <code>'utf16'</code>   | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上受支持。                                                   | 1.0.0    |

</docgen-api>### 错误信息

自 7.1.0 版本起，该插件在原生 Android 和 iOS 平台上会返回带有特定代码的详细错误信息。Web 平台不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码           | 平台           | 错误信息                                 |
|--------------------|----------------|------------------------------------------|
| OS-PLUG-FILE-0004  | iOS            | Cordova / Capacitor 桥接未初始化。       |
| OS-PLUG-FILE-0005  | Android, iOS   | 方法输入参数无效。                       |
| OS-PLUG-FILE-0006  | Android, iOS   | 提供的路径无效。                         |
| OS-PLUG-FILE-0007  | Android        | 无法执行文件操作，用户拒绝了权限请求。   |
| OS-PLUG-FILE-0008  | Android, iOS   | 操作失败，因为文件不存在。               |
| OS-PLUG-FILE-0009  | Android        | 提供的输入不支持此操作。                 |
| OS-PLUG-FILE-0010  | Android, iOS   | 目录已存在，无法覆盖。                   |
| OS-PLUG-FILE-0011  | Android, iOS   | 缺少父目录 – 可能传递了 recursive=false 或父目录创建失败。 |
| OS-PLUG-FILE-0012  | Android, iOS   | 无法删除包含子项的目录；收到 recursive=false 但目录有内容。 |
| OS-PLUG-FILE-0013  | Android, iOS   | 操作失败并出现错误。                     |