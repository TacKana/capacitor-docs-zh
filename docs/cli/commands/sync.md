---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
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
- `--inline`：同步后，所有 JS source map 将被内联，从而允许在基于 Chromium 的浏览器中调试 Android Web View。

## 钩子

以下是 sync 命令可用的钩子：

- `capacitor:sync:before`
- `capacitor:sync:after`

[更多信息](../hooks)
