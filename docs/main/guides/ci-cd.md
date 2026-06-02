---
title: CI/CD
description: 为你的 Capacitor 应用开发流程添加移动端 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个正式应用都会利用 CI/CD 流程来实现持续测试、集成和交付。

不幸的是，移动端带来了独特的 CI/CD 挑战，前端开发者使用的相同技术并不适用于移动端，因为构建和部署流程有着根本性的不同。

## 前端的基本 CI/CD

Capacitor 应用 CI/CD 的第一步，是使用一个流程来构建和测试你的_前端_ JS 应用。

目前通常使用通用的 CI/CD 服务（如 GitHub Actions、CircleCI、Jenkins 等）来完成此流程。

在这个过程中，应用会在每次提交时进行构建，并通常会运行本地测试套件。这是典型的 JS CI/CD 流程，你的团队可能已经很熟悉了。

但这只是冰山一角，团队还需要弄明白如何构建、测试和部署应用的原生移动端部分。

## 添加移动端 CI/CD

仅构建和运行 JS 应用测试对于移动应用来说远远不够，因为应用的大部分内容需要作为原生 iOS 和 Android 应用来构建和运行。

此外，移动应用的部署和更新方式与 Web 应用截然不同。Web 应用托管在可以快速更新的服务器上，而移动应用则托管在应用商店中，并以经过加密签名的二进制文件形式分发。更新过程非常不同。

这意味着我们需要一个能够执行原生移动端构建和测试，同时也能以合适的原生移动方式部署和更新应用的服务。

## Appflow：Capacitor 应用的移动端 CI/CD

提供端到端移动端 CI/CD 的一个服务是 [Appflow](https://ionic.io/appflow)，这是 Capacitor 应用的官方移动端 CI/CD 和移动端 DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。Appflow 与流行的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，支持在每次提交时触发 JS 和原生移动端构建。Appflow 还支持将构建分发给不同的渠道，供利益相关者、Beta 测试人员和正式用户使用。此外，Appflow 可以在自动化工作流中自动将你的应用提交到应用商店，并且无需你的团队管理复杂的原生 iOS 和 Android 构建栈。

对于 Capacitor 开发者，Appflow 还提供了无需提交应用商店即可向应用推送实时更新的能力，只要这些更新位于应用的 JS/HTML/CSS 层即可。

更多详情，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

Appflow 可以取代传统的 CI/CD 服务，因为它同时执行 Web/JS 构建和原生移动端构建。不过，它也能很好地与传统的 CI/CD 服务配合使用。

要以这种方式使用，请使用 webhook 在每次提交时将构建产物发送到 Appflow。

## 其他移动端 CI/CD 选项

还有其他移动端 CI/CD 服务，但没有一个是专门针对 Capacitor 的。无论你青睐哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用本身就是原生应用。不过，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一具备此功能的服务。
