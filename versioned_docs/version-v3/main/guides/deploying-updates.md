---
title: 应用部署与更新
description: 实时远程更新您的Capacitor应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后阶段涉及将应用发布到应用商店，并保持长期更新。

采用Web Native移动开发方法的核心优势在于：只要更新不涉及二进制变更（即无需重新编译原生功能），就能以符合应用商店政策的方式实现实时更新。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android和Web平台，手动向每个商店提交应用和二进制更新会带来不必要的繁琐工作。

为简化应用商店发布和长期更新流程，Capacitor背后的公司Ionic提供了强大的移动DevOps平台——[Appflow](https://useappflow.com/)。

## 通过Appflow实现自动化商店发布

Appflow为Capacitor开发者提供了多项省时功能，其中最亮眼的是支持直接发布到Apple App Store和Google Play商店。所有套餐都包含每月限定次数的部署额度，更高阶套餐可扩展应用数量限制并支持全自动部署。

## 使用Appflow实施实时更新

结合应用商店发布功能，开发者可以通过Appflow的实时部署特性，在整个应用生命周期内推送即时更新。

实时部署的原理基于Capacitor应用本质上是嵌入了原生功能的Web应用。苹果和谷歌明确允许应用更新Web内容，因此该特性完全符合商店政策，为移动团队提供了前所未有的敏捷性。

## 无缝对接Git代码库

Appflow可直接连接GitHub、Bitbucket或GitLab仓库，实现基于Git触发的构建和部署。

这让您能轻松对接现有开发流程，零干扰地开启自动化商店发布与实时更新功能。

## 立即体验Appflow

Appflow已为众多消费级和企业级应用提供支持，服务用户数亿并产生显著商业影响。从财富500强到数千家中小企业，Appflow团队都有深入合作。

由于Appflow团队与Capacitor核心团队紧密协作，该平台针对Capacitor进行了深度优化。

现在即可免费开始使用Appflow，只需使用您可能已有的Ionic账户。访问[useappflow.com](https://useappflow.com/) 或查阅[文档](https://ionicframework.com/docs/v3/appflow) 了解更多运作细节。