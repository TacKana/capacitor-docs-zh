---
title: Capacitor 插件
description: Capacitor 插件集
sidebar_label: 官方插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
slug: /apis
---

# 官方插件

官方插件是一套由 Capacitor 团队维护的插件，提供对常用原生 API 的访问。

这些插件的 API 文档如下。

## 版本管理

### npm 标签 (`latest` 与 `latest-X`)

Capacitor 提供了特殊的 npm 分发标签，以简化安装兼容插件版本的过程。

- `latest` 标签会安装最新的可用插件版本。
- 使用 `latest-X`（例如 `latest-7`）来安装与 Capacitor X 兼容的最新版官方 Capacitor 插件。
- 这些标签表示的是与 Capacitor 版本的兼容性，而非插件自身的版本号。一个插件可能是 v2 或 v3 版本，但仍可能是 `latest-7` 对应的正确版本。
- 这些标签旨在用于 `npm install` 命令，并将在您的 `package.json` 中解析为合适的版本范围。
- 此标签约定适用于官方 Capacitor 插件，社区插件可能无法始终如一地支持。

**示例：**
```bash
npm install @capacitor/camera@latest
# 例如：v8.0.1
npm install @capacitor/device@latest-7
# 例如：v7.0.2
```

## 官方插件列表

- [操作表（Action Sheet）](/apis/action-sheet.md)
- [应用启动器（App Launcher）](/apis/app-launcher.md)
- [应用（App）](/apis/app.md)
- [后台运行器（Background Runner）](/apis/background-runner.md)
- [条形码扫描器（Barcode Scanner）](/apis/barcode-scanner.md)
- [浏览器（Browser）](/apis/browser.md)
- [相机（Camera）](/apis/camera.md)
- [剪贴板（Clipboard）](/apis/clipboard.md)
- [Cookies（Cookies）](/apis/cookies.md)
- [设备（Device）](/apis/device.md)
- [对话框（Dialog）](/apis/dialog.md)
- [文件系统（Filesystem）](/apis/filesystem.md)
- [文件传输（File Transfer）](/apis/file-transfer.md)
- [文件查看器（File Viewer）](/apis/file-viewer.md)
- [地理定位（Geolocation）](/apis/geolocation.md)
- [谷歌地图（Google Maps）](/apis/google-maps.md)
- [触觉反馈（Haptics）](/apis/haptics.md)
- [Http（Http）](/apis/http.md)
- [内置浏览器（InAppBrowser）](/apis/inappbrowser.md)
- [键盘（Keyboard）](/apis/keyboard.md)
- [本地通知（Local Notifications）](/apis/local-notifications.md)
- [设备动作（Motion）](/apis/motion.md)
- [网络（Network）](/apis/network.md)
- [偏好设置（Preferences）](/apis/preferences.md)
- [隐私屏幕（Privacy Screen）](/apis/privacy-screen.md)
- [推送通知（Push Notifications）](/apis/push-notifications.md)
- [屏幕方向（Screen Orientation）](/apis/screen-orientation.md)
- [屏幕阅读器（Screen Reader）](/apis/screen-reader.md)
- [分享（Share）](/apis/share.md)
- [启动屏（Splash Screen）](/apis/splash-screen.md)
- [状态栏（Status Bar）](/apis/status-bar.md)
- [系统栏（System Bars）](/apis/system-bars.md)
- [文本缩放（Text Zoom）](/apis/text-zoom.md)
- [提示框（Toast）](/apis/toast.md)
- [手表（Watch） 🧪](/apis/watch.md)

## GitHub

您可以在 [GitHub](https://github.com/ionic-team/capacitor-plugins) 上找到这些插件的源代码。