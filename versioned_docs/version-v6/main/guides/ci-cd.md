---
title: CI/CD
description: 在 Capacitor 应用开发过程中添加移动 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会利用 CI/CD 流程进行持续测试、集成和交付。

不幸的是，移动端带来了独特的 CI/CD 挑战，Web 开发者用于前端 CI/CD 的相同技术不适用于移动端，因为构建和部署过程根本不同。

## 前端的基本 CI/CD

Capacitor 应用的 CI/CD 第一步是使用一个流程来构建和测试您的_前端_ JS 应用。

如今，通常使用通用的 CI/CD 服务（如 GitHub Actions、CircleCI、Jenkins 等）来完成此操作。

在此流程中，应用被设置为在每个提交时构建，并且通常运行本地测试套件。这是典型的 JS CI/CD 流程，您的团队可能已经很熟悉了。

但这只是冰山一角，因为团队需要弄清楚如何构建、测试和部署应用的实际原生移动端部分。

## 添加移动 CI/CD

对于移动应用来说，仅构建和运行 JS 应用测试是远远不够的，因为应用的大部分需要构建并作为原生 iOS 和 Android 应用运行。

此外，移动应用的部署和更新方式与 Web 应用非常不同。Web 应用托管在可以快速更新的服务器上，而移动应用则"托管"在应用商店中，并作为加密签名的二进制文件分发。更新过程非常不同。

这意味着我们需要一个能够执行原生移动构建和测试的服务，并且还能以适合原生移动的方式提供部署和更新应用的方法。

## Appflow：Capacitor 应用的移动 CI/CD

提供端到端移动 CI/CD 的一个此类服务是 [Appflow](https://ionic.io/appflow)，这是 Capacitor 应用的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。Appflow 与流行的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，以支持在每个提交时触发 JS 和原生移动构建。Appflow 还支持将构建分离到不同的渠道，用于利益相关者、Beta 测试人员和正式用户。此外，Appflow 可以作为自动化工作流的一部分自动将您的应用提交到应用商店，并消除了您的团队管理复杂的原生 iOS 和 Android 构建栈的需要。

对于 Capacitor 开发者，Appflow 还提供在无需提交应用商店的情况下向应用推送实时更新的能力，只要这些更新在应用的 JS/HTML/CSS 层。

有关更多详细信息，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统的 CI/CD 服务与 Appflow 一起使用

Appflow 可以替代传统的 CI/CD 服务，因为它执行 Web/JS 构建和原生移动构建。但是，它也可以与传统的 CI/CD 服务很好地配合使用。

要以这种方式使用，请使用 webhook 在每个提交时将构建的资产发送到 Appflow。

## 其他移动 CI/CD 选项

还有其他移动 CI/CD 服务，但没有一个专注于 Capacitor。无论您喜欢哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用就是原生应用。然而，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一具有此功能的服务。
