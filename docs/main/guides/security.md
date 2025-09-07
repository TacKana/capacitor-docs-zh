---
title: Security
description: Capacitor 应用安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都应当确保自己的应用遵循安全最佳实践。稍有不慎，就可能出现造成重大损失的高危安全问题。

安全是个宽泛的话题，但 Capacitor 开发者需要重点审计以下几个方面的安全性：数据安全、身份验证/深度链接、网络安全以及 Web 视图安全。

> Ionic 为 Capacitor 应用提供开箱即用的安全套件，包含身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)

## 数据安全

数据安全涉及本地存储数据及应用代码的安全性。

### 避免在代码中嵌入密钥

对 Capacitor 应用（以及任何前端应用）最重要的安全建议是：绝不要在应用代码中嵌入密钥。这意味着确保代码绝不包含 API 密钥、加密密钥或其他可能被简单逆向工程窃取的敏感数据。尤其要警惕那些可能将敏感值注入应用代码的环境变量插件。

正确的做法是将需要密钥或令牌的操作移至服务端执行，在那里可以保护这些敏感数据并通过服务端转发请求。这可以是无服务器函数或传统服务端应用。

对于必须在客户端处理敏感密钥或令牌的应用（如认证令牌或加密密钥），建议方案是仅将其保留在内存中（即不持久化到磁盘），或使用下文将介绍的安全密钥链/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用安全硬件来存储设备上的敏感值。这正是应用在管理加密密钥或会话令牌等高度敏感数据时，仍能提供生物识别或安全密码认证的技术基础。

相关功能通过 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API 实现。这些 API 较为复杂且底层，建议使用相关插件（如 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业级需求，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在原生安全 API 基础上提供了简单易用的接口和持续更新的体验。Identity Vault 可与其他 Capacitor 企业产品如 [离线存储](https://ionicframework.com/enterprise/offline-storage) 和 [认证连接](https://ionicframework.com/enterprise/auth-connect) 配合使用，为各场景提供加密密钥或认证令牌管理方案。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外注意，因为认证常通过自定义 URL 方案（Custom URL Schemes）实现。与网络域名不同，类似 `instagram://` 的自定义 URL 方案没有全局管控机制，恶意应用可能通过定义相同 scheme 来劫持请求。想象一下安全令牌被发送到错误应用的后果！

基本原则是：应用绝不应通过自定义 URL 方案的深度链接传输敏感数据（更新技术如通用链接 Universal Links 更安全，因其依赖实际网络域名所有权，详见 [深度链接](./deep-links) 指南）。

这对 oAuth2 流程尤为重要——认证最后一步通常依赖深度链接返回应用。为防止恶意应用获取令牌，Capacitor 应用中的 oAuth2 必须使用 [PKCE](https://oauth.net/2/pkce/) 标准。

为确保 oAuth2 流程安全，请确认所用插件支持 PKCE。企业级方案中，官方 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) 全面支持 oAuth2 认证流程的 PKCE 标准。

更多信息请参考这篇优秀的 [原生应用 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 指南。

## 网络安全

网络安全确保网络请求发往可信端点且经过加密，避免以明文传输密码等敏感数据。

### SSL

应用应只向启用 SSL 的端点发起请求。这意味着永远不使用 `http://`，始终使用 `https://` 协议，确保数据不以明文传输。

## Web 视图安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（也就是你的 Capacitor Web 视图）提供的一组安全特性。CSP 可用于限制 Web 视图加载的资源类型（如图像、XHR、视频、Web Socket 等）。

在 Capacitor 应用中，可通过在 `<head>` 添加 `meta` 标签来配置 CSP（CSP 可采用相同格式在服务端和客户端配置）。例如以下配置允许向当前源和 `foo.com` 发起请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个实用资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用主体是基于 JavaScript 的 web 应用，常规 JS 安全技术同样适用。

JS 安全超出本文范围，已有大量关于 JS 和 web 应用安全技术的资源。[这篇指南](https://wpengine.com/resources/javascript-security/) 是不错的入门选择。