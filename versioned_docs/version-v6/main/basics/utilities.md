---
title: Capacitor's JavaScript API
description: Capacitor的JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor的JavaScript API

Capacitor提供了多个JavaScript函数，确保应用能够在多平台上使用同一套代码成功运行。

## 全局Capacitor对象

可以通过以下代码导入全局Capacitor对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor`对象包含多个函数，可帮助解决开发Capacitor应用时最常见的WebView与原生功能交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为Web View友好的路径。

Capacitor应用使用的协议与设备文件协议不同。为避免协议冲突，必须重写设备文件路径。例如在Android上，`file:///path/to/device/file`在使用前需要重写为`http://localhost/_capacitor_file_/path/to/device/file`。

```typescript
// file:///path/to/device/photo.jpg
const rawPhotoUri = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// http://localhost/path/to/device/photo.jpg
const fixedPhotoUri = Capacitor.convertFileSrc(rawPhotoUri.uri),
```

### Capacitor.getPlatform

`getPlatform: () => 'web' | 'ios' | 'android';`

获取当前应用运行平台的名称。根据运行设备不同，返回值为`"web"`、`"ios"`或`"android"`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS平台！');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android平台！');
} else {
  console.log('Web平台！');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行平台是否为原生平台。如果应用作为原生安装的Capacitor应用运行则返回`true`，如果是通过浏览器运行或作为PWA安装则返回`false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我是原生应用！");
} else {
  console.log("我是PWA或网页应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前运行平台是否可用某个插件。插件名称使用插件注册表中的名称，因此也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改为上传文件
} else {
  // 否则直接调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```