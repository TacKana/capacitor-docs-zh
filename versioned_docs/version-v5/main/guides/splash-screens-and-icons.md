---
title: 启动屏与应用图标
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

您可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为 iOS、Android 或渐进式网页应用生成启动屏和应用图标。

首先安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

按照以下目录结构提供图标和启动屏的源图像：
```
resources/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件尺寸至少为 `1024px` × `1024px`
- 启动屏文件尺寸至少为 `2732px` × `2732px`
- 格式支持 `jpg` 或 `png`

执行生成命令（会根据不同平台生成原生项目资源或 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

您也可以使用 `--ios`、`--android` 或 `--pwa` 参数为特定平台生成资源。

:::note
[VS Code 扩展](../vs-code-ext/0-getting-started.mdx) 同样支持生成启动屏和应用图标资源。
:::

## Android 12+ 适配
从 Android 12 开始，Google 修改了启动屏的显示方式，改用小图标搭配彩色背景的方案，取代了 Android 11 及以下版本支持的全屏图片。关于这一变更的详细说明可查阅 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 。