---
title: Security
description: Capacitor 应用安全最佳实践
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保应用遵循安全最佳实践。稍有不慎就可能引发重大安全隐患，造成难以估量的损失。

安全涉及领域广泛，但 Capacitor 开发者应重点审计以下几个方面的安全合规性：数据安全、认证/深度链接、网络安全以及 WebView 安全。

## 数据安全

数据安全关注本地存储数据和应用程序代码的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用（以及所有前端应用）最重要的安全准则就是：_绝对不要在应用代码中嵌入密钥_。这意味着确保代码不包含任何机密 API 密钥、加密密钥或其他敏感数据，这些信息很容易通过基础应用分析技术被窃取。尤其要注意可能在构建时将敏感值注入应用代码的环境变量插件。

正确的做法是将需要密钥或令牌的操作转移到服务端处理，在那里它们能得到更好的保护，所有请求都可以通过服务器转发。可以使用无服务器函数或传统的服务端应用流程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（如身份验证令牌或加密密钥），推荐方案是仅将值保留在内存中（即不持久化到磁盘），或使用下文将介绍的安全密钥链/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供强大的安全 API 和专用安全硬件来存储设备上的敏感值。这正是应用在管理高度敏感值（如加密密钥或会话令牌）时能提供生物识别或安全密码验证的原因。

这些功能通过 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API 实现。这些 API 复杂且底层，建议使用相关插件（如社区插件 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级应用，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它基于这些原生安全 API 提供易用的接口和持续更新的体验。Identity Vault 可与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）配合使用，分别为每个场景提供加密密钥或认证令牌管理功能。

## 认证与深度链接

原生应用的认证流程需要格外谨慎，因为认证常通过自定义 URL 方案（Custom URL Schemes）实现。与 Web 域名不同，类似 `instagram://` 的自定义 URL 方案不受全局管控，恶意应用可能通过定义和覆盖自定义 URL 方案来拦截目标应用的请求。想象一下安全令牌被发送到错误应用的场景！

通常，应用绝不应通过自定义 URL 方案的深度链接发送敏感数据（更新的技术如通用链接更安全，它们依赖实际的 Web 域名所有权，详见 [深度链接指南](./deep-links)）。

这对 oAuth2 流程尤为重要，因为认证体验的最后一步依赖于返回应用的深度链接。为防止恶意应用接收令牌，Capacitor 应用中的 oAuth2 必须使用 [PKCE](https://oauth.net/2/pkce/) 机制。

为确保 oAuth2 流程安全，请确认使用的插件支持 PKCE。对于企业级场景，官方 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) 解决方案全面支持 oAuth2 认证流程中的 PKCE。

推荐阅读 [原生应用 oAuth2 最佳实践指南](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 获取更多信息。

## 网络安全

网络安全确保网络请求发往可信端点并加密传输，避免以明文形式发送敏感数据（如密码）。

### SSL

应用应仅向启用 SSL 的端点发起请求。这意味着永远不要使用 `http://` 端点，始终使用 `https://`。这确保数据不会以明文传输。

但仅此还不够。为避免可能的 [中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)，应启用 SSL 证书固定（pinning）策略，只接受已知证书。这需要在客户端和服务端原生实现。目前 [cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http) 插件支持此功能，可能还有其他插件也支持。

## WebView 安全

### 内容安全策略

[内容安全策略（CSP）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（即您的 Capacitor WebView）提供的一组安全特性。CSP 可用于限制用户代理在 WebView 中允许加载的资源类型（如图像、XHR、视频、WebSocket 等）。

通过在 `<head>` 中添加符合 CSP 规范的 `meta` 标签（CSP 可通过相同格式在服务端和客户端配置），可以配置 Capacitor 应用的 CSP。例如，以下配置允许向当前源和 `foo.com` 发起所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个实用资源是 [内容安全策略指南](https://content-security-policy.com/)。

### JavaScript 安全技巧

由于 Capacitor 应用本质上是使用 JavaScript 的 Web 应用，常规 JS 安全技巧同样适用。

JS 安全已超出本文范围，关于 JS 和 Web 应用安全已有大量优质资源。推荐从 [这篇指南](https://wpengine.com/resources/javascript-security/) 开始学习。