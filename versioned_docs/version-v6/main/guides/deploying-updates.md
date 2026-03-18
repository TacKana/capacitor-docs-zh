---
title: 应用部署与更新
description: 实时远程更新您的 Capacitor 应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后阶段涉及将您的应用发布到应用商店，并随着时间的推移保持更新。

采用 Web Native 移动开发方法的关键优势之一在于，能够以应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译后的原生功能）。

此外，由于大多数 Capacitor 开发者同时面向 iOS、Android（和 Web）平台，手动向每个商店发布应用和二进制更新可能会不必要地繁琐。

为了让应用商店发布和长期应用更新变得更加简单，Capacitor 背后的公司 Ionic 提供了一个强大的移动开发运维平台：[Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了多项节省时间的重要功能。其中最引人注目的是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持一定数量的月度部署，更高层级的计划还提供扩展限制以支持更多应用，并实现完全自动化的部署。

## 通过 Appflow 部署实时更新

结合应用商店发布功能，开发者可以在应用整个生命周期内使用 Appflow 的实时部署功能来部署应用更新。

实时部署的工作原理基于 Capacitor 应用本质上是 Web 应用，并通过钩子访问原生功能。苹果和谷歌明确允许对应用的 Web 内容进行更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现由 Git 触发的构建和部署。

这使得您可以轻松连接到现有的开发工作流程，开始添加自动化的应用商店和实时更新功能，而无需中断现有流程。

## 立即试用 Appflow

Appflow 为数亿用户的主要消费级和企业级应用提供支持，产生了显著的商业影响。Appflow 团队与众多《财富》500 强公司以及数千家中小型企业紧密合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队紧密协作，因此 Appflow 经过优化，能够与 Capacitor 实现最佳协作。

Appflow 可免费开始使用，并使用您可能曾经使用过的相同 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/appflow) 以了解更多关于 Appflow 的工作原理。