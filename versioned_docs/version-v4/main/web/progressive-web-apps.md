---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用（Progressive Web Apps）提供一流的支持，使得构建一款既能原生运行于 iOS 和 Android，也能在 Web 上作为移动 Web 应用或“渐进式 Web 应用”运行的应用变得非常简单。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（PWA）是一种利用现代 Web 能力为用户提供类似原生应用体验的 Web 应用。这些应用部署在传统的 Web 服务器上，可以通过 URL 访问，并且可以被搜索引擎索引。

实际上，渐进式 Web 应用只是另一个术语，指的是为移动设备性能进行优化，并利用新近可用的 Web API 来提供类似传统原生应用功能（如推送通知和离线存储）的网站。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用**和**原生应用都提供一流的支持。这意味着 Capacitor 的桥接层支持在原生环境或 Web 环境中运行，许多插件在**两种环境**中都可以使用，并且具有完全相同的 API 和调用约定。

这意味着你可以将 `@capacitor/core` 和 Capacitor 插件作为依赖项，同时用于你的原生应用**和**渐进式 Web 应用。Capacitor 会根据需要无缝地调用 Web 代码，或在可用时调用原生代码。

此外，Capacitor 还提供了许多工具，用于查询当前运行平台，以便在原生运行或 Web 运行时提供定制化的体验。

## 为你的应用添加渐进式 Web 应用支持

渐进式 Web 应用应该具备应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，你需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），它与你的 `index.html` 文件放在一起，并提供关于你应用的元数据，例如名称、主题颜色和图标。这些信息将在你的应用被安装到主屏幕等场景下使用。

### 服务工作者

其次，为了发送推送通知和离线存储数据，你需要一个[服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)。它能让你的 Web 应用代理网络请求，并执行处理和同步数据所需的后台任务。

服务工作者功能强大，但也比较复杂。通常不建议从头开始编写。相反，你可以看看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常见的服务工作者方案，你可以轻松地将其整合到你的应用中。

在 MDN 的[使用服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面上阅读更多关于使用服务工作者的信息，包括如何注册它们。

## 渐进式 Web 应用性能

渐进式 Web 应用依据多个性能标准进行评估，包括[首次可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在应用上线前，请遵循[渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试你的应用。

如果你在现有前端技术栈下难以满足渐进式 Web 应用的性能标准，可以考虑使用 [Ionic Framework](http://ionicframework.com/)，它几乎无需配置就能提供快速的 PWA 支持。