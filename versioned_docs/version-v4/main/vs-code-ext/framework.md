---
title: Framework Features
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/framework
---

当使用 Angular、Vue 和 React 等框架时，本扩展提供额外功能。虽然错误辅助等特性是通用的，但也包含一些框架专属功能。

## Angular

#### 创建组件及其他

Angular 项目会在 `Project` 下显示一个 `+ New` 选项，您可以选择创建：
- **Page** - 新建 Ionic 页面
- **Component** - 新建 Angular 组件
- **Service** - 新建 Angular 服务
- **Module** - 新建 Angular 模块
- **Class** - 新建 TypeScript 类
- **Directive** - 新建 Angular 指令

#### 版本迁移

点击 `Packages` > `@Angular` 可将项目迁移至 Angular 的最新次要版本或下一个主版本。

#### 使用 HTTPS

通过点击 `Settings` > `Use HTTPS`，Angular 项目可在启用 HTTPS 的开发服务器上运行。更多信息请参阅[此文档](build-and-run#using-https)。