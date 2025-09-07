---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，或在多数情况下直接完全替换。迁移所需的工作量主要取决于应用的复杂程度。

## 为何要迁移？

为了长期的稳定性和安心使用。

Capacitor 由 [Ionic 官方支持](https://ionicframework.com/)，而 Ionic 长期参与 Cordova 及更广泛的开源生态建设。虽然 Ionic 目前仍重度使用 Cordova，但未来将持续投资 Capacitor 平台。

Capacitor 向后兼容 Cordova，因此您可以在准备好的时候，轻松将现有 Web 应用切换过来。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态。因此，在 Capacitor 中使用 Cordova 插件十分便捷。

## 为什么推荐搭配 Ionic 框架使用？

Capacitor 是 Ionic 框架官方支持的原生运行时。结合使用 Ionic 和 Capacitor 是构建卓越应用体验的最佳方式，因为 Ionic 框架提供了 Capacitor 不具备的 UI 和 UX 增强功能。此外，它兼容您喜爱的 Web 应用框架，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现已掌控几乎整个技术栈。当您构建 Ionic 应用时，我们控制着原生运行时层（Capacitor）、UI 控件（[Ionic 框架](https://ionicframework.com)）以及构建控件的"框架"（基于 [Stencil](https://stenciljs.com/) 的 Web 组件）。这意义重大：如果我们技术栈中任何环节出现问题，都能立即修复。唯一不受控的部分是您选择的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概览

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供工具帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 依赖项、替换等效插件等。这个实用工具可以自动化完成大部分迁移工作。

### 审计并迁移现有 Cordova 插件

首先审计现有的 Cordova 插件，可能会发现有些已不再需要。

接着，查阅 Capacitor 的 [官方插件](/plugins/official.md) 和 [社区插件](/plugins/community.md)。您可以尝试切换到对应的 Capacitor 等效插件。

某些插件功能可能无法完全匹配，但根据您的需求也许影响不大。

### 必要时继续使用 Cordova

若需在 Capacitor 应用中使用 Cordova 插件，[参考这里](/plugins/cordova.md)。如果没有替代插件，可继续使用原 Cordova 插件。如果有希望支持的插件，可以提交 [插件提案](https://github.com/capacitor-community/proposals)！

准备好 [迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？