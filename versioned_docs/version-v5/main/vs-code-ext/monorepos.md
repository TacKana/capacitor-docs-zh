---
title: Monorepos
description: Visual Studio Code 扩展 for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

该扩展支持多种类型的单体仓库（monorepo）。当检测到单体仓库时，扩展会在面板底部显示一个项目选择列表，如下图所示：

![单体仓库项目](/img/monorepo.png)

## 支持的类型
支持的 Monorepo 类型包括：

- **[NX](https://nx.dev/)** - 通常与 [nxtend](https://nxtend.dev/docs/capacitor/overview) 结合使用以支持 Capacitor
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代品）的多项目支持
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代品）的多项目支持
- **[Lerna](https://lerna.js.org/)** - 用于管理和发布同一仓库中包的工具
- **多文件夹（Multiple Folder）** - 如果你的项目保存在子文件夹中
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果你使用 VSCode 的多根工作区文件