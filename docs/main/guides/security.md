---
title: 安全性
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保自己的应用遵循安全最佳实践。如果不加以注意，可能会产生严重的安全问题，造成巨大的损害和损失。

安全性是一个广泛的议题，但 Capacitor 开发者应审计若干方面的安全合规性，包括数据安全、认证/深度链接、网络安全和 Web View 安全。

> Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包括认证、生物识别和加密功能。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的数据安全。

### 避免在代码中嵌入机密信息

对于 Capacitor 应用以及任何前端应用而言，最重要的安全建议之一就是**永远不要**在应用代码中嵌入机密信息。这意味着确保你的代码绝不包含机密 API 密钥、加密密钥或任何其他可通过基本应用分析技术轻易窃取的敏感数据。注意那些可能在构建时将敏感值注入应用代码的环境变量插件。

相反，应将大多数需要密钥或令牌的操作移至服务端，在那里它们可以得到保护，并且所有请求都可以从服务器转发。这可以是 serverless 函数或传统的服务端应用进程。

对于必须在客户端处理持久化敏感密钥或令牌（例如认证令牌或加密密钥）的应用，建议的选项是仅在内存中处理该值（即从不将其持久化到磁盘），或使用下面详述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。这就是应用在管理加密密钥或会话令牌等高度敏感值的同时，提供生物识别或安全密码认证的方式。

提供此功能的 API 可在 [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 [Android Keystore](https://developer.android.com/training/articles/keystore) API 中找到。这些 API 复杂且底层，因此你可能希望找到一个为你封装使用它们的插件（例如这个社区插件 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级用例，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在这些原生安全 API 之上提供了易于使用的 API 和频繁更新的体验。Identity Vault 可以与其他 Capacitor 企业级产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）一起使用，分别提供加密密钥或认证令牌管理组件。

## 认证和深度链接

原生应用中的认证流程需要格外小心，因为认证通常通过使用自定义 URL Scheme 进行。自定义 URL Scheme（例如 `instagram://`）不像 Web 域名那样受到全局控制，因此恶意应用有可能通过定义和覆盖自定义 URL Scheme 来拦截本应发送给另一个应用的请求。试想一下，一个安全令牌被发送到了错误的应用！

一般来说，应用不应通过自定义 URL Scheme 深度链接发送敏感数据（较新的技术如 Universal Links 更安全，因为它们依赖于实际的 Web 域名所有权，详见[深度链接](./deep-links)指南）。

这对于 oAuth2 流程尤其重要，其中认证体验的最后一步依赖于回到应用的深度链接。为了减轻恶意应用接收令牌的可能性，在 Capacitor 应用中必须使用 [PKCE](https://oauth.net/2/pkce/) 进行 oAuth2。

为确保你的 oAuth2 流程安全，请确保你的插件支持 PKCE。对于企业级用例，官方 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 oAuth2 认证流程的 PKCE。

更多信息请参阅这份优秀的 [oAuth2 原生应用最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)指南。

## 网络安全

网络安全涉及确保网络请求发往受信任的端点并经过加密，以避免以明文形式发送敏感数据（如密码）。

### SSL

应用应仅向启用了 SSL 的端点发起请求。这意味着永远不要向 `http://` 的端点发起请求，而应始终使用 `https://`。这确保数据绝不会以明文形式发送。

## Web View 安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（以及你的 Capacitor Web View）中可用的一组安全功能。CSP 可用于限制用户代理允许在 Web View 中加载的资源（如图片、XHR、视频、Web Socket 等）。

CSP 可以在你的 Capacitor 应用中通过添加一个包含可接受 CSP 格式的 `meta` 标签到 `<head>` 中来配置（CSP 可以在服务端和客户端使用相同的格式进行配置）。例如，以下配置将允许所有对当前源和 `foo.com` 的请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是必读资料。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是一个使用 JavaScript 的 Web 应用，因此典型的 JS 安全技术同样适用。

JS 安全超出了本文档的范围，并且已有很多关于 JS 和 Web 应用安全技术的现有资源。这里有一个[不错的入门资源](https://wpengine.com/resources/javascript-security/)供你参考。
