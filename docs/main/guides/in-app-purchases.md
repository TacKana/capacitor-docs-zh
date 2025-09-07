---
title: In App Purchases
description: 如何在 Capacitor 应用中注册和使用应用内购买功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 应用内购买实现指南

大多数应用需要通过创建和使用应用内购买功能来实现盈利和提供升级服务。虽然为 Capacitor 应用添加应用内购买支持流程相对简单，但需要在产品配置和注册环节投入大量工作。

我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件来实现这一功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置商品与消耗型项目

在 Capacitor 应用中实现应用内购买的主要工作量集中在以下几个方面：
- 为 iOS 和 Android 平台注册商品及消耗型项目
- 建立正确的应用内注册和消费流程

这个过程相对复杂，我们推荐参考以下进阶指南：

- [应用内购买插件使用指南](https://purchase.cordova.fovea.cc/)
- [如何在 Capacitor 中使用应用内购买](https://devdactic.com/ionic-in-app-purchase-capacitor/)

（注：保持原文中的链接格式不变，URL未进行翻译）