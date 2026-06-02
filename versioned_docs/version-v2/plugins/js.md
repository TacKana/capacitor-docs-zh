---
title: Capacitor JavaScript 插件指南
description: Capacitor JavaScript 插件指南
translated: true
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor JavaScript 插件指南

在 Capacitor 中，原生插件的所有方法在运行时都会自动提供给 JavaScript，因此大多数插件根本不需要任何 JavaScript。

然而，如果你的插件需要一些特殊的 JavaScript，或者你希望为插件提供自定义 API，你可以轻松地为 Capacitor 插件添加 JavaScript 前端。

## 入门

要为 Capacitor 构建自定义 JavaScript 前端，首先按照插件指南的[入门](/plugins.md)部分进行操作。

接下来，以你认为合适的方式构建你的插件！生成的插件模板已经包含了 TypeScript 和一个简单的构建流程。你可以采用这种方式（推荐），或者删除这些文件重新开始。

要调用你的插件，你可以从 `@capacitor/core` 导入后直接访问：

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

## 发布

要发布你的插件，只需执行 `npm publish` 即可！

## 使用你的插件

自定义 JS 插件与普通插件的区别之一在于开发者如何"使用"它。开发者不会直接访问 `Plugins.SuperGreatPlugin`，而是直接从你的 npm 包中导入：

```typescript
import { CustomSuperPlugin } from 'super-great-plugin';

const plugin = new CustomSuperPlugin();
plugin.customAwesomeness();
```
