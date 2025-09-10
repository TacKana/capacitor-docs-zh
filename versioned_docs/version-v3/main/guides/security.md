---
title: Security
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保应用遵循安全最佳实践。稍有疏忽就可能引发重大安全问题，造成难以估量的损失。

安全涉及面很广，但 Capacitor 开发者应重点审计以下几个方面的安全合规性：数据安全、身份验证/深度链接、网络安全以及 WebView 安全。

> Ionic 为 Capacitor 应用提供开箱即用的安全套件，包含身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全关注本地存储数据和应用程序代码的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用（以及任何前端应用）最重要的安全建议是：切勿在代码中嵌入密钥。这意味着确保代码不包含任何敏感数据，如 API 密钥、加密密钥等，这些都可能通过基本应用分析技术被窃取。尤其要注意那些可能在构建时将敏感值注入应用代码的环境变量插件。

建议将需要密钥或令牌的操作转移到服务端执行，在那里可以更好地保护这些敏感数据，并通过服务端转发请求。这可以是无服务器函数，也可以是传统的服务端应用流程。

对于必须在客户端处理敏感密钥或令牌的应用（如认证令牌或加密密钥），建议方案是仅将这些值保留在内存中（即不持久化到磁盘），或使用下文提到的安全钥匙串/密钥库技术。

### 存储加密密钥和会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用安全硬件来存储设备上的敏感值。这正是应用在管理高度敏感数据（如加密密钥或会话令牌）时，能提供生物识别或安全密码认证的技术基础。

iOS 的 [Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 Android 的 [Keystore](https://developer.android.com/training/articles/keystore) API 提供了这些功能。这些 API 较为复杂且底层，因此你可能需要使用相关插件（例如这个社区开发的 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级应用，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在原生安全 API 基础上提供了简单易用的接口和持续更新的体验。Identity Vault 可与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）配合使用，分别提供加密密钥和认证令牌管理功能。

## 身份验证与深度链接

原生应用中的身份验证流程需要特别谨慎，因为认证通常通过自定义 URL Scheme 进行。像 `instagram://` 这样的自定义 URL Scheme 不像网页域名那样受全局管控，恶意应用可能通过定义并覆盖自定义 URL Scheme 来拦截原本发往其他应用的请求。想象一下安全令牌被发送到错误应用的场景！

一般而言，应用绝不应通过自定义 URL Scheme 深度链接传输敏感数据（更新的技术如 Universal Links 更安全，因为它们依赖于实际的网页域名所有权，详见[深度链接指南](./deep-links)）。

这对 oAuth2 流程尤为重要，因为认证过程的最后一步依赖于深度链接返回应用。为防止恶意应用接收令牌，Capacitor 应用中的 oAuth2 必须使用 [PKCE](https://oauth.net/2/pkce/) 机制。

为确保 oAuth2 流程安全，请确认你使用的插件支持 PKCE。对企业级应用，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案全面支持 oAuth2 流程中的 PKCE。

更多信息请参阅优秀的[原生应用 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)指南。

## 网络安全

网络安全确保网络请求发送至可信端点，并通过加密避免以明文传输敏感数据（如密码）。

### SSL

应用应仅向启用 SSL 的端点发送请求。这意味着永远不要使用 `http://`，而应始终使用 `https://`，以确保数据不会以明文传输。

但这还不够。为避免可能的[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)，应固定 SSL 证书，只接受已知证书。这需要在客户端和服务端原生实现。目前 [cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http) 插件支持此功能，可能还有其他插件也支持。

## WebView 安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/v3/Web/HTTP/CSP) 是浏览器（也就是你的 Capacitor WebView）提供的一组安全功能。CSP 可用于限制 WebView 中允许加载的资源类型（如图片、XHR、视频、Web Sockets 等）。

在 Capacitor 应用中配置 CSP 只需在 `<head>` 中添加带有合规 CSP 格式的 `meta` 标签（CSP 可在服务端和客户端使用相同格式配置）。例如，以下配置允许向当前源和 `foo.com` 发送所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置方式，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/v3/Web/HTTP/CSP)是必读资料。另一个实用资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是使用 JavaScript 的网页应用，标准的 JS 安全技术同样适用。

JS 安全超出本文范围，已有大量关于 JS 和网页应用安全技术的资源。这篇[优秀指南](https://wpengine.com/resources/javascript-security/)可作为入门参考。