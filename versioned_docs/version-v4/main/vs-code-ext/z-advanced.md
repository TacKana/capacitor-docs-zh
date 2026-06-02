---
title: 高级主题
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

该扩展具有一些您可能感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 创建一个描述项目依赖和插件的 markdown 文件。其中包括使用的版本号和可用的最新版本。

如果有任何建议，也会一并描述。不符合标准命名约定的项目文件列表也会列出。

### 设置 Android Studio 位置

扩展会猜测 Android Studio 的位置，以便找到 Java 的位置。您可以通过点击 `Settings` > `Advanced` 并将 `Java Home` 设置为其他路径来指定替代位置。默认位置通常是 `/Applications/Android Studio.app/Contents/jre/Contents/Home`。

### 设置 Shell 路径

Mac 上的默认 shell 是 `/bin/sh`，Windows 上是 `cmd`。您可以通过点击 `Setting` > `Advanced` 并设置 `Shell Path` 来更改默认 shell。例如：`/bin/zsh`。

### ADB 路径

ADB 在调试 Android 设备时使用。Android Debug Bridge (ADB) 的位置可以通过点击 `Settings` > `Advanced` 并设置 `Adb Path` 来更改。

### 其他功能

点击 `Project` 旁边的 `...` 按钮以显示实验性功能列表：
- **Migrate from NPM to PNPM** - 您的项目将切换为使用 pnpm 作为包管理器。
- **Switch from WebPack to ESBuild** - 您的 Angular 项目将切换为使用 ESBuild 选项。
- **Rebuild Node Modules** - 将删除 `node_modules` 文件夹并运行 `npm install` 以恢复该文件夹。
