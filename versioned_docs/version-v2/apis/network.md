---
title: Network
description: 网络 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/network
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Network API 提供了一系列事件来监听网络状态变化，并支持查询当前网络状态。

- [`getStatus()`](#getstatus)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [接口定义](#interfaces)

## 示例

```typescript
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

let handler = Network.addListener('networkStatusChange', (status) => {
  console.log("网络状态已变更", status);
});
// 停止监听:
// handler.remove();

// 获取当前网络状态
let status = await Network.getStatus();

// 输出示例:
{
  "connected": true,
  "connectionType": "wifi"
}
```

## Android 注意事项

使用 Network API 需要在 `AndroidManifest.xml` 中添加以下权限：

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

该权限允许应用访问当前网络信息，例如是否连接到 WiFi 或蜂窝网络。

## API 参考

### getStatus()

```typescript
getStatus() => Promise<NetworkStatus>
```

查询当前网络状态

**返回值:** <code>Promise&lt;<a href="#networkstatus">NetworkStatus</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: (status: NetworkStatus) => void) => PluginListenerHandle
```

监听网络状态变更事件

| 参数               | 类型                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **`eventName`**    | <code>"networkStatusChange"</code>                                           |
| **`listenerFunc`** | <code>(status: <a href="#networkstatus">NetworkStatus</a>) =&gt; void</code> |

**返回值:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除该插件的所有原生监听器

---

### Interfaces

#### NetworkStatus

| 属性                 | 类型                                                     |
| -------------------- | -------------------------------------------------------- |
| **`connected`**      | <code>boolean</code>                                     |
| **`connectionType`** | <code>"none" \| "unknown" \| "wifi" \| "cellular"</code> |

#### PluginListenerHandle

| 属性         | 类型                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |
