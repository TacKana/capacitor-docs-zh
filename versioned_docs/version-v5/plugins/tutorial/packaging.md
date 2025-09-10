---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 插件打包指南
contributors:
  - eric-horodyski
sidebar_label: 插件打包
slug: /plugins/tutorial/packaging-the-plugin
---

# 插件打包

目前 `ScreenOrientation` 插件功能已完成，并作为本地插件集成到了 Capacitor 应用中。但当前状态的 `ScreenOrientation` 插件还不能被其他 Capacitor 应用使用。

现在我们来将插件打包发布，使 `ScreenOrientation` 插件能够全局可用。

> **注意：** 本节内容参考了 Capacitor 文档中 <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分的步骤和流程。如需了解更多细节，请参阅官方文档。

## 生成新插件项目

Capacitor 提供了 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a> 来搭建适合发布全局插件项目的基础结构。

在新终端中运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "Work with the screen orientation in a common way for iOS, Android, and web"
```

当提示输入目录时，直接按 Enter 使用默认值。当询问作者姓名时，请输入您自己的名字！

## 移植插件代码

观察生成的目录结构，是不是和 Capacitor 应用中构建的结构非常相似？🤔

显然这是有意为之，这样可以轻松将插件代码从 Capacitor 应用代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 目录下文件的内容复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接着将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 文件内容从原代码库复制到新项目。

然后对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 执行相同操作，并更新插件项目中这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上述包名是在生成插件项目时指定的，项目中的所有 Android 文件都应使用此包名。

最后，运行以下命令验证代码移植过程是否出现任何问题：

```bash
npm run verify
```

> **提示：** 您可以在发布前通过将插件目录链接到 Capacitor 项目进行测试。详情参见 <a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件，运行 `npm run verify` 后会自动更新插件 API 文档。如果我们修改了源文件的 JSDoc 注释，可以通过运行 `npm run docgen` 使变更反映到 readme 文件的 API 部分。

该插件要求开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件，因此应在插件文档中加入相应说明。

> **注意：** 请务必记录开发者在安装或配置您构建的插件时需要进行的任何修改。

将 `README.md` 的 "Install" 部分替换为以下内容：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

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

现在插件已达到可发布到 npm 仓库的状态。本教程不会实际执行发布，但请注意发布 Capacitor 插件项目的命令与发布其他 npm 包相同：`npm publish`。

您可以将全局 Capacitor 插件发布到公共 npm 仓库、私有仓库，或者仅链接到本地机器上的多个项目。具体方式取决于您的使用场景。

此外，您还可以加入 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor 社区 GitHub 组织</a>，在那里托管您的插件，并在持续开发和维护过程中与社区和 Capacitor 团队紧密合作。

## 结语

Capacitor 的插件 API 提供了灵活强大的解决方案，能够为 Capacitor 应用补充 Web 平台缺失的原生功能，无论是为特定应用添加自定义原生代码，还是在多个应用间复用原生代码都能胜任。

期待您开发的下一个插件！🎉