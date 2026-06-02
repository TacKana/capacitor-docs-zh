---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上仍然是普通的原生应用，因此它们部署到 App Store 的方式与其他原生应用完全相同。

首先，请查阅 Apple 官方文档中关于[提交应用到 App Store](https://developer.apple.com/app-store/submissions/) 的内容。有关生成应用启动屏和图标的信息，[请参见此处](/main/guides/splash-screens-and-icons.md)。

如需包含一些 Capacitor 特有考虑的指南，请参阅 Josh Morony 关于此主题的[精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（和 Google Play Store）提交流程，甚至通过集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)，它提供端到端的应用开发和部署能力。

感兴趣？请查看这份关于其工作原理以及如何立即与 Capacitor 配合使用的[简要指南](/main/guides/deploying-updates.md)，或查看官方的 [Appflow 文档](https://ionicframework.com/docs/appflow/)。
