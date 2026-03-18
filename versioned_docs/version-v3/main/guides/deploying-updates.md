---
title: 部署与更新
description: 即使通过应用商店，也能实时远程更新您的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步是将您的应用发布到应用商店，并在后续持续保持更新。

Web Native 移动开发方法的一个关键优势在于，只要变更不需要二进制更新（即编译后的原生功能），就能够以应用商店友好的方式对应用进行实时更新。

此外，由于大多数 Capacitor 开发者同时面向 iOS、Android（以及 Web）平台，手动向每个商店发布应用和二进制更新可能会变得不必要的繁琐。

为了让应用商店发布和长期应用更新变得更加便捷，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台：[Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几大节省时间的功能。其中最引人注目的功能之一是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持每月一定数量的部署，更高层级的计划还提供扩展限制以支持更多应用，并能实现完全自动化的部署。

## 通过 Appflow 部署实时更新

与应用商店发布功能相结合，开发者可以在应用的整个生命周期内，利用 Appflow 的实时部署功能来部署应用更新。

实时部署的工作原理基于 Capacitor 应用主要是作为 Web 应用构建，并通过钩子调用原生功能。Apple 和 Google 明确允许对应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现基于 Git 触发的构建和部署。

这使得连接至您现有的开发流程变得非常容易，从而在零干扰的情况下添加自动化的应用商店发布和实时更新功能。

## 立即试用 Appflow

Appflow 为拥有数亿用户并产生重要商业影响的主要消费级和企业级应用提供支持。Appflow 团队与众多财富 500 强公司以及数千家中小型企业紧密合作。

并且，由于 Appflow 背后的团队与 Capacitor 团队紧密合作，Appflow 经过优化以最适合与 Capacitor 协同工作。

Appflow 提供免费开始使用，并使用您过去可能使用过的相同 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/v3/appflow) 以了解更多关于 Appflow 的工作原理。