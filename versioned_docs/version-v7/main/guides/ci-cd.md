---
title: CI/CD
description: 将移动端 CI/CD 添加到你的 Capacitor 应用开发流程
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会利用 CI/CD 流程进行持续测试、集成和交付。

不幸的是，移动端带来了独特的 CI/CD 挑战，Web 开发者用于前端 CI/CD 的技术不适用于移动端，因为构建和部署流程截然不同。

## 前端的基本 CI/CD

Capacitor 应用 CI/CD 的第一步是使用一个流程来构建和测试你的_前端_ JS 应用。

这通常使用通用的 CI/CD 服务来完成，如 GitHub Actions、CircleCI、Jenkins 等。

在此流程中，应用设置为在每次提交时构建并通常运行本地测试套件。这是典型的 JS CI/CD 流程，你的团队可能已经熟悉它。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署其应用的实际原生移动端部分。

## 添加移动端 CI/CD

仅仅构建和运行 JS 应用测试对于移动应用来说是远远不够的，因为你的应用很大一部分需要作为原生 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式与 Web 应用非常不同。Web 应用托管在可以快速更新的服务器上，而移动应用则"托管"在应用商店中，并作为经过加密签名的二进制文件分发。更新过程非常不同。

这意味着我们需要一个能够执行原生移动端构建和测试的服务，并且能够以适合原生移动端的方式部署和更新我们的应用。

## Appflow：Capacitor 应用的移动端 CI/CD

提供端到端移动端 CI/CD 的一个服务是 [Appflow](https://ionic.io/appflow)，它是 Capacitor 应用的官方移动端 CI/CD 和移动端 DevOps 平台。

Appflow 提供频繁更新的、托管的 iOS 和 Android 构建环境。Appflow 与流行的 Git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，以支持在每次提交时触发 JS 和原生移动端构建。Appflow 还支持将构建分发到不同的渠道，供利益相关者、Beta 测试人员和生产用户使用。此外，作为自动化工作流的一部分，Appflow 可以自动将你的应用提交到应用商店，并消除了你的团队管理复杂的原生 iOS 和 Android 构建堆栈的需要。

对于 Capacitor 开发者，Appflow 还提供无需应用商店提交即可向应用推送实时更新的功能，只要这些更新位于应用的 JS/HTML/CSS 层面。

有关更多详情，请参见 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 一起使用

Appflow 可以取代传统的 CI/CD 服务，因为它执行 Web/JS 构建和原生移动端构建。但是，它与传统的 CI/CD 服务配合使用也非常好。

要以这种方式使用它，请使用 Webhook 在每次提交时将构建后的资产发送到 Appflow。

## 其他移动端 CI/CD 选项

还有其他移动端 CI/CD 服务，但没有一个专注于 Capacitor。无论你喜欢哪个 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用就是原生应用。但是，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一具有此功能的服务。
