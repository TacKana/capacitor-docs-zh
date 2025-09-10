---
title: 与 Ionic Framework 配合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# Capacitor 与 Ionic Framework 集成使用

构建应用时，Capacitor 并不强制依赖 Ionic Framework。但开发者会发现 [丰富的 Ionic UI 组件库](https://ionicframework.com/docs/components) 能显著提升应用品质。

通过 [Ionic CLI](https://ionicframework.com/docs/cli)，可以快速将 Capacitor 安装到任何新建或现有的 Ionic 项目中。

## 在新 Ionic 项目中安装 Capacitor
对于新建的 Ionic 项目，Capacitor 已是默认安装！您只需初始化新项目即可。执行以下命令创建 Ionic 项目：

```bash
ionic start
```

如需构建首个基于 Capacitor 的 Ionic 应用教程，请参考 Ionic Framework 团队的 [入门指南](https://ionicframework.com/docs/intro/next)。

## 为现有 Ionic 项目添加 Capacitor
若现有 Ionic 项目未启用 Capacitor，可通过以下命令激活：

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖

Ionic Framework 使用了以下 Capacitor 插件的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为获得最佳用户体验，即使未在应用中显式导入这些插件，也建议安装。在项目根目录执行：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

完成 Capacitor 及其插件安装后，可为应用添加移动平台：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录创建对应平台的原生工程目录，该目录应视为源代码产物。了解更多关于 [原生项目管理](/main/cordova/index.md#native-project-management) 的内容。

:::info
如果您的 Ionic 应用使用 Cordova，我们提供了 [从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 的指南。
:::

## Ionic CLI 的 Capacitor 命令

为方便使用，Ionic CLI 封装了一系列 Capacitor 高阶命令。各命令文档如下，也可通过 `--help` 标志查看帮助信息。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

更多关于 Ionic CLI 及其与 Capacitor 配合使用的信息，请参阅 [官方文档](https://ionicframework.com/docs/cli)。