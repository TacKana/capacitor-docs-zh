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

# Official Plugins

The Official Plugins are a set of Capacitor plugins maintained by the Capacitor team that provide access to commonly used native APIs.

The API documentation for these plugins can be found below.

## Versioning

### npm Tags (`latest` and `latest-X`)

Capacitor provides special npm distribution tags to make installing compatible plugin versions easier.

- The `latest` tag installs the most recent plugin version available.
- Use `latest-X` (for example, `latest-7`) to install the most recent version of official Capacitor plugins compatible with Capacitor X.
- These tags express Capacitor version compatibility, not the plugin's own version number. A plugin may be at v2 or v3 and still be the correct release for `latest-7`.
- These tags are intended for use in `npm install` commands and will resolve to the appropriate range in your `package.json`.
- This tagging convention applies to official Capacitor plugins and may not be consistently supported by community plugins.

**Example:**
```bash
npm install @capacitor/camera@latest
# example: v8.0.1
npm install @capacitor/device@latest-7
# example: v7.0.2
```

## List of Official Plugins

- [Action Sheet](/apis/action-sheet.md)
- [App Launcher](/apis/app-launcher.md)
- [App](/apis/app.md)
- [Background Runner](/apis/background-runner.md)
- [Barcode Scanner](/apis/barcode-scanner.md)
- [Browser](/apis/browser.md)
- [Camera](/apis/camera.md)
- [Clipboard](/apis/clipboard.md)
- [Cookies](/apis/cookies.md)
- [设备（Device）](/apis/device.md)
- [对话框（Dialog）](/apis/dialog.md)
- [文件系统（Filesystem）](/apis/filesystem.md)
- [文件传输（File Transfer）](/apis/file-transfer.md)
- [文件查看器（File Viewer）](/apis/file-viewer.md)
- [地理定位（Geolocation）](/apis/geolocation.md)
- [谷歌地图（Google Maps）](/apis/google-maps.md)
- [触觉反馈（Haptics）](/apis/haptics.md)
- [Http](/apis/http.md)
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
- [System Bars](/apis/system-bars.md)
- [文本缩放（Text Zoom）](/apis/text-zoom.md)
- [提示框（Toast）](/apis/toast.md)
- [Watch 🧪](/apis/watch.md)

## GitHub

您可以在 [GitHub](https://github.com/ionic-team/capacitor-plugins) 上找到这些插件的源代码。