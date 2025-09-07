---
title: 与 Ionic Framework 结合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic Framework 中使用 Capacitor

Capacitor 并不强制要求使用 Ionic Framework 来构建应用。不过，开发者可能会发现 Ionic 提供的[丰富 UI 组件库](https://ionicframework.com/docs/components)对于构建高质量应用非常有帮助。

通过 [Ionic CLI](https://ionicframework.com/docs/cli)，可以快速将 Capacitor 安装到任何新建或现有的 Ionic 应用中。

## 在新 Ionic 项目中安装 Capacitor
对于新的 Ionic 项目，Capacitor 默认已经预装！您只需创建一个新项目即可。要创建新的 Ionic 项目，请运行以下命令：

```bash
ionic start
```

如果您需要构建第一个基于 Capacitor 的 Ionic 应用的教程，请查看 Ionic Framework 团队提供的[此教程](https://ionicframework.com/docs/intro/next)。

## 在现有 Ionic 项目中安装 Capacitor
如果您现有的 Ionic 项目尚未启用 Capacitor，可以通过运行以下命令来启用：

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖

Ionic Framework 使用了以下 Capacitor 插件提供的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为了获得最佳用户体验，即使您没有在应用中导入这些插件，也应该确保它们已安装。要安装这些插件，请在项目根目录下运行以下命令：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

安装 Capacitor 及其插件后，您可以为应用添加移动平台：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录下为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码产物。了解更多关于[原生项目管理](/main/cordova/index.md#native-project-management)的信息。

:::info
如果您的 Ionic 应用正在使用 Cordova，我们也提供了[从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 的指南。
:::

## Ionic CLI 的 Capacitor 命令

Ionic CLI 提供了多个高级命令，这些命令封装了 Capacitor CLI 以便于使用。请参阅以下各命令的文档。在每个命令后使用 `--help` 标志也可以查看帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 的更多信息，以及如何将其与 Capacitor 配合使用，您可以查看[此文档](https://ionicframework.com/docs/cli)。