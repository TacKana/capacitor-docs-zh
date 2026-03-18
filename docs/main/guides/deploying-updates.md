---
title: 部署与更新
description: 即使通过应用商店，也能实时远程更新你的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步，包括将应用发布到应用商店，以及长期保持应用更新。

Web Native 移动开发方法的一个关键优势是能够以应用商店兼容的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者同时面向 iOS、Android（和 Web）平台，手动向每个商店发布应用和二进制更新可能会变得不必要的繁琐。

为了让应用商店发布和长期应用更新变得更简单，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几大节省时间的功能。其中最引人注目的是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持一定数量的月度部署，更高的套餐计划还提供扩展限制以支持更多应用，并实现完全自动化的部署。

## 使用 Appflow 部署实时更新

除了应用商店发布功能，开发者还可以在整个应用生命周期内，使用 Appflow 的实时部署功能来部署实时应用更新。

实时部署的工作原理基于 Capacitor 应用本质上是作为 Web 应用构建的，并通过钩子调用原生功能。Apple 和 Google 明确允许对应用的 Web 内容进行更新，因此该功能与应用商店兼容，为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现基于 git 触发的构建和部署。

这使得你可以轻松连接到现有的开发工作流，在不造成任何干扰的情况下开始添加自动化应用商店和实时更新功能。

## 立即试用 Appflow

Appflow 为数亿用户的大型消费级和企业级应用提供支持，产生了显著的商业影响。Appflow 团队与众多《财富》500 强公司以及数千家中小型企业密切合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队紧密合作，Appflow 经过了优化，能够与 Capacitor 实现最佳协作。

Appflow 提供免费入门套餐，并使用你可能已经使用过的 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/appflow)，了解更多关于 Appflow 的工作原理。