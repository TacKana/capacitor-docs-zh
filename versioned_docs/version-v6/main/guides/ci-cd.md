---
title: CI/CD
description: 为您的 Capacitor 应用程序开发流程添加移动端 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用程序的 CI/CD

每个严肃的应用程序都会采用 CI/CD（持续集成/持续交付）流程来进行持续测试、集成和交付。

遗憾的是，移动开发带来了独特的 CI/CD 挑战。Web 开发者用于前端 CI/CD 的技术并不适用于移动端，因为两者的构建和部署流程截然不同。

## 前端的基础 CI/CD

Capacitor 应用程序 CI/CD 的第一步是为您的_前端_ JavaScript 应用程序建立构建和测试流程。

如今，这通常通过通用的 CI/CD 服务来实现，例如 GitHub Actions、CircleCI、Jenkins 等。

在此流程中，应用程序被设置为每次提交时自动构建，并通常运行本地测试套件。这是典型的 JavaScript CI/CD 流程，您的团队可能已经对此很熟悉了。

但这只是冰山一角，团队还需要弄清楚如何构建、测试和部署应用程序的实际原生移动端部分。

## 添加移动端 CI/CD

对于移动应用程序来说，仅仅构建和运行 JavaScript 应用程序测试是远远不够的，因为您的应用程序有很大一部分需要作为原生的 iOS 和 Android 应用程序来构建和运行。

此外，移动应用程序的部署和更新方式与 Web 应用程序非常不同。Web 应用程序通常托管在可快速更新的服务器上，而移动应用程序则“托管”在应用商店中，并以加密签名的二进制文件形式分发。更新流程也大不相同。

这意味着我们需要一个能够进行原生移动构建和测试的服务，同时还要提供一种以适合原生移动端的方式部署和更新应用程序的方法。

## Appflow：Capacitor 应用程序的移动端 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一个提供端到端移动 CI/CD 的服务，它是 Capacitor 应用程序的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新、受管理的 iOS 和 Android 构建环境。Appflow 与主流的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，支持在每次提交时触发 JavaScript 和原生移动构建。Appflow 还支持将构建按渠道分离，分别面向利益相关者、Beta 测试者和生产用户。此外，Appflow 可以自动将您的应用程序提交到应用商店，作为自动化工作流的一部分，从而免去了团队管理复杂原生 iOS 和 Android 构建栈的需要。

对于 Capacitor 开发者，Appflow 还提供了向应用程序推送实时更新的能力，无需通过应用商店提交，只要这些更新位于应用程序的 JavaScript/HTML/CSS 层。

欲了解更多详情，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

Appflow 可以替代传统的 CI/CD 服务，因为它同时执行 Web/JavaScript 构建和原生移动构建。当然，它也能与传统 CI/CD 服务完美配合使用。

要以此方式使用，可以利用 webhook 在每次提交时将构建好的资源发送给 Appflow。

## 其他移动 CI/CD 选项

虽然还有其他提供移动 CI/CD 的服务，但没有一个是专门针对 Capacitor 的。无论您偏好哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用程序本身就是原生应用程序。但是，对于 Capacitor 应用程序的远程实时更新功能，[Appflow](https://ionic.io/appflow) 是唯一提供此特性的服务。