---
title: Capacitor 应用内购买指南
description: 如何在 Capacitor 应用中注册和使用应用内购买功能
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/in-app-purchases
---

# Capacitor 应用内购买功能实现

大多数应用需要通过创建和使用应用内购买（In App Purchases）来实现盈利和功能升级。为 Capacitor 应用添加应用内购买支持虽然操作直接，但在配置和注册应用自有产品方面需要较多准备工作。

我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件来实现此功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品与可消耗项

在 Capacitor 应用中配置应用内购买的主要工作包括：
1. 为 iOS 和 Android 平台注册产品与可消耗项
2. 在应用中建立正确的注册和消费流程

这个过程较为复杂，我们推荐参考以下进阶指南：

- [应用内购买插件使用指南](https://purchase.cordova.fovea.cc/)
- [Capacitor 应用内购买实践教程](https://devdactic.com/ionic-in-app-purchase-capacitor/)