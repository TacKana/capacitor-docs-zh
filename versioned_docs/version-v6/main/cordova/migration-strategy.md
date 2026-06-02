---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 到 Capacitor 的迁移可以逐步进行，或者在许多情况下可以完全替换。所需的工作量主要取决于应用的复杂程度。

## 为什么要迁移？

长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com/) 支持，Ionic 是 Cordova 和更大开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将继续长期在该平台上投入。

Capacitor 向后兼容 Cordova，因此您可以随时放心地将现有 Web 应用切换到它。Capacitor 从一开始就被设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么将 Ionic Framework 与 Capacitor 一起使用？

Capacitor 是 Ionic Framework 官方支持的原生运行时。将 Ionic 和 Capacitor 一起使用是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所没有的 UI 和 UX 增强功能。此外，它还可以与您最喜爱的 Web 应用框架一起使用，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在几乎控制了其全部技术栈。当您今天构建 Ionic 应用时，我们现在控制原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的"框架"（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果技术栈中我们控制的任何部分出现问题，我们可以立即修复。我们唯一不控制的部分是您在上面使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概述

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了帮助您从 Cordova 迁移到 Capacitor 的工具，包括安装 Capacitor 的依赖、替换等效插件等。它是一个有用的工具，可以自动化迁移到 Capacitor 的许多过程。

### 审查并迁移现有 Cordova 插件

首先审查您现有的 Cordova 插件。您可能可以删除不再需要的插件。

接下来，查看 Capacitor 的所有[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能可以切换到与 Capacitor 等效的插件。

某些插件的功能可能不完全匹配，但根据您需要的功能，这可能并不重要。

### 如果需要，继续使用 Cordova

要在 Capacitor 应用中利用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，请按原样继续使用 Cordova 插件。如果您希望看到某个插件得到支持，请提交一个[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？
