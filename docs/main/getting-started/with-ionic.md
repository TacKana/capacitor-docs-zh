---
title: 与 Ionic Framework 配合使用
description: 在 Ionic Framework 中使用 Capacitor
slug: /getting-started/with-ionic
---

# 在 Ionic Framework 中使用 Capacitor

Capacitor 构建应用时并不强制依赖 Ionic Framework。但开发者会发现 Ionic 提供的[丰富组件库](https://ionicframework.com/docs/components)能有效帮助构建高质量应用。

通过 [Ionic CLI](https://ionicframework.com/docs/cli) 可以快速将 Capacitor 安装到任何新建或已有的 Ionic 应用中。

## 在新 Ionic 项目中安装 Capacitor
对于新建的 Ionic 项目，Capacitor 已被默认集成！您只需创建一个新项目即可。运行以下命令初始化 Ionic 项目：

```bash
ionic start
```

如需构建首个基于 Capacitor 的 Ionic 应用教程，可参考 Ionic 团队提供的[入门指南](https://ionicframework.com/docs/intro/next)。

## 为现有 Ionic 项目添加 Capacitor
若现有 Ionic 项目未启用 Capacitor，可通过以下命令激活：

```bash
ionic integrations enable capacitor
```

### 安装必备 Capacitor 插件

Ionic Framework 依赖以下 Capacitor 插件提供的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为确保最佳用户体验，即使未在代码中显式调用这些插件，也建议安装它们。在项目根目录执行：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台支持

完成 Capacitor 及其插件安装后，可添加移动平台支持：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目根目录创建对应平台的本地工程目录。该目录应视为源代码产物进行管理，详见[本地项目管理指南](/main/cordova/index.md#native-project-management)。

:::info
若您的 Ionic 应用使用 Cordova，我们提供了[从 Cordova 迁移至 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 的专项指南。
:::

## Ionic CLI 的 Capacitor 快捷命令

Ionic CLI 封装了一系列高级命令以简化 Capacitor 操作，各命令说明如下。通过在命令后添加 `--help` 标志也可查看帮助信息。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 的更多使用细节及 Capacitor 集成说明，请参阅[官方文档](https://ionicframework.com/docs/cli)。