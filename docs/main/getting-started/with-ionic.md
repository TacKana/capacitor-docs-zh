---
title: 与 Ionic Framework 结合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic Framework 中使用 Capacitor

Capacitor 构建应用并不强制要求使用 Ionic Framework。不过，开发者可能会发现 [Ionic UI 组件库](https://ionicframework.com/docs/components) 中的大量组件有助于构建高质量的应用。

通过 [Ionic CLI](https://ionicframework.com/docs/cli)，可以快速将 Capacitor 安装到任何新的或现有的 Ionic 应用中。

## 在新 Ionic 项目中安装 Capacitor
对于新的 Ionic 项目，Capacitor 在新创建的 Ionic 应用中默认已经安装！你只需启动一个新项目即可。要创建新的 Ionic 项目，请运行以下命令：

```bash
ionic start
```

如果你想学习如何构建第一个基于 Capacitor 的 Ionic 应用，可以参考 Ionic Framework 团队提供的 [这篇教程](https://ionicframework.com/docs/intro/next)。

## 在现有 Ionic 项目中安装 Capacitor
如果你有一个现有的 Ionic 项目，但尚未启用 Capacitor，可以通过运行以下命令来启用：

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖

Ionic Framework 使用了以下 Capacitor 插件中的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为了获得最佳用户体验，即使你没有在应用中导入这些插件，也应该确保它们已安装。要安装这些插件，请在项目根目录下运行以下命令：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

安装 Capacitor 及其插件后，你可以为应用添加移动平台：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录下为每个原生平台创建一个新目录。这些目录是原生项目，应被视为源代码产物。了解更多关于 [原生项目管理](/main/cordova/index.md#native-project-management) 的信息。

:::info
如果你的 Ionic 应用使用了 Cordova，我们也提供了 [从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 的指南。
:::

## Ionic CLI 的 Capacitor 命令

为了方便使用，Ionic CLI 提供了一系列封装了 Capacitor CLI 的高级命令。下面是每个命令的文档链接。你也可以在每个命令后使用 `--help` 标志查看帮助信息。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 的更多信息，以及如何与 Capacitor 结合使用，请参阅 [此文档](https://ionicframework.com/docs/cli)。