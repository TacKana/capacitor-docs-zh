---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，在许多情况下也可以完全替换。所需的工作量主要取决于应用程序的复杂程度。

## 为什么要迁移？

为了长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com) 支持，Ionic 是 Cordova 及更广泛开源生态系统的长期贡献者。Ionic 目前仍大量使用 Cordova，并且未来也将继续在该平台上投入。

它与 Cordova 向后兼容，因此您可以随时将现有的 Web 应用轻松切换到 Capacitor。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic Framework？

Capacitor 是 Ionic Framework 官方支持的原生运行时。将 Ionic 与 Capacitor 结合使用是构建出色应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 不具备的 UI 和 UX 增强功能。此外，它还能与您喜欢的 Web 应用框架协同工作，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。如今，当您构建 Ionic 应用时，我们控制了原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web Components）。这一点非常重要：如果我们控制的任何技术栈部分出现问题，我们可以立即修复。我们唯一不控制的部分是您在其之上使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具来帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。它是一个有用的工具，将自动化大部分迁移到 Capacitor 的过程。

### 审计然后迁移现有的 Cordova 插件

首先，对您现有的 Cordova 插件进行审计。您可能会发现一些不再需要的插件可以删除。

接下来，查看 Capacitor 的所有[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能会切换到与 Cordova 插件等效的 Capacitor 插件。

有些插件可能无法完全匹配功能，但根据您需要的特性，这可能并不重要。

### 如有需要，继续使用 Cordova

要在您的 Capacitor 应用中利用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替代插件，则继续按原样使用 Cordova 插件。如果您希望某个插件得到支持，请提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？