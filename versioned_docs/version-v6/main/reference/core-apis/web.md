---
title: Capacitor Web API
description: Capacitor 在 Web 平台上的 API
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 提供了一些实用的 JavaScript 工具，可确保应用程序在不同平台上使用同一份代码库成功运行。使用时，请导入 Capacitor 对象，然后调用所需的工具函数：

## Capacitor 对象

`Capacitor` 对象是多个工具函数的容器。可通过 `window.Capacitor` 访问，但对于现代 JavaScript 应用，推荐使用导入方式：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web 视图友好的路径。

Capacitor 应用所使用的协议与设备文件协议不同。为了避免协议间的冲突，指向设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file`，才能在 Web 视图中使用。

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

### getPlatform()

```typescript
getPlatform: () => string;
```

获取应用当前运行平台的名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行特定于 iOS 的操作
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行原生平台特定的操作
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查当前运行平台上某个插件是否可用。插件名称基于插件注册表，这意味着此方法也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件作为替代方案
} else {
  // 否则，调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```