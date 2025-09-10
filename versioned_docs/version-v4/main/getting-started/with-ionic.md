---
title: 与 Ionic Framework 配合使用
description: 在 Ionic 框架中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic 框架中使用 Capacitor

Capacitor 构建应用并不依赖 Ionic 框架，但开发者可能会发现 Ionic 提供的[丰富组件库](https://ionicframework.com/docs/components)能帮助构建更高质量的应用程序。

通过 [Ionic CLI](https://ionicframework.com/docs/cli)，可以快速将 Capacitor 安装到任何新建或已有的 Ionic 项目中。

## 在新 Ionic 项目中安装 Capacitor
对于新建的 Ionic 项目，Capacitor 已默认集成！您只需创建一个新项目即可。运行以下命令初始化 Ionic 项目：

```bash
ionic start
```

如需构建首个基于 Capacitor 的 Ionic 应用教程，请参考 Ionic 团队提供的[入门指南](https://ionicframework.com/docs/intro/next)。

## 为现有 Ionic 项目添加 Capacitor
若现有 Ionic 项目未启用 Capacitor，可运行以下命令进行集成：

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖

Ionic 框架使用了以下 Capacitor 插件的 API：
- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为获得最佳用户体验，即使未在代码中显式调用这些插件，也应确保它们已安装。在项目根目录下执行：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台支持

安装 Capacitor 及其插件后，可为应用添加移动平台支持：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录创建对应平台的原生工程目录。该目录应被视为源码产物，详情参阅[原生项目管理](/main/cordova/index.md#native-project-management)。

:::info
如果您的 Ionic 应用当前使用 Cordova，我们也提供了[从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 的指南。
:::

## Ionic CLI 的 Capacitor 命令

Ionic CLI 封装了一系列便捷的 Capacitor 高级命令，具体文档如下。每个命令后添加 `--help` 参数可查看详细帮助：

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

关于 Ionic CLI 及其与 Capacitor 配合使用的更多信息，请参阅[官方文档](https://ionicframework.com/docs/cli)。