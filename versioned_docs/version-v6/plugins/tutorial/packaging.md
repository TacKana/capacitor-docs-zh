---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 插件打包
contributors:
  - eric-horodyski
sidebar_label: 插件打包
slug: /plugins/tutorial/packaging-the-plugin
---

# 插件打包

`ScreenOrientation` 插件功能已完备，并作为本地插件集成到了 Capacitor 应用中。然而，当前状态的 `ScreenOrientation` 插件无法被其他 Capacitor 应用使用。

现在，让我们着手打包插件以便发布，使 `ScreenOrientation` 插件能够全局可用。

> **注意：** 本节内容参考了 Capacitor 文档中<a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a>部分的步骤和流程。若需了解本教程范围之外的详细信息，请参阅相关文档。

## 生成新的插件项目

Capacitor 提供了<a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，可用于搭建适合发布全局插件的项目结构。

在新终端中运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "以统一方式处理 iOS、Android 和网页端的屏幕方向"
```

当提示输入目录时，按回车键使用默认值。询问作者姓名时，请填写您自己的名字！

## 迁移插件代码

观察生成项目的结构，它与为 Capacitor 应用构建的结构非常相似，不是吗？🤔

显然，这是有意为之，以便轻松地将插件代码从 Capacitor 应用代码库迁移到生成的插件项目中。

将 `src/plugins/screen-orientation` 中的文件内容复制到插件项目对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接下来，将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从一个代码库复制到另一个。

然后，对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 执行相同操作。完成后，在插件项目中更新这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上述包名是在生成插件项目时提供的，项目中的任何 Android 文件都应使用此包名。

最后，运行以下命令验证代码迁移过程中未出现任何问题：

```bash
npm run verify
```

> **注意：** 您可以在发布插件前，通过将插件文件夹链接到 Capacitor 项目进行测试。详情请参阅<a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流程</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件；它已更新以记录插件的 API。这一更新是在我们运行 `npm run verify` 时完成的。对源文件 JSDoc 注释的任何更改，都可以通过运行 `npm run docgen` 反映在自述文件的 API 部分中。

该插件要求开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件，因此应在插件文档中包含相关操作说明。

> **注意：** 务必记录开发者在安装或配置您构建的插件时需要进行的任何修改。

将 `README.md` 的“安装”部分替换为以下 Markdown 内容：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

对于 iOS 平台，您必须按以下方式调整 `AppDelegate.swift` 文件：

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

插件当前已具备发布到 npm 注册表的条件。虽然本教程不会实际发布，但请注意发布 Capacitor 插件项目的命令与发布其他 npm 包相同：`npm publish`。

您可以将全局 Capacitor 插件发布到公共 npm 注册表、私有注册表，或仅将其链接到本地机器上的多个项目。具体方式取决于您的使用场景。

此外，还有一个<a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，您可以在其中托管插件，并在持续开发和维护过程中与社区及 Capacitor 团队紧密合作。

## 结语

Capacitor 的插件 API 是一个灵活而强大的解决方案，能够为 Capacitor 应用补充网页端无法实现的原生功能。无论您是需要为特定应用添加自定义原生代码，还是要在多个应用间复用原生代码，它都能满足需求。

期待您下一步开发的插件！🎉