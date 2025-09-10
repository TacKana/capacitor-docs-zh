---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将您的 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上都是标准的原生应用，因此将它们部署到 Google Play 商店的方式与其他原生 Android 应用完全相同。

首先，请参考 Google 官方文档中的 [发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 来准备应用的提交工作。[点击此处](/main/guides/splash-screens-and-icons.md) 查看为应用生成启动画面和图标的详细信息。

如需了解一些特定于 Capacitor 的注意事项，请参阅 [Josh Morony 的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（和 Apple App Store）提交流程，甚至将其集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的 Mobile DevOps 服务——[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？查看这份 [简要指南](/main/guides/deploying-updates.md) 了解其工作原理以及如何立即在 Capacitor 中使用它，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。