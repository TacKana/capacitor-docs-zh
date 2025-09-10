---
title: Filesystem
description: 文件系统 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/filesystem
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

文件系统 API 提供了类似 NodeJS 的接口，用于在设备上处理文件。

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
- [接口](#interfaces)
- [枚举](#enums)

## 理解目录与文件

iOS 和 Android 在文件管理上具有额外的分层机制，例如有专门用于云备份的特殊目录，或用于存储文档的目录。文件系统 API 提供了一种简单的方式，将每个操作限定在设备的特定特殊目录中。

此外，文件系统 API 支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

## 示例

```typescript
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

async fileWrite() {
  try {
    const result = await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "这是一个测试",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    })
    console.log('文件已写入', result);
  } catch(e) {
    console.error('无法写入文件', e);
  }
}

async fileRead() {
  let contents = await Filesystem.readFile({
    path: 'secrets/text.txt',
    directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
}

async fileAppend() {
  await Filesystem.appendFile({
    path: 'secrets/text.txt',
    data: "更多测试",
    directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
}

async fileDelete() {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents
    });
}

async mkdir() {
  try {
    let ret = await Filesystem.mkdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents,
      recursive: false // 类似 mkdir -p
    });
  } catch(e) {
    console.error('无法创建目录', e);
  }
}

async rmdir() {
  try {
    let ret = await Filesystem.rmdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents,
      recursive: false,
    });
  } catch(e) {
    console.error('无法删除目录', e);
  }
}

async readdir() {
  try {
    let ret = await Filesystem.readdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('无法读取目录', e);
  }
}

async stat() {
  try {
    let ret = await Filesystem.stat({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('无法获取文件信息', e);
  }
}

async readFilePath() {
  // 这是一个读取完整文件路径的示例。使用此方法从返回文件 URI 的插件（如相机）读取二进制数据（base64 编码）
  try {
    let data = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
    })
  }
}

async rename() {
  try {
    // 此示例在同一“目录”内移动文件
    let ret = await Filesystem.rename({
      from: 'text.txt',
      to: 'text2.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('无法重命名文件', e);
  }
}

async copy() {
  try {
    // 此示例在文档目录内复制文件
    let ret = await Filesystem.copy({
      from: 'text.txt',
      to: 'text2.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('无法复制文件', e);
  }
}
```

## API

### readFile(...)

```typescript
readFile(options: FileReadOptions) => Promise<FileReadResult>
```

从磁盘读取文件

| 参数          | 类型                                                        | 说明               |
| ------------- | ----------------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#filereadoptions">FileReadOptions</a></code> | 文件读取的配置选项 |

**返回值:** <code>Promise&lt;<a href="#filereadresult">FileReadResult</a>&gt;</code>

---

### writeFile(...)

```typescript
writeFile(options: FileWriteOptions) => Promise<FileWriteResult>
```

将文件写入设备的指定位置

| 参数          | 类型                                                          | 说明               |
| ------------- | ------------------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#filewriteoptions">FileWriteOptions</a></code> | 文件写入的配置选项 |

**返回值:** <code>Promise&lt;<a href="#filewriteresult">FileWriteResult</a>&gt;</code>

---

### appendFile(...)

```typescript
appendFile(options: FileAppendOptions) => Promise<FileAppendResult>
```

在设备的指定位置追加文件内容

| 参数          | 类型                                                            | 说明               |
| ------------- | --------------------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#fileappendoptions">FileAppendOptions</a></code> | 文件追加的配置选项 |

**返回值:** <code>Promise&lt;<a href="#fileappendresult">FileAppendResult</a>&gt;</code>

---

### deleteFile(...)

```typescript
deleteFile(options: FileDeleteOptions) => Promise<FileDeleteResult>
```

从磁盘删除文件

| 参数          | 类型                                                            | 说明               |
| ------------- | --------------------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#filedeleteoptions">FileDeleteOptions</a></code> | 文件删除的配置选项 |

**返回值:** <code>Promise&lt;<a href="#filedeleteresult">FileDeleteResult</a>&gt;</code>

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<MkdirResult>
```

创建目录

| 参数          | 类型                                                  | 说明           |
| ------------- | ----------------------------------------------------- | -------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> | 创建目录的选项 |

**返回值:** <code>Promise&lt;<a href="#mkdirresult">MkdirResult</a>&gt;</code>

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<RmdirResult>
```

删除目录

| 参数          | 类型                                                  | 说明               |
| ------------- | ----------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> | 目录删除的配置选项 |

**返回值:** <code>Promise&lt;<a href="#rmdirresult">RmdirResult</a>&gt;</code>

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数          | 类型                                                      | 说明                   |
| ------------- | --------------------------------------------------------- | ---------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> | 读取目录操作的配置选项 |

**返回值:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件 URI

| 参数          | 类型                                                    | 说明                    |
| ------------- | ------------------------------------------------------- | ----------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> | 获取 URI 操作的配置选项 |

**返回值:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据

| 参数          | 类型                                                | 说明                   |
| ------------- | --------------------------------------------------- | ---------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> | 文件状态操作的配置选项 |

**返回值:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<RenameResult>
```

重命名文件或目录

| 参数          | 类型                                                    | 说明                 |
| ------------- | ------------------------------------------------------- | -------------------- |
| **`options`** | <code><a href="#renameoptions">RenameOptions</a></code> | 重命名操作的配置选项 |

**返回值:** <code>Promise&lt;<a href="#renameresult">RenameResult</a>&gt;</code>

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                | 说明               |
| ------------- | --------------------------------------------------- | ------------------ |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> | 复制操作的配置选项 |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

---

### Interfaces

#### FileReadResult

| 属性       | 类型                |
| ---------- | ------------------- |
| **`data`** | <code>string</code> |

#### FileReadOptions

| 属性            | 类型                                                                | 说明                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要读取的文件名                                                                                                                                                      |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 从中读取文件的 <a href="#filesystemdirectory">FilesystemDirectory</a>                                                                                               |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | 读取文件的编码方式。如果不提供，数据将作为二进制读取并返回 base64 编码的数据。传递 <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> 可将数据作为字符串读取 |

#### FileWriteResult

| 属性      | 类型                |
| --------- | ------------------- |
| **`uri`** | <code>string</code> |

#### FileWriteOptions

| 属性            | 类型                                                                | 说明                                                                                                                                              |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要写入的文件名                                                                                                                                    |
| **`data`**      | <code>string</code>                                                 | 要写入的数据                                                                                                                                      |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 存储文件的 <a href="#filesystemdirectory">FilesystemDirectory</a>                                                                                 |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | 写入文件的编码方式。如果不提供，数据将作为 base64 编码写入。传递 <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> 可将数据作为字符串写入 |
| **`recursive`** | <code>boolean</code>                                                | 是否创建所有缺失的父目录。默认为 false                                                                                                            |

#### FileAppendResult

#### FileAppendOptions

| 属性            | 类型                                                                | 说明                                                                                                                                              |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要追加的文件名                                                                                                                                    |
| **`data`**      | <code>string</code>                                                 | 要追加的数据                                                                                                                                      |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 存储文件的 <a href="#filesystemdirectory">FilesystemDirectory</a>                                                                                 |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | 写入文件的编码方式。如果不提供，数据将作为 base64 编码写入。传递 <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> 可将数据作为字符串写入 |

#### FileDeleteResult

#### FileDeleteOptions

| 属性            | 类型                                                                | 说明                                                                  |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要删除的文件名                                                        |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 从中删除文件的 <a href="#filesystemdirectory">FilesystemDirectory</a> |

#### MkdirResult

#### MkdirOptions

| 属性            | 类型                                                                | 说明                                                                |
| --------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 新目录的路径                                                        |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 创建新目录的 <a href="#filesystemdirectory">FilesystemDirectory</a> |
| **`recursive`** | <code>boolean</code>                                                | 是否同时创建所有缺失的父目录。默认为 false                          |

#### RmdirResult

#### RmdirOptions

| 属性            | 类型                                                                | 说明                                                                  |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要删除的目录路径                                                      |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 从中删除目录的 <a href="#filesystemdirectory">FilesystemDirectory</a> |
| **`recursive`** | <code>boolean</code>                                                | 是否递归删除目录内容。默认为 false                                    |

#### ReaddirResult

| 属性        | 类型                  |
| ----------- | --------------------- |
| **`files`** | <code>string[]</code> |

#### ReaddirOptions

| 属性            | 类型                                                                | 说明                                                              |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要读取的目录路径                                                  |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 列出文件的 <a href="#filesystemdirectory">FilesystemDirectory</a> |

#### GetUriResult

| 属性      | 类型                |
| --------- | ------------------- |
| **`uri`** | <code>string</code> |

#### GetUriOptions

| 属性            | 类型                                                                | 说明                                                              |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要获取 URI 的文件路径                                             |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 文件所在的 <a href="#filesystemdirectory">FilesystemDirectory</a> |

#### StatResult

| 属性        | 类型                |
| ----------- | ------------------- |
| **`type`**  | <code>string</code> |
| **`size`**  | <code>number</code> |
| **`ctime`** | <code>number</code> |
| **`mtime`** | <code>number</code> |
| **`uri`**   | <code>string</code> |

#### StatOptions

| 属性            | 类型                                                                | 说明                                                              |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | 要获取数据的文件路径                                              |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 文件所在的 <a href="#filesystemdirectory">FilesystemDirectory</a> |

#### RenameResult

#### RenameOptions

#### CopyResult

#### CopyOptions

| 属性              | 类型                                                                | 说明                                                                                                                         |
| ----------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **`from`**        | <code>string</code>                                                 | 现有的文件或目录                                                                                                             |
| **`to`**          | <code>string</code>                                                 | 目标文件或目录                                                                                                               |
| **`directory`**   | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 包含现有文件或目录的 <a href="#filesystemdirectory">FilesystemDirectory</a>                                                  |
| **`toDirectory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | 包含目标文件或目录的 <a href="#filesystemdirectory">FilesystemDirectory</a>。如果不提供，将使用 'directory' 参数作为目标位置 |

### Enums

#### FilesystemDirectory

| 成员                  | 值                              | 描述                                                                                                                                                                                                                                                                          |
| --------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Documents`**       | <code>"DOCUMENTS"</code>        | 文档目录。在 iOS 上是应用的文档目录，用于存储用户生成的内容。在 Android 上是公共文档文件夹，因此可从其他应用访问。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储 |
| **`Data`**            | <code>"DATA"</code>             | 数据目录。在 iOS 上使用文档目录。在 Android 上是存放应用文件的目录，文件会在应用卸载时被删除                                                                                                                                                                                  |
| **`Cache`**           | <code>"CACHE"</code>            | 缓存目录。在内存不足时可能会被删除，因此使用此目录写入应用可以轻松重新创建的应用特定文件                                                                                                                                                                                      |
| **`External`**        | <code>"EXTERNAL"</code>         | 外部目录。在 iOS 上使用文档目录。在 Android 上是主共享/外部存储设备上应用可以放置其拥有的持久文件的目录。这些文件是应用内部的，通常不作为媒体对用户可见。文件会在应用卸载时被删除                                                                                             |
| **`ExternalStorage`** | <code>"EXTERNAL_STORAGE"</code> | 外部存储目录。在 iOS 上使用文档目录。在 Android 上是主共享/外部存储目录。在 Android 10 上不可访问，除非应用通过在 `AndroidManifest.xml` 的 `application` 标签中添加 `android:requestLegacyExternalStorage="true"` 来启用旧版外部存储                                          |

#### FilesystemEncoding

| 成员        | 值                   |
| ----------- | -------------------- |
| **`UTF8`**  | <code>"utf8"</code>  |
| **`ASCII`** | <code>"ascii"</code> |
| **`UTF16`** | <code>"utf16"</code> |
