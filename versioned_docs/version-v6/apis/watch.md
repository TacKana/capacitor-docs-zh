---
title: Watch Capacitor 插件 API
description: 提供 Watch 界面和通信功能
custom_edit_url: https://github.com/ionic-team/CapacitorWatch/blob/main/README.md
editApiUrl: https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Watch 🧪
translated: true
---

# @capacitor/watch

<p align="center">
  <a href="https://github.com/ionic-team/capacitorwatch/actions?query=workflow%3ACI"><img src="https://img.shields.io/github/actions/workflow/status/ionic-team/capacitor/ci.yml?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/dw/@capacitor/watch?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/v/@capacitor/watch?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/l/@capacitor/watch?style=flat-square" /></a>
</p>
<p align="center">
  <a href="https://capacitorjs.com/docs"><img src="https://img.shields.io/static/v1?label=docs&message=capacitorjs.com&color=blue&style=flat-square" /></a>
  <a href="https://twitter.com/capacitorjs"><img src="https://img.shields.io/twitter/follow/capacitorjs" /></a>
</p>

---

_CapacitorLABS_ - 本项目为实验性项目。不提供支持。如有需要，请提交 issue。

---

Capacitor Watch 插件允许你在 Web 代码中为手表定义 UI，并将其显示在配对的 Apple Watch 上。

目前仅支持 iOS。本指南假设你已经为 Capacitor 项目添加了 iOS 支持。

另请注意 - 所有这些功能仅适用于真实的 Apple Watch。模拟器不支持像真实设备那样的应用与手表之间的通信。

## 安装

步骤 1

将 watch 插件添加到你的 Capacitor 项目中，然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

前往添加功能：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加"后台模式"和"推送通知"功能。然后在后台模式选项中，选择"后台获取"、"远程通知"和"后台处理"。你的 App target 应该如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift`，在文件顶部添加 `import WatchConnectivity` 和 `import CapactiorWatch`，并在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法中添加以下代码：

```swift
assert(WCSession.isSupported(), "此示例需要 Watch Connectivity 支持！")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择 File -> New -> Target，然后选择 watchOS 选项卡，再选择"App"：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击"Next"，然后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

这个对话框可能有点令人困惑，关键是你的"Bundle Identifier"必须是 `[your apps bundle ID].watchapp`，这样才能实现手表与应用的配对。你还必须为界面选择 SwiftUI，为语言选择 Swift。项目应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果你使用的是 <b>Xcode 15 或更高版本</b>，则需要从 node_modules 中添加 Capacitor Watch Swift Package：

首先进入项目的 Package Dependencies

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择"Add Local"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

然后导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹，点击"Add Package"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列中选择你的手表应用作为 target，点击"Add Package"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，你的 Package Dependencies 应该如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

如果你使用的是 <b>Xcode 14</b>，则需要访问 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch 并将所有文件复制到你的 Watch 项目中，确保选择的 target 是你的手表应用。它应该如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的"Main"文件，该文件应为 `watchappApp.swift`。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch` 这两行。然后将写着 `ContentView()` 的那一行替换掉。

完成后的文件应该如下所示：

```swift
import SwiftUI
import WatchConnectivity
import iOS_capWatch_watch

@main
struct watchddgg_Watch_AppApp: App {
    var body: some Scene {
        WindowGroup {
            CapWatchContentView()
                .onAppear {
                    assert(WCSession.isSupported(), "此示例需要 Watch Connectivity 支持！")
                    WCSession.default.delegate = WatchViewModel.shared
                    WCSession.default.activate()
                }
        }
    }
}
```

步骤 7

为手表应用 target 添加"后台模式"功能，并启用"远程通知"：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

现在你应该已经准备好开发 Capacitor Watch 了！

## 开发工作流程

你仍然可以像开发普通的 Capacitor 应用一样开发 iOS 应用，但要在手表上运行需要你在 Xcode 中更改 target 和 destination。你可以通过 Xcode 中部的"Target Dropdown"来更改：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

该栏的右半部分允许你选择目标设备或模拟器。你需要选择与手机配对的手表，然后点击"Run"按钮或使用"cmd+r"运行快捷键。

同步手表和手机应用可能会遇到一些挑战。有时你会在 Xcode 控制台中看到报错，提示配套应用不存在。这种情况下最好的解决方案是重新构建并在两个设备上重新安装应用。

## 构建手表 UI 并发送到手表

你将使用一个长字符串来定义手表 UI。换行符分隔各个组件。目前此插件仅支持文本或按钮组件的垂直滚动视图。

定义好 UI 后，你可以使用 `updateWatchUI()` 方法将其发送到手表：

```typescript
async uploadMyWatchUI() {
    const watchUI = 
        `Text("Capacitor WATCH")
         Button("Add One", "inc")`;

    await Watch.updateWatchUI({"watchUI": watchUI});
}
```

将产生如下效果：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png" />

## 与手表通信

本文对原生方法及其影响做了很好的总结：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，你可以使用 Capacitor Background Runner 插件（https://github.com/ionic-team/capacitor-background-runner）来实现这些方法。目前 watch 插件主要处理 `didReceiveUserInfo` 方法，你可以通过在 runner.js 中使用以下代码在应用后台运行时接收来自手表的事件：

```javascript
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {
  console.log(args.message.jsCommand);
})
```

你还可以实现 `runCommand` 事件监听器用于前台处理：

```typescript
Watch.addListener("runCommand", (data: {command: string}) => {
  console.log("PHONE got command - " + data.command);
})
```

这些命令是手表 UI 中 `Button()` 定义的第二个参数。可以是任意字符串。

## 更新手表数据

你可以通过使用 `$` 变量为 `Text()` 元素添加变量，并使用 `updateWatchData` 命令进行更新：

```
Text("Show my $number")
```

此示例在执行时将更新 `$number`：

```typescript
var stateData = {
  number: 0
}

async function counterIncrement() {
  stateData.counter++  
  await Watch.updateWatchData({"data": convertValuesOfObjectToStringValues(stateData)})
}
```

# 手表上的持久化

Capacitor Watch 会持久化你通过 `updateWatchUI()` 发送的最后一个 UI。通过 `updateWatchData()` 设置的状态不会被持久化。

## 安装

```bash
npm install @capacitor/watch
npx cap sync
```

## API

<docgen-index>

* [`addListener('runCommand', ...)`](#addlistenerruncommand-)
* [`updateWatchUI(...)`](#updatewatchui)
* [`updateWatchData(...)`](#updatewatchdata)
* [Interfaces](#接口)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### addListener('runCommand', ...)

```typescript
addListener(eventName: 'runCommand', listenerFunc: (data: { command: string; }) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听来自手表的命令

| 参数                | 类型                                                   |
| ------------------- | ------------------------------------------------------ |
| **`eventName`**     | <code>'runCommand'</code>                              |
| **`listenerFunc`**  | <code>(data: { command: string; }) =&gt; void</code>   |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------

### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用 watchUI 替换当前的手表 UI

| 参数           | 类型                                |
| -------------- | ----------------------------------- |
| **`options`**  | <code>{ watchUI: string; }</code>   |

--------------------

### updateWatchData(...)

```typescript
updateWatchData(options: { data: { [key: string]: string; }; }) => Promise<void>
```

更新手表的状态数据

| 参数           | 类型                                                 |
| -------------- | ---------------------------------------------------- |
| **`options`**  | <code>{ data: { [key: string]: string; }; }</code>   |

--------------------

### 接口

#### PluginListenerHandle

| 属性           | 类型                                        |
| ------------   | ------------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code>   |

</docgen-api>
