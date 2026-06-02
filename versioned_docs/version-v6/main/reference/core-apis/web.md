---
title: Capacitor Web API
description: Capacitor 在 Web 上的 API
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 有几个 JavaScript 实用工具，对于确保应用在多个平台上使用相同代码库成功运行很有用。要使用它们，导入 Capacitor 然后调用所需的实用函数：

## Capacitor 对象

`Capacitor` 对象是几个实用函数的容器。它在 `window.Capacitor` 上可用，但对于现代 JavaScript 应用，推荐的使用方式是导入它：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web View 兼容的路径。

Capacitor 应用使用与设备文件不同的协议提供服务。为避免这些协议之间的困难，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

获取应用当前运行所在的平台名称：`web`、`ios`、`android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行某些操作
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检查当前运行的平台是否为原生平台（`ios`、`android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行某些操作
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查插件在当前运行的平台上是否可用。插件名称用于插件注册表，因此它也适用于自定义插件。

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
