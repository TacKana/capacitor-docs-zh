---
title: Building Progressive Web Apps
description: 使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用（PWA）提供一流的支持，让您能够轻松构建既能在 iOS 和 Android 上原生运行，也能在 Web 端作为移动应用或"渐进式 Web 应用"运行的跨平台应用。

## 什么是渐进式 Web 应用？

简而言之，渐进式 Web 应用（PWA）是一种利用现代 Web 技术为用户提供类原生应用体验的 Web 应用。这类应用部署在传统 Web 服务器上，可通过 URL 访问，并能被搜索引擎收录。

从实际应用角度来看，PWA 本质上是对移动性能进行优化并利用新型 Web API 实现类原生功能（如推送通知和离线存储）的网站。

## Capacitor 与渐进式 Web 应用

Capacitor 同时为渐进式 Web 应用和原生应用提供原生级支持。这意味着 Capacitor 的桥接层既能在原生环境中运行，也能在 Web 环境中运行，许多插件在这两种环境下都可用且采用完全相同的 API 和调用方式。

因此，您可以将 `@capacitor/core` 和 Capacitor 插件同时作为原生应用和渐进式 Web 应用的依赖项，Capacitor 会根据当前运行环境智能地调用 Web 代码或原生代码。

此外，Capacitor 还提供多种实用工具来检测当前运行平台，从而为原生或 Web 环境提供定制化的用户体验。

## 为应用添加 PWA 支持

渐进式 Web 应用需要具备应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，您需要在 `index.html` 同级目录下创建 [应用清单文件](https://developer.mozilla.org/en-US/docs/Web/Manifest)（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），用于提供应用的元数据，如应用名称、主题色和图标等信息。这些信息将在用户将应用添加到主屏幕时使用。

### 服务工作者

其次，为实现推送通知和离线数据存储功能，您需要使用 [服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)。这项技术能让您的 Web 应用代理网络请求，并执行数据处理和同步所需的后台任务。

服务工作者功能强大但实现复杂，通常不建议从零开始编写。推荐使用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它们提供了开箱即用的服务工作者解决方案，可轻松集成到您的应用中。

关于服务工作者的使用方法和注册方式，请参阅 MDN 的 [使用 Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 文档。

## PWA 性能优化

渐进式 Web 应用的性能评估包含多项标准，如 [可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

上线前请对照 [渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist) 进行优化，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 工具进行审核测试。

如果现有前端技术栈难以满足 PWA 性能标准，可以考虑采用 [Ionic Framework](http://ionicframework.com/)，该框架能帮助您以近乎零配置的方式快速实现高性能 PWA。