---
title: JavaScript Utilities
description: Capacitor 的 JavaScript 工具集
contributors:
  - dotNetkow
slug: /basics/utilities
---

# JavaScript 工具集

Capacitor 提供了一系列 JavaScript 工具函数，帮助开发者用同一套代码确保应用能在多个平台上成功运行。使用时，先导入 Capacitor 然后调用需要的工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 可识别的路径。

Capacitor 应用使用的协议与设备文件不同。为避免协议冲突，必须对设备文件路径进行转换。例如在 Android 平台上，`file:///path/to/device/file` 需要转换为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

获取当前运行平台的名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行 iOS 平台相关操作
}
```

## isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行原生平台相关操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查指定插件在当前平台是否可用。插件名称需使用插件注册时的名称（如 `const { Name } = Plugins;`），因此该方法也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改用文件上传功能
} else {
  // 否则直接调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```