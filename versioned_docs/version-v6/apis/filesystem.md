---
title: Filesystem Capacitor Plugin API
description: Filesystem API 提供了类似 NodeJS 的文件操作接口，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/6.x/filesystem/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/6.x/filesystem/src/definitions.ts
sidebar_label: Filesystem
---

# @capacitor/filesystem

Filesystem API 提供了类似 NodeJS 的文件操作接口，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple 隐私清单要求

苹果现在要求应用开发者说明 API 使用的隐私原因以增强用户隐私保护。2024年5月1日起，提交应用到 App Store Connect 时必须包含这些声明原因。

当在应用中使用本插件时，你需要在 `/ios/App` 目录下创建 `PrivacyInfo.xcprivacy` 文件或使用 VS Code 扩展生成该文件，并指定使用原因。

具体操作步骤请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于本插件，必须包含的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐声明原因是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### 示例 PrivacyInfo.xcprivacy

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，将此字典项添加到数组中 -->
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

要使文件显示在文件应用中，你还需要在 `Info.plist` 中将以下键设置为 `YES`：

- `UIFileSharingEnabled` (`支持 iTunes 文件共享`)
- `LSSupportsOpeningDocumentsInPlace` (`支持就地打开文档`)

查看 [iOS 配置指南](https://capacitorjs.com/docs/ios/configuration) 获取帮助。

## Android

如果使用 <a href="#directory">`Directory.Documents`</a> 或 <a href="#directory">`Directory.ExternalStorage`</a>，在 Android 10 及更早版本中，此 API 需要将以下权限添加到 `AndroidManifest.xml`：

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

更多关于设置 Android 权限的信息，请参阅 [Android 指南](https://capacitorjs.com/docs/android) 中的 [设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)。

注意：<a href="#directory">`Directory.ExternalStorage`</a> 仅在 Android 9 及更早版本可用，而 <a href="#directory">`Directory.Documents`</a> 在 Android 11 及更新版本中只能访问应用创建的文件/文件夹。

处理大文件时，你可能需要在 `AndroidManifest.xml` 的 `<application>` 标签中添加 `android:largeHeap="true"`。

## 理解目录和文件

iOS 和 Android 对文件有额外的分层机制，如特殊目录会被备份到云端，或专门存储文档的目录。Filesystem API 提供了简便的方式来限定每个操作在设备的特定目录范围内。

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

  console.log('秘密内容:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // 这是一个读取完整文件路径文件的示例。可以用于从返回文件 URI 的插件（如相机）中读取二进制数据（base64 编码）
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('数据:', contents);
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

| 参数         | 类型                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

将文件写入设备的指定位置

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#writefileresult">WriteFileResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

追加内容到设备的指定文件中

| 参数         | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code> |

**自:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

从磁盘删除文件

| 参数         | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code> |

**自:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| 参数         | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> |

**自:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| 参数         | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> |

**自:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件列表（非递归）

| 参数         | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

返回路径和目录的完整文件 URI

| 参数         | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件相关信息

| 参数         | 类型                                                |
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

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**自:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

复制文件或目录

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求读写权限。
仅在 Android 上使用 <a href="#directory">`Directory.Documents`</a> 或
`Directory.ExternalStorage` 时需要。

**返回值:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**自:** 1.0.0

--------------------


### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

向服务器发起 HTTP 请求并将文件下载到指定位置。

| 参数         | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**返回值:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**自:** 5.1.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

添加文件下载进度事件监听器。

| 参数              | 类型                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                       |
| **`listenerFunc`** | <code><a href="#progresslistener">ProgressListener</a></code> |

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自:** 5.1.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除本插件的所有监听器。

**自:** 5.2.0

--------------------


### 接口


#### ReadFileResult

| 属性       | 类型                        | 描述                                                                                                                            | 自 |
| ---------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`data`** | <code>string \| Blob</code> | 文件中包含的数据表示形式 注意：Blob 仅在 Web 上可用。在原生平台，数据会以字符串形式返回。 | 1.0.0 |


#### ReadFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                                                 | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要读取的文件路径                                                                                                                                                | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 读取文件的 <a href="#directory">`Directory`</a>                                                                                                              | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 读取文件的编码方式，如未提供，数据将作为二进制读取并返回 base64 编码。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据读取为字符串 | 1.0.0 |


#### WriteFileResult

| 属性      | 类型                | 描述                             | 自 |
| --------- | ------------------- | --------------------------------------- | ----- |
| **`uri`** | <code>string</code> | 文件写入位置的 uri | 1.0.0 |


#### WriteFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 默认值            | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`path`**      | <code>string</code>                             | 要写入的文件路径                                                                                                                             |                    | 1.0.0 |
| **`data`**      | <code>string \| Blob</code>                     | 要写入的数据 注意：Blob 数据仅在 Web 上支持。                                                                                               |                    | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                             |                    | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 文件写入编码方式。如未提供，数据将作为 base64 写入。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据写入为字符串 |                    | 1.0.0 |
| **`recursive`** | <code>boolean</code>                            | 是否创建所有缺失的父目录。                                                                                                         | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| 属性            | 类型                                            | 描述                                                                                                                                               | 自 |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要追加内容的文件路径                                                                                                                            | 1.0.0 |
| **`data`**      | <code>string</code>                             | 要写入的数据                                                                                                                                         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 存储文件的 <a href="#directory">`Directory`</a>                                                                                             | 1.0.0 |
| **`encoding`**  | <code><a href="#encoding">Encoding</a></code>   | 文件写入编码方式。如未提供，数据将作为 base64 写入。传递 <a href="#encoding">Encoding.UTF8</a> 可将数据写入为字符串 | 1.0.0 |


#### DeleteFileOptions

| 属性            | 类型                                            | 描述                                                      | 自 |
| --------------- | ----------------------------------------------- | ---------------------------------------------------------------- | ----- |
| **`path`**      | <code>string</code>                             | 要删除的文件路径                                   | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 删除文件的 <a href="#directory">`Directory`</a> | 1.0.0 |


#### MkdirOptions

| 属性            | 类型                                            |