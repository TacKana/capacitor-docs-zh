---
title: Deploying and Updating
description: 实时远程更新您的Capacitor应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后阶段涉及将应用发布到应用商店，并保持长期更新。

采用Web Native移动开发方法的一个关键优势是：只要变更不需要二进制更新（即编译的原生功能），就能以应用商店兼容的方式对应用进行实时更新。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android（和Web）平台，手动向每个商店发布应用和二进制更新会带来不必要的繁琐工作。

为了简化应用商店发布和长期更新流程，Capacitor背后的公司Ionic提供了一套强大的移动开发运维平台——[Appflow](https://useappflow.com/)。

## 使用Appflow自动化应用商店发布

Appflow为Capacitor开发者提供了多项省时功能。其中最引人注目的是能够直接发布应用到Apple App Store和Google Play Store。所有计划都支持每月多次部署，高级套餐可扩展部署限制，并支持完全自动化部署流程。

## 通过Appflow部署实时更新

除了应用商店发布功能外，开发者还可以利用Appflow的实时部署功能，在整个应用生命周期内推送实时更新。

实时部署的原理基于Capacitor应用本质上是具有原生功能接入点的Web应用。苹果和谷歌明确允许应用更新Web内容，因此该功能完全兼容应用商店政策，为移动应用团队提供了前所未有的敏捷性。

## 无缝集成GitHub、Bitbucket和GitLab

Appflow可直接连接GitHub、Bitbucket或GitLab代码仓库，实现基于Git触发的构建和部署。

这使您能轻松对接现有开发流程，在不影响当前工作的情况下，立即启用自动化应用商店发布和实时更新功能。

## 立即体验Appflow

Appflow已为数亿用户的企业级应用和消费级应用提供支持，产生显著商业价值。Appflow团队服务的客户从财富500强企业到数千家中小型企业不等。

由于Appflow开发团队与Capacitor团队紧密合作，Appflow针对Capacitor进行了深度优化。

注册Appflow完全免费，您可以使用已有的Ionic账户登录。现在访问 [useappflow.com](https://useappflow.com/) 开启旅程，或查阅 [官方文档](https://ionicframework.com/docs/appflow) 了解更多运作细节。