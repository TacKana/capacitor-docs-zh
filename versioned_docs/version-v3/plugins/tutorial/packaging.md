---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 打包插件
contributors:
  - eric-horodyski
sidebar_label: 打包插件
slug: /plugins/tutorial/packaging-the-plugin
---

# 打包插件

`ScreenOrientation` 插件在功能上已经完成，并以本地插件的形式集成到了 Capacitor 应用中。然而，`ScreenOrientation` 插件在目前状态下还不能被其他 Capacitor 应用程序使用。

接下来，让我们将插件打包以便发布，使 `ScreenOrientation` 插件能够在全局范围内使用。

> **注意：** 本节内容参考了 Capacitor 文档中 <a href="https://capacitorjs.com/docs/v3/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分的步骤和流程。有关本教程范围之外的详细信息，请参考该文档。

## 生成新的插件项目

Capacitor 提供了一个 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，我们可以用它来搭建一个适合发布全局插件的项目结构。

在新的终端中，运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "以统一的方式处理 iOS、Android 和 Web 平台的屏幕方向"
```

当提示提供目录时，按 Enter 键使用默认值。当询问作者姓名时，请填写您自己的名字！

## 移植插件代码

看一下生成项目的结构；它看起来与为 Capacitor 应用程序构建的结构非常相似，不是吗？🤔

显然，这是有意为之，以便轻松地将插件代码从 Capacitor 应用程序的代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 目录下文件的内容复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接下来，将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从一个代码库复制到另一个。

然后，对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 执行相同的操作。之后，在插件项目中更新这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上面的包名是在生成插件项目时提供的，项目中的任何 Android 文件都应使用此包名。

最后，运行以下命令来验证移植代码时是否出现问题：

```bash
npm run verify
```

> **注意：** 您可以在发布插件之前，通过将插件文件夹链接到 Capacitor 项目来测试插件。有关详细信息，请参阅 <a href="https://capacitorjs.com/docs/v3/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件；它已被更新以记录插件的 API。当我们运行 `npm run verify` 时，这个更新就发生了。对源文件 JSDoc 注释的任何更改，都可以通过运行 `npm run docgen` 反映在自述文件的 API 部分中。

该插件要求开发人员修改其 Capacitor 应用程序的 `AppDelegate.swift` 文件，因此应在插件文档中包含如何操作的说明。

> **注意：** 始终记录开发人员在安装或配置您构建的插件时需要进行的任何修改。

将 `README.md` 的“安装”部分替换为以下 Markdown 内容：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

对于 iOS，您必须对 `AppDelegate.swift` 文件进行以下调整：

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

插件现在已处于可以发布到 npm 注册表的状态。在本教程中，我们不会实际发布，但请注意，发布 Capacitor 插件项目的命令与发布任何其他 npm 包相同：`npm publish`。

您可以将一个全局的 Capacitor 插件发布到公共 npm 注册表、私有注册表，或者仅仅将其链接到您计算机上的多个本地项目。这完全取决于您的使用场景。

更重要的是，有一个 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，您可以在那里托管您的插件，并在继续开发和维护插件的过程中与社区和 Capacitor 团队紧密合作。

## 结论

Capacitor 的插件 API 是一个灵活且强大的解决方案，可以为 Capacitor 应用程序补充 Web 平台无法提供的原生功能，无论需求是为特定应用程序添加自定义原生代码，还是在多个应用程序之间复用原生代码。

期待您接下来开发的插件！🎉