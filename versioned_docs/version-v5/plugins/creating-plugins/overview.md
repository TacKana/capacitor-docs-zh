---
title: 创建Capacitor插件
description: 开发Capacitor插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 开发Capacitor插件

Capacitor插件能让JavaScript直接调用原生平台API。

本指南将帮助你开始开发可发布的Capacitor插件（可发布至npm）。你也可以创建仅限当前应用使用的本地插件，具体请参考[iOS](/main/ios/custom-code.md)和[Android](/main/android/custom-code.md)的自定义原生代码指南。

## 设计理念

如果你的插件计划公开分享，在开始前请了解我们关于Capacitor插件的核心设计理念。

### 协同开发

我们相信协作开发比单打独斗更能产出高质量的插件。为此我们创建了[Capacitor社区GitHub组织](https://github.com/capacitor-community)，相比个人仓库，这里更便于开发者协作。

如果[Capacitor社区](https://github.com/capacitor-community)中已存在某个功能的插件，请考虑参与贡献！若某个插件缺少主要维护者，Capacitor团队很乐意邀请你加入GitHub组织。

### 小而专注

Capacitor插件应当保持适度的功能范围。插件添加的原生代码可能会被用户使用也可能不会。通过控制插件规模，可以确保应用只包含必要的原生代码。这能避免应用体积膨胀，以及因未使用的API描述导致应用商店审核警告/拒绝等问题。

小而专注的插件还具有部署更快、协作更容易、更易维护等优势。

### 统一且符合习惯

Capacitor插件应当提供跨平台的统一API，并符合JavaScript开发者的使用习惯。这意味着可能需要转换原生平台的返回值格式。

以下是一些创建统一体验的指导原则及示例：

- **优先使用`undefined`而非`null`等特殊值**。例如：若Android API返回`0.0`表示"无值"，则应转换为JavaScript层的`undefined`
- **保持计量单位一致**。例如：若iOS API使用摄氏度而Android API使用华氏度，应在返回值到达JavaScript前统一转换为同种单位
- **日期时间优先使用带时区的ISO 8601格式**。例如：从`"2020-12-13T20:21:58.415Z"`这样的字符串可以准确生成JavaScript的`Date`对象，而Unix时间戳（JavaScript使用毫秒）则容易造成混淆。请始终包含时区信息，否则不同地区可能对日期时间产生不同解析结果

## 插件生成器

准备开始了？Capacitor提供了[插件生成工具](https://github.com/ionic-team/create-capacitor-plugin)帮助你快速搭建插件项目。

> 开始前请确保你使用的是最新的Node LTS版本和npm 6+

在新终端中运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示你输入信息。你也可以使用命令行参数（参见[GitHub仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 下一步

[了解Capacitor插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[学习开发Android平台插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[学习开发iOS平台插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[学习开发Web/PWA平台插件 &#8250;](/plugins/creating-plugins/web-guide.md)