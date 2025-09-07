---
title: CI/CD
description: 为您的 Capacitor 应用开发流程添加移动端持续集成/持续交付
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的持续集成与交付

每个成熟的应用程序都会采用 CI/CD（持续集成/持续交付）流程来进行持续测试、集成和发布。

然而移动开发在 CI/CD 方面存在独特挑战，Web 开发者用于前端 CI/CD 的技术方案无法直接应用于移动端，因为两者的构建和部署流程存在根本差异。

## 前端基础 CI/CD 流程

Capacitor 应用 CI/CD 的第一步是针对 _前端_ JavaScript 应用建立构建和测试流程。

目前通常使用 GitHub Actions、CircleCI、Jenkins 等通用 CI/CD 服务来实现。该流程会在每次代码提交时触发应用构建，并运行本地测试套件。这是典型的 JavaScript CI/CD 流程，您的团队应该已经熟悉。

但这只是冰山一角，团队还需要解决如何构建、测试和部署真正的原生移动应用。

## 移动端 CI/CD 进阶

对于移动应用而言，仅构建和运行 JavaScript 测试是远远不够的，因为应用的重要部分需要作为原生 iOS 和 Android 应用来构建运行。

此外，移动应用的部署和更新方式与 Web 应用截然不同。Web 应用可以托管在可快速更新的服务器上，而移动应用则通过应用商店"托管"，并以加密签名的二进制文件形式分发，更新机制完全不同。

这意味着我们需要一个能执行原生移动构建测试的服务，同时提供符合移动特性的部署更新方案。

## Appflow：专为 Capacitor 打造的移动 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一款端到端的移动 CI/CD 服务，它是 Capacitor 应用的官方移动 CI/CD 和 DevOps 平台。

Appflow 提供定期更新的托管式 iOS 和 Android 构建环境，与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等主流 Git 服务集成，支持在每次提交时触发 JavaScript 和原生移动构建。Appflow 还能将构建版本分流至不同渠道，分别面向利益相关者、测试用户和正式用户。此外，Appflow 可自动将应用提交至应用商店作为工作流的一部分，让团队无需维护复杂的原生 iOS/Android 构建环境。

对于 Capacitor 开发者，Appflow 还支持在无需提交应用商店的情况下，对应用的 JS/HTML/CSS 层进行实时更新推送。

详见 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 与传统 CI/CD 服务协同使用

Appflow 既能执行 Web/JavaScript 构建也能处理原生移动构建，因此可以替代传统 CI/CD 服务，但二者也能完美协同工作。

具体实现方式是：通过 webhook 在每次提交时将构建产物发送至 Appflow。

## 其他移动 CI/CD 方案

市场上还有其他移动 CI/CD 服务，但都没有专门针对 Capacitor 优化。由于 Capacitor 应用本质就是原生应用，因此可以与任何 CI/CD 服务集成。但若需要 Capacitor 应用的远程实时更新功能，目前只有 [Appflow](https://ionic.io/appflow) 提供该特性。