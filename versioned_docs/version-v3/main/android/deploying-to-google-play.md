---
title: 发布到 Google Play
description: 如何将基于 Capacitor 的 Android 应用发布至 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将 Capacitor Android 应用发布至 Google Play 商店

Capacitor 应用本质上是标准的原生应用，因此其发布流程与常规 Android 应用完全一致。

首先，请参考 Google 官方的 [发布清单指南](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 做好应用提交准备。[此处](/main/guides/splash-screens-and-icons.md) 提供了为应用生成启动画面和应用图标的详细指南。

如需了解 Capacitor 特有的注意事项，推荐阅读 [Josh Morony 的详尽指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化发布流程

对于希望简化 Google Play 商店（及 Apple App Store）发布流程，甚至希望通过 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了强大的移动开发运维服务 [Appflow](https://useappflow.com/)，该服务支持端到端的应用开发和发布能力。

感兴趣吗？可通过 [本简明指南](/main/guides/deploying-updates.md) 了解其工作原理及如何与 Capacitor 配合使用，或查阅官方 [Appflow 文档](https://ionicframework.com/docs/v3/appflow/)。