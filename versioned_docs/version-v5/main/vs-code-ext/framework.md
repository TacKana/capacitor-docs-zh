```mdx
---
title: 框架特性
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/framework
---

当使用 Angular、Vue 和 React 等框架时，该扩展提供了额外功能。错误辅助等特性是通用的，但也存在一些框架特定的功能。

## Angular

#### 创建组件及其他功能

Angular 项目会在 `Project` 下获得一个 `+ New` 选项，您可以选择创建：
- **Page** - 创建新的 Ionic 页面
- **Component** - 创建新的 Angular 组件
- **Service** - 创建新的 Angular 服务
- **Module** - 创建新的 Angular 模块
- **Class** - 创建 TypeScript 类
- **Directive** - 创建 Angular 指令

#### 迁移版本

通过点击 `Packages` > `@Angular`，您可以迁移到最新的次要版本或下一个主要版本的 Angular。

#### 使用 HTTPS

通过点击 `Settings` > `Use HTTPS`，Angular 项目可以在使用 HTTPS 的开发 Web 服务器上运行。更多信息请参阅[此处](build-and-run#using-https)。
```