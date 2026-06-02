---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
translated: true
---

# Capacitor CLI - cap sync

此命令依次运行 [`copy`](/cli/commands/copy.md) 和 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入参数：</strong>

- `platform`（可选）：`android`、`ios`

<strong>选项：</strong>

- `--deployment`：不会删除 Podfile.lock，并且 pod install 将使用 `--deployment` 选项。

## 钩子

以下钩子可用于 sync 命令：

- `capacitor:sync:before`
- `capacitor:sync:after`

[更多信息](../hooks.md)
