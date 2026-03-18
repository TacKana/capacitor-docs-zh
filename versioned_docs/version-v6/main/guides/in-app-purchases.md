---
title: In App Purchases
description: 如何在 Capacitor 应用或游戏中注册和使用应用内购买功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 中的应用内购买功能

大多数应用都需要创建和使用应用内购买功能来获取收入并支持升级。为你的 Capacitor 应用添加应用内购买支持虽然需要大量配置和注册应用自有产品的工作，但过程是直观的。

为此，我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品和消耗品

在 Capacitor 应用中设置应用内购买的大部分工作在于为 iOS 和 Android 注册你的产品和消耗品，然后在应用中设置适当的流程来注册和使用这些项目。

这是一个相当复杂的过程，我们建议参考以下指南作为后续步骤：

- [应用内购买插件指南](https://purchase.cordova.fovea.cc/)
- [如何在 Capacitor 中使用应用内购买功能](https://devdactic.com/ionic-in-app-purchase-capacitor/)