---
title: 部署实时更新
description: 即使通过应用商店，也能实时远程更新您的 Capacitor 应用
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步涉及将应用发布到应用商店，并随时间推移保持应用更新。

基于 Web Native 移动开发方法的关键优势之一是能够以应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者同时针对 iOS、Android（和 Web）进行开发，手动将应用和二进制更新发布到每个商店可能是一项不必要的繁琐工作。

为了使应用商店发布和长期应用更新更简便，Capacitor 背后的公司 Ionic 提供了一个强大的移动 DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几项节省时间的主要功能。其中最有趣的一项功能是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持每月一定数量的部署，更高层级的计划还提供扩展限制以支持更多应用，并具备完全自动化部署的能力。

## 使用 Appflow 部署实时更新

与应用商店发布功能相结合，开发者可以在应用的整个生命周期内使用 Appflow 的实时部署功能来部署实时应用更新。

实时部署的工作原理基于 Capacitor 应用主要构建为具有原生功能钩子的 Web 应用。Apple 和 Google 明确允许对应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，以实现 Git 触发的构建和部署。

这使得您可以轻松连接到现有的开发工作流程，开始添加自动化的应用商店和实时更新，而不会对现有流程造成任何干扰。

## 立即试用 Appflow

Appflow 为数亿用户的大型消费级和企业级应用提供支持，并产生显著的商业影响。Appflow 团队与许多财富 500 强公司以及数千家中小型企业密切合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队紧密合作，因此 Appflow 经过优化，能够与 Capacitor 实现最佳协作。

Appflow 可免费开始使用，并使用您过去可能使用过的相同 Ionic 帐户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/appflow)，了解更多关于 Appflow 工作原理的信息。