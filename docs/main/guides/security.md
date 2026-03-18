---
title: 安全
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保自己的应用遵循安全最佳实践。如果处理不当，可能会出现严重的安全问题，造成极大的损害和高昂的代价。

安全是一个广泛的领域，但 Capacitor 开发者应重点审查以下几个方面的安全合规性：数据安全、身份验证/深度链接、网络安全以及 Web View 安全。

> Ionic 为 Capacitor 应用提供了一套开箱即用的安全解决方案，涵盖身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及应用本地存储的数据以及应用代码中数据的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用乃至任何前端应用，最重要的安全建议之一是**切勿将密钥嵌入应用代码中**。这意味着要确保代码中不包含秘密 API 密钥、加密密钥或其他任何敏感数据，这些信息很容易通过基本的应用分析技术被窃取。同时要警惕那些可能在构建时将敏感值注入应用代码的环境变量插件。

正确的做法是将大多数需要使用密钥或令牌的操作转移到服务器端，在那里可以保护这些敏感信息，并且所有请求都可以通过服务器转发。这可以是一个无服务器函数，也可以是传统的服务器端应用进程。

对于那些必须在客户端持久化存储敏感密钥或令牌的应用（例如身份验证令牌或加密密钥），推荐的做法是仅在内存中处理这些值（即永不将其持久化到磁盘），或者使用下文所述的密钥链/密钥库安全技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。这正是应用在管理高度敏感值（如加密密钥或会话令牌）时，能够提供生物识别或安全密码验证的方式。

提供此功能的 API 包括 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API。这些 API 复杂且底层，因此您可能需要寻找一个使用它们的插件（例如这个 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业级使用场景，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它基于这些原生安全 API 提供了易于使用的接口和持续更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）结合使用，分别为每个功能提供加密密钥或身份验证令牌的管理组件。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外注意，因为身份验证通常通过自定义 URL 方案（Custom URL Schemes）来实现。自定义 URL 方案（如 `instagram://`）不像 Web 域名那样受到全局控制，因此恶意应用有可能通过定义并覆盖一个自定义 URL 方案来拦截原本发送给另一个应用的请求。想象一下，一个安全令牌被发送到了错误的应用程序！

一般来说，应用永远不应该通过自定义 URL 方案的深度链接发送敏感数据（较新的技术如通用链接 Universal Links 更安全，因为它们依赖于实际的 Web 域名所有权，详情请参阅 [深度链接](./deep-links) 指南）。

这对于 OAuth2 流程尤为重要，因为身份验证体验的最后一步依赖于返回应用的深度链接。为了降低恶意应用接收令牌的可能性，Capacitor 应用中的 OAuth2**必须**使用 [PKCE](https://oauth.net/2/pkce/)。

为确保您的 OAuth2 流程安全，请确认您使用的插件支持 PKCE。对于企业级使用场景，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案为 OAuth2 身份验证流程提供完整的 PKCE 支持。

更多信息请参阅这篇优秀的指南：[原生应用 OAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)。

## 网络安全

网络安全涉及确保网络请求发送到可信的端点，并进行加密，以避免以明文形式发送敏感数据（如密码）。

### SSL

应用应仅向启用了 SSL 的端点发送请求。这意味着永远不要向带有 `http://` 的端点发送请求，而应始终使用 `https://`。这能确保数据永远不会以明文形式发送。

## Web View 安全

### 内容安全策略

[内容安全策略（CSP）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（因此也是您的 Capacitor Web View）中可用的一组安全功能。CSP 可用于限制用户代理在 Web View 中允许加载的资源（如图像、XHR、视频、Web Socket 等）。

您可以通过在 `<head>` 中添加一个 `meta` 标签来为 Capacitor 应用配置 CSP（CSP 可以使用相同的格式在服务器端和客户端进行配置）。例如，以下配置将允许向当前源和 `foo.com` 发送所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是基于 JavaScript 的 Web 应用，因此通常的 JS 安全技术同样适用。

JS 安全超出了本文档的范围，而且已有许多关于正确 JS 和 Web 应用安全技术的现有资源。[这里有一个不错的起点](https://wpengine.com/resources/javascript-security/)。