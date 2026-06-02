---
title: 实时重载
description: 使用实时重载在设备或模拟器上轻松调试应用的 Web 和原生部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载

实时重载对于调试应用的 Web 部分以及设备硬件或模拟器上的原生功能都很有用。它无需在每次更改代码时部署新的原生二进制文件，而是在检测到应用中的更改时重新加载浏览器（或 Web View）。

> 如果在设备上运行，请确保设备与您的计算机连接到同一个 Wi-Fi 网络。

## 使用 Ionic CLI

Ionic CLI 包含了完整的实时重载体验，自动执行下面手动详述的所有步骤。请与 `native-run`（一个用于在设备和模拟器上运行原生二进制文件的跨平台命令行工具）一起安装：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动实时重载过程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

这将执行 `ionic build`，将 Web 资产复制到指定的原生平台，然后为您的原生项目打开 IDE（iOS 为 Xcode，Android 为 Android Studio）。

命令终止后，自动在 `capacitor.config.json` 中创建的 `server` 条目将被删除。有关 `ionic cap run` 命令的完整详细信息，[请参见此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 使用框架 CLI

Capacitor 支持具有实时重载能力的 CLI。

首先，确定您的计算机在局域网上的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址列在 `en0` 条目下，在 `inet` 之后。或者，打开系统偏好设置 -> 网络 ->（选择活跃的网络），然后在状态下方找到 IP。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接下来，启动您的本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。运行的命令会有所不同，但通常是：

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

如果原生 IDE 尚未打开，请打开它：

```bash
npx cap open ios
npx cap open android
```

最后，点击运行按钮启动应用并开始使用实时重载。

> 注意不要将服务器配置提交到源代码管理。
