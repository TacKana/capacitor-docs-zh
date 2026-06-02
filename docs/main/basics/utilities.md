---
title: Capacitor 的 JavaScript API
description: Capacitor 的 JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor 的 JavaScript API

Capacitor 提供了多个 JavaScript 函数，以确保应用能够使用同一套代码库在多个平台上成功运行。

## 全局 Capacitor 对象

你可以通过以下代码导入全局的 `Capacitor` 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象提供了多个函数，用于帮助解决在开发 Capacitor 应用时可能遇到的最常见的 WebView 与原生交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 兼容的路径。

Capacitor 应用的协议与设备文件的协议不同。为了避免这些协议之间的兼容性问题，设备文件的路径需要被重写。例如，在 Android 上，`file:///path/to/device/file` 必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

获取当前应用运行所在平台的名称。根据应用运行的设备不同，该函数将返回 `"web"`、`"ios"` 或 `"android"` 中的某个值。

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

检查当前运行的平台是否为原生平台。如果应用作为原生安装的 Capacitor 应用运行，则此函数返回 `true`；如果应用通过浏览器访问或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("I'm a native app!");
} else {
  console.log("I'm a PWA or Web app!");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查某个插件在当前运行的平台上是否可用。插件名称用于在插件注册表中查找，这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件代替
} else {
  // 否则，调用插件：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
