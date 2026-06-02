---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将你的 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上仍然是普通的原生应用，因此它们部署到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请查阅 Google 官方文档中的[发布检查清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)，为应用提交流程做好准备。有关为应用生成启动屏幕和图标的详细信息，请[参见此处](/main/guides/splash-screens-and-icons.md)。

如需查看包含一些 Capacitor 特定注意事项的指南，请参阅 Josh Morony 关于该主题的[精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（和 Apple App Store）提交流程，甚至通过集成到 CI/CD 工作流中实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动端 DevOps 服务，名为 [Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣？请查看此[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即与 Capacitor 一起使用，或查看官方的 [Appflow 文档](https://ionicframework.com/docs/appflow/)。
