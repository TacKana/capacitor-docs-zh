---
title: 推荐配置
description: Capacitor 的 Visual Studio Code 扩展
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

本扩展会根据 Ionic 工程师发现的常见问题经验提供优化建议。这些建议会以灯泡图标显示，您可以选择采纳或忽略。

## 常见推荐场景

以下情况会触发优化建议：
- 当包的作者在 GitHub 将其标记为弃用或归档时
- 当存在更好的 Capacitor 官方支持插件时
- 当插件存在已知问题且作者已停止维护时
- 当项目的 [`browserlist`](https://github.com/browserslist/browserslist) 支持存在问题时
- 当检测到 `angular.json` 配置错误时
- 当 Capacitor 的 `cli`、`ios`、`android`、`core` 版本不匹配时
- 当存在可被 Capacitor 等效功能替代的不兼容插件时
- 当插件功能已内置在 Capacitor 中时
- 当依赖项已被替换时（如 `ionic-native` 替换为 `awesome-cordova-plugins`）
- 当插件或依赖项存在需要修复的安全漏洞时
- 当插件不必要使用时（例如 `cordova-plugin-add-swift-support`）

:::note
我们无法覆盖所有场景，如果您发现项目中需要手动修复且对其他开发者有帮助的情况，欢迎[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::