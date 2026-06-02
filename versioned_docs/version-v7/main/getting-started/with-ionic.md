---
title: 与 Ionic Framework 一起使用
description: 将 Capacitor 与 Ionic Framework 一起使用
slug: /getting-started/with-ionic
---

# 将 Capacitor 与 Ionic Framework 一起使用

Capacitor 不需要 Ionic Framework 来构建应用。但是，开发者可能会发现 [Ionic UI 组件的大量集合](https://ionicframework.com/docs/components) 有助于构建高质量的应用。

通过使用 [Ionic CLI](https://ionicframework.com/docs/cli)，Capacitor 可以快速直接地安装到任何新的或现有的 Ionic 应用中。

## 在新的 Ionic 项目中安装 Capacitor
对于新的 Ionic 项目，Capacitor 默认已经安装在新的 Ionic 应用中！你只需要启动一个新项目。要创建新的 Ionic 项目，请运行以下命令：

```bash
ionic start
```

如果你想要一个构建第一个基于 Capacitor 的 Ionic 应用的教程，请查看 Ionic Framework 团队的[这个教程](https://ionicframework.com/docs/intro/next)。

## 向现有的 Ionic 项目安装 Capacitor
如果你有一个尚未启用 Capacitor 的现有 Ionic 项目，可以通过运行以下命令启用 Capacitor。

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖项

Ionic Framework 使用了以下 Capacitor 插件中的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为了获得最佳用户体验，你应该确保安装了这些插件，即使你没有在应用中导入它们。要安装这些插件，请在项目根目录运行以下命令：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

安装 Capacitor 及其插件后，你可以为你的应用添加移动平台：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录中为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码工件。了解更多关于[原生项目管理](/main/cordova/index.md#原生项目管理)的信息。

:::info
如果你的 Ionic 应用使用了 Cordova，我们也有关于如何[从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)的指南。
:::

## Ionic CLI Capacitor 命令

Ionic CLI 有多种高级命令，为方便起见封装了 Capacitor CLI。请参阅下面的每个命令的文档。在每个命令后使用 `--help` 标志也可以获取帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 以及如何将其与 Capacitor 一起使用的更多信息，请参见[此处](https://ionicframework.com/docs/cli)的文档。
