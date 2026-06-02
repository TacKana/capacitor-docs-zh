---
title: Network - Capacitor 插件 API
description: Network API 提供网络和连接状态信息。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/network/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/network/src/definitions.ts
sidebar_label: 网络
translated: true
source_hash: 5a68e594
---

# @capacitor/network

Network API 提供网络和连接状态信息。

## 安装

```bash
npm install @capacitor/network
npx cap sync
```

## 示例

```typescript
import { Network } from '@capacitor/network';

Network.addListener('networkStatusChange', status => {
  console.log('网络状态已更改', status);
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  console.log('网络状态：', status);
};
```

## API

<docgen-index>

* [`getStatus()`](#getstatus)
* [`addListener('networkStatusChange', ...)`](#addlistenernetworkstatuschange-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### getStatus()

```typescript
getStatus() => Promise<ConnectionStatus>
```

查询当前网络连接的状态。

**返回：** <code>Promise&lt;<a href="#connectionstatus">ConnectionStatus</a>&gt;</code>

**始于：** 1.0.0

--------------------


### addListener('networkStatusChange', ...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: ConnectionStatusChangeListener) => Promise<PluginListenerHandle>
```

监听网络连接的变化。

| 参数                | 类型                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'networkStatusChange'</code>                                                        |
| **`listenerFunc`** | <code><a href="#connectionstatuschangelistener">ConnectionStatusChangeListener</a></code> |

**返回：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**始于：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除该插件的所有监听器（包括网络状态变化监听器）。

**始于：** 1.0.0

--------------------


### 接口


#### ConnectionStatus

表示网络连接的状态和类型。

| 属性                 | 类型                                                      | 描述                                                                                                                   | 始于 |
| -------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`connected`**      | <code>boolean</code>                                      | 是否存在活跃的连接。                                                                                 | 1.0.0 |
| **`connectionType`** | <code><a href="#connectiontype">ConnectionType</a></code> | 当前使用的网络连接类型。如果没有活跃的网络连接，`connectionType` 将为 `'none'`。 | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### 类型别名


#### ConnectionType

设备可能具有的网络连接类型。

<code>'wifi' | 'cellular' | 'none' | 'unknown'</code>


#### ConnectionStatusChangeListener

接收状态变化通知的回调函数。

<code>(status: <a href="#connectionstatus">ConnectionStatus</a>): void</code>

</docgen-api>
