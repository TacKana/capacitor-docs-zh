---
title: 依赖管理
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/dependencies
---

保持依赖项最新能确保您使用受支持且[安全](#安全漏洞)的产品。忽略更新会增加技术债务，使未来的升级更加困难。

## 更新单个依赖项

点击 `X packages` 可显示所有依赖项，包括其当前版本和最新版本。

![依赖项列表](/img/dependency.png)

点击某个依赖项后可以选择：
- `升级`：将依赖项更新至最新版本
- `详情`：查看该依赖项的 npm 网页
- `卸载`：从项目中移除该依赖项

某些需要额外迁移步骤的依赖项可能会自动完成操作。例如：更新 `@ionic/angular-toolkit` 会自动迁移 `angular.json` 文件，移除不必要的部分，或为 Cordova 项目添加 `@ionic/cordova-builders`。

:::note
将鼠标悬停在任意依赖项上并点击 `...`，可显示该依赖项所有可安装的版本。
:::

## 批量更新依赖项

依赖包按作用域分组（如 `@ionic`、`@capacitor`）。点击作用域名称可升级该分组下的所有依赖项。

## 更新 Capacitor

点击 `Packages` > `@Capacitor` 可一次性升级所有 Capacitor 核心依赖项。

## 更新 Angular

对于 Angular 项目，点击 `Packages` > `@Angular` 可更新至最新次要版本，或迁移至 Angular 的下一个主要版本。系统将使用 `ng migrate` 功能来完成项目迁移。

## 次要版本更新

点击 `Configuration` > `Check for Minor Updates` 可查看项目中所有可用的次要版本更新（例如从 `1.2.0` 升级到 `1.3.1`）。

选择升级会逐个更新每个项目。

:::note
如果使用 Angular，请务必先迁移 Angular 版本（点击 `Packages` > `@angular`），然后再升级次要依赖项，以避免错误。
:::

## 安全漏洞

点击 `Configuration` > `Security Audit` 可识别存在安全漏洞的所有依赖项。您可以选择尝试修复这些问题。

:::note
此功能使用 `npm audit` 实现。尝试修复依赖项时会执行 `npm audit fix` 命令，但可能无法解决所有问题。某些情况下您需要将依赖项更新至更高版本来解决安全漏洞。
:::