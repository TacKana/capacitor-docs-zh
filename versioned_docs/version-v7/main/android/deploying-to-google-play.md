---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将你的 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上就是普通的原生应用，因此它们部署到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请查阅官方 Google 文档中的[发布检查清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)，为提交应用做好准备。有关生成应用启动屏幕和图标的详细信息，[请参见此处](/main/guides/splash-screens-and-icons.md)。

如需查看包含一些 Capacitor 特定注意事项的指南，请参阅 Josh Morony 关于此主题的[精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（和 Apple App Store）提交流程，甚至通过 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动 DevOps 服务，名为 [Appflow](https://useappflow.com/)，可提供端到端的应用开发和部署能力。

感兴趣吗？请查看这篇[简要指南](/main/guides/deploying-updates.md)，了解其工作原理以及如何立即在 Capacitor 中使用它，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。
