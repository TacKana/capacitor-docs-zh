---
title: 文件系统 Capacitor 插件 API
description: 文件系统 API 提供了类似 NodeJS 的接口，用于在设备上操作文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts
sidebar_label: 文件系统
---

# @capacitor/filesystem

文件系统 API 提供了类似 NodeJS 的接口，用于在设备上操作文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## iOS 配置

若要让文件显示在 iOS 的"文件"应用中，你必须在 `Info.plist` 中将以下键值设为 `YES`：

- `UIFileSharingEnabled` (`应用支持 iTunes 文件共享`)
- `LSSupportsOpeningDocumentsInPlace` (`支持就地打开文档`)

请参阅 [iOS 配置指南](https://capacitorjs.com/docs/ios/configuration)获取帮助。

## Android 配置

如果使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage`，需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

更多关于 Android 权限设置的信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android)中的[权限设置章节](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

注意：<a href="#directory">`Directory.Documents`</a> 和
`Directory.ExternalStorage` 仅在 Android 9 或更低版本上可用。

## 理解目录与文件

iOS 和 Android 对文件有额外的分层管理机制，例如有专门备份到云端的特殊目录，或存储文档的专用目录。文件系统 API 提供了一种简单的方式，将每个操作限定在设备的特定目录中。

此外，文件系统 API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: 'secrets/text.txt',
    data: '这是一个测试',
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

  console.log('机密内容:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 以下示例展示了如何通过完整文件路径读取文件。这适用于从返回 File URI 的插件（如相机）
  // 读取二进制数据（base64 编码）
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('数据:', contents);
};
```

## API

<docgen-index>

- [`readFile(...)`](#readfile)
- [`writeFile(...)`](#writefile)
- [`appendFile(...)`](#appendfile)
- [`deleteFile(...)`](#deletefile)
- [`mkdir(...)`](#mkdir)
- [`rmdir(...)`](#rmdir)
- [`readdir(...)`](#readdir)
- [`getUri(...)`](#geturi)
- [`stat(...)`](#stat)
- [`rename(...)`](#rename)
- [`copy(...)`](#copy)
- [`checkPermissions()`](#checkpermissions)
- [`requestPermissions()`](#requestpermissions)
- [接口](#interfaces)
- [类型别名](#type-aliases)
- [枚举](#enums)

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

**返回值:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备的指定位置

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

向设备的指定位置文件追加内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**起始版本:** 1.0.0

---

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

删除磁盘上的文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**起始版本:** 1.0.0

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**起始版本:** 1.0.0

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**起始版本:** 1.0.0

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回指定路径和目录的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

获取文件信息

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**起始版本:** 1.0.0

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**起始版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
在 Android 上仅当使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
在 Android 上仅当使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**起始版本:** 1.0.0

---

### Interfaces

#### ReadFileResult

| 属性       | 类型                | 描述                           | 起始版本 |
| ---------- | ------------------- | ------------------------------ | -------- |
| **`data`** | <code>string</code> | 文件中包含数据的字符串表示形式 | 1.0.0    |

#### ReadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                          | 起始版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                              | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中读取文件的 <a href="#directory">`Directory`</a>                                                                                         | 1.0.0    |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码格式，如未提供，则作为二进制数据读取并返回 base64 编码。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串读取 | 1.0.0    |

#### WriteFileResult

| 属性      | 类型                | 描述                  | 起始版本 |
| --------- | ------------------- | --------------------- | -------- |
| **`uri`** | <code>string</code> | 文件被写入的 URI 路径 | 1.0.0    |

#### WriteFileOptions

| 属性            | 类型                                            | 描述                                                                                                                          | 默认值             | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                              |                    | 1.0.0    |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                                  |                    | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                               |                    | 1.0.0    |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码格式。如未提供，则作为 base64 编码写入。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入 |                    | 1.0.0    |
| **`recursive`** | <code>boolean</code>                            | 是否创建所有缺失的父目录                                                                                                      | <code>false</code> | 1.0.0    |

#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                          | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件路径                                                                                                          | 1.0.0    |
| **`data`**      | <code>string</code>                             | 要追加的数据                                                                                                                  | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                               | 1.0.0    |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码格式。如未提供，则作为 base64 编码写入。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入 | 1.0.0    |

#### DeleteFileOptions

| 属性            | 类型                                            | 描述                                                  | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------- | -------- |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                      | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中删除文件的 <a href="#directory">`Directory`</a> | 1.0.0    |

#### MkdirOptions

| 属性            | 类型                                            | 描述                                              | 默认值             | 起始版本 |
| --------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------ | -------- |
| **`path`**      | <code>string</code>                             | 新目录的路径                                      |                    | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 创建新目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0    |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建所有缺失的父目录                      | <code>false</code> | 1.0.0    |

#### RmdirOptions

| 属性            | 类型                                            | 描述                                                  | 默认值             | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------- | ------------------ | -------- |
| **`path`**      | <code>string</code>                             | 要删除的目录路径                                      |                    | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中删除目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0    |
| **`recursive`** | <code>boolean</code>                            | 是否递归删除目录内容                                  | <code>false</code> | 1.0.0    |

#### ReaddirResult

| 属性        | 类型                    | 描述                   | 起始版本 |
| ----------- | ----------------------- | ---------------------- | -------- |
| **`files`** | <code>FileInfo[]</code> | 目录中的文件和目录列表 | 1.0.0    |

#### FileInfo

| 属性        | 类型                               | 描述                                              | 起始版本 |
| ----------- | ---------------------------------- | ------------------------------------------------- | -------- |
| **`name`**  | <code>string</code>                | 文件或目录名                                      |          |
| **`type`**  | <code>'directory' \| 'file'</code> | 文件类型                                          | 4.0.0    |
| **`size`**  | <code>number</code>                | 文件大小（字节）                                  | 4.0.0    |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在 Android 7 及更早设备上不可用 | 4.0.0    |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）                              | 4.0.0    |
| **`uri`**   | <code>string</code>                | 文件 URI                                          | 4.0.0    |

#### ReaddirOptions

| 属性            | 类型                                            | 描述                                                  | 起始版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------- | -------- |
| **`path`**      | <code>string</code>                             | 要读取的目录路径                                      | 1.0.0    |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中列出文件的 <a href="#directory">`Directory`</a> | 1.0.0    |

#### GetUriResult

| 属性      | 类型   | 描述 | 起始版本 |
| --------- | ------ | ---- | -------- |
| **`uri`** | <code> |
