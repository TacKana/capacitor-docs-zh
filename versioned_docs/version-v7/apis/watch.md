---
title: 手表 - Capacitor 插件 API
description: 提供手表界面和通信功能
custom_edit_url: https://github.com/ionic-team/CapacitorWatch/blob/main/README.md
editApiUrl: https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 手表 🧪
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

_CapacitorLABS_ - 此项目为实验性质。不提供支持。如有需要请提交问题。

---

Capacitor Watch 插件允许您在 Web 代码中定义手表 UI，并将其显示在已配对的手表上。

目前仅支持 iOS。本指南假定您已将 iOS 添加到您的 Capacitor 项目中。

另请注意，所有这些功能仅适用于真实的 Apple Watch。模拟器不允许应用与手表之间的通信，这一点与真实设备不同。

## 安装

步骤 1

将手表插件添加到您的 Capacitor 项目，然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

前往添加功能（Capabilities）：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加"后台模式（Background Modes）"和"推送通知（Push Notification）"功能。然后在后台模式选项中，选择"后台获取（Background Fetch）"、"远程通知（Remote Notifications）"和"后台处理（Background Processing）"。您的应用目标应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift`，在文件顶部添加 `import WatchConnectivity` 和 `import CapacitorWatch`，并在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法中添加以下代码：

```swift
assert(WCSession.isSupported(), "此示例需要手表连接支持！")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择 File -> New -> Target，然后选择 watchOS 选项卡中的"App"：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击"下一步"，然后填写如下选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有些令人困惑，关键点是您的"Bundle Identifier"必须是 `[您的应用包 ID].watchapp` 才能使手表与应用的配对正常工作。您还必须为界面选择 SwiftUI，为语言选择 Swift。项目应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果您使用的是 **Xcode 15 或更高版本**，则需要从 node_modules 添加 Capacitor Watch Swift Package：

首先前往项目的 Package Dependencies

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择"Add Local"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

接着导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹并点击"Add Package"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列中选择您的手表应用作为目标，点击"Add Package"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，您的 Package Dependencies 应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

如果您使用的是 **Xcode 14**，则需要前往 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch 将所有文件复制到您的手表项目中，并确保选择的目标是您的手表应用。应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的"Main"文件，应为 `watchappApp.swift`。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch`。然后将显示 `ContentView()` 的那一行替换为以下内容：

完成的文件应如下所示：

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
                    assert(WCSession.isSupported(), "此示例需要手表连接支持！")
                    WCSession.default.delegate = WatchViewModel.shared
                    WCSession.default.activate()
                }
        }
    }
}
```

步骤 7

为手表应用目标添加"后台模式（Background Modes）"功能，并启用"远程通知（Remote Notifications）":

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

现在您应该可以开始为 Capacitor Watch 进行开发了！

## 开发工作流

您仍然可以像普通的 Capacitor 应用一样开发您的 iOS 应用，但要在手表上运行需要您在 Xcode 中更改目标和运行目的地。您可以通过 Xcode 中上部中央的"目标下拉菜单"进行更改：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

此栏的右半部分让您选择目标设备或模拟器。您需要选择与手机配对的手表，然后点击"运行"按钮或使用"cmd+r"运行快捷键。

在同步手表和手机应用时可能会遇到一些挑战。有时您会在 Xcode 控制台中看到错误，提示配套应用不存在。这种情况下最好的解决方案是重新构建并重新安装两个设备上的应用。

## 构建手表 UI 并将其发送到手表

您将使用长字符串来定义手表 UI。换行符分隔组件。目前此插件仅支持文本（Text）或按钮（Button）组件的垂直滚动视图。

定义好 UI 后，您可以使用 `updateWatchUI()` 方法将其发送到手表：

```typescript
async uploadMyWatchUI() {
    const watchUI = 
        `Text("Capacitor WATCH")
         Button("加一", "inc")`;

    await Watch.updateWatchUI({"watchUI": watchUI});
}
```

将产生以下效果：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png" />

## 与手表通信

本文提供了关于原生方法及其含义的精彩总结：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，您可以使用 Capacitor Background Runner 插件（https://github.com/ionic-team/capacitor-background-runner）实现这些方法。目前手表插件主要处理 `didReceiveUserInfo` 方法，您可以使用以下代码在 runner.js 中接收来自手表的事件（即使应用在后台）：

```javascript
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {
  console.log(args.message.jsCommand);
})
```

您还可以为前台处理实现 `runCommand` 事件监听器：

```typescript
Watch.addListener("runCommand", (data: {command: string}) => {
  console.log("手机收到命令 - " + data.command);
})
```

命令是手表 UI 中 `Button()` 定义的第二个参数。可以是任何字符串。

## 更新手表数据

您可以通过使用 `$` 变量并在 `Text()` 元素中添加变量，然后使用 `updateWatchData` 命令进行更新：

```
Text("显示我的 $number")
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

Capacitor Watch 会持久化您通过 `updateWatchUI()` 发送的最后 UI。通过 `updateWatchData()` 设置的状态不会被保留。



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
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### addListener('runCommand', ...)

```typescript
addListener(eventName: 'runCommand', listenerFunc: (data: { command: string; }) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听来自手表的命令

| 参数                | 类型                                                 |
| ------------------- | ---------------------------------------------------- |
| **`eventName`**     | <code>'runCommand'</code>                            |
| **`listenerFunc`**  | <code>(data: { command: string; }) =&gt; void</code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用 watchUI 替换当前手表 UI

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

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
