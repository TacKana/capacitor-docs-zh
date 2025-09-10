---
title: 推荐建议
description: 适用于 Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展将基于 Ionic 工程师发现的常见问题经验提供建议。推荐内容会以灯泡图标显示，您可以选择采纳或忽略。

## 常见推荐场景

以下情况会显示推荐建议：
- 当包在 Github 上被作者弃用或归档时
- 当某个插件有官方支持的更好的 Capacitor 插件替代时
- 当插件存在已知问题且作者不再维护时
- 当项目的 [`browserlist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当发现 `angular.json` 配置错误时
- 当 Capacitor `cli`、`ios`、`android`、`core` 版本不匹配时
- 当不兼容的插件可以被 Capacitor 等效功能替代时
- 当插件功能已内置在 Capacitor 中时
- 当依赖项已被替换时（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 当插件或依赖项存在需要解决的安全漏洞时
- 当插件不再需要时（例如 `cordova-plugin-add-swift-support`）

:::note
并非所有场景都已涵盖，如果您有应用于项目的修复方案，并认为可能对其他开发者有益，请[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::