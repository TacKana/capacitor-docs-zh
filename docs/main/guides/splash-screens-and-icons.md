---
title: Splash Screens and Icons
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

你可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为你的 iOS、Android 或渐进式 Web 应用生成启动图和图标。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

按照以下文件夹和文件名结构提供图标和启动图的源图片：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件至少应为 `1024px` x `1024px`。
- 启动图文件至少应为 `2732px` x `2732px`。
- 格式可以是 `jpg` 或 `png`。

然后执行生成命令（这会应用到你的原生项目或生成 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

你也可以使用 `--ios`、`--android` 或 `--pwa` 为特定平台生成。

:::note
社区维护的 [VS Code 扩展](../getting-started/vscode-extension.mdx) 也可以生成启动图和图标资源。
:::

## Android 12+
在 Android 12 及更高版本中，Google 改变了启动图的显示方式，改用较小的图标和彩色背景，而不再支持 Android 11 及以下版本中可用的全屏图片。关于此变更的更多文档可以在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 找到。