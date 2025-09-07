---
title: Overview
description: Cordova与PhoneGap
slug: /cordova
---

# Cordova与PhoneGap

Apache Cordova（及Adobe PhoneGap）诞生于2008年，是一个开源项目，允许Web开发者使用HTML、CSS和JavaScript内容为多种移动和桌面平台创建原生应用。

关于Cordova的历史背景及工作原理的更多细节，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## Capacitor为何诞生？

开源领域充满了在旧项目理念基础上构建的新项目，这些改进往往需要对原产品进行彻底变革才能实现。出于技术和社区治理考量，Ionic团队不愿将这些激进改动强加给Cordova。

Capacitor项目的优势之一是Ionic团队对技术栈拥有更强的掌控力。当您使用Ionic Framework和Capacitor构建应用时，Ionic团队同时维护着原生运行时层、UI组件以及创建这些组件的工具链（[Stencil](https://stenciljs.com/)）。这意味着团队能更快地修复问题，并提供更统一的开发体验。

## Capacitor与Cordova的区别

从理念上看，Capacitor与Cordova非常相似。两者都管理Web View，并为Web代码提供访问原生功能的规范方式。但Capacitor有几个关键差异，需要习惯Cordova工作流的开发者调整开发方式。

### 原生项目管理

Capacitor将每个平台项目视为"源代码资产"而非"构建时资产"。这意味着您需要将Xcode和Android Studio项目纳入版本控制，并在需要进行平台特定配置和构建/测试时使用这些IDE。

这种理念转变带来几点影响：首先，Capacitor不使用`config.xml`或类似的定制配置文件来管理平台设置，而是直接修改平台原生配置文件（如Android的`AndroidManifest.xml`和iOS的`Info.plist`）。Capacitor虽提供[高层级配置选项](/main/basics/configuring-your-app.md)，但这些通常不修改原生功能，仅控制Capacitor工具链。

其次，Capacitor不提供命令行构建原生应用的方式，建议改用平台专用工具（或IDE内操作），这种遵循平台标准的方式能提供更快速、更典型的开发体验。

虽然这些改变可能让Cordova老用户不安，但优势显著：
1. 通过抽象工具（如`config.xml`）更新原生项目容易出错且需持续适配。熟悉平台专用工具后，问题排查将更轻松
2. 无需单独开发插件，就能直接在应用代码中添加所需原生代码。原生团队可与Web团队协同开发同一项目
3. 由于"拥有"原生项目，可更容易实现增强体验（如在Web应用外包裹原生UI壳层）
4. 当新移动操作系统发布时，能更清晰追踪原生项目变更，提高应用可维护性。若涉及重大变更，团队将发布分步升级指南

### 插件管理

Capacitor的插件管理机制与Cordova不同：首先，构建时不会将插件源代码复制到应用中，而是将所有插件构建为iOS的"frameworks"和Android的"libraries"，并通过各平台主流依赖管理工具（分别是CocoaPods和Gradle）安装。此外，Capacitor不修改原生源码，因此必须手动添加必要的原生项目设置（如`AndroidManifest.xml`中的权限）。这种方式更可靠，也便于开发者获取平台特定的社区支持。

核心差异在于插件在WebView中执行JavaScript代码的方式：Cordova要求插件自带JS并手动调用`exec()`，而Capacitor会在运行时根据检测到的原生方法自动注册导出所有插件JS，使得WebView加载后立即可用所有插件方法。这意味着不再需要等待`deviceready`事件——应用代码加载后即可调用插件方法。

虽然Capacitor不强制插件提供iOS/Android的JS代码，但插件包含共享JS逻辑仍很常见，实现也很简单。

最后，Capacitor对插件开发者也有影响：iOS端正式支持（且推荐）使用Swift 5开发插件（同时支持Objective-C）。插件不再导出`Plugin.xml`文件，Capacitor通过iOS宏和Android注解将元数据写入插件源代码，供运行时读取。

### CLI/版本管理

与Cordova不同，Capacitor不使用全局CLI，而是作为npm脚本本地安装到每个项目中。这使得跨多应用管理Capacitor版本更简便。

因此，您需要在应用目录中通过`npx cap`调用Capacitor，而非直接运行命令行工具。

[了解更多CLI信息 &#8250;](/cli/index.md)

## 开始迁移

立即了解[迁移策略](/main/cordova/migration-strategy.md)或[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。