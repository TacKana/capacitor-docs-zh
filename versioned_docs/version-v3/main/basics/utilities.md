---
title: JavaScript Utilities
description: Capacitor 的 JavaScript 工具函数
contributors:
  - dotNetkow
slug: /basics/utilities
---

# JavaScript 工具函数

Capacitor 提供了一些 JavaScript 工具函数，有助于确保应用在使用相同代码库的情况下，能够在多个平台上成功运行。要使用这些函数，请先导入 Capacitor，然后调用所需的工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web 视图友好的路径。

Capacitor 应用使用的协议与设备文件不同。为了避免这些协议之间的冲突，设备文件的路径必须经过重写。例如，在 Android 上，`file:///path/to/device/file` 必须在 Web 视图中使用之前，重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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

获取应用当前运行平台的名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行相关操作
}
```

## isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行相关操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查某个插件在当前运行平台上是否可用。插件名称在插件注册表中使用（例如 `const { Name } = Plugins;`），这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件代替
} else {
  // 否则，调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```