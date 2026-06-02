---
title: 部署与更新
description: 通过应用商店远程实时更新你的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一公里涉及将你的应用发布到应用商店，以及随时间推移保持其更新。

采用 Web 原生移动开发方法的一个关键优势是，能够以对应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者同时面向 iOS 和 Android（以及 Web），手动向每个商店发布应用和二进制更新可能会变得不必要的繁琐。

为了简化应用商店发布和长期应用更新，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了多项重要的省时功能。其中最引人注目的是能够直接向 Apple App Store 和 Google Play Store 发布应用。所有计划都支持一定数量的月度部署，更高等级的计划支持更多应用并具备完全自动化部署的能力。

## 使用 Appflow 部署实时更新

结合应用商店发布功能，开发者可以在应用的整个生命周期中，使用 Appflow 的实时部署功能部署实时应用更新。

实时部署的工作原理基于 Capacitor 应用主要是作为带有原生功能 hook 的 Web 应用构建的这一原则。Apple 和 Google 明确允许对应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的敏捷性。

## 连接到 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现基于 git 触发的构建和部署。

这使得可以轻松连接到你现有的开发工作流，开始添加自动化应用商店和实时更新，而不会造成任何中断。

## 立即体验 Appflow

Appflow 为数以亿计用户的主流消费者和企业应用提供支持，具有显著的业务影响力。Appflow 团队与众多财富 500 强公司以及数千家中小型企业密切合作。

并且，由于 Appflow 背后的团队与 Capacitor 团队紧密合作，Appflow 经过优化，能够与 Capacitor 最佳配合。

Appflow 可以免费开始使用，并使用你可能曾经使用过的同一个 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览[文档](https://ionicframework.com/docs/appflow)以了解更多关于 Appflow 如何工作的信息。
