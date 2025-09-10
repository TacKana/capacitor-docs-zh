---
title: Live Reload
description: 使用Live Reload功能，轻松在设备或模拟器上调试应用的网页端和原生功能部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载(Live Reload)

Live Reload功能对于调试应用的网页端和在真机/模拟器上的原生功能非常有用。它会在检测到代码变更时自动刷新浏览器（或Web视图），而无需每次修改代码都重新部署原生二进制包。

> 若在真机上运行，请确保设备与电脑处于同一Wi-Fi网络。

## 与Ionic CLI配合使用

Ionic CLI提供完整的Live Reload体验，自动处理下文手动操作的所有步骤。请先安装CLI和`native-run`（一个跨平台命令行工具，用于在设备和模拟器上运行原生应用）：

```bash
npm install -g @ionic/cli native-run
```

接着使用`ionic cap run`命令启动Live Reload：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行`ionic build`构建、将网页资源复制到指定原生平台，然后打开对应IDE（iOS使用Xcode，Android使用Android Studio）。

命令执行完成后，会自动移除`capacitor.config.json`中创建的`server`配置项。关于`ionic cap run`命令的完整说明，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 与其他框架CLI配合使用

Capacitor支持具备实时重载能力的框架CLI。

首先确定电脑在局域网内的IP地址：

- macOS系统：运行`ifconfig`命令，在`en0`条目下的`inet`后查找IP地址。或通过系统偏好设置 -> 网络 -> (选择活动网络) 在状态栏查看IP
- Windows系统：运行`ipconfig`命令，查找`IPv4`地址

接着启动本地开发服务器。服务器必须绑定到`0.0.0.0`才能被局域网访问，启动命令因框架而异，通常为：

```bash
npm run start
```

> 使用react-scripts时，请使用`HOST=0.0.0.0 npm run start`

在`capacitor.config.json`中创建`server`配置项，并使用本地服务器的IP地址和端口配置`url`字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

然后运行`npx cap copy`将更新的配置同步到所有原生项目。

如果IDE尚未打开，执行以下命令：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用Live Reload功能。

> 注意不要将server配置提交到版本控制系统。