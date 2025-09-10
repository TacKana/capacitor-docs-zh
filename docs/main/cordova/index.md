---
title: Overview
description: Cordova与PhoneGap
slug: /cordova
---

# Cordova与PhoneGap

Apache Cordova（及Adobe PhoneGap）诞生于2008年，是一个开源项目，允许Web开发者使用HTML、CSS和JavaScript内容为多种移动和桌面平台创建原生应用。

想了解更多关于Cordova的历史及其工作原理的详细信息，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova) 。

## Capacitor为何诞生？

开源领域充满了在旧项目理念基础上构建的新项目，这些新项目带来了根本性改进，而这些改进若不对原始产品进行彻底改造是无法实现的。出于技术和社区治理考虑，Ionic团队不愿将这些颠覆性改动强加给Cordova。

Capacitor项目的一个优势是Ionic团队能更全面地掌控技术栈。当你使用Ionic Framework和Capacitor构建应用时，Ionic团队同时维护着原生运行时层、UI组件和创建这些组件的工具链（[Stencil](https://stenciljs.com/)）。这意味着团队能更快地修复问题，并提供更紧密集成的技术栈。

## Capacitor与Cordova的区别

本质上，Capacitor和Cordova非常相似。两者都管理Web视图，并提供将原生功能暴露给Web代码的结构化方式。但Capacitor有几个关键差异，需要习惯Cordova工作流的开发者调整开发方式。

### 原生项目管理

Capacitor将各平台项目视为"源代码资产"而非"构建时资产"。这意味着你需要将Xcode和Android Studio项目纳入版本控制，并在需要时使用这些IDE进行平台特定的配置和构建/测试。

这种理念转变带来几个影响：首先，Capacitor不使用`config.xml`或类似的自定义配置来管理平台设置，而是直接编辑平台特定的配置文件（如Android的`AndroidManifest.xml`和iOS的`Info.plist`）。Capacitor虽然提供[高层级配置选项](/main/basics/configuring-your-app.md)，但这些通常不修改原生功能，仅控制Capacitor工具链。

其次，Capacitor不提供命令行构建原生应用的功能，开发者应使用各平台专用工具（或IDE），这能提供更快捷、更符合平台标准的开发体验。

虽然这些变化可能让Cordova老用户感到不安，但优势显著：
1. 通过抽象工具（如`config.xml`）更新原生项目容易出错且难以追踪，直接使用平台工具能更轻松排查问题
2. 无需专门开发插件，就能直接在应用代码中添加所需原生代码，原生团队可与Web团队协同工作
3. 由于"拥有"原生项目，更易打造惊艳体验（如在Web应用外添加原生UI外壳）
4. 当新移动操作系统发布时，能更清晰地追踪原生项目变更，提升应用可维护性。若Capacitor引入重大变更，团队将提供分步升级指南

### 插件管理

Capacitor以不同方式管理插件：首先，构建前不会将插件源代码复制到应用中，而是将所有插件构建为iOS的"framework"和Android的"library"，并通过各平台主流依赖管理工具（分别是CocoaPods和Gradle）安装。此外，Capacitor不修改原生源代码，因此需要手动添加必要的原生项目设置（如`AndroidManifest.xml`中的权限）。这种方式更可靠，也便于开发者寻求特定平台的社区帮助。

重大区别在于插件处理WebView执行所需的JavaScript代码的方式：Cordova要求插件自带JS并手动调用`exec()`，而Capacitor会在运行时根据检测到的原生方法自动注册导出所有插件JS，因此WebView加载后立即可用所有插件方法。这意味着不再需要`deviceready`事件——应用代码加载后即可调用插件方法。

虽然Capacitor不强制插件提供iOS/Android的JS代码，但插件包含共享JS逻辑仍是常见做法。

最后，对插件作者的影响：iOS端官方支持（并推荐）Swift 5开发插件（同时支持Objective-C）。插件不再导出`Plugin.xml`文件，Capacitor通过iOS宏和Android注解为插件源代码添加元数据。

### CLI/版本管理

与Cordova不同，Capacitor不使用全局CLI，而是作为npm脚本安装在每个项目中。这使得跨多应用管理Capacitor版本更简单。

因此，不是直接从命令行运行，而是在应用目录中调用`npx cap`来使用Capacitor。

[了解更多关于Capacitor CLI的信息 &#8250;](/cli/index.md)

## 开始迁移

立即了解[迁移流程](/main/cordova/migration-strategy.md)或[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。