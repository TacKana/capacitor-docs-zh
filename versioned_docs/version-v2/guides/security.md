---
title: Security
description: 适用于 Capacitor 应用的安全最佳实践
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/security
---

# Capacitor 安全最佳实践

每位 Capacitor 开发者都有责任确保其应用遵循安全最佳实践。若不加以适当关注，可能会出现重大的安全问题，造成极其严重且代价高昂的损失。

安全是一个广泛的议题，但 Capacitor 开发者应重点关注以下几个领域的安全合规性：数据安全、身份验证/深度链接、网络安全以及 Web View 安全。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的安全。

### 避免在代码中嵌入密钥

对于 Capacitor 应用（以及任何前端应用）而言，最重要的安全建议之一是 **切勿在应用代码中嵌入密钥**。这意味着确保你的代码不包含任何秘密 API 密钥、加密密钥或其他敏感数据，这些数据可能通过基本的应用分析技术被轻易窃取。同时，要留意那些可能在构建时将敏感值注入应用代码的环境变量插件。

相反地，应将大多数需要密钥或令牌的操作移至服务器端，在那里它们可以得到保护，并且任何请求都可以从服务器端转发。这可以是一个无服务器函数，也可以是传统的服务器端应用进程。

对于那些必须在客户端处理持久化敏感密钥或令牌的应用（例如身份验证令牌或加密密钥），推荐的做法是仅将值保存在内存中（即绝不将其持久化到磁盘），或者使用下文详细描述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。应用正是通过这种方式来管理高度敏感的值，如加密密钥或会话令牌，同时提供生物识别或安全密码验证。

提供此功能的是 [iOS 钥匙串服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API。这些 API 复杂且底层，因此你可能需要寻找一个为你封装了这些功能的插件（例如这个 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业用例，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在这些原生安全 API 之上提供了一个易于使用的 API 并保持频繁更新。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）结合使用，分别为每个场景提供加密密钥或身份验证令牌管理功能。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外小心，因为身份验证通常通过使用自定义 URL 方案（Custom URL Schemes）来完成。自定义 URL 方案（例如 `instagram://`）不像 Web 域名那样受到全局控制，因此恶意应用有可能通过定义和覆盖自定义 URL 方案来拦截原本发往另一个应用的请求。想象一下，一个安全令牌被发送到了错误的应用！

一般来说，应用绝不应通过自定义 URL 方案的深度链接发送敏感数据（较新的技术如通用链接（Universal Links）更加安全，因为它们依赖于实际的 Web 域名所有权，详情请参阅 [深度链接](./deep-links) 指南）。

这对于 oAuth2 流程尤其重要，因为身份验证体验的最后一步依赖于一个深度链接返回应用。为了降低恶意应用接收令牌的可能性，Capacitor 应用中的 oAuth2 **必须** 使用 [PKCE](https://oauth.net/2/pkce/)。

为确保你的 oAuth2 流程安全，请确保你的插件支持 PKCE。对于企业用例，官方的 Capacitor 解决方案 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) 完全支持 oAuth2 身份验证流程的 PKCE。

更多信息，请参阅这篇优秀的指南 [原生应用的 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)。

## 网络安全

网络安全涉及确保网络请求发送到受信任的端点，并进行加密，以避免以明文形式发送敏感数据（如密码）。

### SSL

应用应仅向启用 SSL 的端点发出请求。这意味着绝不向以 `http://` 开头的端点发送请求，而应始终使用 `https://`。这确保了数据永远不会以明文形式发送。

然而，仅此一项还不够。为了避免可能的[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)，应固定 SSL 证书，以便只接受已知的证书。这必须在原生环境中、在客户端和服务器端同时实施。目前，[cordova-plugin-advanced-http](https://github.com/silkimen/cordova-plugin-advanced-http) 插件支持此功能，可能还有其他插件也支持。

## Web View 安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器（因此也是你的 Capacitor Web View）中可用的一组安全功能。CSP 可用于限制用户代理在 Web View 中允许加载的资源（例如图像、XHR、视频、Web 套接字等）。

你可以通过向 `<head>` 中添加一个具有可接受 CSP 格式的 `meta` 标签来配置 Capacitor 应用中的 CSP（CSP 可以使用相同的格式在服务器端和客户端配置）。例如，以下配置将允许所有请求发往当前源和 `foo.com`：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读资料。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体部分是使用 JavaScript 的 Web 应用，因此典型的 JS 安全技术同样适用。

JS 安全超出了本文档的范围，并且已有许多关于正确 JS 和 Web 应用安全技术的现有资源。[这里有一个不错的起点](https://wpengine.com/resources/javascript-security/)。