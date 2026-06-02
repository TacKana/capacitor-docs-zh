---
title: Capacitor 应用内购买
description: 如何在您的 Capacitor 应用或游戏中注册和使用应用内购买
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/in-app-purchases
---

# Capacitor 应用内购买

大多数应用需要创建和使用应用内购买（In App Purchases）来产生收入和启用升级功能。为您的 Capacitor 应用添加应用内购买支持很简单，但需要大量的工作来配置和注册您自己的应用产品。

为此，我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品和消耗品

在您的 Capacitor 应用中设置应用内购买的大部分工作在于为 iOS 和 Android 注册您的产品和消耗品，然后设置适当的流程来在您的应用中注册和消费这些项目。

这是一个相当复杂的过程，我们推荐以下指南作为下一步：

- [应用内购买插件指南](https://purchase.cordova.fovea.cc/)
- [如何将应用内购买与 Capacitor 一起使用](https://devdactic.com/ionic-in-app-purchase-capacitor/)