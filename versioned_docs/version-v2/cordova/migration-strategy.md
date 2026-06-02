---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova/migration-strategy
---

# 迁移策略

从 Cordova 到 Capacitor 的迁移可以逐步进行，也可以在许多情况下完全替换。所涉及的工作量主要取决于应用的复杂程度。

## 为什么迁移？

长期的稳定和安心。

Capacitor 由 [Ionic](https://ionicframework.com/) 支持，Ionic 是 Cordova 和更广泛开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将在未来很长一段时间内继续在该平台上进行投入。

Capacitor 向后兼容 Cordova，因此您可以随时舒适地将现有 web 应用切换到它。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件很容易。

## 为什么要将 Ionic 与 Capacitor 一起使用？

将 Ionic 和 Capacitor 一起使用是构建最佳应用体验的方式，因为 Ionic Framework 提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它可以与您喜欢的 Web 应用框架一起使用，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在几乎完全掌控了自己的技术栈。当您今天构建 Ionic 应用时，我们现在控制原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的"框架"（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这意义重大：如果在我们控制的任何部分出现问题，我们可以立即修复。我们唯一不控制的部分是您在上面使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

您是否在使用任何较新风格的 Ionic，如 `Ionic React` 或 `Ionic Vue`？Capacitor 是其官方支持的原生运行时。

### 已经在使用 Ionic？考虑更新到 Ionic 4

Capacitor 适用于任何 Ionic 项目（1.0 到 4.x+），但为了获得最佳的应用开发体验，建议使用 Ionic 4 及以上版本。如果您有现有的 Ionic 1 到 3 应用，请先按照 [Ionic 4 迁移指南](https://ionicframework.com/docs/building/migration) 操作。如果您需要进一步帮助，[Ionic 可以提供帮助。](https://ionicframework.com/enterprise-edition) 提供咨询服务，包括 Ionic 4 培训、架构审查和迁移协助。

## 迁移过程概述

### 审核然后迁移现有 Cordova 插件

首先审核您现有的 Cordova 插件——您可能可以移除不再需要的插件。

接下来，查看所有 Capacitor 的 [核心插件](/apis/index.md) 以及 [社区插件](/plugins/community.md)。您可能可以切换到与 Capacitor 等效的 Cordova 插件。

某些插件的功能可能不完全匹配，但根据您需要的功能，这可能无关紧要。

### 根据需要继续使用 Cordova 或 Ionic Native

要在您的 Capacitor 应用中利用 Cordova 和/或 Ionic Native 插件，[请参见此处。](/cordova/using-cordova-plugins.md) 如果替代插件不存在，请继续按原样使用 Cordova 插件。如果有您希望得到支持的插件，[请告知我们。](https://github.com/ionic-team/capacitor/issues/new)

准备好 [迁移到 Capacitor 了吗？](/cordova/migrating-from-cordova-to-capacitor.md)