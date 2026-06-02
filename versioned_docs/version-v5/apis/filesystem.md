---
title: Filesystem - Capacitor 文件系统插件 API
description: Filesystem API 提供类似 NodeJS 的 API，用于在设备上处理文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/filesystem/src/definitions.ts
sidebar_label: Filesystem 文件系统
translated: true
---

# @capacitor/filesystem

Filesystem API 提供类似 NodeJS 的 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem@latest-5
npx cap sync
```

## iOS

要使文件显示在"文件"应用中，必须在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled`（`Application supports iTunes file sharing`）
- `LSSupportsOpeningDocumentsInPlace`（`Supports opening documents in place`）

阅读关于 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 的帮助信息。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本上，此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

请阅读 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 了解更多关于设置 Android 权限的信息。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本上可用，而 <a href="#directory">`Directory.Documents`</a> 在 Android 11 及更新版本上只允许访问你的应用创建的文件/文件夹。

处理大文件时，可能需要在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 对文件有额外的隔离层，例如备份到云端的特殊目录或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作范围限定到设备上的特定特殊目录。

此外，Filesystem API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整的文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: 'secrets/text.txt',
    data: 'This is a test',
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log('secrets:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个使用完整文件路径读取文件的示例。用于
  // 从返回文件 URI 的插件中读取二进制数据（base64 编码），例如
  // Camera 插件。
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('data:', contents);
};
```

## API

<docgen-index>

* [`readFile(...)`](#readfile)
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
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`downloadFile(...)`](#downloadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#接口)
* [Type Aliases](#类型别名)
* [Enums](#枚举)

</docgen-index>

<docgen-api>
<!--更新源文件的 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件。

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备上的指定位置。

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备上指定位置的文件末尾追加内容。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自从:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自从:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建一个目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自从:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除一个目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自从:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件 URI。

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**自从:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录。

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自从:** 1.0.0

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

**自从:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读取/写入权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读取/写入权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要。

**返回:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自从:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并将文件下载到指定目标位置。

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自从:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加文件下载进度事件的监听器。

| 参数              | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自从:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**自从:** 5.2.0

--------------------


### 接口


#### ReadFileResult

| 属性       | 类型                        | 描述                                                                                                                            | 自从 |
| ---------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`data`** | <code>string \| Blob</code> | 文件包含的数据的表示形式。注意：Blob 仅在 Web 上可用。在原生平台上，数据以字符串形式返回。 | 1.0.0 |


#### ReadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                                                 | 自从 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                                                      | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要读取文件的 <a href="#directory">`Directory`</a>                                                                                                                  | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码，如果未提供，数据将以二进制格式读取并以 base64 编码返回。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式读取数据 | 1.0.0 |


#### WriteFileResult

| 属性      | 类型                | 描述                             | 自从 |
| --------- | ------------------- | -------------------------------- | ---- |
| **`uri`** | <code>string</code> | 文件写入的目标 URI | 1.0.0 |


#### WriteFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 默认值            | 自从 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                                                    |                    | 1.0.0 |
| **`data`**      | <code>string \| Blob</code>                     | 要写入的数据。注意：Blob 数据仅在 Web 上支持。                                                                                                      |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                  |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，数据将以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式写入数据 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                          | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 自从 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件路径                                                                                                                                | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                                                        | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                  | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，数据将以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式写入数据 | 1.0.0 |


#### DeleteFileOptions

| 属性            | 类型                                            | 描述                                                      | 自从 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                           | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要删除文件所在的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### MkdirOptions

| 属性            | 类型                                            | 描述                                                           | 默认值            | 自从 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------- | ------------------ | ---- |
| **`path`**      | <code>string</code>                             | 新目录的路径                                                    |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 创建新目录的 <a href="#directory">`Directory`</a>            |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建任何缺失的父目录。                                  | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性            | 类型                                            | 描述                                                           | 默认值            | 自从 |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------- | ------------------ | ---- |
| **`path`**      | <code>string</code>                             | 要删除的目录路径                                                |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要删除目录所在的 <a href="#directory">`Directory`</a>        |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否递归删除目录的内容                                          | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性        | 类型                    | 描述                                        | 自从 |
| ----------- | ----------------------- | ------------------------------------------- | ---- |
| **`files`** | <code>FileInfo[]</code> | 目录内的文件和目录列表                       | 1.0.0 |


#### FileInfo

| 属性        | 类型                               | 描述                                                                          | 自从 |
| ----------- | ---------------------------------- | ----------------------------------------------------------------------------- | ---- |
| **`name`**  | <code>string</code>                | 文件或目录的名称。                                                              |       |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件的类型。                                                                   | 4.0.0 |
| **`size`**  | <code>number</code>                | 文件的大小，以字节为单位。                                                      | 4.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间，以毫秒为单位。在 Android 7 及更早设备上不可用。                     | 4.0.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间，以毫秒为单位。                                                    | 4.0.0 |
| **`uri`**   | <code>string</code>                | 文件的 URI。                                                                   | 4.0.0 |


#### ReaddirOptions

| 属性            | 类型                                            | 描述                                                 | 自从 |
| --------------- | ----------------------------------------------- | ---------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要读取的目录路径                                      | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 列出文件的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### GetUriResult

| 属性      | 类型                | 描述         | 自从 |
| --------- | ------------------- | ------------ | ---- |
| **`uri`** | <code>string</code> | 文件的 URI | 1.0.0 |


#### GetUriOptions

| 属性            | 类型                                            | 描述                                                    | 自从 |
| --------------- | ----------------------------------------------- | ------------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要获取 URI 的文件路径                                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 获取文件所在的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### StatResult

| 属性        | 类型                               | 描述                                                                          | 自从 |
| ----------- | ---------------------------------- | ----------------------------------------------------------------------------- | ---- |
| **`type`**  | <code>'file' \| 'directory'</code> | 文件的类型。                                                                   | 1.0.0 |
| **`size`**  | <code>number</code>                | 文件的大小，以字节为单位。                                                      | 1.0.0 |
| **`ctime`** | <code>number</code>                | 创建时间，以毫秒为单位。在 Android 7 及更早设备上不可用。                     | 1.0.0 |
| **`mtime`** | <code>number</code>                | 最后修改时间，以毫秒为单位。                                                    | 1.0.0 |
| **`uri`**   | <code>string</code>                | 文件的 URI                                                                  | 1.0.0 |


#### StatOptions

| 属性            | 类型                                            | 描述                                                    | 自从 |
| --------------- | ----------------------------------------------- | ------------------------------------------------------- | ---- |
| **`path`**      | <code>string</code>                             | 要获取数据的文件路径                                     | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 获取文件所在的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### CopyOptions

| 属性              | 类型                                            | 描述                                                                                                                                                  | 自从 |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`from`**        | <code>string</code>                             | 现有的文件或目录                                                                                                                                       | 1.0.0 |
| **`to`**          | <code>string</code>                             | 目标文件或目录                                                                                                                                         | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                                                                           | 1.0.0 |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，将使用 'directory' 参数作为目标 | 1.0.0 |


#### CopyResult

| 属性      | 类型                | 描述                            | 自从 |
| --------- | ------------------- | ------------------------------- | ---- |
| **`uri`** | <code>string</code> | 文件被复制到的 URI | 4.0.0 |


#### PermissionStatus

| 属性                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### DownloadFileResult

| 属性       | 类型                | 描述                                                          | 自从 |
| ---------- | ------------------- | ------------------------------------------------------------- | ---- |
| **`path`** | <code>string</code> | 文件下载到的路径。                                               | 5.1.0 |
| **`blob`** | <code>Blob</code>   | 下载文件的 blob 数据。仅在 Web 上可用。                         | 5.1.0 |


#### DownloadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                                                                                                      | 默认值            | 自从 |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| **`path`**      | <code>string</code>                             | 下载文件应移动到的路径。                                                                                                                                                                                                   |                    | 5.1.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 写入文件的目录。如果使用此选项，filePath 可以是相对路径而非绝对路径。默认为 `DATA` 目录。                                                                                                                                |                    | 5.1.0 |
| **`progress`**  | <code>boolean</code>                            | 可选的监听函数，用于接收下载进度事件。如果使用此选项，应在每个接收到的块上调度进度事件。在 Android/iOS 上每 100ms 节流一次，以避免性能下降。                                                                             |                    | 5.1.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                                                                                                                | <code>false</code> | 5.1.2 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性                | 类型                | 描述                                          | 自从 |
| ------------------- | ------------------- | --------------------------------------------- | ---- |
| **`url`**           | <code>string</code> | 正在下载的文件的 URL。                          | 5.1.0 |
| **`bytes`**         | <code>number</code> | 目前已下载的字节数。                            | 5.1.0 |
| **`contentLength`** | <code>number</code> | 此文件需要下载的总字节数。                       | 5.1.0 |


### 类型别名


#### RenameOptions

<code><a href="#copyoptions">CopyOptions</a></code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### ProgressListener

接收进度事件的监听函数。

<code>(progress: <a href="#progressstatus">ProgressStatus</a>): void</code>


### 枚举


#### Directory

| 成员               | 值                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 自从 |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | Documents 目录。在 iOS 上是应用的 documents 目录。使用此目录存储用户生成的内容。在 Android 上是公共 Documents 文件夹，因此其他应用也可以访问。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用传统外部存储。在 Android 11 或更新版本上，应用只能访问其创建的文件/文件夹。 | 1.0.0 |
| **`Data`**            | <code>'DATA'</code>             | Data 目录。在 iOS 上会使用 Documents 目录。在 Android 上是存放应用文件的目录。卸载应用时文件将被删除。                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`Library`**         | <code>'LIBRARY'</code>          | Library 目录。在 iOS 上会使用 Library 目录。在 Android 上是存放应用文件的目录。卸载应用时文件将被删除。                                                                                                                                                                                                                                                                                                       | 1.1.0 |
| **`Cache`**           | <code>'CACHE'</code>            | Cache 目录。在内存不足时可能被删除，因此使用此目录编写应用特定的、可以轻松重新创建的文件。                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`External`**        | <code>'EXTERNAL'</code>         | 外部目录。在 iOS 上会使用 Documents 目录。在 Android 上是主共享/外部存储设备上的目录，应用可以在其中放置其拥有的持久文件。这些文件对应用来说是内部的，通常对用户不可见。卸载应用时文件将被删除。                                                                                                                                                                                             | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录。在 iOS 上会使用 Documents 目录。在 Android 上是主共享/外部存储目录。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用传统外部存储。在 Android 11 或更新版本上不可访问。                                                                                                        | 1.0.0 |


#### Encoding

| 成员     | 值                | 描述                                                                                                                              | 自从 |
| ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 变换格式                                                                                                                  | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，即 ISO646-US，即 Unicode 字符集的基本拉丁块。此编码仅在 Android 上支持。 | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 变换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上支持。  | 1.0.0 |

</docgen-api>
