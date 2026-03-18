---
title: CLI Commands
description: Capacitor CLI 命令参考列表
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/create
---

# Capacitor CLI - create

如果您希望从头开始并计划单独添加 UI/前端框架，可以使用此命令创建一个具有标准项目结构的新 Capacitor 项目。

```bash
npx @capacitor/cli create [options] [directory] [name] [id]
```

<strong>输入参数:</strong>

- `directory` (可选): 创建新应用的目录，例如 `c:\src\myapp`
- `name` (可选): 应用名称
- `id` (可选): 应用包标识符 (采用 Java 包格式，不含连字符)，例如 `com.example.app`

<strong>选项:</strong>

- `--npm-client <npmClient>`: 用于依赖项安装的 npm 客户端