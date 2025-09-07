---
title: 优化建议
description: Capacitor的Visual Studio Code扩展插件
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

本扩展会根据Ionic工程师在开发过程中发现的常见问题给出优化建议。这些建议会以灯泡图标显示，您可以选择采纳或忽略。

## 常见建议场景

以下情况会触发优化建议：
- 当GitHub上的包作者已弃用或归档该包时
- 当某个插件有官方支持的更优Capacitor替代方案时
- 当插件存在已知问题且原作者已停止维护时
- 当项目的[`browserlist`](https://github.com/browserslist/browserslist)配置存在兼容性问题时
- 当检测到`angular.json`文件存在错误配置时
- 当Capacitor的`cli`、`ios`、`android`、`core`版本不匹配时
- 当存在可被Capacitor原生功能替代的不兼容插件时
- 当插件功能已内置在Capacitor核心中时
- 当依赖项已被替换（如`ionic-native`替换为`awesome-cordova-plugins`）时
- 当插件或依赖项存在需要修复的安全漏洞时
- 当插件已不再需要时（例如`cordova-plugin-add-swift-support`）

:::note
当前建议覆盖范围有限，如果您发现某个项目修复方案对其他开发者有帮助，欢迎[提交建议](https://github.com/ionic-team/vscode-ionic/issues)。
:::