---
title: Live Reload
description: 使用 Live Reload 功能，轻松在设备或模拟器上调试应用的 Web 和原生部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# Live Reload

Live Reload 功能非常实用，可用于调试应用的 Web 部分，以及在设备硬件或模拟器上测试原生功能。它能在检测到应用代码变更时，自动重新加载浏览器（或 Web View），而无需每次修改代码后都重新部署原生二进制文件。

> 如果在设备上运行，请确保设备与电脑连接在同一 Wi-Fi 网络下。

## 与 Ionic CLI 配合使用

Ionic CLI 提供了完整的 Live Reload 体验，将下方手动操作的步骤全部自动化。请同时安装 `native-run`（一款跨平台命令行工具，用于在设备和模拟器/仿真器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动 Live Reload 进程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行 `ionic build`、将 Web 资源复制到指定的原生平台，然后打开对应原生项目的 IDE（iOS 使用 Xcode，Android 使用 Android Studio）。

命令执行完毕后，`capacitor.config.json` 中自动创建的 `server` 条目会被移除。有关 `ionic cap run` 命令的完整详情，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 与框架 CLI 配合使用

Capacitor 支持具有实时重载功能的各类 CLI。

首先，确定您电脑在局域网中的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址列在 `en0` 条目下，位于 `inet` 之后。或者，打开系统偏好设置 -> 网络 ->（选择活动网络），然后在状态下方找到列出的 IP。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接着，启动您的本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。具体命令可能有所不同，但通常如下：

```bash
npm run start
```

> 使用 react-scripts 时，请运行 `HOST=0.0.0.0 npm run start`

在 `capacitor.config.json` 中，创建一个 `server` 条目，然后使用本地 Web 服务器的 IP 地址和端口配置 `url` 字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接下来，运行 `npx cap copy`，将更新后的 Capacitor 配置复制到所有原生项目中。

如果 IDE 尚未打开，请打开对应的原生 IDE：

```bash
npx cap open ios
npx cap open android
```

最后，点击运行按钮启动应用，即可开始使用 Live Reload 功能。

> 请注意，不要将此服务器配置提交到源代码管理。

除了在 `capacitor.config.json` 中设置 `url`，您也可以在通过命令行运行应用时，直接从 CLI 设置实时重载的 URL：

```bash
npx cap run --live-reload --port 8100
```