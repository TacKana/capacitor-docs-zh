---
title: 实时重载
description: 使用实时重载功能，轻松在设备或模拟器上调试应用的网页端和原生功能部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载

实时重载功能对于调试应用的网页部分以及设备硬件或模拟器上的原生功能都非常有用。它会在检测到应用代码变更时重新加载浏览器（或Web视图），而无需每次修改代码后都重新部署原生二进制包。

> 如果在真实设备上运行，请确保设备与电脑连接至同一Wi-Fi网络。

## 配合Ionic CLI使用

Ionic CLI提供了完整的实时重载体验，自动完成了下文手动操作的所有步骤。请先安装CLI和`native-run`（一个跨平台命令行工具，用于在设备和模拟器上运行原生二进制包）：

```bash
npm install -g @ionic/cli native-run
```

然后使用`ionic cap run`命令启动实时重载：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行`ionic build`构建、将网页资源复制到指定原生平台中，然后打开对应原生项目的IDE（iOS使用Xcode，Android使用Android Studio）。

命令执行完成后，会自动移除`capacitor.config.json`中创建的`server`配置项。有关`ionic cap run`命令的完整说明，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 配合其他框架CLI使用

Capacitor支持具备实时重载能力的其他框架CLI。

首先确定电脑在局域网中的IP地址：

- macOS系统：运行`ifconfig`命令，IP地址显示在`en0`条目下的`inet`后面。或者打开系统偏好设置 -> 网络 ->（选择活动网络）然后在状态栏查看IP地址。
- Windows系统：运行`ipconfig`命令，查找`IPv4`地址。

接着启动本地Web服务器。服务器必须绑定到`0.0.0.0`才能被局域网访问（具体启动命令因项目而异，通常为）：

```bash
npm run start
```

> 使用react-scripts的项目，请运行`HOST=0.0.0.0 npm run start`

在`capacitor.config.json`中创建`server`配置项，并用本地Web服务器的IP地址和端口配置`url`字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

然后运行`npx cap copy`将更新的Capacitor配置复制到所有原生项目中。

如果IDE尚未打开，请运行：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用实时重载功能。

> 注意不要将服务器配置提交到源代码版本控制中。