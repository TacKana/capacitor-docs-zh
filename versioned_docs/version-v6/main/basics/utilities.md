---
title: Capacitor 的 JavaScript API
description: Capacitor 的 JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor 的 JavaScript API

Capacitor 提供了几个 JavaScript 函数，以确保应用能够在多个平台上使用相同的代码库成功运行。

## 全局 Capacitor 对象

您可以使用以下代码导入全局的 Capacitor 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象具有多个函数，可帮助解决开发 Capacitor 应用时可能遇到的最常见的 WebView 到原生的问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 Web View 兼容的路径。

Capacitor 应用使用与设备文件不同的协议提供服务。为避免这些协议之间的困难，设备文件的路径必须被重写。例如，在 Android 上，`file:///path/to/device/file` 必须被重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web View 中使用。

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

获取应用当前运行所在的平台名称。根据应用运行的设备，将返回 `"web"`、`"ios"` 或 `"android"` 值。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS！');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android！');
} else {
  console.log('Web！');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

检查当前运行的平台是否为原生平台。如果应用作为原生的已安装 Capacitor 应用运行，此函数返回 `true`；如果通过浏览器提供服务或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我是一个原生应用！");
} else {
  console.log("我是一个 PWA 或 Web 应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查插件在当前运行的平台上是否可用。插件名称用于插件注册表，因此它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件
} else {
  // 否则，进行调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
