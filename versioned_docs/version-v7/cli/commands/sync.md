---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

此命令会先执行 [`copy`](/cli/commands/copy.md)，然后执行 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入参数:</strong>

- `platform` (可选): `android`, `ios`

<strong>选项:</strong>

- `--deployment`: 不会删除 Podfile.lock，并且 pod install 将使用 `--deployment` 选项。
- `--inline`: 同步完成后，所有 JS 源映射将被内联，从而允许在基于 Chromium 的浏览器中调试 Android Web View。

## 钩子

sync 命令可用的钩子如下：

- `capacitor:sync:before`
- `capacitor:sync:after`

[更多信息](../hooks)