---
title: 依赖管理
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/dependencies
---

保持依赖项更新可确保您使用的是受支持和[安全](#security-vulnerabilities)的产品。忽略更新会增加您的技术债务，使日后更难更新。

## 更新单个依赖

点击 `X packages` 显示所有依赖项，包括当前版本和最新版本。

![依赖列表](/img/dependency.png)

点击一个依赖项并选择：
- `Upgrade` - 将依赖项升级到最新版本
- `Info` - 显示该依赖项的 npm 网页
- `Uninstall` - 从项目中移除该依赖项

某些需要额外迁移步骤的依赖项可能会自动为您完成。例如：更新 `@ionic/angular-toolkit` 将迁移 `angular.json` 以移除不需要的部分，或为 Cordova 项目添加 `@ionic/cordova-builders`。

:::note
悬停在任一依赖项上并点击 `...` 可显示该依赖项所有可安装的版本。
:::

## 更新多个依赖

包按 scope 分组（例如 `@ionic`、`@capacitor`）。您可以通过点击 scope 来升级其中的所有依赖项。

## 更新 Capacitor

点击 `Packages` > `@Capacitor` 一次性升级所有 Capacitor 核心依赖。

## 更新 Angular

对于 Angular 项目，点击 `Packages` > `@Angular` 更新到最新的次版本，或迁移到 Angular 的下一个主版本。将使用 `ng migrate` 功能来迁移您的项目。

## 次要更新

您可以通过点击 `Configuration` > `Check for Minor Updates` 查看项目中所有可用的次要更新（例如从 `1.2.0` 到 `1.3.1`）。

选择升级将逐个更新每个项目。

:::note
如果您使用 Angular，请务必先迁移 Angular 版本（点击 `Packages` > `@angular`），然后再升级次要依赖，以避免错误。
:::

## 安全漏洞

点击 `Configuration` > `Security Audit` 可识别所有存在安全漏洞的依赖项。您可以选择尝试修复这些问题。

:::note
此功能使用 `npm audit`。在尝试修复依赖时，它使用 `npm audit fix`，这可能无法解决所有问题。您可能需要将依赖项更新到更高版本以解决安全漏洞。
:::
