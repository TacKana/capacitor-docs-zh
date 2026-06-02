---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
translated: true
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用有一流支持，使你能够轻松构建一个在 iOS 和 Android 上原生运行，同时在 Web 上作为移动 Web 应用或"渐进式 Web 应用"运行的应用。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（PWA）是一种利用现代 Web 能力为用户提供类似原生应用体验的 Web 应用。这些应用部署在传统的 Web 服务器上，可以通过 URL 访问，并且可以被搜索引擎索引。

实际上，渐进式 Web 应用只是一个网站的另一种说法，该网站针对移动性能进行了优化，并利用新可用的 Web API 来提供类似于传统原生应用的功能，如推送通知和离线存储。

## Capacitor 和渐进式 Web 应用

Capacitor 对渐进式 Web 应用和原生应用都有一流支持。这意味着 Capacitor 的 bridge 支持在原生环境或 Web 中运行，许多插件在两个环境中都具有完全相同的 API 和调用约定。

这意味着你将 `@capacitor/core` 和 Capacitor 插件作为原生应用和渐进式 Web 应用的依赖项使用，Capacitor 会在需要时无缝调用 Web 代码，在可用时调用原生代码。

此外，Capacitor 提供了许多用于查询当前平台的工具，以便在原生或 Web 上运行时提供定制化的体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用应该有一个 App Manifest 和一个 Service Worker。

### App Manifest

首先，你需要一个 [App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），它位于你的 `index.html` 文件旁边，并提供关于你的应用的元数据，例如名称、主题颜色和图标。例如，当你的应用被安装到主屏幕时，将使用这些信息。

### Service Worker

接下来，为了发送推送通知和离线存储数据，[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 将使你的 Web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

Service Worker 功能强大但复杂。通常，不建议从头开始编写。相反，请查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常见的 Service Worker 方案，你可以轻松地将其整合到你的应用中。

在 MDN 的 [使用 Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 页面上阅读更多关于使用 Service Worker 的信息，包括如何注册它们。

## 渐进式 Web 应用性能

渐进式 Web 应用通过几个性能标准来评判，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有意义的绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前，请遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试你的应用。

如果你在现有的前端技术栈中难以满足渐进式 Web 应用的性能标准，请考虑使用 [Ionic Framework](http://ionicframework.com/) 作为一个选项，以几乎零配置获得快速的 PWA 支持。
