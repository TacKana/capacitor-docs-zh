---
title: Security
description: Capacitor 应用安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保应用遵循安全最佳实践。稍有不慎，就可能出现严重的安全漏洞，造成难以估量的损失。

安全涉及面广泛，但 Capacitor 开发者应着重关注以下几个方面的安全合规：数据安全、认证/深度链接、网络安全以及 Web 视图安全。

> Ionic 为 Capacitor 应用提供开箱即用的安全套件，包含身份认证、生物识别和加密功能。[了解更多](https://ionic.io/secure)

## 数据安全

数据安全涉及本地存储数据与应用代码的安全防护。

### 避免在代码中嵌入敏感信息

对 Capacitor 应用（以及任何前端应用）最重要的安全准则就是：_永远不要在应用代码中嵌入敏感信息_。这意味着确保代码不包含任何秘密 API 密钥、加密密钥或其他敏感数据，这些信息可能通过简单的应用分析技术被窃取。同时需警惕那些可能在构建时将敏感值注入应用代码的环境变量插件。

正确的做法是将涉及密钥或令牌的操作转移到服务端执行，在那里可以更好地保护这些敏感信息，并通过服务端转发请求。这可以是无服务器函数或传统的服务端应用流程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（如认证令牌或加密密钥），推荐做法是仅在内存中处理这些值（即不持久化到磁盘），或使用下文所述的密钥链/密钥库安全技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供强大的安全 API 和专用安全硬件来存储设备上的敏感值。这正是应用在管理加密密钥或会话令牌等高度敏感信息时，能够提供生物识别或安全密码认证的原理。

相关功能通过 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API 实现。这些 API 较为复杂且底层，建议使用相关插件（如社区开发的 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级需求，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在原生安全 API 基础上提供了易用的 API 和持续更新的体验。Identity Vault 可与其他 Capacitor 企业产品如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) 配合使用，分别提供加密密钥管理和认证令牌管理功能。

## 认证与深度链接

原生应用的认证流程需要特别谨慎，因为认证通常通过自定义 URL 方案实现。与受全局控制的网络域名不同，自定义 URL 方案（如 `instagram://`）可能被恶意应用通过定义相同方案进行拦截，想象一下安全令牌被发送到错误应用的场景！

一般来说，应用绝不应通过自定义 URL 方案的深度链接发送敏感数据（较新的技术如通用链接更安全，因为它们依赖于实际的网络域名所有权，详见 [深度链接](./deep-links) 指南）。

这对 oAuth2 流程尤为重要，因为认证的最后一步依赖返回应用的深度链接。为防止恶意应用获取令牌，Capacitor 应用必须使用 [PKCE](https://oauth.net/2/pkce/) 机制。

为确保 oAuth2 流程安全，请确认使用的插件支持 PKCE。对于企业级需求，官方 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) 解决方案全面支持 oAuth2 认证流程中的 PKCE。

更多信息可参考这篇优秀指南：[原生应用的 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)。

## 网络安全

网络安全确保网络请求指向可信终端并加密传输，避免以明文发送敏感数据（如密码）。

### SSL

应用应只向启用 SSL 的终端发起请求。这意味着永远不使用 `http://` 端点，始终使用 `https://`，确保数据不以明文传输。

## Web 视图安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（及 Capacitor Web 视图）提供的一组安全特性。CSP 可用于限制 Web 视图加载的资源类型（如图片、XHR、视频、Web Socket 等）。

在 Capacitor 应用中，可通过在 `<head>` 添加带有合规 CSP 格式的 `meta` 标签来配置 CSP（CSP 可在服务端和客户端使用相同格式配置）。例如，以下配置允许向当前源和 `foo.com` 发起请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个实用资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用本质上是使用 JavaScript 的 Web 应用，常规的 JS 安全技术同样适用。

JS 安全超出了本文范围，已有大量关于 JS 和 Web 应用安全技术的资源。[这里有一个不错的起点](https://wpengine.com/resources/javascript-security/)。