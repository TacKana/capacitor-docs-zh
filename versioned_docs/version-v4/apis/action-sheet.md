---
title: Action Sheet Capacitor Plugin API
description: Action Sheet API 提供了对原生操作表的访问，操作表从屏幕底部弹出，显示用户可以执行的操作。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供了对原生操作表的访问，操作表从屏幕底部弹出，显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

本插件将使用以下项目变量（定义在您应用的 `variables.gradle` 文件中）：

- `$androidxMaterialVersion`: `com.google.android.material:material` 的版本（默认：`1.6.1`）

## PWA 注意事项

Action Sheet 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: '照片选项',
    message: '选择一个操作',
    options: [
      {
        title: '上传',
      },
      {
        title: '分享',
      },
      {
        title: '删除',
        style: ActionSheetButtonStyle.Destructive,
      },
    ],
  });

  console.log('Action Sheet 结果:', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [接口](#接口)
* [枚举](#枚举)

</docgen-index>

<docgen-api>


### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表样式的模态框，包含用户可以选择的各种选项。

| 参数            | 类型                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`options`**   | <code><a href="#showactionsoptions">ShowActionsOptions</a></code>         |

**返回值：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### ShowActionsResult

| 属性            | 类型                | 描述                                  | 自     |
| --------------- | ------------------- | ------------------------------------- | ------ |
| **`index`**     | <code>number</code> | 被点击选项的索引（从 0 开始）         | 1.0.0  |


#### ShowActionsOptions

| 属性              | 类型                             | 描述                                                              | 自     |
| ----------------- | -------------------------------- | ----------------------------------------------------------------- | ------ |
| **`title`**       | <code>string</code>              | 操作表的标题。                                                    | 1.0.0  |
| **`message`**     | <code>string</code>              | 标题下方显示的消息。此选项仅在 iOS 上受支持。                     | 1.0.0  |
| **`options`**     | <code>ActionSheetButton[]</code> | 用户可以选择的操作选项。                                          | 1.0.0  |


#### ActionSheetButton

| 属性            | 类型                                                                      | 描述                                                                           | 自     |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| **`title`**     | <code>string</code>                                                       | 选项的标题                                                                     | 1.0.0  |
| **`style`**     | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。此选项仅在 iOS 上受支持。                                          | 1.0.0  |
| **`icon`**      | <code>string</code>                                                       | 选项的图标（ionicon 命名规范）。此选项仅在 Web 上受支持。                      | 1.0.0  |


### 枚举


#### ActionSheetButtonStyle

| 成员                | 值                         | 描述                                                                                                 | 自     |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| **`Default`**       | <code>'DEFAULT'</code>     | 选项的默认样式。                                                                                     | 1.0.0  |
| **`Destructive`**   | <code>'DESTRUCTIVE'</code> | 用于破坏性操作的样式。                                                                               | 1.0.0  |
| **`Cancel`**        | <code>'CANCEL'</code>      | 用于取消操作表的选项样式。如果使用，应放在最后一个可用选项上。                                       | 1.0.0  |

</docgen-api>