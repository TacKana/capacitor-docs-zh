---
title: Capacitor Web API
description: Web 上 Capacitor 的 API
translated: true
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 有几个 JavaScript 工具函数，有助于确保应用使用相同的代码库跨多个平台成功运行。要使用它们，导入 Capacitor 然后调用所需的工具函数：

## Capacitor 对象

`Capacitor` 对象是多个工具函数的容器。它在 `window.Capacitor` 上可用，但对于现代 JavaScript 应用，推荐的用法是导入它：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web View 友好的路径。

Capacitor 应用在不同的协议上提供服务，与设备文件不同。为避免这些协议之间的困难，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file`，然后才能在 Web View 中使用。

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

获取应用当前运行的平台名称：`web`、`ios`、`android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行某些操作
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检查当前运行的平台是否是原生平台（`ios`、`android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行某些操作
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查插件在当前运行的平台上是否可用。插件名称用于插件注册表，这意味着它也适用于自定义插件。

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
