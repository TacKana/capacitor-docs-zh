---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/sync
---

# Capacitor CLI - cap sync

## 同步命令

同时执行 [复制](./copy.md) 和 [更新](./update.md) 命令。

```bash
npx cap sync [options] [platform]
```

<strong>参数：</strong>

- `platform` （可选）：`android`、`ios`

<strong>选项：</strong>

- `--deployment`：保留 Podfile.lock 文件，并使用 `--deployment` 选项执行 pod install 命令。

<strong>示例输出：</strong>

```
√ 正在将 web 资源从 www 复制到 android\app\src\main\assets\public，耗时 3.37 秒
√ 复制原生桥接层耗时 5.80 毫秒
√ 复制 capacitor.config.json 耗时 2.59 毫秒
√ 复制完成，总耗时 3.43 秒
√ 正在更新 Android 插件，耗时 11.48 毫秒
  发现 1 个 Android 平台的 Capacitor 插件：
    capacitor-mapbox (0.0.1)
√ 更新 Android 完成，耗时 105.91 毫秒
√ 复制完成，耗时 409.80 微秒
√ 更新 web 完成，耗时 6.80 微秒
同步完成，总耗时 3.563 秒
```