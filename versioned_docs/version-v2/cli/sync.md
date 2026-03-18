---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/sync
---

# Capacitor CLI - cap sync

## 同步

同时运行 [复制](./copy.md) 和 [更新](./update.md) 命令。

```bash
npx cap sync [options] [platform]
```

<strong>输入参数：</strong>

- `platform` (可选)：`android`, `ios`

<strong>选项：</strong>

- `--deployment`：不会删除 Podfile.lock，并且 pod install 将使用 `--deployment` 选项。

<strong>示例输出：</strong>

```
√ 在 3.37 秒内将 Web 资源从 www 复制到 android\app\src\main\assets\public
√ 在 5.80 毫秒内复制原生桥接层
√ 在 2.59 毫秒内复制 capacitor.config.json
√ 复制完成，耗时 3.43 秒
√ 在 11.48 毫秒内更新 Android 插件
  发现 1 个适用于 Android 的 Capacitor 插件：
    capacitor-mapbox (0.0.1)
√ 更新 Android 完成，耗时 105.91 毫秒
√ 复制完成，耗时 409.80 微秒
√ 更新 Web 完成，耗时 6.80 微秒
同步完成，总耗时 3.563 秒
```