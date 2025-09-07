---
title: CI/CD
description: 为你的Capacitor应用开发流程添加移动端CI/CD支持
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor应用的CI/CD实践

任何正规的移动应用都会采用CI/CD（持续集成/持续交付）流程来进行自动化测试、集成和交付。

然而，移动开发面临独特的CI/CD挑战。由于构建和部署流程存在根本性差异，前端开发者熟悉的Web CI/CD方案并不适用于移动应用。

## 前端基础CI/CD流程

Capacitor应用CI/CD的第一步是针对前端JavaScript应用建立构建和测试流程。

目前常见的实现方式是使用GitHub Actions、CircleCI、Jenkins等通用CI/CD服务。该流程通常会在每次代码提交时触发应用构建，并运行本地测试套件。这是典型的JavaScript CI/CD流程，相信开发团队已经非常熟悉。

但这仅仅是开始，团队还需要解决原生移动端的构建、测试和发布问题。

## 移动端CI/CD集成

对于移动应用而言，仅构建和运行JavaScript测试是远远不够的，因为应用的核心部分需要作为原生iOS和Android应用进行构建运行。

此外，移动应用的发布和更新机制与Web应用截然不同。Web应用可以快速更新服务器端代码，而移动应用则需要通过应用商店分发经过加密签名的二进制包，更新流程复杂得多。

这意味着我们需要能执行原生移动构建和测试的服务，同时提供符合移动特性的部署更新方案。

## Appflow：专为Capacitor打造的移动CI/CD

[Appflow](https://ionic.io/appflow)正是这样一个提供端到端移动CI/CD的服务，它是Capacitor应用官方的移动CI/CD和DevOps平台。

Appflow提供定期更新的托管式iOS和Android构建环境，支持与Azure DevOps、GitLab、GitHub和Bitbucket等主流git服务集成，可在每次提交时触发JavaScript和原生移动构建。它还能将构建产物分发至不同渠道（如利益相关方、测试用户和生产环境），并支持自动化提交应用到应用商店，免除团队维护复杂原生构建环境的烦恼。

对于Capacitor开发者，Appflow还提供无需应用商店审核的实时更新能力（仅限JS/HTML/CSS层面的更新）。

详见[Appflow文档](https://ionicframework.com/docs/v3/appflow)。

## 与传统CI/CD服务协同使用

虽然Appflow可以替代传统CI/CD服务（同时处理Web和移动构建），但它与传统CI/CD服务也能完美协同。实现方式是通过Webhook在每次提交时将构建产物推送至Appflow。

## 其他移动CI/CD选择

市场上还有其他移动CI/CD服务，但都不是专为Capacitor设计。无论选择哪种CI/CD服务，Capacator都能集成其中——毕竟Capacitor应用本质就是原生应用。但若需要远程实时更新Capacitor应用的功能，目前只有[Appflow](https://ionic.io/appflow)提供此特性。