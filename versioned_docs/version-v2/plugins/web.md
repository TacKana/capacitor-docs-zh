---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 采用了一个 Web/原生兼容层，使得构建插件变得容易，这些插件在原生运行时以及在 Web 上的 PWA 中运行时都能提供功能。

## 开始使用

首先，请按照插件指南的[开始使用](creating-plugins.md)部分所示，生成一个插件。

接下来，在您选择的编辑器中打开 `your-plugin/src/web.ts` 文件。

## 示例

一个 Web 插件的基本结构如下所示，请查看内联注释以获取更多解释：

```typescript
import { WebPlugin } from '@capacitor/core';
import { MyPlugin } from './definitions';

export class MyPluginWeb extends WebPlugin implements MyPlugin {
  constructor() {
    // 使用插件的名称调用 super（这应与原生名称匹配），
    // 并指定此插件将激活的平台。例如，可以通过将平台添加到平台列表（小写）中，
    // 来为 Android 和 iOS 使用 Web 插件。
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

// 导出插件
export { MyPlugin };

// 注册为 Web 插件
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(MyPlugin);
```

最后，请确保您的 `src/index.ts` 中包含以下行：

```typescript
export * from './definitions';
export * from './web';
```

## 使用方法

自定义的 Capacitor 插件会合并到 Capacitor 核心中，因此可以通过对象解构来访问。要在 PWA 中使用插件的功能，除了从 Capacitor 核心导入外，还需要导入插件包。

> 如果您不导入插件，`registerWebPlugin` 将不会被调用，导致 Capacitor 无法找到 Web 实现。原生实现会被 Capacitor 自动检测到。

```typescript
// 从 Capacitor 核心导入插件
import { Plugins } from '@capacitor/core';
// 同时导入自定义插件包以支持 Web
import 'my-plugin';

// 从核心插件中解构出自定义插件
const { MyPlugin } = Plugins;
await MyPlugin.echo({
  value: 'Hello from web!',
});
```