---
title: 与 Ionic Framework 结合使用
description: 将 Capacitor 与 Ionic Framework 结合使用
slug: /getting-started/with-ionic
---

# 将 Capacitor 与 Ionic Framework 结合使用

## 安装

Capacitor 可以直接安装到任何新的或现有的 Ionic 应用中。

### 新建 Ionic 项目

Capacitor 默认安装在新 Ionic 应用中！您只需启动一个新项目：

```bash
ionic start
```

> 如果您需要构建第一个 Ionic/Capacitor 应用的教程，请参阅[此教程](https://ionicframework.com/docs/v3/intro/next)。

### 现有 Ionic 项目

使用您的应用名称和 Bundle ID 安装并初始化 Capacitor：

```bash
ionic integrations enable capacitor
```

Ionic Framework 使用以下插件中的 API：

- [**App**](/apis/app.md)
- [**Haptics**](/apis/haptics.md)
- [**Keyboard**](/apis/keyboard.md)
- [**StatusBar**](/apis/status-bar.md)

为了获得最佳用户体验，即使您不在应用中导入它们，也应确保安装了这些插件：

```bash
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

如果您的 Ionic 应用使用了 Cordova，您还需要阅读[从 Cordova 迁移到 Capacitor 指南](/main/cordova/migrating-from-cordova-to-capacitor.md)。

### 添加平台

安装 Capacitor 后，您可以为应用添加原生平台：

```bash
ionic capacitor add
```

这将在项目根目录中为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码资产。了解更多关于[原生项目管理](/main/cordova/index.md#原生项目管理)的信息。

## 工作流

### 构建您的 Ionic 应用

Capacitor JavaScript 库会打包到您的应用中，因此安装 Capacitor 后 Web 资源构建过程没有区别。

```bash
ionic build
```

这会创建 Web 资源目录，Capacitor 会将其复制到原生项目中，该目录通过 [Capacitor 配置](/main/reference/config.md) 中的 `webDir` 进行配置。

### Ionic CLI Capacitor 命令

Ionic CLI 提供了一系列高级命令，为方便起见封装了 Capacitor CLI。请参阅下面的每个命令的文档。在每个命令后使用 `--help` 标志也可以查看帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/v3/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/v3/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/v3/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/v3/cli/commands/capacitor-open)

[了解更多关于 Capacitor 开发工作流的信息 &#8250;](/main/basics/workflow.md)
