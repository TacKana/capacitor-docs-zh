---
title: CI/CD
description: 为您的 Capacitor 应用开发流程添加移动 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个成熟的应用都会采用 CI/CD 流程来实现持续测试、集成和交付。

遗憾的是，移动开发带来了独特的 CI/CD 挑战。由于构建和部署过程截然不同，web 开发者用于前端 CI/CD 的相同技术并不适用于移动端。

## 前端基础 CI/CD

Capacitor 应用 CI/CD 的第一步，是为您的 *前端* JS 应用建立一个构建和测试流程。

当前通常使用通用 CI/CD 服务来实现，例如 GitHub Actions、CircleCI、Jenkins 等。

在此流程中，应用被设置为在每次提交时进行构建，并通常运行本地测试套件。这是典型的 JS CI/CD 流程，您的团队可能已经熟悉它。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署其应用实际的原生移动端部分。

## 添加移动 CI/CD

对于移动应用来说，仅仅构建和运行 JS 应用测试是远远不够的，因为您的应用有很大一部分需要作为原生 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式与 web 应用大不相同。web 应用托管在服务器上，可以快速更新；而移动应用则“托管”在应用商店中，并以加密签名的二进制文件形式分发。更新过程完全不同。

这意味着我们需要一个能够执行原生移动构建和测试的服务，同时也需要提供一种以原生移动端适用的方式来部署和更新我们的应用。

## Appflow：Capacitor 应用的移动 CI/CD

[Appflow](https://ionic.io/appflow) 就是一个提供端到端移动 CI/CD 的服务，它是 Capacitor 应用的官方移动 CI/CD 和 Mobile DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。Appflow 与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等主流 git 服务集成，支持在每次提交时触发 JS 和原生移动构建。Appflow 还支持将构建分发到不同的渠道，分别面向利益相关者、Beta 测试者和生产环境用户。此外，Appflow 可以将自动提交应用到应用商店作为自动化工作流的一部分，从而无需您的团队管理复杂的原生 iOS 和 Android 构建堆栈。

对于 Capacitor 开发者，只要更新内容位于应用的 JS/HTML/CSS 层，Appflow 还提供了无需提交到应用商店即可向应用推送实时更新的能力。

更多详情，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

由于 Appflow 可以执行 web/JS 构建和原生移动构建，因此它可以替代传统的 CI/CD 服务。不过，它也能与传统 CI/CD 服务很好地协同工作。

要以这种方式使用，可以通过 webhook 在每次提交时将构建好的资源发送到 Appflow。

## 其他移动 CI/CD 选项

还有其他移动 CI/CD 服务可供选择，不过没有专门针对 Capacitor 的。无论您偏好哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本身就是原生应用。然而，对于 Capacitor 应用的远程实时更新功能，[Appflow](https://ionic.io/appflow) 是唯一提供此特性的服务。