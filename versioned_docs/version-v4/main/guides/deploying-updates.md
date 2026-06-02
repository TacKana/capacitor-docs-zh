---
title: 部署和更新
description: 即使通过应用商店，也能实时远程更新你的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署和实时更新

应用开发的最后一英里涉及将你的应用发布到应用商店，以及随着时间的推移保持其更新。

Web 原生移动开发方法的关键优势之一是能够以应用商店友好的方式对应用进行实时更新，只要这些更改不需要二进制更新（即编译的原生功能）。

此外，由于大多数 Capacitor 开发者同时面向 iOS、Android 和 Web，手动向每个商店发布应用和二进制更新可能不必要地繁琐。

为了使应用商店发布和长期应用更新更容易，Capacitor 背后的公司 Ionic 提供了一个名为 [Appflow](https://useappflow.com/) 的强大移动 DevOps 平台。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几个节省时间的重大功能。最有趣的功能之一是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持一定数量的月度部署，更高级别的计划提供扩展限制以支持更多应用，并能够完全自动化部署。

## 使用 Appflow 部署实时更新

与应用商店发布功能配合，开发者可以在应用的整个生命周期中使用 Appflow 的实时部署功能部署实时应用更新。

实时部署的工作原理基于 Capacitor 应用主要是作为带有原生功能 hook 的 Web 应用构建的。Apple 和 Google 明确允许应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的敏捷性。

## 连接到 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，用于 git 触发的构建和部署。

这使得可以轻松连接到你现有的开发工作流，开始添加自动化的应用商店和实时更新，而不会造成任何中断。

## 今天就试试 Appflow

Appflow 为数以亿计用户的主要消费者和企业应用提供支持，具有重要的业务影响。Appflow 团队与许多财富 500 强公司以及数千家中小型企业密切合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队密切合作，Appflow 经过优化，可与 Capacitor 最佳配合使用。

Appflow 可以免费开始使用，并使用你可能过去使用过的同一 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览[文档](https://ionicframework.com/docs/appflow)以了解更多关于 Appflow 如何工作的信息。
