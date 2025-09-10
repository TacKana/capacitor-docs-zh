---
title: 迁移策略
description: 从 Cordova 迁移到 Capacitor 的实施策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以直接完全替换，具体取决于应用的复杂程度。

## 为什么要迁移？

为了长期的稳定性和开发无忧。

Capacitor 由 [Ionic 团队](https://ionicframework.com/) 维护，而 Ionic 长期以来都是 Cordova 生态和开源社区的重要贡献者。虽然 Ionic 仍在大量使用 Cordova，但未来将持续投入 Capacitor 平台的发展。

Capacitor 完美兼容 Cordova，您可以随时将现有 web 应用平稳迁移过来。其设计之初就考虑了对丰富 Cordova 插件生态的原生支持，因此在 Capacitor 中使用 Cordova 插件非常便捷。

## 为什么推荐配合 Ionic 框架使用？

Capacitor 是 Ionic 框架官方推荐的原生运行时环境。结合 Ionic 框架使用时，您将获得最佳的应用体验 —— Ionic 提供了 Capacitor 所不具备的 UI/UX 增强功能，并且完美兼容 Angular、React 和 Vue 等主流前端框架。

随着 Capacitor 的发布，Ionic 几乎掌握了整个技术栈的控制权。如今构建 Ionic 应用时，我们掌控着原生运行时层（Capacitor）、UI 组件库（[Ionic 框架](https://ionicframework.com)）以及构建这些组件的底层技术（基于 [Stencil](https://stenciljs.com/) 的 Web Components）。这意味着：如果我们技术栈的任何环节出现问题，都能迅速修复。唯一不由我们控制的部分是您选择的上层前端框架（Angular、React、Vue 或原生 JavaScript）。

## 迁移流程概览

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了自动化迁移工具，可帮助安装 Capacitor 依赖、替换等效插件等，大幅简化迁移过程。

### 审计并迁移现有 Cordova 插件

首先全面审计现有的 Cordova 插件，可能有些已经可以移除。

接着查阅 Capacitor 的所有 [官方插件](/plugins/official.md) 和 [社区插件](/plugins/community.md)，很多情况下都能找到对应的替代方案。

某些插件的功能可能无法完全匹配，但根据您的实际需求可能影响不大。

### 必要时继续使用 Cordova

如需在 Capacitor 应用中使用 Cordova 插件，[请参阅这里](/plugins/cordova.md)。如果没有合适的替代方案，可以继续使用原有插件。如果有特别希望支持的插件，欢迎提交 [插件提案](https://github.com/capacitor-community/proposals)！

准备好 [开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？