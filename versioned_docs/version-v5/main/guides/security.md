---
title: 安全
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 的安全最佳实践

每位 Capacitor 开发者都有责任确保他们的应用遵循安全最佳实践。如果不加以注意，可能会出现重大安全问题，这可能造成极大的损害和损失。

安全是一个广泛的主题，但 Capacitor 开发者应审核多个方面的安全性，包括数据安全、认证/深层链接安全、网络安全和 WebView 安全。

> Ionic 为 Capacitor 应用提供了一个开箱即用的安全套件，包括认证、生物识别和加密。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的数据的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用以及任何前端应用来说，最重要的安全提示之一是_永远不要在应用代码中嵌入密钥_。这意味着确保您的代码永远不包含秘密的 API 密钥、加密密钥或任何其他可能通过基本应用分析技术轻易窃取的敏感数据。注意那些可能在构建时将敏感值注入应用代码的环境变量插件。

相反，将需要密钥或令牌的大多数操作移到服务器端，在那里它们可以得到保护，并且任何请求都可以从服务器转发。这可能是一个无服务器函数或传统的服务器端应用进程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（如认证令牌或加密密钥），推荐的选项是仅在内存中处理该值（即，永远不将其持久化到磁盘），或使用下文详述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用安全硬件，用于在设备上存储敏感值。这就是应用在管理加密密钥或会话令牌等高度敏感值的同时，提供生物识别或安全密码认证的方式。

提供此功能的 API 可在 [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 [Android Keystore](https://developer.android.com/training/articles/keystore) API 中获得。这些 API 复杂且低级，因此您可能希望找到一个为您使用它们的插件（例如这个 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业用例，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在这些原生安全 API 之上提供了易于使用的 API 和频繁更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）一起使用，分别提供每个体验的加密密钥或认证令牌管理组件。

## 认证和深层链接

原生应用中的认证流程需要额外注意，因为认证通常通过使用自定义 URL Scheme 进行。自定义 URL Scheme（如 `instagram://`）不像 Web 域名那样受到全局控制，因此恶意应用可能通过定义和覆盖自定义 URL Scheme 来拦截本应发送给另一个应用的请求。想象一下安全令牌被发送到错误的应用！

通常，应用不应通过自定义 URL Scheme 深层链接发送敏感数据（较新的技术如 Universal Links 更安全，因为它们依赖于实际的 Web 域名所有权，详情请参阅[深层链接](./deep-links)指南）。

这对于 oAuth2 流程尤其重要，其中认证体验的最后一步依赖于回连到应用的深层链接。为了减轻恶意应用接收令牌的可能性，在 Capacitor 应用中必须使用 [PKCE](https://oauth.net/2/pkce/) 进行 oAuth2。

为确保您的 oAuth2 流程安全，请确保您的插件支持 PKCE。对于企业用例，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 oAuth2 认证流程的 PKCE。

有关更多信息，请参阅这个优秀的[原生应用的 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)指南。

## 网络安全

网络安全涉及确保网络请求发送到可信端点并加密，以避免以明文形式发送敏感数据（如密码）。

### SSL

应用应仅向支持 SSL 的端点发出请求。这意味着永远不要向 `http://` 的端点发出请求，而是始终使用 `https://`。这确保数据永远不会以明文形式发送。

## WebView 安全

### 内容安全策略

[内容安全策略（CSP）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是一组在浏览器（以及您的 Capacitor WebView）中可用的安全功能。CSP 可用于限制用户代理允许在 WebView 中加载的资源（如图像、XHR、视频、Web Socket 等）。

CSP 可以通过在 `<head>` 中添加带有可接受 CSP 格式的 `meta` 标签来在 Capacitor 应用中配置（CSP 可以使用相同的格式在服务器端和客户端配置）。例如，此配置将允许对当前源和 `foo.com` 的所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置，[CSP 参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是必读材料。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是使用 JavaScript 的 Web 应用，因此典型的 JS 安全技术也适用。

JS 安全超出了本文档的范围，并且已有许多关于正确 JS 和 Web 应用安全技术的资源。这里有一个[好的资源](https://wpengine.com/resources/javascript-security/)可以帮助您入门。
