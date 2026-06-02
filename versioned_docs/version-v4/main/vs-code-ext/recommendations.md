---
title: 建议
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

该扩展将基于 Ionic 工程师发现的常见问题经验提供建议。建议以灯泡图标显示，您可以选择采纳或忽略。

## 常见建议

以下场景会显示建议：
- 当包在 Github 中被作者标记为已弃用或已归档时
- 当存在更好的官方支持的 Capacitor 插件时
- 当插件存在已知问题且作者不再维护时
- 当项目的 [`browserlist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当发现 `angular.json` 配置错误时
- 当 Capacitor 的 `cli`、`ios`、`android`、`core` 版本不匹配时
- 当不兼容的插件可以被等效的 Capacitor 插件替代时
- 当插件的功能已内置于 Capacitor 时
- 当依赖项已被替换时（例如 `ionic-native` -> `awesome-cordova-plugins`）
- 当插件或依赖项存在已知的安全漏洞需要处理时
- 当插件不需要时（例如 `cordova-plugin-add-swift-support`）

:::note
并非涵盖所有场景，如果您对项目应用过某个修复，并且认为对其他开发者也有帮助，请[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::
