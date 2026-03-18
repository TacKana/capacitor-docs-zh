---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将您的 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上是标准的原生应用，因此将其部署到 Google Play 商店的方式与其他原生 Android 应用完全相同。

首先，请查阅官方 Google 文档中的[发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)，为应用提交做好准备。关于为应用生成启动画面和图标的具体方法，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

如需查看包含 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（及 Apple App Store）提交流程，甚至将其与 CI/CD 工作流集成以实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署功能。

感兴趣吗？请查看这篇[简明指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何在 Capacitor 中使用它，或查阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。