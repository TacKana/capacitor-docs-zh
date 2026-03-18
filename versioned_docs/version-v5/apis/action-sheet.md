---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供对原生操作表的访问，操作表从屏幕底部弹出，显示用户可以执行的操作。
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供对原生操作表的访问，操作表从屏幕底部弹出，显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

该插件将使用以下项目变量（定义在您应用的 `variables.gradle` 文件中）：

- `androidxMaterialVersion`: `com.google.android.material:material` 的版本（默认值：`1.8.0`）

## PWA 注意事项

Action Sheet 插件正常工作需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements)。

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

  console.log('操作表结果：', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个操作表样式的模态框，其中包含用户可以选择的各种选项。

| 参数          | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### 接口


#### ShowActionsResult

| 属性          | 类型                | 描述                                   | 自     |
| ------------- | ------------------- | -------------------------------------- | ------ |
| **`index`**   | <code>number</code> | 被点击选项的索引（从零开始）           | 1.0.0  |


#### ShowActionsOptions

| 属性            | 类型                             | 描述                                                              | 自     |
| --------------- | -------------------------------- | ----------------------------------------------------------------- | ------ |
| **`title`**     | <code>string</code>              | 操作表的标题。                                                    | 1.0.0  |
| **`message`**   | <code>string</code>              | 显示在标题下方的消息。此选项仅在 iOS 上支持。                     | 1.0.0  |
| **`options`**   | <code>ActionSheetButton[]</code> | 用户可以选择的操作项。                                            | 1.0.0  |


#### ActionSheetButton

| 属性          | 类型                                                                      | 描述                                                                         | 自     |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| **`title`**   | <code>string</code>                                                       | 选项的标题                                                                   | 1.0.0  |
| **`style`**   | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。此选项仅在 iOS 上支持。                                          | 1.0.0  |
| **`icon`**    | <code>string</code>                                                       | 选项的图标（使用 ionicon 命名规范）。此选项仅在 Web 上支持。                 | 1.0.0  |


### 枚举


#### ActionSheetButtonStyle

| 成员               | 值                          | 描述                                                                         | 自     |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------- | ------ |
| **`Default`**      | <code>'DEFAULT'</code>      | 选项的默认样式。                                                             | 1.0.0  |
| **`Destructive`**  | <code>'DESTRUCTIVE'</code>  | 用于具有破坏性操作的选项样式。                                               | 1.0.0  |
| **`Cancel`**       | <code>'CANCEL'</code>       | 用于取消操作表的选项样式。如果使用，应将其放在最后一个可用的选项上。         | 1.0.0  |

</docgen-api>