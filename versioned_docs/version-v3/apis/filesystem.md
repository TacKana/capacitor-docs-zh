---
title: 文件系统 Capacitor 插件 API
description: 文件系统 API 提供类似 NodeJS 的 API，用于在设备上操作文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts
sidebar_label: 文件系统
---

# @capacitor/filesystem

文件系统 API 提供类似 NodeJS 的 API，用于在设备上操作文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage`，此 API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/v3/android) 中的 [设置权限](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions)。

注意：<a href="#directory">`Directory.Documents`</a> 和
`Directory.ExternalStorage` 仅在 Android 9 或更早版本上可用。

## 理解目录和文件

iOS 和 Android 在文件之间具有额外的隔离层，例如备份到云端的特殊目录，或用于存储文档的目录。文件系统 API 提供了一种简单的方法，将每个操作限定在设备上的特定特殊目录中。

此外，文件系统 API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整的文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: 'secrets/text.txt',
    data: "This is a test",
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
  // 这是一个读取完整文件路径的示例。使用此方法从返回文件 URI 的插件（例如相机）
  // 读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
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
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

</docgen-index>

<docgen-api>


### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自：** 1.0.0

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

**自：** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

向设备上指定位置的文件追加内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自：** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自：** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自：** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自：** 1.0.0

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

**自：** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自：** 1.0.0

--------------------

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

获取文件信息

| 参数         | 类型                                                |
| ------------ | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数         | 类型                                                |
| ------------ | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<void>
```

复制文件或目录

| 参数         | 类型                                                |
| ------------ | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 平台上，当使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要检查。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 平台上，当使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要请求。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### 接口


#### ReadFileResult

| 属性       | 类型                | 描述                                                 | 自 |
| ---------- | ------------------- | ----------------------------------------------------------- | ----- |
| **`data`** | <code>string</code> | 文件中包含数据的字符串表示形式。 | 1.0.0 |


#### ReadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                                                 | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要读取文件的路径。                                                                                                                                                | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中读取文件的 <a href="#directory">`Directory`</a>。                                                                                                              | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件时的编码方式。如果未提供，数据将以二进制形式读取并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串读取。 | 1.0.0 |


#### WriteFileResult

| 属性      | 类型                | 描述                             | 自 |
| --------- | ------------------- | --------------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件被写入后的 URI。 | 1.0.0 |


#### WriteFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 默认值            | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要写入文件的路径。                                                                                                                             |                    | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要写入的数据。                                                                                                                                         |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 用于存储文件的 <a href="#directory">`Directory`</a>。                                                                                             |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时的编码方式。如果未提供，数据将以 base64 编码形式写入。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串写入。 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建任何缺失的父目录。                                                                                                         | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件路径。                                                                                                                            | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要写入的数据。                                                                                                                                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 用于存储文件的 <a href="#directory">`Directory`</a>。                                                                                             | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时的编码方式。如果未提供，数据将以 base64 编码形式写入。传递 <a href="#encoding">Encoding.UTF8</a> 可以将数据作为字符串写入。 | 1.0.0 |

#### DeleteFileOptions

| 属性名           | 类型                                            | 描述                                           | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要删除的文件路径                               | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 中删除该文件 | 1.0.0    |


#### MkdirOptions

| 属性名           | 类型                                            | 描述                                                              | 默认值             | 起始版本 |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------- | ------------------ | -------- |
| **`path`**       | <code>string</code>                             | 新目录的路径                                                      |                    | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 在哪个 <a href="#directory">`Directory`</a> 中创建新目录          |                    | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否同时创建所有缺失的父目录                                      | <code>false</code> | 1.0.0    |


#### RmdirOptions

| 属性名           | 类型                                            | 描述                                                              | 默认值             | 起始版本 |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------- | ------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要删除的目录路径                                                  |                    | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 中删除该目录          |                    | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否递归删除目录内的所有内容                                      | <code>false</code> | 1.0.0    |


#### ReaddirResult

| 属性名         | 类型                  | 描述                       | 起始版本 |
| -------------- | --------------------- | -------------------------- | -------- |
| **`files`**    | <code>string[]</code> | 目录内的文件和目录列表     | 1.0.0    |


#### ReaddirOptions

| 属性名           | 类型                                            | 描述                                                 | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要读取的目录路径                                     | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 中列出文件 | 1.0.0    |


#### GetUriResult

| 属性名       | 类型                | 描述           | 起始版本 |
| ------------ | ------------------- | -------------- | -------- |
| **`uri`**    | <code>string</code> | 文件的 URI     | 1.0.0    |


#### GetUriOptions

| 属性名           | 类型                                            | 描述                                                 | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要获取 URI 的文件路径                                | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a>      | 1.0.0    |


#### StatResult

| 属性名         | 类型                | 描述                                                                           | 起始版本 |
| -------------- | ------------------- | ------------------------------------------------------------------------------ | -------- |
| **`type`**     | <code>string</code> | 文件类型                                                                       | 1.0.0    |
| **`size`**     | <code>number</code> | 文件大小                                                                       | 1.0.0    |
| **`ctime`**    | <code>number</code> | 创建时间（毫秒）。在 Android 7 及更早版本的设备上不可用。                      | 1.0.0    |
| **`mtime`**    | <code>number</code> | 最后修改时间（毫秒）                                                           | 1.0.0    |
| **`uri`**      | <code>string</code> | 文件的 URI                                                                     | 1.0.0    |


#### StatOptions

| 属性名           | 类型                                            | 描述                                                 | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要获取信息的文件路径                                 | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a>      | 1.0.0    |


#### CopyOptions

| 属性名             | 类型                                            | 描述                                                                                                                             | 起始版本 |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`from`**         | <code>string</code>                             | 现有的文件或目录                                                                                                                 | 1.0.0    |
| **`to`**           | <code>string</code>                             | 目标文件或目录                                                                                                                   | 1.0.0    |
| **`directory`**    | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                                                        | 1.0.0    |
| **`toDirectory`**  | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，则会使用 'directory' 参数作为目标位置                     | 1.0.0    |

#### PermissionStatus

| 属性                 | 类型                                                                          |
| -------------------- | ----------------------------------------------------------------------------- |
| **`publicStorage`**  | <code><a href="#permissionstate">PermissionState</a></code>                   |


### 类型别名


#### RenameOptions

<code><a href="#copyoptions">CopyOptions</a></code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### 枚举


#### Directory

| 成员                 | 值                             | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 始于   |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **`Documents`**      | <code>'DOCUMENTS'</code>       | 文档目录。在 iOS 上，它是应用的文档目录，用于存储用户生成的内容。在 Android 上，它是公共文档文件夹，因此其他应用可以访问。在 Android 10 上，除非应用在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 以启用传统外部存储，否则无法访问。在 Android 11 或更高版本上无法访问。                                                                                                               | 1.0.0  |
| **`Data`**           | <code>'DATA'</code>            | 数据目录。在 iOS 上，它将使用文档目录。在 Android 上，它是存放应用文件的目录。文件在应用卸载时会被删除。                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0  |
| **`Library`**        | <code>'LIBRARY'</code>         | 库目录。在 iOS 上，它将使用库目录。在 Android 上，它是存放应用文件的目录。文件在应用卸载时会被删除。                                                                                                                                                                                                                                                                                                                                                                                                          | 1.1.0  |
| **`Cache`**          | <code>'CACHE'</code>           | 缓存目录。在内存不足时可能会被删除，因此请使用此目录来写入应用可以轻松重新生成的特定文件。                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0  |
| **`External`**       | <code>'EXTERNAL'</code>        | 外部目录。在 iOS 上，它将使用文档目录。在 Android 上，它是主共享/外部存储设备上的目录，应用可以在其中放置其拥有的持久性文件。这些文件是应用内部的，通常对用户不可见为媒体文件。文件在应用卸载时会被删除。                                                                                                                                                                                                                                                                                                       | 1.0.0  |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录。在 iOS 上，它将使用文档目录。在 Android 上，它是主共享/外部存储目录。在 Android 10 上，除非应用在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 以启用传统外部存储，否则无法访问。在 Android 11 或更高版本上无法访问。                                                                                                                                                       | 1.0.0  |


#### Encoding

| 成员       | 值                    | 描述                                                                                                                   | 始于   |
| ---------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| **`UTF8`**  | <code>'utf8'</code>   | 八位 UCS 转换格式                                                                                                        | 1.0.0  |
| **`ASCII`** | <code>'ascii'</code>  | 七位 ASCII，也称为 ISO646-US，或 Unicode 字符集的基本拉丁块。此编码仅在 Android 上受支持。                               | 1.0.0  |
| **`UTF16`** | <code>'utf16'</code>  | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上受支持。                                      | 1.0.0  |

</docgen-api>