---
title: Updating Your Capacitor iOS Project
description: 更新您的Capacitor iOS项目
contributors:
  - mlynch
---

# 更新您的Capacitor iOS项目

在某些情况下，您需要对iOS应用进行Capacitor更新，包括升级应用中使用的Capacitor版本，或是在iOS代码库中使用新的Capacitor交互方式（例如适配新的iOS API变更）。

## 更新Capacitor iOS库

要更新应用中使用的@capacitor/ios版本，只需通过npm安装最新版本：

```bash
npm install @capacitor/ios@2
```

然后同步原生项目：

```bash
npx cap sync ios
```

## 更新iOS项目结构

如需更新Xcode项目的基础结构，请访问Capacitor代码库中的[ios-template](https://github.com/ionic-team/capacitor/tree/2.x/ios-template)项目，查看与Capacitor最新稳定版对应的标签页。核心项目有意保持简洁设计，您只需少量时间就能发现与您项目的差异。

特别建议定期检查[AppDelegate.swift](https://github.com/ionic-team/capacitor/blob/2.x/ios-template/App/App/AppDelegate.swift)文件，了解iOS事件处理的潜在变更。

### 从1.0.0升级至1.1.0

建议变更：
- 按照[本次提交](https://github.com/ionic-team/capacitor/commit/91941975ea5fe5389e0b09bb8331d5cb16ea6a78#diff-ea346566a7f09b5e88ed28d3d6362ec3)更新`ios`文件夹内的`.gitignore`文件

### 从≤1.5.1升级至2.0.0

建议变更：
- 将原生项目迁移至Swift 5

  Capacitor 2.0采用Swift 5，建议您同步升级原生项目：
  1. 在Xcode中点击`编辑 -> 转换 -> 至当前Swift语法`
  2. 选择App.app后点击`下一步`
  3. 系统将提示`无需源代码修改`
  4. 最后点击`更新`按钮

完整API变更请参阅[版本发布说明](https://github.com/ionic-team/capacitor/releases/tag/2.0.0)。