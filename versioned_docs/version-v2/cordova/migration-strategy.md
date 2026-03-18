---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在许多情况下完全替换。所需的工作量很大程度上取决于应用程序的复杂性。

## 为什么要迁移？

为了获得长期的稳定性和安心。

Capacitor 由 [Ionic](https://ionicframework.com/) 支持，Ionic 是 Cordova 和更广泛的开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将在未来很长一段时间内继续投资该平台。

它与 Cordova 向后兼容，因此您可以在准备好的时候，轻松地将现有的 Web 应用程序切换到它。Capacitor 从一开始就被设计为支持丰富的 Cordova 插件生态系统，开箱即用。因此，在 Capacitor 中使用 Cordova 插件很容易。

## 为什么要在 Capacitor 中使用 Ionic？

将 Ionic 和 Capacitor 结合使用是构建最佳应用体验的方式，因为 Ionic Framework 提供了 Capacitor 不具备的 UI 和 UX 增强功能。此外，它还能与您喜欢的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。当您今天构建 Ionic 应用时，我们现在控制着原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这一点很重要：如果我们技术栈中任何由我们控制的部分出现问题，我们可以立即修复。唯一不受我们控制的部分是您在其之上使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

您是否在使用任何较新版本的 Ionic，例如 `Ionic React` 或 `Ionic Vue`？Capacitor 是官方支持的原生运行时。

### 已经在使用 Ionic 了？考虑升级到 Ionic 4

Capacitor 可与任何 Ionic 项目（1.0 到 4.x+）配合使用，但为了享受最佳的应用开发体验，建议使用 Ionic 4 及以上版本。如果您有现有的 Ionic 1 到 3 应用，请从遵循 [Ionic 4 迁移指南](https://ionicframework.com/docs/building/migration) 开始。如果您需要进一步的帮助，[Ionic 可以提供支持](https://ionicframework.com/enterprise-edition)。我们提供咨询服务，包括 Ionic 4 培训、架构审查和迁移协助。

## 迁移过程概述

### 审核并迁移现有的 Cordova 插件

首先，审核您现有的 Cordova 插件——您可能可以移除一些不再需要的插件。

接下来，查看所有 Capacitor 的 [核心插件](/apis/index.md) 以及 [社区插件](/plugins/community.md)。您或许可以切换到 Capacitor 等效的 Cordova 插件。

有些插件可能无法完全匹配功能，但基于您所需的功能，这可能并不重要。

### 如果需要，继续使用 Cordova 或 Ionic Native

要在您的 Capacitor 应用中利用 Cordova 和/或 Ionic Native 插件，[请参阅此处](/cordova/using-cordova-plugins.md)。如果不存在替代插件，请继续按原样使用 Cordova 插件。如果您希望某个插件得到支持，[请告诉我们](https://github.com/ionic-team/capacitor/issues/new)。

准备好 [迁移到 Capacitor 了吗？](/cordova/migrating-from-cordova-to-capacitor.md)