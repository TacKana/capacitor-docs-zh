---
title: 安全性
description: 为你的 Capacitor 应用提供安全性最佳实践指南
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全性最佳实践

每位 Capacitor 开发者都有责任确保其应用遵循安全性最佳实践。若不加以适当关注，可能会产生重大的安全问题，造成极其严重的损害和高昂代价。

安全性是一个宽泛的话题，但 Capacitor 开发者应审核几个方面的安全合规性，包括数据安全、身份验证/深度链接、网络和 Web View 安全。

> Ionic 为 Capacitor 应用提供了一套开箱即用的安全套件，包含身份验证、生物识别和加密功能。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用（以及任何前端应用）而言，最重要的安全建议之一是：**切勿在应用代码中嵌入密钥**。这意味着确保你的代码绝不包含秘密 API 密钥、加密密钥或任何其他敏感数据，这些数据可能通过基本的应用分析技术被轻易窃取。需警惕那些可能在构建时将敏感值注入应用代码的环境变量插件。

相反，应将大多数需要密钥或令牌的操作移至服务器端，在那里它们可以得到保护，并且任何请求都可以从服务器转发。这可以是一个无服务器函数或传统的服务器端应用流程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（例如身份验证令牌或加密密钥），推荐的选择是仅在内存中处理这些值（即不将其持久化到磁盘），或使用下文详述的安全密钥链/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。这正是应用在管理高度敏感值（如加密密钥或会话令牌）时提供生物识别或安全密码身份验证的方式。

提供此功能的 API 包括 [iOS 密钥链服务](https://developer.apple.com/documentation/security/keychain_services) 和 [Android 密钥库](https://developer.android.com/training/articles/keystore) API。这些 API 复杂且底层，因此你可能需要寻找一个为你使用这些 API 的插件（例如这个社区插件 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业用例，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它基于这些原生安全 API 提供了易用的 API 和频繁更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）结合使用，分别为每个体验提供加密密钥或身份验证令牌管理组件。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外小心，因为身份验证通常通过使用自定义 URL 方案进行。自定义 URL 方案（如 `instagram://`）不像 Web 域名那样受全局控制，因此恶意应用有可能通过定义和覆盖自定义 URL 方案来拦截本应发往另一个应用的请求。想象一下，安全令牌被发送到了错误的应用程序！

一般来说，应用绝不应通过自定义 URL 方案深度链接发送敏感数据（较新的技术如通用链接更安全，因为它们依赖于实际的 Web 域名所有权，详见[深度链接指南](./deep-links)）。

这对于 oAuth2 流程尤为重要，因为身份验证体验的最后一步依赖于返回应用的深度链接。为了降低恶意应用接收令牌的可能性，Capacitor 应用中的 oAuth2 **必须**使用 [PKCE](https://oauth.net/2/pkce/)。

为确保你的 oAuth2 流程安全，请确保你的插件支持 PKCE。对于企业用例，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 oAuth2 身份验证流程中的 PKCE。

更多信息，请参阅这篇优秀的[原生应用 oAuth2 最佳实践指南](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)。

## 网络安全

网络安全涉及确保网络请求发往可信端点并进行加密，以避免以明文发送敏感数据（如密码）。

### SSL

应用应仅向启用 SSL 的端点发出请求。这意味着绝不向使用 `http://` 的端点发出请求，而应始终使用 `https://`。这确保数据永远不会以明文发送。

## Web View 安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是一组浏览器（因此也包括你的 Capacitor Web View）中可用的安全功能。CSP 可用于限制用户代理（Web View）允许加载的资源（如图像、XHR、视频、Web Sockets 等）。

你可以通过在 `<head>` 中添加一个 `meta` 标签并配置可接受的 CSP 格式（CSP 可以在服务器端和客户端使用相同格式配置）来为你的 Capacitor 应用配置 CSP。例如，以下配置将允许所有请求发往当前源和 `foo.com`：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种配置，[CSP 参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是必读内容。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是使用 JavaScript 的 Web 应用，因此常规的 JS 安全技术同样适用。

JS 安全超出了本文档的范围，市面上已有许多关于正确 JS 和 Web 应用安全技术的资源。[这是一个很好的起点](https://wpengine.com/resources/javascript-security/)。