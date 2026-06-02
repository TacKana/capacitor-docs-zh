---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件指南
translated: true
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 利用 Web/原生兼容层，使得构建在原生运行时和 Web 上的 PWA 中都能正常工作的插件变得容易。

## 入门

首先，按照插件指南的[入门](creating-plugins.md)部分所述生成一个插件。

然后，在你选择的编辑器中打开 `your-plugin/src/web.ts`。

## 示例

Web 插件的基本结构如下所示，请跟随内联注释了解更多说明：

```typescript
import { WebPlugin } from '@capacitor/core';
import { MyPlugin } from './definitions';

export class MyPluginWeb extends WebPlugin implements MyPlugin {
  constructor() {
    // 使用插件名称（需与原生名称匹配）以及此插件将激活的平台调用父类构造函数。
    // 例如，可以通过将 Android 和 iOS 添加到 platforms 列表（小写）来为它们使用 Web 插件
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

最后，确保你的 `src/index.ts` 包含以下行：

```typescript
export * from './definitions';
export * from './web';
```

## 使用

自定义 Capacitor 插件会合并到 Capacitor Core 中，因此可以通过对象解构来访问。要在 PWA 中使用插件功能，除了导入 Capacitor Core 之外，还需要导入插件包。

> 如果不导入插件，`registerWebPlugin` 将不会被调用，导致 Capacitor 找不到 Web 实现。原生实现会被 Capacitor 自动检测。

```typescript
// 从 Capacitor Core 导入插件
import { Plugins } from '@capacitor/core';
// 同时也导入自定义插件包以支持 Web
import 'my-plugin';

// 从核心插件中解构出自定义插件
const { MyPlugin } = Plugins;
await MyPlugin.echo({
  value: '来自 Web 的问候！',
});
```
