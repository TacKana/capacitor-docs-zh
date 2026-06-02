---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
translated: true
---

# Capacitor CLI - cap copy

将 Web 应用构建产物和 Capacitor 配置文件复制到原生平台项目中。每次对 Web 应用进行更改或更改配置值时，请运行此命令。

```bash
npx cap copy [<platform>]
```

<strong>输入参数：</strong>

- `platform`（可选）：`android`、`ios`

## 钩子

以下钩子可用于 copy 命令：

- `capacitor:copy:before`
- `capacitor:copy:after`

[更多信息](../hooks.md)
