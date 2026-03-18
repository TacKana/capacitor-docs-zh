---
title: Recommendations
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展将基于 Ionic 工程师在常见问题排查中积累的经验，为您提供建议。建议会以灯泡图标显示，您可以采纳或忽略。

## 常见建议

以下情况会触发建议：
- 当包在 GitHub 上被作者标记为已弃用或归档时
- 当某个插件有更好、官方支持的 Capacitor 替代插件时
- 当某个插件存在已知问题且作者已停止维护时
- 当项目中的 [`browserlist`](https://github.com/browserslist/browserslist) 配置存在问题时
- 当检测到 `angular.json` 存在错误配置时
- 当 Capacitor `cli`、`ios`、`android`、`core` 的版本不匹配时
- 当某个不兼容的插件可以被 Capacitor 等效插件替代时
- 当插件的功能已内置到 Capacitor 中时
- 当某个依赖已被替代（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 当某个插件或依赖存在需要解决的安全漏洞时
- 当某个插件并非必需时（例如 `cordova-plugin-add-swift-support`）

:::note
并非所有情况都已涵盖，如果您遇到过某个需要应用到项目中的修复，并认为对其他开发者有益，请[提交建议](https://github.com/ionic-team/vscode-ionic/issues)
:::