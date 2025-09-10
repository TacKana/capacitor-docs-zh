---
title: 应用部署与更新
description: 实时远程更新您的Capacitor应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后阶段涉及将应用发布到应用商店，以及后续的持续更新。

采用Web Native移动开发方法的核心优势在于，只要变更不需要二进制更新（即编译的原生功能），就能以符合应用商店规范的方式实现应用实时更新。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android（及Web）平台，手动向每个应用商店发布应用和二进制更新会带来不必要的繁琐工作。

为了简化应用商店发布和长期应用更新流程，Capacitor背后的公司Ionic提供了一套强大的移动DevOps平台——[Appflow](https://useappflow.com/)。

## 使用Appflow自动化应用商店发布

Appflow为Capacitor开发者提供了多项节省时间的核心功能。其中最引人注目的是支持直接发布应用到Apple App Store和Google Play商店。所有套餐都包含每月一定次数的部署额度，更高阶套餐可扩展部署限额并支持完全自动化部署流程。

## 通过Appflow实现实时更新

结合应用商店发布功能，开发者可以借助Appflow的实时部署特性，在整个应用生命周期内推送实时更新。

实时部署的原理在于：Capacitor应用本质上是具备原生功能接口的Web应用。苹果和谷歌明确允许应用更新Web内容，因此这项功能完全符合应用商店规范，为移动应用团队提供了前所未有的敏捷性。

## 连接GitHub、Bitbucket和GitLab

Appflow可直接对接GitHub、Bitbucket或GitLab代码仓库，实现基于Git触发的构建与部署。

这使您能轻松对接现有开发流程，在不干扰现有工作的情况下立即启用自动化应用商店发布和实时更新功能。

## 立即体验Appflow

Appflow已为数亿用户的企业级应用和消费级应用提供支持，产生显著商业影响。Appflow团队服务对象涵盖众多《财富》500强企业及数千家中小型公司。

由于Appflow开发团队与Capacitor团队紧密协作，Appflow针对Capacitor进行了深度优化。

Appflow提供免费入门套餐，您可以使用已有的Ionic账户直接登录。访问 [useappflow.com](https://useappflow.com/) 立即开始，或查阅 [官方文档](https://ionicframework.com/docs/appflow) 深入了解Appflow运作机制。