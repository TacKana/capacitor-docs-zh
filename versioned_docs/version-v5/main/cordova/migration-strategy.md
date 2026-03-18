---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在多数情况下直接完全替换。所需的工作量主要取决于应用的复杂程度。

## 为什么需要迁移？

为了长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com) 提供支持，Ionic 是 Cordova 和更广泛开源生态系统的长期贡献者。Ionic 目前仍在大量使用 Cordova，并将在未来很长一段时间内持续投资该平台。

Capacitor 向后兼容 Cordova，因此您可以在准备就绪时，轻松地将现有的 Web 应用切换过来。Capacitor 从一开始就被设计成能够开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic Framework？

Capacitor 是 Ionic Framework 官方支持的原生运行时环境。将 Ionic 与 Capacitor 结合使用是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它还能与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。如今，当您构建一个 Ionic 应用时，我们控制着原生运行时层（Capacitor）、UI 组件（[Ionic Framework](https://ionicframework.com)）以及用于构建组件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这一点非常重要：如果我们控制的堆栈任何部分出现问题，我们可以立即修复。唯一不受我们控制的部分是您在其之上使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具来帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化迁移到 Capacitor 的许多过程。

### 审核并迁移现有的 Cordova 插件

首先，审核您现有的 Cordova 插件。您可能可以移除一些不再需要的插件。

接下来，查阅所有 Capacitor 的 [官方插件](/plugins/official.md) 以及 [社区插件](/plugins/community.md)。您或许可以切换到与 Cordova 插件等效的 Capacitor 插件。

有些插件可能在功能上不完全匹配，但根据您需要的特性，这可能并不重要。

### 如有需要，继续使用 Cordova

要在您的 Capacitor 应用中使用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果您希望某个插件得到支持，可以提交一个 [插件提案](https://github.com/capacitor-community/proposals)！

准备 [迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？