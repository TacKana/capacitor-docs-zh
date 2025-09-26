---
title: 发布到App Store
description: 如何将iOS Capacitor应用发布至苹果App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将Capacitor iOS应用发布至App Store

由于Capacitor应用本质上是标准的原生应用，其发布到App Store的方式与任何其他原生应用完全相同。

首先，请参考苹果官方文档关于[提交应用到App Store](https://developer.apple.com/app-store/submissions/)的说明。应用启动画面和图标生成的详细指南可[参阅此处](/main/guides/splash-screens-and-icons.md)。

如需包含Capacitor特定注意事项的指南，推荐阅读[Josh Morony的精彩教程](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化发布流程

对于希望简化App Store（及Google Play商店）发布流程，甚至将其集成至CI/CD工作流实现自动化的团队，Capacitor母公司Ionic提供了强大的移动开发运维服务[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发与发布能力。

感兴趣吗？查看这份[简明指南](/main/guides/deploying-updates.md)了解工作原理及如何在Capacitor中使用，或参阅官方[Appflow文档](https://ionicframework.com/docs/appflow/)。