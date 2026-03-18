---
title: 安全
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保其应用遵循安全最佳实践。如果没有妥善处理，可能会产生重大的安全问题，造成极大的损害和损失。

安全是一个广泛的领域，但 Capacitor 开发者应重点审核几个方面的安全合规性，包括数据安全、身份验证/深度链接、网络安全和 Web View 安全。

> Ionic 为 Capacitor 应用提供了一套开箱即用的安全解决方案，包含身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储数据以及应用代码中数据的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用以及任何前端应用来说，最重要的安全建议之一是**切勿在应用代码中嵌入密钥**。这意味着要确保代码不包含秘密 API 密钥、加密密钥或任何其他可能通过基本应用分析技术轻易窃取的敏感数据。要注意那些可能在构建时将敏感值注入应用代码的环境变量插件。

相反，应将大多数需要密钥或令牌的操作移至服务器端，在那里可以保护它们，并且任何请求都可以从服务器转发。这可以是一个无服务器函数或传统的服务器端应用进程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（例如身份验证令牌或加密密钥），推荐的做法是仅在内存中处理这些值（即永不持久化到磁盘），或使用下文详述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用安全硬件，用于在设备上存储敏感值。这是应用在管理高度敏感值（如加密密钥或会话令牌）时提供生物识别或安全密码验证的方式。

提供此功能的 API 包括 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API。这些 API 复杂且底层，因此您可能需要寻找使用它们的插件（例如这个 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业用例，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，在这些原生安全 API 之上提供了一个易于使用的 API 和频繁更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）结合使用，分别为每个体验提供加密密钥或身份验证令牌管理组件。

## 身份验证和深度链接

原生应用中的身份验证流程需要格外小心，因为身份验证通常通过使用自定义 URL 方案（Custom URL Schemes）进行。自定义 URL 方案（如 `instagram://`）不像 Web 域名那样受全局控制，因此恶意应用可能通过定义和覆盖自定义 URL 方案来拦截原本发送给其他应用的请求。想象一下，一个安全令牌被发送到了错误的应用程序中！

一般来说，应用不应通过自定义 URL 方案的深度链接发送敏感数据（较新的技术如通用链接（Universal Links）更安全，因为它们依赖于实际的 Web 域名所有权，详情参见 [深度链接](./deep-links) 指南）。

这对于 OAuth2 流程尤其重要，其中身份验证体验的最后一步依赖于返回应用的深度链接。为了降低恶意应用接收令牌的可能性，Capacitor 应用中的 OAuth2**必须**使用 [PKCE](https://oauth.net/2/pkce/)。

为确保 OAuth2 流程安全，请确保您的插件支持 PKCE。对于企业用例，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 OAuth2 身份验证流程的 PKCE。

更多信息请参阅这篇优秀的 [原生应用 OAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 指南。

## 网络安全

网络安全涉及确保网络请求发送到可信端点并进行加密，以避免以纯文本形式发送敏感数据（如密码）。

### SSL

应用应仅向启用了 SSL 的端点发送请求。这意味着永远不要向使用 `http://` 的端点发送请求，而应始终使用 `https://`。这样可以确保数据永远不会以纯文本形式发送。

然而，仅此一项还不够。为了避免可能的[中间人攻击](https://en.wikipedia.org/wiki/wiki/Man-in-the-middle_attack)，应固定 SSL 证书，以便只接受已知的证书。这必须在原生层面、客户端和服务器端都实施。目前，[cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http) 插件支持此功能，可能还有其他插件也支持。

## Web View 安全

### 内容安全策略（CSP）

[内容安全策略（CSP）](https://developer.mozilla.org/en-US/docs/v3/Web/HTTP/CSP) 是浏览器（以及您的 Capacitor Web View）中可用的一组安全功能。CSP 可用于限制用户代理在 Web View 中允许加载的资源（例如图像、XHR、视频、Web Socket 等）。

可以在 Capacitor 应用中通过向 `<head>` 添加带有可接受 CSP 格式的 `meta` 标签来配置 CSP（CSP 可以使用相同的格式在服务器端和客户端配置）。例如，此配置将允许所有对当前源和 `foo.com` 的请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置，[CSP 参考](https://developer.mozilla.org/en-US/docs/v3/Web/HTTP/CSP) 是必读资料。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用主要是使用 JavaScript 的 Web 应用，因此典型的 JavaScript 安全技术同样适用。

JavaScript 安全超出了本文档的范围，关于正确的 JavaScript 和 Web 应用安全技术已有许多现有资源。这里有一篇[不错的入门指南](https://wpengine.com/resources/javascript-security/)供您参考。