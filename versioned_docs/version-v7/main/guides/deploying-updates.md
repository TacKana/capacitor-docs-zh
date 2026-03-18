---
title: 应用部署与更新
description: 远程实时更新您的 Capacitor 应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步涉及将应用发布到应用商店，以及随时间推移保持应用更新。

Web Native 移动开发方法的一个关键优势是能够以与应用商店兼容的方式对应用进行实时更新，前提是这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者需要同时面向 iOS 和 Android（以及 Web）平台，手动向每个商店发布应用和二进制更新可能会变得不必要的繁琐。

为了让应用商店发布和长期应用更新变得更加轻松，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台：[Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了多项节省时间的重要功能。其中最引人注目的功能之一是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持每月一定数量的部署，更高级别的计划提供扩展的限制以支持更多应用，并能够实现完全自动化的部署。

## 使用 Appflow 部署实时更新

配合应用商店发布功能，开发者可以在应用的生命周期内使用 Appflow 的实时部署功能来部署实时应用更新。

实时部署的工作原理基于这样一个事实：Capacitor 应用本质上主要是带有原生功能钩子的 Web 应用。苹果和谷歌明确允许对应用进行 Web 内容更新，因此这一功能与应用商店兼容，并为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现基于 git 触发的构建和部署。

这使得您可以轻松连接到现有的开发工作流，开始添加自动化的应用商店和实时更新功能，而不会对现有流程造成任何干扰。

## 立即试用 Appflow

Appflow 为众多消费者和企业级应用提供支持，这些应用拥有数亿用户并产生显著的商业影响。Appflow 团队与许多《财富》500强公司以及数千家中小型公司紧密合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队密切合作，Appflow 经过优化，能够与 Capacitor 实现最佳协作。

Appflow 提供免费入门方案，并使用您可能在过去使用过的相同 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/appflow)，了解更多关于 Appflow 工作原理的信息。