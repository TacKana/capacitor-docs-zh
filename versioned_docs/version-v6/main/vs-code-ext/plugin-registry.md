---
title: 插件
description: 发现 Capacitor 的新插件
contributors:
  - dtarnawsky
slug: /vscode/plugins
---

插件为 Capacitor 提供了强大的原生功能，因此找到高质量的插件是在应用中实现功能的重要部分。

## 查找插件

要查找插件，请按 `F1` 并输入 `plugins`，或从 Ionic VS Code 扩展中点击 `Plugins` 旁边的 `...`。

![单仓库项目](/img/vscode-plugins.png)

输入关键字、功能或插件名称的一部分，然后按 `enter` 或点击 `Search` 以显示匹配的插件列表。

## 安装其他包

您可能需要安装一个不是插件的依赖。如果您的搜索与 NPM 包完全匹配，它也会显示（例如尝试 `angularx-qrcode`）。然后您可以点击 `Install` 将该依赖添加到您的项目。

## 关于插件列表

每天索引大约 1100 个插件。此列表来自项目中使用的最流行的 Capacitor 和 Cordova 插件。您可以通过向[仓库](https://github.com/ionic-team/capacitor-plugin-registry)提交 Issue 或 PR 来贡献此列表。

## 插件评级

插件的星级评分是根据插件项目的 [NPM](https://www.npmjs.com/) 和 GitHub 统计数据自动计算的：
1. 插件项目是开源的吗？
2. 至少有 100 个 GitHub 星标吗？
3. 插件在过去一年内发布到 npm 了吗？
4. 版本被认为是稳定的吗？（即版本 0.x）
5. npm 上每月至少有 1000 次下载吗？

评级系统的目标是突出显示那些经常被使用、维护和受社区喜爱的项目。

## 提示

- 您可以通过点击向下箭头（↓）选择要安装的特定插件版本。
- 点击 `install` 或 `update` 将安装与您的项目兼容的最新版本插件。
- `More Information` 链接将在浏览器中打开 NPM 列表或官方文档。
- `Source Code` 链接将打开显示 GitHub 项目的浏览器。
- `Report Issue` 链接将链接到插件作者希望您提交问题的地方。
- Cordova 插件将显示 Cordova 徽标，Capacitor 插件将显示 Capacitor 徽标。
- 如果插件仅针对 Android 或仅针对 iOS，则旁边将显示 Android 或 Apple 徽标。
- 如果您使用的是插件的最新版本，您可能会看到 `Up To Date`。插件每天检查一次，因此今天发布的插件可能仍然显示 `Up To Date`。

## 插件作者

为确保您的插件在发布到 npm 之前看起来很棒，请确保您的 `package.json` 满足以下要求：
1. 在 `keywords` 属性中提供用户可能搜索的适当关键字列表。
2. 在 `description` 属性中提供插件功能的良好描述。
3. 确保在 `license` 属性中指定适当的许可证类型（例如 `MIT`、`Apache-2.0`、`BSD`）。
4. 设置 GitHub 仓库 URL 到 `repository` > `url` 属性。
5. 在 `bugs` > `url` 属性中设置提交问题的 URL。
6. 确保在 `author` 属性中设置作者姓名（例如 `author: { name: '张三' }`）。

### 其他提示
- 在 GitHub 项目中使用与您的插件功能或公司匹配的头像。
- 除非处于测试阶段，否则避免使用 0.x 版本号。
- 避免关键字堆砌（例如使用 `plugin` 等关键字或与插件无关的术语）。这些会在索引期间自动排除。
- 现有维护插件的分支可能会被排除。
