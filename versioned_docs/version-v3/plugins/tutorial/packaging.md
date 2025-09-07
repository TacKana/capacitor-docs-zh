---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 插件打包指南
contributors:
  - eric-horodyski
sidebar_label: 插件打包
slug: /plugins/tutorial/packaging-the-plugin
---

# 插件打包指南

我们的 `ScreenOrientation` 插件已功能完备，并作为本地插件成功集成到 Capacitor 应用中。但当前状态下，其他 Capacitor 应用还无法使用这个插件。

现在，让我们为发布做好准备，将 `ScreenOrientation` 插件打包成全局可用的版本。

> **注意：** 本节内容参考了 Capacitor 文档中 <a href="https://capacitorjs.com/docs/v3/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分的步骤和流程，如需更详细的信息请查阅官方文档。

## 创建新插件项目

Capacitor 官方提供了 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成工具</a>，可以帮助我们快速搭建适合发布全局插件的项目结构。

在新终端中运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "提供跨平台（iOS/Android/Web）统一的屏幕方向控制功能"
```

当提示输入目录时，直接按回车使用默认值。要求输入作者姓名时，请填写您自己的名字！

## 移植插件代码

观察生成的项目结构，是不是与应用中搭建的插件结构非常相似？🤔

这种设计正是为了便于将插件代码从应用项目迁移到插件项目中。

将 `src/plugins/screen-orientation` 目录下的文件内容分别复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接着移植原生平台代码：将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 内容复制到对应位置。

然后处理 Android 平台文件：复制 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 后，更新插件项目中的包声明：

```java
package io.ionic.plugins.screenorientation
```

该包名是在生成插件项目时指定的，项目中所有 Android 文件都应使用此包名。

最后运行验证命令，确保代码移植过程中没有出现问题：

```bash
npm run verify
```

> **提示：** 发布前可通过链接方式在 Capacitor 项目中测试插件，具体方法参考 <a href="https://capacitorjs.com/docs/v3/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

插件项目的 `README.md` 文件已自动更新了 API 文档（运行 `npm run verify` 时生成）。如需更新文档，修改源码中的 JSDoc 注释后运行 `npm run docgen` 即可重新生成。

由于本插件要求开发者修改 Capacitor 应用的 `AppDelegate.swift` 文件，这些配置说明必须包含在文档中。

> **重要：** 始终要完整记录插件安装和配置过程中需要进行的任何修改。

替换 `README.md` 中的「安装」章节为以下内容：

## 安装方法

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS 配置

iOS 平台需要修改 `AppDelegate.swift` 文件：

```diff
import UIKit
+ import CapacitorCommunityScreenOrientation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
+   func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -\> UIInterfaceOrientationMask {
+     return ScreenOrientationPlugin.supportedOrientations
+  }
}
```

## 发布插件

现在插件已具备发布到 npm 仓库的条件。虽然本教程不实际执行发布，但请注意发布 Capacitor 插件的命令与常规 npm 包相同：`npm publish`。

您可以选择将插件发布到公共 npm 仓库、私有仓库，或者仅在本地通过链接方式供多个项目使用。具体方式取决于您的使用场景。

此外，您还可以加入 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor 社区 GitHub 组织</a>，在那里托管您的插件，与社区和 Capacitor 团队紧密合作，共同维护和发展插件功能。

## 结语

Capacitor 的插件 API 提供了灵活强大的解决方案，能够为 Capacitor 应用补充 Web 平台无法实现的原生功能。无论您是需要为特定应用添加定制原生代码，还是在多个应用间复用原生功能，这套机制都能完美胜任。

期待您开发的下一个精彩插件！🎉