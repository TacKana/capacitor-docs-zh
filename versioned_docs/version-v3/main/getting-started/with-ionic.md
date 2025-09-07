---
title: 与 Ionic Framework 配合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic Framework 中使用 Capacitor

## 安装方式

Capacitor 可以直接安装到任何新建或现有的 Ionic 应用中。

### 新建 Ionic 项目

Capacitor 默认已集成在新建的 Ionic 应用中！您只需创建一个新项目：

```bash
ionic start
```

> 如需构建首个 Ionic/Capacitor 应用的教程，请参阅 [此教程](https://ionicframework.com/docs/v3/intro/next)。

### 现有 Ionic 项目

通过指定应用名称和包标识符来安装并初始化 Capacitor：

```bash
ionic integrations enable capacitor
```

Ionic Framework 使用了以下插件提供的 API：

- [**App**](/apis/app.md)
- [**Haptics**](/apis/haptics.md)
- [**Keyboard**](/apis/keyboard.md)
- [**StatusBar**](/apis/status-bar.md)

为了获得最佳用户体验，即使您没有在应用中导入这些插件，也应确保它们已安装：

```bash
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

如果您的 Ionic 应用正在使用 Cordova，建议同时阅读 [从 Cordova 迁移到 Capacitor 指南](/main/cordova/migrating-from-cordova-to-capacitor.md)。

### 添加平台

安装 Capacitor 后，您可以为应用添加原生平台：

```bash
ionic capacitor add
```

这将在项目根目录下为原生平台创建新目录。该目录是原生项目，应视为源代码产物。了解更多关于 [原生项目管理](/main/cordova/index.md#native-project-management) 的内容。

## 工作流程

### 构建 Ionic 应用

Capacitor 的 JavaScript 库会被打包到应用中，因此安装 Capacitor 后的 Web 资源构建过程并无差异。

```bash
ionic build
```

这将创建 Capacitor 复制到原生项目中的 Web 资源目录，通过 [Capacitor 配置](/main/reference/config.md) 中的 `webDir` 进行配置。

### Ionic CLI 的 Capacitor 命令

Ionic CLI 提供了一系列封装了 Capacitor CLI 的高级命令以便使用。各命令的文档如下，也可在每个命令后添加 `--help` 标志查看帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/v3/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/v3/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/v3/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/v3/cli/commands/capacitor-open)

[深入了解 Capacitor 开发工作流程 &#8250;](/main/basics/workflow.md)