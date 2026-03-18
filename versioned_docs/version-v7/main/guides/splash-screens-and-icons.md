---
title: Splash Screens and Icons
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

你可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为你的 iOS、Android 或渐进式 Web 应用生成启动画面和图标。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

使用以下文件夹/文件名结构提供图标和启动画面的源图片：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件至少应为 `1024px` x `1024px`。
- 启动画面文件至少应为 `2732px` x `2732px`。
- 格式可以是 `jpg` 或 `png`。

然后生成资源（这将应用到你的原生项目或生成 PWA manifest 文件）：
```shell
npx capacitor-assets generate
```

或者，你也可以使用 `--ios`、`--android` 或 `--pwa` 参数为特定平台生成。

:::note
社区维护的 [VS Code 扩展](../getting-started/vscode-extension.mdx) 也可以生成启动画面和图标资源。
:::

## Android 12+
在 Android 12 及更高版本中，Google 改变了启动画面的显示方式，采用较小的图标搭配彩色背景，而不是 Android 11 及更低版本可能使用的全屏图像。有关此变更的更多文档可以在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 找到。