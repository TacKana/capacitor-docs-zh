---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 插件打包
contributors:
  - eric-horodyski
sidebar_label: 插件打包
slug: /plugins/tutorial/packaging-the-plugin
---

# 插件打包

目前 `ScreenOrientation` 插件已功能完整，并作为本地插件集成到了 Capacitor 应用中。但当前状态下，其他 Capacitor 应用还无法使用这个插件。

现在让我们将其打包发布，使 `ScreenOrientation` 插件能够被全局使用。

> **注意:** 本节内容参考自 Capacitor 文档中的 <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分。如需了解更多细节，请参阅官方文档。

## 生成新插件项目

Capacitor 提供了 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，可帮助我们创建适合发布全局插件的项目结构。

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

当提示输入目录时，直接按回车使用默认值。在要求输入作者姓名时，请填写您自己的名字！

## 移植插件代码

观察生成的项目结构，会发现它与 Capacitor 应用中构建的结构非常相似，对吧？🤔

这显然是刻意为之，以便我们能轻松地将插件代码从 Capacitor 应用移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 目录下的文件内容分别复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接着将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从原代码库复制到新项目。

同样处理 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 文件后，更新插件项目中这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上述包名是在生成插件项目时指定的，项目中的所有 Android 文件都应使用这个包名。

最后运行以下命令，验证代码移植过程中没有出现问题：

```bash
npm run verify
```

> **注意:** 发布前可以通过将插件文件夹链接到 Capacitor 项目进行测试。详情请参阅 <a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件，会发现运行 `npm run verify` 时已更新了插件 API 的文档。如果修改了源文件的 JSDoc 注释，可以通过运行 `npm run docgen` 来更新 README 文件中的 API 部分。

本插件要求开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件，因此使用说明中应包含具体操作指引。

> **注意:** 务必记录开发者安装或配置插件时需要进行的任何修改。

将 `README.md` 中的「安装」部分替换为以下内容：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

iOS 平台需要在 `AppDelegate.swift` 文件中进行如下修改：

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

现在插件已具备发布到 npm 注册表的条件。虽然本教程不会实际执行发布，但请注意发布 Capacitor 插件项目的命令与发布其他 npm 包相同：`npm publish`。

您可以选择将全局 Capacitor 插件发布到公共 npm 注册表、私有注册表，或者仅在本地机器上链接到多个项目。具体方式取决于您的使用场景。

此外，还可以将插件托管到 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，在这里您可以与社区和 Capacitor 团队密切合作，持续开发和维护您的插件。

## 结语

Capacitor 的插件 API 提供了一套灵活强大的解决方案，能够为 Capacitor 应用补充 Web 平台所不具备的原生功能。无论是为特定应用添加定制原生代码，还是在多个应用间复用原生代码，都能完美胜任。

期待您开发的下一个插件！🎉