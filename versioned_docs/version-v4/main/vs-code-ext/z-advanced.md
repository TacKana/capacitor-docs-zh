---
title: 高级主题
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

该扩展包含一些您可能感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 创建一个描述项目依赖和插件的 Markdown 文件。其中包括使用的版本号和可用的最新版本。

如果有建议，将会进行说明。项目中不符合标准命名约定的文件列表也会一并列出。

### 设置 Android Studio 位置

扩展会猜测 Android Studio 的位置以查找 Java 的路径。您可以通过点击 `Settings` > `Advanced` 并将 `Java Home` 设置为其他路径来指定替代位置。默认位置通常是 `/Applications/Android Studio.app/Contents/jre/Contents/Home`。

### 设置 Shell 路径

默认的 Shell 在 Mac 上是 `/bin/sh`，在 Windows 上是 `cmd`。您可以通过点击 `Setting` > `Advanced` 并设置 `Shell Path` 来更改默认使用的 Shell。例如：`/bin/zsh`。

### ADB 路径

调试 Android 设备时会使用 ADB。Android 调试桥 (ADB) 的位置可以通过点击 `Settings` > `Advanced` 并设置 `Adb Path` 来更改。

### 其他功能

点击 `Project` 旁边的 `...` 按钮以显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 您的项目将切换到使用 pnpm 作为包管理器。
- **从 WebPack 切换到 ESBuild** - 您的 Angular 项目将切换到使用 ESBuild 选项。
- **重建 Node Modules** - `node_modules` 文件夹将被删除，并运行 `npm install` 来恢复该文件夹。