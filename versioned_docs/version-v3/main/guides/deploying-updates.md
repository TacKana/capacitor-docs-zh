---
title: 部署和更新
description: 即使通过应用商店，也能实时远程更新您的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署和实时更新

应用开发的最后一公里涉及将应用发布到应用商店，以及随时间推移保持其更新。

Web 原生移动开发方法的一个关键优势是能够以应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者同时针对 iOS、Android（和 Web）进行开发，手动向每个商店发布应用和二进制更新可能非常繁琐。

为了简化应用商店发布和长期应用更新，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动发布应用到商店

Appflow 为 Capacitor 开发者提供了几个重要的节省时间的功能。其中最有趣的是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持一定数量的月度部署，扩展限制以支持更多应用，以及为更高级计划保留的完全自动化部署能力。

## 使用 Appflow 部署实时更新

与应用商店发布功能配合使用，开发者可以使用 Appflow 的实时部署功能在应用的整个生命周期中部署实时应用更新。

实时部署的原理是，Capacitor 应用在很大程度上是作为带有原生功能钩子的 Web 应用构建的。Apple 和 Google 明确允许对应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的敏捷性。

## 连接到 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现 git 触发的构建和部署。

这使得轻松连接到您现有的开发工作流，开始添加自动化的应用商店和实时更新，而不会造成中断。

## 立即尝试 Appflow

Appflow 为拥有数亿用户和重大业务影响的主流消费级和企业级应用提供支持。Appflow 团队与许多财富 500 强公司以及数千家中小型企业密切合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队密切合作，Appflow 针对与 Capacitor 的最佳配合进行了优化。

Appflow 可以免费开始使用，并使用您过去可能使用过的相同 Ionic 帐户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览[文档](https://ionicframework.com/docs/v3/appflow)以了解更多关于 Appflow 如何工作的信息。
