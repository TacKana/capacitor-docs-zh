---
title: Live Reload
description: 使用 Live Reload 功能轻松调试应用在设备或模拟器上的网页端和原生功能。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# Live Reload

Live Reload 功能非常实用，既能调试应用的网页端，也能在真实设备硬件或模拟器上调试原生功能。它能在检测到应用代码变更时，重新加载浏览器（或 WebView），而无需每次更改代码后都重新部署新的原生二进制文件。

> 如果在真实设备上运行，请确保设备与您的计算机连接至同一个 Wi-Fi 网络。

## 配合 Ionic CLI 使用

Ionic CLI 提供了完整的 Live Reload 体验，自动完成了下文详细描述的所有手动步骤。请安装它和 `native-run`（一个跨平台命令行工具，用于在设备和模拟器/仿真器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动 Live Reload 过程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会执行 `ionic build`，将网页资源复制到指定的原生平台目录中，然后为您打开对应原生项目的 IDE（iOS 使用 Xcode，Android 使用 Android Studio）。

命令结束后，`capacitor.config.json` 中自动创建的 `server` 条目会被移除。关于 `ionic cap run` 命令的完整详细信息，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 配合其他框架 CLI 使用

Capacitor 支持具备实时重载能力的其他框架 CLI。

首先，确定您的计算机在局域网内的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址会列在 `en0` 条目下的 `inet` 之后。或者，打开“系统偏好设置” -> “网络” -> （选择活动网络），然后在“状态”下找到列出的 IP 地址。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接下来，启动您的本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。运行的具体命令可能有所不同，但通常是：

```bash
npm run start
```

> 使用 react-scripts 时，请运行 `HOST=0.0.0.0 npm run start`

在 `capacitor.config.json` 文件中，创建一个 `server` 条目，然后使用本地 Web 服务器的 IP 地址和端口配置 `url` 字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接着，运行 `npx cap copy` 将更新后的 Capacitor 配置复制到所有原生项目中。

如果 IDE 尚未打开，请打开它：

```bash
npx cap open ios
npx cap open android
```

最后，点击运行按钮启动应用，即可开始使用 Live Reload 功能。

> 注意不要将服务器配置提交到源代码管理中。