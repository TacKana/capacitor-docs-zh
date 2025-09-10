---
title: 实时重载
description: 使用实时重载功能，轻松在设备或模拟器上调试应用的网页端和原生部分。
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/guides/live-reload
---

# 实时重载

实时重载功能对于调试应用的网页部分以及在设备硬件或模拟器上的原生功能非常有用。它能在检测到应用代码变更时重新加载浏览器（或Web视图），而无需每次修改代码后都部署新的原生二进制文件。

> 如果在真实设备上运行，请确保设备与电脑连接至同一Wi-Fi网络。

## 与Ionic CLI配合使用

Ionic CLI提供了完整的实时重载体验，自动完成了下文手动操作的所有步骤。请先安装Ionic CLI和`native-run`（一个跨平台命令行工具，用于在设备和模拟器/仿真器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

接着使用`ionic cap run`命令启动实时重载进程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行`ionic build`、将网页资源拷贝到指定原生平台，然后打开对应原生项目的IDE（iOS使用Xcode，Android使用Android Studio）。

命令执行完成后，会自动移除`capacitor.config.json`中创建的`server`配置项。关于`ionic cap run`命令的完整说明，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 与其他框架CLI配合使用

Capacitor也支持具备实时重载能力的其他框架CLI。

首先，确定电脑在局域网中的IP地址：

- macOS系统：运行`ifconfig`命令，IP地址显示在`en0`条目下的`inet`后面。或者打开系统偏好设置 -> 网络 -> (选择活动网络) ，在状态栏中查看IP地址。
- Windows系统：运行`ipconfig`命令，查找`IPv4`地址。

然后启动本地Web服务器。服务器必须绑定到`0.0.0.0`才能从局域网访问。具体启动命令因项目而异，通常是：

```bash
npm run start
```

> 使用react-scripts时，请执行`HOST=0.0.0.0 npm run start`

在`capacitor.config.json`中创建`server`配置项，并使用本地Web服务器的IP地址和端口配置`url`字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接着运行`npx cap copy`将更新后的Capacitor配置复制到所有原生项目中。

如果尚未打开原生IDE，请执行：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用实时重载功能。

> 注意不要将服务器配置提交到源代码版本控制中。