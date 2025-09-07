---
title: 实时重载
description: 使用实时重载功能，轻松在设备或模拟器上调试应用的网页和原生部分。
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载

实时重载功能既可用于调试应用的网页部分，也能用于测试设备硬件或模拟器上的原生功能。它无需在每次代码变更时都部署新的原生二进制文件，而是会在检测到应用变更时自动刷新浏览器（或 WebView）。

> 如果在真机上运行，请确保设备与电脑处于同一Wi-Fi网络。

## 与 Ionic CLI 配合使用

Ionic CLI 提供完整的实时重载体验，自动完成下文列出的所有手动步骤。请先安装 CLI 和 `native-run`（一个跨平台命令行工具，用于在设备和模拟器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

然后使用 `ionic cap run` 命令启动实时重载：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行：`ionic build` → 将网页资源复制到指定原生平台 → 打开对应原生项目的IDE（iOS使用Xcode，Android使用Android Studio）。

命令执行完成后，`capacitor.config.json` 中自动创建的 `server` 配置会被移除。关于 `ionic cap run` 命令的完整说明，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 与其他框架CLI配合使用

Capacitor 支持具备实时重载能力的框架CLI。

首先，确定电脑在局域网中的IP地址：

- macOS：运行 `ifconfig` 命令，IP地址显示在 `en0` 条目下的 `inet` 后。也可通过系统偏好设置 -> 网络 -> （选择活动网络）在状态栏查看IP地址。
- Windows：运行 `ipconfig` 命令，查找 `IPv4` 地址。

然后启动本地开发服务器。服务器必须绑定到 `0.0.0.0` 才能被局域网访问。启动命令因项目而异，通常为：

```bash
npm run start
```

> 使用 react-scripts 时，需加上 `HOST=0.0.0.0 npm run start`

在 `capacitor.config.json` 中创建 `server` 配置项，并使用本地服务器的IP地址和端口配置 `url` 字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

接着运行 `npx cap copy` 将更新的配置同步到所有原生项目。

如果IDE尚未打开，执行以下命令：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用实时重载功能。

> 注意不要将服务器配置提交到版本控制系统。