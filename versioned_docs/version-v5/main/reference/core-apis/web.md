---
title: Capacitor Web API
description: 适用于 Web 平台的 Capacitor API
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 提供了一些 JavaScript 实用工具，有助于确保应用使用同一套代码在多个平台上成功运行。要使用它们，请先导入 Capacitor，然后调用所需的实用函数：

## Capacitor 对象

`Capacitor` 对象是多个实用函数的容器。它可以通过 `window.Capacitor` 访问，但对于现代 JavaScript 应用，推荐的使用方式是导入它：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web 视图友好的路径。

Capacitor 应用使用的协议与设备文件不同。为了避免这些协议之间的冲突，设备文件的路径必须进行重写。例如，在 Android 上，`file:///path/to/device/file` 必须在 Web 视图中使用之前重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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
  // 执行特定操作
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行特定操作
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查指定插件在当前运行平台上是否可用。插件名称使用插件注册表中的名称，这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件代替
} else {
  // 否则，直接调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```