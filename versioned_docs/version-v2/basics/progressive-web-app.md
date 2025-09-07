---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
---

# 构建渐进式 Web 应用

Capacitor 为渐进式 Web 应用（PWA）提供了一流的支持，让您能轻松构建既可在 iOS 和 Android 上原生运行，也能在 Web 上作为移动网页应用或"渐进式 Web 应用"运行的跨平台应用。

## 什么是渐进式 Web 应用？

简而言之，渐进式 Web 应用（PWA）是利用现代 Web 技术为用户提供类应用体验的网页应用。这些应用部署在传统 Web 服务器上，可通过 URL 访问，并能被搜索引擎索引。

实际上，渐进式 Web 应用本质上就是对移动性能进行优化，并通过新兴 Web API 实现类似原生应用功能（如推送通知和离线存储）的网站。

## Capacitor 与渐进式 Web 应用

Capacitor 对渐进式 Web 应用和原生应用都提供原生级支持。这意味着 Capacitor 的插件桥接系统可以在原生环境或 Web 环境中运行，许多核心插件在这两种环境下都可用，且保持完全相同的 API 和调用方式。

因此，您可以在原生应用和渐进式 Web 应用中统一使用 `@capacitor/core` 作为依赖，Capacitor 会根据运行环境自动切换调用 Web 代码或原生代码。

此外，Capacitor 还提供多种工具用于检测当前运行平台，让您能够为原生或 Web 环境定制不同的用户体验。

## 为应用添加渐进式 Web 应用支持

为现有前端项目添加 PWA 支持非常简单，只需添加应用清单文件并配置 Service Worker：

### 应用清单

首先需要创建 [应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest) 文件 ([manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json))，该文件需与 `index.html` 放在同一目录下，用于提供应用元数据，如名称、主题色和图标等。这些信息将在用户将应用添加到主屏幕时使用。

### Service Worker

其次，为了实现推送通知和离线数据存储功能，需要借助 [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) 来代理网络请求并执行数据处理和同步所需的后台任务。

Service Worker 功能强大但实现复杂。通常不建议从零开始编写，可以选用 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具，它提供了现成的 Service Worker 解决方案，能快速集成到您的应用中。

更多关于 Service Worker 的使用方法（包括如何注册）请参考 MDN 的 [使用 Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 文档。

## 渐进式 Web 应用性能优化

渐进式 Web 应用的性能评估标准包括 [可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) 和 [首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) 等关键指标。

上线前请对照 [渐进式 Web 应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist) 进行优化，并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 工具进行性能测试。

如果现有前端技术栈难以满足 PWA 的性能要求，可以考虑使用 [Ionic Framework](https://ionicframework.com/) 4.0 及以上版本，它能以近乎零配置的方式提供高性能 PWA 支持。Ionic 4.x 及以上版本是基于 Web Components 的 UI 库，可适配多种主流前端框架，不仅限于 Angular。

## 跨平台运行方案

Capacitor 的核心特性之一是能够构建同时支持原生应用商店和 Web 平台的统一应用。这是通过在底层平台与 API/插件之间提供抽象层实现的。

当应用调用没有 Web 替代方案的原生插件（如 `SplashScreen.show()`）时，Capacitor 会允许这些调用而不会导致崩溃。返回 Promise 的调用将返回拒绝状态的 Promise，这些错误状态本应在应用中妥善处理。

此外，Capacitor 的 JavaScript API 还提供多种实用工具，可用于以编程方式检测特定 API 的可用性。

例如，如果应用通常依赖相机插件拍照，您可以先检测相机是否可用，若不可用则提示用户上传文件：

```typescript
import { Capacitor } from '@capacitor/core';

const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改为上传文件
} else {
  // 否则直接调用：
  Camera.getPhoto();
}
```