---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上就是标准的原生应用，因此将其部署到 App Store 的方式与其他原生应用完全相同。

首先，请参考 Apple 官方文档关于[向 App Store 提交应用](https://developer.apple.com/app-store/submissions/)的说明。[点击此处](/main/guides/splash-screens-and-icons.md)查看为您的应用生成启动画面和图标的详细信息。

如需了解一些特定于 Capacitor 的注意事项，请参阅 [Josh Morony 的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（和 Google Play Store）提交流程，甚至将其与 CI/CD 工作流集成以实现自动化的团队，Capacitor 的母公司 Ionic 提供了一款强大的 Mobile DevOps 服务——[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？查看这份[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即在 Capacitor 中使用它，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。