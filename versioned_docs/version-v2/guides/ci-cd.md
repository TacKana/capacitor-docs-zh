---
title: CI/CD for Capacitor Apps
description: 为你的 Capacitor 应用开发流程添加移动端 CI/CD
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会采用 CI/CD（持续集成/持续部署）流程来进行持续的测试、集成和交付。

遗憾的是，移动开发带来了独特的 CI/CD 挑战。由于构建和部署流程截然不同，web 开发者用于前端 CI/CD 的相同技术并不适用于移动端。

## 为你的前端配置基础 CI/CD

为 Capacitor 应用实施 CI/CD 的第一步，是为你的 _前端_ JavaScript 应用建立一个构建和测试流程。

目前，这通常通过使用 GitHub Actions、CircleCI、Jenkins 等通用的 CI/CD 服务来实现。

在这个过程中，应用被设置为在每次提交时进行构建，并通常运行一套本地测试。这是典型的 JavaScript CI/CD 流程，你的团队很可能已经对此很熟悉。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署他们应用中实际的、原生的移动端部分。

## 添加移动端 CI/CD

对于移动应用来说，仅仅构建和运行 JavaScript 应用测试是远远不够的，因为你的应用有很大一部分需要作为原生的 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式也与 Web 应用大不相同。Web 应用托管在服务器上，可以快速更新；而移动应用则"托管"在应用商店中，并以经过加密签名的二进制文件形式分发。更新过程非常不同。

这意味着我们需要一个能够进行原生移动端构建和测试的服务，并且还需要提供一种以适合原生移动端的方式来部署和更新我们的应用。

## Appflow：专为 Capacitor 应用打造的移动 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一项提供端到端移动 CI/CD 的服务，它是 Capacitor 应用的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新、受管理的 iOS 和 Android 构建环境。它与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等流行的 Git 服务集成，支持在每次提交时触发 JavaScript 和原生移动构建。Appflow 还支持将构建分离到不同的渠道，面向利益相关者、Beta 测试者和生产用户。此外，Appflow 可以自动将你的应用提交到应用商店，作为自动化工作流的一部分，使你的团队无需管理复杂的原生 iOS 和 Android 构建技术栈。

对于 Capacitor 开发者，Appflow 还提供了向应用推送实时更新的能力，而无需提交到应用商店，只要这些更新属于应用的 JavaScript/HTML/CSS 层面。

更多详细信息，请参阅 [Appflow 文档](https://ionic.io/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

Appflow 既可以执行 Web/JavaScript 构建，也可以执行原生移动构建，因此它可以替代传统的 CI/CD 服务。不过，它也能与传统 CI/CD 服务很好地协同工作。

要以这种方式使用它，可以使用 Webhook 在每次提交时将构建好的资产发送给 Appflow。

## 其他移动 CI/CD 选项

还有其他用于移动 CI/CD 的服务，不过没有专门针对 Capacitor 的。无论你偏爱哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本质上就是原生应用。然而，对于 Capacitor 应用的远程实时更新功能，[Appflow](https://ionic.io/appflow) 是唯一提供此特性的服务。