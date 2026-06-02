---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 打包插件
contributors:
  - eric-horodyski
sidebar_label: 打包插件
slug: /plugins/tutorial/packaging-the-plugin
---

# 打包插件

`ScreenOrientation` 插件功能完整，并已作为本地插件集成到 Capacitor 应用中。但是，`ScreenOrientation` 插件目前无法被其他 Capacitor 应用使用。

接下来，我们将打包插件以供发布，使 `ScreenOrientation` 插件全局可用。

> **注意：** 本节引用了 Capacitor 文档中 <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分的步骤和流程。超出本教程范围的详细信息请参阅相关文档。

## 生成新的插件项目

Capacitor 有一个 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，我们可以用它来搭建一个适合发布全局插件的项目格式。

在一个新终端中，运行以下命令：

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "以统一的方式在 iOS、Android 和 Web 上处理屏幕方向"
```

当提示提供目录时，按 Enter 使用默认值。当询问作者姓名时，请使用你自己的！

## 移植插件代码

查看生成的项目结构；它看起来与 Capacitor 应用中构建的结构非常相似，不是吗？🤔

显然，这是为了让插件代码能够轻松地从 Capacitor 应用的代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 中文件的内容复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接下来，将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从一个代码库复制到另一个。

然后，对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 执行相同的操作。之后，更新插件项目中这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上面的包名是在生成插件项目时提供的，项目中的所有 Android 文件都应使用此包名。

最后，通过运行以下命令来验证移植代码时没有出现问题：

```bash
npm run verify
```

> **注意：** 你可以通过将插件文件夹链接到 Capacitor 项目，在发布之前测试插件。有关详细信息，请参见 <a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件；它已更新以记录插件的 API。当我们运行 `npm run verify` 时发生了此更新。通过对源文件 JSDoc 注释所做的任何更改，都可以通过运行 `npm run docgen` 在 readme 文件的 API 部分中反映出来。

该插件要求开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件，因此应在插件文档中包含相关操作说明。

> **注意：** 始终记录开发者在安装或配置你构建的插件时需要进行的任何修改。

将 `README.md` 中的"安装"部分替换为以下 markdown：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

对于 iOS，你必须对 `AppDelegate.swift` 文件进行以下调整：

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

插件目前处于可以发布到 npm 注册表的状态。我们不会在本教程中执行发布操作，但需要注意，发布 Capacitor 插件项目与发布任何其他 npm 包的命令相同：`npm publish`。

你可以将全局 Capacitor 插件发布到公共 npm 注册表、私有注册表，或者只是将其链接到你本地机器上的多个项目。选择适合你使用场景的方式即可。

此外，还有一个 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，你可以将插件托管在那里，并在继续开发和维护插件时与社区及 Capacitor 团队密切合作。

## 结论

Capacitor 的插件 API 是一个灵活且强大的解决方案，可以为 Capacitor 应用补充 Web 无法提供的原生功能，无论需求是为特定应用添加自定义原生代码，还是在一组应用之间复用原生代码。

期待你接下来开发的插件！🎉
