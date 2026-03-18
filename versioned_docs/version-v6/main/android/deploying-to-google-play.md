---
title: 发布到 Google Play
description: 如何将基于 Capacitor 的 Android 应用发布到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将你的 Capacitor Android 应用发布到 Google Play 商店

因为 Capacitor 应用本质上是标准的原生应用，所以将它们发布到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请查阅关于 [发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 的官方 Google 文档，为你的应用提交做好准备。有关为你的应用生成启动画面和图标的详细信息，[请参阅这里](/main/guides/splash-screens-and-icons.md)。

如需一份包含特定于 Capacitor 的注意事项的指南，请参阅 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（以及 Apple App Store）提交流程，甚至将其集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)，它提供端到端的应用开发和部署能力。

感兴趣吗？请查看这份 [简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即将其与 Capacitor 一起使用，或者查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。