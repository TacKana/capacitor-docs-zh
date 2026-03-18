---
title: Splash Screens and Icons
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

您可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为您的 iOS、Android 或渐进式 Web 应用程序生成启动画面和图标。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

请按照以下文件夹/文件名结构提供图标和启动画面的源图片：
```
resources/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件至少应为 `1024px` x `1024px`。
- 启动画面文件至少应为 `2732px` x `2732px`。
- 图片格式可以是 `jpg` 或 `png`。

然后运行生成命令（此操作将应用到您的原生项目或生成 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

或者，您可以使用 `--ios`、`--android` 或 `--pwa` 参数为特定平台生成资源。

:::note
[VS Code 扩展](../vs-code-ext/0-getting-started.mdx) 也可以生成启动画面和图标资源。
:::

## Android 12+
从 Android 12 开始，Google 改变了启动画面的显示方式，使用较小的图标配合彩色背景，而不是像 Android 11 及更低版本那样使用全屏图片。关于此项变更的更多文档可在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 找到。