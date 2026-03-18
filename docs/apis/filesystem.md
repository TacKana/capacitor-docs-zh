---
title: Filesystem Capacitor Plugin API
description: Filesystem API 提供了类似 NodeJS 的 API，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了类似 NodeJS 的 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple 隐私清单要求

Apple 现在要求应用开发者指定 API 使用的原因以增强用户隐私。在 2024 年 5 月 1 日前，提交应用到 App Store Connect 时必须包含这些原因。

当你在应用中使用此特定插件时，必须在 `/ios/App` 目录下创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展来生成它，并指定使用原因。

关于如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的原因是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### 隐私清单文件示例

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

## 从 downloadFile 迁移至 File Transfer 插件

自版本 7.1.0 起，Filesystem 插件中的 `downloadFile` 功能已被弃用，转而推荐使用新的 [@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer) 插件。

### 安装 File Transfer 插件

```bash
npm install @capacitor/file-transfer
npx cap sync
```

### 迁移示例

迁移前（使用 Filesystem 插件）：

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
  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);
});
```

迁移后（使用 File Transfer 插件）：

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
  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);
});
```

File Transfer 插件提供了更高的可靠性、更好的错误处理（包含特定的错误码），并增加了上传功能。

## iOS

若要使文件出现在“文件”应用中，你必须在 `Info.plist` 中将以下键的值设置为 `YES`：

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

阅读 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 以获取帮助。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本中，此 API 要求将以下权限添加到你的 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

在 [Android 指南](https://capacitorjs.com/docs/android) 中阅读关于 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 的部分，以获取有关设置 Android 权限的更多信息。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本上可用，而 <a href="#directory">`Directory.Documents`</a> 在 Android 11 及更新版本上仅允许访问你的应用创建的文件/文件夹。

处理大文件可能需要你在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 在文件之间有额外的隔离层，例如备份到云端的特殊目录，或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作限定在设备上的特定特殊目录内。

此外，Filesystem API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

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
  // 这是一个读取完整文件路径文件的示例。使用此方法来
  // 从返回 File URI 的插件（例如相机）读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
};

const appendBinaryData = async () => {
  // 这是一个追加二进制数据的示例，这些数据应以 base64 编码
  // 的形式发送给插件，并且不指定任何 `Encoding`。
  await Filesystem.appendFile({
    path: "file.bin",
    directory: Directory.Cache,
    data: "VGhpcyBpcyBtZWFudCB0byByZXByZXNlbnQgYSBCaW5hcnkgRGF0YSBleGFtcGxlIGVuY29kZWQgaW4gQmFzZTY0Lg=="
  });
};
```## API

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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

现有错误代码列表请参见 [错误](#errors)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自：** 1.0.0

--------------------


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

分块从磁盘读取文件。
仅限原生平台（Web 不可用）。
使用回调函数接收每个读取的数据块。
如果返回空块，则表示文件已完全读取。

| 参数 | 类型 |
| -------------- | ----------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`** | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**返回：** <code>Promise&lt;string&gt;</code>

**自：** 7.1.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备的指定位置

| 参数 | 类型 |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备的指定位置向文件追加内容

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自：** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自：** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录。

| 参数 | 类型 |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自：** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数 | 类型 |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自：** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数 | 类型 |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

根据路径和目录返回完整的文件 URI

| 参数 | 类型 |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据

| 参数 | 类型 |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**自：** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数 | 类型 |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自：** 1.0.0

--------------------### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数           | 类型                                                |
| -------------- | --------------------------------------------------- |
| **`options`**  | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自版本:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并将文件下载到指定位置。

此方法自版本 7.1.0 起已弃用。
我们建议使用 @capacitor/file-transfer 插件替代，并与本插件配合使用。

| 参数           | 类型                                                                |
| -------------- | ------------------------------------------------------------------- |
| **`options`**  | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自版本:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件监听器。

此方法自版本 7.1.0 起已弃用。
我们建议使用 @capacitor/file-transfer 插件替代，并与本插件配合使用。

| 参数                 | 类型                                                          |
| -------------------- | ------------------------------------------------------------- |
| **`eventName`**      | <code>'progress'</code>                                       |
| **`listenerFunc`**   | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

此方法自版本 7.1.0 起已弃用。
我们建议使用 @capacitor/file-transfer 插件替代，并与本插件配合使用。

**自版本:** 5.2.0

--------------------


### 接口


#### PermissionStatus

| 属性                    | 类型                                                        |
| ----------------------- | ----------------------------------------------------------- |
| **`publicStorage`**     | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| 属性           | 类型                        | 描述                                                                                                                             | 自版本 |
| -------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`data`**     | <code>string \| Blob</code> | 文件中所包含数据的表示形式。注意: Blob 仅在 Web 端可用。在原生端，数据以字符串形式返回。                                         | 1.0.0  |


#### ReadFileOptions

| 属性                | 类型                                            | 描述                                                                                                                                                                                                 | 默认值            | 自版本 |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------ |
| **`path`**          | <code>string</code>                             | 要读取的文件路径                                                                                                                                                                                     |                   | 1.0.0  |
| **`directory`**     | <code><a href="#directory">Directory</a></code> | 读取文件的 <a href="#directory">`Directory`</a>                                                                                                                                                      |                   | 1.0.0  |
| **`encoding`**      | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码。如果未提供，则数据以二进制形式读取并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串读取                                                       |                   | 1.0.0  |
| **`offset`**        | <code>number</code>                             | 开始读取文件的字节偏移量。仅限原生端（Web 端不可用）。可与 length 配合使用以部分读取文件。                                                                                                          | <code>0</code>    | 8.1.0  |
| **`length`**        | <code>number</code>                             | 要读取的数据长度（字节）。任何非正值表示读取到文件末尾。仅限原生端（Web 端不可用）。可与 offset 配合使用以部分读取文件。                                                                             | <code>-1</code>   | 8.1.0  |


#### ReadFileInChunksOptions

| 属性                | 类型                | 描述                  | 自版本 |
| ------------------- | ------------------- | --------------------- | ------ |
| **`chunkSize`**     | <code>number</code> | 分块大小（字节）。    | 7.1.0  |


#### WriteFileResult

| 属性         | 类型                | 描述                             | 自版本 |
| ------------ | ------------------- | -------------------------------- | ------ |
| **`uri`**    | <code>string</code> | 文件被写入后的 URI               | 1.0.0  |#### WriteFileOptions

| 属性             | 类型                                            | 说明                                                                                                                                                                                                                                                                                                                                      | 默认值               | 始于版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要写入的文件路径                                                                                                                                                                                                                                                                                                                          |                      | 1.0.0    |
| **`data`**       | <code>string \| Blob</code>                     | 要写入的数据<br>注意：Blob 数据仅在 Web 端受支持。                                                                                                                                                                                                                                                                                        |                      | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a> 目录                                                                                                                                                                                                                                                                                      |                      | 1.0.0    |
| **`encoding`**   | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，将写入二进制数据。为此，你必须提供 base64 编码的数据，以便插件在写入磁盘前进行解码。如果未提供编码却使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入。                                                                                                   |                      | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否创建所有缺失的父级目录。                                                                                                                                                                                                                                                                                                              | <code>false</code>   | 1.0.0    |

#### AppendFileOptions

| 属性             | 类型                                            | 说明                                                                                                                                                                                                                                                                                                                                        | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要追加内容的文件路径                                                                                                                                                                                                                                                                                                                        | 1.0.0    |
| **`data`**       | <code>string</code>                             | 要追加的数据                                                                                                                                                                                                                                                                                                                                | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a> 目录                                                                                                                                                                                                                                                                                        | 1.0.0    |
| **`encoding`**   | <code><a href="#encoding">Encoding</a></code>   | 追加内容到文件时使用的编码。如果未提供，将追加二进制数据。为此，你必须提供 base64 编码的数据，以便插件在写入磁盘前进行解码。如果未提供编码却使用了非 base64 数据，将抛出错误。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串追加。                                                                                                   | 1.0.0    |

#### DeleteFileOptions

| 属性             | 类型                                            | 说明                                                          | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要删除的文件路径                                              | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从中删除文件的 <a href="#directory">`Directory`</a> 目录      | 1.0.0    |

#### MkdirOptions

| 属性             | 类型                                            | 说明                                                           | 默认值               | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------- | -------------------- | -------- |
| **`path`**       | <code>string</code>                             | 新目录的路径                                                   |                      | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 创建新目录的 <a href="#directory">`Directory`</a> 目录         |                      | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否同时创建所有缺失的父级目录。                                | <code>false</code>   | 1.0.0    |#### RmdirOptions（删除目录选项）

| 属性                | 类型                                                | 描述                                                   | 默认值               | 始于 |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------ | -------------------- | ---- |
| **`path`**          | <code>string</code>                                 | 要删除目录的路径                                       |                      | 1.0.0 |
| **`directory`**     | <code><a href="#directory">Directory</a></code>     | 要从中删除目录的 <a href="#directory">`Directory`</a> |                      | 1.0.0 |
| **`recursive`**     | <code>boolean</code>                                | 是否递归删除目录内容                                   | <code>false</code>   | 1.0.0 |


#### ReaddirResult（读取目录结果）

| 属性          | 类型                        | 描述                                 | 始于 |
| ------------- | --------------------------- | ------------------------------------ | ---- |
| **`files`**   | <code>FileInfo[]</code>     | 目录内文件和目录的列表               | 1.0.0 |


#### FileInfo（文件信息）

| 属性          | 类型                                   | 描述                                                                 | 始于 |
| ------------- | -------------------------------------- | -------------------------------------------------------------------- | ---- |
| **`name`**    | <code>string</code>                    | 文件或目录的名称                                                     | 7.1.0 |
| **`type`**    | <code>'file' \| 'directory'</code>     | 文件的类型                                                           | 4.0.0 |
| **`size`**    | <code>number</code>                    | 文件大小（字节）                                                     | 4.0.0 |
| **`ctime`**   | <code>number</code>                    | 创建时间（毫秒）。Android 7 及更早版本不可用                         | 7.1.0 |
| **`mtime`**   | <code>number</code>                    | 最后修改时间（毫秒）                                                 | 7.1.0 |
| **`uri`**     | <code>string</code>                    | 文件的 URI                                                           | 4.0.0 |


#### ReaddirOptions（读取目录选项）

| 属性            | 类型                                                | 描述                                               | 始于 |
| --------------- | --------------------------------------------------- | -------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                                 | 要读取的目录路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code>     | 要从中列出文件的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### GetUriResult（获取 URI 结果）

| 属性          | 类型                  | 描述               | 始于 |
| ------------- | --------------------- | ------------------ | ---- |
| **`uri`**     | <code>string</code>   | 文件的 URI         | 1.0.0 |


#### GetUriOptions（获取 URI 选项）

| 属性            | 类型                                                | 描述                                                   | 始于 |
| --------------- | --------------------------------------------------- | ------------------------------------------------------ | ---- |
| **`path`**      | <code>string</code>                                 | 要获取 URI 的文件路径                                  | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code>     | 文件所在的 <a href="#directory">`Directory`</a>        | 1.0.0 |


#### StatOptions（状态选项）

| 属性            | 类型                                                | 描述                                                   | 始于 |
| --------------- | --------------------------------------------------- | ------------------------------------------------------ | ---- |
| **`path`**      | <code>string</code>                                 | 要获取数据的文件路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code>     | 文件所在的 <a href="#directory">`Directory`</a>        | 1.0.0 |


#### CopyOptions（复制选项）

| 属性              | 类型                                                | 描述                                                                                                                               | 始于 |
| ----------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`from`**        | <code>string</code>                                 | 源文件或目录                                                                                                                       | 1.0.0 |
| **`to`**          | <code>string</code>                                 | 目标文件或目录                                                                                                                     | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code>     | 包含源文件或目录的 <a href="#directory">`Directory`</a>                                                                            | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code>     | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，则使用 'directory' 参数作为目标位置                         | 1.0.0 |


#### CopyResult（复制结果）

| 属性          | 类型                  | 描述                       | 始于 |
| ------------- | --------------------- | -------------------------- | ---- |
| **`uri`**     | <code>string</code>   | 文件被复制到的 URI         | 4.0.0 |


#### DownloadFileResult（下载文件结果）

| 属性            | 类型                  | 描述                                                               | 始于 |
| --------------- | --------------------- | ------------------------------------------------------------------ | ---- |
| **`path`**      | <code>string</code>   | 文件下载到的路径                                                   | 5.1.0 |
| **`blob`**      | <code>Blob</code>     | 已下载文件的 Blob 数据。此属性仅在 Web 端可用                      | 5.1.0 |#### DownloadFileOptions

| 属性             | 类型                                              | 说明                                                                                                                                                                                                                                                               | 默认值               | 起始版本 |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | -------- |
| **`path`**       | <code>string</code>                               | 下载的文件应移动到的路径。                                                                                                                                                                                                                                         |                      | 5.1.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code>   | 写入文件的目录。如果使用此选项，filePath 可以是相对路径而非绝对路径。默认为 `DATA` 目录。                                                                                                                                                                          |                      | 5.1.0    |
| **`progress`**   | <code>boolean</code>                              | 一个可选的监听函数，用于接收下载进度事件。如果使用此选项，应在每个接收到的数据块上派发进度事件。在 Android/iOS 上，数据块会被节流至每 100ms 一次，以避免性能下降。                                                                                                  |                      | 5.1.0    |
| **`recursive`**  | <code>boolean</code>                              | 是否创建任何缺失的父目录。                                                                                                                                                                                                                                         | <code>false</code>   | 5.2.0    |

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

#### ProgressStatus

| 属性                | 类型                | 说明                                       | 起始版本 |
| ------------------- | ------------------- | ------------------------------------------ | -------- |
| **`url`**           | <code>string</code> | 正在下载的文件的 URL。                     | 5.1.0    |
| **`bytes`**         | <code>number</code> | 目前已经下载的字节数。                     | 5.1.0    |
| **`contentLength`** | <code>number</code> | 此文件需要下载的总字节数。                 | 5.1.0    |

### 类型别名

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

#### ReadFileInChunksCallback

用于接收从文件读取的数据块的回调函数，如果出错则返回错误。

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

### 枚举#### 目录

| 成员                   | 值                                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 自版本 |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | 文档目录。在 iOS 上，这是应用的文档目录。使用此目录存储用户生成的内容。在 Android 上，这是公共文档文件夹，因此其他应用可以访问。在 Android 10 上不可访问，除非应用在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 以启用旧版外部存储。在 Android 11 或更高版本中，应用只能访问其创建的文件/文件夹。 | 1.0.0 |
| **`Data`**            | <code>'DATA'</code>             | 数据目录。在 iOS 上，将使用文档目录。在 Android 上，这是存放应用文件的目录。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`Library`**         | <code>'LIBRARY'</code>          | 库目录。在 iOS 上，将使用库目录。在 Android 上，这是存放应用文件的目录。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.1.0 |
| **`Cache`**           | <code>'CACHE'</code>            | 缓存目录。在内存不足时可能会被删除，因此请使用此目录写入应用特定的文件，这些文件可以轻松重新创建。                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`External`**        | <code>'EXTERNAL'</code>         | 外部目录。在 iOS 上，将使用文档目录。在 Android 上，这是主共享/外部存储设备上应用可以放置其拥有的持久文件的目录。这些文件对应用是内部的，通常不作为媒体对用户可见。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录。在 iOS 上，将使用文档目录。在 Android 上，这是主共享/外部存储目录。在 Android 10 上不可访问，除非应用在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 以启用旧版外部存储。在 Android 11 或更高版本中不可访问。                                                                                                                                                                     | 1.0.0 |
| **`ExternalCache`**   | <code>'EXTERNAL_CACHE'</code>   | 外部缓存目录。在 iOS 上，将使用文档目录。在 Android 上，这是主共享/外部缓存。                                                                                                                                                                                                                                                                                                                                                                                                                               | 7.1.0 |
| **`LibraryNoCloud`**  | <code>'LIBRARY_NO_CLOUD'</code> | 无云端备份的库目录。用于 iOS。在 Android 上，这是存放应用文件的目录。                                                                                                                                                                                                                                                                                                                                                                                                                                          | 7.1.0 |
| **`Temporary`**       | <code>'TEMPORARY'</code>        | iOS 的临时目录。在 Android 上，这是存放应用缓存的目录。                                                                                                                                                                                                                                                                                                                                                                                                | 7.1.0 |

#### 编码

| 成员     | 值                | 描述                                                                                                                              | 自版本 |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 转换格式                                                                                                      | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，又称 ISO646-US 或 Unicode 字符集的基本拉丁块。此编码仅在 Android 上受支持。 | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上受支持。  | 1.0.0 |

</docgen-api>### 错误处理

自 7.1.0 版本起，本插件会在原生 Android 和 iOS 平台上返回带有特定代码的错误信息。Web 平台不遵循此错误标准。

以下表格列出了所有插件错误：

| 错误代码          | 支持平台       | 错误信息                          |
|-------------------|----------------|-----------------------------------|
| OS-PLUG-FILE-0004 | iOS            | Cordova / Capacitor 桥接未初始化   |
| OS-PLUG-FILE-0005 | Android, iOS   | 方法输入参数无效                  |
| OS-PLUG-FILE-0006 | Android, iOS   | 提供的路径无效                    |
| OS-PLUG-FILE-0007 | Android        | 无法执行文件操作，用户拒绝了权限请求 |
| OS-PLUG-FILE-0008 | Android, iOS   | 操作失败，文件不存在              |
| OS-PLUG-FILE-0009 | Android        | 不支持对提供的输入执行此操作      |
| OS-PLUG-FILE-0010 | Android, iOS   | 目录已存在，无法覆盖              |
| OS-PLUG-FILE-0011 | Android, iOS   | 缺少父目录 – 可能因传递了 recursive=false 或父目录创建失败 |
| OS-PLUG-FILE-0012 | Android, iOS   | 无法删除包含子项的目录；收到 recursive=false 但目录非空 |
| OS-PLUG-FILE-0013 | Android, iOS   | 操作失败，发生错误                |