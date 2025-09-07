---
title: Filesystem Capacitor Plugin API
description: 文件系统API提供了一个类NodeJS的API，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main//packages/plugin//src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

文件系统API提供了一个类NodeJS的API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple隐私清单要求

Apple要求应用开发者现在必须说明API使用的批准原因，以增强用户隐私。截至2024年5月1日，向App Store Connect提交应用时必须包含这些原因。

在应用中使用此特定插件时，必须在`/ios/App`中创建`PrivacyInfo.xcprivacy`文件或使用VS Code扩展生成它，并指定使用原因。

有关如何执行此操作的详细步骤，请参阅[Capacitor文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，必需的字典键是[NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的原因是[C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### 示例PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果PrivacyInfo文件已存在，请将此字典条目添加到数组中 -->
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

## 从downloadFile迁移到文件传输插件

自版本7.1.0起，文件系统插件中的`downloadFile`功能已被弃用，推荐使用新的[@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer)插件。

### 安装文件传输插件

```bash
npm install @capacitor/file-transfer
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

// 首先使用Filesystem获取完整文件路径
const fileInfo = await Filesystem.getUri({
  directory: Directory.Documents,
  path: 'downloaded-file.pdf'
});

// 然后使用文件传输插件下载
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

文件传输插件提供了更高的可靠性、更好的错误处理（带有特定的错误代码），并且还添加了上传功能。

## iOS

要使文件出现在文件应用中，还必须在`Info.plist`中将以下键设置为`YES`：

- `UIFileSharingEnabled`（`应用程序支持iTunes文件共享`）
- `LSSupportsOpeningDocumentsInPlace`（`支持在位置打开文档`）

阅读[配置iOS](https://capacitorjs.com/docs/ios/configuration)以获取帮助。

## Android

如果使用<a href="#directory">`Directory.Documents`</a>或<a href="#directory">`Directory.ExternalStorage`</a>，在Android 10及更早版本中，此API需要将以下权限添加到您的`AndroidManifest.xml`中：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

阅读[Android指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)以获取有关设置Android权限的更多信息。

请注意，<a href="#directory">`Directory.ExternalStorage`</a>仅在Android 9或更早版本上可用，而<a href="#directory">`Directory.Documents`</a>在Android 11及更新版本上仅允许访问您的应用创建的文件/文件夹。

处理大文件可能需要您在`AndroidManifest.xml`的`<application>`标签中添加`android:largeHeap="true"`。

## 理解目录和文件

iOS和Android在文件之间有额外的分离层，例如备份到云的特殊目录，或用于存储文档的目录。文件系统API提供了一种简单的方法，将每个操作限定到设备上的特定特殊目录。

此外，文件系统API支持使用完整的`file://`路径，或在Android上读取`content://`文件。只需省略`directory`参数即可使用完整文件路径。

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

  console.log("秘密:", contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: "secrets/text.txt",
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个读取完整文件路径文件的示例。使用此方法从返回文件URI的插件（如相机）读取二进制数据（base64编码）。
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("数据:", contents);
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

有关现有错误代码的列表，请参阅[错误](#errors)。

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读/写权限。
仅在Android上使用<a href="#directory">`Directory.Documents`</a>或
`Directory.ExternalStorage`时需要。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读/写权限。
仅在Android上使用<a href="#directory">`Directory.Documents`</a>或
`Directory.ExternalStorage`时需要。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### readFileInChunks(...)

```typescript
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

从磁盘分块读取文件。
仅原生（在Web上不可用）。
使用回调接收每个读取的块。
如果返回空块，则表示文件已完全读取。

| 参数           | 类型                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#readfileinchunksoptions">ReadFileInChunksOptions</a></code>   |
| **`callback`** | <code><a href="#readfileinchunkscallback">ReadFileInChunksCallback</a></code> |

**返回:** <code>Promise&lt;string&gt;</code>

**Since:** 7.1.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备的指定位置

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备的指定位置追加文件内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**Since:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**Since:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**Since:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**Since:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的数据信息

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#fileinfo">FileInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**Since:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器执行HTTP请求并将文件下载到指定位置。

此方法自版本7.1.0起已弃用。
我们建议改用@capacitor/file-transfer插件，与此插件结合使用。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**Since:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件的监听器。

此方法自版本7.1.0起已弃用。
我们建议改用@capacitor/file-transfer插件，与此插件结合使用。

| 参数               | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

此方法自版本7.1.0起已弃用。
我们建议改用@capacitor/file-transfer插件，与此插件结合使用。

**Since:** 5.2.0

--------------------


### 接口


#### PermissionStatus

| 属性                  | 类型                                                        |
| --------------------- | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### ReadFileResult

| 属性        | 类型                        | 描述                                                                                                                            | Since |
| --------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | 文件中包含的数据表示形式 注意：Blob仅在Web上可用。在原生平台上，数据以字符串形式返回。 | 1.0.0 |


#### ReadFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                 | Since |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要读取的文件路径                                                                                                                                                | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中读取文件的<a href="#directory">`Directory`</a>                                                                                                              | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件的编码方式，如果未提供，数据将作为二进制读取并返回base64编码。传递<a href="#encoding">Encoding.UTF8</a>以字符串形式读取数据 | 1.0.0 |


#### ReadFileInChunksOptions

| 属性             | 类型                | 描述                  | Since |
| ---------------- | ------------------- | ---------------------------- | ----- |
| **`chunkSize`** | <code>number</code> | 块大小（字节）。 | 7.1.0 |


#### WriteFileResult

| 属性       | 类型                | 描述                             | Since |
| --------- | ------------------- | --------------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件写入的uri | 1.0.0 |


#### WriteFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                               | 默认值            | Since |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**       | <code>string</code>                             | 要写入的文件路径                                                                                                                             |                    | 1.0.0 |
| **`data`**       | <code>string \| Blob</code>                     | 要写入的数据 注意：Blob数据仅在Web上受支持。                                                                                               |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的<a href="#directory">`Directory`</a>                                                                                             |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据将作为base64编码写入。传递<a href="#encoding">Encoding.UTF8</a>以字符串形式写入数据 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                         | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                               | Since |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要追加的文件路径                                                                                                                            | 1.0.0 |
| **`data`**       | <code>string</code>                             | 要写入的数据                                                                                                                                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的<a href="#directory">`Directory`</a>                                                                                             | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据将作为base64编码写入。传递<a href="#encoding">Encoding.UTF8</a>以字符串形式写入数据 | 1.0.0 |


#### DeleteFileOptions

| 属性             | 类型                                            | 描述                                                      | Since |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要删除的文件路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中删除文件的<a href="#directory">`Directory`</a> | 1.0.0 |


#### MkdirOptions

| 属性             | 类型                                            | 描述                                                           | 默认值            | Since |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**       | <code>string</code>                             | 新目录的路径                                         |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 创建新目录的<a href="#directory">`Directory`</a> |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建任何缺失的父目录。             | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性             | 类型                                            | 描述                                                           | 默认值            | Since |
| ---------------- | ----------------------------------------------- | --------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**       | <code>string</code>                             | 要删除的目录路径                                   |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中删除目录的<a href="#directory">`Directory`</a> |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否递归删除目录内容           | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性         | 类型                    | 描述                                        | Since |
| ----------- | ----------------------- | -------------------------------------------------- | ----- |
| **`files`** | <code>FileInfo[]</code> | 目录内的文件和目录列表 | 1.0.0 |


#### FileInfo

| 属性         | 类型                               | 描述                                                                          | Since |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------ | ----- |
| **`name`**  | <code>string</code>                | 文件或目录的名称。                                                       | 7.1.0 |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件类型。                                                                    | 4.0.0 |
| **`size`**  | <code>number</code>                | 文件大小（字节）。                                                           | 4.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在Android 7及更早设备上不可用。 | 7.1.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）。                                           | 7.1.0 |
| **`uri`**   | <code>string</code>                | 文件的uri。                                                                 | 4.0.0 |


#### ReaddirOptions

| 属性             | 类型                                            | 描述                                                 | Since |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要读取的目录路径                           | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中列出文件的<a href="#directory">`Directory`</a> | 1.0.0 |


#### GetUriResult

| 属性       | 类型                | 描述         | Since |
| --------- | ------------------- | ------------------- | ----- |
| **`uri`** | <code>string</code> | 文件的uri | 1.0.0 |


#### GetUriOptions

| 属性             | 类型                                            | 描述                                                    | Since |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要获取URI的文件路径                        | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的<a href="#directory">`Directory`</a> | 1.0.0 |


#### StatOptions

| 属性             | 类型                                            | 描述                                                    | Since |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------- | ----- |
| **`path`**       | <code>string</code>                             | 要获取数据的文件路径                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的<a href="#directory">`Directory`</a> | 1.0.0 |


#### CopyOptions

| 属性               | 类型                                            | 描述                                                                                                                                                  | Since |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`from`**        | <code>string</code>                             | 现有文件或目录                                                                                                                               | 1.0.0 |
| **`to`**          | <code>string</code>                             | 目标文件或目录                                                                                                                            | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的<a href="#directory">`Directory`</a>                                                                           | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的<a href="#directory">`Directory`</a>。如果未提供，将使用'directory'参数作为目标 | 1.0.0 |


#### CopyResult

| 属性       | 类型                | 描述                            | Since |
| --------- | ------------------- | -------------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件复制到的uri | 4.0.0 |


#### DownloadFileResult

| 属性        | 类型                | 描述                                                          | Since |
| --------- | ------------------- | -------------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                 | 5.1.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的blob数据。这仅在Web上可用。 | 5.1.0 |


#### DownloadFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                                                                      | 默认值            | Since |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**       | <code>string</code>                             | 下载文件应移动到的路径。                                                                                                                                                                                 |                    | 5.1.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 写入文件的目录。如果使用此选项，filePath可以是相对路径而不是绝对路径。默认为`DATA`目录。                                                                           |                    | 5.1.0 |
| **`progress`**  | <code>boolean</code>                            | 可选监听器函数以接收下载进度事件。如果使用此选项，应在每个接收到的块上分派进度事件。在Android/iOS上，块被限制为每100ms一次以避免减速。 |                    | 5.1.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                | <code>false</code> | 5.1.2 |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性                  | 类型                | 描述                                          | Since |
| --------------------- | ------------------- | ---------------------------------------------------- | ----- |
| **`url`**           | <code>string</code> | 正在下载的文件的URL。                | 5.1.0 |
| **`bytes`**         | <code>number</code> | 到目前为止下载的字节数。               | 5.1.0 |
| **`contentLength`** | <code>number</code> | 此文件要下载的总字节数。 | 5.1.0 |


### 类型别名


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### ReadFileInChunksCallback

用于接收从文件读取的块的回调，或在出现错误时接收错误。

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

| 成员               | 值                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Since |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | 文档目录。在iOS上是应用的文档目录。使用此目录存储用户生成的内容。在Android上是公共文档文件夹，因此可从其他应用访问。在Android 10上不可访问，除非应用通过在`AndroidManifest.xml`的`application`标签中添加`android:requestLegacyExternalStorage="true"`来启用旧版外部存储。在Android 11或更新版本上，应用只能访问应用创建的文件/文件夹。 | 1.0.0 |
| **`Data`**            | <code>'DATA'</code>             | 数据目录。在iOS上将使用文档目录。在Android上是保存应用文件的目录。应用卸载时文件将被删除。                                                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`Library`**         | <code>'LIBRARY'</code>          | 库目录。在iOS上将使用库目录。在Android上是保存应用文件的目录。应用卸载时文件将被删除。                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.1.0 |
| **`Cache`**           | <code>'CACHE'</code>            | 缓存目录。在低内存情况下可能被删除，因此使用此目录写入应用特定的文件，以便您的应用可以轻松重新创建。                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`External`**        | <code>'EXTERNAL'</code>         | 外部目录。在iOS上将使用文档目录。在Android上是主共享/外部存储设备上的目录，应用可以在其中放置其拥有的持久文件。这些文件是应用内部的，通常不作为媒体对用户可见。应用卸载时文件将被删除。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录。在iOS上将使用文档目录。在Android上是主共享/外部存储目录。在Android 10上不可访问，除非应用通过在`AndroidManifest.xml`的`application`标签中添加`android:requestLegacyExternalStorage="true"`来启用旧版外部存储。在Android 11或更新版本上不可访问。                                                                                                                                                                                                                        | 1.0.0 |
| **`ExternalCache`**   | <code>'EXTERNAL_CACHE'</code>   | 外部缓存目录。在iOS上将使用文档目录。在Android上是主共享/外部缓存。                                                                                                                                                                                                                                                                                                                                                                                                                               | 7.1.0 |
| **`LibraryNoCloud`**  | <code>'LIBRARY_NO_CLOUD'</code> | 无云备份的库目录。在iOS上使用。在Android上是保存应用文件的目录。                                                                                                                                                                                                                                                                                                                                                                                                                                         | 7.1.0 |
| **`Temporary`**       | <code>'TEMPORARY'</code>        | iOS的临时目录。在Android上是保存应用缓存的目录。                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 7.1.0 |


#### Encoding

| 成员      | 值                | 描述                                                                                                                              | Since |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`UTF8`**  | <code>'utf8'</code>  | 八位UCS转换格式                                                                                                      | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code> | 七位ASCII，又名ISO646-US，又名Unicode字符集的基本拉丁块 此编码仅在Android上受支持。 | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code> | 十六位UCS转换格式，字节顺序由可选的字节顺序标记标识 此编码仅在Android上受支持。  | 1.0.0 |

</docgen-api>

### 错误

自版本7.1.0起，插件在原生Android和iOS上返回带有特定代码的特定错误。Web不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码        | 平台      | 消息                      |
|-------------------|------------------|------------------------------|
| OS-PLUG-FILE-0004 | iOS              | Cordova / Capacitor桥未初始化。 |
| OS-PLUG-FILE-0005 | Android, iOS     | 方法输入参数无效。 |
| OS-PLUG-FILE-0006 | Android, iOS     | 提供的路径无效。 |
| OS-PLUG-FILE-0007 | Android          | 无法执行文件操作，用户拒绝了权限请求。 |
| OS-PLUG-FILE-0008 | Android, iOS     | 操作失败，因为文件不存在。 |
| OS-PLUG-FILE-0009 | Android          | 不支持提供的输入操作。 |
| OS-PLUG-FILE-0010 | Android, iOS     | 目录已存在，无法覆盖。 |
| OS-PLUG-FILE-0011 | Android, iOS     | 缺少父目录 - 可能传递了recursive=false或父目录创建失败。 |
| OS-PLUG-FILE-0012 | Android, iOS     | 无法删除包含子项的目录；收到recursive=false但目录有内容。 |
| OS-PLUG-FILE-0013 | Android, iOS     | 操作失败并出现错误。 |