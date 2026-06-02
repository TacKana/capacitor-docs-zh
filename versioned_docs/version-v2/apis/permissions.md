---
title: Permissions
description: Permissions API
contributors:
  - mlynch
translated: true
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

Permissions API 提供了在请求权限之前检查某些权限是否已被授予的方法。

例如，这有助于避免用户在不知道应用请求权限的上下文时拒绝权限请求。相反，先检查权限，然后可选地显示自定义 UI 为用户准备权限检查，可以提高权限允许率并改善用户体验。

## API

### query(...)

```typescript
query(options: PermissionsOptions) => Promise<PermissionResult>
```

| 参数 | 类型 |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#permissionsoptions">PermissionsOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#permissionresult">PermissionResult</a>&gt;</code>

---

### 接口

#### PermissionResult

| 属性 | 类型 |
| ----------- | ---------------------------------------------- |
| **`state`** | <code>"denied" \| "granted" \| "prompt"</code> |

#### PermissionsOptions

| 属性 | 类型 |
| ---------- | --------------------------------------------------------- |
| **`name`** | <code><a href="#permissiontype">PermissionType</a></code> |

### 枚举

#### PermissionType

| 成员 | 值 |
| -------------------- | ------------------------------ |
| **`Camera`**         | <code>"camera"</code>          |
| **`Photos`**         | <code>"photos"</code>          |
| **`Geolocation`**    | <code>"geolocation"</code>     |
| **`Notifications`**  | <code>"notifications"</code>   |
| **`ClipboardRead`**  | <code>"clipboard-read"</code>  |
| **`ClipboardWrite`** | <code>"clipboard-write"</code> |
| **`Microphone`**     | <code>"microphone"</code>      |
