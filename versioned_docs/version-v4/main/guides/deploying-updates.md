---
title: 部署与更新
description: 实时远程更新您的 Capacitor 应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一公里涉及将应用发布到应用商店，以及随着时间的推移保持应用更新。

Web Native（Web原生）移动开发方法的关键优势之一是能够以应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译后的原生功能）。

此外，由于大多数 Capacitor 开发者同时针对 iOS、Android（以及 Web），手动为每个商店发布应用和二进制更新可能是不必要的繁琐工作。

为了让应用商店发布和长期应用更新更加便捷，Capacitor 背后的公司 Ionic 提供了一款强大的移动 DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几项节省时间的重要功能。其中最引人注目的是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持一定数量的月度部署，更高阶的计划还提供扩展限制以支持更多应用，并具备完全自动化部署的能力。

## 使用 Appflow 部署实时更新

与应用商店发布功能相配合，开发者可以利用 Appflow 的实时部署功能，在整个应用生命周期内部署实时应用更新。

实时部署的工作原理基于 Capacitor 应用主要构建为 Web 应用，并具备原生功能钩子。苹果和谷歌明确允许对应用进行 Web 内容更新，因此该功能与应用商店兼容，为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，实现基于 git 触发的构建和部署。

这使得您可以轻松连接到现有的开发工作流程，开始添加自动化的应用商店发布和实时更新功能，而无需任何中断。

## 立即试用 Appflow

Appflow 为拥有数亿用户并产生重大商业影响的主要消费者和企业应用提供支持。Appflow 团队与众多财富 500 强公司以及数千家中小型企业紧密合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队密切合作，Appflow 经过优化，能够与 Capacitor 实现最佳协作。

Appflow 提供免费入门，并使用您过去可能使用过的相同 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com) 或浏览 [文档](https://ionicframework.com/docs/appflow) 以了解更多关于 Appflow 的工作原理。