---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 插件打包
contributors:
  - eric-horodyski
sidebar_label: 插件打包
slug: /plugins/tutorial/packaging-the-plugin
---

# 插件打包

`ScreenOrientation` 插件已功能完备，并作为本地插件集成到了 Capacitor 应用中。但其当前状态尚不能被其他 Capacitor 应用使用。

让我们来打包这个插件以便发布，使 `ScreenOrientation` 插件能够全局可用。

> **注意：** 本节内容参考了 Capacitor 文档中 <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a> 部分的步骤与流程。如需了解更多细节，请参阅官方文档。

## 生成新插件项目

Capacitor 提供了一个 <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>，可帮助我们搭建适合发布全局插件的项目结构。

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

当提示输入目录时，直接按回车使用默认值。要求输入作者姓名时，请填写你的名字！

## 移植插件代码

观察生成的项目结构，是否与应用中的插件结构十分相似？🤔

显而易见，这种设计是为了方便将插件代码从应用代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 目录下的文件内容复制到插件项目中对应的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接着将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容逐一复制到新项目中。

然后同样处理 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 文件。完成后更新插件项目中这些文件的包名：

```java
package io.ionic.plugins.screenorientation
```

上述包名是在生成插件项目时指定的，项目中的所有 Android 文件都应使用此包名。

最后运行以下命令，验证代码移植过程中是否出现问题：

```bash
npm run verify
```

> **注意：** 发布前可通过将插件文件夹链接到 Capacitor 项目进行测试。详见 <a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发流程</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件，运行 `npm run verify` 时已更新了插件 API 文档。若修改了源文件的 JSDoc 注释，可通过运行 `npm run docgen` 使改动同步到 README 文件的 API 部分。

该插件要求开发者修改 Capacitor 应用的 `AppDelegate.swift` 文件，因此文档中应包含相关操作说明。

> **注意：** 务必在文档中注明开发者安装或配置插件时需要做的所有修改。

将 `README.md` 的 "Install" 部分替换为以下内容：

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

iOS 平台需对 `AppDelegate.swift` 文件做如下调整：

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

现在插件已达到可发布至 npm 仓库的状态。本教程不会实际发布，但请注意发布 Capacitor 插件项目的命令与发布普通 npm 包相同：`npm publish`。

你可以将全局 Capacitor 插件发布到公共 npm 仓库、私有仓库，或仅链接到本地多个项目。具体方式取决于你的使用场景。

此外，还有一个 <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>，你可以托管自己的插件，在持续开发和维护过程中与社区及 Capacitor 团队紧密协作。

## 结语

Capacitor 插件 API 是一个灵活而强大的解决方案，可为 Capacitor 应用补充 Web 平台缺失的原生功能，无论是为特定应用添加自定义原生代码，还是在多个应用间复用原生代码都能胜任。

期待你开发的下一个插件！🎉