---
title: Framework Features
description: Visual Studio Code 扩展支持 Capacitor
contributors:
  - dtarnawsky
slug: /vscode/framework
---

当使用 Angular、Vue 和 React 等框架时，此扩展提供额外功能。错误辅助等特性是通用的，但也包含一些框架特定的功能。

## Angular

#### 创建组件及其他

Angular 项目会在 `Project` 下看到一个 `+ 新建` 选项，您可以选择创建：
- **页面** - 创建一个新的 Ionic 页面
- **组件** - 创建一个新的 Angular 组件
- **服务** - 创建一个新的 Angular 服务
- **模块** - 创建一个新的 Angular 模块
- **类** - 创建一个 TypeScript 类
- **指令** - 创建一个 Angular 指令

#### 版本迁移

您可以点击 `Packages` > `@Angular` 来迁移到最新的次要版本或下一个主要版本的 Angular。

#### 使用 HTTPS

对于 Angular 项目，可以通过点击 `Settings` > `Use HTTPS` 在使用 HTTPS 的开发 Web 服务器上运行。更多信息请参见[此处](build-and-run#using-https)。