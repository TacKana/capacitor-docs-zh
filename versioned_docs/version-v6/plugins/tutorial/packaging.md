---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 打包插件
contributors:
  - eric-horodyski
sidebar_label: 打包插件
slug: /plugins/tutorial/packaging-the-plugin
---

# 打包插件

`ScreenOrientation` 插件功能已完整，并作为本地插件集成到 Capacitor 应用中。但是，`ScreenOrientation` 插件目前的状态不能被其他 Capacitor 应用使用。

让我们继续打包插件以发布，使 `ScreenOrientation` 插件全局可用。

> **注意：**本节引用了 Capacitor 文档中<a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a>部分的步骤和流程。请参阅文档了解本教程范围之外的细节。

## 生成新的插件项目

Capacitor 有一个<a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，我们可以用它来搭建一个适合发布全局插件格式的项目。

在一个新终端中，运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "Work with the screen orientation in a common way for iOS, Android, and web"
```

当提示提供目录时，按 Enter 使用默认值。当询问作者姓名时，填写你自己的名字！

## 移植插件代码

查看生成项目的结构；它看起来与为 Capacitor 应用构建的结构非常相似，不是吗？🤔

显然，这是为了让插件代码能够轻松地从 Capacitor 应用的代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 中文件的内容复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接下来，将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从一个代码库复制到另一个。

然后，对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 进行同样的操作。之后，更新插件项目中这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上面的包名是在生成插件项目时提供的，项目中的所有 Android 文件都应使用此包名。

最后，让我们运行以下命令来验证移植代码时是否没有出现问题：

```bash
npm run verify
```

> **注意：**你可以通过将插件文件夹链接到 Capacitor 项目来在发布前测试插件。详情请参阅<a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件；它已被更新以记录插件的 API。当我们运行 `npm run verify` 时发生了这个更新。对源文件 JSDoc 注释所做的任何更改都可以通过运行 `npm run docgen` 反映在 readme 文件的 API 部分中。

该插件需要开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件，因此应在插件文档中包含如何执行此操作的说明。

> **注意：**始终记录开发者安装或配置你构建的插件时需要进行的任何修改。

将 `README.md` 的"Install"部分替换为以下 markdown：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

对于 iOS，你必须对你的 `AppDelegate.swift` 文件进行以下调整：

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

插件现在处于可以发布到 npm registry 的状态。我们不会在本教程中进行实际操作，但请注意发布 Capacitor 插件项目的命令与发布其他 npm 包相同：`npm publish`。

你可以将全局 Capacitor 插件发布到公共 npm registry、私有 registry，或者只是在本地机器上链接到多个项目。选择适合你的方式。

此外，还有一个 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，你可以在那里托管你的插件，并在继续开发和维护插件时与社区和 Capacitor 团队密切合作。

## 结论

Capacitor 的插件 API 是一个灵活且强大的解决方案，可以用 Web 无法提供的原生功能来补充 Capacitor 应用，无论是需要向特定应用添加自定义原生代码，还是在多个应用之间复用原生代码。

期待你开发的下一款插件！🎉
