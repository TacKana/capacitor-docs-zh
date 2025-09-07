---
title: Advanced Topics
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

本扩展提供了一些您可能会感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 可创建一个描述项目依赖和插件的 Markdown 文件。该文件包含正在使用的版本号以及最新可用版本信息。

若存在建议的升级版本，也会在文件中说明。同时还会列出项目中不符合标准命名规范的文件列表。

### 设置 Android Studio 路径

扩展会默认猜测 Android Studio 的安装位置以查找 Java 路径。您可以通过点击 `Settings` > `Advanced` 并设置 `Java Home` 来修改路径。默认位置通常是 `/Applications/Android Studio.app/Contents/jre/Contents/Home`。

### 设置 Shell 路径

默认 Shell 在 Mac 上是 `/bin/sh`，在 Windows 上是 `cmd`。要更改默认 Shell，请点击 `Setting` > `Advanced` 并设置 `Shell Path`，例如：`/bin/zsh`。

### ADB 路径

调试 Android 设备时会使用 ADB。要修改 Android Debug Bridge (ADB) 的位置，请点击 `Settings` > `Advanced` 并设置 `Adb Path`。

### 其他功能

点击 `Project` 旁边的 `...` 按钮可显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 将项目的包管理器切换为 pnpm
- **从 WebPack 切换到 ESBuild** - 将 Angular 项目的构建工具切换为 ESBuild 选项
- **重建 Node 模块** - 删除 `node_modules` 文件夹并运行 `npm install` 重新安装依赖