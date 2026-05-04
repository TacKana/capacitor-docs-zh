---
title: Filesystem Capacitor Plugin API
description: Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上进行文件操作。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/filesystem/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了一个类似 NodeJS 的 API，用于在设备上进行文件操作。

## 安装

```bash
npm install @capacitor/filesystem@latest-6
npx cap sync
```

## Apple 隐私清单要求

苹果要求应用开发者现在必须为 API 使用指定批准的原因，以增强用户隐私。在 2024 年 5 月 1 日之前，向 App Store Connect 提交应用时必须包含这些原因。

在应用中使用此特定插件时，必须在 `/ios/App` 目录下创建一个 `PrivacyInfo.xcprivacy` 文件，或使用 VS Code 扩展来生成它，并指定使用原因。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，必需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的原因是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### 示例 PrivacyInfo.xcprivacy

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

## iOS

若要使文件出现在“文件”应用中，还必须在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
- `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

如需帮助，请阅读[配置 iOS](https://capacitorjs.com/docs/ios/configuration)。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本中，此 API 要求将以下权限添加到 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

有关设置 Android 权限的更多信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

请注意，<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 或更早版本上可用，而 <a href="#directory">`Directory.Documents`</a> 在 Android 11 及更新版本上仅允许访问应用创建的文件/文件夹。

处理大文件时，可能需要在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 在文件之间有额外的隔离层，例如备份到云端的特殊目录或用于存储文档的目录。Filesystem API 提供了一种简单的方法，将每个操作限定到设备上的特定特殊目录。

此外，Filesystem API 支持使用完整的 `file://` 路径，或者在 Android 上读取 `content://` 文件。只需省略 `directory` 参数即可使用完整的文件路径。

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
  // 这是一个读取完整文件路径文件的示例。使用此方法可以从返回文件 URI 的插件（例如相机）读取二进制数据（base64 编码）。
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
* [接口](#接口)
* [类型别名](#类型别名)
* [枚举](#枚举)

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

**返回值：** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备上指定位置的磁盘

| 参数          | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

在设备上指定位置的磁盘文件中追加内容

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自：** 1.0.0

--------------------

### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘中删除文件

| 参数         | 类型                                                              |
| ------------ | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**始于：** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建一个目录。

| 参数         | 类型                                                |
| ------------ | --------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**始于：** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除一个目录

| 参数         | 类型                                                |
| ------------ | --------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**始于：** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数         | 类型                                                    |
| ------------ | ------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回指定路径和目录的完整文件 URI

| 参数         | 类型                                                  |
| ------------ | ----------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件的相关数据

| 参数         | 类型                                            |
| ------------ | ----------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| 参数         | 类型                                            |
| ------------ | ----------------------------------------------- |
| **`options`** | <code><a href="#renameoptions">RenameOptions</a></code> |

**始于：** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数         | 类型                                            |
| ------------ | ----------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**始于：** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读/写权限。
在 Android 上，仅在使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读/写权限。
在 Android 上，仅在使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值：** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求，并将文件下载到指定目标位置。

| 参数         | 类型                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**始于：** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

为文件下载进度事件添加监听器。

| 参数               | 类型                                                            |
| ------------------ | --------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器。

**始于：** 5.2.0

--------------------


### 接口


#### ReadFileResult

| 属性       | 类型                        | 描述                                                                                                                            | 始于 |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | 文件中所包含数据的表示形式 注意：Blob 仅在 Web 上可用。在原生平台上，数据以字符串形式返回。 | 1.0.0 |

#### ReadFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                   | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要读取的文件路径                                                                                                                                                       | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 读取文件                                                                                                                   | 1.0.0    |
| **`encoding`**   | <code><a href="#encoding">Encoding</a></code>   | 读取文件时使用的编码方式。如果不提供，数据将以二进制形式读取并以 base64 编码返回。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串读取                       | 1.0.0    |


#### WriteFileResult

| 属性        | 类型                | 描述                 | 起始版本 |
| ----------- | ------------------- | -------------------- | -------- |
| **`uri`**   | <code>string</code> | 文件写入位置的 URI   | 1.0.0    |


#### WriteFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                   | 默认值             | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要写入的文件路径                                                                                                                                                       |                    | 1.0.0    |
| **`data`**       | <code>string \| Blob</code>                     | 要写入的数据。注意：仅 Web 平台支持 Blob 数据                                                                                                                          |                    | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                                        |                    | 1.0.0    |
| **`encoding`**   | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码方式。如果不提供，数据将以 base64 编码写入。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入                                       |                    | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否创建所有缺失的父目录                                                                                                                                               | <code>false</code> | 1.0.0    |


#### AppendFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                   | 起始版本 |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`path`**       | <code>string</code>                             | 要追加内容的文件路径                                                                                                                                                   | 1.0.0    |
| **`data`**       | <code>string</code>                             | 要写入的数据                                                                                                                                                           | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                                                        | 1.0.0    |
| **`encoding`**   | <code><a href="#encoding">Encoding</a></code>   | 写入文件时使用的编码方式。如果不提供，数据将以 base64 编码写入。传入 <a href="#encoding">Encoding.UTF8</a> 可将数据作为字符串写入                                       | 1.0.0    |


#### DeleteFileOptions

| 属性             | 类型                                            | 描述                                                         | 起始版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要删除的文件路径                                             | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 删除文件         | 1.0.0    |


#### MkdirOptions

| 属性             | 类型                                            | 描述                                                               | 默认值             | 起始版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------ | -------- |
| **`path`**       | <code>string</code>                             | 新目录的路径                                                       |                    | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 在哪个 <a href="#directory">`Directory`</a> 中创建新目录           |                    | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否同时创建所有缺失的父目录                                       | <code>false</code> | 1.0.0    |


#### RmdirOptions

| 属性             | 类型                                            | 描述                                                               | 默认值             | 起始版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------ | ------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要移除的目录路径                                                   |                    | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 从哪个 <a href="#directory">`Directory`</a> 移除目录               |                    | 1.0.0    |
| **`recursive`**  | <code>boolean</code>                            | 是否递归移除目录中的所有内容                                       | <code>false</code> | 1.0.0    |

#### ReaddirResult

| 属性         | 类型                     | 描述                                     | 始于版本 |
| ------------ | ------------------------ | ---------------------------------------- | -------- |
| **`files`**  | <code>FileInfo[]</code>  | 目录内的文件和目录列表                   | 1.0.0    |


#### FileInfo

| 属性         | 类型                               | 描述                                                                     | 始于版本 |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------ | -------- |
| **`name`**   | <code>string</code>                | 文件或目录的名称。                                                       |          |
| **`type`**   | <code>'file' \| 'directory'</code> | 文件类型。                                                               | 4.0.0    |
| **`size`**   | <code>number</code>                | 文件大小，单位为字节。                                                   | 4.0.0    |
| **`ctime`**  | <code>number</code>                | 创建时间，单位为毫秒。在 Android 7 及更早的设备上不可用。                | 4.0.0    |
| **`mtime`**  | <code>number</code>                | 最后修改时间，单位为毫秒。                                               | 4.0.0    |
| **`uri`**    | <code>string</code>                | 文件的统一资源标识符（URI）。                                            | 4.0.0    |


#### ReaddirOptions

| 属性             | 类型                                            | 描述                                       | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要读取的目录路径                           | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 列出文件来源的 <a href="#directory">`Directory`</a> | 1.0.0    |


#### GetUriResult

| 属性       | 类型                | 描述             | 始于版本 |
| ---------- | ------------------- | ---------------- | -------- |
| **`uri`**  | <code>string</code> | 文件的统一资源标识符（URI） | 1.0.0    |


#### GetUriOptions

| 属性             | 类型                                            | 描述                                       | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要获取统一资源标识符（URI）的文件路径       | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0    |


#### StatResult

| 属性         | 类型                               | 描述                                                                     | 始于版本 |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------ | -------- |
| **`type`**   | <code>'file' \| 'directory'</code> | 文件类型。                                                               | 1.0.0    |
| **`size`**   | <code>number</code>                | 文件大小，单位为字节。                                                   | 1.0.0    |
| **`ctime`**  | <code>number</code>                | 创建时间，单位为毫秒。在 Android 7 及更早的设备上不可用。                | 1.0.0    |
| **`mtime`**  | <code>number</code>                | 最后修改时间，单位为毫秒。                                               | 1.0.0    |
| **`uri`**    | <code>string</code>                | 文件的统一资源标识符（URI）。                                            | 1.0.0    |


#### StatOptions

| 属性             | 类型                                            | 描述                                       | 始于版本 |
| ---------------- | ----------------------------------------------- | ------------------------------------------ | -------- |
| **`path`**       | <code>string</code>                             | 要获取信息的文件路径                       | 1.0.0    |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 文件所在的 <a href="#directory">`Directory`</a> | 1.0.0    |


#### CopyOptions

| 属性               | 类型                                            | 描述                                                                                                             | 始于版本 |
| ------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| **`from`**         | <code>string</code>                             | 现有的文件或目录。                                                                                               | 1.0.0    |
| **`to`**           | <code>string</code>                             | 目标文件或目录。                                                                                                 | 1.0.0    |
| **`directory`**    | <code><a href="#directory">Directory</a></code> | 包含现有文件或目录的 <a href="#directory">`Directory`</a>。                                                      | 1.0.0    |
| **`toDirectory`**  | <code><a href="#directory">Directory</a></code> | 包含目标文件或目录的 <a href="#directory">`Directory`</a>。如果未提供，则使用 'directory' 参数作为目标目录。      | 1.0.0    |


#### CopyResult

| 属性       | 类型                | 描述                       | 始于版本 |
| ---------- | ------------------- | -------------------------- | -------- |
| **`uri`**  | <code>string</code> | 文件被复制到的位置的统一资源标识符（URI） | 4.0.0    |


#### PermissionStatus

| 属性                      | 类型                                                        |
| ------------------------- | ----------------------------------------------------------- |
| **`publicStorage`**       | <code><a href="#permissionstate">PermissionState</a></code> |


#### DownloadFileResult

| 属性         | 类型                | 描述                                                                 | 始于版本 |
| ------------ | ------------------- | -------------------------------------------------------------------- | -------- |
| **`path`**   | <code>string</code> | 文件被下载到的路径。                                                 | 5.1.0    |
| **`blob`**   | <code>Blob</code>   | 已下载文件的二进制大对象（Blob）数据。此属性仅在 Web 平台上可用。    | 5.1.0    |

#### DownloadFileOptions

| 属性             | 类型                                            | 描述                                                                                                                                                                                                                              | 默认值               | 始于   |
| ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ |
| **`path`**       | <code>string</code>                             | 下载文件应移动到的路径。                                                                                                                                                                                                         |                      | 5.1.0  |
| **`directory`**  | <code><a href="#directory">Directory</a></code> | 文件写入的目录。如果使用此选项，filePath 可以是相对路径而非绝对路径。默认为 `DATA` 目录。                                                                                                                                        |                      | 5.1.0  |
| **`progress`**   | <code>boolean</code>                            | 可选的事件监听函数，用于接收下载进度事件。如果使用此选项，应在每次收到数据块时派发进度事件。在 Android/iOS 上，为了不影响性能，数据块的派发会被限制在每 100 毫秒一次。                                                           |                      | 5.1.0  |
| **`recursive`**  | <code>boolean</code>                            | 是否创建缺失的父目录。                                                                                                                                                                                                           | <code>false</code>   | 5.1.2  |


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| 属性                  | 类型                | 描述                                           | 始于   |
| --------------------- | ------------------- | ---------------------------------------------- | ------ |
| **`url`**             | <code>string</code> | 正在下载的文件的 URL。                         | 5.1.0  |
| **`bytes`**           | <code>number</code> | 到目前为止已下载的字节数。                     | 5.1.0  |
| **`contentLength`**   | <code>number</code> | 该文件需要下载的总字节数。                     | 5.1.0  |


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

| 成员                 | 值                               | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 始于   |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **`Documents`**      | <code>'DOCUMENTS'</code>         | Documents 目录。在 iOS 上是应用的 documents 目录，用于存储用户生成的内容。在 Android 上是公共文档文件夹，因此可以被其他应用访问。在 Android 10 上，除非应用在 `AndroidManifest.xml` 的 `application` 标签中启用 `android:requestLegacyExternalStorage="true"`，否则无法访问。在 Android 11 或更高版本上，应用只能访问自己创建的文件/文件夹。                                                                                | 1.0.0  |
| **`Data`**           | <code>'DATA'</code>              | Data 目录。在 iOS 上使用 Documents 目录。在 Android 上是存放应用文件的目录。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0  |
| **`Library`**        | <code>'LIBRARY'</code>           | Library 目录。在 iOS 上使用 Library 目录。在 Android 上是存放应用文件的目录。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                                                                                                                    | 1.1.0  |
| **`Cache`**          | <code>'CACHE'</code>             | Cache 目录。在内存不足时可能被删除，因此请将此目录用于可以轻松重新创建的、与应用相关的文件。                                                                                                                                                                                                                                                                                                                                                                                             | 1.0.0  |
| **`External`**       | <code>'EXTERNAL'</code>          | External 目录。在 iOS 上使用 Documents 目录。在 Android 上是主共享/外部存储设备上应用可以放置其拥有的持久性文件的目录。这些文件是应用内部的，通常不作为媒体文件对用户可见。应用卸载时文件会被删除。                                                                                                                                                                                                                                                                                        | 1.0.0  |
| **`ExternalStorage`**| <code>'EXTERNAL_STORAGE'</code>  | 外部存储目录。在 iOS 上使用 Documents 目录。在 Android 上是主共享/外部存储目录。在 Android 10 上，除非应用在 `AndroidManifest.xml` 的 `application` 标签中启用 `android:requestLegacyExternalStorage="true"`，否则无法访问。在 Android 11 或更高版本上无法访问。                                                                                                                                                                                                                           | 1.0.0  |

#### 编码类型 {#encoding}

| 成员        | 值                   | 描述                                                                                                                             | 始于版本 |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **`UTF8`**  | <code>'utf8'</code>  | 八位 UCS 转换格式                                                                                                                       | 1.0.0    |
| **`ASCII`** | <code>'ascii'</code> | 七位 ASCII，也称为 ISO646-US 或 Unicode 字符集的基本拉丁语块。此编码仅在 Android 上受支持。                                            | 1.0.0    |
| **`UTF16`** | <code>'utf16'</code> | 十六位 UCS 转换格式，字节顺序由可选的字节顺序标记标识。此编码仅在 Android 上受支持。                                                     | 1.0.0    |

</docgen-api>