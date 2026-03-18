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

_CapacitorLABS_ - 本项目为实验性项目。不提供官方支持。如有需要请提交 issue。

---

Capacitor Watch 插件允许你在 Web 代码中定义手表界面，并将其显示在已配对的手表上。

目前仅支持 iOS 平台。本指南假设你已在 Capacitor 项目中添加了 iOS 支持。

请注意：所有功能都需要在真实的 Apple Watch 设备上才能正常工作。模拟器无法实现与真实设备相同的应用与手表之间的通信。

## 安装

步骤 1

将 watch 插件添加到你的 Capacitor 项目，然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

添加应用能力：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加 `Background Modes` 和 `Push Notification` 能力。然后在 `Background Modes` 选项中，选择 `Background Fetch`、`Remote Notifications` 和 `Background Processing`。你的应用目标配置应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift` 文件，在文件顶部添加 `import WatchConnectivity` 和 `import CapactiorWatch`，并在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法内添加以下代码：

```swift
assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择 `File` -> `New` -> `Target`，然后选择 `watchOS` 标签页和 `App`：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击 `Next`，然后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有些令人困惑，关键在于你的 `Bundle Identifier` 必须设置为 `[你的应用包ID].watchapp`，才能实现手表与应用的配对。你必须选择 SwiftUI 作为界面，Swift 作为语言。项目名称应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果你使用的是 <b>Xcode 15 或更高版本</b>，则需要从你的 `node_modules` 中添加 Capacitor Watch Swift Package：

首先进入项目包依赖项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择 `Add Local`：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

然后导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹，点击 `Add Package`：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列选择你的手表应用作为目标，点击 `Add Package`：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，你的包依赖项应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

对于 <b>Xcode 14</b>，你需要访问 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch，将所有文件复制到你的手表项目中，并确保目标选中了你的手表应用。应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的 `Main` 文件（应为 `watchappApp.swift`）。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch`。然后将 `ContentView()` 这行替换为以下内容：

完成后的文件应如下所示：

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

为手表应用目标添加 `Background Modes` 能力，并启用 `Remote Notifications`：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

现在你应该可以开始为 Capacitor Watch 进行开发了！

## 开发工作流

你仍然可以像开发普通的 Capacitor 应用一样开发你的 iOS 应用，但要在手表上运行，你需要在 Xcode 中更改目标和目标设备。你可以通过 Xcode 顶部中央附近的“目标下拉菜单”进行更改：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

该栏的右半部分允许你选择目标设备或模拟器。你需要选择与手机配对的手表，然后点击 `Run` 按钮或使用 `cmd+r` 运行快捷键。

在同步手表和手机应用时可能会遇到一些挑战。有时 Xcode 控制台会报错，抱怨配套应用不存在。这种情况下最好的解决方案是在两个设备上重新构建并重新安装应用。

## 构建手表界面并将其发送到手表

你将使用一个长字符串来定义手表界面。换行用于分隔组件。目前该插件仅支持垂直滚动视图，其中包含 `Text` 或 `Button` 组件。

定义好界面后，你可以使用 `updateWatchUI()` 方法将其发送到手表：

```typescript
async uploadMyWatchUI() {
    const watchUI = 
        `Text("Capacitor WATCH")
         Button("Add One", "inc")`;

    await Watch.updateWatchUI({"watchUI": watchUI});
}
```

将生成如下界面：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png" />## 与手表通信

这篇文章很好地总结了原生通信方式及其应用场景：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，你可以使用 Capacitor Background Runner 插件（https://github.com/ionic-team/capacitor-background-runner）实现这些方法。目前手表插件主要处理 `didReceiveUserInfo` 方法，你可以在 runner.js 中使用以下代码在应用处于后台时接收来自手表的事件：

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

这些命令对应于手表 UI 中 `Button()` 定义的第二个参数。可以是任意字符串。

## 更新手表数据

你可以使用 `$` 变量将数据添加到 `Text()` 元素中，并通过 `updateWatchData` 命令进行更新：

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

# 手表上的数据持久化

Capacitor Watch 会持久化通过 `updateWatchUI()` 发送的最后一次 UI 配置。通过 `updateWatchData()` 更新的状态数据**不会**被持久化保存。

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

| 参数                | 类型                                                     |
| ------------------- | -------------------------------------------------------- |
| **`eventName`**     | <code>'runCommand'</code>                                |
| **`listenerFunc`**  | <code>(data: { command: string; }) =&gt; void</code>     |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用新的 watchUI 替换当前的手表界面

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

| 属性           | 类型                                      |
| -------------- | ----------------------------------------- |
| **`remove`**   | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>