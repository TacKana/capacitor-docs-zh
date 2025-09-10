---
title: Monorepos
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

该扩展支持多种类型的 monorepo（单体仓库），当检测到 monorepo 时，会在面板底部显示项目选择列表，如下图所示：

![Monorepo 项目](/img/monorepo.png)

## 支持的仓库类型
支持的 Monorepo 类型包括：
- **[NX](https://nx.dev/)** - 通常与 [nxtend](https://nxtend.dev/docs/capacitor/overview) 结合使用以支持 Capacitor
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持功能
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代方案）的多项目支持
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代方案）的多项目支持
- **[Lerna](https://lerna.js.org/)** - 用于管理和发布同一仓库中包的工具
- **多文件夹模式** - 如果您将项目保存在子文件夹中
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果您使用 VSCode 的多根工作区文件