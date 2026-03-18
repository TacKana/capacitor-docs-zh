---
title: Live Reload
description: 使用 Live Reload 功能，在设备或模拟器上轻松调试应用的 Web 部分和原生功能。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# Live Reload

Live Reload 功能对于调试应用的 Web 部分以及在设备硬件或模拟器上的原生功能非常有用。它会在检测到应用中的更改时重新加载浏览器（或 WebView），而无需每次代码更改后都部署新的原生二进制文件。

> 如果在设备上运行，请确保设备与您的计算机连接在同一 Wi-Fi 网络下。

## 与 Ionic CLI 配合使用

Ionic CLI 提供了完整的 Live Reload 体验，自动化了下方手动列出的所有步骤。请安装 Ionic CLI 以及 `native-run`（一个用于在设备和模拟器/仿真器上运行原生二进制文件的跨平台命令行工具）：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动 Live Reload 进程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会执行 `ionic build`，将 Web 资源复制到指定的原生平台中，然后为您打开相应原生项目的 IDE（iOS 使用 Xcode，Android 使用 Android Studio）。

命令执行完毕后，`capacitor.config.json` 中自动创建的 `server` 条目会被移除。有关 `ionic cap run` 命令的完整详细信息，[请参见此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 与框架 CLI 配合使用

Capacitor 支持具备 Live Reload 功能的 CLI。

首先，确定您的计算机在局域网（LAN）中的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址列在 `en0` 条目下，位于 `inet` 之后。或者，打开“系统偏好设置” -> “网络” -> （选择活动网络），然后在“状态”下找到列出的 IP。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接下来，启动您的本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。具体运行的命令会有所不同，但通常是：

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

如果 IDE 尚未打开，请打开原生 IDE：

```bash
npx cap open ios
npx cap open android
```

最后，点击“运行”按钮启动应用，开始使用 Live Reload。

> 请注意不要将此服务器配置提交到源代码控制中。

除了在 `capacitor.config.json` 中设置 `url` 外，您还可以在从命令行运行应用时，直接从 CLI 设置 Live Reload 的 URL：

```bash
npx cap run --live-reload --port 8100
```