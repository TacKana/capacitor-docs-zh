---
title: 插件
description: 探索适用于 Capacitor 的新插件
contributors:
  - dtarnawsky
slug: /vscode/plugins
---

插件为 Capacitor 提供了强大的原生功能，因此寻找高质量的插件是实现应用功能的重要组成部分。

## 查找插件

要查找插件，请按下 `F1` 并输入 `plugins`，或者点击 Ionic VS Code 扩展中 `Plugins` 旁边的 `...`。

![Monorepo projects](/img/vscode-plugins.png)

输入关键词、功能或插件名称的一部分，然后按 `enter` 或点击 `Search` 以显示匹配的插件列表。

## 安装其他包

您可能需要安装一个非插件的依赖项。如果您的搜索与 NPM 包完全匹配，那么它也会显示（例如尝试 `angularx-qrcode`）。然后您可以点击 `Install` 将该依赖项添加到您的项目中。

## 关于插件列表

大约有 1100 个插件每天被索引。此列表来源于项目中使用的最受欢迎的 Capacitor 和 Cordova 插件。您可以通过向 [仓库](https://github.com/ionic-team/capacitor-plugin-registry) 提交 Issue 或 PR 来为此列表做出贡献。

## 插件评级

插件的星级评定是根据该插件项目的 [NPM](https://www.npmjs.com/) 和 GitHub 统计数据自动计算的：
1. 插件项目是否开源？
2. 是否有至少 100 个 Github 星标？
3. 该插件是否在过去一年内发布到 npm？
4. 版本是否被认为是稳定的？（即非 0.x 版本）
5. 在 npm 上是否每月至少有 1000 次下载？

评级系统的目标是突出那些被社区经常使用、维护和喜爱的项目。

## 提示

- 您可以通过点击向下箭头 (↓) 选择要安装的插件的特定版本。
- 点击 `install` 或 `update` 将安装与您的项目兼容的插件最新版本。
- `More Information` 链接将在浏览器中打开 NPM 上的列表页面或官方文档。
- `Source Code` 链接将在浏览器中显示 Github 项目。
- `Report Issue` 链接将指向插件作者希望您提交问题的地方。
- Cordova 插件将显示 Cordova 徽标，Capacitor 插件显示 Capacitor 徽标。
- 如果插件仅针对 Android 或仅针对 iOS，则旁边会显示 Android 或 Apple 徽标。
- 如果您使用的是插件的最新版本，您可能会看到 `Up To Date`。插件每天都会检查，因此今天发布的插件可能仍然显示为 `Up To Date`。

## 插件作者

为了确保您的插件看起来很棒，请在发布到 npm 之前确保您的 `package.json` 满足以下要求：
1. 在 `keywords` 属性中提供用户可能搜索的适当关键词列表。
1. 在 `description` 属性中提供插件功能的良好描述。
1. 确保在 `license` 属性中指定适当的许可证类型（例如 `MIT`、`Apache-2.0`、`BSD`）。
1. 在 `repository` > `url` 属性中设置 Github 仓库的 URL。
1. 在 `bugs` > `url` 属性中设置提交问题的 URL。
1. 确保在 `author` 属性中设置作者姓名（例如 `author: { name: 'John Smith'}`）。

### 其他提示
- 在您的 Github 项目中使用与插件功能或公司相匹配的头像。
- 除非您处于测试阶段，否则避免使用 0.x 版本号。
- 避免关键词堆砌（例如使用 `plugin` 等关键词或与您的插件无关的术语）。这些在索引过程中会自动排除。
- 对现有维护良好的插件的复刻可能会被排除在外。