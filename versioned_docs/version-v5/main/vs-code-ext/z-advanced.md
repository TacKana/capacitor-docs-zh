---
title: Advanced Topics
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

本扩展提供了一些您可能会感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 可生成一个描述项目依赖和插件的 Markdown 文件。该文件包含当前使用的版本号以及最新可用版本信息。

如存在版本更新建议，文件中将给出说明。同时还会列出项目中不符合标准命名规范的文件清单。

### 键盘快捷键

可使用以下键盘快捷键：

| Mac 快捷键 | Windows 快捷键 | 操作          |
| --- | --- | ----------- |
| `⌥` + R | `ALT` + R | 运行应用 |
| `⌥` + B | `ALT` + B | 构建 Web 应用 |
| `⌥` + D | `ALT` + D | 调试 Web 应用 |

### 设置 Android Studio 路径

扩展会尝试自动定位 Android Studio 以获取 Java 路径。如需手动设置，请点击 `Settings` > `Advanced`，然后修改 `Java Home` 路径。默认路径通常为 `/Applications/Android Studio.app/Contents/jre/Contents/Home`。

### 设置 Shell 路径

Mac 系统默认 Shell 为 `/bin/sh`，Windows 系统为 `cmd`。点击 `Setting` > `Advanced` 并设置 `Shell Path` 可修改默认 Shell，例如设置为 `/bin/zsh`。

### ADB 路径配置

调试 Android 设备时会使用 ADB。如需修改 Android Debug Bridge (ADB) 的路径，请点击 `Settings` > `Advanced` 设置 `Adb Path`。

### 其他功能

点击 `Project` 旁的 `...` 按钮可显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 将项目的包管理工具切换为 pnpm
- **从 WebPack 切换到 ESBuild** - 将 Angular 项目的构建工具切换为 ESBuild 方案
- **重建 Node Modules** - 删除 `node_modules` 文件夹并执行 `npm install` 重新安装依赖