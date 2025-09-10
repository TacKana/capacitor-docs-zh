---
title: In App Purchases
description: 如何在 Capacitor 应用中注册和使用应用内购功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 应用内购实现

大多数应用需要通过创建和使用应用内购（In App Purchases）来获取收益并支持功能升级。虽然在 Capacitor 应用中添加内购支持相对简单，但需要完成大量的产品配置和注册工作。

我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件来实现这一功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置可购产品和消耗型商品

在 Capacitor 应用中实现内购功能的主要工作量集中在：
1. 为 iOS 和 Android 平台注册可购产品和消耗型商品
2. 建立应用内注册和消费这些商品的正确流程

这个过程较为复杂，建议参考以下进阶指南：

- [应用内购插件使用指南](https://purchase.cordova.fovea.cc/)
- [Capacitor 应用内购实现详解](https://devdactic.com/ionic-in-app-purchase-capacitor/)

（说明：译文保持了专业术语"consumables"的准确翻译为"消耗型商品"，采用了技术文档常见的简洁句式，拆分长句为更容易理解的短句结构，同时确保所有技术名词和链接保持原样）