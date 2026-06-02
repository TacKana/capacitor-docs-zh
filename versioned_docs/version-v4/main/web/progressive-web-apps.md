---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用提供了一流支持，使构建一个在 iOS 和 Android 上原生运行，同时在 Web 上作为移动 Web 应用或"渐进式 Web 应用"运行的应用变得容易。

## 什么是渐进式 Web 应用？

简而言之，渐进式 Web 应用（PWA）是一种使用现代 Web 能力为用户提供类似应用体验的 Web 应用。这些应用部署在传统的 Web 服务器上，可通过 URL 访问，并且可以被搜索引擎索引。

渐进式 Web 应用实际上就是针对移动性能进行了优化的网站，并利用新可用的 Web API 提供与传统原生应用类似的功能，例如推送通知和离线存储。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用 _和_ 原生应用都提供了一流支持。这意味着 Capacitor 的桥接器支持在原生环境或 Web 中运行，许多插件在 _两种环境中_ 都具有完全相同的 API 和调用约定可用。

这意味着您使用 `@capacitor/core` 和 Capacitor 插件作为您的原生应用 _和_ 您的渐进式 Web 应用的依赖，Capacitor 会在需要时无缝调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 还提供了许多用于查询当前平台的实用工具，以便在原生环境或 Web 上运行时提供定制化的体验。

## 为您的应用添加渐进式 Web 应用支持

渐进式 Web 应用应具有应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，您需要一个[应用清单](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json)），它位于您的 `index.html` 文件旁边，并提供关于您的应用的元数据，例如名称、主题颜色和图标。例如，当您的应用安装到主屏幕时，将使用这些信息。

### 服务工作者

接下来，为了发送推送通知和离线存储数据，[服务工作者](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)将使您的 Web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

服务工作者功能强大但复杂。通常，不建议从头开始编写它们。相反，可以看看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它提供了常见的服务工作者方案，您可以轻松地将其整合到您的应用中。

在 MDN 的[使用 Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers) 页面上阅读更多关于使用服务工作者的信息，包括如何注册它们。

## 渐进式 Web 应用性能

渐进式 Web 应用通过多个性能标准来评判，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前，请遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您在使用现有的前端技术栈时难以达到渐进式 Web 应用性能标准，可以看看 [Ionic Framework](http://ionicframework.com/)，它几乎无需配置即可快速获得 PWA 支持。
