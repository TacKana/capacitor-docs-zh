---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用（Progressive Web Apps，简称 PWA）提供一流的支持，让您可以轻松构建一款应用，使其不仅能在 iOS 和 Android 上原生运行，也能在 Web 上作为移动 Web 应用或“渐进式 Web 应用”运行。

## 什么是渐进式 Web 应用？

简单来说，渐进式 Web 应用（PWA）是一种利用现代 Web 能力为用户提供类似应用体验的 Web 应用。这类应用部署在传统的 Web 服务器上，可以通过 URL 访问，并且能被搜索引擎索引。

实际上，渐进式 Web 应用只是另一个术语，指的是为移动性能优化并利用新的 Web API 提供类似传统原生应用功能（如推送通知和离线存储）的网站。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用**和**原生应用都提供一流的支持。这意味着 Capacitor 的插件桥接层既支持在原生环境中运行，也支持在 Web 环境中运行，许多核心插件在**两种环境**中都可用，并使用完全相同的 API 和调用约定。

这意味着您可以将 `@capacitor/core` 作为依赖项同时用于您的原生应用**和**渐进式 Web 应用，而 Capacitor 会根据需要无缝地调用 Web 代码或在可用时调用原生代码。

此外，Capacitor 还提供了多种实用工具，用于查询当前平台，以便在原生或 Web 环境下运行时提供定制化的体验。

## 为您的应用添加渐进式 Web 应用支持

为任何现有的前端项目添加 PWA 支持都很简单。只需添加一个应用清单文件并配置一个 Service Worker 即可：

### 应用清单

首先，您需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），该文件应放置在您的 `index.html` 文件旁边，并提供有关您应用的元数据，例如名称、主题颜色和图标。这些信息将在您应用安装到主屏幕时使用。

### Service Worker

接下来，为了发送推送通知和离线存储数据，您需要一个 [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)，它将使您的 Web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

Service Worker 功能强大，但也很复杂。通常不建议从零开始编写。相反，您可以查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常见的 Service Worker 方案，您可以轻松地将它们集成到您的应用中。

有关如何使用 Service Worker（包括如何注册 Service Worker）的更多信息，请参阅 MDN 上的 [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 页面。

## 渐进式 Web 应用性能

渐进式 Web 应用会根据多项性能标准进行评估，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前，请遵循[渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您现有的前端技术栈难以满足渐进式 Web 应用的性能标准，可以考虑使用 [Ionic Framework](https://ionicframework.com/) 4 或更高版本，它几乎无需配置即可提供快速的 PWA 支持。Ionic 4.x 或更高版本是一个 Web 组件库，可与多种流行的前端框架配合使用，而不仅仅是 Angular。

## 原生与 Web 环境运行

Capacitor 的关键特性之一是能够构建一款同时能在原生环境（应用商店中）**和** Web 上运行的应用。Capacitor 通过在底层平台与您希望使用的 API/插件之间提供一个抽象层来实现这一点。

如果您的应用调用了没有 Web 替代品的原生插件（例如 `SplashScreen.show()`），应用将允许这些调用而不崩溃。返回 Promise 的调用将返回一个被拒绝的 Promise，而您的应用无论如何都应该处理这种情况。

此外，Capacitor 的 JavaScript API 提供了多种实用工具，让您能够以编程方式检查某些 API 是否可用。

例如，如果您的应用通常依赖相机应用来拍照，您可以检查相机是否可用，如果不可用，则提示用户上传文件：

```typescript
import { Capacitor } from '@capacitor/core';

const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件
} else {
  // 否则，调用相机：
  Camera.getPhoto();
}
```