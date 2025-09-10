---
title: 插件
description: 探索 Capacitor 的全新插件生态
contributors:
  - dtarnawsky
slug: /vscode/plugins
---

插件为 Capacitor 提供了强大的原生功能支持，因此寻找高质量插件是实现应用特性的关键环节。

## 查找插件

按下 `F1` 键并输入 `plugins`，或点击 Ionic VS Code 扩展中 `Plugins` 旁的 `...` 按钮即可开始插件搜索。

![Monorepo projects](/img/vscode-plugins.png)

输入插件关键词、功能描述或部分名称后，按 `回车` 或点击 `搜索` 即可显示匹配插件列表。

## 安装其他依赖包
如需安装非插件类依赖包，当搜索内容与 NPM 包完全匹配时（例如尝试搜索 `angularx-qrcode`），系统同样会显示相关结果。点击 `安装` 即可将该依赖添加至项目。

## 插件列表说明
系统每日索引约 1100 个插件，这些精选自最流行的 Capacitor 和 Cordova 生态系统插件。您可通过提交 Issue 或 PR 到[代码仓库](https://github.com/ionic-team/capacitor-plugin-registry)来完善这个列表。

## 插件评分体系
星级评级基于[NPM](https://www.npmjs.com/)和 GitHub 数据自动计算：
1. 是否开源项目？
2. GitHub 星标是否≥100？
3. 近一年是否有 npm 发布？
4. 是否为稳定版（非 0.x 版本）？
5. npm 月下载量是否≥1000？

该评分机制旨在突出社区常用、持续维护且广受好评的项目。

## 实用技巧

- 点击向下箭头(↓)可选择特定版本安装
- `安装`或`更新`将自动适配项目的最新兼容版本
- `详细信息`链接将跳转至 npm 页面或官方文档
- `源代码`链接将跳转至 GitHub 项目页
- `提交问题`链接将跳转至插件作者指定的反馈渠道
- Cordova 插件显示 Cordova 图标，Capacitor 插件显示 Capacitor 图标
- 仅支持 Android 或 iOS 的插件会显示对应平台标识
- 若已使用最新版本可能显示`最新版`，由于每日更新索引，当天发布的新版可能仍显示此状态

## 插件开发者指南

发布至 npm 前请确保您的 `package.json` 符合以下规范：
1. 在 `keywords` 属性中添加用户可能搜索的合理关键词
2. 在 `description` 属性中准确描述插件功能
3. 在 `license` 属性中声明合规的开源协议（如 `MIT`,`Apache-2.0`, `BSD`）
4. 在 `repository` > `url` 属性中设置 GitHub 仓库地址
5. 在 `bugs` > `url` 属性中设置问题反馈地址
6. 在 `author` 属性中注明作者信息（如 `author: { name: '张三'}`）

### 其他建议
- 使用符合插件功能或公司形象的 GitHub 头像
- 非测试阶段请避免使用 0.x 版本号
- 避免关键词堆砌（如滥用`plugin`或无关术语），索引时会自动过滤
- 现有维护项目的衍生版本可能不会被收录