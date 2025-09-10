---
title: 部署到App Store
description: 如何将iOS Capacitor应用部署到苹果应用商店
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/deploying-to-app-store
---

# 将Capacitor iOS应用部署至App Store

Capacitor应用本质上就是标准的原生应用，因此其部署到App Store的方式与其他原生应用完全相同。

首先，请参考苹果官方文档关于[向App Store提交应用](https://developer.apple.com/app-store/submissions/)的说明。如需了解如何为应用生成启动画面和图标，[请参阅此处](/guides/splash-screens-and-icons.md)。

要获取包含Capacitor相关注意事项的指南，可以参考[Josh Morony的优秀教程](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署流程

对于希望简化App Store（及Google Play商店）发布流程，甚至希望通过CI/CD工作流实现自动化的团队，Capacitor的母公司Ionic提供了强大的Mobile DevOps服务——[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？可以查看这份[简明指南](/guides/deploying-updates.md)了解其工作原理以及如何立即在Capacitor中使用，或查阅官方[Appflow文档](https://ionicframework.com/docs/appflow/)。