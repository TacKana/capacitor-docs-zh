---
title: CLI Command - cap copy
description: Capacitor 命令行工具 - cap copy 命令
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/copy
---

# Capacitor 命令行工具 - cap copy

将 Web 应用的构建产物和 Capacitor 配置文件复制到原生平台项目中。每次你对 Web 应用进行修改或在 `capacitor.config.json` 中更改配置值时，都需要运行此命令。

```bash
npx cap copy [platform]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>示例输出：</strong>

```
√ 正在将 Web 资源从 www 复制到 android\app\src\main\assets\public，耗时 2.64 秒
√ 正在将 Web 资源从 www 复制到 ios/App/public，耗时 450 毫秒
√ 正在复制原生桥接器，耗时 7.32 毫秒
√ 正在复制 capacitor.config.json，耗时 3.22 毫秒
√ 复制完成，总耗时 2.74 秒
√ 复制完成，总耗时 1.10 毫秒
```