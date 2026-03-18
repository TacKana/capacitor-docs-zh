---
title: 发布到 App Store
description: 如何将 iOS Capacitor 应用部署到苹果 App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用发布到 App Store

归根结底，Capacitor 应用本质上是标准的原生应用，因此将其部署到 App Store 的方式与任何其他原生应用并无二致。

首先，请参考苹果官方关于[提交应用到 App Store](https://developer.apple.com/app-store/submissions/) 的文档。关于为您的应用生成启动画面和图标，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

如需了解包含 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 关于该主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play 商店）提交流程，甚至希望通过集成到 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动 DevOps 服务——[Appflow](https://useappflow.com/)。它提供了端到端的应用开发和部署能力。

感兴趣吗？请查看这篇[简短指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即在 Capacitor 中使用它，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。