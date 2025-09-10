```mdx
---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

将 Web 应用构建文件和 Capacitor 配置文件复制到原生平台项目中。每次对 Web 应用进行更改或修改配置值时，都需要运行此命令。

```bash
npx cap copy [<platform>]
```

<strong>输入参数：</strong>

- `platform`（可选）：`android`、`ios`

<strong>选项：</strong>

- `--inline`：同步后，所有 JS 源映射将被内联，以便在基于 Chromium 的浏览器中调试 Android Web View。

## 钩子函数

copy 命令支持以下钩子函数：

- `capacitor:copy:before`
- `capacitor:copy:after`

[更多信息](../hooks)
```