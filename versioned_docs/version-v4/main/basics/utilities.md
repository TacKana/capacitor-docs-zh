---
title: Capacitor's JavaScript API
description: Capacitor 的 JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor 的 JavaScript API

Capacitor 提供了多个 JavaScript 函数，以确保应用能在多个平台上使用同一套代码库成功运行。

## 全局 Capacitor 对象

您可以使用以下代码导入全局 Capacitor 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象包含多个函数，可帮助您解决在开发 Capacitor 应用时可能遇到的最常见的 WebView 与原生交互的问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为对 Web View 友好的路径。

Capacitor 应用使用的协议与设备文件不同。为避免这些协议之间的兼容性问题，设备文件的路径必须进行重写。例如，在 Android 上，`file:///path/to/device/file` 在被 Web View 使用之前，必须重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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

获取应用当前运行的平台名称。根据应用运行的设备，此函数将返回 `"web"`、`"ios"` 或 `"android"` 中的一个值。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS!');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android!');
} else {
  console.log('Web!');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行的平台是否为原生平台。如果应用作为原生、已安装的 Capacitor 应用运行，此函数返回 `true`；如果通过浏览器访问或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我是一款原生应用！");
} else {
  console.log("我是一款 PWA 或 Web 应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前运行的平台上是否可用某个插件。插件名称在插件注册表中使用，这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件来代替
} else {
  // 否则，调用相机：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```