---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上是标准的原生应用，因此将其部署到 App Store 的方式与任何其他原生应用完全相同。

首先，请查阅 Apple 官方文档关于[向 App Store 提交应用](https://developer.apple.com/app-store/submissions/)的说明。有关为您的应用生成启动画面和图标的详细信息，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

如需了解包含一些针对 Capacitor 的特殊注意事项的指南，请参阅 [Josh Morony 关于此主题的精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play Store）提交流程，甚至希望通过集成到其 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动开发运维服务，名为 [Appflow](https://useappflow.com/)，它提供端到端的应用开发和部署能力。

感兴趣吗？请查看这份[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及您如何立即将其与 Capacitor 结合使用，或者查阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。