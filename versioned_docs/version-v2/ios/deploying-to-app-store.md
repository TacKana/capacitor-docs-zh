---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/deploying-to-app-store
---

# 将你的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上就是标准的原生应用，因此将它们部署到 App Store 的方式与其他任何原生应用完全相同。

首先，请参考 Apple 官方关于 [向 App Store 提交应用](https://developer.apple.com/app-store/submissions/) 的文档。[点击此处](/guides/splash-screens-and-icons.md) 查看为你的应用生成启动画面和图标的详细信息。

如需了解包含一些 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play 商店）提交流程，甚至将其集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务——[Appflow](https://useappflow.com/)，它提供了端到端的应用开发和部署能力。

感兴趣吗？请查看这篇 [简要指南](/guides/deploying-updates.md)，了解它如何工作以及你现在如何将其与 Capacitor 结合使用，或者查阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。