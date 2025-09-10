---
title: 迁移策略
description: 迁移方案
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以直接完全替换，具体取决于应用的复杂度。

## 为什么要迁移？

为了长期的稳定性和开发无忧。

Capacitor 由 [Ionic 官方维护](https://ionicframework.com/)，而 Ionic 长期为 Cordova 和开源生态贡献力量。虽然 Ionic 自身仍重度依赖 Cordova 并会持续投入，但 Capacitor 提供了更好的未来。

它完全兼容 Cordova，您可以在准备好的时候无缝迁移现有应用。Capacitor 从设计之初就支持丰富的 Cordova 插件生态，因此使用 Cordova 插件非常便捷。

## 为什么推荐 Ionic 框架与 Capacitor 配合使用？

Capacitor 是 Ionic 框架官方支持的原生运行时。结合使用 Ionic 和 Capacitor 能打造最佳应用体验，因为 Ionic 框架提供了 Capacitor 所不具备的 UI/UX 增强能力，同时完美兼容 Angular、React 和 Vue 等主流前端框架。

随着 Capacitor 的发布，Ionic 几乎掌控了整个技术栈。如今构建 Ionic 应用时，我们掌控着原生运行时层（Capacitor）、UI 控件库（[Ionic 框架](https://ionicframework.com)）和控件开发框架（基于 [Stencil](https://stenciljs.com/) 的 Web Components）。这意味着：技术栈中任何环节出现问题，我们都能快速响应。唯一不受控的只有您选择的前端框架（Angular/React/Vue 或原生 JavaScript）。

## 迁移流程概览

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)提供自动化迁移工具，可帮助安装 Capacitor 依赖、替换等效插件等，大幅简化迁移过程。

### 审计并迁移现有 Cordova 插件

首先审计现有 Cordova 插件，可能有些已不再需要。

接着查阅 Capacitor 的[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)，很多都有对应的替代方案。

部分插件功能可能不完全匹配，但根据实际需求可能影响不大。

### 按需继续使用 Cordova

要在 Capacitor 应用中使用 Cordova 插件，[参见此处](/plugins/cordova.md)。若暂无替代方案，可继续使用原 Cordova 插件。如需某插件支持，欢迎提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？