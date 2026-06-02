---
title: 更新 Capacitor iOS 项目
description: 更新 Capacitor iOS 项目
contributors:
  - mlynch
---

# 更新 Capacitor iOS 项目

有时，您需要对 iOS 应用进行 Capacitor 更新，包括更新应用中使用的 Capacitor 版本，或在 iOS 代码库中使用与 Capacitor 交互的新方式（例如，随着新的 iOS API 变化）。

## 更新 Capacitor iOS 库

要更新应用中使用的 @capacitor/ios 版本，只需通过 npm 安装最新版本：

```bash
npm install @capacitor/ios@2
```

然后同步原生项目：

```bash
npx cap sync ios
```

## 更新 iOS 项目

要更新 Xcode 项目的基本结构，请查看 Capacitor 仓库中对应最新稳定版 Capacitor 标签下的 [ios-template](https://github.com/ionic-team/capacitor/tree/2.x/ios-template) 项目。核心项目有意保持简洁：您不需要花太多时间就能看出核心项目与您的项目之间的差异。

特别是，应定期检查 [AppDelegate.swift](https://github.com/ionic-team/capacitor/blob/2.x/ios-template/App/App/AppDelegate.swift) 以了解 iOS 事件的可能更改。

### 从 1.0.0 到 1.1.0

建议的更改：

- 使用 [这些更改](https://github.com/ionic-team/capacitor/commit/91941975ea5fe5389e0b09bb8331d5cb16ea6a78#diff-ea346566a7f09b5e88ed28d3d6362ec3) 更新 `ios` 文件夹内的 `.gitignore` 文件

### 从 &lt;= 1.5.1 到 2.0.0

建议的更改：

- 将原生项目更新到 Swift 5

  Capacitor 2.0 使用 Swift 5，建议将您的原生项目也更新为使用 Swift 5。
  为此，在 Xcode 中点击 `Edit -> Convert -> To Current Swift Syntax`。

  将显示 App.app 已选中，点击 `Next` 按钮。

  然后会显示一条消息 `No source changes necessary`。

  最后，点击 `Update` 按钮。

关于 API 更改，请查看 [发布说明](https://github.com/ionic-team/capacitor/releases/tag/2.0.0)。