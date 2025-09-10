```mdx
---
title: 创建启动画面和图标
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/guides/splash-screens-and-icons
---

# 创建启动画面和图标

现已初步支持启动画面和图标的生成。完整详情请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
$ npm install -g cordova-res
```

`cordova-res` 要求符合 Cordova 风格的项目结构：在项目的顶级 `resources` 文件夹中放置一个图标文件和一个启动画面文件，结构如下：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图片并将其复制到原生项目中：

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```
```