---
title: 依赖项管理
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/dependencies
---

保持依赖项处于最新状态能确保您使用受支持且[安全](#安全漏洞)的产品。忽略更新会增加技术债务，使未来的升级变得更加困难。

## 更新单个依赖项

点击 `X 个包` 显示所有依赖项，查看其当前版本和最新版本。

![依赖项列表](/img/dependency.png)

点击某个依赖项并选择：
- `升级`：将依赖项升级到最新版本
- `信息`：显示该依赖项的 npm 网页
- `卸载`：从项目中移除该依赖项

某些需要额外迁移步骤的依赖项可能会自动为您处理。例如：更新 `@ionic/angular-toolkit` 会迁移 `angular.json` 以移除不需要的部分，或为 Cordova 项目添加 `@ionic/cordova-builders`。

:::note
将鼠标悬停在任意依赖项上并点击 `...` 可显示该依赖项所有可安装的可用版本。
:::

## 批量更新依赖项

包按作用域分组（例如 `@ionic`、`@capacitor`）。点击某个作用域可以升级该作用域下的所有依赖项。

## 更新 Capacitor

点击 `包` > `@Capacitor`，一次性升级所有 Capacitor 核心依赖项。

## 更新 Angular

对于 Angular 项目，点击 `包` > `@Angular` 可更新到最新次要版本，或迁移到下一个 Angular 主要版本。系统将使用 `ng migrate` 功能迁移您的项目。

## 次要版本更新

通过点击 `配置` > `检查次要更新`，可以查看项目中所有可用的次要版本更新（例如从 `1.2.0` 到 `1.3.1`）。

选择升级将逐个更新每个项目。

:::note
如果您使用 Angular，请务必先迁移 Angular 版本（点击 `包` > `@angular`），然后再升级次要依赖项，以避免出现错误。
:::

## 安全漏洞

点击 `配置` > `安全审计` 可识别所有存在安全漏洞的依赖项。您可以选择尝试修复这些问题。

:::note
此功能使用 `npm audit`。尝试修复依赖项时会使用 `npm audit fix`，这可能无法解决所有问题。您可能需要将依赖项更新到更高版本才能解决安全漏洞。
:::