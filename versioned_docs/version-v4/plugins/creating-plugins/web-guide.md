---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA 指南
slug: /plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 采用了 Web/原生兼容层，使得构建插件变得非常容易，这些插件无论是作为原生应用运行还是在 Web 上以 PWA 形式运行，都能实现相应的功能。

## 开始之前

首先，请按照插件指南的[快速开始](/plugins/creating-plugins/overview.md#plugin-generator)部分所示，生成一个插件。

接下来，在您选择的编辑器中打开 `echo/src/web.ts` 文件。

## 示例

Capacitor 的 Web 插件基本结构如下所示：

```typescript
import { WebPlugin } from '@capacitor/core';

import type { EchoPlugin } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}
```

`EchoPlugin` 接口定义了插件的方法签名。在 TypeScript 中，我们可以确保 Web 实现（即 `EchoWeb` 类）正确实现了该接口。

## 权限管理 {#permissions}

如果您的插件在 Web 上需要最终用户授予权限才能实现某些功能，那么您需要实现权限管理模式。

### 权限别名

您需要为插件所需的权限开发一个或多个别名，用于抽象和分组权限。这些别名用于传达权限状态。默认情况下，别名可以处于以下状态之一：

- `granted`: 该别名中的所有权限都已由最终用户授予（或无需提示）。
- `denied`: 该别名中的一个或多个权限已被最终用户拒绝。
- `prompt`: 应提示最终用户授予权限，因为权限既未被授予也未被拒绝。
- `prompt-with-rationale`: 最终用户之前已拒绝过权限，但尚未阻止提示。

这些状态由从 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如果需要，还可以为别名定义自定义状态。例如，官方的[相机插件](/apis/camera.md)为 `camera` 和 `photos` 别名定义了 `limited` 状态。

别名是跨平台的，因此在为插件决定别名时，请务必考虑 iOS、Android 和 Web 的权限情况。

### 权限状态定义 {#permission-status-definitions}

在 `src/definitions.ts` 中，从 Capacitor 导入 `PermissionState`，并定义一个 `PermissionStatus` 接口，该接口表示插件中权限的状态，键值由您设计的别名组成。

在下面的示例中，权限状态完全可以通过一个可以是 `granted`、`denied` 等的 `location` 别名来表示。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 更改为您的实际别名！
  location: PermissionState;
}
```

然后，在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义。这两个方法都将返回插件中权限的当前状态，具体由 `PermissionStatus` 定义。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法已添加到您的插件接口中，它们必须在插件支持的所有平台上实现。

### 实现权限管理

在 `src/web.ts` 中，将 `checkPermissions()` 和 `requestPermissions()` 方法添加到您的 Web 实现中。

```diff
+import { PermissionStatus } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   async echo(options: { value: string }) {
     ...
   }

+  async checkPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }
 }
```

#### `checkPermissions()`

此方法应返回插件中权限的当前状态。这些信息可能直接从特定的 Web API 获取，或者来自[权限 API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)。

请注意，在处理浏览器采用度不高的 Web API（例如权限 API）时，您应实现特性检测，并在最终用户的浏览器不支持时抛出适当的错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('此浏览器中权限 API 不可用。');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

此方法应提示最终用户授予使用插件所需平台 API 的权限。然后，它应在提示后返回插件中权限的新状态（与 `checkPermissions()` 方法类似）。

在 Web 上，有时无法将权限请求与实际调用分开。例如，地理位置 API 只在请求位置时才请求权限。对于这种情况，我们建议抛出未实现的异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: Web 是否支持为我的插件请求权限？
  throw this.unimplemented('Web 上未实现。');
}
```

## 错误处理 {#error-handling}

Capacitor 的 Web 插件通常需要使用一些尚未被某些浏览器采纳甚至远未标准化的 API。尽管如此，为插件的 Web 实现采取最佳实践并在 API 不可用时优雅地失败是常见做法。这就是为什么在 Web 上错误处理尤为重要！

### 不可用错误

此错误应抛出，以指示该功能当前无法使用。

原因包括：

- 当前缺少先决条件，例如网络连接。
- 需要已实现底层 API 的浏览器。

在下面的示例中，我们首先检查 `navigator` 上是否定义了 `geolocation`。如果没有，则表示浏览器不支持地理位置功能，我们应该抛出“不可用”错误。否则，我们可以继续实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('此浏览器中地理位置 API 不可用。');
  }

  // TODO: 实际的 Web 实现
}

```

### 未实现错误

此错误可以抛出，以指示该功能尚未实现。您可以使用此错误在 Web 上暂存方法以便后续实现，或者用它来指示某个平台无法实现该功能。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Web 上未实现。');
}
```