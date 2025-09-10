---
title: Haptics Capacitor 插件 API
description: Haptics API 通过触觉或震动为使用者提供物理反馈。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/src/definitions.ts
sidebar_label: Haptics
---

# @capacitor/haptics

Haptics API 通过触觉或震动为使用者提供物理反馈。

在不支持 Taptic Engine 或震动马达的设备上，API 调用会直接返回而不会执行任何操作。

## 安装

```bash
npm install @capacitor/haptics
npx cap sync
```

## 示例

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};

const hapticsSelectionStart = async () => {
  await Haptics.selectionStart();
};

const hapticsSelectionChanged = async () => {
  await Haptics.selectionChanged();
};

const hapticsSelectionEnd = async () => {
  await Haptics.selectionEnd();
};
```

## API

<docgen-index>

* [`impact(...)`](#impact)
* [`notification(...)`](#notification)
* [`vibrate(...)`](#vibrate)
* [`selectionStart()`](#selectionstart)
* [`selectionChanged()`](#selectionchanged)
* [`selectionEnd()`](#selectionend)
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### impact(...)

```typescript
impact(options?: ImpactOptions | undefined) => Promise<void>
```

触发触觉"碰撞"反馈效果

| 参数          | 类型                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#impactoptions">ImpactOptions</a></code> |

**自版本:** 1.0.0

--------------------


### notification(...)

```typescript
notification(options?: NotificationOptions | undefined) => Promise<void>
```

触发触觉"通知"反馈效果

| 参数          | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#notificationoptions">NotificationOptions</a></code> |

**自版本:** 1.0.0

--------------------


### vibrate(...)

```typescript
vibrate(options?: VibrateOptions | undefined) => Promise<void>
```

使设备震动

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#vibrateoptions">VibrateOptions</a></code> |

**自版本:** 1.0.0

--------------------


### selectionStart()

```typescript
selectionStart() => Promise<void>
```

触发选择开始的触觉提示

**自版本:** 1.0.0

--------------------


### selectionChanged()

```typescript
selectionChanged() => Promise<void>
```

触发选择变化的触觉提示。如果选择已经开始，
这将使设备提供触觉反馈

**自版本:** 1.0.0

--------------------


### selectionEnd()

```typescript
selectionEnd() => Promise<void>
```

如果已调用 selectionStart()，selectionEnd() 将结束选择。
例如，当用户手指从控件上抬起时调用此方法

**自版本:** 1.0.0

--------------------


### 接口


#### ImpactOptions

| 属性          | 类型                                                | 描述                                                                                                                                                                              | 默认值                        | 版本 |
| ----------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----- |
| **`style`** | <code><a href="#impactstyle">ImpactStyle</a></code> | 碰撞反馈样式 通过 [UIImpactFeedbackGenerator](https://developer.apple.com/documentation/uikit/uiimpactfeedbackstyle) 模拟碰撞物体的质量。 | <code>ImpactStyle.Heavy</code> | 1.0.0 |


#### NotificationOptions

| 属性         | 类型                                                          | 描述                                                                                                                                                                                       | 默认值                               | 版本 |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----- |
| **`type`** | <code><a href="#notificationtype">NotificationType</a></code> | 通知反馈类型 由 [UINotificationFeedbackGenerator](https://developer.apple.com/documentation/uikit/uinotificationfeedbacktype) 生成的通知反馈类型。 | <code>NotificationType.SUCCESS</code> | 1astom0 |


#### VibrateOptions

| 属性              | 类型                | 描述                                                                   | 默认值          | 版本 |
| -------------- | ------------------- | ----------------------------------------------------------------------------- | ---------------- | ----- |
| **`duration`** | <code>number</code> | 震动持续时间（毫秒）。iOS 12 及更早版本不支持此参数。 | <code>300</code> | 1.0.0 |


### 枚举


#### ImpactStyle

| 成员         | 值                 | 描述                                                  | 版本 |
| ------------ | --------------------- | ------------------------------------------------------------ | ----- |
| **`Heavy`**  | <code>'HEAVY'</code>  | 大型重界面元素之间的碰撞效果     | 1.0.0 |
| **`Medium`** | <code>'MEDIUM'</code> | 中等大小界面元素之间的碰撞效果 | 1.0.0 |
| **`Light`**  | <code>'LIGHT'</code>  | 小型轻界面元素之间的碰撞效果     | 1.0.0 |


#### NotificationType

| 成员           | 值                  | 描述                                                                    | 版本 |
| ------------- | ---------------------- | ------------------------------------------------------------------------------ | ----- |
| **`Success`** | <code>'SUCCESS'</code> | 表示任务已成功完成的通知反馈类型 | 1.0.0 |
| **`Warning`** | <code>'WARNING'</code> | 表示任务产生警告的通知反馈类型     | 1.0.0 |
| **`Error`**   | <code>'ERROR'</code>   | 表示任务失败的通知反馈类型                 | 1.0.0 |

</docgen-api>