---
title: Live Reload
description: 使用 Live Reload 功能轻松调试设备或模拟器上应用的网页端和原生端功能
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# 实时重载

Live Reload 功能对于调试应用的网页端功能和设备硬件/模拟器上的原生功能非常有用。它能在检测到代码变更时自动刷新浏览器（或 Web View），而无需每次修改后都重新部署原生二进制文件。

> 如果在真机上运行，请确保设备与电脑连接同一 Wi-Fi 网络。

## 配合 Ionic CLI 使用

Ionic CLI 提供完整的 Live Reload 体验，自动完成了下文手动配置的所有步骤。请先安装 CLI 和 `native-run`（一个跨平台命令行工具，用于在设备和模拟器上运行原生二进制文件）：

```bash
npm install -g @ionic/cli native-run
```

然后使用 `ionic cap run` 命令启动 Live Reload：

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

该命令会依次执行：
1. `ionic build` 构建项目
2. 将网页资源复制到指定原生平台目录
3. 打开对应原生项目 IDE（iOS 使用 Xcode，Android 使用 Android Studio）

命令执行完毕后，会自动移除 `capacitor.config.json` 中创建的 `server` 配置项。关于 `ionic cap run` 命令的完整说明，请[参阅此处](https://ionicframework.com/docs/cli/commands/capacitor-run)。

## 配合框架 CLI 使用

Capacitor 支持具备实时重载能力的框架 CLI。

首先获取电脑在局域网中的 IP 地址：

- macOS 用户：运行 `ifconfig`，IP 地址显示在 `en0` 条目下的 `inet` 后。也可通过系统偏好设置 -> 网络 -> (选择活动网络) 在状态栏中查看
- Windows 用户：运行 `ipconfig`，查找 `IPv4` 地址

接着启动本地开发服务器。服务器必须绑定到 `0.0.0.0` 才能被局域网访问，启动命令通常为：

```bash
npm run start
```

> 使用 react-scripts 时，需运行 `HOST=0.0.0.0 npm run start`

在 `capacitor.config.json` 中添加 `server` 配置项，使用本地服务器的 IP 和端口设置 `url` 字段：

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

运行 `npx cap copy` 将更新的配置同步到所有原生项目。

如果 IDE 未自动打开，可手动执行：

```bash
npx cap open ios
npx cap open android
```

最后点击运行按钮启动应用，即可开始使用实时重载功能。

> 注意不要将服务器配置提交到版本控制系统