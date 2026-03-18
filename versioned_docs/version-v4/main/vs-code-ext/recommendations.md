---
title: 推荐建议
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展会根据 Ionic 工程师发现的常见问题经验提供推荐建议。建议会以一个灯泡图标显示，您可以采取行动或忽略它。

## 常见建议

以下情况会显示推荐建议：
- 当包在 Github 中被其作者废弃或归档时
- 当某个插件有官方支持的更好的 Capacitor 插件时
- 当某个插件存在已知问题且其作者不再维护时
- 当项目的 [`browserslist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当发现 `angular.json` 配置错误时
- 当 Capacitor `cli`、`ios`、`android`、`core` 的版本不匹配时
- 如果一个不兼容的插件可以被 Capacitor 的等效插件替换时
- 当某个插件的功能已经内置在 Capacitor 中时
- 当某个依赖项已被替换时（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 如果某个插件或依赖项存在需要解决的安全漏洞时
- 当某个插件不是必需时（例如 `cordova-plugin-add-swift-support`）

:::note
并非所有情况都已涵盖，因此如果您需要对项目应用某个修复，并且认为它可能对其他开发人员有益，请[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::