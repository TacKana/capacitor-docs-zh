---
title: Watch Capacitor 插件 API
description: 提供手表界面与通信功能
custom_edit_url: https://github.com/ionic-team/CapacitorWatch/blob/main/README.md
editApiUrl: https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Watch 🧪
---

# @capacitor/watch

<p align="center">
  <a href="https://github.com/ionic-team/capacitorwatch/actions?query=workflow%3ACI">
    <img src="https://img.shields.io/github/actions/workflow/status/ionic-team/capacitor/ci.yml?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@capacitor/watch">
    <img src="https://img.shields.io/npm/dw/@capacitor/watch?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@capacitor/watch">
    <img src="https://img.shields.io/npm/v/@capacitor/watch?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@capacitor/watch">
    <img src="https://img.shields.io/npm/l/@capacitor/watch?style=flat-square" />
  </a>
</p>
<p align="center">
  <a href="https://capacitorjs.com/docs">
    <img src="https://img.shields.io/static/v1?label=docs&message=capacitorjs.com&color=blue&style=flat-square" />
  </a>
  <a href="https://twitter.com/capacitorjs">
    <img src="https://img.shields.io/twitter/follow/capacitorjs" />
  </a>
</p>

---

_CapacitorLABS_ - 此项目为实验性项目，不提供官方支持。如有需要请提交问题报告。

---

Capacitor Watch 插件允许您在网页代码中定义手表界面，并在配对的手表上显示。

目前仅支持 iOS 平台。本指南假设您已在 Capacitor 项目中添加了 iOS 平台。

请注意：所有这些功能仅适用于实际的 Apple Watch。模拟器无法像真实设备那样实现应用与手表间的通信。

## 安装

步骤 1

将 watch 插件添加到您的 Capacitor 项目，然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

添加功能：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加“后台模式”和“推送通知”功能。然后在后台模式选项中，选择“后台获取”、“远程通知”和“后台处理”。您的应用目标应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift`，在文件顶部添加 `import WatchConnectivity` 和 `import CapactiorWatch`，并在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法内添加以下代码：

```swift
assert(WCSession.isSupported(), "此示例需要 Watch Connectivity 支持！")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择 File -> New -> Target，然后选择 watchOS 标签页和 'App'：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击 'Next'，然后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有些令人困惑，关键点在于您的 'Bundle Identifier' 必须是 `[您的应用包ID].watchapp`，以便手表与应用配对。您还必须为界面选择 SwiftUI，为语言选择 Swift。项目应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果您使用的是 <b>Xcode 15 或更高版本</b>，则需要从 node_modules 中添加 Capacitor Watch Swift 包：

首先转到项目包依赖项

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择 'Add Local'

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

然后导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹，点击 'Add Package'

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列中选择您的手表应用作为目标，点击 'Add Package'

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后，您的包依赖项应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

对于 <b>Xcode 14</b>，您需要访问 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch 并将所有文件复制到您的手表项目中，确保选中的目标是您的手表应用。应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的 'Main' 文件，应为 `watchappApp.swift`。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch`。然后将 `ContentView()` 替换为以下内容：

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
                    assert(WCSession.isSupported(), "此示例需要 Watch Connectivity 支持！")
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

现在您应该准备好进行 Capacitor Watch 开发了！

## 开发工作流

您仍然可以像普通 Capacitor 应用一样开发 iOS 应用，但要在手表上运行，您需要在 Xcode 中更改目标和目标设备。您可以通过 Xcode 中上部附近的“目标下拉菜单”更改此设置：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

此栏的右半部分让您选择目标设备或模拟器。您需要选择与手机配对的手表，然后点击“运行”按钮或使用“cmd+r”运行快捷键。

同步手表和手机应用可能会遇到一些挑战。有时 Xcode 控制台会报错，抱怨伴侣应用不存在。这种情况下最好的解决方案是在两个设备上重新构建和重新安装应用。

## 构建手表 UI 并发送到手表

您将使用一个长字符串来定义手表 UI。换行符分隔组件。目前此插件仅支持垂直滚动视图，包含文本或按钮组件。

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

本文提供了关于原生方法及其影响的很好总结：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端，您可以使用 Capacitor 后台运行器插件（https://github.com/ionic-team/capacitor-background-runner）实现这些方法。目前 watch 插件主要处理 `didReceiveUserInfo` 方法，您可以在应用处于后台时使用以下代码在 runner.js 中接收来自手表的事件：

```javascript
addEventListener('WatchConnectivity_didReceiveUserInfo', (args) => {
  console.log(args.message.jsCommand);
});
```

您还可以实现 `runCommand` 事件监听器以进行前台处理：

```typescript
Watch.addListener('runCommand', (data: { command: string }) => {
  console.log('手机收到命令 - ' + data.command);
});
```

命令是手表 UI 中 `Button()` 定义的第二个参数。可以是任何字符串。

## 更新手表数据

您可以通过使用 `$` 变量将变量添加到 `Text()` 元素，并使用 `updateWatchData` 命令更新：

```
Text("显示我的 $number")
```

此示例将在执行时更新 `$number`：

```typescript
var stateData = {
  number: 0,
};

async function counterIncrement() {
  stateData.counter++;
  await Watch.updateWatchData({ data: convertValuesOfObjectToStringValues(stateData) });
}
```

# 手表上的持久化

Capacitor Watch 将保留您使用 `updateWatchUI()` 发送的最后一个 UI。`updateWatchData()` 的状态不会保留。

## 安装

```bash
npm install @capacitor/watch
npx cap sync
```

## API

<docgen-index>

- [`addListener('runCommand', ...)`](#addlistenerruncommand-)
- [`updateWatchUI(...)`](#updatewatchui)
- [`updateWatchData(...)`](#updatewatchdata)
- [接口](#接口)

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

---

### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用 watchUI 替换当前手表 UI

| 参数          | 类型                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ watchUI: string; }</code> |

---

### updateWatchData(...)

```typescript
updateWatchData(options: { data: { [key: string]: string; }; }) => Promise<void>
```

更新手表的状态数据

| 参数          | 类型                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ data: { [key: string]: string; }; }</code> |

---

### 接口

#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
