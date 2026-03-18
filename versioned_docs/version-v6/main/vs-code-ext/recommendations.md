---
title: 推荐建议
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展将基于 Ionic 工程师发现的常见问题经验来提供建议。建议会以灯泡图标显示，您可以采纳或忽略这些建议。

## 常见推荐场景

以下情况会显示建议：
- 当包在 Github 上被作者弃用或归档时
- 当某个插件有更好的官方支持的 Capacitor 插件时
- 当插件存在已知问题且作者不再维护时
- 当项目的 [`browserlist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当检测到 `angular.json` 配置错误时
- 当 Capacitor `cli`、`ios`、`android`、`core` 的版本不匹配时
- 如果某个不兼容的插件可以被 Capacitor 的等效插件替换时
- 当插件的功能已经内置在 Capacitor 中时
- 当依赖项已被替换时（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 如果插件或依赖项存在需要解决的安全漏洞时
- 当某个插件不是必需时（例如 `cordova-plugin-add-swift-support`）

:::note
我们并未涵盖所有场景，因此，如果您对项目应用了某个修复，并认为它可能对其他开发者有益，欢迎[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::