---
title: 依赖
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/dependencies
---

保持您的依赖更新将确保您使用的是受支持和[安全](#安全漏洞)的产品。忽略更新将增加您的技术债务，使将来更难以更新。

## 更新单个依赖

点击 `X packages` 显示所有依赖，显示其当前版本和最新版本。

![依赖列表](/img/dependency.png)

点击一个依赖并选择：
- `Upgrade` 将依赖更新到最新版本
- `Info` 显示此依赖的 npm 网页
- `Uninstall` 从项目中移除依赖

某些需要额外迁移步骤的依赖可能会自动为您完成。例如：更新 `@ionic/angular-toolkit` 将迁移 `angular.json` 以移除不需要的部分，或为 Cordova 项目添加 `@ionic/cordova-builders`。

:::note
悬停在任何依赖上并点击 `...` 以显示该依赖可安装的所有可用版本。
:::

## 更新多个依赖

包按范围分组（例如 `@ionic`、`@capacitor`）。您可以通过点击某个范围来升级其中的所有依赖。

## 更新 Capacitor

点击 `Packages` > `@Capacitor` 以一次性升级所有 Capacitor 核心依赖。

## 更新 Angular

对于 Angular 项目，点击 `Packages` > `@Angular` 以更新到最新的次要版本，或迁移到下一个 Angular 主版本。将使用 `ng migrate` 功能来迁移您的项目。

## 次要更新

您可以通过点击 `Configuration` > `Check for Minor Updates` 来查看项目中所有可用的次要更新（例如从 `1.2.0` 到 `1.3.1`）。

选择升级将逐个更新每个项目。

:::note
如果您使用 Angular，请确保先迁移 Angular 版本（点击 `Packages` > `@angular`），然后再升级次要依赖，以避免错误。
:::

## 安全漏洞

点击 `Configuration` > `Security Audit` 以识别所有存在安全漏洞的依赖。您可以选择尝试修复这些漏洞。

:::note
此功能使用 `npm audit`。尝试修复依赖时，它会使用 `npm audit fix`，这可能无法解决所有问题。您可能需要将依赖更新到更高版本以解决安全漏洞。
:::
