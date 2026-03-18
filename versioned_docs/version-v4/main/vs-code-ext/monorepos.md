---
title: Monorepos
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

该扩展支持多种类型的单体仓库（monorepo），并在检测到单体仓库时，会在其面板底部显示项目选择列表，如下图所示：

![单体仓库项目](/img/monorepo.png)

## 支持的类型
支持的 Monorepo 类型列表包括：
- **[NX](https://nx.dev/)** - 通常与支持 Capacitor 的 [nxext](https://nxext.dev/) 结合使用
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/) 的多项目支持（npm 的替代品）
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/) 的多项目支持（npm 的替代品）
- **[Lerna](https://lerna.js.org/)** - 用于从同一代码库管理和发布包的工具
- **多文件夹** - 如果您将项目存放在子文件夹中
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果您使用 VSCode 的多根工作区文件