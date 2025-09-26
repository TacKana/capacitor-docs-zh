---
title: Capacitor's JavaScript API
description: Capacitor的JavaScript API接口
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor的JavaScript API

Capacitor提供多个JavaScript函数，确保应用能在多平台上使用相同代码库成功运行。

## 全局Capacitor对象

可通过以下代码导入全局Capacitor对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor`对象包含多个函数，能够解决开发Capacitor应用时最常见的WebView与原生交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为Web View友好的路径。

Capacitor应用使用与设备文件不同的协议提供服务。为避免协议冲突，设备文件路径需要重新处理。例如在Android平台上，`file:///path/to/device/file`需要被转换为`http://localhost/_capacitor_file_/path/to/device/file`才能在Web View中使用。

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

获取当前运行平台的名称。根据运行设备不同，返回值为`"web"`、`"ios"`或`"android"`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS平台！');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android平台！');
} else {
  console.log('网页端！');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

检测当前运行平台是否为原生环境。如果应用是以原生Capacitor应用形式运行则返回`true`，如果是通过浏览器访问或作为PWA安装则返回`false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("这是一个原生应用！");
} else {
  console.log("这是一个PWA或网页应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前平台上是否可用指定插件。插件名称使用插件注册表中的标识，因此也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改用文件上传
} else {
  // 否则直接调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```