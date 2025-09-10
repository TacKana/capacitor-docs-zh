---
title: 构建渐进式网络应用
description: 如何使用 Capacitor 构建渐进式网络应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式网络应用

Capacitor 为渐进式网络应用（PWA）提供一流支持，让您能轻松构建一款同时运行在 iOS、Android 原生平台以及移动网页端的"渐进式网络应用"。

## 什么是渐进式网络应用？

简而言之，渐进式网络应用（PWA）是利用现代网页技术为用户提供类应用体验的网页应用。这类应用部署在传统网页服务器上，可通过 URL 访问，并能被搜索引擎收录。

实际上，渐进式网络应用就是对移动性能进行优化，并利用最新 Web API 实现类似原生应用功能（如推送通知和离线存储）的网站的代名词。

## Capacitor 与渐进式网络应用

Capacitor 同时对渐进式网络应用和原生应用提供一流支持。这意味着 Capacitor 的桥接层既能在原生环境运行，也能在网页环境运行，且许多插件在两个环境中都可用，并保持完全相同的 API 和调用方式。

也就是说，您可以同时在原生应用和渐进式网络应用中使用 `@capacitor/core` 及 Capacitor 插件作为依赖，Capacitor 会根据需求智能调用网页代码或原生代码（当可用时）。

此外，Capacitor 还提供多种实用工具来检测当前运行平台，从而为原生或网页环境提供定制化体验。

## 为应用添加渐进式网络应用支持

渐进式网络应用需要具备应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，您需要创建一个与应用主文件 `index.html` 同级的 [应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件 ([manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json))，其中包含应用的名称、主题色、图标等元数据。这些信息将在应用安装到主屏幕等场景中使用。

### 服务工作者

其次，为了发送推送通知和实现离线数据存储，您需要通过 [服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 让网页应用具备代理网络请求及执行后台数据处理与同步任务的能力。

服务工作者功能强大但实现复杂，通常不建议从零开始编写。您可以考虑使用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它们提供了现成的服务工作者解决方案，能快速集成到您的应用中。

关于服务工作者的详细使用指南（包括注册方法），请参阅 MDN 上的 [使用服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 页面。

## 渐进式网络应用性能优化

渐进式网络应用的性能评估包含多个标准，如 [可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [首次有效渲染](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

上线前请参照 [渐进式网络应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist) 进行优化，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 工具进行审计测试。

如果现有前端技术栈难以满足渐进式网络应用的性能要求，可以考虑采用 [Ionic Framework](http://ionicframework.com/)，它能以近乎零配置的方式提供高性能 PWA 支持。