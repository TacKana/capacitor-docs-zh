---
title: Capacitor 插件
description: Capacitor 插件
sidebar_label: 官方插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
slug: /apis
---

# 官方插件

官方插件是一组由 Capacitor 团队维护的 Capacitor 插件，提供对常用原生 API 的访问。

这些插件的 API 文档如下所示。

## 版本管理

### npm 标签（`latest` 和 `latest-X`）

Capacitor 提供了特殊的 npm 分发标签，以便更轻松地安装兼容的插件版本。

- `latest` 标签会安装可用的最新插件版本。
- 使用 `latest-X`（例如 `latest-7`）来安装与 Capacitor X 兼容的最新官方 Capacitor 插件版本。
- 这些标签表示 Capacitor 版本兼容性，而非插件自身的版本号。一个插件可能处于 v2 或 v3 版本，但仍可能是 `latest-7` 的正确发行版本。
- 这些标签用于 `npm install` 命令，并会解析为 `package.json` 中的相应范围。
- 此标签约定适用于官方 Capacitor 插件，社区插件可能不会一致性地支持此约定。

**示例：**
```bash
npm install @capacitor/camera@latest
# 例如：v8.0.1
npm install @capacitor/device@latest-7
# 例如：v7.0.2
```

## 官方插件列表

- [Action Sheet](/apis/action-sheet.md)
- [App Launcher](/apis/app-launcher.md)
- [App](/apis/app.md)
- [Background Runner](/apis/background-runner.md)
- [Barcode Scanner](/apis/barcode-scanner.md)
- [Browser](/apis/browser.md)
- [Camera](/apis/camera.md)
- [Clipboard](/apis/clipboard.md)
- [Cookies](/apis/cookies.md)
- [Device](/apis/device.md)
- [Dialog](/apis/dialog.md)
- [Filesystem](/apis/filesystem.md)
- [File Transfer](/apis/file-transfer.md)
- [File Viewer](/apis/file-viewer.md)
- [Geolocation](/apis/geolocation.md)
- [Google Maps](/apis/google-maps.md)
- [Haptics](/apis/haptics.md)
- [Http](/apis/http.md)
- [InAppBrowser](/apis/inappbrowser.md)
- [Keyboard](/apis/keyboard.md)
- [Local LLM 🧪](/apis/local-llm.md)
- [Local Notifications](/apis/local-notifications.md)
- [Motion](/apis/motion.md)
- [Network](/apis/network.md)
- [Preferences](/apis/preferences.md)
- [Privacy Screen](/apis/privacy-screen.md)
- [Push Notifications](/apis/push-notifications.md)
- [Screen Orientation](/apis/screen-orientation.md)
- [Screen Reader](/apis/screen-reader.md)
- [Share](/apis/share.md)
- [Splash Screen](/apis/splash-screen.md)
- [Status Bar](/apis/status-bar.md)
- [System Bars](/apis/system-bars.md)
- [Text Zoom](/apis/text-zoom.md)
- [Toast](/apis/toast.md)
- [Watch 🧪](/apis/watch.md)

## GitHub

你可以[在 GitHub 上](https://github.com/ionic-team/capacitor-plugins)找到这些插件的源代码。
