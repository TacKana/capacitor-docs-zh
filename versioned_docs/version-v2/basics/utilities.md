---
title: JavaScript 实用工具
description: Capacitor 的 JavaScript 实用工具
contributors:
  - dotNetkow
---

# JavaScript 实用工具

Capacitor 提供了一些 JavaScript 实用工具，有助于确保应用在多个平台上使用相同的代码库成功运行。要使用它们，请导入 Capacitor 然后调用所需的实用工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 兼容的路径。

Capacitor 应用在不同于设备文件的协议上提供服务。为避免这些协议之间的差异，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 在使用之前必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

```typescript
// file:///path/to/device/photo.jpg
const savedPhotoFile = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// http://localhost/path/to/device/photo.jpg
const savedPhoto = Capacitor.convertFileSrc(savedPhotoFile.uri),
document.getElementById("savedPhoto").src = savedPhoto;
```

```html
<img id="savedPhoto" />
```

## getPlatform

`getPlatform: () => string;`

获取应用当前运行平台的名称：`web`、`ios`、`android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行某些操作
}
```

## isNative

`isNative?: boolean;`

检查当前运行的平台是否是原生平台（`ios`、`android`）。

```typescript
if (Capacitor.isNative) {
  // 执行某些操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查插件在当前运行的平台上是否可用。插件名称用于插件注册表中（例如 `const { Name } = Plugins;`），这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件
} else {
  // 否则，进行调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```