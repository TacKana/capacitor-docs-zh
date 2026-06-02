---
title: Action Sheet Capacitor 插件 API
description: Action Sheet API 提供对原生 Action Sheet 的访问，它从屏幕底部弹出并显示用户可以执行的操作。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: 动作面板
translated: true
source_hash: 429e4d3d
---

# @capacitor/action-sheet

Action Sheet API 提供对原生 Action Sheet 的访问，它从屏幕底部弹出并显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

此插件将使用以下项目变量（在应用的 `variables.gradle` 文件中定义）：

- `androidxMaterialVersion`：`com.google.android.material:material` 的版本（默认值：`1.13.0`）

## PWA 说明

Action Sheet 插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能正常工作。

## 示例

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: 'Photo Options',
    message: 'Select an option to perform',
    options: [
      {
        title: 'Upload',
      },
      {
        title: 'Share',
      },
      {
        title: 'Remove',
        style: ActionSheetButtonStyle.Destructive,
      },
    ],
  });

  console.log('Action Sheet result:', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个 Action Sheet 风格的模态框，其中包含供用户选择的各种选项。

| 参数          | 类型                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**自：** 1.0.0

--------------------


### Interfaces


#### ShowActionsResult

| 属性             | 类型                 | 描述                                                                                                                                                                                                                                                                              | 自      |
| -------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`index`**    | <code>number</code>  | 被点击选项的索引（从零开始），如果 Action Sheet 被取消则返回 -1。在 iOS 上，如果存在 <a href="#actionsheetbuttonstyle">ActionSheetButtonStyle.Cancel</a> 按钮，且用户点击了 Action Sheet 外部，则返回 Cancel 按钮的索引。                                                              | 1.0.0 |
| **`canceled`** | <code>boolean</code> | 如果 Action Sheet 被用户取消则为 True；否则为 False。在 Web 上，需要 @ionic/pwa-elements 3.4.0 或更高版本。                                                                                                         | 8.1.0 |


#### ShowActionsOptions

| 属性             | 类型                             | 描述                                                                                                                                                                                                                                                                                                                                                                        | 默认值           | 自      |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`title`**      | <code>string</code>              | Action Sheet 的标题。                                                                                                                                                                                                                                                                                                                                                        |                    | 1.0.0 |
| **`message`**    | <code>string</code>              | 在标题下方显示的消息。此选项仅 iOS 支持。                                                                                                                                                                                                                                                                                                                                    |                    | 1.0.0 |
| **`options`**    | <code>ActionSheetButton[]</code> | 用户可以选择的选项。                                                                                                                                                                                                                                                                                                                                                         |                    | 1.0.0 |
| **`cancelable`** | <code>boolean</code>             | 如果为 true，点击外部区域时会取消 Action Sheet；如果为 false，则不会取消。在 iOS 上，如果存在 <a href="#actionsheetbuttonstyle">ActionSheetButtonStyle.Cancel</a> 按钮，或在 iOS 26+ 上，此选项不可用。在这些情况下，点击外部区域始终可以取消 Action Sheet。在 Web 上，需要 @ionic/pwa-elements 3.4.0 或更高版本。                                                              | <code>false</code> | 8.1.0 |


#### ActionSheetButton

| 属性        | 类型                                                                      | 描述                                                                                      | 自      |
| ----------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----- |
| **`title`** | <code>string</code>                                                       | 选项的标题                                                                                 | 1.0.0 |
| **`style`** | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。此选项仅 iOS 支持。                                                            | 1.0.0 |
| **`icon`**  | <code>string</code>                                                       | 选项的图标（使用 ionicon 命名规范）。此选项仅 Web 支持。                                   | 1.0.0 |


### Enums


#### ActionSheetButtonStyle

| 成员             | 值                         | 描述                                                                                                                                                                          | 自      |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Default`**     | <code>'DEFAULT'</code>     | 选项的默认样式。                                                                                                                                                               | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 用于破坏性操作的样式。                                                                                                                                                         | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 用于取消 Action Sheet 的选项的样式。如果使用，应放在最后一个可用选项。在 iOS 26+ 上不会显示，可以通过点击外部区域取消 Action Sheet。                                           | 1.0.0 |

</docgen-api>
