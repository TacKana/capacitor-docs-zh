---
title: 与 Ionic Framework 配合使用
description: 将 Capacitor 与 Ionic Framework 配合使用
slug: /getting-started/with-ionic
---

# 将 Capacitor 与 Ionic Framework 配合使用

构建应用时，Capacitor 并不要求使用 Ionic Framework。不过，开发者可能会发现 Ionic 的[大量](https://ionicframework.com/docs/components) UI 组件有助于构建高质量的应用。

通过使用 [Ionic CLI](https://ionicframework.com/docs/cli)，可以快速将 Capacitor 直接安装到任何新的或现有的 Ionic 应用中。

## 在新 Ionic 项目中安装 Capacitor
对于新的 Ionic 项目，Capacitor 已经默认安装在新的 Ionic 应用中！你只需要启动一个新项目即可。要创建一个新的 Ionic 项目，请运行以下命令：

```bash
ionic start
```

如果你需要构建第一个基于 Capacitor 的 Ionic 应用的教程，请查看由 Ionic Framework 团队编写的[此教程](https://ionicframework.com/docs/intro/next)。

## 在现有 Ionic 项目中安装 Capacitor
如果你有一个尚未启用 Capacitor 的现有 Ionic 项目，可以通过运行以下命令来启用 Capacitor。

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖

Ionic Framework 使用了以下 Capacitor 插件中的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为了获得最佳用户体验，即使你不打算在应用中导入它们，也应确保这些插件已安装。要安装这些插件，请在项目根目录下运行以下命令：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

在 Capacitor 安装完成及其插件安装完毕后，你可以为应用添加移动平台：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录下为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码产物。了解更多关于[原生项目管理](/main/cordova/index.md#native-project-management)的信息。

:::info
如果你的 Ionic 应用使用了 Cordova，我们还提供了关于如何[从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)的指南。
:::

## Ionic CLI Capacitor 命令

Ionic CLI 提供了多种高级命令，这些命令对 Capacitor CLI 进行了封装以便使用。请参阅以下每个命令的文档。在每个命令后使用 `--help` 标志也可以查看帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 的更多信息，以及如何将其与 Capacitor 配合使用，你可以查看[此处的文档](https://ionicframework.com/docs/cli)。
