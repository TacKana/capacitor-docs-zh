---
title: 启动页与应用图标
description: 使用 cordova-res 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

# 创建启动页与应用图标

现已支持基础的启动页和图标生成功能。完整说明请参阅 [cordova-res 文档](https://github.com/ionic-team/cordova-res)。

首先安装 `cordova-res`：

```bash
npm install -g cordova-res
```

`cordova-res` 需要遵循 Cordova 的项目结构：在你的项目根目录下创建 `resources` 文件夹，并放入图标和启动页文件，结构如下：

```
resources/
├── icon.png
└── splash.png
```

然后运行以下命令生成所有图片，并自动复制到各原生项目中：

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```