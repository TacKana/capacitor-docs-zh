---
title: 发布到Google Play
description: 如何将基于Capacitor的Android应用发布到Google Play商店
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/android/deploying-to-google-play
---

# 将Capacitor Android应用发布至Google Play商店

由于Capacitor应用本质上是标准的原生应用，因此其发布流程与常规Android应用完全一致。

首先，请参考Google官方的[发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)来准备应用提交材料。关于如何生成应用启动画面和图标，可查阅[本指南](/guides/splash-screens-and-icons.md)。

如需获取针对Capacitor应用的特别建议，推荐阅读[Josh Morony编写的详尽指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化发布流程

对于希望简化Google Play商店（及Apple App Store）发布流程，并实现CI/CD自动化集成的开发团队，Capacitor的母公司Ionic提供了强大的移动开发运维服务[Appflow](https://useappflow.com/)，该平台支持端到端的应用开发和发布管理。

想了解更多？请查看这份[简明指南](/guides/deploying-updates.md)了解工作原理及如何在Capacitor项目中使用，或参阅官方[Appflow文档](https://ionicframework.com/docs/appflow/)。