---
title: 实时重载
description: 使用实时重载功能，轻松在设备或模拟器上调试应用的网页端和原生部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载

实时重载功能对于调试应用的网页端内容以及在真实设备或模拟器上测试原生功能都非常有用。它能在检测到代码变更时自动刷新浏览器（或Web视图），而无需每次都重新部署新的原生二进制包。

> 若在真实设备上运行，请确保设备与电脑处于同一Wi-Fi网络。

## 配合Ionic CLI使用

Ionic CLI提供了完整的实时重载体验，自动完成了下文手动操作的所有步骤。请先安装CLI及`native-run`（一个跨平台命令行工具，用于在设备和模拟器/仿真器上运行原生二进制包）：

```bash
npm install -g @ionic/cli native-run
```

接着使用`ionic cap run`命令启动实时重载：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行`ionic build`、将网页资源拷贝到指定原生平台目录，然后打开对应IDE（iOS使用Xcode，Android使用Android Studio）。

命令执行完毕后，`capacitor.config.json`中自动创建的`server`配置项会被移除。关于`ionic cap run`命令的完整说明，[请参阅此处](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)。

## 配合框架CLI使用

Capacitor支持具备实时重载功能的各类框架CLI。

首先确定电脑在局域网中的IP地址：

- macOS系统运行`ifconfig`命令，IP地址显示在`en0`条目下的`inet`后。也可通过系统偏好设置 -> 网络 -> (选择活动网络) 查看状态栏中的IP地址
- Windows系统运行`ipconfig`命令，查找`IPv4`地址

然后启动本地开发服务器。服务器必须绑定到`0.0.0.0`才能被局域网访问。启动命令根据框架不同有所差异，通常为：

```bash
npm run start
```

> 使用react-scripts时，需执行`HOST=0.0.0.0 npm run start`

在`capacitor.config.json`中创建`server`配置项，使用本地服务器IP和端口配置`url`字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接着运行`npx cap copy`将更新后的Capacitor配置同步到所有原生项目。

若未自动打开，请手动启动原生IDE：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用实时重载功能。

> 注意不要将服务器配置提交到版本控制系统。