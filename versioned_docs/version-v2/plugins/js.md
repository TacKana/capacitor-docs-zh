---
title: Capacitor JavaScript 插件指南
description: Capacitor JavaScript 插件指南
contributors:
  - mlynch
  - jcesarmobile
---

# Capacitor JavaScript 插件指南

在 Capacitor 中，原生插件的所有方法都会在运行时自动提供给 JavaScript 使用，因此大多数插件完全不需要为其编写任何 JavaScript 代码。

不过，如果你的插件需要一些特殊的 JavaScript 功能，或者你希望为插件提供自定义的 API，你可以轻松地为 Capacitor 插件添加一个 JavaScript 前端层。

## 开始使用

要为 Capacitor 构建自定义的 JavaScript 前端，首先请遵循插件指南中的[入门指南](/plugins.md)部分。

接下来，按照你喜欢的任何方式构建你的插件！生成的插件模板已经准备好了 TypeScript 和简单的构建流程。你可以采用这个模板（推荐），也可以删除这些文件重新开始。

要调用你的插件，在从 `@capacitor/core` 导入后，你将能够直接访问它：

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

要发布你的插件，只需执行 `npm publish` 即可！

## 使用你的插件

自定义 JS 插件的区别之一在于开发者如何“使用”它。开发者不会直接访问 `Plugins.SuperGreatPlugin`，而是直接从你的 npm 包中导入：

```typescript
import { CustomSuperPlugin } from 'super-great-plugin';

const plugin = new CustomSuperPlugin();
plugin.customAwesomeness();
```