---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在多数情况下完全替换。所需的工作量主要取决于应用的复杂程度。

## 为什么要迁移？

为了长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com) 提供支持，而 Ionic 是 Cordova 乃至整个开源生态系统长期的贡献者。Ionic 目前仍在大量使用 Cordova，并且将在未来继续长期投资该平台。

Capacitor 向后兼容 Cordova，因此您可以在准备好的时候，轻松地将现有 Web 应用切换到它。Capacitor 从一开始就被设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic Framework？

Capacitor 是 Ionic Framework 官方支持的本地运行时。将 Ionic 和 Capacitor 结合使用是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它可以与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。当您今天构建 Ionic 应用时，我们控制了本地运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果我们控制的堆栈的任何部分出现问题，我们可以立即修复。我们唯一不控制的部分是您在最上层使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移过程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具来协助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化迁移到 Capacitor 的许多过程。

### 审核然后迁移现有的 Cordova 插件

首先，审核您现有的 Cordova 插件。您可能会发现可以移除一些不再需要的插件。

接下来，查阅所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能可以切换到与 Cordova 插件等效的 Capacitor 插件。

某些插件可能无法完全匹配功能，但根据您需要的特性，这可能无关紧要。

### 必要时继续使用 Cordova

要在您的 Capacitor 应用中利用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果有您希望支持的插件，请提交一个[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？