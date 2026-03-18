---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将你的 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上是标准的原生应用，因此将其部署到 Google Play 商店的方式与任何其他原生 Android 应用并无二致。

首先，请查阅 Google 官方关于 [发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 的文档，为应用提交做好准备。关于为应用生成启动画面和图标，请 [查看此处](/main/guides/splash-screens-and-icons.md) 了解详情。

如需一份包含 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 关于此主题的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（以及 Apple App Store）提交流程，甚至希望通过集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)，它提供了端到端的应用开发和部署能力。

感兴趣吗？请查看这份 [简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即将其与 Capacitor 结合使用，或查看官方的 [Appflow 文档](https://ionicframework.com/docs/appflow/)。