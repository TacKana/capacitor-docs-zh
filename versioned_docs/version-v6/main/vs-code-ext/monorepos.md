---
title: Monorepos
description: Visual Studio Code 的 Capacitor 插件
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

本插件支持多种类型的单仓库（monorepo）开发模式。当检测到项目为单仓库时，插件面板底部会显示一个项目选择列表，如下图所示：

![单仓库项目](/img/monorepo.png)

## 支持的类型
支持的单仓库类型包括：
- **[NX](https://nx.dev/)** - 常与 [nxtend](https://nxtend.dev/docs/capacitor/overview) 结合使用以支持 Capacitor
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简易多项目管理功能
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代方案）的多项目管理功能
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代方案）的多项目管理功能
- **[Lerna](https://lerna.js.org/)** - 用于管理和发布同仓库内多个包的工具
- **多文件夹模式** - 适用于将项目存放在子文件夹中的情况
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 适用于使用 VSCode 多根工作区文件的情况