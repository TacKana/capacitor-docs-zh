---
title: 部署至 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将你的 Capacitor iOS 应用部署到 App Store

归根结底，Capacitor 应用本质上是标准的原生应用，因此将其部署到 App Store 的方式与任何其他原生应用并无二致。

首先，请查阅 Apple 官方的 [App Store 应用提交指南](https://developer.apple.com/app-store/submissions/)。关于如何为你的应用生成启动画面和图标，请[参阅此处](/main/guides/splash-screens-and-icons.md)。

如需一份包含 Capacitor 特定注意事项的指南，可以参考 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play 商店）提交流程，甚至希望通过集成到 CI/CD 工作流来实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动 DevOps 服务——[Appflow](https://useappflow.com/)。该服务提供端到端的应用开发和部署能力。

感兴趣吗？请查看这份[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即将其与 Capacitor 结合使用，或者参阅官方的 [Appflow 文档](https://ionicframework.com/docs/appflow/)。