---
title: Security
description: Capacitor 应用安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保应用遵循安全最佳实践。稍有不慎就可能引发严重的安全问题，造成难以弥补的损失。

安全是个广泛的话题，但 Capacitor 开发者应当特别关注以下几个方面的安全合规性：数据安全、身份验证/深度链接、网络安全以及 WebView 安全。

> Ionic 为 Capacitor 应用提供开箱即用的安全套件，包含身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)

## 数据安全

数据安全关注本地存储数据和应用程序代码的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用（实际上适用于所有前端应用），最重要的安全建议就是_永远不要在代码中嵌入密钥_。这意味着确保代码不包含任何秘密 API 密钥、加密密钥或其他敏感数据，这些信息很容易通过基本的应用分析技术被盗取。同时要注意那些可能在构建时将敏感值注入应用代码的环境变量插件。

正确的做法是将需要密钥或令牌的大多数操作移至服务端，在那里它们可以得到保护，并通过服务器转发请求。这可以是一个无服务器函数或传统的服务端应用流程。

对于那些必须在客户端处理持久化敏感密钥或令牌的应用（例如授权令牌或加密密钥），建议的方案是仅在内存中处理这些值（即不持久化到磁盘），或者使用下文详述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用安全硬件来存储设备上的敏感值。这正是应用能够在使用生物识别或安全密码认证的同时管理高度敏感值（如加密密钥或会话令牌）的原理。

这类功能通过 [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 [Android Keystore](https://developer.android.com/training/articles/keystore) API 提供。由于这些 API 复杂且底层，建议使用封装了这些功能的插件（例如这个社区插件 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级用例，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在原生安全 API 之上提供了易用的 API 和持续更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）配合使用，分别为每个场景提供加密密钥或认证令牌管理组件。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外谨慎，因为认证通常通过自定义 URL Scheme 实现。像 `instagram://` 这样的自定义 URL Scheme 不像网页域名那样有全局控制机制，恶意应用可能通过定义和覆盖自定义 URL Scheme 来拦截原本发往其他应用的请求。想象一下安全令牌被发送到错误应用的情况！

一般来说，应用绝不应通过自定义 URL Scheme 深度链接发送敏感数据（更新颖的技术如 Universal Links 更安全，因为它们依赖于实际的网页域名所有权，详情见 [深度链接](./deep-links) 指南）。

这对 oAuth2 流程尤为重要，认证过程的最后一步依赖应用的回调深度链接。为防止恶意应用获取令牌，Capacitor 应用中必须使用 [PKCE](https://oauth.net/2/pkce/) 进行 oAuth2 认证。

为确保 oAuth2 流程安全，请确认您使用的插件支持 PKCE。对于企业级用例，官方 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案全面支持 oAuth2 认证流程中的 PKCE。

更多信息可参考这篇优秀的 [原生应用 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 指南。

## 网络安全

网络安全确保网络请求发往可信端点并通过加密避免明文传输敏感数据（如密码）。

### SSL

应用应仅向启用 SSL 的端点发起请求。这意味着永远不要使用 `http://` 端点，而应始终使用 `https://`，以确保数据不会以明文传输。

## WebView 安全

### 内容安全策略

[内容安全策略（CSP）](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（也就是您的 Capacitor WebView）提供的一组安全特性。CSP 可用于限制 WebView 中允许加载的资源类型（如图像、XHR、视频、Web Sockets 等）。

通过在 `<head>` 中添加符合 CSP 格式的 `meta` 标签（CSP 可采用相同格式在服务端和客户端配置），即可为 Capacitor 应用配置 CSP。例如，以下配置允许向当前源和 `foo.com` 发起所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个实用资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用主要是使用 JavaScript 的 Web 应用，常规的 JS 安全技术同样适用。

JS 安全超出了本文范围，现有许多关于正确 JS 和 Web 应用安全技术的资源。[这篇指南](https://wpengine.com/resources/javascript-security/) 是个不错的入门选择。