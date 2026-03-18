---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以在多数情况下直接完全替换。所需的工作量主要取决于应用程序的复杂程度。

## 为什么需要迁移？

为了获得长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com) 提供支持，Ionic 是 Cordova 及更广泛开源生态系统的长期贡献者。Ionic 目前仍然大量使用 Cordova，并将在未来很长一段时间内继续投资该平台。

它与 Cordova 向后兼容，因此您可以在准备好的时候，轻松地将现有的 Web 应用程序切换过来。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic Framework？

Capacitor 是 Ionic Framework 官方支持的原生运行时。将 Ionic 和 Capacitor 结合使用是构建卓越应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所不具备的用户界面和用户体验增强功能。此外，它还能与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。当您今天构建一个 Ionic 应用时，我们控制着原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这一点非常重要：如果我们控制的堆栈的任何部分出现问题，我们可以立即修复。我们唯一不控制的部分是您在顶层使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具来帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化迁移到 Capacitor 的许多过程。

### 审计然后迁移现有的 Cordova 插件

首先，审计您现有的 Cordova 插件。您可能可以移除一些不再需要的插件。

接下来，查看所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您或许可以切换到 Capacitor 的等效 Cordova 插件。

有些插件可能无法完全匹配功能，但根据您需要的特性，这可能并不重要。

### 必要时继续使用 Cordova 或 Ionic Native

要在您的 Capacitor 应用中利用 Cordova 和/或 Ionic Native 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果您希望某个插件获得支持，请提交一个[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？