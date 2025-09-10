---
title: Capacitor Web API
description: Capacitor在Web端的API接口
slug: /core-apis/web
---

# Capacitor Web API

Capacitor提供了一系列JavaScript实用工具，帮助开发者使用同一套代码库确保应用能在多平台上成功运行。使用时只需导入Capacitor并调用相应的工具函数：

## Capacitor对象

`Capacitor`对象是多个工具函数的容器。虽然可以通过`window.Capacitor`访问，但我们推荐在现代JavaScript应用中采用导入方式：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为Web视图友好的路径。

由于Capacitor应用运行在不同于设备文件的协议下，为了避免协议冲突，需要对设备文件路径进行转换。例如在Android平台上，`file:///path/to/device/file`需要被重写为`http://localhost/_capacitor_file_/path/to/device/file`才能在Web视图中使用。

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

获取当前运行平台的名称：`web`、`ios`或`android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // iOS平台特定逻辑
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检测当前运行平台是否是原生平台（`ios`或`android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 原生平台特定逻辑
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查指定插件在当前平台是否可用。插件名称使用注册时的名称，因此也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件替代
} else {
  // 否则直接调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```