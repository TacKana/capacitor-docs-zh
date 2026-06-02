---
title: 启动屏和图标
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

# 创建启动屏和图标

现在可以为启动屏和图标生成提供初始支持。有关完整详情，请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
npm install -g cordova-res
```

`cordova-res` 期望使用类似 Cordova 的结构：在项目根目录的 `resources` 文件夹中放置一个图标文件和一个启动屏文件，如下所示：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图片，然后将其复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```
