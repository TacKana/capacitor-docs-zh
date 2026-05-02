---
title: Watch Capacitor 插件 API
description: 提供手表界面与通信功能
custom_edit_url: https://github.com/ionic-team/CapacitorWatch/blob/main/README.md
editApiUrl: https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Watch 🧪
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

_CapacitorLABS_ - 这是一个实验性项目，不提供官方支持。如有需要，请提交 Issues。

---

Capacitor Watch 插件允许你在 Web 代码中定义手表界面，并将其显示在已配对的手表上。

目前仅支持 iOS 平台。本指南假设你已为 Capacitor 项目添加了 iOS 平台。

另外请注意：所有功能均需在真实的 Apple Watch 上运行。模拟器无法像真实设备那样实现应用与手表之间的通信。

## 安装

步骤 1

将 watch 插件添加到你的 Capacitor 项目，然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

进入添加功能页面：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加“后台模式”和“推送通知”功能。然后在后台模式选项中，勾选“后台获取”、“远程通知”和“后台处理”。你的 App 目标配置应如下图所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift` 文件，在文件顶部添加 `import WatchConnectivity` 和 `import CapactiorWatch`，并在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法内添加以下代码：

```swift
assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择“文件”->“新建”->“目标”，然后选择 watchOS 标签页下的“App”：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击“下一步”，然后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有点令人困惑，关键是你的“Bundle Identifier”必须设置为 `[你的应用包ID].watchapp`，手表与应用的配对才能正常工作。同时，界面必须选择 SwiftUI，语言选择 Swift。项目应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表中运行的代码。

---

如果你使用的是 <b>Xcode 15 或更高版本</b>，你需要从 node_modules 中添加 Capacitor Watch Swift 包：

首先进入项目的包依赖项页面：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择“添加本地包”：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

接着导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹并点击“添加包”：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列中选择你的手表应用作为目标，点击“添加包”：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，你的包依赖项应如下图所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

在 <b>Xcode 14</b> 中，你需要访问 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch，将所有文件复制到你的 Watch 项目中，并确保选中的目标为你的手表应用。效果应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的“主”文件（应为 `watchappApp.swift`）。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch` 两行。接着将 `ContentView()` 这行替换为以下内容：

最终文件应如下所示：

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
                    assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
                    WCSession.default.delegate = WatchViewModel.shared
                    WCSession.default.activate()
                }
        }
    }
}
```

步骤 7

为手表应用目标添加“后台模式”功能，并启用“远程通知”：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

现在你应该已准备好开发 Capacitor Watch 应用了！

## 开发流程

你仍可以像开发普通 Capacitor 应用一样开发 iOS 应用，但要在手表上运行应用，你需要在 Xcode 中更改构建目标和目标设备。你可以通过 Xcode 顶部中央附近的“目标下拉菜单”来更改：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

该菜单栏的右半部分让你选择目标设备或模拟器。你需要选择与手机配对的手表，然后点击“运行”按钮或使用“cmd+r”运行快捷键。

在同步手机和手表应用时可能会遇到一些挑战。有时 Xcode 控制台会报错，提示配套应用不存在。这种情况下最好的解决方案是在两台设备上重新构建并重新安装应用。

## 构建手表界面并发送至手表

你需要使用一个长字符串来定义手表界面。换行符用于分隔组件。目前该插件仅支持垂直滚动视图，其中包含文本或按钮组件。

定义好界面后，你可以使用 `updateWatchUI()` 方法将其发送至手表：

```typescript
async uploadMyWatchUI() {
    const watchUI = 
        `Text("Capacitor WATCH")
         Button("Add One", "inc")`;

    await Watch.updateWatchUI({"watchUI": watchUI});
}
```

效果如图所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png" />## 与手表通信

这篇文章很好地总结了原生通信方法及其应用：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，你可以使用 Capacitor Background Runner 插件（https://github.com/ionic-team/capacitor-background-runner）来实现这些方法。目前手表插件主要处理 `didReceiveUserInfo` 方法，你可以通过以下 runner.js 代码在后台接收来自手表的事件：

```javascript
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {
  console.log(args.message.jsCommand);
})
```

你也可以实现 `runCommand` 事件监听器用于前台处理：

```typescript
Watch.addListener("runCommand", (data: {command: string}) => {
  console.log("手机收到命令 - " + data.command);
})
```

这些命令对应于手表 UI 中 `Button()` 定义的第二个参数，可以是任意字符串。

## 更新手表数据

你可以通过 `$` 变量将数据添加到 `Text()` 元素中，并使用 `updateWatchData` 命令进行更新：

```
Text("显示我的 $number")
```

以下示例将在执行时更新 `$number`：

```typescript
var stateData = {
  number: 0
}

async function counterIncrement() {
  stateData.counter++  
  await Watch.updateWatchData({"data": convertValuesOfObjectToStringValues(stateData)})
}
```

# 手表数据持久化

Capacitor Watch 会持久化你通过 `updateWatchUI()` 发送的最后一个 UI。但通过 `updateWatchData()` 更新的状态数据不会被持久化保存。

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
* [接口](#接口)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('runCommand', ...)

```typescript
addListener(eventName: 'runCommand', listenerFunc: (data: { command: string; }) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听来自手表的命令

| 参数               | 类型                                                 |
| ------------------ | ---------------------------------------------------- |
| **`eventName`**    | <code>'runCommand'</code>                            |
| **`listenerFunc`** | <code>(data: { command: string; }) =&gt; void</code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用新的 watchUI 替换当前手表界面

| 参数          | 类型                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ watchUI: string; }</code> |

--------------------


### updateWatchData(...)

```typescript
updateWatchData(options: { data: { [key: string]: string; }; }) => Promise<void>
```

更新手表的状态数据

| 参数          | 类型                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ data: { [key: string]: string; }; }</code> |

--------------------


### 接口


#### PluginListenerHandle

| 属性          | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>