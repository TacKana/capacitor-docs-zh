---
title: CLI 命令
description: Capacitor CLI 命令参考列表
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/create
---

# Capacitor CLI - create

如果您希望从头开始并计划单独添加 UI/前端框架，则使用标准项目结构创建一个新的 Capacitor 项目。

```bash
npx @capacitor/cli create [options] [directory] [name] [id]
```

<strong>输入：</strong>

- `directory`（可选）：创建新应用的目录，例如 `c:\src\myapp`
- `name`（可选）：应用名称
- `id`（可选）：应用包 ID（Java 包格式，无连字符），例如 `com.example.app`

<strong>选项：</strong>

- `--npm-client <npmClient>`：用于依赖安装的 npm 客户端
