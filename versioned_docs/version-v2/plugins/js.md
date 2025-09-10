---
title: Capacitor JavaScript 插件开发指南
description: Capacitor JavaScript 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor JavaScript 插件开发指南

在 Capacitor 中，原生插件的所有方法都会在运行时自动暴露给 JavaScript，因此大多数插件完全不需要编写任何 JavaScript 代码。

不过，如果您的插件需要特定的 JavaScript 逻辑，或者您希望为插件提供自定义 API，可以轻松地为 Capacitor 插件添加 JavaScript 前端。

## 快速开始

要为 Capacitor 构建自定义 JavaScript 前端，请先阅读插件指南中的[快速开始](/plugins.md)部分。

接下来，按照您喜欢的方式构建插件！生成的插件模板已预置 TypeScript 和简易构建流程，您可以直接使用（推荐）或删除这些文件重新开始。

调用插件时，您可以直接从 `@capacitor/core` 导入后访问：

```typescript
import { Plugins } from '@capacitor/core';

const { SuperGreatPlugin } = Plugins;

export class CustomSuperPlugin {
  constructor() {}
  customAwesomeness() {
    SuperGreatPlugin.awesome();
  }
}
```

## 发布插件

只需执行 `npm publish` 即可发布您的插件！

## 使用插件

自定义 JS 插件的一个不同之处在于开发者如何"使用"它。开发者不再直接通过 `Plugins.SuperGreatPlugin` 访问，而是直接从 npm 包导入：

```typescript
import { CustomSuperPlugin } from 'super-great-plugin';

const plugin = new CustomSuperPlugin();
plugin.customAwesomeness();
```