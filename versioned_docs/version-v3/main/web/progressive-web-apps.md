---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用（PWA）提供一流支持，让您能轻松构建既能在 iOS 和 Android 上原生运行，也能在 Web 上作为移动应用或"渐进式 Web 应用"运行的跨平台应用。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（Progressive Web App, PWA）是一种利用现代 Web 技术为用户提供类原生应用体验的 Web 应用。这类应用部署在传统 Web 服务器上，可通过 URL 访问，并能被搜索引擎收录。

实际上，PWA 就是对移动端性能进行优化，并利用新兴 Web API 实现推送通知、离线存储等原生应用特性的网站的另一种称呼。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用 _和_ 原生应用都提供一流支持。这意味着 Capacitor 的桥接层既能在原生环境运行，也能在 Web 环境运行，许多插件在 _两种环境下_ 都可用，且保持完全相同的 API 和调用方式。

您可以使用 `@capacitor/core` 和 Capacitor 插件作为 _原生应用_ 和 _渐进式 Web 应用_ 的依赖，Capacitor 会在需要时无缝调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 还提供多种实用工具来查询当前运行平台，以便为原生或 Web 环境提供定制化体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用需要具备应用清单（App Manifest）和服务工作线程（Service Worker）。

### 应用清单

首先，您需要在 `index.html` 同级目录下创建 [应用清单](https://developer.mozilla.org/en-US/docs/v3/Web/Manifest) 文件 [manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)，其中包含应用名称、主题色和图标等元数据。这些信息将在应用被添加到主屏幕时使用。

### 服务工作线程

其次，为了实现推送通知和离线存储功能，需要使用 [服务工作线程](https://developer.mozilla.org/en-US/docs/v3/Web/API/Service_Worker_API) 来代理网络请求，并执行数据处理和同步所需的后台任务。

服务工作线程功能强大但较为复杂，通常不建议从零编写。可以考虑使用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它们提供了现成的服务工作线程方案，可轻松集成到应用中。

关于服务工作线程的使用方法（包括如何注册），请参阅 MDN 上的 [使用服务工作线程](https://developer.mozilla.org/en-US/docs/v3/Web/API/Service_Worker_API/Using_Service_Workers) 文档。

## 渐进式 Web 应用性能评估

渐进式 Web 应用需符合多项性能标准，包括 [可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线前，请参照 [渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 工具对应用进行审计测试。

如果现有前端技术栈难以满足 PWA 性能要求，可以考虑采用 [Ionic 框架](http://ionicframework.com/)，它能以近乎零配置的方式提供高性能的 PWA 支持。