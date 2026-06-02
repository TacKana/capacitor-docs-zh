---
title: 热重载
description: 使用热重载在设备或模拟器上轻松调试应用的 Web 和原生部分
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 热重载

热重载对于调试应用的 Web 部分以及设备硬件或模拟器上的原生功能非常有用。它不需要在每次代码更改时部署新的原生二进制文件，而是在检测到应用中的更改时重新加载浏览器（或 Web View）。

> 如果在设备上运行，请确保设备与您的计算机在同一个 Wi-Fi 网络上。

## 与 Ionic CLI 一起使用

Ionic CLI 包含完整的热重载体验，自动执行下面详细说明的所有步骤。将其与 `native-run`（一个用于在设备和模拟器上运行原生二进制文件的跨平台命令行工具）一起安装：

```bash
npm install -g @ionic/cli native-run
```

接下来，使用 `ionic cap run` 命令启动热重载过程：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

这将执行 `ionic build`，将 Web 资源复制到指定的原生平台，然后为您的原生项目打开 IDE（iOS 为 Xcode，Android 为 Android Studio）。

`capacitor.config.json` 中自动创建的 `server` 条目在命令终止后会被移除。有关 `ionic cap run` 命令的完整详细信息，[请参阅此处](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)。

## 与框架 CLI 一起使用

Capacitor 支持具有热重载功能的 CLI。

首先，确定您的计算机在局域网中的 IP 地址。

- 在 macOS 上，运行 `ifconfig`。IP 地址列在 `en0` 条目下，在 `inet` 之后。或者，打开 System Preferences -> Network ->（选择活跃的网络），然后在 Status 下找到 IP。
- 在 Windows 上，运行 `ipconfig`。查找 `IPv4` 地址。

接下来，启动您的本地 Web 服务器。服务器必须绑定到 `0.0.0.0` 才能从局域网访问。运行命令会有所不同，但通常是：

```bash
npm run start
```

> 对于 react-scripts，请使用 `HOST=0.0.0.0 npm run start`

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

最后，点击 Run 按钮启动应用并开始使用热重载。

> 注意不要将服务器配置提交到源代码管理。
