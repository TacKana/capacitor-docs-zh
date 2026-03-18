---
title: 迁移策略
description: 从 Cordova 迁移到 Capacitor 的策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以在多数情况下完全替代。所需工作量主要取决于应用的复杂程度。

## 为什么要迁移？

为了长期的稳定性和开发安心。

Capacitor 由 [Ionic](https://ionicframework.com) 提供支持，Ionic 是 Cordova 和更广泛开源生态系统的长期贡献者。Ionic 目前依然大量使用 Cordova，并将在未来持续投入该平台。

它向后兼容 Cordova，因此您可以在准备好时轻松将现有的 Web 应用切换过来。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic Framework？

Capacitor 是 Ionic Framework 官方支持的原生运行时环境。将 Ionic 和 Capacitor 结合使用是构建卓越应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它能与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。当您今天构建一个 Ionic 应用时，我们现在控制了原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果我们控制的技术栈的任何部分出现问题，我们可以立即修复。我们唯一不控制的就是您在顶层使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概览

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具，可帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，可以自动化许多迁移到 Capacitor 的流程。

### 审查并迁移现有的 Cordova 插件

首先审查您现有的 Cordova 插件。您可能会发现一些不再需要的插件可以移除。

接下来，查看所有 Capacitor 的 [官方插件](/plugins/official.md) 以及 [社区插件](/plugins/community.md)。您或许可以切换到 Capacitor 的等效 Cordova 插件。

某些插件可能在功能上不完全匹配，但根据您需要的功能，这可能无关紧要。

### 按需继续使用 Cordova

要在您的 Capacitor 应用中利用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果有您希望支持的插件，请开启一个 [插件提案](https://github.com/capacitor-community/proposals)！

准备好 [迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？