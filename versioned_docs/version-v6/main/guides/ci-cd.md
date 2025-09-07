---
title: CI/CD
description: 为你的Capacitor应用开发流程添加移动端持续集成/持续交付支持
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor应用的持续集成与交付

任何成熟的应用程序都会采用CI/CD（持续集成/持续交付）流程来进行自动化测试、集成和发布。

但移动端开发面临着独特的CI/CD挑战，网页前端开发者惯用的CI/CD技术并不适用于移动端，因为两者的构建和发布流程存在根本差异。

## 前端基础CI/CD流程

实施Capacitor应用CI/CD的第一步，是建立前端JavaScript应用的构建与测试流程。

目前通常使用GitHub Actions、CircleCI、Jenkins等通用CI/CD服务来实现。这套流程会在每次代码提交时触发应用构建，并运行本地测试套件。这是典型的JavaScript CI/CD流程，开发团队大多已熟悉这套模式。

但这只是冰山一角，团队还需要解决原生移动端的构建、测试和发布问题。

## 引入移动端CI/CD支持

对于移动应用而言，仅完成JS应用的构建测试远远不够——你的应用有相当部分需要作为原生iOS和Android应用来构建运行。

此外，移动应用的发布和更新机制与网页应用截然不同。网页应用部署在可快速更新的服务器上，而移动应用则"托管"在应用商店中，以加密签名的二进制包形式分发，其更新机制也大相径庭。

这意味着我们需要能够执行原生移动构建测试的服务，同时提供符合移动特性的部署更新方案。

## Appflow：专为Capacitor打造的移动CI/CD

[Appflow](https://ionic.io/appflow)就是这样一款提供端到端移动CI/CD的服务，它是Capacitor应用的官方移动持续集成与DevOps平台。

Appflow提供定期更新的托管式iOS/Android构建环境，支持与Azure DevOps、GitLab、GitHub、Bitbucket等主流Git服务集成，能够在每次提交时触发JS和原生移动构建。它还能将构建产物分发到不同渠道（如利益相关方、测试用户、生产环境），并支持自动化提交应用到商店，省去了团队维护复杂原生构建环境的烦恼。

对Capacitor开发者而言，Appflow还具备实时推送更新的能力——只要修改限于应用的JS/HTML/CSS层面，就无需经过应用商店审核。

详见[Appflow官方文档](https://ionicframework.com/docs/appflow)。

## 传统CI/CD服务与Appflow的结合方案

虽然Appflow可以完全替代传统CI/CD服务（同时处理网页和原生构建），但它也能与传统服务协同工作。实现方式是：通过webhook在每次提交时将构建产物推送给Appflow。

## 其他移动CI/CD方案

市场虽存在其他移动CI/CD服务，但都非专为Capacitor设计。无论选择哪种服务，Capacitor都能与之集成——毕竟Capacitor应用本质就是原生应用。但若需要远程实时更新功能，目前仅有[Appflow](https://ionic.io/appflow)提供这项服务。