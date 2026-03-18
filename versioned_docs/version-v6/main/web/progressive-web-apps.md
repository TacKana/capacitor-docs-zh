---
title: 构建渐进式网络应用
description: 如何使用 Capacitor 构建渐进式网络应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式网络应用

Capacitor 为渐进式网络应用（Progressive Web Apps）提供一流的支持，让您能够轻松构建一款应用，它既能在 iOS 和 Android 上原生运行，也能在 Web 上作为移动网络应用或"渐进式网络应用"运行。

## 什么是渐进式网络应用？

简单来说，渐进式网络应用（PWA）是一种利用现代网络能力，为用户提供类似应用体验的网络应用。这类应用部署在传统的网络服务器上，可通过 URL 访问，并能被搜索引擎索引。

从实用角度看，渐进式网络应用只是另一个术语，指代那些为移动端性能进行了优化、并利用新近可用的 Web API 来提供类似传统原生应用功能（如推送通知和离线存储）的网站。

## Capacitor 与渐进式网络应用

Capacitor 对渐进式网络应用**和**原生应用都提供一流的支持。这意味着 Capacitor 的桥接器支持在原生环境或 Web 环境中运行，许多插件在**两种环境**中都可使用，且 API 和调用方式完全相同。

这意味着您可以将 `@capacitor/core` 和 Capacitor 插件作为依赖项，同时用于您的原生应用**和**渐进式网络应用，而 Capacitor 会在需要时无缝调用 Web 代码，并在可用时调用原生代码。

此外，Capacitor 还提供多种实用工具，用于查询当前平台，以便在原生运行或在 Web 上运行时提供定制化的体验。

## 为您的应用添加渐进式网络应用支持

渐进式网络应用应具备应用清单（App Manifest）和服务工作线程（Service Worker）。

### 应用清单

首先，您需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），该文件应放在您的 `index.html` 文件旁边，用于提供关于应用的元数据，例如名称、主题颜色和图标。这些信息将在应用安装到主屏幕等场景中使用。

### 服务工作线程

接下来，为了发送推送通知和离线存储数据，需要一个[服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)，它将使您的网络应用能够代理网络请求，并执行处理和同步数据所需的后台任务。

服务工作线程功能强大，但也较为复杂。通常不建议从头开始编写。相反，您可以查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常用的服务工作线程方案，您可以轻松地将其集成到您的应用中。

在 MDN 的[使用服务工作线程](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面上，阅读更多关于使用服务工作线程的信息，包括如何注册它们。

## 渐进式网络应用性能

渐进式网络应用根据多项性能标准进行评估，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线前，请遵循[渐进式网络应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您发现使用现有的前端技术栈难以满足渐进式网络应用的性能标准，可以考虑使用 [Ionic Framework](http://ionicframework.com/) 作为选项，它几乎无需配置即可获得快速的 PWA 支持。