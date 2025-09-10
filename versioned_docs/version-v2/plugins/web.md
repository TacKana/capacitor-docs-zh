---
title: Capacitor Web/PWA 插件开发指南
description: Capacitor Web/PWA 插件开发指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/web
---

# Capacitor Web/PWA 插件开发指南

Capacitor 采用了一套 Web/原生兼容层，使得开发者能够轻松构建同时在原生环境和 Web PWA 中运行的插件。

## 快速开始

首先按照插件指南中的[快速开始](creating-plugins.md)章节生成一个插件模板。

接着在你喜欢的编辑器中打开 `your-plugin/src/web.ts` 文件。

## 示例代码

以下是 Web 插件的基本结构，内联注释提供了详细说明：

```typescript
import { WebPlugin } from '@capacitor/core';
import { MyPlugin } from './definitions';

export class MyPluginWeb extends WebPlugin implements MyPlugin {
  constructor() {
    // 调用父类构造函数，传入插件名称（需与原生端名称一致）
    // 以及插件适用的平台列表。例如可以通过添加平台名（小写）
    // 让同一个 Web 插件同时支持 Android 和 iOS
    super({
      name: 'MyPlugin',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}

// 实例化插件
const MyPlugin = new MyPluginWeb();

// 导出插件实例
export { MyPlugin };

// 注册为 Web 插件
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(MyPlugin);
```

最后确保你的 `src/index.ts` 文件包含以下导出语句：

```typescript
export * from './definitions';
export * from './web';
```

## 使用方式

自定义 Capacitor 插件会被合并到 Capacitor 核心库中，因此需要通过对象解构来访问。在 PWA 中使用插件功能时，除了从核心库导入外，还需要导入插件包本身。

> 如果不导入插件包，`registerWebPlugin` 将不会被调用，导致 Capacitor 无法找到 Web 实现。原生实现会被 Capacitor 自动检测。

```typescript
// 从 Capacitor 核心库导入插件
import { Plugins } from '@capacitor/core';
// 同时导入自定义插件包以支持 Web 平台
import 'my-plugin';

// 从核心插件中解构出自定义插件
const { MyPlugin } = Plugins;
await MyPlugin.echo({
  value: '来自 Web 的问候！',
});
```