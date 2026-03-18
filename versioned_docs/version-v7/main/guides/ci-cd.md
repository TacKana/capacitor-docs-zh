---
title: CI/CD
description: 为您的 Capacitor 应用开发流程添加移动 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每一个严肃的应用都会采用 CI/CD 流程来进行持续的测试、集成和交付。

遗憾的是，移动端带来了独特的 CI/CD 挑战，Web 开发者用于前端 CI/CD 的技术并不适用于移动端，因为构建和部署流程截然不同。

## 前端的基础 CI/CD

Capacitor 应用 CI/CD 的第一步，是为您的 _前端_ JS 应用建立构建和测试流程。

如今，这通常通过 GitHub Actions、CircleCI、Jenkins 等通用 CI/CD 服务来实现。

在此流程中，应用被设置为在每次提交时进行构建，并通常运行本地测试套件。这是典型的 JS CI/CD 流程，您的团队可能已经熟悉了。

但这只是冰山一角，团队还需要搞清楚如何构建、测试和部署应用实际的本地移动端部分。

## 添加移动 CI/CD

仅仅构建和运行 JS 应用测试对于移动应用来说远远不够，因为您的应用大部分都需要作为原生的 iOS 和 Android 应用来构建和运行。

此外，移动应用的部署和更新方式与 Web 应用大不相同。Web 应用托管在可以快速更新的服务器上，而移动应用则"托管"在应用商店中，并以加密签名的二进制文件形式分发。更新流程非常不同。

这意味着我们需要一个能够进行原生移动构建和测试的服务，并且能以原生移动端适用的方式提供部署和更新应用的方法。

## Appflow：针对 Capacitor 应用的移动 CI/CD

提供端到端移动 CI/CD 的服务之一是 [Appflow](https://ionic.io/appflow)，它是 Capacitor 应用的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。它与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等流行的 git 服务集成，支持在每次提交时触发 JS 和原生移动构建。Appflow 还支持将构建分离到不同的渠道，供利益相关者、beta 测试者和生产用户使用。此外，Appflow 可以自动将您的应用提交到应用商店作为自动化工作流的一部分，并免去了团队管理复杂原生 iOS 和 Android 构建堆栈的需要。

对于 Capacitor 开发者，Appflow 还提供了向应用推送实时更新的能力，而无需提交到应用商店，只要这些更新是在应用的 JS/HTML/CSS 层即可。

更多详情，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

Appflow 可以替代传统的 CI/CD 服务，因为它执行 Web/JS 构建和原生移动构建。然而，它也能与传统 CI/CD 服务良好协作。

要以这种方式使用，可以通过 Webhook 在每次提交时将构建好的资源发送到 Appflow。

## 其他移动 CI/CD 选项

还有其他提供移动 CI/CD 的服务，不过没有专门针对 Capacitor 的。无论您偏好哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本质上就是原生应用。然而，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一提供此功能的服务。