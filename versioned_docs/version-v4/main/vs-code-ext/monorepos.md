---
title: 单一仓库
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

该扩展支持多种 mono-repo 风格，当检测到 monorepo 时，会在其面板底部显示项目选择列表，如下所示：

![Monorepo 项目](/img/monorepo.png)

## 支持的类型
支持的 Monorepo 类型列表包括：
- **[NX](https://nx.dev/)** - 通常与 [nxext](https://nxext.dev/) 结合使用以支持 Capacitor
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持。
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代品）的多项目支持。
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代品）的多项目支持。
- **[Lerna](https://lerna.js.org/)** - 一种用于从同一仓库管理和发布包的工具。
- **多重文件夹** - 如果您将项目保存在子文件夹中。
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果您使用 VSCode 的多根工作区文件
