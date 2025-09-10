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

_CapacitorLABS_ - 本项目为实验性产品，不提供官方支持。如有问题请提交 issue。

---

Capacitor Watch 插件允许您在网页代码中定义手表界面，并将其显示在已配对的手表上。

目前仅支持 iOS 平台。本指南假设您已为 Capacitor 项目添加了 iOS 支持。

请注意：所有功能仅适用于真实 Apple Watch 设备。模拟器无法实现真实设备上的应用与手表通信。

## 安装步骤

第一步

为 Capacitor 项目添加 watch 插件，然后打开 Xcode 工程：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

第二步

添加功能配置：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加 'Background Modes' 和 'Push Notification' 功能。在 Background Modes 选项中勾选 'Background Fetch'、'Remote Notifications' 和 'Background Processing'。最终应用目标配置应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

第三步

打开 `AppDelegate.swift` 文件，在顶部添加 `import WatchConnectivity` 和 `import CapactiorWatch`，然后在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法内添加以下代码：

```swift
assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

第四步

在 Xcode 中选择 File -> New -> Target，选择 watchOS 选项卡中的 'App'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击 'Next' 后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有些令人困惑，关键点是您的 'Bundle Identifier' 必须为 `[您的应用包ID].watchapp` 才能实现手表与应用的配对。界面必须选择 SwiftUI，语言选择 Swift。项目应为 `App`。

第五步

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果您使用 <b>Xcode 15 或更高版本</b>，需要从 node_modules 添加 Capacitor Watch Swift 包：

首先进入项目包依赖项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择 'Add Local'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹并点击 'Add Package'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

在右侧列中选择您的手表应用作为目标，然后点击 'Add Package'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，您的包依赖项应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

使用 <b>Xcode 14</b> 需要访问 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch 并将所有文件复制到您的 Watch 项目中，确保目标选择为您的手表应用。应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

第六步

打开手表应用的 'Main' 文件（应为 `watchappApp.swift`）。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch`。然后将 `ContentView()` 替换为：

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

第七步

为手表应用目标添加 'Background Modes' 功能，并启用 'Remote Notifications'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

现在您应该可以开始开发 Capacitor Watch 应用了！

## 开发工作流

您可以像开发普通 Capacitor 应用一样开发 iOS 应用，但要在手表上运行需要更改 Xcode 中的目标和目标设备。您可以通过 Xcode 顶部中央附近的 'Target Dropdown' 进行更改：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

此栏的右侧部分允许您选择目标设备或模拟器。您需要选择与手机配对的手表，然后点击 'Run' 按钮或使用 'cmd+r' 运行快捷键。

手表和手机应用同步可能会遇到一些挑战。有时 Xcode 控制台会报错抱怨配套应用不存在。最佳解决方案是在两台设备上重新构建并重新安装应用。

## 构建手表界面并发送到手表中

您将使用长字符串定义手表界面。换行符用于分隔组件。目前该插件仅支持垂直滚动视图中的 Text 或 Button 组件。

定义好界面后，可以使用 `updateWatchUI()` 方法将其发送到手表：

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

这篇文章很好地总结了原生方法及其含义：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，您可以使用 Capacitor Background Runner 插件（https://github.com/ionic-team/capacitor-background-runner）实现这些方法。目前 watch 插件主要处理 `didReceiveUserInfo` 方法，您可以在应用后台运行时通过 runner.js 中的以下代码接收来自手表的事件：

```javascript
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {
  console.log(args.message.jsCommand);
})
```

您还可以实现 `runCommand` 事件监听器进行前台处理：

```typescript
Watch.addListener("runCommand", (data: {command: string}) => {
  console.log("PHONE got command - " + data.command);
})
```

命令是手表界面 `Button()` 定义中的第二个参数。可以是任何字符串。

## 更新手表数据

您可以通过 `$` 变量将变量添加到 `Text()` 元素中，并使用 `updateWatchData` 命令更新：

```
Text("Show my $number")
```

此示例将在执行时更新 `$number`：

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

Capacitor Watch 将保留您使用 `updateWatchUI()` 发送的最后界面。通过 `updateWatchData()` 更新的状态不会保留。

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
* [接口](#interfaces)

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

**返回值:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用 watchUI 替换当前手表界面

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