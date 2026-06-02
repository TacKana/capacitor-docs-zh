---
title: 触觉反馈
description: 触觉反馈 API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/haptics
translated: true
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

Haptics API 通过触摸或振动向用户提供物理反馈。

- [`impact(...)`](#impact)
- [`notification(...)`](#notification)
- [`vibrate()`](#vibrate)
- [`selectionStart()`](#selectionstart)
- [`selectionChanged()`](#selectionchanged)
- [`selectionEnd()`](#selectionend)
- [接口](#接口)
- [枚举](#枚举)

## Android 注意事项

要使用振动功能，您必须在 `AndroidManifest.xml` 文件中添加此权限：

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

## 示例

```typescript
import { Plugins, HapticsImpactStyle } from '@capacitor/core';

const { Haptics } = Plugins;

export class HapticsExample {
  hapticsImpact(style = HapticsImpactStyle.Heavy) {
    Haptics.impact({
      style: style,
    });
  }

  hapticsImpactMedium(style) {
    this.hapticsImpact(HapticsImpactStyle.Medium);
  }

  hapticsImpactLight(style) {
    this.hapticsImpact(HapticsImpactStyle.Light);
  }

  hapticsVibrate() {
    Haptics.vibrate();
  }

  hapticsSelectionStart() {
    Haptics.selectionStart();
  }

  hapticsSelectionChanged() {
    Haptics.selectionChanged();
  }

  hapticsSelectionEnd() {
    Haptics.selectionEnd();
  }
}
```

## API

### impact(...)

```typescript
impact(options: HapticsImpactOptions) => void
```

触发触觉"冲击"反馈

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#hapticsimpactoptions">HapticsImpactOptions</a></code> |

---

### notification(...)

```typescript
notification(options: HapticsNotificationOptions) => void
```

触发触觉"通知"反馈

| 参数 | 类型 |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#hapticsnotificationoptions">HapticsNotificationOptions</a></code> |

---

### vibrate()

```typescript
vibrate() => void
```

使设备振动

---

### selectionStart()

```typescript
selectionStart() => void
```

触发选择开始的触觉提示

---

### selectionChanged()

```typescript
selectionChanged() => void
```

触发选择变化的触觉提示。如果选择已经开始，这将使设备提供触觉反馈。

---

### selectionEnd()

```typescript
selectionEnd() => void
```

如果调用了 selectionStart()，则 selectionEnd() 结束选择。例如，当用户从控件上抬起手指时调用此方法。

---

### 接口

#### HapticsImpactOptions

| 属性 | 类型 |
| ----------- | ----------------------------------------------------------------- |
| **`style`** | <code><a href="#hapticsimpactstyle">HapticsImpactStyle</a></code> |

#### HapticsNotificationOptions

| 属性 | 类型 |
| ---------- | --------------------------------------------------------------------------- |
| **`type`** | <code><a href="#hapticsnotificationtype">HapticsNotificationType</a></code> |

### 枚举

#### HapticsImpactStyle

| 成员 | 值 |
| ------------ | --------------------- |
| **`Heavy`**  | <code>"HEAVY"</code>  |
| **`Medium`** | <code>"MEDIUM"</code> |
| **`Light`**  | <code>"LIGHT"</code>  |

#### HapticsNotificationType

| 成员 | 值 |
| ------------- | ---------------------- |
| **`SUCCESS`** | <code>"SUCCESS"</code> |
| **`WARNING`** | <code>"WARNING"</code> |
| **`ERROR`**   | <code>"ERROR"</code>   |
