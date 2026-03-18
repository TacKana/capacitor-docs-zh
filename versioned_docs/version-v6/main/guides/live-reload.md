---
title: Live Reload
description: 使用 Live Reload 在设备或模拟器上轻松调试应用的 Web 和原生功能。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# Live Reload

Live Reload 功能非常实用，它不仅能调试应用的 Web 部分，还能在设备硬件或模拟器上调试原生功能。无需在每次代码变更后重新部署原生二进制文件，它能在检测到应用中的改动时自动重新加载浏览器（或 Web View）。

> 如果在设备上运行，请确保设备与计算机连接在同一 Wi-Fi 网络。

## 配合 Ionic CLI 使用

Ionic CLI 提供了完整的 Live Reload 体验，自动处理了下方手动操作的所有步骤。请安装它以及 `native-run`（一个跨平台命令行工具，用于在设备和模拟器/仿真器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动 Live Reload 进程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行 `ionic build`、将 Web 资源复制到指定的原生平台，然后打开对应的原生项目 IDE（iOS 使用 Xcode，Android 使用 Android Studio）。

命令结束后，`capacitor.config.json` 中自动创建的 `server` 条目会被移除。有关 `ionic cap run` 命令的完整详情，[请参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 配合框架 CLI 使用

Capacitor 支持具备实时重载功能的框架 CLI。

首先，确定您计算机在局域网中的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址位于 `en0` 条目下，`inet` 之后。或者，打开系统偏好设置 -> 网络 -> （选择活动网络），然后在状态信息中查找 IP 地址。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接着，启动本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。具体命令可能有所不同，但通常如下：

```bash
npm run start
```

> 使用 react-scripts 时，请使用 `HOST=0.0.0.0 npm run start`

在 `capacitor.config.json` 中，创建一个 `server` 条目，然后使用本地 Web 服务器的 IP 地址和端口配置 `url` 字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接下来，运行 `npx cap copy` 将更新后的 Capacitor 配置复制到所有原生项目中。

如果尚未打开原生 IDE，请打开：

```bash
npx cap open ios
npx cap open android
```

最后，点击运行按钮启动应用，开始使用 Live Reload 功能。

> 请注意，不要将服务器配置提交到源代码控制中。