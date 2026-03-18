---
title: Capacitor's JavaScript API
description: Capacitor's JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor JavaScript API

Capacitor 提供了多个 JavaScript 函数，确保应用能够在多平台上使用同一套代码库成功运行。

## 全局 Capacitor 对象

你可以通过以下代码导入全局 Capacitor 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象包含多个实用函数，用于解决开发 Capacitor 应用时可能遇到的最常见的 WebView 与原生交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 WebView 友好的路径。

Capacitor 应用的服务协议与设备文件协议不同。为避免协议间的不兼容问题，设备文件路径必须进行重写。例如，在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 WebView 中使用。

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

获取应用当前运行平台的名称。根据应用运行的设备，该函数会返回 `"web"`、`"ios"` 或 `"android"` 中的一个值。

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

检查当前运行平台是否为原生平台。如果应用以原生安装的 Capacitor 应用形式运行，该函数返回 `true`；如果通过浏览器访问或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我运行在原生应用上！");
} else {
  console.log("我运行在 PWA 或 Web 应用上！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查指定插件在当前运行平台上是否可用。插件名称使用插件注册表中的名称，这意味着该函数也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改用文件上传
} else {
  // 否则，直接调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```