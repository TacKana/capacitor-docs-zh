---
title: 启动屏和图标
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

# 创建启动屏和图标

现在可以使用启动屏和图标生成的初始支持。有关完整详情，请参见 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
npm install -g cordova-res
```

`cordova-res` 期望使用 Cordova 风格的结构：将一张图标和一张启动屏文件放置在项目根目录的 `resources` 文件夹中，如下所示：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图片，然后将它们复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```
