---
title: Plugins
description: 探索 Capacitor 的插件生态
contributors:
  - dtarnawsky
slug: /vscode/plugins
---

插件为 Capacitor 提供了强大的原生功能支持，寻找高质量的插件是实现应用功能的重要环节。

## 查找插件

可以通过以下方式查找插件：
1. 按下 `F1` 键输入 `plugins`
2. 在 Ionic VS Code 扩展中点击 `Plugins` 旁的 `...` 按钮

![Monorepo 项目](/img/vscode-plugins.png)

输入插件关键词、功能或部分名称后，按 `回车` 或点击 `搜索` 即可显示匹配的插件列表。

## 安装其他包
如需安装非插件类依赖，当搜索内容与 NPM 包完全匹配时（例如尝试搜索 `angularx-qrcode`），系统同样会显示结果。点击 `安装` 即可将该依赖添加到项目中。

## 插件列表说明
系统每日索引约 1100 个插件，这些插件主要来自项目中常用的热门 Capacitor 和 Cordova 插件。您可以通过向[代码库](https://github.com/ionic-team/capacitor-plugin-registry)提交 Issue 或 PR 来完善此列表。

## 插件评级标准
星级评定基于插件项目的 [NPM](https://www.npmjs.com/) 和 GitHub 数据自动计算：
1. 项目是否开源？
2. GitHub star 数是否 ≥100？
3. 最近一年是否有 npm 发布记录？
4. 版本是否稳定？（即非 0.x 版本）
5. npm 月下载量是否 ≥1000？

评级系统的目的是突出社区常用、维护良好且受欢迎的项目。

## 实用技巧

- 点击向下箭头（↓）可选择安装特定版本
- 点击 `install` 或 `update` 将安装与项目兼容的最新版本
- `More Information` 链接将跳转至 npm 页面或官方文档
- `Source Code` 链接将跳转至 GitHub 项目页
- `Report Issue` 链接将指向插件作者指定的问题反馈渠道
- Cordova 插件显示 Cordova 图标，Capacitor 插件显示 Capacitor 图标
- 仅支持 Android 或 iOS 的插件会显示相应平台图标
- 若已使用最新版本，会显示 `Up To Date`（由于每日更新索引，当天发布的新版本可能仍显示此状态）

## 插件开发者指南

发布到 npm 前，请确保 `package.json` 符合以下要求：
1. 在 `keywords` 属性中添加用户可能搜索的关键词
2. 在 `description` 属性中清晰描述插件功能
3. 在 `license` 属性中指定合适的许可证类型（如 `MIT`、`Apache-2.0`、`BSD`）
4. 在 `repository` > `url` 属性中设置 GitHub 仓库地址
5. 在 `bugs` > `url` 属性中设置问题反馈地址
6. 在 `author` 属性中设置作者名称（如 `author: { name: '张三'}`）

### 其他建议
- 使用与插件功能/公司匹配的 GitHub 头像
- 除非处于测试阶段，否则避免使用 0.x 版本号
- 避免关键词堆砌（如滥用 `plugin` 等无关词汇），这些内容在索引时会被自动过滤
- 现有维护插件的分支版本可能不会被收录