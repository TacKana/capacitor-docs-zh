---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/copy
---

# Capacitor CLI - cap copy

将 Web 应用构建产物和 Capacitor 配置文件复制到原生平台项目中。每次对 Web 应用进行更改或更改 `capacitor.config.json` 中的配置值时运行此命令。

```bash
npx cap copy [platform]
```

<strong>输入：</strong>

- `platform`（可选）：`android`、`ios`

<strong>示例输出：</strong>

```
√ 正在将 Web 资源从 www 复制到 android\app\src\main\assets\public，耗时 2.64s
√ 正在将 Web 资源从 www 复制到 ios/App/public，耗时 450ms
√ 正在复制原生桥接，耗时 7.32ms
√ 正在复制 capacitor.config.json，耗时 3.22ms
√ copy 完成，耗时 2.74s
√ copy 完成，耗时 1.10ms
```
