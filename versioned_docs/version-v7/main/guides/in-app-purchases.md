---
title: 应用内购
description: 如何在 Capacitor 应用或游戏中注册和消费应用内购
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 中的应用内购

大多数应用需要创建和消费应用内购以产生收入并实现升级。为你的 Capacitor 应用添加应用内购支持是直接的，但需要相当多的工作来配置和注册你自己的应用产品。

为此，我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品和消耗品

在你的 Capacitor 应用中设置应用内购的大部分工作在于注册你的 iOS 和 Android 产品及消耗品，然后设置正确的流程在你的应用中注册和消费这些项目。

这是一个相当复杂的过程，我们建议将以下指南作为下一步：

- [应用内购插件指南](https://purchase.cordova.fovea.cc/)
- [如何在 Capacitor 中使用应用内购](https://devdactic.com/ionic-in-app-purchase-capacitor/)
