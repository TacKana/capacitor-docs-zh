---
title: Security
description: 为您的 Capacitor 应用程序提供安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 安全最佳实践

每一位 Capacitor 开发者都有责任确保自己的应用遵循安全最佳实践。如果处理不当，可能会出现重大的安全问题，这可能造成极其严重的损害和高昂的代价。

安全是一个广泛的议题，但有几个关键领域是 Capacitor 开发者必须进行安全合规性审计的，包括数据、身份验证/深度链接、网络以及 Web 视图安全。

> Ionic 为 Capacitor 应用提供了一套开箱即用的安全解决方案，包含身份验证、生物识别和加密。 [了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用，或者说任何前端应用而言，最重要的安全建议之一就是 **切勿在应用代码中嵌入密钥**。这意味着要确保你的代码永远不会包含秘密 API 密钥、加密密钥或任何其他敏感数据，这些数据可能通过基本的应用分析技术被轻易窃取。注意那些可能在构建时将敏感值注入到应用代码中的环境变量插件。

相反，应将大多数需要秘密密钥或令牌的操作转移到服务器端，在那里它们可以得到保护，并且任何请求都可以从服务器转发。这可以是一个无服务器函数，也可以是一个传统的服务器端应用进程。

对于那些必须在客户端处理持久化敏感密钥或令牌的应用（例如认证令牌或加密密钥），推荐的选择是仅在内存在处理该值（即，永远不要将其持久化到磁盘），或者使用下面详述的安全钥匙串/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。应用程序正是通过这种方式，在管理高度敏感值（如加密密钥或会话令牌）的同时，提供生物识别或安全密码验证。

提供此功能的 API 在 [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 [Android Keystore](https://developer.android.com/training/articles/keystore) API 中可用。这些 API 复杂且底层，因此你可能需要找到一个为你使用它们的插件（例如这个社区插件 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业用例，Capacitor 团队提供了 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在这些原生安全 API 之上提供了一个易于使用的 API 和频繁更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [Offline Storage](https://ionicframework.com/enterprise/offline-storage) 和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）结合使用，分别为每个体验提供加密密钥或身份验证令牌管理组件。

## 身份验证与深度链接

原生应用中的身份验证流程需要格外小心，因为身份验证通常通过使用自定义 URL 方案来完成。像 `instagram://` 这样的自定义 URL 方案，不像 Web 域名那样受到全局控制，因此恶意应用程序有可能通过定义和覆盖一个自定义 URL 方案来拦截原本发送给另一个应用的请求。想象一下，一个安全令牌被发送到了错误的应用程序！

一般来说，应用程序绝不应该通过自定义 URL 方案的深度链接发送敏感数据（更新的技术，如通用链接，更为安全，因为它们依赖于实际的 Web 域名所有权，详情请参阅 [Deep Links](./deep-links) 指南）。

这对于 oAuth2 流程尤其重要，因为身份验证体验的最后一步依赖于深度链接返回应用。为了降低恶意应用接收令牌的可能性，Capacitor 应用中的 oAuth2 **必须** 使用 [PKCE](https://oauth.net/2/pkce/)。

要确保你的 oAuth2 流程是安全的，请确保你使用的插件支持 PKCE。对于企业用例，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 oAuth2 身份验证流程的 PKCE。

更多信息，请参阅这篇优秀的 [oAuth2 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 指南。

## 网络安全

网络安全涉及确保网络请求发送到受信任的端点，并经过加密，以避免以明文形式发送敏感数据（例如密码）。

### SSL

应用应该只向启用了 SSL 的端点发出请求。这意味着永远不要向使用 `http://` 的端点发出请求，而是始终使用 `https://`。这确保了数据永远不会以明文形式发送。

## Web 视图安全

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是一套在浏览器（因此也在你的 Capacitor Web 视图中）可用的安全功能集。CSP 可用于限制用户代理在 Web 视图中允许加载的资源（如图片、XHR、视频、Web 套接字等）。

可以通过在 `<head>` 中添加一个 `meta` 标签来为你的 Capacitor 应用配置 CSP（CSP 可以使用相同格式在服务器端和客户端进行配置）。例如，以下配置将允许向当前源和 `foo.com` 发起所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持多种多样的配置，[CSP 参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读的。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的主体是使用 JavaScript 的 Web 应用，所以典型的 JS 安全技术同样适用。

JS 安全超出了本文档的范围，并且已有许多关于正确 JS 和 Web 应用安全技术的现有资源。这里有一个 [不错的入门指南](https://wpengine.com/resources/javascript-security/)。