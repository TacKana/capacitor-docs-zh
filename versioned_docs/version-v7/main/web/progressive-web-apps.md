---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用提供了一流的支持，使您能够轻松构建一款既能在 iOS 和 Android 上原生运行，也能在 Web 上作为移动 Web 应用或“渐进式 Web 应用”运行的应用。

## 什么是渐进式 Web 应用？

简而言之，渐进式 Web 应用（PWA）是一种利用现代 Web 能力为用户提供类似应用体验的 Web 应用。这些应用部署在传统的 Web 服务器上，可以通过 URL 访问，并且能被搜索引擎索引。

实际上，渐进式 Web 应用只是对网站进行移动端性能优化并利用新近可用的 Web API 来提供类似传统原生应用功能（例如推送通知和离线存储）的另一种说法。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用**和**原生应用都提供一流的支持。这意味着 Capacitor 的桥接层既支持在原生环境中运行，也支持在 Web 环境中运行，许多插件在这两种环境中都可用，并且 API 和调用约定完全相同。

这意味着您可以将 `@capacitor/core` 和 Capacitor 插件作为依赖，同时用于您的原生应用**和**渐进式 Web 应用，而 Capacitor 会在需要时无缝调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 还提供了多种实用工具来查询当前平台，以便在原生运行或 Web 运行时提供定制化的体验。

## 为您的应用添加渐进式 Web 应用支持

渐进式 Web 应用应具备应用清单（App Manifest）和服务工作线程（Service Worker）。

### 应用清单

首先，您需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件 ([manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json))，该文件应与您的 `index.html` 文件放在一起，并提供关于您应用的元数据，例如应用名称、主题颜色和图标。例如，当您的应用被安装到主屏幕时，这些信息将被使用。

### 服务工作线程

其次，为了发送推送通知和离线存储数据，需要一个[服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)，它使您的 Web 应用能够代理网络请求并执行处理和同步数据所需的背景任务。

服务工作线程功能强大，但也很复杂。通常不建议从零开始编写。相反，可以查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它提供了常见的服务工作线程方案，您可以轻松地将其集成到您的应用中。

有关使用服务工作线程的更多信息，包括如何注册它们，请参阅 MDN 上的[使用服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面。

## 渐进式 Web 应用性能

渐进式 Web 应用根据多项性能标准进行评估，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线前，请遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您发现使用现有的前端技术栈难以满足渐进式 Web 应用的性能标准，可以考虑将 [Ionic Framework](http://ionicframework.com/) 作为一个选项，它能够以几乎零配置的方式获得快速的 PWA 支持。