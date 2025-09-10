---
title: Capacitor Web API
description: Capacitor 在 Web 端的 API 接口
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 提供了一系列 JavaScript 实用工具，帮助开发者使用相同代码库确保应用能在多平台上成功运行。使用时只需导入 Capacitor 后调用相应功能函数：

## Capacitor 对象

`Capacitor` 对象是多个实用函数的容器。虽然可以通过 `window.Capacitor` 访问，但在现代 JavaScript 应用中推荐使用导入方式：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web 视图友好的路径。

由于 Capacitor 应用与设备文件使用不同的协议提供服务，为避免协议冲突，需要重写设备文件路径。例如在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web 视图中使用。

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

获取当前应用运行平台的名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // iOS平台特定逻辑
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检测当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 原生平台特定逻辑
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检测指定插件在当前平台是否可用。插件名称使用插件注册表中的名称，因此也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改为上传文件
} else {
  // 调用相机功能：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```