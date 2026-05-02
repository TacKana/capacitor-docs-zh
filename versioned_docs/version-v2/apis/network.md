---
title: Network
description: 网络 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/network
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

网络 API 提供用于监听网络状态变化的事件，并支持查询当前的网络状态。

- [`getStatus()`](#getstatus)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口](#接口)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

let handler = Network.addListener('networkStatusChange', (status) => {
  console.log("网络状态已变更", status);
});
// 停止监听：
// handler.remove();

// 获取当前网络状态
let status = await Network.getStatus();

// 输出示例：
{
  "connected": true,
  "connectionType": "wifi"
}
```

## Android 注意事项

网络 API 需要在你的 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

此权限允许应用访问当前网络的信息，例如是否连接到 Wi-Fi 或蜂窝网络。

## API

### getStatus()

```typescript
getStatus() => Promise<NetworkStatus>
```

查询当前网络状态

**返回值：** <code>Promise&lt;<a href="#networkstatus">NetworkStatus</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: (status: NetworkStatus) => void) => PluginListenerHandle
```

监听网络状态变更事件

| 参数                  | 类型                                                                         |
| --------------------- | ---------------------------------------------------------------------------- |
| **`eventName`**       | <code>"networkStatusChange"</code>                                           |
| **`listenerFunc`**    | <code>(status: <a href="#networkstatus">NetworkStatus</a>) =&gt; void</code> |

**返回值：** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除此插件的所有原生监听器

---

### 接口

#### NetworkStatus

| 属性                    | 类型                                                     |
| ----------------------- | -------------------------------------------------------- |
| **`connected`**         | <code>boolean</code>                                     |
| **`connectionType`**    | <code>"none" \| "unknown" \| "wifi" \| "cellular"</code> |

#### PluginListenerHandle

| 属性            | 类型                       |
| --------------- | -------------------------- |
| **`remove`**    | <code>() =&gt; void</code> |