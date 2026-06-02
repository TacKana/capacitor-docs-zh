---
title: 建议
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展将根据 Ionic 工程师发现的常见问题经验提供建议。建议以灯泡图标显示，您可以执行或忽略。

## 常见建议

以下情况会显示建议：
- 当包在 GitHub 上被其作者弃用或归档时
- 当某个插件有更好的官方支持的 Capacitor 插件时
- 当某个插件存在已知问题且不再由其作者维护时
- 当项目的 [`browserlist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当发现 `angular.json` 存在错误配置时
- 当 Capacitor 的 `cli`、`ios`、`android`、`core` 版本不匹配时
- 当不兼容的插件可以被等效的 Capacitor 插件替换时
- 当某个插件的功能已内置于 Capacitor 中时
- 当某个依赖项已被替换（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 当某个插件或依赖项存在已知的安全漏洞需要处理时
- 当某个插件不是必需的时候（例如 `cordova-plugin-add-swift-support`）

:::note
并非所有场景都已涵盖，因此如果您曾经需要对项目进行修复，并认为该修复对其他开发者也有帮助，请[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::
