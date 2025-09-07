---
title: 发布到Google Play
description: 如何将Capacitor Android应用部署到Google Play商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将Capacitor Android应用发布至Google Play商店

由于Capacitor应用本质上是标准的原生应用，其发布到Google Play商店的方式与其他原生Android应用完全相同。

首先，请参考Google官方文档中的[发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)来准备应用上架所需的材料。关于如何为应用生成启动画面和应用图标，[可参阅此处](/main/guides/splash-screens-and-icons.md)。

如需了解Capacitor特有的注意事项，推荐阅读[Josh Morony的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化发布流程

对于希望简化Google Play商店（及Apple App Store）发布流程，甚至希望通过CI/CD工作流实现自动化发布的团队，Capacitor的母公司Ionic提供了强大的移动开发运维服务[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？您可以查看这篇[简明指南](/main/guides/deploying-updates.md)了解其工作原理及如何与Capacitor配合使用，或参阅官方[Appflow文档](https://ionicframework.com/docs/appflow/)。