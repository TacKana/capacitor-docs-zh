---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以完全替换。具体的工作量主要取决于应用的复杂程度。

## 为何要迁移？

为了获得长期稳定的技术支持和开发安心。

Capacitor 由 [Ionic](https://ionicframework.com/) 提供支持，这是一家长期参与 Cordova 和更大开源生态建设的公司。Ionic 目前仍大量使用 Cordova，并将持续投入该平台的发展。

Capacitor 向后兼容 Cordova，因此您可以随时将现有 Web 应用平滑迁移。它的设计初衷就是开箱即用地支持丰富的 Cordova 插件生态，因此在 Capacitor 中使用 Cordova 插件非常便捷。

## 为何选择 Ionic + Capacitor？

结合使用 Ionic 和 Capacitor 能打造最佳应用体验，因为 Ionic Framework 提供了 Capacitor 不具备的 UI 和 UX 增强功能。同时它兼容 Angular、React、Vue 等主流前端框架。

随着 Capacitor 的发布，Ionic 现在几乎掌控了整个技术栈。如今构建 Ionic 应用时，我们掌控着原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及构建控件的"框架"（基于 [Stencil](https://stenciljs.com/) 的 Web Components）。这意义重大：如果我们技术栈的任何环节出现问题，都能立即修复。唯一不受控的只是您选择的前端框架（Angular、React、Vue 或原生 JavaScript）。

如果您正在使用 `Ionic React` 或 `Ionic Vue` 等新版本？Capacitor 是官方支持的原生运行时方案。

### 已在用 Ionic？建议升级到 Ionic 4

Capacitor 兼容所有 Ionic 项目（1.0 至 4.x+），但为了获得最佳开发体验，推荐使用 Ionic 4 及以上版本。如果您有 Ionic 1 到 3 的现有应用，请先遵循 [Ionic 4 迁移指南](https://ionicframework.com/docs/building/migration)。如需进一步协助，[Ionic 可提供支持](https://ionicframework.com/enterprise-edition)，包括 Ionic 4 培训、架构审查和迁移协助等咨询服务。

## 迁移流程概览

### 审计并迁移现有 Cordova 插件

首先审计现有的 Cordova 插件——可能会发现有些已不再需要。

接着查阅 Capacitor 的所有[核心插件](/apis/index.md)和[社区插件](/plugins/community.md)。您或许可以切换到对应的 Capacitor 等效插件。

某些插件可能无法完全匹配功能，但这取决于您实际需要的特性。

### 必要时继续使用 Cordova 或 Ionic Native

要在 Capacitor 应用中使用 Cordova/Ionic Native 插件，[请参阅此文档](/cordova/using-cordova-plugins.md)。如果没有替代插件，可继续使用原有 Cordova 插件。如有希望支持的插件，[欢迎向我们反馈](https://github.com/ionic-team/capacitor/issues/new)。

准备好[迁移到 Capacitor](/cordova/migrating-from-cordova-to-capacitor.md)了吗？