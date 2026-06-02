---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供对原生 Action Sheet 的访问，这些面板从屏幕底部弹出并显示用户可以执行的操作。
translated: true
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

Action Sheet API 提供对原生 Action Sheet 的访问，这些面板从屏幕底部弹出并显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

该插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `$androidxMaterialVersion`：`com.google.android.material:material` 的版本（默认值：`1.6.1`）

## PWA 说明

Action Sheet 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

## 示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: '图片选项',
    message: '选择要执行的操作',
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

  console.log('Action Sheet 结果：', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [接口](#interfaces)
* [枚举](#enums)

</docgen-index>

<docgen-api>


### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个带有多种选项供用户选择的 Action Sheet 样式模态框。

| 参数            | 类型                                                            |
| --------------- | --------------------------------------------------------------- |
| **`options`**   | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自从：** 1.0.0

--------------------


### 接口


#### ShowActionsResult

| 属性          | 类型                | 描述                                  | 自从   |
| ------------- | ------------------- | ------------------------------------- | ------ |
| **`index`**   | <code>number</code> | 被点击选项的索引（从零开始）           | 1.0.0 |


#### ShowActionsOptions

| 属性            | 类型                             | 描述                                                              | 自从   |
| --------------- | -------------------------------- | ----------------------------------------------------------------- | ------ |
| **`title`**     | <code>string</code>              | Action Sheet 的标题。                                             | 1.0.0 |
| **`message`**   | <code>string</code>              | 在标题下方显示的消息。该选项仅在 iOS 上支持。                     | 1.0.0 |
| **`options`**   | <code>ActionSheetButton[]</code> | 用户可以选择的选项。                                              | 1.0.0 |


#### ActionSheetButton

| 属性          | 类型                                                                      | 描述                                                                               | 自从   |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| **`title`**   | <code>string</code>                                                       | 选项的标题                                                                         | 1.0.0 |
| **`style`**   | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。该选项仅在 iOS 上支持。                                                 | 1.0.0 |
| **`icon`**    | <code>string</code>                                                       | 选项的图标（ionicon 命名规范）。该选项仅在 Web 上支持。                             | 1.0.0 |


### 枚举


#### ActionSheetButtonStyle

| 成员              | 值                         | 描述                                                                                                 | 自从   |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| **`Default`**     | <code>'DEFAULT'</code>     | 选项的默认样式。                                                                                      | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 用于破坏性操作的样式。                                                                                | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 用于取消 Action Sheet 的选项样式。如果使用，应放在最后一个可用选项上。                                 | 1.0.0 |

</docgen-api>
