---
title: JavaScript 工具函数
description: Capacitor 的 JavaScript 工具函数
contributors:
  - dotNetkow
slug: /basics/utilities
---

# JavaScript 工具函数

Capacitor 提供了一些 JavaScript 工具函数，有助于确保应用使用相同的代码库在多个平台上成功运行。要使用它们，请导入 Capacitor 然后调用所需的工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 兼容的路径。

Capacitor 应用使用与设备文件不同的协议提供服务。为了避免这些协议之间的兼容性问题，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

## isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行平台是否为原生平台（`ios`、`android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行某些操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前运行平台上是否可以使用某个插件。插件名称用于插件注册表（例如 `const { Name } = Plugins;`），这也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 改让用户上传文件
} else {
  // 否则，进行调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
