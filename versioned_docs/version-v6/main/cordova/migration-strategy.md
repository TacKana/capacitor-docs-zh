---
title: 迁移策略
description: 从 Cordova 迁移到 Capacitor 的策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以分阶段进行，也可以在许多情况下完全替换。迁移所需的工作量主要取决于应用的复杂度。

## 为什么要迁移？

为了长期的稳定性和开发安心。

Capacitor 由 [Ionic 团队](https://ionicframework.com)维护，该团队长期参与 Cordova 和更广泛的开源生态系统贡献。Ionic 目前仍大量使用 Cordova 并会持续投资该平台。

它向后兼容 Cordova，因此您可以随时将现有 Web 应用无缝切换过来。Capacitor 从一开始就被设计为开箱即用地支持丰富的 Cordova 插件生态，因此在 Capacitor 中使用 Cordova 插件非常容易。

## 为什么要在 Capacitor 中使用 Ionic 框架？

Capacitor 是 Ionic 框架官方支持的原生运行时。结合使用 Ionic 和 Capacitor 是构建卓越应用体验的最佳方式，因为 Ionic 框架提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它能兼容您喜爱的 Web 应用框架，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在几乎掌控了整个技术栈。当您今天构建 Ionic 应用时，我们掌控着原生运行时层（Capacitor）、UI 控件（[Ionic 框架](https://ionicframework.com)）和用于构建控件的"框架"（基于 [Stencil](https://stenciljs.com/) 的 Web 组件）。这意义重大：如果我们技术栈的任何部分出现问题，我们可以立即修复。唯一不受我们控制的是您使用的上层前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概览

### 使用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)提供了帮助您从 Cordova 迁移到 Capacitor 的工具，包括安装 Capacitor 依赖项、替换等效插件等功能。这是一个实用的工具，可以自动化大部分迁移流程。

### 审计并迁移现有 Cordova 插件

首先审计现有的 Cordova 插件，您可能会发现一些不再需要的插件可以移除。

接着查看 Capacitor 的所有[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)。您或许可以切换为 Capacitor 的等效 Cordova 插件。

有些插件的功能可能不完全匹配，但根据您的需求这也许无关紧要。

### 必要时继续使用 Cordova

要在 Capacitor 应用中使用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果没有替代插件，可以继续使用原有的 Cordova 插件。如果您希望某个插件得到支持，可以提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？