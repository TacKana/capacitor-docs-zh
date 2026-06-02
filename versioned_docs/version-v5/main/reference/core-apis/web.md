---
title: Capacitor Web API
description: Capacitor 在 Web 上的 API
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 有几个 JavaScript 实用工具，有助于确保应用在多个平台上使用相同的代码库成功运行。要使用它们，请导入 Capacitor 然后调用所需的实用函数：

## Capacitor 对象

`Capacitor` 对象是几个实用函数的容器。它在 `window.Capacitor` 上可用，但现代 JavaScript 应用的推荐用法是导入它：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 WebView 友好的路径。

Capacitor 应用在不同于设备文件的协议上提供服务。为了避免这些协议之间的困难，必须重写设备文件的路径。例如，在 Android 上，`file:///path/to/device/file` 必须在 WebView 中使用之前重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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
  // 让用户上传文件代替
} else {
  // 否则，进行调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
