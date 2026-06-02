---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用有一流支持，使得构建一个在 iOS 和 Android 上原生运行，同时在 Web 上作为移动 Web 应用或"渐进式 Web 应用"运行的应用变得容易。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（PWA）是一种使用现代 Web 能力为用户提供类似应用体验的 Web 应用。这些应用部署在传统 Web 服务器上，可通过 URL 访问，并且可以被搜索引擎索引。

渐进式 Web 应用实际上只是针对移动性能进行了优化，并利用新可用的 Web API 来提供类似于传统原生应用的功能（如推送通知和离线存储）的网站的另一个术语。

## Capacitor 和渐进式 Web 应用

Capacitor 对渐进式 Web 应用_和_原生应用都有一流支持。这意味着 Capacitor 的 bridge 支持在原生上下文或 Web 中运行，许多插件在_两种上下文_中都可以使用，具有完全相同的 API 和调用约定。

这意味着您可以将 `@capacitor/core` 和 Capacitor 插件用作原生应用_和_渐进式 Web 应用的依赖，Capacitor 在需要时会无缝地调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 还提供了许多用于查询当前平台的实用程序，以便在原生或 Web 上运行时提供定制化的体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用应具有应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，您需要一个位于 `index.html` 文件旁边并提供应用元数据（如其名称、主题颜色和图标）的[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)）。例如，当您的应用安装到主屏幕时，将使用这些信息。

### 服务工作者

接下来，为了发送推送通知和离线存储数据，[服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)将使您的 Web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

服务工作者功能强大但复杂。通常，不建议从头开始编写。相反，请查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常见的服务工作线程配方，您可以轻松地将其整合到应用中。

有关使用服务工作者的更多信息，包括如何注册它们，请阅读 MDN 上的[使用服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面。

## 渐进式 Web 应用性能

渐进式 Web 应用通过多个性能标准来评判，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有意义的绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线前遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您在使用现有的前端技术栈时难以达到渐进式 Web 应用性能标准，请查看 [Ionic Framework](http://ionicframework.com/)，它可以几乎零配置实现快速的 PWA 支持。
