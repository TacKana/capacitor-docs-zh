---
title: In App Purchases
description: 如何在Capacitor应用中注册和使用应用内购功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor中的应用内购功能

大多数应用需要通过创建和使用应用内购（In App Purchases）来实现盈利和功能升级。为Capacitor应用添加内购支持虽然流程清晰，但需要进行大量的产品配置和注册工作。

我们将使用[cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase)插件来实现这一功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置商品与消耗品

在Capacitor应用中配置应用内购的主要工作集中在为iOS和Android平台注册商品与消耗品，并在应用中建立正确的注册和使用流程。

这个过程较为复杂，建议参考以下进阶指南：
- [应用内购插件使用指南](https://purchase.cordova.fovea.cc/)
- [如何在Capacitor中使用应用内购](https://devdactic.com/ionic-in-app-purchase-capacitor/)