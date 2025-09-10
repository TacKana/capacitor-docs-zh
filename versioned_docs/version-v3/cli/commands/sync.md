---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

该命令会先执行 [`copy`](/cli/commands/copy.md) 然后执行 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 不删除 Podfile.lock 文件，并且 pod install 会使用 `--deployment` 选项。

## 钩子函数

sync 命令支持以下钩子函数：

- `capacitor:sync:before`
- `capacitor:sync:after`

[了解更多](../hooks.md)