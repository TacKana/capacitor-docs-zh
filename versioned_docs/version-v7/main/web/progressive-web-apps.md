---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用（PWA）提供了一流的支持，让您能轻松构建既可在 iOS 和 Android 上原生运行，也能在 Web 端作为移动应用或"渐进式 Web 应用"运行的跨平台应用。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（PWA）是利用现代 Web 技术为用户提供类原生应用体验的网页应用。这类应用部署在传统网页服务器上，可通过 URL 访问，并能被搜索引擎索引。

实质上，渐进式 Web 应用就是专门针对移动性能优化、并利用新兴 Web API 实现类似原生应用功能（如推送通知和离线存储）的网站代名词。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用 _和_ 原生应用提供同等优先级的支持。这意味着 Capacitor 的桥接层既能在原生环境中运行，也能在 Web 环境中运行，许多插件在 _两种环境_ 下都可用且保持完全一致的 API 和调用方式。

您可以将 `@capacitor/core` 和 Capacitor 插件同时作为原生应用 _和_ 渐进式 Web 应用的依赖项。Capacitor 会根据运行时环境自动切换，在需要时无缝调用 Web 代码，在可用时优先调用原生代码。

此外，Capacitor 还提供多种实用工具用于查询当前运行平台，以便针对原生环境或 Web 环境提供定制化体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用需要具备应用清单（App Manifest）和服务工作线程（Service Worker）。

### 应用清单

首先，您需要在 `index.html` 同级目录下创建 [应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件（即 [manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)）。该文件包含应用的元数据，如名称、主题色和图标等信息，这些信息将在应用被添加到主屏幕时使用。

### 服务工作线程

其次，为了实现推送通知和离线存储数据功能，需要使用 [服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)。它能让您的 Web 应用代理网络请求，并执行数据处理和同步所需的后台任务。

服务工作线程功能强大但实现复杂，通常不建议从零开始编写。可以考虑使用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它们提供了常见服务工作线程方案，能轻松集成到您的应用中。

更多关于服务工作线程的使用方法（包括如何注册）请参考 MDN 上的 [使用服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 文档。

## 渐进式 Web 应用性能

渐进式 Web 应用的性能评估标准包括 [可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [首次有效渲染](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) 等指标。

应用上线前请参照 [渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 工具进行审计测试。

如果现有前端技术栈难以满足渐进式 Web 应用的性能要求，可以考虑采用 [Ionic 框架](http://ionicframework.com/)，它能以近乎零配置的方式为应用提供出色的 PWA 支持。