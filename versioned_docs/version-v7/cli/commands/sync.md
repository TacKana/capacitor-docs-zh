---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

该命令会先执行 [`copy`](/cli/commands/copy.md) 操作，然后执行 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 不删除 Podfile.lock 文件，并且 pod install 会使用 `--deployment` 选项。
- `--inline`: 同步完成后，所有 JS 源码映射将被内联，以便在基于 Chromium 的浏览器中调试 Android WebView。

## 钩子函数

sync 命令支持以下钩子函数：

- `capacitor:sync:before`
- `capacitor:sync:after`

[了解更多](../hooks)