---
title: 与 Ionic Framework 结合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic Framework 中使用 Capacitor

## 安装

Capacitor 可以直接安装到任何新的或现有的 Ionic 应用中。

### 新建 Ionic 项目

Capacitor 默认已安装在新创建的 Ionic 应用中！你只需创建一个新项目：

```bash
ionic start
```

> 如果你想了解如何构建第一个 Ionic/Capacitor 应用，请参阅[本教程](https://ionicframework.com/docs/v3/intro/next)。

### 现有 Ionic 项目

使用你的应用名称和包 ID 安装并初始化 Capacitor：

```bash
ionic integrations enable capacitor
```

Ionic Framework 使用了以下插件的 API：

- [**App**](/apis/app.md)
- [**Haptics**](/apis/haptics.md)
- [**Keyboard**](/apis/keyboard.md)
- [**StatusBar**](/apis/status-bar.md)

为了获得最佳用户体验，即使你没有在应用中导入这些插件，也应该确保它们已安装：

```bash
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

如果你的 Ionic 应用使用了 Cordova，你还应该阅读[从 Cordova 迁移到 Capacitor 指南](/main/cordova/migrating-from-cordova-to-capacitor.md)。

### 添加平台

安装 Capacitor 后，你可以为应用添加原生平台：

```bash
ionic capacitor add
```

这将在项目根目录下为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码工件。了解更多关于[原生项目管理](/main/cordova/index.md#native-project-management)的信息。

## 工作流程

### 构建 Ionic 应用

Capacitor JavaScript 库会打包到你的应用中，因此安装 Capacitor 后，Web 资源构建过程没有区别。

```bash
ionic build
```

这会创建 Web 资源目录，Capacitor 会将其复制到原生项目中，该目录通过 [Capacitor 配置](/main/reference/config.md) 中的 `webDir` 进行配置。

### Ionic CLI 的 Capacitor 命令

为了使用方便，Ionic CLI 提供了多种高级命令来封装 Capacitor CLI。具体命令文档如下。在每个命令后使用 `--help` 标志也可以查看帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/v3/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/v3/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/v3/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/v3/cli/commands/capacitor-open)

[了解更多关于 Capacitor 开发工作流程的信息 &#8250;](/main/basics/workflow.md)