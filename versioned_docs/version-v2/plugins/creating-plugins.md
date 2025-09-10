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

Capacitor 插件能让 JavaScript 直接调用原生平台 API。

Capacitor 提供了插件生成器来快速创建新插件。运行以下命令即可使用：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
```

这将启动一个向导，提示您输入新插件的信息。例如：

```bash
npx @capacitor/cli@2.4.7 plugin:generate
✏️  正在创建新 Capacitor 插件
? 插件 NPM 名称（kebab-case 格式）：my-plugin
? 插件 ID（域名风格，如 com.example.plugin） com.ionicframework.myplugin
? 插件类名（如 AwesomePlugin） MyPlugin
? 描述：
? Git 仓库地址：
? 作者：
? 许可证：MIT
? 即将创建 package.json，是否继续？(Y/n)
```

- `插件 NPM 名称`：将在 npm 上发布的包名（使用短横线命名法，如果包仅发布在私有 npm 仓库则非强制要求）
- `插件 ID`：采用域名风格的标识符，主要用于 Java 中的包名
- `插件类名`：Java 和 Swift 中使用的初始类名（关于类名的更多注意事项，请参阅本指南的 [iOS 插件](./ios) 章节）
- `描述`：插件的简要介绍
- `Git 仓库地址`：托管插件源代码的 Git 仓库 URL
- `作者`（可选）：`package.json` 中标注的插件创建者姓名
- `许可证`（可选）：插件的授权许可（默认为 MIT 许可证）
- `即将创建 package.json`：输入 "Y" 或直接按回车键完成插件创建

## 后续步骤

现在您可以为插件添加真正强大的功能了！[继续阅读](./workflow)了解如何实现新功能、本地测试插件以及发布到 npm。

之后，您可以查阅各平台的开发指南：通过 [iOS](./ios) 指南学习使用 Swift（或 Objective-C）开发 iOS 插件，[Android](./android) 指南了解 Java 开发 Android 插件的方法，[Web](./web) 指南为插件实现网页和 PWA 功能，以及 [自定义 JavaScript](./js) 指南掌握构建自定义 JavaScript 插件（即扩展 Capacitor 自动生成的 JS 插件绑定）的技巧。