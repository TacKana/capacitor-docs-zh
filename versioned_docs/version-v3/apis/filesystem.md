---
title: Filesystem Capacitor Plugin API
description: Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上操作文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上操作文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage`，此 API 需要在你的 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

有关设置 Android 权限的更多信息，请阅读 [Android 指南](https://capacitorjs.com/docs/v3/android) 中的[设置权限](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions)。

注意，<a href="#directory">`Directory.Documents`</a> 和
`Directory.ExternalStorage` 仅在 Android 9 或更早版本上可用。

## 理解目录和文件

iOS 和 Android 在文件之间有额外的分离层，例如备份到云端的特殊目录，或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作限定在设备上的特定特殊目录。

此外，Filesystem API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

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

  console.log('秘密:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个读取完整文件路径的示例。使用此方法从返回文件 URI 的插件（例如相机）读取二进制数据（base64 编码）。
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

**自版本:** 1.0.0

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

**自版本:** 1.0.0

---

### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备的指定位置追加文件内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自版本:** 1.0.0

---

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自版本:** 1.0.0

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自版本:** 1.0.0

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

移除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自版本:** 1.0.0

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

**自版本:** 1.0.0

---

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

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**自版本:** 1.0.0

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自版本:** 1.0.0

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<void>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自版本:** 1.0.0

---

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自版本:** 1.0.0

---

### Interfaces

#### ReadFileResult

| 属性       | 类型                | 描述                       | 自版本 |
| ---------- | ------------------- | -------------------------- | ------ |
| **`data`** | <code>string</code> | 文件中包含数据的字符串表示 | 1.0.0  |

#### ReadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                      | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                          | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中读取文件的 <a href="#directory">`Directory`</a>                                                                                       | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件的编码方式，如果未提供，则数据以二进制形式读取并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式读取数据 | 1.0.0  |

#### WriteFileResult

| 属性      | 类型                | 描述           | 自版本 |
| --------- | ------------------- | -------------- | ------ |
| **`uri`** | <code>string</code> | 文件写入的 uri | 1.0.0  |

#### WriteFileOptions

| 属性            | 类型                                            | 描述                                                                                                                    | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                        |                    | 1.0.0  |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                            |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                         |                    | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式写入数据 |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否创建所有缺失的父目录。                                                                                              | <code>false</code> | 1.0.0  |

#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                    | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要追加的文件路径                                                                                                        | 1.0.0  |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                            | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                         | 1.0.0  |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 写入文件的编码方式。如果未提供，数据以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 以字符串形式写入数据 | 1.0.0  |

#### DeleteFileOptions

| 属性            | 类型                                            | 描述                                                | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中删除文件的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### MkdirOptions

| 属性            | 类型                                            | 描述                                              | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 新目录的路径                                      |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 创建新目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否同时创建所有缺失的父目录。                    | <code>false</code> | 1.0.0  |

#### RmdirOptions

| 属性            | 类型                                            | 描述                                                | 默认值             | 自版本 |
| --------------- | ----------------------------------------------- | --------------------------------------------------- | ------------------ | ------ |
| **`path`**      | <code>string</code>                             | 要移除的目录路径                                    |                    | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 从中移除目录的 <a href="#directory">`Directory`</a> |                    | 1.0.0  |
| **`recursive`** | <code>boolean</code>                            | 是否递归移除目录内容                                | <code>false</code> | 1.0.0  |

#### ReaddirResult

| 属性        | 类型                  | 描述                   | 自版本 |
| ----------- | --------------------- | ---------------------- | ------ |
| **`files`** | <code>string[]</code> | 目录内的文件和目录列表 | 1.0.0  |

#### ReaddirOptions

| 属性            | 类型                                            | 描述                                            | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要读取的目录路径                                | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 列出文件的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### GetUriResult

| 属性      | 类型                | 描述       | 自版本 |
| --------- | ------------------- | ---------- | ------ |
| **`uri`** | <code>string</code> | 文件的 uri | 1.0.0  |

#### GetUriOptions

| 属性            | 类型                                            | 描述                                            | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要获取 URI 的文件路径                           | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### StatResult

| 属性        | 类型                | 描述                                                | 自版本 |
| ----------- | ------------------- | --------------------------------------------------- | ------ |
| **`type`**  | <code>string</code> | 文件类型                                            | 1.0.0  |
| **`size`**  | <code>number</code> | 文件大小                                            | 1.0.0  |
| **`ctime`** | <code>number</code> | 创建时间（毫秒）。在 Android 7 及更早设备上不可用。 | 1.0.0  |
| **`mtime`** | <code>number</code> | 最后修改时间（毫秒）。                              | 1.0.0  |
| **`uri`**   | <code>string</code> | 文件的 uri                                          | 1.0.0  |

#### StatOptions

| 属性            | 类型                                            | 描述                                            | 自版本 |
| --------------- | ----------------------------------------------- | ----------------------------------------------- | ------ |
| **`path`**      | <code>string</code>                             | 要获取数据的文件路径                            | 1.0.0  |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0  |

#### CopyOptions

| 属性              | 类型                                            | 描述                                                                                                   | 自版本 |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| **`from`**        | <code>string</code>                             | 现有的文件或目录                                                                                       | 1.0.0  |
| **`to`**          | <code>string</code>                             | 目标文件或目录                                                                                         | 1.0.0  |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>                                              | 1.0.0  |
| **`toDirectory`** | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，将使用 'directory' 参数作为目标 | 1.0.0  |

#### PermissionStatus

| 属性                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`publicStorage`** | <code><a href="#permissionstate">PermissionState</a></code> |

### Type Aliases

#### RenameOptions

<code>
  <a href="#copyoptions">CopyOptions</a>
</code>

#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

### Enums

#### Directory

| 成员                  | 值                              | 描述                                                                                                                                                                                                                                                                                                                             | 自版本 |
| --------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Documents`**       | <code>'DOCUMENTS'</code>        | 文档目录 在 iOS 上是应用的 documents 目录。使用此目录存储用户生成的内容。 在 Android 上是公共文档文件夹，因此可从其他应用访问。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储。在 Android 11 或更新版本上不可访问。 | 1.0.0  |
| **`Data`**            | <code>'DATA'</code>             | 数据目录 在 iOS 上使用 Documents 目录。 在 Android 上是存放应用文件的目录。文件将在应用卸载时删除。                                                                                                                                                                                                                              | 1.0.0  |
| **`Library`**         | <code>'LIBRARY'</code>          | 库目录 在 iOS 上使用 Library 目录。 在 Android 上是存放应用文件的目录。文件将在应用卸载时删除。                                                                                                                                                                                                                                  | 1.1.0  |
| **`Cache`**           | <code>'CACHE'</code>            | 缓存目录 在内存不足的情况下可能会被删除，因此使用此目录写入应用可以轻松重新创建的应用特定文件。                                                                                                                                                                                                                                  | 1.0.0  |
| **`External`**        | <code>'EXTERNAL'</code>         | 外部目录 在 iOS 上使用 Documents 目录 在 Android 上是主共享/外部存储设备上的目录，应用可以在其中放置其拥有的持久文件。这些文件是应用内部的，通常不作为媒体对用户可见。文件将在应用卸载时删除。                                                                                                                                   | 1.0.0  |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | 外部存储目录 在 iOS 上使用 Documents 目录 在 Android 上是主共享/外部存储目录。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储。在 Android 11 或更新版本上不可访问。                                                  | 1.0.0  |

#### Encoding

| 成员        | 值                   | 描述                                                                                      | 自版本 |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------- | ------ |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 转换格式                                                                         | 1.0.0  |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，又名 ISO646-US，又名 Unicode 字符集的基本拉丁块 此编码仅在 Android 上受支持。 | 1.0.0  |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识 此编码仅在 Android 上受支持。       | 1.0.0  |

</docgen-api>
