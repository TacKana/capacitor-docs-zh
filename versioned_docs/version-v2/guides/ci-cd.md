---
title: Capacitor 应用的 CI/CD
description: 为 Capacitor 应用开发流程添加移动端持续集成与交付
contributors:
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/guides/ci-cd
---

# Capacitor 应用的持续集成与交付

每个严肃的应用都会采用 CI/CD（持续集成/持续交付）流程来进行自动化测试、集成和发布。

遗憾的是，移动端开发在 CI/CD 方面面临独特挑战，由于构建和发布流程存在本质差异，前端开发者熟悉的 Web CI/CD 方案并不适用于移动端。

## 前端基础 CI/CD 流程

为 Capacitor 应用实施 CI/CD 的第一步，是针对你的 _前端_ JavaScript 应用建立构建和测试流程。

目前通常采用 GitHub Actions、CircleCI、Jenkins 等通用 CI/CD 服务来实现。在此流程中，每次代码提交都会触发应用构建，并通常会运行本地测试套件。这是标准的 JavaScript CI/CD 流程，您的团队可能已经熟悉。

但这只是冰山一角，团队还需要解决如何构建、测试和发布实际原生移动应用的难题。

## 移动端 CI/CD 增强方案

对于移动应用而言，仅构建和运行 JavaScript 应用测试远远不够，因为应用的重要部分需要作为原生 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式与 Web 应用截然不同。Web 应用托管在可快速更新的服务器上，而移动应用则"托管"在应用商店中，以加密签名的二进制文件形式分发，更新机制完全不同。

这意味着我们需要能够执行原生移动构建和测试的服务，同时提供符合移动端特性的应用部署和更新方案。

## Appflow：专为 Capacitor 打造的移动 CI/CD 解决方案

[Appflow](https://ionic.io/appflow) 就是这样一款提供端到端移动 CI/CD 的服务，它是 Capacitor 应用官方的移动 CI/CD 和移动 DevOps 平台。

Appflow 提供定期更新的托管式 iOS 和 Android 构建环境。通过与 Azure DevOps、GitLab、GitHub 和 Bitbucket 等主流 Git 服务集成，Appflow 支持在每次提交时触发 JavaScript 和原生移动构建。它还支持将构建分发到不同渠道，分别面向利益相关者、Beta 测试用户和生产环境用户。此外，Appflow 能自动将应用提交到应用商店作为工作流的一部分，让团队无需管理复杂的原生 iOS 和 Android 构建环境。

对于 Capacitor 开发者，Appflow 还支持在无需提交应用商店的情况下，实时推送仅涉及 JavaScript/HTML/CSS 层的应用更新。

详情请参阅 [Appflow 文档](https://ionic.io/docs/appflow)。

## 结合传统 CI/CD 服务使用 Appflow

虽然 Appflow 可以替代传统 CI/CD 服务（因为它同时处理 Web/JavaScript 构建和原生移动构建），但它与传统 CI/CD 服务也能完美配合。

这种模式下，您可以通过 webhook 在每次提交时将构建产物发送至 Appflow。

## 其他移动 CI/CD 选项

市场上还有其他移动 CI/CD 服务，但都没有专门针对 Capacitor 优化。无论您偏好哪种 CI/CD 服务，由于 Capacitor 应用本质上是原生应用，都能与之集成。但需要注意的是，要实现 Capacitor 应用的远程实时更新，目前只有 [Appflow](https://ionic.io/appflow) 提供此功能。