---
title: Framework Features
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/framework
---

当使用 Angular、Vue 和 React 等框架时，该扩展提供额外的功能。错误辅助等功能是通用的，但也存在一些特定于框架的功能。

## Angular

#### 创建组件及其他

Angular 项目会在 `Project` 下看到一个 `+ 新建` 项，您可以选择创建：
- **页面** - 创建新的 Ionic 页面
- **组件** - 创建新的 Angular 组件
- **服务** - 创建新的 Angular 服务
- **模块** - 创建新的 Angular 模块
- **类** - 创建 TypeScript 类
- **指令** - 创建 Angular 指令

#### 迁移版本

通过点击 `Packages` > `@Angular`，您可以迁移到 Angular 的最新次要版本或下一个主要版本。

#### 使用 HTTPS

通过点击 `Settings` > `Use HTTPS`，Angular 项目可以在使用 HTTPS 的开发 Web 服务器上运行。更多信息可以在 [这里](build-and-run#using-https) 找到。