---
title: Permissions
description: Permissions API
contributors:
  - mlynch
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Permissions API 提供了一组方法，用于在请求特定权限之前，检查这些权限是否已被授予。

这个功能非常实用。例如，应用可以避免由于用户不理解为何需要某项权限而直接拒绝授权。相反，先检查权限状态，并可选地展示自定义界面来向用户解释权限用途，这种做法有望提高权限允许率并改善用户体验。

## API

### query(...)

```typescript
query(options: PermissionsOptions) => Promise<PermissionResult>
```

| 参数            | 类型                                                              |
| --------------- | ----------------------------------------------------------------- |
| **`options`**   | <code><a href="#permissionsoptions">PermissionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#permissionresult">PermissionResult</a>&gt;</code>

---

### 接口

#### PermissionResult

| 属性          | 类型                                           |
| ------------- | ---------------------------------------------- |
| **`state`**   | <code>"denied" \| "granted" \| "prompt"</code> |

#### PermissionsOptions

| 属性          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`name`**    | <code><a href="#permissiontype">PermissionType</a></code> |

### 枚举

#### PermissionType

| 枚举成员            | 值                           |
| -------------------- | ------------------------------ |
| **`Camera`**         | <code>"camera"</code>          |
| **`Photos`**         | <code>"photos"</code>          |
| **`Geolocation`**    | <code>"geolocation"</code>     |
| **`Notifications`**  | <code>"notifications"</code>   |
| **`ClipboardRead`**  | <code>"clipboard-read"</code>  |
| **`ClipboardWrite`** | <code>"clipboard-write"</code> |
| **`Microphone`**     | <code>"microphone"</code>      |