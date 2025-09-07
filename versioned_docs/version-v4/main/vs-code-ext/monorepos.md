---
title: Monorepos
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

本扩展支持多种类型的 mono-repos（单仓库），当检测到单仓库时，会在面板底部显示项目选择列表，如下图所示：

![Monorepo 项目](/img/monorepo.png)

## 支持的类型
支持的单仓库类型包括：
- **[NX](https://nx.dev/)** - 通常与 [nxext](https://nxext.dev/) 结合使用以支持 Capacitor
- **[NPM 工作区](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持
- **[Yarn 工作区](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代品）的多项目支持
- **[Pnpm 工作区](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代品）的多项目支持
- **[Lerna](https://lerna.js.org/)** - 用于管理和发布同一仓库中包的工具
- **多文件夹** - 如果您的项目保存在子文件夹中
- **[VSCode 工作区](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果您使用 VSCode 的多根工作区文件