---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用（PWA）提供了一流的支持，使开发者能够轻松构建既可在 iOS 和 Android 原生运行，也能在 Web 端作为移动应用或"渐进式 Web 应用"使用的跨平台应用。

## 什么是渐进式 Web 应用？

简而言之，渐进式 Web 应用（Progressive Web App，PWA）是一种利用现代 Web 技术为用户提供类原生应用体验的 Web 应用。这类应用部署在传统 Web 服务器上，可通过 URL 访问，并能被搜索引擎收录。

从实际角度看，渐进式 Web 应用本质上是针对移动性能进行优化，并利用新 Web API 实现类似原生应用功能（如推送通知和离线存储）的增强版网站。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用和原生应用提供同等支持。这意味着 Capacitor 的桥接层既能在原生环境中运行，也能在 Web 环境中运行，许多插件在这两种环境下都可用，且保持完全相同的 API 和调用方式。

这样一来，开发者可以同时将 `@capacitor/core` 和 Capacitor 插件作为原生应用和渐进式 Web 应用的依赖项，Capacitor 会根据运行环境自动选择调用 Web 代码或原生代码。

此外，Capacitor 还提供了多种实用工具来检测当前运行平台，从而为原生或 Web 环境提供定制化体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用需要具备应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先需要在 `index.html` 同级目录下创建[应用清单文件](https://developer.mozilla.org/en-US/docs/Web/Manifest)（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），该文件包含应用名称、主题色和图标等元数据。例如当用户将应用添加到主屏幕时，系统就会使用这些信息。

### 服务工作者

要实现推送通知和离线存储功能，需要借助[服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)来代理网络请求，并执行数据处理与同步所需的后台任务。

服务工作者功能强大但实现复杂，通常不建议从头编写。推荐使用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它们提供了可开箱即用的常用服务工作者解决方案。

关于服务工作者的详细使用指南（包括注册方法），请查阅 MDN 的[使用服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)文档。

## 渐进式 Web 应用性能优化

渐进式 Web 应用的性能评估包含多个指标，如[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers/google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

正式发布前请参考[渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 进行质量审查。

如果现有前端技术栈难以满足渐进式 Web 应用的性能要求，推荐考虑采用 [Ionic Framework](http://ionicframework.com/) ，它能以近乎零配置的方式实现高性能 PWA 支持。