---
title: Deploying Realtime Updates
description: 实时远程更新您的Capacitor应用，即使通过应用商店也能实现
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一步是将您的应用发布到应用商店，并保持持续更新。

基于Web Native的移动开发方法有一个关键优势：只要变更不涉及二进制更新（即需要重新编译的原生功能），就能以应用商店兼容的方式实现应用实时更新。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android（以及Web）平台，手动向每个商店发布应用和二进制更新显得格外繁琐。

为了简化应用商店发布和长期维护流程，Capacitor背后的公司Ionic提供了一套强大的移动DevOps平台——[Appflow](https://useappflow.com/)。

## 使用Appflow自动化应用商店发布

Appflow为Capacitor开发者提供了多项省时功能，其中最引人注目的就是支持直接发布应用到Apple App Store和Google Play商店。所有套餐都包含每月若干次部署额度，高级套餐更可扩展部署限制并支持完全自动化流程。

## 通过Appflow实现实时更新

结合应用商店发布功能，开发者可以在应用生命周期内使用Appflow的实时部署功能推送更新。该功能的原理在于：Capacitor应用本质上是通过原生接口扩展的网页应用，而苹果和谷歌明确允许更新应用的网页内容，因此该特性完全兼容应用商店规范，为移动团队提供了前所未有的敏捷性。

## 无缝对接GitHub、Bitbucket和GitLab

Appflow可直接连接GitHub、Bitbucket或GitLab代码库，实现基于Git触发的构建和部署。这让您能轻松整合现有开发流程，在不影响现有工作的情况下开启自动化商店发布和实时更新功能。

## 立即体验Appflow

Appflow已为众多主流消费级和企业级应用提供支持，服务用户数亿并产生显著商业价值。从财富500强到数千家中小型企业，Appflow团队都有深度合作经验。

由于Appflow团队与Capacitor团队紧密协作，Appflow针对Capacitor进行了全面优化。现在即可免费开始使用，只需登录您可能已有的Ionic账户。访问[useappflow.com](https://useappflow.com/) 或查阅[文档](https://ionicframework.com/docs/appflow) 了解更多运作细节。