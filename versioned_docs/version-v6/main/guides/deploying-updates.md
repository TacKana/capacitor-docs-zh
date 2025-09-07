---
title: Deploying and Updating
description: 即使通过应用商店也能实时远程更新您的Capacitor应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步涉及将您的应用发布到应用商店，并随着时间的推移保持更新。

Web Native移动开发方法的一个关键优势是能够以符合应用商店规范的方式实时更新应用，只要这些变更不需要二进制更新（即编译的原生功能）。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android和Web平台，手动向每个商店发布应用和二进制更新可能会变得不必要的繁琐。

为了让应用商店发布和长期应用更新更加便捷，Capacitor背后的公司Ionic提供了一个强大的移动DevOps平台——[Appflow](https://useappflow.com/)。

## 使用Appflow实现应用商店自动发布

Appflow为Capacitor开发者提供了多项节省时间的重要功能。其中最引人注目的是能够直接发布到Apple App Store和Google Play Store。所有计划都支持一定数量的月度部署，更高阶计划可扩展部署限额，并支持完全自动化部署。

## 通过Appflow部署实时更新

与应用商店发布功能相配合，开发者可以在应用整个生命周期中使用Appflow的实时部署功能来推送更新。

实时部署的工作原理基于Capacitor应用本质上是带有原生功能钩子的Web应用。Apple和Google明确允许对应用的Web内容进行更新，因此该功能完全兼容应用商店政策，为移动应用团队提供了前所未有的灵活性。

## 集成GitHub、Bitbucket和GitLab

Appflow可直接连接GitHub、Bitbucket或GitLab仓库，实现基于git触发的构建和部署。

这使得您可以轻松对接现有开发流程，在不中断当前工作的情况下开始添加自动化应用商店发布和实时更新功能。

## 立即试用Appflow

Appflow为数亿用户的主流消费级和企业级应用提供支持，产生重大商业影响。Appflow团队与众多《财富》500强企业及数千家中小型企业密切合作。

由于Appflow背后的团队与Capacitor团队紧密协作，Appflow针对Capacitor进行了深度优化。

Appflow可免费开始使用，并支持您可能已有的Ionic账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或查看 [文档](https://ionicframework.com/docs/appflow) 了解更多工作原理。