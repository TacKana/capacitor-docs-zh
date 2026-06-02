---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
---

# 构建渐进式 Web 应用

Capacitor 对 Progressive Web Apps（渐进式 Web 应用）提供了一流支持，使您可以轻松构建一个在 iOS 和 Android 上原生运行，同时在 Web 上作为移动 Web 应用或"Progressive Web App"运行的应用。

## 什么是渐进式 Web 应用？

简单来说，Progressive Web App (PWA) 是一种使用现代 Web 能力为用户提供类似应用体验的 Web 应用。这些应用部署在传统 Web 服务器上，可通过 URL 访问，并且可以被搜索引擎索引。

实际上，Progressive Web App 只是一个经过移动性能优化、并利用新可用 Web API 提供类似传统原生应用功能（如推送通知和离线存储）的网站。

## Capacitor 和渐进式 Web 应用

Capacitor 对 Progressive Web Apps _和_ 原生应用都提供了一流支持。这意味着 Capacitor 的插件桥支持在原生环境中或在 Web 中运行，许多核心插件在 _两种环境中_ 都可用，并且具有完全相同的 API 和调用约定。

这意味着您可以将 `@capacitor/core` 作为您的原生应用 _和_ Progressive Web App 的依赖项，Capacitor 会在需要时无缝调用 web 代码，并在可用时调用原生代码。

此外，Capacitor 还提供了许多实用工具来查询当前平台，以在原生运行或 Web 运行时提供定制化体验。

## 为您的应用添加渐进式 Web 应用支持

为任何现有前端项目添加 PWA 支持都很简单。只需添加一个 App Manifest 文件并配置一个 service worker：

### App Manifest

首先，您需要一个 [App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），该文件应与您的 `index.html` 文件放在一起，并提供关于您应用的元数据，例如应用名称、主题颜色和图标。例如，当您的应用被安装到主屏幕时，这些信息将被使用。

### Service Worker

接下来，为了发送推送通知和离线存储数据，[Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 将使您的 web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

Service Workers 功能强大但复杂。通常，不建议从头开始编写。相反，请查看像 [Workbox](https://developers.google.com/web/tools/workbox/) 这样的工具，它们提供了常见的 Service Worker 方案，您可以轻松地将其整合到您的应用中。

在 MDN 的 [使用 Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 页面上阅读更多关于使用 Service Workers 的信息，包括如何注册它们。

## 渐进式 Web 应用性能

Progressive Web Apps 通过几个性能标准来评判，包括 [Time to Interactive（可交互时间）](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [First Meaningful Paint（首次有意义绘制）](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前，请遵循 [Progressive Web App 清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 来审计和测试您的应用。

如果您在满足 Progressive Web App 性能标准方面遇到困难，可以查看 [Ionic Framework](https://ionicframework.com/) 4 或更高版本，它几乎无需配置即可快速获得 PWA 支持。Ionic 4.x 及以上版本是一个 Web 组件库，可以在多个流行的前端框架中使用，而不仅仅是 Angular。

## 原生运行和 Web 运行

Capacitor 的关键特性之一是能够构建一个既能在原生环境（应用商店）运行，又能在 Web 上运行的应用。Capacitor 通过在底层平台和您要使用的 API/Plugin 之间提供一个层来实现这一点。

如果您的应用发出没有 Web 替代方案的原生插件调用（例如 `SplashScreen.show()`），应用将允许这些调用而不会崩溃。返回 promise 的调用将返回一个被拒绝的 promise，无论如何您都应该在应用中处理这种情况。

此外，Capacitor 的 JavaScript API 提供了许多实用工具，使您能够以编程方式检查某些 API 是否可用。

例如，如果您的应用通常依赖于使用相机应用拍照，您可以检查相机是否可用，如果不可用，则要求用户上传文件：

```typescript
import { Capacitor } from '@capacitor/core';

const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件
} else {
  // 否则，进行调用：
  Camera.getPhoto();
}
```