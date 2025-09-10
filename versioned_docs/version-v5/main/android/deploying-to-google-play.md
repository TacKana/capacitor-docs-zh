---
title: 发布到 Google Play
description: 如何将 Android Capacitor 应用发布到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将 Capacitor Android 应用发布至 Google Play 商店

由于 Capacitor 应用本质上就是标准的原生应用，其发布到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请参考 Google 官方的[发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)文档来准备应用提交工作。关于如何为应用生成启动屏和应用图标，请[参阅此处](/main/guides/splash-screens-and-icons.md)。

如需了解针对 Capacitor 的特殊注意事项，可以参考 [Josh Morony 编写的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化发布流程

对于希望简化 Google Play 商店（以及 Apple App Store）提交流程，甚至希望通过 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务 —— [Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和发布能力。

感兴趣吗？您可以查看这份[简明指南](/main/guides/deploying-updates.md)了解其工作原理及如何立即与 Capacitor 结合使用，或者参阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。