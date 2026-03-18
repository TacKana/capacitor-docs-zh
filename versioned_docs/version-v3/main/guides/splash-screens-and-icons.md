---
title: Splash Screens and Icons
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

# 创建闪屏与图标

现已提供对闪屏和图标生成的初步支持。完整详情请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先，安装 `cordova-res`：

```bash
npm install -g cordova-res
```

`cordova-res` 期望采用类似 Cordova 的项目结构：将图标和闪屏文件放在项目根目录下的 `resources` 文件夹中，例如：

```
resources/
├── icon.png
└── splash.png
```

接下来，运行以下命令生成所有图片，并将其复制到原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```