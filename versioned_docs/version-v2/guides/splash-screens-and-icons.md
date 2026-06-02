---
title: 创建启动屏幕和图标
description: 使用 cordova-res 为原生项目生成资源图像
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/guides/splash-screens-and-icons
---

# 创建启动屏幕和图标

现已初步支持启动屏幕和图标生成。有关完整详细信息，请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
$ npm install -g cordova-res
```

`cordova-res` 期望类似 Cordova 的结构：将一个图标和一个启动屏幕文件放置在项目顶层的 `resources` 文件夹中，如下所示：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图像，然后将它们复制到原生项目中：

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```