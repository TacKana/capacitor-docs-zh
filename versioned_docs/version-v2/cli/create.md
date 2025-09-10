---
title: CLI 命令
description: Capacitor CLI 命令参考列表
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/create
---

# Capacitor CLI - create 命令

创建一个带有标准项目结构的新 Capacitor 项目，适合希望从零开始并计划单独添加 UI/前端框架的情况。

```bash
npx @capacitor/cli create [options] [directory] [name] [id]
```

<strong>参数说明:</strong>

- `directory` (可选): 创建新应用的目录路径，例如 `c:\src\myapp`
- `name` (可选): 应用名称
- `id` (可选): 应用包标识符 (需使用Java包格式，不含短横线)，例如 `com.example.app`

<strong>选项配置:</strong>

- `--npm-client <npmClient>`: 指定用于依赖安装的 npm 客户端