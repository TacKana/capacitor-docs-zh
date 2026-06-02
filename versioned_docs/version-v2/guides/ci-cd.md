---
title: Capacitor 应用的 CI/CD
description: 在 Capacitor 应用开发流程中添加移动端 CI/CD
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会利用 CI/CD 流程进行持续测试、集成和交付。

不幸的是，移动端面临着独特的 CI/CD 挑战，Web 开发者用于前端 CI/CD 的相同技术不适用于移动端，因为构建和部署过程截然不同。

## 前端的基本 CI/CD

Capacitor 应用 CI/CD 的第一步是使用一个流程来构建和测试您的 _前端_ JS 应用。

目前通常使用通用的 CI/CD 服务来完成，如 GitHub Actions、CircleCI、Jenkins 等。

在此流程中，应用被设置为在每次提交时构建，并经常运行本地测试套件。这是典型的 JS CI/CD 流程，您的团队可能已经熟悉了。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署应用的实际原生移动端。

## 添加移动端 CI/CD

仅仅构建和运行 JS 应用测试对于移动应用来说远远不够，因为应用的很大一部分需要作为原生 iOS 和 Android 应用来构建和运行。

此外，移动应用的部署和更新方式与 Web 应用非常不同。Web 应用托管在可以快速更新的服务器上，而移动应用则"托管"在应用商店中，并以加密签名的二进制文件形式分发。更新过程截然不同。

这意味着我们需要一个能够进行原生移动构建和测试的服务，同时还能以适合原生移动的方式部署和更新我们的应用。

## Appflow：Capacitor 应用的移动端 CI/CD

提供端到端移动端 CI/CD 的一个服务是 [Appflow](https://ionic.io/appflow)，这是 Capacitor 应用的官方移动端 CI/CD 和移动端 DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。Appflow 与流行的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，支持在每次提交时触发 JS 和原生移动构建。Appflow 还支持将构建分离到不同的渠道，供利益相关者、beta 测试者和生产用户使用。此外，Appflow 可以自动将您的应用提交到应用商店，作为自动化工作流的一部分，并消除了您的团队管理复杂的原生 iOS 和 Android 构建栈的需求。

对于 Capacitor 开发者，Appflow 还提供了无需应用商店提交即可向应用推送实时更新的能力，只要这些更新位于应用的 JS/HTML/CSS 层。

有关更多详细信息，请参阅 [Appflow 文档](https://ionic.io/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 一起使用

Appflow 可以取代传统的 CI/CD 服务，因为它执行 Web/JS 构建和原生移动构建。但是，它与传统的 CI/CD 服务配合使用也非常出色。

要以这种方式使用它，请使用 webhooks 在每次提交时将构建好的资源发送到 Appflow。

## 其他移动端 CI/CD 选项

还有其他移动端 CI/CD 服务，但没有一个是专注于 Capacitor 的。无论您喜欢哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用就是原生应用。但是，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一提供此功能的服务。