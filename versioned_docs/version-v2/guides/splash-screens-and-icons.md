---
title: 创建启动画面与图标
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/guides/splash-screens-and-icons
---

# 创建启动画面与图标

现在已初步支持启动画面和图标生成功能。完整详细信息，请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
$ npm install -g cordova-res
```

`cordova-res` 需要类似 Cordova 的项目结构：将单个图标文件和单个启动画面文件放置在项目根目录的 `resources` 文件夹中，结构如下：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图片，并将它们复制到原生项目中：

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```