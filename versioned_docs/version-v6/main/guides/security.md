---
title: Security
description: Capacitor应用安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor安全最佳实践

每位Capacitor开发者都有责任确保应用遵循安全最佳实践。稍有不慎，就可能引发重大安全隐患，造成难以挽回的损失。

安全是宽泛的话题，但Capacitor开发者应重点审查以下几个方面的合规性：数据安全、身份认证/深度链接、网络安全以及Web视图安全。

> Ionic为Capacitor应用提供开箱即用的安全套件，包含身份认证、生物识别和加密功能。[了解更多](https://ionic.io/secure)

## 数据安全

数据安全涉及本地存储数据及应用代码的安全性。

### 避免在代码中嵌入密钥

Capacitor应用（以及任何前端应用）最重要的安全准则就是_永远不要_在应用代码中嵌入密钥。这意味着确保代码不包含API密钥、加密密钥或其他可能通过基础应用分析技术轻易窃取的敏感数据。同时需警惕那些可能在构建时将敏感值注入应用代码的环境变量插件。

解决方案是将涉及密钥或令牌的操作转移到服务端处理，在那里它们能得到保护，并且所有请求都可以通过服务器转发。这可以是无服务器函数或传统的服务端应用流程。

对于必须在客户端处理持久化敏感密钥或令牌的应用（如认证令牌或加密密钥），推荐方案是仅在内存中处理这些值（即永不持久化到磁盘），或使用下文将详细介绍的安全密钥链/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供了强大的安全API及专用安全硬件来存储设备上的敏感值。这正是应用在管理加密密钥或会话令牌等高度敏感数据时，能够提供生物识别或安全密码认证的技术基础。

实现这些功能的API包括[iOS钥匙串服务](https://developer.apple.com/documentation/security/keychain_services)和[Android密钥库](https://developer.android.com/training/articles/keystore)。这些API复杂且底层，建议使用现成插件（如社区开发的[ cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain)）。

对于企业级需求，Capacitor团队提供[Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在原生安全API基础上提供了易用且持续更新的解决方案。该产品可与[离线存储](https://ionicframework.com/enterprise/offline-storage)和[认证连接](https://ionicframework.com/enterprise/auth-connect)等Capacitor企业产品配合使用，分别提供加密密钥和认证令牌管理功能。

## 认证与深度链接

原生应用的认证流程需要特别谨慎，因为认证常通过自定义URL方案实现。与网页域名不同，类似`instagram://`的自定义URL方案不受全局管控，恶意应用可能通过定义和覆盖URL方案来劫持请求。想象一下安全令牌被发送到错误应用的后果！

基本原则是：应用绝不应通过自定义URL方案的深度链接传输敏感数据（更新的技术如通用链接更安全，它依赖实际的网页域名所有权，详见[深度链接](./deep-links)指南）。

这在oAuth2流程中尤为关键，因为认证的最后一步依赖返回应用的深度链接。为防止恶意应用获取令牌，Capacitor应用中的oAuth2必须使用[PKCE](https://oauth.net/2/pkce/)方案。

为确保oAuth2流程安全，请确认使用的插件支持PKCE。对于企业需求，官方[Auth Connect](https://ionicframework.com/enterprise/auth-connect)解决方案全面支持oAuth2认证流程中的PKCE。

更多内容可参考这篇优秀指南：[原生应用的oAuth2最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/)。

## 网络安全

网络安全确保网络请求发往可信端点，并通过加密避免以明文传输敏感数据（如密码）。

### SSL

应用只应向启用SSL的端点发起请求。这意味着永远不使用`http://`，而始终使用`https://`，确保数据永远不会以明文传输。

## Web视图安全

### 内容安全策略

[内容安全策略(CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是浏览器（也就是Capacitor的Web视图）提供的一组安全特性。CSP可用于限制用户代理在Web视图中加载的资源类型（如图片、XHR、视频、WebSocket等）。

在Capacitor应用中，可通过在`<head>`添加`meta`标签来配置CSP（服务端和客户端可使用相同格式配置）。例如以下配置允许当前源和`foo.com`的所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP支持多种配置方式，[CSP参考文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)是必读材料，另推荐[内容安全策略网站](https://content-security-policy.com/)。

### JavaScript安全技术

由于Capacitor应用主体是基于JavaScript的Web应用，常规JS安全技术同样适用。

JS安全超出本文范围，已有大量关于JS和Web应用安全技术的资源。推荐阅读这篇[JavaScript安全指南](https://wpengine.com/resources/javascript-security/)作为入门。