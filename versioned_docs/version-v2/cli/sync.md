---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/sync
---

# Capacitor CLI - cap sync

## Sync

同时运行 [Copy](./copy.md) 和 [Update](./update.md) 命令。

```bash
npx cap sync [options] [platform]
```

<strong>输入：</strong>

- `platform`（可选）：`android`、`ios`

<strong>选项：</strong>

- `--deployment`：Podfile.lock 不会被删除，pod install 将使用 `--deployment` 选项。

<strong>示例输出：</strong>

```
√ 正在将 Web 资源从 www 复制到 android\app\src\main\assets\public，耗时 3.37s
√ 正在复制原生桥接，耗时 5.80ms
√ 正在复制 capacitor.config.json，耗时 2.59ms
√ copy 完成，耗时 3.43s
√ 正在更新 Android 插件，耗时 11.48ms
  找到 1 个适用于 android 的 Capacitor 插件：
    capacitor-mapbox (0.0.1)
√ update android 完成，耗时 105.91ms
√ copy 完成，耗时 409.80μp
√ update web 完成，耗时 6.80μp
Sync 完成，耗时 3.563s
```
