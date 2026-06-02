---
title: Network Capacitor 插件 API
description: Network API 提供网络和连接信息。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/network/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/network/src/definitions.ts
sidebar_label: Network
translated: true
---

# @capacitor/network

Network API 提供网络和连接信息。

## 安装

```bash
npm install @capacitor/network@latest-7
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新以下文档-->

### getStatus()

```typescript
getStatus() => Promise<ConnectionStatus>
```

查询网络连接的当前状态。

**返回值：** <code>Promise&lt;<a href="#connectionstatus">ConnectionStatus</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### addListener('networkStatusChange', ...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: ConnectionStatusChangeListener) => Promise<PluginListenerHandle>
```

监听网络连接的变化。

| 参数               | 类型                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'networkStatusChange'</code>                                                        |
| **`listenerFunc`** | <code><a href="#connectionstatuschangelistener">ConnectionStatusChangeListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有监听器（包括网络状态变化监听器）。

**自版本：** 1.0.0

--------------------


### Interfaces


#### ConnectionStatus

表示网络连接的状态和类型。

| 属性                 | 类型                                                      | 描述                                                                                                | 自版本  |
| -------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| **`connected`**      | <code>boolean</code>                                      | 是否存在活动连接。                                                                                  | 1.0.0   |
| **`connectionType`** | <code><a href="#connectiontype">ConnectionType</a></code> | 当前使用的网络连接类型。如果没有活动的网络连接，`connectionType` 将为 `'none'`。                     | 1.0.0   |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### ConnectionType

设备可能拥有的网络连接类型。

<code>'wifi' | 'cellular' | 'none' | 'unknown'</code>


#### ConnectionStatusChangeListener

接收状态更改通知的回调。

<code>(status: <a href="#connectionstatus">ConnectionStatus</a>): void</code>

</docgen-api>
