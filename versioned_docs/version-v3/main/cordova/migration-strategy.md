---
title: 迁移策略
description: 从 Cordova 迁移到 Capacitor 的方案
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在许多情况下直接完全替换。所需工作量主要取决于应用的复杂程度。

## 为什么要迁移？

为了长期的稳定性和开发安心。

Capacitor 由 [Ionic 公司](https://ionicframework.com) 支持维护，该公司长期参与 Cordova 和更广泛的开源生态建设。Ionic 目前仍大量使用 Cordova，并将持续对该平台进行长期投入。

Capacitor 对 Cordova 保持向后兼容，因此您可以随时将现有 Web 应用平稳地切换过来。Capacitor 从设计之初就支持丰富的 Cordova 插件生态系统，开箱即用。因此，在 Capacitor 中使用 Cordova 插件非常方便。

## 为什么建议搭配 Ionic Framework 使用？

Capacitor 是 Ionic Framework 官方支持的原生运行时。结合使用 Ionic 和 Capacitor 能打造最佳应用体验，因为 Ionic Framework 提供了 Capacitor 不具备的 UI 和 UX 增强功能。此外，它能与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）完美协作。

随着 Capacitor 的发布，Ionic 现在几乎控制了整个技术栈。当您构建 Ionic 应用时，我们掌控着原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及构建控件的"框架"（基于 [Stencil](https://stenciljs.com/) 的 Web 组件）。这很重要：如果我们技术栈中任何环节出现问题，都能立即修复。唯一不受控的部分是您选择的前端框架（Angular、React、Vue 或原生 JavaScript）。

## 迁移流程概述

### 使用 Ionic VS Code 扩展工具

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了一系列工具来协助从 Cordova 迁移到 Capacitor，包括安装 Capacitor 依赖项、替换等效插件等。这个实用工具能自动化完成大部分迁移工作。

### 审计并迁移现有 Cordova 插件

首先审计现有的 Cordova 插件，可能会发现一些不再需要的插件可以移除。

接着查阅 Capacitor 的所有[官方插件](/plugins/official.md)和[社区插件](/plugins/community.md)，您可能会找到对应的 Capacitor 等效插件来替代 Cordova 插件。

某些插件功能可能无法完全匹配，但根据您的实际需求，这可能无关紧要。

### 按需继续使用 Cordova 或 Ionic Native

要在 Capacitor 应用中使用 Cordova 和/或 Ionic Native 插件，[请参阅此处](/plugins/cordova.md)。如果暂无替代插件，可继续使用原 Cordova 插件。如果有希望支持的插件，欢迎提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？