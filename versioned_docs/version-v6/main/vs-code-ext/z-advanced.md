```mdx
---
title: 高级主题
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

本扩展提供了一些您可能感兴趣的高级功能。

### 导出项目信息

点击 `Configuration` > `Export` 可创建一个描述项目依赖和插件的 markdown 文件。该文件包含当前使用的版本号以及最新的可用版本。

如果有推荐更新，文件中会给出说明。同时还会列出项目中不符合标准命名规范的文件列表。

### 键盘快捷键

可使用以下键盘快捷键：

| Mac 快捷键 | Windows 快捷键 | 操作 |
| --- | --- | ----------- |
| `⌥` + R | `ALT` + R | 运行应用 |
| `⌥` + B | `ALT` + B | 构建 Web 应用 |
| `⌥` + D | `ALT` + D | 调试 Web 应用 |

### 设置 Android Studio 位置

扩展会自动推测 Android Studio 的安装位置以定位 Java。如需自定义路径，请点击 `Settings` > `Advanced`，然后将 `Java Home` 设置为其他路径。默认位置通常为 `/Applications/Android Studio.app/Contents/jbr/Contents/Home`。

### 设置 Shell 路径

默认 Shell 在 Mac 上为 `/bin/sh`，在 Windows 上为 `cmd`。可通过点击 `Setting` > `Advanced` 并设置 `Shell Path` 来更改默认 Shell。例如：`/bin/zsh`。

### ADB 路径

调试 Android 设备时会使用 ADB。可通过点击 `Settings` > `Advanced` 并设置 `Adb Path` 来更改 Android 调试桥 (ADB) 的位置。

### 其他功能

点击 `Project` 旁的 `...` 按钮可显示实验性功能列表：
- **从 NPM 迁移到 PNPM** - 将项目的包管理器切换为 pnpm
- **从 WebPack 切换到 ESBuild** - 将 Angular 项目的构建工具切换为 ESBuild 选项
- **重建 Node 模块** - 删除 `node_modules` 文件夹并运行 `npm install` 重新生成
```