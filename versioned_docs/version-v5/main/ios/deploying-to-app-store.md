---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将你的 Capacitor iOS 应用部署到 App Store

因为归根结底，Capacitor 应用本质上就是标准的原生应用，所以将它们部署到 App Store 的方式与任何其他原生应用相同。

首先，请查阅 Apple 官方关于[向 App Store 提交应用](https://developer.apple.com/app-store/submissions/)的文档。关于为你的应用生成启动屏幕和图标，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

要查看一份包含一些 Capacitor 特定注意事项的指南，请阅读 [Josh Morony 关于此主题的精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play 商店）提交流程，甚至希望通过集成到其 CI/CD 工作流中来实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)。它提供端到端的应用开发和部署能力。

感兴趣吗？请查看这份[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即将其与 Capacitor 结合使用，或者查看官方的 [Appflow 文档](https://ionicframework.com/docs/appflow/)。