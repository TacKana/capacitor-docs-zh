---
title: In App Purchases
description: 如何在 Capacitor 应用或游戏中注册和使用应用内购买功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 应用内购买

大多数应用需要通过创建和使用应用内购买（In App Purchases）来实现盈利和功能升级。虽然为 Capacitor 应用添加应用内购买支持的过程很直接，但需要花费大量精力来配置和注册您自己的应用产品。

我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件来实现这一功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品和消耗品

在 Capacitor 应用中设置应用内购买的主要工作量在于：
1. 为 iOS 和 Android 平台注册您的产品和消耗品
2. 在应用中建立正确的流程来注册和使用这些项目

这个过程相对复杂，我们推荐以下指南作为后续步骤：

- [应用内购买插件指南](https://purchase.cordova.fovea.cc/)
- [如何在 Capacitor 中使用应用内购买](https://devdactic.com/ionic-in-app-purchase-capacitor/)