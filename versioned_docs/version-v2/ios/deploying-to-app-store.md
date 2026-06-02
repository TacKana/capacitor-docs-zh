---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上就是普通的原生应用，因此它们部署到 App Store 的方式与其他任何原生应用完全一样。

首先，请查阅官方 Apple 文档中的 [向 App Store 提交应用](https://developer.apple.com/app-store/submissions/)。有关生成应用启动屏幕和图标（splash screens and icons）的详细信息，[请参见此处](/guides/splash-screens-and-icons.md)。

如需了解包含一些 Capacitor 特定注意事项的指南，请参阅 Josh Morony 关于此主题的 [优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（和 Google Play Store）提交流程，甚至通过集成 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动端 DevOps 服务，称为 [Appflow](https://useappflow.com/)，提供端到端的应用开发和部署能力。

感兴趣？请查看这份 [简要指南](/guides/deploying-updates.md)，了解其工作原理以及如何立即与 Capacitor 一起使用，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。