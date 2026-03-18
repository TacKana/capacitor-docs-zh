---
title: JavaScript Utilities
description: Capacitor 的 JavaScript 工具函数
contributors:
  - dotNetkow
---

# JavaScript 工具函数

Capacitor 提供了多个 JavaScript 工具函数，有助于确保应用在跨平台运行时使用同一套代码库。要使用这些函数，首先导入 Capacitor，然后调用所需的工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 友好的路径。

Capacitor 应用使用与设备文件不同的协议提供服务。为了避免这些协议之间的冲突，设备文件路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

获取应用当前运行平台名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行特定操作
}
```

## isNative

`isNative?: boolean;`

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNative) {
  // 执行特定操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前运行平台上某个插件是否可用。插件名称需使用在插件注册表中的名称（例如 `const { Name } = Plugins;`），这意味着它同样适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改为上传文件
} else {
  // 否则，调用插件功能：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```