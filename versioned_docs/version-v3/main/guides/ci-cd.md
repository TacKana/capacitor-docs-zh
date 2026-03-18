---
title: CI/CD
description: 为您的 Capacitor 应用开发流程添加移动端 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会采用 CI/CD 流程来进行持续测试、集成和交付。

遗憾的是，移动端带来了独特的 CI/CD 挑战。Web 开发者用于前端 CI/CD 的技术并不适用于移动端，因为构建和部署流程存在根本性差异。

## 前端基础 CI/CD

Capacitor 应用 CI/CD 的第一步，是为您的 _前端_ JavaScript 应用建立一个构建和测试流程。

如今这通常通过 GitHub Actions、CircleCI、Jenkins 等通用 CI/CD 服务来实现。在此流程中，应用被设置为在每次提交时进行构建，并通常会运行本地测试套件。这是典型的 JavaScript CI/CD 流程，您的团队可能已经熟悉了。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署其应用实际的移动端原生部分。

## 添加移动端 CI/CD

对于移动应用而言，仅仅构建和运行 JavaScript 应用的测试是远远不够的，因为您的应用有很大一部分需要作为原生 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式也与 Web 应用截然不同。Web 应用托管在可以快速更新的服务器上，而移动应用则“托管”在应用商店中，并以加密签名的二进制文件形式分发。更新流程非常不同。

这意味着我们需要一个能够进行原生移动构建和测试的服务，并且还需要提供一种以适合原生移动端的方式部署和更新我们的应用。

## Appflow：Capacitor 应用的移动端 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一种提供端到端移动端 CI/CD 的服务，它是 Capacitor 应用的官方移动端 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的托管式 iOS 和 Android 构建环境。它与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等流行的 Git 服务集成，支持在每次提交时触发 JavaScript 和原生移动端构建。Appflow 还支持将构建分到不同渠道，分别面向利益相关者、Beta 测试者和生产用户。此外，Appflow 可以自动将您的应用提交到应用商店作为自动化工作流的一部分，让您的团队无需管理复杂的原生 iOS 和 Android 构建堆栈。

对于 Capacitor 开发者，Appflow 还提供了向应用推送实时更新的能力，无需经过应用商店提交，只要这些更新位于应用的 JavaScript/HTML/CSS 层面。

欲了解更多详细信息，请参阅 [Appflow 文档](https://ionicframework.com/docs/v3/appflow)。

## 在传统 CI/CD 服务中使用 Appflow

Appflow 可以替代传统的 CI/CD 服务，因为它执行 Web/JavaScript 构建和原生移动端构建。然而，它也能与传统 CI/CD 服务良好协作。

要以这种方式使用它，可以通过 Webhook 在每次提交时将构建好的资源发送给 Appflow。

## 其他移动端 CI/CD 选项

还有其他移动端 CI/CD 服务，但都没有专注于 Capacitor。无论您偏好哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本质上是原生应用。但是，对于 Capacitor 应用的远程实时更新功能，[Appflow](https://ionic.io/appflow) 是目前唯一提供此特性的服务。