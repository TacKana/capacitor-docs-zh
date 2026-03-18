---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用提供一流的支持，使得构建一个能在 iOS 和 Android 上原生运行，同时也能在 Web 上作为移动 Web 应用或“渐进式 Web 应用”运行的应用变得非常简单。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用是一种利用现代 Web 能力为用户提供类似应用体验的 Web 应用。这些应用部署在传统的 Web 服务器上，可以通过 URL 访问，并且能够被搜索引擎索引。

实际上，渐进式 Web 应用只是另一个术语，指的是为移动性能进行优化，并利用新近可用的 Web API 来提供类似传统原生应用功能（例如推送通知和离线存储）的网站。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用**和**原生应用均提供一流支持。这意味着 Capacitor 的桥接支持在原生环境或 Web 环境中运行，许多插件在**两种环境**下都可用，并且具有完全相同的 API 和调用约定。

这意味着您可以同时将 `@capacitor/core` 和 Capacitor 插件作为依赖项用于您的原生应用**和**渐进式 Web 应用，而 Capacitor 会在需要时无缝调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 提供了多种实用工具，用于查询当前平台，以便在原生或 Web 环境下运行时提供定制化的体验。

## 为您的应用添加渐进式 Web 应用支持

渐进式 Web 应用应具备应用清单和服务工作者。

### 应用清单

首先，您需要一个位于 `index.html` 文件旁边的[应用清单](https://developer.mozilla.org/en-US/docs/v3/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），它提供有关您应用的元数据，例如其名称、主题颜色和图标。例如，当您的应用被安装到主屏幕时，这些信息将被使用。

### 服务工作者

接下来，为了发送推送通知和离线存储数据，[服务工作者](https://developer.mozilla.org/en-US/docs/v3/Web/API/Service_Worker_API)将使您的 Web 应用能够代理网络请求，并执行处理和同步数据所需的后台任务。

服务工作者功能强大，但也很复杂。通常不建议从头开始编写。相反，您可以查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供常见的服务工作者方案，您可以轻松地将其集成到您的应用中。

有关使用服务工作者的更多信息，包括如何注册它们，请参阅 MDN 上的[使用服务工作者](https://developer.mozilla.org/en-US/docs/v3/Web/API/Service_Worker_API/Using_Service_Workers)页面。

## 渐进式 Web 应用性能

渐进式 Web 应用根据多个性能标准进行评估，包括[交互就绪时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前，请遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您发现使用现有的前端技术栈难以满足渐进式 Web 应用的性能标准，可以考虑使用 [Ionic Framework](http://ionicframework.com/) 作为选项，它几乎无需配置即可获得快速的 PWA 支持。