```markdown
---
title: 框架特性
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/framework
---

当使用 Angular、Vue 和 React 等框架时，该扩展还提供了额外的功能。错误辅助等特性是通用的，但也有一些特定于框架的功能。

## Angular

#### 创建组件及其他

Angular 项目会在 `项目` 下获得一个 `+ 新建` 项，您可以选择：
- **页面** - 创建新的 Ionic 页面
- **组件** - 创建新的 Angular 组件
- **服务** - 创建新的 Angular 服务
- **模块** - 创建新的 Angular 模块
- **类** - 创建 TypeScript 类
- **指令** - 创建 Angular 指令

#### 迁移版本

您可以通过点击 `包` > `@Angular` 迁移到最新的次要版本或下一个主要版本的 Angular。

#### 使用 HTTPS

Angular 项目可以通过点击 `设置` > `使用 HTTPS` 在使用了 HTTPS 的开发 Web 服务器上运行。更多信息请参见[此处](build-and-run#using-https)。
```