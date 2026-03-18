---
title: Action Sheet Capacitor Plugin API
description: Action Sheet API 提供了对原生操作表的访问，操作表会从屏幕底部弹出，显示用户可以执行的操作。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供了对原生操作表的访问，操作表会从屏幕底部弹出，显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

本插件将使用以下项目变量（定义在你应用的 `variables.gradle` 文件中）：

- `androidxMaterialVersion`: `com.google.android.material:material` 的版本（默认：`1.13.0`）

## PWA 注意事项

Action Sheet 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: '照片选项',
    message: '请选择一个操作',
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

  console.log('操作表结果:', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [接口](#接口)
* [枚举](#枚举)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表样式模态框，其中包含供用户选择的各种选项。

| 参数            | 类型                                                              |
| --------------- | ----------------------------------------------------------------- |
| **`options`**   | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### ShowActionsResult

| 属性              | 类型                 | 描述                                                                                                                                                                                                                                                         | 自 |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`index`**       | <code>number</code>  | 被点击选项的索引（从零开始），如果操作表被取消则为 -1。在 iOS 上，如果存在一个样式为 <a href="#actionsheetbuttonstyle">ActionSheetButtonStyle.Cancel</a> 的按钮，并且用户点击了操作表外部，则返回该取消选项的索引。 | 1.0.0 |
| **`canceled`**    | <code>boolean</code> | 如果操作表被用户取消则为 `true`；否则为 `false`。在 Web 上，需要 @ionic/pwa-elements 版本 3.4.0 或更高。                                                                                                                                            | 8.1.0 |


#### ShowActionsOptions

| 属性                | 类型                             | 描述                                                                                                                                                                                                                               | 自 |
| ------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**         | <code>string</code>              | 操作表的标题。                                                                                                                                                                                                            | 1.0.0 |
| **`message`**       | <code>string</code>              | 标题下方显示的消息。此选项仅在 iOS 上受支持。                                                                                                                                                                  | 1.0.0 |
| **`options`**       | <code>ActionSheetButton[]</code> | 用户可以选择的操作选项。                                                                                                                                                                                                         | 1.0.0 |
| **`cancelable`**    | <code>boolean</code>             | 如果为 `true`，点击外部区域将取消操作表；如果为 `false`，则不会。默认值为 `false`。在 iOS 上不可用，操作表始终可以通过点击外部区域取消。在 Web 上，需要 @ionic/pwa-elements 版本 3.4.0 或更高。 | 8.1.0 |


#### ActionSheetButton

| 属性          | 类型                                                                      | 描述                                                                           | 自 |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----- |
| **`title`**   | <code>string</code>                                                       | 选项的标题                                                               | 1.0.0 |
| **`style`**   | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。此选项仅在 iOS 上受支持。                         | 1.0.0 |
| **`icon`**    | <code>string</code>                                                       | 选项的图标（基于 ionicon 命名规范）。此选项仅在 Web 上受支持。 | 1.0.0 |


### 枚举


#### ActionSheetButtonStyle

| 成员               | 值                      | 描述                                                                                                 | 自 |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| **`Default`**      | <code>'DEFAULT'</code>     | 选项的默认样式。                                                                                | 1.0.0 |
| **`Destructive`**  | <code>'DESTRUCTIVE'</code> | 用于破坏性选项的样式。                                                                        | 1.0.0 |
| **`Cancel`**       | <code>'CANCEL'</code>      | 用于取消操作表的选项的样式。如果使用，应应用于最后一个可用的选项。 | 1.0.0 |

</docgen-api>