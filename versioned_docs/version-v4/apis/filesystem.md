---
title: Filesystem Capacitor 插件 API
description: Filesystem API 提供了类似 NodeJS 的 API，用于在设备上操作文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了类似 NodeJS 的 API，用于在设备上操作文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## iOS

要让文件显示在 Files 应用中，必须在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled`（应用支持 iTunes 文件共享）
- `LSSupportsOpeningDocumentsInPlace`（支持就地打开文档）

参阅 [配置 iOS](https://capacitorjs.com/docs/ios/configuration) 获取帮助。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage`，则需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

参阅 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions) 及 [Android 指南](https://capacitorjs.com/docs/android) 了解更多关于 Android 权限的设置。

注意，<a href="#directory">`Directory.Documents`</a> 和
`Directory.ExternalStorage` 仅在 Android 9 或更低版本可用。

## 理解目录与文件

iOS 和 Android 对文件有额外的隔离层，比如有些特殊目录会备份到云端，或者用于存储文档。Filesystem API 提供了一种简单的方式，将每个操作限定在设备上的特定目录下。

此外，Filesystem API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

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
  // 这是一个使用完整文件路径读取文件的示例。可用于从返回文件 URI 的插件（如 Camera）读取二进制数据（base64 编码）。
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('data:', contents);
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

**返回：** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自版本：** 1.0.0

---

### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

在设备指定位置写入文件

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自版本：** 1.0.0

---

### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备指定位置追加文件内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自版本：** 1.0.0

---

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自版本：** 1.0.0

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自版本：** 1.0.0

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自版本：** 1.0.0

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录下的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自版本：** 1.0.0

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回指定路径和目录的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自版本：** 1.0.0

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件信息

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**自版本：** 1.0.0

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自版本：** 1.0.0

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自版本：** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
在 Android 上，仅当使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
在 Android 上，仅当使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本：** 1.0.0

---

### 接口

#### ReadFileResult

| 属性       | 类型                | 说明                         | 自版本 |
| ---------- | ------------------- | ---------------------------- | ------ |
| **`data`** | <code>string</code> | 文件中包含的数据的字符串表示 | 1.0.0  |

#### ReadFileOptions

| 属性            | 类型                                            | 说明                                                                                                                              | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                  | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中读取文件的 <a href="#directory">`Directory`</a>                                                                             | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码。如果未提供，则以二进制方式读取并以 base64 编码返回。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串读取 | 1.0.0  |

#### WriteFileResult

| 属性      | 类型                | 说明             | 自版本 |
| --------- | ------------------- | ---------------- | ------ |
| **`uri`** | <code>string</code> | 文件写入后的 uri | 1.0.0  |

#### WriteFileOptions

| 属性            | 类型                                            | 说明                                                                                                            | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                |                    | 1.0.0  |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                    |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要存储文件的 <a href="#directory">`Directory`</a>                                                               |                    | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，则以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串写入 |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否创建缺失的父目录                                                                                            | <code>false</code> | 1.0.0  |

#### AppendFileOptions

| 属性            | 类型                                            | 说明                                                                                                            | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要追加的文件路径                                                                                                | 1.0.0  |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要存储文件的 <a href="#directory">`Directory`</a>                                                               | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码。如果未提供，则以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串写入 | 1.0.0  |

#### DeleteFileOptions

| 属性            | 类型                                            | 说明                                                  | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                      | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中删除文件的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### MkdirOptions

| 属性            | 类型                                            | 说明                                                       | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | ---------------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 新目录的路径                                               |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要在哪个 <a href="#directory">`Directory`</a> 下创建新目录 |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建缺失的父目录                                   | <code>false</code> | 1.0.0  |

#### RmdirOptions

| 属性            | 类型                                            | 说明                                                  | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要删除的目录路径                                      |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要从中删除目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否递归删除目录内容                                  | <code>false</code> | 1.0.0  |

#### ReaddirResult

| 属性        | 类型                    | 说明                   | 自版本 |
| ----------- | ----------------------- | ---------------------- | ------ |
| **`files`** | <code>FileInfo[]</code> | 目录下的文件和目录列表 | 1.0.0  |

#### FileInfo

| 属性        | 类型                               | 说明                                            | 自版本 |
| ----------- | ---------------------------------- | ----------------------------------------------- | ------ |
| **`name`**  | <code>string</code>                | 文件或目录名称                                  |        |
| **`type`**  | <code>'directory' \| 'file'</code> | 文件类型                                        | 4.0.0  |
| **`size`**  | <code>number</code>                | 文件大小（字节）                                | 4.0.0  |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在 Android 7 及更早设备不可用 | 4.0.0  |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）                            | 4.0.0  |
| **`uri`**   | <code>string</code>                | 文件的 uri                                      | 4.0.0  |

#### ReaddirOptions

| 属性            | 类型                                            | 说明                                              | 自版本 |
| --------------- | ----------------------------------------------- | ------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要读取的目录路径                                  | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 要列出文件的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### GetUriResult

| 属性      | 类型                | 说明       | 自版本 |
| --------- | ------------------- | ---------- | ------ |
| **`uri`** | <code>string</code> | 文件的 uri | 1.0.0  |

#### GetUriOptions

| 属性            | 类型                                            | 说明                                            | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要获取 URI 的文件路径                           | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### StatResult

| 属性        | 类型                               | 说明                                            | 自版本 |
| ----------- | ---------------------------------- | ----------------------------------------------- | ------ |
| **`type`**  | <code>'directory' \| 'file'</code> | 文件类型                                        | 1.0.0  |
| **`size`**  | <code>number</code>                | 文件大小（字节）                                | 1.0.0  |
| **`ctime`** | <code>number</code>                | 创建时间（毫秒）。在 Android 7 及更早设备不可用 | 1.0.0  |
| **`mtime`** | <code>number</code>                | 最后修改时间（毫秒）                            | 1.0.0  |
| **`uri`**   | <code>string</code>                | 文件的 uri                                      | 1.0.0  |

#### StatOptions

| 属性            | 类型                                            | 说明                                            | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要获取信息的文件路径                            | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### CopyOptions

| 属性              | 类型                                            | 说明                                                                                                       | 自版本 |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| **`from`**        | <code>string</code>                             | 已存在的文件或目录路径                                                                                     | 1.0.0  |
| **`to`**          | <code>string</code>                             | 目标文件或目录路径                                                                                         | 1.0.0  |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含已存在文件或目录的 <a href="#directory">`Directory`</a>                                                | 1.0.0  |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 目标文件或目录所在的 <a href="#directory">`Directory`</a>。如果未提供，则使用 'directory' 参数作为目标目录 | 1.0.0  |

#### CopyResult

| 属性      | 类型                | 说明             | 自版本 |
| --------- | ------------------- | ---------------- | ------ |
| **`uri`** | <code>string</code> | 文件复制后的 uri | 4.0.0  |

#### PermissionStatus

| 属性                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |

### 类型别名

#### RenameOptions

<code>
  <a href="#copyoptions">CopyOptions</a>
</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

### 枚举

#### Directory

| 成员                  | 值                              | 说明                                                                                                                                                                                                                                                                                      | 自版本 |
| --------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | Documents 目录。iOS 上为应用的文档目录，用于存储用户生成的内容。Android 上为公共 Documents 文件夹，可被其他应用访问。在 Android 10 上不可访问，除非在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"`。在 Android 11 及更高版本不可访问。 | 1.0.0  |
| **`Data`**            | <code>'DATA'</code>             | Data 目录。iOS 上使用 Documents 目录。Android 上为应用文件目录，卸载应用时会被删除。                                                                                                                                                                                                      | 1.0.0  |
| **`Library`**         | <code>'LIBRARY'</code>          | Library 目录。iOS 上为 Library 目录。Android 上为应用文件目录，卸载应用时会被删除。                                                                                                                                                                                                       | 1.1.0  |
| **`Cache`**           | <code>'CACHE'</code>            | Cache 目录。低内存时可能被删除，适合存储可重新生成的应用专用文件。                                                                                                                                                                                                                        | 1.0.0  |
| **`External`**        | <code>'EXTERNAL'</code>         | External 目录。iOS 上使用 Documents 目录。Android 上为主共享/外部存储设备上的应用专用持久文件目录，这些文件对用户不可见，卸载应用时会被删除。                                                                                                                                             | 1.0.0  |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | External Storage 目录。iOS 上使用 Documents 目录。Android 上为主共享/外部存储目录。在 Android 10 上不可访问，除非在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"`。在 Android 11 及更高版本不可访问。                                   | 1.0.0  |

#### Encoding

| 成员        | 值                   | 说明                                                                         | 自版本 |
| ----------- | -------------------- | ---------------------------------------------------------------------------- | ------ |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 转换格式                                                            | 1.0.0  |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，又称 ISO646-US，仅 Android 支持此编码。                          | 1.0.0  |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 转换格式，字节序由可选的字节序标识符决定，仅 Android 支持此编码。 | 1.0.0  |

</docgen-api>
