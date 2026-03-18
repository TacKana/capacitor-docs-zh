---
title: 进阶主题
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

本扩展提供了一些您可能感兴趣的进阶功能。

### 导出项目信息

点击 `Configuration` > `Export` 可以创建一个描述您项目依赖项和插件的 Markdown 文件。文件中会包含所使用的版本号以及可用的最新版本。

如果有任何升级建议，也会在文件中进行说明。同时，您项目中不符合标准命名约定的文件列表也会一并列出。

### 键盘快捷键

可以使用以下键盘快捷键：

| Mac 快捷键 | Windows 快捷键 | 操作 |
| --- | --- | ----------- |
| `⌥` + R | `ALT` + R | 运行应用 |
| `⌥` + B | `ALT` + B | 构建 Web 版本应用 |
| `⌥` + D | `ALT` + D | 调试 Web 版本应用 |

### 设置 Android Studio 路径

扩展会自动推测 Android Studio 的位置，以便找到 Java 的安装路径。您可以通过点击 `Settings` > `Advanced`，并将 `Java Home` 设置为其他路径来指定备用位置。默认位置通常是 `/Applications/Android Studio.app/Contents/jre/Contents/Home`。

### 设置 Shell 路径

默认的 Shell 在 Mac 上是 `/bin/sh`，在 Windows 上是 `cmd`。您可以通过点击 `Setting` > `Advanced`，并设置 `Shell Path` 来更改默认使用的 Shell。例如：`/bin/zsh`。

### ADB 路径

调试 Android 设备时会用到 ADB。您可以通过点击 `Settings` > `Advanced` 并设置 `Adb Path` 来更改 Android 调试桥（ADB）的位置。

### 其他功能

点击 `Project` 旁边的 `...` 按钮可以显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 将您的项目切换为使用 pnpm 作为包管理器。
- **从 WebPack 切换到 ESBuild** - 将您的 Angular 项目切换为使用 ESBuild 选项。
- **重建 Node 模块** - 将删除 `node_modules` 文件夹并运行 `npm install` 来重新生成该文件夹。