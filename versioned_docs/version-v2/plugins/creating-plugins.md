---
title: 创建 Capacitor 插件
description: 创建 Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 中的插件让 JavaScript 能够直接与原生 API 进行交互。

Capacitor 提供了一个插件生成器，可以快速启动新插件的开发。要使用它，请运行：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
```

这将启动一个向导，提示您输入新插件的信息。例如：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
✏️  创建新的 Capacitor 插件
? Plugin NPM name (kebab-case): my-plugin
? Plugin id (domain-style syntax. ex: com.example.plugin) com.ionicframework.myplugin
? Plugin class name (ex: AwesomePlugin) MyPlugin
? description:
? git repository:
? author:
? license: MIT
? package.json will be created, do you want to continue? (Y/n)
```

- `Plugin NPM name`: 将在 npm 上发布的包的 kebab-case 格式名称（如果您的包将发布在私有 npm 仓库中，则不是严格要求）。
- `Plugin ID`: 一个域名风格的标识符。它主要用于 Java 中的包名。
- `Plugin Class Name`: 在 Java 和 Swift 中使用的类的初始名称。关于类名的更多说明，请参阅本指南的 [iOS 插件](./ios) 部分。
- `description`: 插件的简要介绍。
- `git repository`: 托管插件源代码的 git 仓库的 URL。
- `author` (可选): `package.json` 中插件创建者的名称。
- `license` (可选): 插件遵循的许可证。默认为 MIT 许可证。
- `package.json will be created`: 输入 "Y" 或直接按 Enter/Return 键完成插件设置。

## 后续步骤

现在，就看您如何让插件实现真正强大的功能了！[继续阅读](./workflow)，学习如何实现新功能、在本地测试插件，并将其发布到 npm。

之后，请查看构建各平台插件的详细指南。遵循 [iOS](./ios) 指南了解如何使用 Swift（或 Obj-C）构建 iOS 插件；[Android](./android) 指南了解如何使用 Java 构建 Android 插件；[Web](./web) 指南了解如何为插件实现 Web 和 PWA 功能；以及 [自定义 JavaScript](./js) 指南了解如何构建自定义 JavaScript 插件（即除了 Capacitor 的自动 JS 插件绑定之外的插件）。

<span id="plugin-generator"></span>

<span id="plugin-generator"></span>

<span id="plugin-generator"></span>

<span id="plugin-generator"></span>

<span id="plugin-generator"></span>
