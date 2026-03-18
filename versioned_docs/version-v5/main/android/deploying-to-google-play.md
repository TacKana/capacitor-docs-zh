---
title: 发布到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将您的 Capacitor Android 应用发布到 Google Play 商店

由于 Capacitor 应用本质上就是标准的原生应用，因此将其发布到 Google Play 商店的方式与其他原生 Android 应用完全相同。

首先，请查阅 Google 官方关于 [发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 的文档，为提交应用做好准备。有关为应用生成启动画面和图标的具体细节，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

若需一份包含 Capacitor 特定注意事项的指南，请查看 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（以及 Apple App Store）提交流程，甚至希望通过集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动开发运维服务，名为 [Appflow](https://useappflow.com/)。该服务提供端到端的应用开发和部署能力。

感兴趣吗？请查看这份关于其工作原理以及如何立即与 Capacitor 配合使用的 [简要指南](/main/guides/deploying-updates.md)，或查阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。