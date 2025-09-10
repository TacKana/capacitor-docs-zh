---
title: Overview
description: Cordova与PhoneGap
slug: /cordova
---

# Cordova与PhoneGap

Apache Cordova（以及Adobe PhoneGap）诞生于2008年，是一个开源项目，它让Web开发者能够运用HTML、CSS和JavaScript技术栈为多种移动和桌面平台开发原生应用。

想了解更多关于Cordova的历史背景和技术原理，[请阅读这篇文章](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## Capacitor为何诞生？

开源领域不断涌现的新项目往往基于旧项目的理念进行改进，这些实质性优化通常需要对原有架构进行彻底改造。出于技术和社区治理的考量，Ionic团队选择不在Cordova原有基础上强行实施这些革新。

Capacitor项目的优势在于Ionic团队能够全面掌控技术栈。当您使用Ionic Framework和Capacitor构建应用时，Ionic团队同时维护着原生运行时层、UI组件库以及组件构建工具链（[Stencil](https://stenciljs.com/)）。这意味着团队可以更快速地修复问题，提供更加统一的技术生态。

## Capacitor与Cordova的差异

从理念上看，Capacitor与Cordova非常相似——两者都管理WebView并提供了将原生功能暴露给Web代码的标准方式。但Capacitor有几项关键差异，需要熟悉Cordova工作流的开发者调整开发方式。

### 原生项目管理

Capacitor将每个平台项目视为"源码资产"而非"构建时资产"。这意味着您需要将Xcode和Android Studio工程纳入版本控制，并在需要进行平台特定配置和构建/测试时使用这些IDE。

这种理念转变带来几个影响：首先，Capacitor不使用`config.xml`或类似的定制化配置来管理平台设置，而是直接编辑对应的原生配置文件，例如Android的`AndroidManifest.xml`和iOS的`Info.plist`。当然，Capacitor也提供[高层级配置选项](/main/basics/configuring-your-app.md)，这些配置通常不会修改原生功能，仅用于控制Capacitor工具链。

其次，Capacitor不提供命令行构建原生应用的方式，开发者应当使用各平台专用工具（或IDE内工具）。这遵循了各平台应用开发的标准实践，能提供更高效的原生开发体验。

虽然这些变化可能让Cordova老用户感到不安，但其优势显而易见：

1. 通过`config.xml`等抽象工具更新原生项目容易出错且难以追踪。掌握平台专用工具能显著降低排错难度
2. 无需专门开发插件，就能直接在应用代码库中添加所需原生代码。原生开发团队可与Web团队协同工作
3. 由于"拥有"原生项目所有权，更容易打造沉浸式应用体验（例如为Web应用添加原生UI外壳）
4. 当新版移动操作系统发布时，能更清晰掌握原生项目变更，提高应用可维护性。若遇到重大变更，团队会提供详尽的升级指南

### 插件管理

Capacitor采用不同于Cordova的插件管理机制。首先，它不会在构建前将插件源码复制到应用中，而是将所有插件构建为iOS的"framework"和Android的"library"，并通过各平台主流依赖管理工具（CocoaPods和Gradle）安装。此外，Capacitor不会修改原生源码，因此必须手动添加必要的原生项目配置（例如`AndroidManifest.xml`中的权限声明）。这种方式更可靠，也便于开发者获取各平台特定的社区支持。

一个重大区别在于插件与WebView交互的JavaScript处理方式：Cordova要求插件自带JS代码并手动调用`exec()`，而Capacitor会在运行时自动注册导出所有检测到的原生方法，使得WebView加载完成后立即可以使用所有插件方法。这意味着不再需要监听`deviceready`事件——应用代码加载后即可直接调用插件API。

虽然Capacitor不强制插件为iOS/Android提供JS代码，但实现跨平台共享逻辑仍然非常简单。

最后，对插件开发者而言：iOS平台官方推荐使用Swift 5开发插件（同时支持Objective-C）。插件不再需要导出`Plugin.xml`文件，Capacitor通过iOS宏和Android注解机制在运行时读取插件元数据。

### CLI与版本管理

与Cordova不同，Capacitor不使用全局CLI，而是作为npm脚本安装在每个项目的本地环境。这使得多项目版本管理更加便捷。

因此，您需要通过项目目录下的`npx cap`命令来调用Capacitor。

[了解Capacitor CLI详情 &#8250;](/cli/index.md)

## 开始迁移

立即了解[迁移策略](/main/cordova/migration-strategy.md)或[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。