---
title: Capacitor 的 JavaScript API
description: Capacitor 的 JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor 的 JavaScript API

Capacitor 提供了多个 JavaScript 函数，以确保应用能够使用同一套代码库在多个平台上成功运行。

## 全局 Capacitor 对象

你可以通过以下代码导入全局 Capacitor 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象包含多个函数，可帮助你解决在开发 Capacitor 应用时可能遇到的最常见的 WebView 与原生代码交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 友好的路径。

Capacitor 应用的服务协议与设备文件不同。为了避免这些协议间的冲突，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 在使用于 Web View 之前，必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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

获取应用当前运行平台的名称。根据应用运行的设备，该函数将返回 `"web"`、`"ios"` 或 `"android"` 中的一个值。

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

检查当前运行平台是否为原生平台。如果应用作为已安装的原生 Capacitor 应用运行，该函数返回 `true`；如果通过浏览器访问或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我是一款原生应用！");
} else {
  console.log("我是一款 PWA 或 Web 应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查在当前运行平台上某个插件是否可用。插件名称在插件注册表中使用，这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件替代
} else {
  // 否则，调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```