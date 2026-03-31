---
title: Haptics Capacitor 插件 API
description: Haptics API 通过触觉或振动为用户提供物理反馈。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/7.x/haptics/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/7.x/haptics/src/definitions.ts
sidebar_label: Haptics
---

# @capacitor/haptics

Haptics API 通过触觉或振动为用户提供物理反馈。

在不具备 Taptic Engine 或振动器的设备上，API 调用会正常完成但不执行任何操作。

## 安装

```bash
npm install @capacitor/haptics@latest-7
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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### impact(...)

```typescript
impact(options?: ImpactOptions | undefined) => Promise<void>
```

触发触觉"冲击"反馈

| 参数           | 类型                                                    |
| -------------- | ------------------------------------------------------- |
| **`options`**  | <code><a href="#impactoptions">ImpactOptions</a></code> |

**自：** 1.0.0

--------------------


### notification(...)

```typescript
notification(options?: NotificationOptions | undefined) => Promise<void>
```

触发触觉"通知"反馈

| 参数           | 类型                                                                |
| -------------- | ------------------------------------------------------------------- |
| **`options`**  | <code><a href="#notificationoptions">NotificationOptions</a></code> |

**自：** 1.0.0

--------------------


### vibrate(...)

```typescript
vibrate(options?: VibrateOptions | undefined) => Promise<void>
```

振动设备

| 参数           | 类型                                                      |
| -------------- | --------------------------------------------------------- |
| **`options`**  | <code><a href="#vibrateoptions">VibrateOptions</a></code> |

**自：** 1.0.0

--------------------


### selectionStart()

```typescript
selectionStart() => Promise<void>
```

触发选择开始的触觉提示

**自：** 1.0.0

--------------------


### selectionChanged()

```typescript
selectionChanged() => Promise<void>
```

触发选择变更的触觉提示。如果选择已经启动，这将使设备提供触觉反馈

**自：** 1.0.0

--------------------


### selectionEnd()

```typescript
selectionEnd() => Promise<void>
```

如果调用了 selectionStart()，selectionEnd() 将结束选择。例如，在用户从控件上抬起手指时调用此方法

**自：** 1.0.0

--------------------


### 接口


#### ImpactOptions

| 属性          | 类型                                                | 描述                                                                                                                                                                                              | 默认值                        | 自     |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| **`style`**   | <code><a href="#impactstyle">ImpactStyle</a></code> | 冲击反馈样式 由 [UIImpactFeedbackGenerator](https://developer.apple.com/documentation/uikit/uiimpactfeedbackstyle) 对象模拟的碰撞中物体的质量。                                                    | <code>ImpactStyle.Heavy</code> | 1.0.0 |


#### NotificationOptions

| 属性         | 类型                                                          | 描述                                                                                                                                                                                                   | 默认值                               | 自     |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ |
| **`type`**   | <code><a href="#notificationtype">NotificationType</a></code> | 通知反馈类型 由 [UINotificationFeedbackGenerator](https://developer.apple.com/documentation/uikit/uinotificationfeedbacktype) 对象生成的通知反馈类型。                                                   | <code>NotificationType.Success</code> | 1.0.0 |


#### VibrateOptions

| 属性               | 类型                | 描述                                 | 默认值          | 自     |
| ------------------ | ------------------- | ------------------------------------ | ---------------- | ------ |
| **`duration`**     | <code>number</code> | 振动持续时间（毫秒）。               | <code>300</code> | 1.0.0 |


### 枚举


#### ImpactStyle

| 成员           | 值                 | 描述                                           | 自     |
| -------------- | ------------------ | ---------------------------------------------- | ------ |
| **`Heavy`**    | <code>'HEAVY'</code>  | 大型、重型用户界面元素之间的碰撞               | 1.0.0 |
| **`Medium`**   | <code>'MEDIUM'</code> | 中等大小用户界面元素之间的碰撞                 | 1.0.0 |
| **`Light`**    | <code>'LIGHT'</code>  | 小型、轻型用户界面元素之间的碰撞               | 1.0.0 |


#### NotificationType

| 成员             | 值                  | 描述                                                     | 自     |
| ---------------- | ------------------- | -------------------------------------------------------- | ------ |
| **`Success`**    | <code>'SUCCESS'</code> | 表示任务已成功完成的通知反馈类型                         | 1.0.0 |
| **`Warning`**    | <code>'WARNING'</code> | 表示任务已产生警告的通知反馈类型                         | 1.0.0 |
| **`Error`**      | <code>'ERROR'</code>   | 表示任务已失败的通知反馈类型                             | 1.0.0 |

</docgen-api>