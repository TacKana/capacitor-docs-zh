---
title: 发布到 App Store
description: 如何将 iOS Capacitor 应用部署至苹果应用商店
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将 Capacitor iOS 应用发布至 App Store

由于 Capacitor 应用本质上是标准的原生应用，其发布到 App Store 的流程与任何其他原生应用完全相同。

首先，请参考苹果官方文档了解 [提交应用到 App Store](https://developer.apple.com/app-store/submissions/) 的完整流程。关于为应用生成启动屏和图标的具体方法，[可参阅此处](/main/guides/splash-screens-and-icons.md)。

如需获取针对 Capacitor 的特别注意事项，推荐阅读 [Josh Morony 编写的详细指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署流程

对于希望简化 App Store（及 Google Play 商店）发布流程，甚至通过 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项名为 [Appflow](https://useappflow.com/) 的强大移动 DevOps 服务，该服务提供端到端的应用开发与部署能力。

感兴趣吗？请查看这份 [简明指南](/main/guides/deploying-updates.md) 了解其工作原理及如何立即在 Capacitor 项目中使用，或参阅官方 [Appflow 文档](https://ionicframework.com/docs/v3/appflow/) 获取更多信息。