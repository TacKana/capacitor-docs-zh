---
title: In App Purchases
description: 如何在 Capacitor 应用中注册和使用应用内购功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 应用内购指南

大多数应用需要通过创建和使用应用内购(IAP)来实现盈利和功能升级。为 Capacitor 应用添加内购功能虽然流程清晰，但需要完成大量产品配置和注册工作。

我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件来实现这一功能。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 配置产品与消耗型商品

在 Capacitor 应用中设置应用内购的主要工作包括：
1. 为 iOS 和 Android 平台注册产品与消耗型商品
2. 在应用中建立正确的注册和消费流程

这个过程相对复杂，建议参考以下进阶指南：

- [应用内购插件使用手册](https://purchase.cordova.fovea.cc/)
- [Capacitor 应用内购实战教程](https://devdactic.com/ionic-in-app-purchase-capacitor/)

（注：保持了所有技术术语的英文原文如"IAP"、"Capacitor"，链接和代码块完全保留原样，同时将说明性文字转换为自然的中文表达，并优化了段落结构以符合中文阅读习惯）