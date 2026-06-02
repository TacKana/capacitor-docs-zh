---
title: 创建 Capacitor 插件
description: 创建 Capacitor 插件
translated: true
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 中的插件使 JavaScript 能够直接与原生 API 进行交互。

Capacitor 提供了一个插件生成器，用于快速创建新插件。使用方式如下：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
```

这将启动一个向导，提示你输入新插件的相关信息。例如：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
✏️  创建新的 Capacitor 插件
? 插件 NPM 名称（kebab-case 格式）: my-plugin
? 插件 ID（域名风格语法，如 com.example.plugin）: com.ionicframework.myplugin
? 插件类名（如 AwesomePlugin）: MyPlugin
? 描述:
? git 仓库:
? 作者:
? 许可证: MIT
? 将创建 package.json，是否继续？(Y/n)
```

- `插件 NPM 名称`：一个 kebab-case 格式的包名称，将在 npm 上可用（如果包在私有 npm 仓库上，则不是强制要求）。
- `插件 ID`：域名风格的标识符，主要用于 Java 中的包名。
- `插件类名`：Java 和 Swift 中使用的类名初始值。关于类名的更多说明，请参见本指南的 [iOS 插件](./ios) 部分。
- `描述`：对插件的简要介绍。
- `git 仓库`：托管插件源代码的 git 仓库 URL。
- `作者`（可选）：`package.json` 中插件创建者的名称。
- `许可证`（可选）：插件所遵循的许可证。默认为 MIT 许可证。
- `将创建 package.json`：输入"Y"并/或按回车键完成插件设置。

## 后续步骤

现在轮到你让插件变得真正出色了！[继续阅读](./workflow) 了解如何实现新功能、在本地测试插件以及将其发布到 npm。

之后，查看各平台的构建详情。参考 [iOS](./ios) 指南了解如何使用 Swift（或 Obj-C）构建 iOS 插件，参考 [Android](./android) 指南了解如何使用 Java 构建 Android 插件，参考 [Web](./web) 指南了解如何为插件实现 Web 和 PWA 功能，以及参考[自定义 JavaScript](./js) 指南了解如何构建自定义 JavaScript 插件（即除了 Capacitor 的自动 JS 插件绑定之外的内容）。
