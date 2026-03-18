---
title: Capacitor Plugins
description: Capacitor 插件
sidebar_label: 官方插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
slug: /apis
---

# 官方插件

官方插件是由 Capacitor 团队维护的一套插件，提供了对常用原生 API 的访问。

这些插件的 API 文档如下。

## 版本管理

### npm 标签 (`latest` 和 `latest-X`)

Capacitor 提供了特殊的 npm 分发标签，以便更轻松地安装兼容的插件版本。

- `latest` 标签会安装可用的最新插件版本。
- 使用 `latest-X`（例如 `latest-7`）来安装与 Capacitor X 兼容的官方 Capacitor 插件的最新版本。
- 这些标签表示的是与 Capacitor 版本的兼容性，而不是插件自身的版本号。一个插件可能处于 v2 或 v3 版本，但仍然是 `latest-7` 的正确发布版本。
- 这些标签旨在用于 `npm install` 命令，并会在您的 `package.json` 中解析为适当的版本范围。
- 此标签约定适用于官方 Capacitor 插件，社区插件可能不一定持续支持。

**示例：**
```bash
npm install @capacitor/camera@latest
# 示例：v8.0.1
npm install @capacitor/device@latest-7
# 示例：v7.0.2
```

## 官方插件列表

- [操作表](/apis/action-sheet.md)
- [应用启动器](/apis/app-launcher.md)
- [应用](/apis/app.md)
- [后台运行器](/apis/background-runner.md)
- [条码扫描器](/apis/barcode-scanner.md)
- [浏览器](/apis/browser.md)
- [相机](/apis/camera.md)
- [剪贴板](/apis/clipboard.md)
- [Cookies](/apis/cookies.md)
- [设备](/apis/device.md)
- [对话框](/apis/dialog.md)
- [文件系统](/apis/filesystem.md)
- [文件传输](/apis/file-transfer.md)
- [文件查看器](/apis/file-viewer.md)
- [地理位置](/apis/geolocation.md)
- [谷歌地图](/apis/google-maps.md)
- [触觉反馈](/apis/haptics.md)
- [Http](/apis/http.md)
- [应用内浏览器](/apis/inappbrowser.md)
- [键盘](/apis/keyboard.md)
- [本地通知](/apis/local-notifications.md)
- [运动传感器](/apis/motion.md)
- [网络](/apis/network.md)
- [偏好设置](/apis/preferences.md)
- [隐私屏幕](/apis/privacy-screen.md)
- [推送通知](/apis/push-notifications.md)
- [屏幕方向](/apis/screen-orientation.md)
- [屏幕阅读器](/apis/screen-reader.md)
- [分享](/apis/share.md)
- [启动屏](/apis/splash-screen.md)
- [状态栏](/apis/status-bar.md)
- [系统栏](/apis/system-bars.md)
- [文本缩放](/apis/text-zoom.md)
- [Toast](/apis/toast.md)
- [手表 🧪](/apis/watch.md)

## GitHub

您可以在 [GitHub](https://github.com/ionic-team/capacitor-plugins) 上找到这些插件的源代码。