---
title: 框架功能
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/framework
---

该扩展在使用 Angular、Vue 和 React 等框架时具有额外功能。错误辅助等功能是通用的，但也有一些特定于框架的功能。

## Angular

#### 创建组件等

Angular 项目将在 `Project` 下获得一个 `+ New` 项目，您可以选择：
- **Page** - 创建新的 Ionic 页面
- **Component** - 创建新的 Angular 组件
- **Service** - 创建新的 Angular 服务
- **Module** - 创建新的 Angular 模块
- **Class** - 创建 TypeScript 类
- **Directive** - 创建 Angular 指令

#### 版本迁移

您可以通过点击 `Packages` > `@Angular` 迁移到最新的次要版本或下一个 Angular 主版本。

#### 使用 HTTPS

Angular 项目可以在使用 HTTPS 的开发 Web 服务器上运行，方法是点击 `Settings` > `Use HTTPS`。更多信息可以[在此处](build-and-run#using-https)找到。
