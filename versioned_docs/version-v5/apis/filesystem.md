---
title: Filesystem Capacitor Plugin API
description: 文件系统插件提供类似 NodeJS 的文件操作 API，用于在设备上处理文件。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/filesystem/src/definitions.ts
sidebar_label: 文件系统
---

# @capacitor/filesystem

文件系统插件提供类似 NodeJS 的文件操作 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem@latest-5
npx cap sync
```

## iOS 配置

若要使文件出现在 iOS 的「文件」应用中，必须在 `Info.plist` 中设置以下键值为 `YES`：

- `UIFileSharingEnabled`（支持 iTunes 文件共享）
- `LSSupportsOpeningDocumentsInPlace`（支持就地打开文档）

请参阅 [iOS 配置指南](https://capacitorjs.com/docs/ios/configuration) 获取帮助。

## Android 配置

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本中，需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

更多关于 Android 权限设置的信息，请参考 [Android 权限配置指南](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

注意：
- <a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本可用
- 在 Android 11 及更新版本中，<a href="#directory">`Directory.Documents`</a> 只能访问应用自身创建的文件/目录

处理大文件时，可能需要在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"` 属性。

## 理解目录与文件

iOS 和 Android 对文件有额外的分层管理机制，例如有专门用于云备份的目录或存储文档的特殊目录。文件系统插件提供了一种简单的方式，可以将操作限定在设备的特定目录上。

此外，文件系统插件支持使用完整的 `file://` 路径，或在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整文件路径。

## 示例

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: 'secrets/text.txt',
    data: '这是测试内容',
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

  console.log('读取内容:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 示例：通过完整文件路径读取文件
  // 可用于读取返回 File URI 的插件（如相机）提供的二进制数据（base64 编码）
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('文件数据:', contents);
};
```

## API 文档

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
* [接口](#interfaces)
* [类型别名](#type-aliases)
* [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

从磁盘读取文件

| 参数          | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备指定位置

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备指定位置追加文件内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

移除目录

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

获取目录中的文件列表（非递归）

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

获取路径和目录对应的完整文件 URI

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

获取文件信息

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数          | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限（仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要）

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限（仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或 `Directory.ExternalStorage` 时需要）

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并下载文件到指定位置

| 参数          | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

添加文件下载进度事件监听器

| 参数               | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**自:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件所有监听器

**自:** 5.2.0

--------------------


### 接口


#### ReadFileResult

| 属性        | 类型                        | 描述                                                                                                                            | 自   |
| ----------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---- |
| **`data`**  | <code>string \| Blob</code> | 文件包含的数据表示形式 注意：Blob 仅在 Web 端可用。在原生平台上，数据以字符串形式返回。                                         | 1.0.0 |


#### ReadFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                                                 | 自   |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`path`**        | <code>string</code>                             | 要读取的文件路径                                                                                                                                                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 读取文件的 <a href="#directory">`Directory`</a>                                                                                                                     | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 文件读取编码，如果不提供，数据将作为二进制读取并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 可以字符串形式读取数据                                 | 1.0.0 |


#### WriteFileResult

| 属性        | 类型                | 描述                             | 自   |
| ----------- | ------------------- | ------------------------------- | ---- |
| **`uri`**   | <code>string</code> | 文件写入位置的 URI               | 1.0.0 |


#### WriteFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                               | 默认值            | 自   |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| **`path`**        | <code>string</code>                             | 要写入的文件路径                                                                                                                                   |                    | 1.0.0 |
| **`data`**        | <code>string \| Blob</code>                     | 要写入的数据 注意：Blob 数据仅在 Web 端支持                                                                                                       |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 文件存储的 <a href="#directory">`Directory`</a>                                                                                                   |                    | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 文件写入编码。如果不提供，数据将以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 可以字符串形式写入数据                             |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否创建缺失的父目录                                                                                                                              | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性              | 类型                                            | 描述                                                                                                                                               | 自   |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| **`path`**        | <code>string</code>                             | 要追加内容的文件路径                                                                                                                              | 1.0.0 |
| **`data`**        | <code>string</code>                             | 要写入的数据                                                                                                                                      | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 文件存储的 <a href="#directory">`Directory`</a>                                                                                                   | 1.0.0 |
| **`encoding`**    | <code><a href="#encoding">Encoding</a></code>   | 文件写入编码。如果不提供，数据将以 base64 编码写入。传递 <a href="#encoding">Encoding.UTF8</a> 可以字符串形式写入数据                             | 1.0.0 |


#### DeleteFileOptions

| 属性              | 类型                                            | 描述                                                      | 自   |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------- | ---- |
| **`path`**        | <code>string</code>                             | 要删除的文件路径                                          | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a>          | 1.0.0 |


#### MkdirOptions

| 属性              | 类型                                            | 描述                                                           | 默认值            | 自   |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------- | ------------------ | ---- |
| **`path`**        | <code>string</code>                             | 新目录路径                                                    |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 创建目录的 <a href="#directory">`Directory`</a>               |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否同时创建缺失的父目录                                      | <code>false</code> | 1.0.0 |


#### RmdirOptions

| 属性              | 类型                                            | 描述                                                           | 默认值            | 自   |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------- | ------------------ | ---- |
| **`path`**        | <code>string</code>                             | 要删除的目录路径                                              |                    | 1.0.0 |
| **`directory`**   | <code><a href="#directory">Directory</a></code> | 目录所在的 <a href="#directory">`Directory`</a>               |                    | 1.0.0 |
| **`recursive`**   | <code>boolean</code>                            | 是否递归删除目录内容                                          | <code>false</code> | 1.0.0 |


#### ReaddirResult

| 属性          | 类型                    | 描述                                        | 自   |
| ------------- | ----------------------- | ------------------------------------------ | ---- |
| **`files`**   | <code>FileInfo[]</code> | 目录内的文件和