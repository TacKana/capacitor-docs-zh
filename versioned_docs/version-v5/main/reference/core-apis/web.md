---
title: Capacitor Web API
description: Capacitor 在 Web 平台的核心 API
slug: /core-apis/web
---

# Capacitor Web API 指南

Capacitor 提供了一系列 JavaScript 实用工具，帮助开发者使用同一套代码库确保应用能在多平台成功运行。使用时请先导入 Capacitor 模块，然后调用所需的工具函数：

## Capacitor 核心对象

`Capacitor` 对象封装了多个实用功能。虽然可以通过 `window.Capacitor` 访问，但我们推荐现代 JavaScript 应用使用模块导入方式：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 WebView 可识别的路径格式。

由于 Capacitor 应用与设备文件使用不同的协议提供服务，为避免协议冲突，设备文件路径需要被重写。例如在 Android 平台上，`file:///path/to/device/file` 必须被转换为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 WebView 中使用。

```typescript
// 原始路径：file:///path/to/device/photo.jpg
const savedPhotoFile = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// 转换后路径：http://localhost/path/to/device/photo.jpg
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

获取当前运行平台的名称，可能返回值包括：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // iOS 平台专属逻辑
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检测当前运行平台是否为原生平台（即 `ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 原生平台专属逻辑
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检测指定插件在当前平台是否可用。该方法通过插件注册表中的名称进行查询，因此也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 当相机不可用时，改用文件上传方案
} else {
  // 正常调用相机功能
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```