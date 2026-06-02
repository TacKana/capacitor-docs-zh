---
title: 单仓库
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

该扩展支持多种单仓库风格，当检测到单仓库时，将在其面板底部显示项目选择列表，如下所示：

![单仓库项目](/img/monorepo.png)

## 支持的类型
支持的单仓库类型列表包括：
- **[NX](https://nx.dev/)** - 通常与 [nxtend](https://nxtend.dev/docs/capacitor/overview) 结合使用以获得 Capacitor 支持
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - npm 内置的简单多项目支持。
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - [Yarn](https://yarnpkg.com/)（npm 的替代方案）的多项目支持。
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - [pnpm](https://pnpm.io/)（npm 的替代方案）的多项目支持。
- **[Lerna](https://lerna.js.org/)** - 用于从同一仓库管理和发布包的工具。
- **多文件夹** - 如果您将项目保存在子文件夹中。
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - 如果您使用 VS Code 的多根工作区文件。
