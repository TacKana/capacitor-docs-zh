---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 到 Capacitor 的迁移可以逐步进行，在许多情况下也可以完全替换。所涉及的工作量在很大程度上取决于应用的复杂程度。

## 为什么要迁移？

长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com/) 支持，Ionic 是 Cordova 和更广泛的开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将继续长期在该平台上进行投入。

它与 Cordova 向后兼容，因此您可以随时舒适地将现有的 Web 应用切换到 Capacitor。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要将 Ionic Framework 与 Capacitor 一起使用？

Capacitor 是 Ionic Framework 官方支持的原生运行时。将 Ionic 和 Capacitor 一起使用是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所没有的 UI 和 UX 增强功能。此外，它可以与您最喜欢的 Web 应用框架一起使用，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在几乎控制了其所有的技术栈。当您今天构建一个 Ionic 应用时，我们现在控制原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的"框架"（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果我们在我们控制的任何部分中发现问题，我们可以立即修复。我们唯一不控制的部分是您在顶层使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移过程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了有助于从 Cordova 迁移到 Capacitor 的工具，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化迁移到 Capacitor 的大部分过程。

### 审查然后迁移现有的 Cordova 插件

首先审查您现有的 Cordova 插件。您可能能够删除不再需要的插件。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能能够切换到与 Cordova 插件功能等效的 Capacitor 插件。

有些插件的功能可能不完全匹配，但根据您所需的功能，这可能并不重要。

### 如果需要，继续使用 Cordova 或 Ionic Native

要在 Capacitor 应用中利用 Cordova 和/或 Ionic Native 插件，[请参阅这里](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果您希望看到某个插件得到支持，请提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？
