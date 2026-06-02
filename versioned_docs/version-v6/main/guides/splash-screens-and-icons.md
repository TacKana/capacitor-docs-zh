---
title: 启动屏和图标
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

您可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为您的 iOS、Android 或渐进式 Web 应用生成启动屏和图标。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

使用以下文件夹/文件名结构提供图标和启动屏源图片：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件应至少为 `1024px` x `1024px`。
- 启动屏文件应至少为 `2732px` x `2732px`。
- 格式可以是 `jpg` 或 `png`。

然后生成（将应用到您的原生项目或生成 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

或者，您可以使用 `--ios`、`--android` 或 `--pwa` 为特定平台生成。

:::note
[VS Code 扩展](../vs-code-ext/0-getting-started.mdx) 也可以生成启动屏和图标资源。
:::

## Android 12+
在 Android 12 及以上版本中，Google 更改了启动屏的显示方式，使用带有彩色背景的较小图标，而不是 Android 11 及以下版本可能使用的全屏图像。关于此更改的更多文档可以在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 找到。
