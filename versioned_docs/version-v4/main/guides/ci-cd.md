---
title: CI/CD
description: 为您的Capacitor应用开发流程添加移动端CI/CD支持
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor应用的CI/CD实践

任何专业的应用开发都需要采用CI/CD（持续集成/持续交付）流程来进行自动化测试、集成和发布。

遗憾的是，移动应用开发在CI/CD方面面临着独特的挑战。Web开发者熟悉的前端CI/CD技术并不适用于移动端，因为两者的构建和发布流程存在根本性差异。

## 前端基础CI/CD流程

实施Capacitor应用CI/CD的第一步，是为您的前端JavaScript应用建立构建和测试流程。

目前通常使用GitHub Actions、CircleCI、Jenkins等通用CI/CD服务来实现。在这个流程中，每次代码提交都会触发应用构建，并经常伴随本地测试套件的执行。这是典型的JavaScript CI/CD流程，您的团队可能已经对此十分熟悉。

但这仅仅是冰山一角，团队还需要解决如何构建、测试和部署实际原生移动应用的难题。

## 引入移动端CI/CD

对于移动应用而言，仅构建和运行JavaScript应用测试远远不够，因为应用的核心部分需要作为原生iOS和Android应用进行构建和运行。

此外，移动应用的部署和更新方式与Web应用截然不同。Web应用托管在服务器上可以快速更新，而移动应用则通过应用商店分发，采用加密签名的二进制形式。"更新"这个概念在移动端有着完全不同的含义。

这意味着我们需要能够执行原生移动构建和测试的服务，同时还需要提供符合移动特性的应用部署和更新方案。

## Appflow：专为Capacitor打造的移动CI/CD

[Appflow](https://ionic.io/appflow)就是这样一款提供端到端移动CI/CD的服务，它是Capacitor应用的官方移动CI/CD和DevOps平台。

Appflow提供定期更新的托管式iOS和Android构建环境。通过与Azure DevOps、GitLab、GitHub和Bitbucket等主流Git服务集成，支持在每次提交时触发JavaScript和原生移动构建。Appflow还支持将构建分发到不同渠道，面向利益相关者、beta测试者和生产用户。此外，Appflow能自动将应用提交至应用商店作为工作流的一部分，让团队无需管理复杂的原生构建环境。

对于Capacitor开发者，Appflow还提供了一项独特能力：只要更新内容属于应用的JS/HTML/CSS层面，就能绕过应用商店审核直接推送实时更新。

更多详情，请参阅[Appflow文档](https://ionicframework.com/docs/appflow)。

## 与传统CI/CD服务协同使用

Appflow既能执行Web/JavaScript构建也能处理原生移动构建，因此可以替代传统CI/CD服务。但它与传统CI/CD服务也能完美配合。

要实现这种配合方式，可以通过Webhook在每次提交时将构建产物发送至Appflow。

## 其他移动CI/CD方案

市场上还有其他移动CI/CD服务，但都不专门针对Capacitor。无论您偏好哪种CI/CD服务，Capacitor都能与之集成，因为Capacitor应用本质上是原生应用。但要注意，要实现Capacitor应用的远程实时更新功能，目前只有[Appflow](https://ionic.io/appflow)提供这项特性。