---
title: 应用部署与更新
description: 实时远程更新您的Capacitor应用，即使通过应用商店也能实现
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后阶段包含将应用发布到应用商店，以及后续的持续更新。

Web Native移动开发方法的核心优势之一，就是能够以符合应用商店规范的方式实现实时更新——只要这些变更不涉及二进制更新（即需要重新编译的原生功能）。

此外，由于大多数Capacitor开发者需要同时面向iOS、Android和Web平台，手动向每个应用商店提交应用更新和二进制版本会带来不必要的繁琐工作。

为了简化应用商店发布和长期维护流程，Capacitor背后的公司Ionic提供了强大的移动开发运维平台[Appflow](https://useappflow.com/)。

## 使用Appflow实现自动化应用商店发布

Appflow为Capacitor开发者提供了多项显著提升效率的功能。其中最引人注目的是能够直接向Apple App Store和Google Play Store发布应用。所有套餐都包含每月一定次数的部署额度，更高阶套餐还支持扩展部署限额并实现完全自动化发布流程。

## 通过Appflow实现实时更新

除了应用商店发布功能外，开发者还能利用Appflow的实时部署功能，在应用整个生命周期内推送即时更新。

实时更新的原理基于Capacitor应用本质上是通过原生接口增强的Web应用。苹果和谷歌明确允许应用内的Web内容更新，因此该功能完全符合应用商店政策，为移动开发团队提供了前所未有的敏捷性。

## 无缝集成GitHub、Bitbucket和GitLab

Appflow可直接连接GitHub、Bitbucket或GitLab代码库，实现基于Git触发的构建和部署。

这让您可以轻松对接现有开发流程，在不干扰现有工作的情况下立即启用自动化应用商店发布和实时更新功能。

## 立即体验Appflow

Appflow已为数亿用户的企业级应用和消费级应用提供支持，产生了显著的商业价值。从财富500强企业到数千家中型公司，都在使用Appflow的服务。

由于Appflow团队与Capacitor核心团队紧密合作，Appflow针对Capacitor进行了深度优化，能提供最佳的使用体验。

Appflow提供免费入门套餐，您可以使用已有的Ionic账户直接登录。访问[useappflow.com](https://useappflow.com/)即刻开始，或查阅[官方文档](https://ionicframework.com/docs/appflow)了解更多技术细节。