---
title: CI/CD
description: 为 Capacitor 应用开发流程添加移动端持续集成/持续部署
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD 实践

任何成熟的应用程序都会采用 CI/CD（持续集成/持续部署）流程来实现自动化测试、集成和交付。

但移动端开发面临着独特的 CI/CD 挑战，与传统前端开发使用的技术方案不同——因为移动端的构建和发布流程存在本质差异。

## 前端基础 CI/CD 流程

Capacitor 应用 CI/CD 的第一步是针对 _前端_ JavaScript 应用建立构建和测试流程。

当前通常使用 GitHub Actions、CircleCI、Jenkins 等通用 CI/CD 服务来实现。这类流程会在每次代码提交时触发构建，并运行本地测试套件。这是典型的 JavaScript CI/CD 流程，开发团队通常已具备相关经验。

但这只是冰山一角，团队还需要解决移动原生端的构建、测试和发布问题。

## 集成移动端 CI/CD

对于移动应用而言，仅构建和运行 JavaScript 测试远远不够，因为应用的核心部分需要作为原生 iOS 和 Android 应用来构建运行。

此外，移动应用的发布和更新方式与网页应用截然不同。网页应用部署在可快速更新的服务器上，而移动应用则通过应用商店分发经过加密签名的二进制包，更新机制完全不同。

这意味着我们需要能够执行原生移动端构建测试的服务，同时提供符合移动端特性的发布更新方案。

## Appflow：专为 Capacitor 打造的移动 CI/CD 平台

[Appflow](https://ionic.io/appflow) 作为官方推荐的移动 CI/CD 和 DevOps 平台，为 Capacitor 应用提供端到端的解决方案。

Appflow 提供定期维护的 iOS 和 Android 构建环境，与 Azure DevOps、GitLab、GitHub、Bitbucket 等主流 git 服务集成，支持在每次提交时触发 JavaScript 和原生移动端构建。它还能将构建产物分发到不同渠道（供利益相关方、测试用户和生产环境使用），并支持将应用自动提交到应用商店，省去维护复杂原生构建工具链的麻烦。

对于 Capacitor 开发者，Appflow 还提供无需应用商店审核的实时更新能力（仅限应用中的 JS/HTML/CSS 层）。

详见 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 传统 CI/CD 服务与 Appflow 协同方案

虽然 Appflow 可以完全替代传统 CI/CD 服务（同时处理 Web/JS 构建和移动端构建），但它也能与传统服务完美配合。

在这种混合方案中，可以通过 webhook 在每次提交时将构建产物推送给 Appflow。

## 其他移动 CI/CD 替代方案

市场上虽存在其他移动 CI/CD 服务，但都非专门为 Capacitor 设计。无论选择哪种服务，Capacitor 应用都能与之集成（因为本质仍是原生应用）。但就远程实时更新功能而言，目前仅 [Appflow](https://ionic.io/appflow) 提供此特性。