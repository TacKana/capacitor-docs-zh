---
title: CI/CD
description: 为您的 Capacitor 应用开发流程添加移动 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会利用 CI/CD 流程进行持续测试、集成和交付。

不幸的是，移动开发带来了独特的 CI/CD 挑战，Web 开发人员用于前端 CI/CD 的技术不适用于移动端，因为构建和部署流程截然不同。

## 为你的前端配置基础 CI/CD

Capacitor 应用 CI/CD 的第一步是建立用于构建和测试你的 _前端_ JS 应用的流程。

如今，这通常通过使用通用 CI/CD 服务来实现，如 GitHub Actions、CircleCI、Jenkins 等。

在这个流程中，应用被设置为在每次提交时进行构建，并通常会运行一套本地测试。这是典型的 JS CI/CD 流程，你的团队可能已经熟悉它了。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署其应用的真正的原生移动端部分。

## 添加移动 CI/CD

仅仅构建和运行 JS 应用测试对于移动应用来说是远远不够的，因为你应用的大部分需要作为原生的 iOS 和 Android 应用来构建和运行。

此外，移动应用的部署和更新方式与 Web 应用非常不同。Web 应用托管在可以快速更新的服务器上，而移动应用则“托管”在应用商店中，并以加密签名的二进制文件形式分发。更新过程非常不同。

这意味着我们需要一个能够进行原生移动构建和测试的服务，并且还需要提供一种以适合原生移动应用的方式来部署和更新我们的应用。

## Appflow：Capacitor 应用的移动 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一种提供端到端移动 CI/CD 的服务，它是 Capacitor 应用的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的托管式 iOS 和 Android 构建环境。它与主流的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，支持在每次提交时触发 JS 和原生移动构建。Appflow 还支持将构建分离到不同的渠道，分别面向利益相关者、Beta 测试者和生产用户。此外，Appflow 可以自动将你的应用提交到应用商店，作为自动化工作流的一部分，无需你的团队管理复杂的原生 iOS 和 Android 构建堆栈。

对于 Capacitor 开发者，Appflow 还提供了向应用推送实时更新的能力，无需提交到应用商店，前提是这些更新仅限于应用的 JS/HTML/CSS 层。

更多详情，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将 Appflow 与传统 CI/CD 服务结合使用

Appflow 可以替代传统的 CI/CD 服务，因为它执行 Web/JS 构建和原生移动构建。然而，它与传统的 CI/CD 服务也能很好地协同工作。

要以这种方式使用它，可以利用 Webhooks 在每次提交时将构建好的资源发送给 Appflow。

## 其他移动 CI/CD 选项

还有其他移动 CI/CD 服务，但都没有专注于 Capacitor。无论你偏爱哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本质上就是原生应用。然而，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一提供此功能的服务。