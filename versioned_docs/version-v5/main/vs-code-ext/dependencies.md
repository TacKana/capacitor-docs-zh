---
title: 依赖项
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/dependencies
---

保持依赖项的最新状态，可以确保您使用的是受支持和[安全](#安全漏洞)的产品。忽略更新将增加您的技术债务，使将来更难进行更新。

## 更新单个依赖项

点击 `X 个包` 以显示所有依赖项，展示它们的当前版本和最新版本。

![依赖项列表](/img/dependency.png)

点击一个依赖项并选择：
- `升级` - 将依赖项升级到最新版本
- `信息` - 显示此依赖项的 npm 网页
- `卸载` - 从项目中移除该依赖项

某些需要额外迁移步骤的依赖项可能会自动为您完成。例如：更新 `@ionic/angular-toolkit` 会自动迁移 `angular.json`，移除不需要的部分，或为 Cordova 项目添加 `@ionic/cordova-builders`。

:::note
将鼠标悬停在任意依赖项上，点击 `...` 可以显示该依赖项所有可安装的版本。
:::

## 更新多个依赖项

包会按作用域分组（例如 `@ionic`、`@capacitor`）。您可以通过点击作用域来升级该作用域下的所有依赖项。

## 更新 Capacitor

点击 `包` > `@Capacitor` 可一次性升级所有 Capacitor 核心依赖项。

## 更新 Angular

对于 Angular 项目，点击 `包` > `@Angular` 可更新到最新的次要版本，或迁移到 Angular 的下一个主要版本。将使用 `ng migrate` 功能来迁移您的项目。

## 次要更新

您可以通过点击 `配置` > `检查次要更新` 来查看项目中所有可用的次要更新（例如从 `1.2.0` 到 `1.3.1`）。

选择升级将逐个更新每个项目。

:::note
如果您使用 Angular，请确保先迁移 Angular 版本（点击 `包` > `@angular`），然后再升级次要依赖项，以避免错误。
:::

## 安全漏洞

点击 `配置` > `安全审计` 以识别所有存在安全漏洞的依赖项。您可以选择尝试修复这些问题。

:::note
此功能使用 `npm audit`。在尝试修复依赖项时，它会使用 `npm audit fix`，但可能无法解决所有问题。您可能需要将依赖项更新到更高版本以解决安全漏洞。
:::
