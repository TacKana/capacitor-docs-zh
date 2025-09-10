---
title: JavaScript Utilities
description: Capacitor的JavaScript实用工具
contributors:
  - dotNetkow
---

# JavaScript 实用工具

Capacitor 提供了一系列 JavaScript 实用工具，确保应用能在多平台上使用相同代码库顺利运行。使用时需先导入 Capacitor，然后调用所需的工具函数：

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web 视图友好的路径。

Capacitor 应用与设备文件使用不同的协议服务。为避免协议冲突，设备文件路径需要被重写。例如在 Android 平台上，`file:///path/to/device/file` 需要被转换为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web 视图中使用。

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

获取当前运行平台名称：`web`（网页）、`ios`（苹果）、`android`（安卓）。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行iOS平台特定操作
}
```

## isNative

`isNative?: boolean;`

检测当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNative) {
  // 执行原生平台操作
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检测指定插件在当前平台是否可用。插件名称需使用插件注册表中的名称（如 `const { Name } = Plugins;`），该方法同样适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改用文件上传方式
} else {
  // 否则直接调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```