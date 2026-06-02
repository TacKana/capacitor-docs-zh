---
title: 高级主题
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

该扩展有一些您可能感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 以创建一个描述项目依赖和插件的 markdown 文件。这包括使用的版本号和可用的最新版本。

如果有建议，将会被描述。不符合标准命名约定的项目文件也将被列出。

### 键盘快捷键

以下键盘快捷键可用：

| Mac 快捷键 | Windows 快捷键 | 操作 |
| --- | --- | ----------- |
| `⌥` + R | `ALT` + R | 运行应用 |
| `⌥` + B | `ALT` + B | 为 Web 构建应用 |
| `⌥` + D | `ALT` + D | 为 Web 调试应用 |

### 设置 Android Studio 路径

扩展会猜测 Android Studio 的位置以便找到 Java 的位置。您可以通过点击 `Settings` > `Advanced` 并设置 `Java Home` 为另一个路径来设置替代位置。默认位置通常是 `/Applications/Android Studio.app/Contents/jbr/Contents/Home`。

### 设置 Shell 路径

默认 shell 在 Mac 上是 `/bin/sh`，在 Windows 上是 `cmd`。您可以通过点击 `Setting` > `Advanced` 并设置 `Shell Path` 来更改默认 shell。例如：`/bin/zsh`。

### ADB 路径

调试 Android 设备时会使用 ADB。Android Debug Bridge（ADB）的位置可以通过点击 `Settings` > `Advanced` 并设置 `Adb Path` 来更改。

### 其他功能

点击 `Project` 旁边的 `...` 按钮以显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 您的项目将切换为使用 pnpm 作为包管理器。
- **从 WebPack 切换到 ESBuild** - 您的 Angular 项目将切换为使用 ESBuild 选项。
- **重建 Node Modules** - `node_modules` 文件夹将被删除，然后运行 `npm install` 以恢复该文件夹。
