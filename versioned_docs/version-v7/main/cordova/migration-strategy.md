---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在许多情况下完全替换。所涉及的工作量在很大程度上取决于应用的复杂程度。

## 为什么要迁移？

长期的稳定性和安心。

Capacitor [由 Ionic 支持](https://ionicframework.com/)，Ionic 是 Cordova 和更广泛的开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将在未来很长一段时间内继续在该平台上投资。

它与 Cordova 向后兼容，因此你可以随时将现有的 Web 应用切换到它。Capacitor 从设计之初就支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要将 Ionic Framework 与 Capacitor 一起使用？

Capacitor 是 Ionic Framework 官方支持的原生运行时。同时使用 Ionic 和 Capacitor 是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所没有的 UI 和 UX 增强功能。此外，它还能与你喜欢的 Web 应用框架（包括 Angular、React 和 Vue）一起使用。

随着 Capacitor 的发布，Ionic 现在控制着其几乎所有的技术栈。当你今天构建一个 Ionic 应用时，我们现在控制着原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的"框架"（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果技术栈中我们控制的任何部分出现问题，我们可以立即修复。我们唯一不控制的部分是你在此基础上使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移过程概述

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了帮助你从 Cordova 迁移到 Capacitor 的工具，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化许多迁移到 Capacitor 的过程。

### 审计然后迁移现有的 Cordova 插件

首先审计你现有的 Cordova 插件。你可能能够删除一些不再需要的插件。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。你可能能够切换到与 Capacitor 等效的 Cordova 插件。

某些插件的功能可能不完全匹配，但根据你需要的功能，这可能并不重要。

### 必要时继续使用 Cordova

要在 Capacitor 应用中使用 Cordova 插件，[请参见此处](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果你希望看到某个插件得到支持，请提交一个[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？
